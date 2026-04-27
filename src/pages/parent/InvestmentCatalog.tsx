import { mockETFs, mockStockPrices } from '../../data/mock-market-data'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { Search, Filter, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { formatCurrencyPrecise, formatPercent } from '../../lib/utils'

type TabType = 'all' | 'etf' | 'stock' | 'bond'

export default function InvestmentCatalog() {
  const [tab, setTab] = useState<TabType>('all')
  const [search, setSearch] = useState('')

  const allProducts = [
    ...mockETFs.map(e => ({ ...e, category: e.type === 'Bond ETF' ? 'bond' : 'etf', price: mockStockPrices.find(s => s.ticker === e.ticker)?.price ?? 0, change: mockStockPrices.find(s => s.ticker === e.ticker)?.changePct ?? 0 })),
    ...mockStockPrices.filter(s => !mockETFs.find(e => e.ticker === s.ticker)).map(s => ({ ticker: s.ticker, name: s.name, category: 'stock' as const, riskLevel: 'Medium' as const, price: s.price, change: s.changePct, historicalReturn: '', expenseRatio: 0, description: '', sparkline: s.sparkline, type: 'Stock' as const })),
  ]

  const filtered = allProducts.filter(p => {
    if (tab !== 'all' && p.category !== tab) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.ticker.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-text-primary">Investment Catalog</h1>
        <div className="flex items-center gap-2 bg-white rounded-xl border border-border px-3 py-2 w-full sm:w-64">
          <Search size={16} className="text-text-muted" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search securities..." className="bg-transparent text-sm outline-none w-full" id="catalog-search" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-secondary rounded-xl p-1 w-fit">
        {([['all', 'All'], ['etf', 'ETFs'], ['stock', 'Stocks'], ['bond', 'Bonds']] as [TabType, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${tab === key ? 'bg-white text-text-primary shadow-sm' : 'text-text-muted hover:text-text-secondary'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {filtered.map(p => (
          <div key={p.ticker} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-base font-bold text-text-primary">{p.ticker}</p>
                <p className="text-xs text-text-muted truncate max-w-[180px]">{p.name}</p>
              </div>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${p.riskLevel === 'Low' ? 'bg-success-light text-success' : p.riskLevel === 'Medium' ? 'bg-warning-light text-warning' : 'bg-danger-light text-danger'}`}>
                {p.riskLevel}
              </span>
            </div>

            {/* Sparkline */}
            <div className="h-12 mb-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={p.sparkline.map((v, i) => ({ i, v }))}>
                  <Line type="monotone" dataKey="v" stroke={p.change >= 0 ? '#10B981' : '#EF4444'} strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-end justify-between">
              <p className="text-lg font-bold text-text-primary tabular-nums">{formatCurrencyPrecise(p.price)}</p>
              <span className={`text-sm font-semibold ${p.change >= 0 ? 'text-success' : 'text-danger'}`}>
                {formatPercent(p.change)}
              </span>
            </div>

            <button className="w-full mt-3 py-2 bg-brand-light text-brand text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Add to Portfolio
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
