import React, { useState } from 'react';
import { Sparkles, X, Bot, Send, Copy, Check, Loader2, RefreshCw } from 'lucide-react';
import { ProductType } from '../types';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentProduct: ProductType;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  currentProduct,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const quickPrompts: Record<ProductType, { label: string; prompt: string }[]> = {
    URBAN: [
      { label: 'Sugerir Preço Médio / m²', prompt: 'Qual o valor médio de venda por m² no bairro Jardins e Vila Nova Conceição em São Paulo?' },
      { label: 'Gerar Descrição de Venda', prompt: 'Gere uma descrição persuasiva para um apartamento duplex nos Jardins com 4 suítes e varanda gourmet.' },
      { label: 'Classificar Lead', prompt: 'Classifique o lead Roberto Silveira (proposta de R$ 2.7M) quanto à probabilidade de fechamento.' },
    ],
    RURAL: [
      { label: 'Análise de Solo & CAR', prompt: 'Analise o CAR SP-3543402 com 850 ha em Ribeirão Preto: Reserva legal de 20%, solo Latossolo e cultura de Soja.' },
      { label: 'Preço Médio do Hectare', prompt: 'Qual a cotação média atual do hectare agricultável para soja no interior de São Paulo e Cerrado?' },
      { label: 'Potencial de Produtividade', prompt: 'Qual o potencial de sacas de soja por hectare para um solo com 48% de argila e irrigação pivô?' },
    ],
    INCORP: [
      { label: 'Análise de VGV & Margem', prompt: 'Calcule a margem ROI esperada para um VGV de R$ 98M com custo de construção de R$ 52M e terreno R$ 18M.' },
      { label: 'Estudo de Viabilidade SPE', prompt: 'Elabore um resumo executivo de viabilidade financeira para lançamento residencial em Campinas (SPE).' },
    ],
    LOTE: [
      { label: 'Identificar Lotes Encalhados', prompt: 'Analise a velocidade de vendas do loteamento Reserva Real e identifique a Curva ABC de preço/m².' },
      { label: 'Estratégia de Precificação', prompt: 'Como reajustar o valor dos lotes remanescentes após vender 60% das unidades na fase 1?' },
    ],
  };

  const handleRunAi = async (promptToRun?: string) => {
    const finalPrompt = promptToRun || promptInput;
    if (!finalPrompt.trim()) return;

    setLoading(true);
    setAiOutput(null);

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: currentProduct,
          prompt: finalPrompt,
          context: { product: currentProduct, date: new Date().toISOString() },
        }),
      });

      const data = await res.json();
      if (data.result) {
        setAiOutput(data.result);
      } else {
        setAiOutput('Não foi possível obter resposta da IA no momento.');
      }
    } catch (err) {
      setAiOutput('Erro ao conectar ao servidor de IA. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (aiOutput) {
      navigator.clipboard.writeText(aiOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">WooTech AI — Especialista {currentProduct}</h3>
            <p className="text-[11px] text-blue-200">Inteligência Imobiliária de Alta Precisão</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Quick Suggestion Chips */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Ações Rápidas Especializadas
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts[currentProduct].map((qp, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPromptInput(qp.prompt);
                  handleRunAi(qp.prompt);
                }}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium border border-slate-200 transition-colors text-left"
              >
                ⚡ {qp.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Output Area */}
        {loading && (
          <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-sm">Sintetizando Análise com Gemini 3.6 Flash...</h4>
            <p className="text-xs text-slate-500 mt-1">Processando geointeligência, mercado e histórico financeiro.</p>
          </div>
        )}

        {aiOutput && !loading && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 relative">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-blue-600" />
                Resultado da Análise
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-blue-600 bg-white px-2 py-1 rounded border border-slate-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            <div className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed font-sans">
              {aiOutput}
            </div>
          </div>
        )}
      </div>

      {/* Input Footer */}
      <div className="p-4 border-t border-slate-200 bg-white space-y-2">
        <div className="relative">
          <textarea
            rows={3}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder={`Pergunte algo à IA do segmento WooTech ${currentProduct}...`}
            className="w-full p-3 pr-10 text-xs text-slate-800 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 resize-none"
          />
          <button
            onClick={() => handleRunAi()}
            disabled={loading || !promptInput.trim()}
            className="absolute right-2 bottom-3.5 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
