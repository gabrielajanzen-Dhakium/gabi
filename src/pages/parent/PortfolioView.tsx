import { useParams } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import { mockPortfolios } from '../../data/mock-portfolios'
import { formatCurrency, formatCurrencyPrecise, formatPercent, formatDate } from '../../lib/utils'
import { RefreshCw } from 'lucide-react'

const COLORS = ['#0047AB', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6B7280']

export default function PortfolioView() {
  const { id } = useParams()
  const portfolio = mockPortfolios.find(p => p.id === id) ?? mockPortfolios[0]

  const allocationData = [
    { name: 'Equities', value: portfolio.equityPct },
    { name: 'Bonds', value: portfolio.bondsPct },
    { name: 'Alternatives', value: portfolio.alternativesPct },
    { name: 'Cash', value: portfolio.cashPct },
  ].filter(d => d.value > 0)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Portfolio Overview</h1>
          <p className="text-sm text-text-secondary mt-1">Last rebalanced: {formatDate(portfolio.lastRebalanced)}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-colors" id="rebalance-btn">
          <RefreshCw size={16} /> Rebalance Portfolio
        </button>
      </div>

      {/* Value Card */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <p className="text-sm text-text-muted">Total Value</p>
            <p className="text-4xl font-extrabold text-text-primary tabular-nums">{formatCurrency(portfolio.totalValue)}</p>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${portfolio.totalReturn >= 0 ? 'bg-success-light text-success' : 'bg-danger-light text-danger'}`}>
            {formatPercent(portfolio.totalReturn)}
          </span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolio.performanceHistory}>
                <defs>
                  <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0047AB" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#0047AB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={d => new Date(d).toLocaleDateString('en-US', { month: 'short' })} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [formatCurrency(v), 'Value']} contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke="#0047AB" strokeWidth={2} fill="url(#portGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation Donut */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Asset Allocation</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={allocationData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {allocationData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, '']} contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {allocationData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                <span className="text-text-secondary flex-1">{d.name}</span>
                <span className="font-semibold text-text-primary tabular-nums">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-secondary">
                <th className="text-left px-6 py-3 font-semibold text-text-primary">Security</th>
                <th className="text-right px-4 py-3 font-semibold text-text-primary">Qty</th>
                <th className="text-right px-4 py-3 font-semibold text-text-primary hidden sm:table-cell">Avg Cost</th>
                <th className="text-right px-4 py-3 font-semibold text-text-primary">Price</th>
                <th className="text-right px-4 py-3 font-semibold text-text-primary">Value</th>
                <th className="text-right px-6 py-3 font-semibold text-text-primary">P&L</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.holdings.map(h => {
                const value = h.quantity * h.currentPrice
                const cost = h.quantity * h.averageCost
                const pnl = value - cost
                const pnlPct = (pnl / cost) * 100
                return (
                  <tr key={h.id} className="border-t border-border hover:bg-brand-50/30 transition-colors">
                    <td className="px-6 py-3">
                      <p className="font-semibold text-text-primary">{h.ticker}</p>
                      <p className="text-xs text-text-muted">{h.securityName}</p>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{h.quantity}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-text-secondary hidden sm:table-cell">{formatCurrencyPrecise(h.averageCost)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatCurrencyPrecise(h.currentPrice)}</td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">{formatCurrency(value)}</td>
                    <td className={`px-6 py-3 text-right font-semibold tabular-nums ${pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                      {formatCurrency(pnl)}<br />
                      <span className="text-xs font-normal">{formatPercent(pnlPct)}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
