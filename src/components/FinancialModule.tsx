import React, { useState } from 'react';
import {
  Receipt,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  QrCode,
  CreditCard,
  FileSpreadsheet,
  Plus,
  CheckCircle2,
  Clock,
  BarChart3,
  X,
} from 'lucide-react';
import { FinancialTransaction } from '../types';

interface FinancialModuleProps {
  transactions: FinancialTransaction[];
  onAddTransaction: (tx: FinancialTransaction) => void;
}

export const FinancialModule: React.FC<FinancialModuleProps> = ({
  transactions,
  onAddTransaction,
}) => {
  const [filterType, setFilterType] = useState<string>('TODOS');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const totalReceitas = transactions
    .filter((t) => t.type === 'RECEITA' && t.status === 'PAGO')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDespesas = transactions
    .filter((t) => t.type === 'DESPESA' && t.status === 'PAGO')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalComissoes = transactions
    .filter((t) => t.type === 'COMISSAO')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalRepasses = transactions
    .filter((t) => t.type === 'REPASSE')
    .reduce((acc, t) => acc + t.amount, 0);

  const saldoCaixa = totalReceitas - totalDespesas;

  const filtered = transactions.filter((t) => {
    if (filterType === 'TODOS') return true;
    return t.type === filterType;
  });

  // Form State
  const [newTxForm, setNewTxForm] = useState({
    description: '',
    type: 'RECEITA' as const,
    amount: 1500,
    category: 'Comissões de Venda',
    costCenter: 'Vendas Urbanas',
    paymentMethod: 'PIX' as const,
  });

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTxForm.description) return;

    const newTx: FinancialTransaction = {
      id: `tx-${Date.now()}`,
      description: newTxForm.description,
      type: newTxForm.type,
      amount: newTxForm.amount,
      dueDate: new Date().toISOString().split('T')[0],
      category: newTxForm.category,
      costCenter: newTxForm.costCenter,
      status: 'PAGO',
      paymentMethod: newTxForm.paymentMethod,
    };

    onAddTransaction(newTx);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase tracking-wider">
            ERP Financeiro Imobiliário
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">Fluxo de Caixa, DRE & Repasses</h2>
          <p className="text-xs text-slate-500">Gestão financeira centralizada para cobrança de boletos, PIX e comissionamento.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exportando DRE Financeiro em PDF / Excel...')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Exportar DRE</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Lançamento</span>
          </button>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Saldo Operacional de Caixa</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            R$ {saldoCaixa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">Líquido em conta corrente</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Receitas Liquidadas</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-blue-600">
            R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Comissões e honorários recebidos</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Comissões de Corretores</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            R$ {totalComissoes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Pagamentos com divisão automática</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Repasses aos Proprietários</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            R$ {totalRepasses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Administração de bens & locação</div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
        
        {/* Table Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-1">
            {['TODOS', 'RECEITA', 'DESPESA', 'COMISSAO', 'REPASSE'].map((tp) => (
              <button
                key={tp}
                onClick={() => setFilterType(tp)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterType === tp
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tp}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-500">
            Exibindo {filtered.length} lançamentos
          </span>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Descrição / Imóvel</th>
                <th className="py-2.5 px-3">Tipo</th>
                <th className="py-2.5 px-3">Categoria / C. Custo</th>
                <th className="py-2.5 px-3">Vencimento</th>
                <th className="py-2.5 px-3">Meio</th>
                <th className="py-2.5 px-3">Valor (R$)</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">{t.description}</span>
                    {t.propertyCode && <span className="text-[10px] text-slate-400 font-mono">Ref: {t.propertyCode}</span>}
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        t.type === 'RECEITA'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : t.type === 'DESPESA'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="block text-slate-800">{t.category}</span>
                    <span className="text-[10px] text-slate-400">{t.costCenter}</span>
                  </td>

                  <td className="py-3 px-3 text-slate-600 font-mono">{t.dueDate}</td>

                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                      {t.paymentMethod}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-extrabold text-slate-900">
                    R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit ${
                        t.status === 'PAGO'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.status === 'PAGO' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {t.status}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => alert(`Gerando comprovante PIX/Boleto para ${t.description}`)}
                      className="p-1 rounded hover:bg-slate-200 text-slate-600"
                      title="Gerar PIX / Boleto"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Transaction */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Novo Lançamento Financeiro</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTransaction} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Descrição</label>
                <input
                  type="text"
                  required
                  value={newTxForm.description}
                  onChange={(e) => setNewTxForm({ ...newTxForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"
                  placeholder="Ex: Comissão Venda Apt Jardins"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo</label>
                  <select
                    value={newTxForm.type}
                    onChange={(e) => setNewTxForm({ ...newTxForm, type: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"
                  >
                    <option value="RECEITA">RECEITA</option>
                    <option value="DESPESA">DESPESA</option>
                    <option value="COMISSAO">COMISSAO</option>
                    <option value="REPASSE">REPASSE</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Valor (R$)</label>
                  <input
                    type="number"
                    value={newTxForm.amount}
                    onChange={(e) => setNewTxForm({ ...newTxForm, amount: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Categoria</label>
                  <input
                    type="text"
                    value={newTxForm.category}
                    onChange={(e) => setNewTxForm({ ...newTxForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Meio de Pagamento</label>
                  <select
                    value={newTxForm.paymentMethod}
                    onChange={(e) => setNewTxForm({ ...newTxForm, paymentMethod: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"
                  >
                    <option value="PIX">PIX Instantâneo</option>
                    <option value="BOLETO">Boleto Bancário</option>
                    <option value="TRANSFERENCIA">TED / DOC</option>
                    <option value="CARTAO">Cartão de Crédito</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                >
                  Salvar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
