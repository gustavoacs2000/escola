import React, { useMemo, useState } from 'react';
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  RotateCcw,
  Hand,
  Shapes,
} from 'lucide-react';
import {
  WorksheetDocument,
  SyllableItem,
  VisualMathItem,
  MatchingItem,
  PuzzleWordItem,
} from '../types/worksheet';
import { ColoringIllustration, FingerCountIllustration } from '../data/coloringIcons';
import { IconPickerModal } from './IconPickerModal';

interface WorksheetCanvasA4Props {
  worksheet: WorksheetDocument;
  showAnswerKey: boolean;
  onChange: (updated: WorksheetDocument) => void;
}

/**
 * Generates a deterministic 10x10 word search / crossword matrix from the list of puzzle words.
 */
function buildWordPuzzleGrid(words: PuzzleWordItem[], mode: 'word_search' | 'crossword') {
  const size = 10;
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
  const answerMask: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
  const startNumbers: Record<string, number> = {};

  const cleanWords = words
    .map((w) =>
      w.word
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^A-Z]/g, '')
        .slice(0, size)
    )
    .filter((w) => w.length > 0);

  cleanWords.forEach((word, idx) => {
    const isHorizontal = mode === 'word_search' ? idx % 2 === 0 || idx < 4 : idx % 2 === 0;
    let placed = false;

    for (let attempt = 0; attempt < 40 && !placed; attempt++) {
      const r = isHorizontal
        ? (idx * 2 + attempt) % size
        : (attempt * 3) % Math.max(1, size - word.length + 1);
      const c = isHorizontal
        ? (attempt * 2) % Math.max(1, size - word.length + 1)
        : (idx * 2 + attempt) % size;

      if (isHorizontal && c + word.length > size) continue;
      if (!isHorizontal && r + word.length > size) continue;

      let canFit = true;
      for (let i = 0; i < word.length; i++) {
        const nr = isHorizontal ? r : r + i;
        const nc = isHorizontal ? c + i : c;
        const existing = grid[nr][nc];
        if (existing !== '' && existing !== word[i]) {
          canFit = false;
          break;
        }
      }

      if (canFit) {
        startNumbers[`${r}-${c}`] = idx + 1;
        for (let i = 0; i < word.length; i++) {
          const nr = isHorizontal ? r : r + i;
          const nc = isHorizontal ? c + i : c;
          grid[nr][nc] = word[i];
          answerMask[nr][nc] = true;
        }
        placed = true;
      }
    }
  });

  const fillerAlphabet = 'AEIOUBCDFLMNPRSTV';
  if (mode === 'word_search') {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!grid[r][c]) {
          const charIndex = (r * 7 + c * 13 + cleanWords.length * 3) % fillerAlphabet.length;
          grid[r][c] = fillerAlphabet[charIndex];
        }
      }
    }
  }

  return { grid, answerMask, startNumbers, size };
}

export function WorksheetCanvasA4({
  worksheet,
  showAnswerKey,
  onChange,
}: WorksheetCanvasA4Props) {
  const [iconPickerTarget, setIconPickerTarget] = useState<{
    type: 'syllable' | 'math' | 'matching' | 'puzzle';
    id: string;
    currentKey: string;
    wordContext: string;
  } | null>(null);

  const formatTextCase = (text: string) => {
    return worksheet.header.uppercaseOnly ? text.toUpperCase() : text;
  };

  // Syllable bank in deterministic order
  const syllableBank = useMemo(() => {
    const raw = worksheet.syllableItems.map((item) => {
      const idx = Math.min(item.missingIndex, Math.max(0, item.syllables.length - 1));
      return (item.syllables[idx] || '').toUpperCase();
    });
    const extras = (worksheet.extraBankSyllables || []).map((s) => s.toUpperCase());
    const combined = [...raw, ...extras].filter(Boolean);
    // Deterministic permutation so bank isn't in identical order to items
    return combined.map((_, i, arr) => {
      const swapIdx = (i * 3 + 1) % arr.length;
      return arr[swapIdx];
    });
  }, [worksheet.syllableItems, worksheet.extraBankSyllables]);

  // Update helpers
  const updateHeader = (patch: Partial<WorksheetDocument['header']>) => {
    onChange({
      ...worksheet,
      header: { ...worksheet.header, ...patch },
    });
  };

  const updateSyllableItem = (id: string, patch: Partial<SyllableItem>) => {
    onChange({
      ...worksheet,
      syllableItems: worksheet.syllableItems.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  };

  const addSyllableItem = () => {
    const newItem: SyllableItem = {
      id: `s-${Date.now()}`,
      word: 'SAPO',
      syllables: ['SA', 'PO'],
      missingIndex: 0,
      iconKey: 'sapo',
    };
    onChange({
      ...worksheet,
      syllableItems: [...worksheet.syllableItems, newItem],
    });
  };

  const removeSyllableItem = (id: string) => {
    if (worksheet.syllableItems.length <= 2) return;
    onChange({
      ...worksheet,
      syllableItems: worksheet.syllableItems.filter((item) => item.id !== id),
    });
  };

  const updateMathItem = (id: string, patch: Partial<VisualMathItem>) => {
    onChange({
      ...worksheet,
      mathItems: worksheet.mathItems.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  };

  const addMathItem = () => {
    const newItem: VisualMathItem = {
      id: `m-${Date.now()}`,
      leftCount: 2,
      rightCount: 1,
      operator: '+',
      visualStyle: worksheet.mathItems[0]?.visualStyle || 'fingers',
      iconKey: worksheet.mathItems[0]?.iconKey || 'estrela',
      itemLabel: 'Elementos',
    };
    onChange({
      ...worksheet,
      mathItems: [...worksheet.mathItems, newItem],
    });
  };

  const removeMathItem = (id: string) => {
    if (worksheet.mathItems.length <= 1) return;
    onChange({
      ...worksheet,
      mathItems: worksheet.mathItems.filter((item) => item.id !== id),
    });
  };

  const updateMatchingItem = (id: string, patch: Partial<MatchingItem>) => {
    onChange({
      ...worksheet,
      matchingItems: worksheet.matchingItems.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  };

  const addMatchingItem = () => {
    const newItem: MatchingItem = {
      id: `mt-${Date.now()}`,
      word: 'ESTRELA',
      syllableHint: 'ES - TRE - LA',
      iconKey: 'estrela',
    };
    onChange({
      ...worksheet,
      matchingItems: [...worksheet.matchingItems, newItem],
    });
  };

  const removeMatchingItem = (id: string) => {
    if (worksheet.matchingItems.length <= 2) return;
    onChange({
      ...worksheet,
      matchingItems: worksheet.matchingItems.filter((item) => item.id !== id),
    });
  };

  const updatePuzzleWord = (id: string, patch: Partial<PuzzleWordItem>) => {
    onChange({
      ...worksheet,
      puzzleWords: worksheet.puzzleWords.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  };

  const addPuzzleWord = () => {
    const newItem: PuzzleWordItem = {
      id: `pw-${Date.now()}`,
      word: 'SOL',
      hint: 'Brilha no céu durante o dia',
      iconKey: 'sol',
    };
    onChange({
      ...worksheet,
      puzzleWords: [...worksheet.puzzleWords, newItem],
    });
  };

  const removePuzzleWord = (id: string) => {
    if (worksheet.puzzleWords.length <= 2) return;
    onChange({
      ...worksheet,
      puzzleWords: worksheet.puzzleWords.filter((item) => item.id !== id),
    });
  };

  // Shuffled right column for matching activity
  const shuffledMatchingRight = useMemo(() => {
    const items = [...worksheet.matchingItems];
    return items.map((_, idx, arr) => {
      const targetIdx = (idx * 2 + 1) % arr.length;
      return {
        ...arr[targetIdx],
        originalIndex: targetIdx,
      };
    });
  }, [worksheet.matchingItems]);

  const puzzleGridData = useMemo(
    () => buildWordPuzzleGrid(worksheet.puzzleWords, worksheet.puzzleMode),
    [worksheet.puzzleWords, worksheet.puzzleMode]
  );

  return (
    <>
      <div
        className={`a4-sheet-preview relative flex flex-col justify-between p-6 sm:p-8 shadow-sm ${
          worksheet.header.borderStyle === 'dashed'
            ? 'border-2 border-dashed border-slate-500'
            : 'border-[3px] border-slate-900'
        }`}
      >
        <div>
          {/* 1. SCHOOL HEADER BLOCK (Matches both attached reference formats) */}
          {worksheet.header.borderStyle === 'dashed' ? (
            <div className="pb-4 mb-5 border-b-2 border-dashed border-slate-400 space-y-2 text-sm">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-slate-900 shrink-0">Escola:</span>
                <input
                  type="text"
                  value={worksheet.header.schoolName}
                  onChange={(e) => updateHeader({ schoolName: e.target.value })}
                  placeholder="____________________________________________________________________"
                  className="w-full border-b border-dotted border-slate-700 focus:outline-none focus:border-sky-600 text-slate-900 font-medium bg-transparent"
                />
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-7 flex items-baseline gap-2">
                  <span className="font-bold text-slate-900 shrink-0">Data:</span>
                  <span className="w-full border-b border-dotted border-slate-700 h-4 inline-block" />
                </div>
                <div className="col-span-5 flex items-baseline gap-2">
                  <span className="font-bold text-slate-900 shrink-0">Turma:</span>
                  <span className="w-full border-b border-dotted border-slate-700 h-4 inline-block" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-slate-900 shrink-0">Aluno(a):</span>
                <span className="w-full border-b border-dotted border-slate-700 h-4 inline-block" />
              </div>
            </div>
          ) : (
            <div className="border-2 border-slate-900 rounded-3xl px-6 py-4 mb-5 space-y-2.5">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-sm tracking-wide text-slate-900 shrink-0">
                  ESCOLA:
                </span>
                <input
                  type="text"
                  value={worksheet.header.schoolName}
                  onChange={(e) => updateHeader({ schoolName: e.target.value })}
                  placeholder="Clique para digitar o nome da escola (ou deixe a linha em branco)"
                  className="w-full border-b border-slate-800 focus:outline-none focus:border-sky-600 text-sm font-semibold text-slate-900 placeholder:text-slate-300 print:placeholder:text-transparent bg-transparent"
                />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-sm tracking-wide text-slate-900 shrink-0">
                  NOME:
                </span>
                <div className="w-full border-b border-slate-800 h-4" />
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-7 flex items-baseline gap-2">
                  <span className="font-bold text-sm tracking-wide text-slate-900 shrink-0">
                    DATA:
                  </span>
                  <div className="w-full border-b border-slate-800 h-4" />
                </div>
                <div className="col-span-5 flex items-baseline gap-2">
                  <span className="font-bold text-sm tracking-wide text-slate-900 shrink-0">
                    TURMA:
                  </span>
                  <div className="w-full border-b border-slate-800 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* 2. TITLE & INSTRUCTION */}
          <div className="text-center mb-4">
            <input
              type="text"
              value={formatTextCase(worksheet.title)}
              onChange={(e) => onChange({ ...worksheet, title: e.target.value })}
              className="w-full text-center font-display text-xl sm:text-2xl font-extrabold tracking-wide text-slate-900 bg-transparent focus:outline-none focus:bg-sky-50/50 rounded px-2 py-0.5"
              aria-label="Título da folha de atividade"
            />
            <input
              type="text"
              value={worksheet.instruction}
              onChange={(e) => onChange({ ...worksheet, instruction: e.target.value })}
              className="w-full text-center text-sm sm:text-base font-medium text-slate-800 bg-transparent focus:outline-none focus:bg-sky-50/50 rounded px-2 py-0.5 mt-0.5"
              aria-label="Enunciado da atividade"
            />
          </div>

          {/* =====================================================================
              MODE 1: COMPLETAR SÍLABAS E LETRAS (Matches /assets/aistudio/image_4364be6c.png)
             ===================================================================== */}
          {worksheet.activityType === 'syllables' && (
            <div className="space-y-6">
              {/* Syllable Bank Grid */}
              <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
                {syllableBank.map((syl, index) => (
                  <div
                    key={`${syl}-${index}`}
                    className="border-2 border-slate-900 py-1.5 px-3 text-center font-display text-lg font-bold tracking-wider text-slate-900 bg-white"
                  >
                    {formatTextCase(syl)}
                  </div>
                ))}
              </div>

              {/* 2-Column Visual Word Exercises */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-2">
                {worksheet.syllableItems.map((item) => {
                  const missingIdx = Math.min(
                    item.missingIndex,
                    Math.max(0, item.syllables.length - 1)
                  );

                  return (
                    <div
                      key={item.id}
                      className="group relative flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50/90 transition-colors"
                    >
                      {/* Clickable Coloring Illustration */}
                      <button
                        type="button"
                        onClick={() =>
                          setIconPickerTarget({
                            type: 'syllable',
                            id: item.id,
                            currentKey: item.iconKey,
                            wordContext: item.word,
                          })
                        }
                        title="Clique para trocar ou desenhar outra figura"
                        className="relative shrink-0 p-1 rounded-lg border border-transparent group-hover:border-slate-300 transition-colors cursor-pointer"
                      >
                        <ColoringIllustration
                          iconKey={item.iconKey}
                          customSvg={item.customSvg}
                          className="w-20 h-20"
                        />
                        <span className="no-print opacity-0 group-hover:opacity-100 absolute -top-2 -right-2 bg-sky-600 text-white p-1 rounded-full shadow">
                          <ImageIcon className="w-3 h-3" />
                        </span>
                      </button>

                      {/* Word with Missing Syllable Blank */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline flex-wrap gap-1 font-display text-2xl sm:text-3xl font-bold tracking-wide text-slate-900">
                          {item.syllables.map((syl, sIdx) => {
                            const isMissing = sIdx === missingIdx;
                            if (isMissing) {
                              return (
                                <button
                                  key={sIdx}
                                  type="button"
                                  onClick={() =>
                                    updateSyllableItem(item.id, {
                                      missingIndex: (missingIdx + 1) % item.syllables.length,
                                    })
                                  }
                                  title="Clique para alternar qual sílaba fica em branco"
                                  className="inline-flex items-baseline justify-center min-w-[2.6rem] border-b-[3px] border-slate-900 px-1 text-center cursor-pointer hover:bg-amber-50/80"
                                >
                                  {showAnswerKey ? (
                                    <span className="text-emerald-700 font-extrabold">
                                      {formatTextCase(syl)}
                                    </span>
                                  ) : (
                                    <span className="opacity-0 select-none">
                                      {formatTextCase(syl)}
                                    </span>
                                  )}
                                </button>
                              );
                            }
                            return (
                              <span
                                key={sIdx}
                                onClick={() =>
                                  updateSyllableItem(item.id, { missingIndex: sIdx })
                                }
                                title="Clique para ocultar esta sílaba"
                                className="cursor-pointer hover:text-sky-700"
                              >
                                {formatTextCase(syl)}
                              </span>
                            );
                          })}
                        </div>

                        {/* Inline Teacher Edit Bar (Hidden on Print) */}
                        <div className="no-print opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity mt-1.5 flex items-center gap-1.5">
                          <input
                            type="text"
                            value={item.syllables.join('-')}
                            onChange={(e) => {
                              const rawVal = e.target.value.toUpperCase();
                              const parts = rawVal
                                .split('-')
                                .map((p) => p.trim())
                                .filter(Boolean);
                              if (parts.length > 0) {
                                updateSyllableItem(item.id, {
                                  word: parts.join(''),
                                  syllables: parts,
                                  missingIndex: Math.min(item.missingIndex, parts.length - 1),
                                });
                              }
                            }}
                            title="Separe as sílabas com hífen (ex: BO-LO)"
                            className="w-28 px-2 py-0.5 text-xs font-mono bg-white border border-slate-300 rounded focus:outline-none focus:border-sky-600"
                          />
                          <button
                            type="button"
                            onClick={() => removeSyllableItem(item.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded"
                            title="Remover palavra"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Item Button (Hidden on Print) */}
              <div className="no-print pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={addSyllableItem}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar Palavra na Folha
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              MODE 2: CONTAGEM E SOMA VISUAL (Matches /assets/aistudio/image_b753dd93.png)
             ===================================================================== */}
          {worksheet.activityType === 'visual_math' && (
            <div className="space-y-6">
              {/* Number Strip 0 to 9 */}
              {worksheet.showNumberStrip && (
                <div className="border-[3px] border-slate-900 rounded-3xl py-2.5 px-6 max-w-xl mx-auto flex items-center justify-between font-mono-tabular text-2xl sm:text-3xl font-bold text-slate-900">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <span key={num}>{num}</span>
                  ))}
                </div>
              )}

              {/* Visual Equations */}
              <div className="space-y-6 pt-1">
                {worksheet.mathItems.map((item) => {
                  const total =
                    item.operator === '-'
                      ? Math.max(0, item.leftCount - item.rightCount)
                      : item.leftCount + item.rightCount;

                  const renderVisualGroup = (count: number) => {
                    if (item.visualStyle === 'fingers') {
                      return <FingerCountIllustration count={count} className="w-20 h-20" />;
                    }
                    return (
                      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1">
                        {Array.from({ length: Math.max(1, Math.min(10, count)) }).map((_, idx) => (
                          <ColoringIllustration
                            key={idx}
                            iconKey={item.iconKey}
                            className="w-9 h-9"
                          />
                        ))}
                      </div>
                    );
                  };

                  return (
                    <div
                      key={item.id}
                      className="group relative p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="grid grid-cols-11 items-center gap-2 max-w-xl mx-auto">
                        {/* Left Operand Box */}
                        <div className="col-span-3 flex flex-col items-center">
                          <div className="w-full min-h-[5.5rem] border-2 border-slate-900 flex items-center justify-center bg-white p-1">
                            {renderVisualGroup(item.leftCount)}
                          </div>
                          <div className="w-20 h-11 mt-1.5 border-2 border-slate-900 rounded-2xl flex items-center justify-center font-mono-tabular text-xl font-bold text-emerald-700 bg-white">
                            {showAnswerKey ? item.leftCount : ''}
                          </div>
                        </div>

                        {/* Operator (+ or -) */}
                        <div className="col-span-1 flex items-center justify-center pb-10">
                          <button
                            type="button"
                            onClick={() =>
                              updateMathItem(item.id, {
                                operator: item.operator === '+' ? '-' : '+',
                              })
                            }
                            title="Clique para alternar entre + e -"
                            className="font-display text-4xl font-extrabold text-slate-900 cursor-pointer hover:text-sky-600"
                          >
                            {item.operator}
                          </button>
                        </div>

                        {/* Right Operand Box */}
                        <div className="col-span-3 flex flex-col items-center">
                          <div className="w-full min-h-[5.5rem] border-2 border-slate-900 flex items-center justify-center bg-white p-1">
                            {renderVisualGroup(item.rightCount)}
                          </div>
                          <div className="w-20 h-11 mt-1.5 border-2 border-slate-900 rounded-2xl flex items-center justify-center font-mono-tabular text-xl font-bold text-emerald-700 bg-white">
                            {showAnswerKey ? item.rightCount : ''}
                          </div>
                        </div>

                        {/* Equals Sign */}
                        <div className="col-span-1 flex items-center justify-center pb-10 font-display text-4xl font-extrabold text-slate-900">
                          =
                        </div>

                        {/* Result Box */}
                        <div className="col-span-3 flex flex-col items-center">
                          <div className="w-full min-h-[5.5rem] border-2 border-slate-900 flex items-center justify-center bg-white p-1">
                            {renderVisualGroup(total)}
                          </div>
                          <div className="w-20 h-11 mt-1.5 border-2 border-slate-900 rounded-2xl flex items-center justify-center font-mono-tabular text-xl font-bold text-emerald-700 bg-white">
                            {showAnswerKey ? total : ''}
                          </div>
                        </div>
                      </div>

                      {/* Teacher Row Controls (Hidden on Print) */}
                      <div className="no-print opacity-0 group-hover:opacity-100 transition-opacity mt-2 flex items-center justify-center gap-3 text-xs">
                        <div className="inline-flex items-center gap-1 bg-white border border-slate-300 rounded-lg px-2 py-1">
                          <span className="text-slate-600 font-medium">1ª Mão/Grupo:</span>
                          <input
                            type="number"
                            min={1}
                            max={5}
                            value={item.leftCount}
                            onChange={(e) =>
                              updateMathItem(item.id, {
                                leftCount: Math.max(1, Math.min(5, Number(e.target.value) || 1)),
                              })
                            }
                            className="w-10 text-center font-mono font-bold text-slate-900"
                          />
                        </div>
                        <div className="inline-flex items-center gap-1 bg-white border border-slate-300 rounded-lg px-2 py-1">
                          <span className="text-slate-600 font-medium">2ª Mão/Grupo:</span>
                          <input
                            type="number"
                            min={1}
                            max={5}
                            value={item.rightCount}
                            onChange={(e) =>
                              updateMathItem(item.id, {
                                rightCount: Math.max(1, Math.min(5, Number(e.target.value) || 1)),
                              })
                            }
                            className="w-10 text-center font-mono font-bold text-slate-900"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            updateMathItem(item.id, {
                              visualStyle:
                                item.visualStyle === 'fingers' ? 'theme_icons' : 'fingers',
                            })
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
                        >
                          {item.visualStyle === 'fingers' ? (
                            <>
                              <Shapes className="w-3.5 h-3.5" /> Usar Figuras
                            </>
                          ) : (
                            <>
                              <Hand className="w-3.5 h-3.5" /> Usar Dedinhos
                            </>
                          )}
                        </button>
                        {item.visualStyle === 'theme_icons' && (
                          <button
                            type="button"
                            onClick={() =>
                              setIconPickerTarget({
                                type: 'math',
                                id: item.id,
                                currentKey: item.iconKey,
                                wordContext: worksheet.theme,
                              })
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-50 border border-sky-200 rounded-lg text-sky-700 hover:bg-sky-100 cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5" /> Trocar Figura
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeMathItem(item.id)}
                          className="p-1 text-slate-400 hover:text-red-600"
                          title="Remover linha"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="no-print flex items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={addMathItem}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar Operação Visual
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onChange({ ...worksheet, showNumberStrip: !worksheet.showNumberStrip })
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  {worksheet.showNumberStrip ? 'Ocultar Reta 0–9' : 'Mostrar Reta 0–9'}
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              MODE 3: LIGAR IMAGENS ÀS PALAVRAS CORRESPONDENTES
             ===================================================================== */}
          {worksheet.activityType === 'matching' && (
            <div className="space-y-4 pt-2">
              <div className="relative grid grid-cols-12 items-center gap-4 max-w-xl mx-auto">
                {/* Left Column: Illustrations */}
                <div className="col-span-5 space-y-4">
                  {worksheet.matchingItems.map((item) => (
                    <div
                      key={item.id}
                      className="group relative flex items-center justify-between border-2 border-slate-900 rounded-2xl p-2.5 bg-white"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setIconPickerTarget({
                            type: 'matching',
                            id: item.id,
                            currentKey: item.iconKey,
                            wordContext: item.word,
                          })
                        }
                        className="flex items-center gap-2 cursor-pointer"
                        title="Clique para trocar a figura"
                      >
                        <ColoringIllustration
                          iconKey={item.iconKey}
                          customSvg={item.customSvg}
                          className="w-16 h-16"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeMatchingItem(item.id)}
                        className="no-print opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600"
                        title="Remover par"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {/* Right Connection Dot */}
                      <div className="w-4 h-4 rounded-full bg-slate-900 -mr-4 border-2 border-white" />
                    </div>
                  ))}
                </div>

                {/* Middle Space for Student Pencil Lines */}
                <div className="col-span-2 flex flex-col items-center justify-center h-full">
                  {showAnswerKey && (
                    <div className="text-center text-xs font-mono font-bold text-emerald-700 space-y-14">
                      {worksheet.matchingItems.map((item, idx) => (
                        <div key={item.id} className="bg-emerald-50 border border-emerald-300 px-1.5 py-0.5 rounded">
                          {idx + 1} → {item.word}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Shuffled Words & Syllable Breakdown */}
                <div className="col-span-5 space-y-4">
                  {shuffledMatchingRight.map((rightItem) => (
                    <div
                      key={rightItem.id}
                      className="flex items-center justify-between border-2 border-slate-900 rounded-2xl px-4 py-3.5 bg-white min-h-[5.25rem]"
                    >
                      {/* Left Connection Dot */}
                      <div className="w-4 h-4 rounded-full bg-slate-900 -ml-6 border-2 border-white shrink-0" />
                      <div className="flex-1 text-center">
                        <input
                          type="text"
                          value={formatTextCase(rightItem.word)}
                          onChange={(e) =>
                            updateMatchingItem(rightItem.id, {
                              word: e.target.value.toUpperCase(),
                            })
                          }
                          className="w-full text-center font-display text-xl font-extrabold tracking-wider text-slate-900 bg-transparent focus:outline-none focus:bg-sky-50 rounded"
                        />
                        <input
                          type="text"
                          value={formatTextCase(rightItem.syllableHint)}
                          onChange={(e) =>
                            updateMatchingItem(rightItem.id, {
                              syllableHint: e.target.value.toUpperCase(),
                            })
                          }
                          className="w-full text-center font-mono text-xs text-slate-500 bg-transparent focus:outline-none mt-0.5"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="no-print pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={addMatchingItem}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar Par Figura-Palavra
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              MODE 4: CAÇA-PALAVRAS E CRUZADINHAS ILUSTRADAS
             ===================================================================== */}
          {worksheet.activityType === 'word_puzzle' && (
            <div className="space-y-5">
              {/* Toggle Puzzle Mode (Hidden on Print) */}
              <div className="no-print flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ...worksheet, puzzleMode: 'word_search' })}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border cursor-pointer ${
                    worksheet.puzzleMode === 'word_search'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Modo Caça-Palavras
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...worksheet, puzzleMode: 'crossword' })}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border cursor-pointer ${
                    worksheet.puzzleMode === 'crossword'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Modo Cruzadinha Ilustrada
                </button>
              </div>

              {/* Letter Matrix */}
              <div className="flex justify-center">
                <div className="inline-grid grid-cols-10 border-2 border-slate-900 bg-white">
                  {puzzleGridData.grid.map((row, rIdx) =>
                    row.map((letter, cIdx) => {
                      const isAnswerCell = puzzleGridData.answerMask[rIdx][cIdx];
                      const clueNumber = puzzleGridData.startNumbers[`${rIdx}-${cIdx}`];

                      if (worksheet.puzzleMode === 'crossword' && !isAnswerCell) {
                        return (
                          <div
                            key={`${rIdx}-${cIdx}`}
                            className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-200/70 border border-slate-300"
                          />
                        );
                      }

                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className={`relative w-8 h-8 sm:w-9 sm:h-9 border border-slate-800 flex items-center justify-center font-mono-tabular text-base sm:text-lg font-bold ${
                            showAnswerKey && isAnswerCell
                              ? 'bg-emerald-100 text-emerald-900 font-extrabold'
                              : 'bg-white text-slate-900'
                          }`}
                        >
                          {clueNumber && (
                            <span className="absolute top-0.5 left-1 text-[9px] font-mono font-bold text-slate-500 leading-none">
                              {clueNumber}
                            </span>
                          )}
                          {worksheet.puzzleMode === 'crossword'
                            ? showAnswerKey
                              ? letter
                              : ''
                            : letter}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Illustrated Clues Box */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {worksheet.puzzleWords.map((item, idx) => (
                  <div
                    key={item.id}
                    className="group relative flex items-center gap-2.5 border-2 border-slate-900 rounded-xl p-2 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setIconPickerTarget({
                          type: 'puzzle',
                          id: item.id,
                          currentKey: item.iconKey,
                          wordContext: item.word,
                        })
                      }
                      className="shrink-0 cursor-pointer"
                      title="Clique para trocar a figura"
                    >
                      <ColoringIllustration
                        iconKey={item.iconKey}
                        customSvg={item.customSvg}
                        className="w-12 h-12"
                      />
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs font-bold text-slate-500">
                          {idx + 1}.
                        </span>
                        <input
                          type="text"
                          value={formatTextCase(item.word)}
                          onChange={(e) =>
                            updatePuzzleWord(item.id, {
                              word: e.target.value.toUpperCase(),
                            })
                          }
                          className="w-full font-display text-sm font-bold text-slate-900 bg-transparent focus:outline-none focus:bg-sky-50 rounded"
                        />
                      </div>
                      <input
                        type="text"
                        value={item.hint}
                        onChange={(e) => updatePuzzleWord(item.id, { hint: e.target.value })}
                        className="w-full text-[11px] text-slate-600 bg-transparent focus:outline-none truncate"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePuzzleWord(item.id)}
                      className="no-print opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="no-print flex justify-center">
                <button
                  type="button"
                  onClick={addPuzzleWord}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar Palavra ao Desafio
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. WORKSHEET FOOTER */}
        <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            {worksheet.header.showColoringHint
              ? 'Dica para o aluno: Pinte os desenhos com capricho após terminar!'
              : ''}
          </span>
          <span>{worksheet.header.footerCredit}</span>
        </div>
      </div>

      {/* Icon Picker & AI Drawing Modal */}
      <IconPickerModal
        isOpen={Boolean(iconPickerTarget)}
        currentIconKey={iconPickerTarget?.currentKey || 'estrela'}
        wordContext={iconPickerTarget?.wordContext || ''}
        onClose={() => setIconPickerTarget(null)}
        onSelectIcon={(newKey, customSvg) => {
          if (!iconPickerTarget) return;
          if (iconPickerTarget.type === 'syllable') {
            updateSyllableItem(iconPickerTarget.id, { iconKey: newKey, customSvg });
          } else if (iconPickerTarget.type === 'math') {
            updateMathItem(iconPickerTarget.id, { iconKey: newKey });
          } else if (iconPickerTarget.type === 'matching') {
            updateMatchingItem(iconPickerTarget.id, { iconKey: newKey, customSvg });
          } else if (iconPickerTarget.type === 'puzzle') {
            updatePuzzleWord(iconPickerTarget.id, { iconKey: newKey, customSvg });
          }
        }}
      />
    </>
  );
}
