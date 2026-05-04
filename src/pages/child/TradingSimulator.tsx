import { useState } from 'react'
import { mockAllPrices } from '../../data/mock-market-data'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { formatCurrencyPrecise, formatPercent } from '../../lib/utils'
import { Search, ArrowUpDown } from 'lucide-react'

interface Trade { id: number; ticker: string; type: 'buy' | 'sell'; qty: number; price: number; time: string }
interface Holding { ticker: string; qty: number; avgCost: number }

export default function TradingSimulator() {
  const [balance, setBalance] = useState(10000)
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [trades, setTrades] = useState<Trade[]>([])
  const [selected, setSelected] = useState(mockAllPrices[0])
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<'watchlist' | 'portfolio' | 'history'>('watchlist')

  const executeTrade = (type: 'buy' | 'sell') => {
    const cost = qty * selected.price
    if (type === 'buy' && cost > balance) return
    const existing = holdings.find(h => h.ticker === selected.ticker)
    if (type === 'sell' && (!existing || existing.qty < qty)) return

    if (type === 'buy') {
      setBalance(b => b - cost)
      if (existing) {
        setHoldings(h => h.map(x => x.ticker === selected.ticker ? { ...x, qty: x.qty + qty, avgCost: (x.avgCost * x.qty + cost) / (x.qty + qty) } : x))
      } else {
        setHoldings(h => [...h, { ticker: selected.ticker, qty, avgCost: selected.price }])
      }
    } else {
      setBalance(b => b + cost)
      setHoldings(h => h.map(x => x.ticker === selected.ticker ? { ...x, qty: x.qty - qty } : x).filter(x => x.qty > 0))
    }

    setTrades(t => [{ id: Date.now(), ticker: selected.ticker, type, qty, price: selected.price, time: new Date().toLocaleTimeString() }, ...t])
  }

  const portfolioValue = holdings.reduce((s, h) => {
    const p = mockAllPrices.find(sp => sp.ticker === h.ticker)
    return s + (p?.price ?? h.avgCost) * h.qty
  }, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-text-primary">Trading Simulator</h1>
        <div className="flex gap-3">
          <div className="bg-white rounded-xl border border-border px-4 py-2">
            <p className="text-xs text-text-muted">Virtual Cash</p>
            <p className="text-lg font-bold text-success tabular-nums">{formatCurrencyPrecise(balance)}</p>
          </div>
          <div className="bg-white rounded-xl border border-border px-4 py-2">
            <p className="text-xs text-text-muted">Portfolio Value</p>
            <p className="text-lg font-bold text-brand tabular-nums">{formatCurrencyPrecise(portfolioValue)}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Market + Trade */}
        <div className="lg:col-span-2 space-y-4">
          {/* Selected Stock */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-text-primary">{selected.ticker}</h2>
                <p className="text-sm text-text-muted">{selected.name}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-text-primary tabular-nums">{formatCurrencyPrecise(selected.price)}</p>
                <span className={`text-sm font-semibold ${selected.changePct >= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatPercent(selected.changePct)}
                </span>
              </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selected.sparkline.map((v, i) => ({ i, v }))}>
                  <Line type="monotone" dataKey="v" stroke={selected.changePct >= 0 ? '#10B981' : '#EF4444'} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trade Panel */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="text-base font-semibold text-text-primary mb-4">Place Order</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-text-muted mb-1 block">Quantity</label>
                <input type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-border text-sm outline-none focus:border-brand" />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">Est. Cost</label>
                <p className="px-3 py-2 bg-surface-secondary rounded-lg text-sm font-semibold text-text-primary tabular-nums">{formatCurrencyPrecise(qty * selected.price)}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => executeTrade('buy')} disabled={qty * selected.price > balance} className="flex-1 py-3 bg-success text-white font-semibold rounded-xl hover:bg-success/90 disabled:opacity-40 transition-colors">
                Buy
              </button>
              <button onClick={() => executeTrade('sell')} disabled={!holdings.find(h => h.ticker === selected.ticker && h.qty >= qty)} className="flex-1 py-3 bg-danger text-white font-semibold rounded-xl hover:bg-danger/90 disabled:opacity-40 transition-colors">
                Sell
              </button>
            </div>
          </div>
        </div>

        {/* Right: Watchlist / Portfolio / History */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="flex border-b border-border">
            {(['watchlist', 'portfolio', 'history'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 text-xs font-semibold capitalize transition-colors ${tab === t ? 'text-brand border-b-2 border-brand' : 'text-text-muted hover:text-text-secondary'}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="max-h-[500px] overflow-y-auto">
            {tab === 'watchlist' && (
              <div className="divide-y divide-border">
                {mockAllPrices.map(s => (
                  <button key={s.ticker} onClick={() => setSelected(s)} className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-brand-50 transition-colors ${selected.ticker === s.ticker ? 'bg-brand-50' : ''}`}>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-text-primary">{s.ticker}</p>
                      <p className="text-xs text-text-muted truncate">{s.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold tabular-nums">{formatCurrencyPrecise(s.price)}</p>
                      <p className={`text-xs font-semibold ${s.changePct >= 0 ? 'text-success' : 'text-danger'}`}>{formatPercent(s.changePct)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {tab === 'portfolio' && (
              <div className="divide-y divide-border">
                {holdings.length === 0 ? (
                  <p className="p-6 text-sm text-text-muted text-center">No holdings yet. Buy some stocks!</p>
                ) : holdings.map(h => {
                  const sp = mockAllPrices.find(s => s.ticker === h.ticker)
                  const current = sp?.price ?? h.avgCost
                  const pnl = (current - h.avgCost) * h.qty
                  return (
                    <div key={h.ticker} className="px-4 py-3">
                      <div className="flex justify-between">
                        <p className="text-sm font-semibold">{h.ticker} × {h.qty}</p>
                        <p className="text-sm font-bold tabular-nums">{formatCurrencyPrecise(current * h.qty)}</p>
                      </div>
                      <p className={`text-xs font-semibold ${pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                        P&L: {formatCurrencyPrecise(pnl)}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}

            {tab === 'history' && (
              <div className="divide-y divide-border">
                {trades.length === 0 ? (
                  <p className="p-6 text-sm text-text-muted text-center">No trades yet.</p>
                ) : trades.map(t => (
                  <div key={t.id} className="px-4 py-3 flex justify-between">
                    <div>
                      <p className="text-sm font-semibold">{t.type.toUpperCase()} {t.ticker} × {t.qty}</p>
                      <p className="text-xs text-text-muted">{t.time}</p>
                    </div>
                    <p className={`text-sm font-bold ${t.type === 'buy' ? 'text-danger' : 'text-success'}`}>
                      {t.type === 'buy' ? '-' : '+'}{formatCurrencyPrecise(t.qty * t.price)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
