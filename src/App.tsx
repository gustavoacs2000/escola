import React, { useState, useEffect } from 'react';
import {
  Printer,
  CheckCircle2,
  Loader2,
  Bookmark,
  Trash2,
  Type as TypeIcon,
  Frame,
  BookOpen,
  Wand2,
} from 'lucide-react';
import {
  ActivityType,
  DifficultyLevel,
  WorksheetDocument,
} from './types/worksheet';
import { PRESET_WORKSHEETS, QUICK_THEMES } from './data/presetWorksheets';
import { WorksheetCanvasA4 } from './components/WorksheetCanvasA4';
import { WebReferencePanel } from './components/WebReferencePanel';
import { generateLocalPedagogicalWorksheet } from './utils/localPedagogicalEngine';

const STORAGE_KEY = 'estudio_alfabetizar_saved_v1';

const ACTIVITY_TYPE_OPTIONS: Array<{
  id: ActivityType;
  label: string;
  shortDesc: string;
}> = [
  {
    id: 'syllables',
    label: 'Completar Sílabas',
    shortDesc: 'Quadro de sílabas + figuras para completar',
  },
  {
    id: 'visual_math',
    label: 'Soma com Dedinhos / Figuras',
    shortDesc: 'Reta 0 a 9 + contagem visual ilustrada',
  },
  {
    id: 'matching',
    label: 'Ligar Figura à Palavra',
    shortDesc: 'Associação entre desenho e escrita',
  },
  {
    id: 'word_puzzle',
    label: 'Caça-Palavras & Cruzadinha',
    shortDesc: 'Grade de letras com dicas ilustradas',
  },
];

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState<
    'generator' | 'web_search' | 'presets' | 'saved'
  >('generator');

  const [worksheet, setWorksheet] = useState<WorksheetDocument>(PRESET_WORKSHEETS[0]);
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  // Generator Form State
  const [themeInput, setThemeInput] = useState('Circo e Espetáculo');
  const [goalInput, setGoalInput] = useState('Sílabas simples iniciais (CV)');
  const [selectedType, setSelectedType] = useState<ActivityType>('syllables');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('facil');
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // Saved teacher notebook in localStorage
  const [savedWorksheets, setSavedWorksheets] = useState<WorksheetDocument[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return PRESET_WORKSHEETS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedWorksheets));
    } catch {
      // ignore storage quota errors
    }
  }, [savedWorksheets]);

  const handlePrintA4 = () => {
    window.print();
  };

  const handleSaveToNotebook = () => {
    const exists = savedWorksheets.some((w) => w.id === worksheet.id);
    const updatedToSave: WorksheetDocument = {
      ...worksheet,
      id: exists ? `ws-${Date.now()}` : worksheet.id,
      createdAt: new Date().toISOString(),
    };
    setSavedWorksheets([updatedToSave, ...savedWorksheets]);
    setSaveFeedback('Atividade salva no Meu Caderno!');
    setTimeout(() => setSaveFeedback(null), 2800);
  };

  const handleDeleteSaved = (id: string) => {
    setSavedWorksheets((prev) => prev.filter((item) => item.id !== id));
  };

  const handleGenerateWithAi = async (
    overrideTheme?: string,
    overrideGoal?: string,
    overrideType?: ActivityType
  ) => {
    const finalTheme = (overrideTheme ?? themeInput).trim() || 'Animais e Brincadeiras';
    const finalGoal = (overrideGoal ?? goalInput).trim() || 'Sílabas simples';
    const finalType = overrideType ?? selectedType;

    setIsGenerating(true);

    try {
      const response = await fetch('/api/worksheets/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme: finalTheme,
          pedagogicalGoal: finalGoal,
          activityType: finalType,
          difficulty,
          itemCount: finalType === 'syllables' ? 8 : 6,
        }),
      });

      if (!response.ok) {
        throw new Error('Using instant local pedagogical engine');
      }

      const data = await response.json();

      const fallbackLocal = generateLocalPedagogicalWorksheet({
        theme: finalTheme,
        pedagogicalGoal: finalGoal,
        activityType: finalType,
        difficulty,
        baseHeader: worksheet.header,
      });

      const newDoc: WorksheetDocument = {
        id: `ai-${Date.now()}`,
        title: data.title || fallbackLocal.title,
        theme: finalTheme,
        pedagogicalGoal: finalGoal,
        activityType: finalType,
        difficulty,
        instruction: data.instruction || fallbackLocal.instruction,
        teacherTip: data.teacherTip || fallbackLocal.teacherTip,
        bnccCode: data.bnccCode || fallbackLocal.bnccCode,
        header: {
          ...worksheet.header,
          borderStyle: finalType === 'visual_math' ? 'dashed' : 'rounded',
        },
        syllableItems:
          Array.isArray(data.syllableItems) && data.syllableItems.length > 0
            ? data.syllableItems.map((it: any, idx: number) => ({
                id: `s-${Date.now()}-${idx}`,
                word: String(it.word || 'BOLA').toUpperCase(),
                syllables:
                  Array.isArray(it.syllables) && it.syllables.length > 0
                    ? it.syllables.map((s: string) => String(s).toUpperCase())
                    : ['BO', 'LA'],
                missingIndex: Number(it.missingIndex) || 0,
                iconKey: it.iconKey || 'bola',
                customSvg: it.customSvg,
              }))
            : fallbackLocal.syllableItems,
        mathItems:
          Array.isArray(data.mathItems) && data.mathItems.length > 0
            ? data.mathItems.map((it: any, idx: number) => ({
                id: `m-${Date.now()}-${idx}`,
                leftCount: Math.max(1, Math.min(5, Number(it.leftCount) || 2)),
                rightCount: Math.max(1, Math.min(5, Number(it.rightCount) || 2)),
                operator: it.operator === '-' ? '-' : '+',
                visualStyle:
                  it.visualStyle === 'theme_icons' ? 'theme_icons' : 'fingers',
                iconKey: it.iconKey || 'estrela',
                itemLabel: it.itemLabel || finalTheme,
              }))
            : fallbackLocal.mathItems,
        showNumberStrip: true,
        matchingItems:
          Array.isArray(data.matchingItems) && data.matchingItems.length > 0
            ? data.matchingItems.map((it: any, idx: number) => ({
                id: `mt-${Date.now()}-${idx}`,
                word: String(it.word || 'PALHAÇO').toUpperCase(),
                syllableHint: String(it.syllableHint || 'PA - LHA - ÇO').toUpperCase(),
                iconKey: it.iconKey || 'palhaco',
                customSvg: it.customSvg,
              }))
            : fallbackLocal.matchingItems,
        puzzleMode: 'word_search',
        puzzleWords:
          Array.isArray(data.puzzleWords) && data.puzzleWords.length > 0
            ? data.puzzleWords.map((it: any, idx: number) => ({
                id: `pw-${Date.now()}-${idx}`,
                word: String(it.word || 'GATO').toUpperCase(),
                hint: String(it.hint || 'Animal doméstico'),
                iconKey: it.iconKey || 'gato',
                customSvg: it.customSvg,
              }))
            : fallbackLocal.puzzleWords,
        createdAt: new Date().toISOString(),
      };

      setWorksheet(newDoc);
    } catch {
      // Seamless zero-cost local generation (ensures 100% free functionality even on static GitHub Pages)
      const localDoc = generateLocalPedagogicalWorksheet({
        theme: finalTheme,
        pedagogicalGoal: finalGoal,
        activityType: finalType,
        difficulty,
        baseHeader: worksheet.header,
      });
      setWorksheet(localDoc);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* =======================================================================
          TOP BAR CONTRACT (3 zones: Single-element Brand — 4 Nav Links — 1 CTA)
         ======================================================================= */}
      <header className="no-print sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveNavTab('generator');
          }}
          className="text-lg font-extrabold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0"
        >
          Estúdio Alfabetizar
        </a>

        {/* Zone 2: 4 Concise Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveNavTab('generator')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
              activeNavTab === 'generator'
                ? 'text-slate-900 font-semibold border-b-2 border-sky-600'
                : ''
            }`}
          >
            Gerador IA
          </button>
          <button
            type="button"
            onClick={() => setActiveNavTab('web_search')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
              activeNavTab === 'web_search'
                ? 'text-slate-900 font-semibold border-b-2 border-sky-600'
                : ''
            }`}
          >
            Referências Web
          </button>
          <button
            type="button"
            onClick={() => setActiveNavTab('presets')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
              activeNavTab === 'presets'
                ? 'text-slate-900 font-semibold border-b-2 border-sky-600'
                : ''
            }`}
          >
            Modelos Prontos
          </button>
          <button
            type="button"
            onClick={() => setActiveNavTab('saved')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
              activeNavTab === 'saved'
                ? 'text-slate-900 font-semibold border-b-2 border-sky-600'
                : ''
            }`}
          >
            Meu Caderno ({savedWorksheets.length})
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrintA4}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Salvar PDF (A4)
          </button>
        </div>
      </header>

      {/* =======================================================================
          MAIN TWO-ZONE WORKSPACE (Left: Pedagogical Deck | Right: Interactive A4)
         ======================================================================= */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print-only-container">
        {/* LEFT COLUMN: TEACHER CONTROL & WEB DISCOVERY PANEL (Hidden on Print) */}
        <aside className="no-print lg:col-span-5 xl:col-span-4 space-y-5">
          {/* Mobile Tab Switcher */}
          <div className="flex md:hidden items-center gap-1 p-1 bg-slate-200/70 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveNavTab('generator')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
                activeNavTab === 'generator' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Gerador IA
            </button>
            <button
              type="button"
              onClick={() => setActiveNavTab('web_search')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
                activeNavTab === 'web_search' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Busca Web
            </button>
            <button
              type="button"
              onClick={() => setActiveNavTab('presets')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
                activeNavTab === 'presets' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Modelos
            </button>
          </div>

          {/* TAB 1: AI WORKSHEET GENERATOR */}
          {activeNavTab === 'generator' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
              <div>
                <h1 className="text-lg font-bold text-slate-900 font-display text-balance">
                  Montar Atividade Visual de Alfabetização
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Informe o tema lúdico e o conteúdo para gerar uma folha A4 ilustrada pronta para editar, colorir e imprimir gratuitamente.
                </p>
              </div>

              {/* Quick Theme Suggestions */}
              <div>
                <span className="block text-xs font-semibold text-slate-700 mb-2">
                  Sugestões rápidas de temas infantis:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_THEMES.map((qt) => (
                    <button
                      key={qt.label}
                      type="button"
                      onClick={() => {
                        setThemeInput(qt.theme);
                        setGoalInput(qt.goal);
                        const nextType: ActivityType = qt.label.includes('Dedinhos')
                          ? 'visual_math'
                          : selectedType;
                        if (qt.label.includes('Dedinhos')) {
                          setSelectedType('visual_math');
                        }
                        handleGenerateWithAi(qt.theme, qt.goal, nextType);
                      }}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        themeInput === qt.theme
                          ? 'bg-sky-50 border-sky-600 text-sky-800 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {qt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme & Content Inputs */}
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    1. Tema Lúdico da Atividade
                  </label>
                  <input
                    type="text"
                    value={themeInput}
                    onChange={(e) => setThemeInput(e.target.value)}
                    placeholder="Ex: Animais da Fazenda, Circo, Dinossauros, Brinquedos..."
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    2. Conteúdo ou Habilidade Pedagógica
                  </label>
                  <input
                    type="text"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    placeholder="Ex: Sílabas simples (BO, CA, DA), Soma até 10, Vogais..."
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
                  />
                </div>

                {/* Activity Type Selector (4 Visual Formats) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    3. Formato Visual da Folha A4
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {ACTIVITY_TYPE_OPTIONS.map((opt) => {
                      const active = selectedType === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSelectedType(opt.id);
                            setWorksheet((prev) => ({
                              ...prev,
                              activityType: opt.id,
                            }));
                          }}
                          className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'border-sky-600 bg-sky-50/70 ring-1 ring-sky-600'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900">
                              {opt.label}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {opt.shortDesc}
                            </div>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              active ? 'border-sky-600 bg-sky-600' : 'border-slate-300'
                            }`}
                          >
                            {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Difficulty Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    4. Etapa / Nível de Complexidade
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-lg">
                    {(
                      [
                        { id: 'facil', label: 'Iniciante (Ed. Infantil)' },
                        { id: 'medio', label: '1º Ano (Padrão)' },
                        { id: 'desafio', label: '2º Ano (Desafio)' },
                      ] as const
                    ).map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setDifficulty(lvl.id)}
                        className={`px-2 py-1.5 text-[11px] font-semibold rounded-md transition-colors cursor-pointer truncate ${
                          difficulty === lvl.id
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Primary Generate CTA */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleGenerateWithAi()}
                  disabled={isGenerating}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Criando Folha Ilustrada...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      Gerar Atividade Visual na Folha A4
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNavTab('web_search')}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                  Ou Buscar Referências Gratuitas na Internet
                </button>
              </div>

              {/* Pedagogical Guidance Footer Box */}
              <div className="pt-4 border-t border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Alinhamento BNCC</span>
                  <span aria-hidden="true">·</span>
                  <span>{worksheet.bnccCode}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Sugestão de Mediação:</strong>{' '}
                  {worksheet.teacherTip}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2 & 3: WEB SEARCH & PRESETS */}
          {(activeNavTab === 'web_search' || activeNavTab === 'presets') && (
            <WebReferencePanel
              currentTheme={themeInput}
              currentGoal={goalInput}
              onSelectPreset={(preset) => {
                setWorksheet(preset);
                setSelectedType(preset.activityType);
              }}
              onGenerateFromWebIdea={(theme, goal) => {
                setThemeInput(theme);
                setGoalInput(goal);
                setActiveNavTab('generator');
                handleGenerateWithAi(theme, goal);
              }}
            />
          )}

          {/* TAB 4: SAVED TEACHER NOTEBOOK */}
          {activeNavTab === 'saved' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">
                  Meu Caderno de Atividades Salvas
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Suas folhas personalizadas ficam salvas gratuitamente neste navegador para reutilizar quando quiser.
                </p>
              </div>

              <div className="space-y-2.5">
                {savedWorksheets.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/60 flex items-center justify-between gap-3"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setWorksheet(item);
                        setSelectedType(item.activityType);
                      }}
                      className="text-left min-w-0 flex-1 cursor-pointer"
                    >
                      <div className="text-sm font-bold text-slate-900 truncate font-display">
                        {item.title}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 truncate">
                        <span>{item.theme}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.pedagogicalGoal}</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSaved(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                      title="Excluir do caderno"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* RIGHT COLUMN: A4 WORKSHEET STUDIO & TOOLBAR */}
        <section className="lg:col-span-7 xl:col-span-8 space-y-4 print-only-container">
          {/* Interactive Sheet Toolbar (Hidden on Print) */}
          <div className="no-print bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Quick Activity Format Switcher on the Sheet */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setShowAnswerKey((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  showAnswerKey
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {showAnswerKey ? 'Visualizando Gabarito' : 'Ver Gabarito do Professor'}
              </button>

              <button
                type="button"
                onClick={() =>
                  setWorksheet((prev) => ({
                    ...prev,
                    header: {
                      ...prev.header,
                      uppercaseOnly: !prev.header.uppercaseOnly,
                    },
                  }))
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <TypeIcon className="w-3.5 h-3.5" />
                {worksheet.header.uppercaseOnly
                  ? 'Letra: CAIXA ALTA (Bastão)'
                  : 'Letra: Mista'}
              </button>

              <button
                type="button"
                onClick={() =>
                  setWorksheet((prev) => ({
                    ...prev,
                    header: {
                      ...prev.header,
                      borderStyle:
                        prev.header.borderStyle === 'rounded' ? 'dashed' : 'rounded',
                    },
                  }))
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Frame className="w-3.5 h-3.5" />
                {worksheet.header.borderStyle === 'rounded'
                  ? 'Cabeçalho: Quadro Escolar'
                  : 'Cabeçalho: Recorte Tracejado'}
              </button>
            </div>

            {/* Save & Print Actions */}
            <div className="flex items-center gap-2">
              {saveFeedback && (
                <span className="text-xs font-semibold text-emerald-700">
                  {saveFeedback}
                </span>
              )}
              <button
                type="button"
                onClick={handleSaveToNotebook}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Bookmark className="w-3.5 h-3.5" />
                Salvar no Caderno
              </button>
              <button
                type="button"
                onClick={handlePrintA4}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Printer className="w-3.5 h-3.5" />
                Imprimir Folha A4
              </button>
            </div>
          </div>

          {/* Interactive Helper Banner (Hidden on Print) */}
          <div className="no-print flex items-center justify-between px-4 py-2 bg-sky-50/80 border border-sky-200/80 rounded-xl text-xs text-sky-900">
            <span>
              <strong>Edição livre diretamente na folha:</strong> clique em qualquer título, palavra, sílaba ou figura abaixo para personalizar antes de imprimir.
            </span>
            <div className="hidden sm:flex items-center gap-2 shrink-0 ml-4">
              <button
                type="button"
                onClick={() => {
                  setWorksheet(PRESET_WORKSHEETS[0]);
                  setSelectedType('syllables');
                }}
                className="underline font-semibold hover:text-sky-700 cursor-pointer whitespace-nowrap"
              >
                Modelo 1 (Sílabas)
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => {
                  setWorksheet(PRESET_WORKSHEETS[1]);
                  setSelectedType('visual_math');
                }}
                className="underline font-semibold hover:text-sky-700 cursor-pointer whitespace-nowrap"
              >
                Modelo 2 (Dedinhos)
              </button>
            </div>
          </div>

          {/* A4 Printable & Editable Sheet */}
          <div className="overflow-x-auto pb-8 print-only-container">
            <WorksheetCanvasA4
              worksheet={worksheet}
              showAnswerKey={showAnswerKey}
              onChange={setWorksheet}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
