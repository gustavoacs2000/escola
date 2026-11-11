import React, { useState } from 'react';
import { X, Sparkles, Search, Loader2 } from 'lucide-react';
import { COLORING_ICON_CATALOG, ColoringIllustration } from '../data/coloringIcons';

interface IconPickerModalProps {
  isOpen: boolean;
  currentIconKey: string;
  wordContext: string;
  onClose: () => void;
  onSelectIcon: (iconKey: string, customSvg?: string) => void;
}

export function IconPickerModal({
  isOpen,
  currentIconKey,
  wordContext,
  onClose,
  onSelectIcon,
}: IconPickerModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [customWordPrompt, setCustomWordPrompt] = useState(wordContext || '');
  const [isDrawingAi, setIsDrawingAi] = useState(false);
  const [drawError, setDrawError] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredCatalog = COLORING_ICON_CATALOG.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateCustomSvg = async () => {
    const targetWord = customWordPrompt.trim() || wordContext || 'Estrela';
    setIsDrawingAi(true);
    setDrawError(null);
    try {
      const response = await fetch('/api/worksheets/draw-icon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: targetWord }),
      });
      const data = await response.json();
      if (!response.ok || !data.svgInner) {
        throw new Error(data.error || 'Falha ao desenhar figura com IA.');
      }
      onSelectIcon('custom', data.svgInner);
      onClose();
    } catch (err: any) {
      setDrawError(err.message || 'Erro ao desenhar figura.');
    } finally {
      setIsDrawingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 no-print">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Escolher ou Desenhar Ilustração para Colorir
            </h3>
            <p className="text-xs text-slate-500">
              Todos os desenhos são em traço preto e branco para economizar tinta e permitir que os alunos pintem.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Custom Line-Art Generator Box */}
        <div className="px-6 py-4 bg-sky-50/70 border-b border-slate-200">
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Não encontrou a figura exata? Peça para a IA desenhar para colorir:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customWordPrompt}
              onChange={(e) => setCustomWordPrompt(e.target.value)}
              placeholder="Ex: Dinossauro, Palhaço no monociclo, Girassol..."
              className="flex-1 px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
            <button
              type="button"
              onClick={handleGenerateCustomSvg}
              disabled={isDrawingAi}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isDrawingAi ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Desenhando...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Desenhar com IA
                </>
              )}
            </button>
          </div>
          {drawError && <p className="text-xs text-red-600 mt-1.5">{drawError}</p>}
        </div>

        {/* Search & Filter */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar figuras da biblioteca (ex: bolo, circo, vaca, pato, foguete)..."
            className="w-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* Grid of Icons */}
        <div className="p-6 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {filteredCatalog.map((item) => {
            const isSelected = item.key === currentIconKey;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  onSelectIcon(item.key, undefined);
                  onClose();
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-sky-600 bg-sky-50/60 ring-2 ring-sky-600/20'
                    : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <ColoringIllustration iconKey={item.key} className="w-12 h-12 mb-1.5" />
                <span className="text-xs font-medium text-slate-800 truncate w-full">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
