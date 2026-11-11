import React, { useState } from 'react';
import {
  Search,
  ExternalLink,
  Sparkles,
  Loader2,
  BookOpen,
  FileText,
  Eye,
  X,
} from 'lucide-react';
import { WebSearchResult, WorksheetDocument } from '../types/worksheet';
import { PRESET_WORKSHEETS } from '../data/presetWorksheets';
import { getCuratedFreeWebReferences } from '../utils/localPedagogicalEngine';

interface WebReferencePanelProps {
  currentTheme: string;
  currentGoal: string;
  onSelectPreset: (preset: WorksheetDocument) => void;
  onGenerateFromWebIdea: (theme: string, goal: string) => void;
}

export function WebReferencePanel({
  currentTheme,
  currentGoal,
  onSelectPreset,
  onGenerateFromWebIdea,
}: WebReferencePanelProps) {
  const [searchTheme, setSearchTheme] = useState(currentTheme || 'Animais');
  const [searchGoal, setSearchGoal] = useState(
    currentGoal || 'Completar sílabas alfabetização 1º ano'
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<WebSearchResult | null>(() =>
    getCuratedFreeWebReferences('Animais', 'Completar sílabas alfabetização 1º ano')
  );
  const [previewAttachmentUrl, setPreviewAttachmentUrl] = useState<{
    url: string;
    title: string;
    preset: WorksheetDocument;
  } | null>(null);

  const handleSearchWeb = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    try {
      const response = await fetch('/api/worksheets/search-web', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme: searchTheme,
          pedagogicalGoal: searchGoal,
        }),
      });
      if (!response.ok) {
        throw new Error('Fallback to curated pedagogical bank');
      }
      const data = await response.json();
      setSearchResult(data);
    } catch {
      // Seamless fallback to curated free educational portal references (works 100% free on GitHub Pages too)
      const curated = getCuratedFreeWebReferences(searchTheme, searchGoal);
      setSearchResult(curated);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Web Search Form (Google Search Grounding + Curated Educational Bank) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 font-display">
          Buscar Atividades e Referências Gratuitas na Internet
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Pesquise portais educativos abertos, ideias de folhas para imprimir e sugestões de palavras alinhadas à BNCC.
        </p>

        <form onSubmit={handleSearchWeb} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tema Lúdico
            </label>
            <input
              type="text"
              value={searchTheme}
              onChange={(e) => setSearchTheme(e.target.value)}
              placeholder="Ex: Circo, Animais da Fazenda, Dinossauros..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Conteúdo / Habilidade da Alfabetização
            </label>
            <input
              type="text"
              value={searchGoal}
              onChange={(e) => setSearchGoal(e.target.value)}
              placeholder="Ex: Completar sílabas, Soma com dedinhos, Caça-palavras..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="submit"
              disabled={isSearching}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Pesquisando na Internet...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Pesquisar Opções Gratuitas na Web
                </>
              )}
            </button>
          </div>
        </form>

        {searchResult && (
          <div className="mt-5 pt-5 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-900">
                Resultados e Ideias Encontradas
              </span>
              <button
                type="button"
                onClick={() => onGenerateFromWebIdea(searchTheme, searchGoal)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Transformar em Folha A4 Agora
              </button>
            </div>

            {searchResult.links.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500">
                  Portais e fontes educativas gratuitas recomendadas:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {searchResult.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/40 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <BookOpen className="w-4 h-4 text-sky-600 shrink-0" />
                        <span className="font-semibold text-slate-800 truncate">
                          {link.title}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
              {searchResult.summaryMarkdown}
            </div>
          </div>
        )}
      </div>

      {/* 2. Original Reference Worksheets & Ready-Made Templates */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-display">
            Modelos Clássicos e Folhas de Referência
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Clique em qualquer modelo abaixo para abri-lo na prancheta A4 ao lado e editar livremente todas as palavras, sílabas ou números.
          </p>
        </div>

        <div className="space-y-3">
          {PRESET_WORKSHEETS.map((preset) => (
            <div
              key={preset.id}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 transition-all space-y-2.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    {preset.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <span>{preset.theme}</span>
                    <span aria-hidden="true">·</span>
                    <span>{preset.pedagogicalGoal}</span>
                  </div>
                </div>
              </div>

              {preset.referenceImageUrl && (
                <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-200">
                  <img
                    src={preset.referenceImageUrl}
                    alt={preset.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-16 object-cover rounded border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-700">
                      Inspirado na folha de referência enviada
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewAttachmentUrl({
                          url: preset.referenceImageUrl!,
                          title: preset.title,
                          preset,
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:underline mt-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Ver imagem original anexa
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-600" />
                  Carregar Modelo Editável na Folha A4
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Original Attachment Lightbox Modal */}
      {previewAttachmentUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 no-print">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full overflow-hidden shadow-xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 font-display">
                Referência Original: {previewAttachmentUrl.title}
              </h4>
              <button
                type="button"
                onClick={() => setPreviewAttachmentUrl(null)}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex justify-center bg-slate-100">
              <img
                src={previewAttachmentUrl.url}
                alt={previewAttachmentUrl.title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto object-contain rounded shadow"
              />
            </div>
            <div className="px-5 py-3.5 border-t border-slate-200 flex items-center justify-end gap-2 bg-white">
              <button
                type="button"
                onClick={() => {
                  onSelectPreset(previewAttachmentUrl.preset);
                  setPreviewAttachmentUrl(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg cursor-pointer"
              >
                Usar e Editar este Modelo no Estúdio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
