/**
 * Security Rules Verification Suite for Estúdio Alfabetizar
 * Verifies that all "Dirty Dozen" adversarial payloads return PERMISSION_DENIED.
 */

export interface AdversarialTestCase {
  id: number;
  name: string;
  collection: string;
  docId: string;
  operation: 'create' | 'update' | 'delete' | 'get' | 'list';
  auth: { uid: string; email?: string; email_verified?: boolean } | null;
  payload?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_TESTS: AdversarialTestCase[] = [
  {
    id: 1,
    name: 'Unauthenticated Write',
    collection: 'community_worksheets',
    docId: 'ws_valid_1',
    operation: 'create',
    auth: null,
    payload: { title: 'Circo' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Unverified Email Spoof',
    collection: 'community_worksheets',
    docId: 'ws_valid_2',
    operation: 'create',
    auth: { uid: 'user_1', email: 'gustavoacs2000@gmail.com', email_verified: false },
    payload: { title: 'Circo' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'Identity Spoofing on Worksheet Creation',
    collection: 'community_worksheets',
    docId: 'ws_valid_3',
    operation: 'create',
    auth: { uid: 'user_1', email_verified: true },
    payload: { authorId: 'user_2', title: 'Spoofed' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Shadow Field Injection',
    collection: 'community_worksheets',
    docId: 'ws_valid_4',
    operation: 'create',
    auth: { uid: 'user_1', email_verified: true },
    payload: { authorId: 'user_1', isVerifiedAdmin: true },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Client Timestamp Forgery',
    collection: 'community_worksheets',
    docId: 'ws_valid_5',
    operation: 'create',
    auth: { uid: 'user_1', email_verified: true },
    payload: { authorId: 'user_1', createdAt: '1999-01-01T00:00:00Z' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Oversized Title DoS',
    collection: 'community_worksheets',
    docId: 'ws_valid_6',
    operation: 'create',
    auth: { uid: 'user_1', email_verified: true },
    payload: { authorId: 'user_1', title: 'A'.repeat(250) },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'Invalid Enum Injection',
    collection: 'community_worksheets',
    docId: 'ws_valid_7',
    operation: 'create',
    auth: { uid: 'user_1', email_verified: true },
    payload: { authorId: 'user_1', activityType: 'invalid_type' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'ID Poisoning Attack',
    collection: 'community_worksheets',
    docId: 'invalid$id#with!symbols',
    operation: 'create',
    auth: { uid: 'user_1', email_verified: true },
    payload: { authorId: 'user_1' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Unauthorized Update of Another Teacher Worksheet',
    collection: 'community_worksheets',
    docId: 'ws_valid_9',
    operation: 'update',
    auth: { uid: 'user_2', email_verified: true },
    payload: { title: 'Hacked Title' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Immutable Field Mutation (authorId)',
    collection: 'community_worksheets',
    docId: 'ws_valid_10',
    operation: 'update',
    auth: { uid: 'user_1', email_verified: true },
    payload: { authorId: 'user_2' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Private Worksheet Leak on Read',
    collection: 'community_worksheets',
    docId: 'ws_private_1',
    operation: 'get',
    auth: { uid: 'user_2', email_verified: true },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'ActivityLog Tampering (Update)',
    collection: 'activity_logs',
    docId: 'log_1',
    operation: 'update',
    auth: { uid: 'user_1', email_verified: true },
    payload: { summary: 'Altered log' },
    expectedResult: 'PERMISSION_DENIED',
  },
];
