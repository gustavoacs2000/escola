export type ActivityType = 'syllables' | 'visual_math' | 'matching' | 'word_puzzle';

export type DifficultyLevel = 'facil' | 'medio' | 'desafio';

export interface SchoolHeaderConfig {
  schoolName: string;
  studentLabel: string;
  dateLabel: string;
  classLabel: string;
  borderStyle: 'rounded' | 'dashed' | 'classic';
  uppercaseOnly: boolean;
  showColoringHint: boolean;
  footerCredit: string;
}

export interface SyllableItem {
  id: string;
  word: string;
  syllables: string[];
  missingIndex: number;
  iconKey: string;
  customSvg?: string;
}

export interface VisualMathItem {
  id: string;
  leftCount: number;
  rightCount: number;
  operator: '+' | '-';
  visualStyle: 'fingers' | 'theme_icons';
  iconKey: string;
  itemLabel: string;
}

export interface MatchingItem {
  id: string;
  word: string;
  syllableHint: string;
  iconKey: string;
  customSvg?: string;
}

export interface PuzzleWordItem {
  id: string;
  word: string;
  hint: string;
  iconKey: string;
  customSvg?: string;
}

export interface WorksheetDocument {
  id: string;
  title: string;
  theme: string;
  pedagogicalGoal: string;
  activityType: ActivityType;
  difficulty: DifficultyLevel;
  instruction: string;
  teacherTip: string;
  bnccCode: string;
  header: SchoolHeaderConfig;
  syllableItems: SyllableItem[];
  extraBankSyllables?: string[];
  mathItems: VisualMathItem[];
  showNumberStrip: boolean;
  matchingItems: MatchingItem[];
  puzzleMode: 'word_search' | 'crossword';
  puzzleWords: PuzzleWordItem[];
  referenceImageUrl?: string;
  createdAt: string;
}

export interface WebReferenceLink {
  title: string;
  uri: string;
}

export interface WebSearchResult {
  summaryMarkdown: string;
  links: WebReferenceLink[];
  queryUsed: string;
}
