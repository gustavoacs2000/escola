import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { ActivityType, WorksheetDocument } from '../types/worksheet';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection to Firestore on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

function sanitizeId(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 120) || `id_${Date.now()}`;
}

function clampString(val: string | undefined, min: number, max: number, fallback: string): string {
  const trimmed = (val || '').trim();
  const base = trimmed.length >= min ? trimmed : fallback;
  return base.slice(0, max);
}

/**
 * Publishes or saves a worksheet to `/community_worksheets/{worksheetId}`
 * strictly adhering to `firebase-blueprint.json` and `firestore.rules`.
 */
export async function publishWorksheetToCloud(
  worksheet: WorksheetDocument,
  visibility: 'public' | 'private' = 'public'
): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Faça login com sua conta Google para salvar na Biblioteca Comunitária.');
  }

  const docId = sanitizeId(`cw_${user.uid.slice(0, 12)}_${Date.now()}`);
  const path = `community_worksheets/${docId}`;

  const payload = {
    title: clampString(worksheet.title, 1, 120, 'Atividade de Alfabetização'),
    theme: clampString(worksheet.theme, 1, 80, 'Tema Geral'),
    pedagogicalGoal: clampString(worksheet.pedagogicalGoal, 1, 160, 'Alfabetização Inicial'),
    activityType: worksheet.activityType,
    difficulty: worksheet.difficulty,
    authorId: sanitizeId(user.uid),
    authorName: clampString(user.displayName || 'Professor(a)', 1, 80, 'Professor(a)'),
    visibility,
    worksheetData: {
      instruction: clampString(worksheet.instruction, 1, 300, 'Complete a atividade:'),
      teacherTip: clampString(worksheet.teacherTip, 1, 400, 'Mediação pedagógica'),
      bnccCode: clampString(worksheet.bnccCode, 1, 200, 'EF01LP08'),
      header: worksheet.header,
      syllableItems: worksheet.syllableItems.slice(0, 12),
      mathItems: worksheet.mathItems.slice(0, 10),
      showNumberStrip: Boolean(worksheet.showNumberStrip),
      matchingItems: worksheet.matchingItems.slice(0, 10),
      puzzleMode: worksheet.puzzleMode,
      puzzleWords: worksheet.puzzleWords.slice(0, 10),
    },
    createdAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, 'community_worksheets', docId), payload);
    return docId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function removeCommunityWorksheet(docId: string): Promise<void> {
  const safeId = sanitizeId(docId);
  const path = `community_worksheets/${safeId}`;
  try {
    await deleteDoc(doc(db, 'community_worksheets', safeId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Records an activity log in `/activity_logs/{logId}` when a user is signed in.
 */
export async function recordStudioActivityLog(params: {
  actionType: 'generate_ai' | 'share_community' | 'print_a4' | 'upload_example' | 'search_web';
  summary: string;
  theme: string;
  activityType: ActivityType;
}): Promise<void> {
  const user = auth.currentUser;
  if (!user || !user.emailVerified) {
    // Only verified signed-in users write to Firestore per security rules
    return;
  }

  const logId = sanitizeId(`log_${user.uid.slice(0, 10)}_${Date.now()}`);
  const path = `activity_logs/${logId}`;

  const payload = {
    actionType: params.actionType,
    summary: clampString(params.summary, 1, 200, 'Atividade realizada no estúdio'),
    theme: clampString(params.theme, 1, 80, 'Geral'),
    activityType: params.activityType,
    userId: sanitizeId(user.uid),
    userName: clampString(user.displayName || 'Professor(a)', 1, 80, 'Professor(a)'),
    visibility: 'public' as const,
    createdAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, 'activity_logs', logId), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
