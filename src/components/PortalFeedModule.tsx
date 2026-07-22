import React, { useState } from 'react';
import { Share2, Code2, CheckCircle2, Copy, ExternalLink, RefreshCw, Check } from 'lucide-react';
import { Property } from '../types';

interface PortalFeedModuleProps {
  properties: Property[];
}

export const PortalFeedModule: React.FC<PortalFeedModuleProps> = ({ properties }) => {
  const [copied, setCopied] = useState(false);
  const feedUrl = `${window.location.origin}/api/xml/portals`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(feedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const portals = [
    { name: 'Zap Imóveis', status: 'ATIVO', syncedCount: properties.length, logo: 'ZAP' },
    { name: 'VivaReal', status: 'ATIVO', syncedCount: properties.length, logo: 'VR' },
    { name: 'OLX Brasil', status: 'ATIVO', syncedCount: properties.length, logo: 'OLX' },
    { name: 'Imovelweb / Casa Mineira', status: 'PENDENTE', syncedCount: 0, logo: 'IW' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px] uppercase tracking-wider">
            Integrador & Publicador de Portais
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">Feed XML Automático Imobiliário</h2>
          <p className="text-xs text-slate-500">
            Sincronização contínua com Zap, VivaReal, OLX e portais parceiros em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyUrl}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copiado!' : 'Copiar URL do Feed XML'}</span>
          </button>
        </div>
      </div>

      {/* Portals Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {portals.map((p, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                {p.logo}
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  p.status === 'ATIVO' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {p.status}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
              <span className="text-xs text-slate-500">{p.syncedCount} imóveis sincronizados</span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
              <span>Atualização a cada 15 min</span>
              <RefreshCw className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Feed URL Banner */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-400" />
          <h3 className="font-bold text-sm text-white">URL Pública do Feed XML (Padrão VivaReal / Zap)</h3>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 p-3 rounded-xl border border-slate-700 font-mono text-xs text-blue-300 overflow-x-auto">
          <span className="truncate flex-1">{feedUrl}</span>
          <a
            href="/api/xml/portals"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
            title="Abrir Feed XML no Navegador"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
