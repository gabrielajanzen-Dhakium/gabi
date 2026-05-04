/**
 * PolygonResearch.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A dedicated research page powered by Polygon.io.
 * Shows live stock data, technical indicators, market status, and
 * forex/crypto data — all sourced from the Polygon.io REST API.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState } from 'react'
import {
  LineChart, Line, AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import {
  useLiveStockPrices,
  useMarketStatus,
  useMarketHolidays,
  useTechnicalIndicators,
  useAggBars,
} from '../../hooks/usePolygon'
import {
  polygonStockPrices,
  polygonETFPrices,
  polygonIndices,
  polygonIndicators,
  polygonMarketStatus,
  polygonHolidays,
} from '../../data/polygon-snapshot'
import { formatCurrencyPrecise, formatPercent } from '../../lib/utils'
import { TrendingUp, TrendingDown, Activity, Globe, Calendar, BarChart2 } from 'lucide-react'

const TICKERS = ['AAPL', 'MSFT', 'TSLA', 'NVDA', 'GOOGL', 'AMZN', 'META']

// ── Helpers ───────────────────────────────────────────────────────────────────

function today() { return new Date().toISOString().split('T')[0] }
function daysAgo(n: number) {
  const d = new Date(); d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

function StatCard({ label, value, sub, positive }: { label: string; value: string; sub?: string; positive?: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-border p-4">
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className="text-xl font-bold text-text-primary tabular-nums">{value}</p>
      {sub && (
        <p className={`text-xs font-semibold mt-0.5 ${positive === true ? 'text-success' : positive === false ? 'text-danger' : 'text-text-muted'}`}>
          {sub}
        </p>
      )}
    </div>
  )
}

// ── Sub-sections ──────────────────────────────────────────────────────────────

function LivePricesSection() {
  const { data: live, loading } = useLiveStockPrices(TICKERS)
  const prices = live?.length ? live : polygonStockPrices

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={18} className="text-brand" />
        <h2 className="text-lg font-semibold text-text-primary">Live Stock Prices</h2>
        {loading && <span className="text-xs text-text-muted animate-pulse">Fetching live data…</span>}
        {!loading && <span className="text-xs text-success font-medium">● Live via Polygon.io</span>}
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface-secondary">
            <tr>
              {['Ticker', 'Name', 'Price', 'Change', '% Change', 'Volume', 'Sparkline'].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {prices.map(s => (
              <tr key={s.ticker} className="hover:bg-brand-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-brand">{s.ticker}</td>
                <td className="px-4 py-2.5 text-text-secondary">{s.name}</td>
                <td className="px-4 py-2.5 font-semibold tabular-nums">{formatCurrencyPrecise(s.price)}</td>
                <td className={`px-4 py-2.5 font-semibold tabular-nums ${s.change >= 0 ? 'text-success' : 'text-danger'}`}>
                  {s.change >= 0 ? '+' : ''}{formatCurrencyPrecise(s.change)}
                </td>
                <td className={`px-4 py-2.5 font-semibold ${s.changePct >= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatPercent(s.changePct)}
                </td>
                <td className="px-4 py-2.5 text-text-muted tabular-nums">{s.volume?.toLocaleString()}</td>
                <td className="px-4 py-2.5 w-24">
                  <ResponsiveContainer width={80} height={32}>
                    <LineChart data={(s.sparkline ?? []).map((v, i) => ({ i, v }))}>
                      <Line type="monotone" dataKey="v" stroke={s.changePct >= 0 ? '#10B981' : '#EF4444'} strokeWidth={1.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function TechnicalIndicatorsSection({ ticker }: { ticker: string }) {
  const { data: live, loading } = useTechnicalIndicators(ticker)
  const indicators = live ?? polygonIndicators[ticker as keyof typeof polygonIndicators]

  const smaData  = (indicators?.sma20 ?? []).slice().reverse()
  const emaData  = (indicators?.ema20 ?? []).slice().reverse()
  const macdData = (indicators?.macd  ?? []).slice().reverse()
  const rsiData  = (indicators?.rsi14 ?? []).slice().reverse()

  const latestRsi = rsiData[rsiData.length - 1]?.value ?? null

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Activity size={18} className="text-brand" />
        <h2 className="text-lg font-semibold text-text-primary">Technical Indicators — {ticker}</h2>
        {loading && <span className="text-xs text-text-muted animate-pulse">Loading…</span>}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard
          label="SMA-20 (latest)"
          value={smaData.length ? `$${smaData[smaData.length-1].value.toFixed(2)}` : '—'}
        />
        <StatCard
          label="EMA-20 (latest)"
          value={emaData.length ? `$${emaData[emaData.length-1].value.toFixed(2)}` : '—'}
        />
        <StatCard
          label="MACD (latest)"
          value={macdData.length ? macdData[macdData.length-1].value.toFixed(4) : '—'}
          sub={macdData.length ? `Signal: ${macdData[macdData.length-1].signal.toFixed(4)}` : undefined}
          positive={macdData.length ? macdData[macdData.length-1].histogram > 0 : undefined}
        />
        <StatCard
          label="RSI-14 (latest)"
          value={latestRsi !== null ? latestRsi.toFixed(2) : '—'}
          sub={latestRsi !== null ? (latestRsi > 70 ? 'Overbought' : latestRsi < 30 ? 'Oversold' : 'Neutral') : undefined}
          positive={latestRsi !== null ? latestRsi < 70 && latestRsi > 30 : undefined}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* SMA + EMA Chart */}
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-sm font-semibold text-text-primary mb-3">SMA-20 vs EMA-20</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={smaData.map((s, i) => ({ date: s.date, sma: s.value, ema: emaData[i]?.value }))}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={d => d.slice(5)} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v.toFixed(0)}`} domain={['auto', 'auto']} />
              <Tooltip formatter={(v: number, name: string) => [`$${v.toFixed(2)}`, name.toUpperCase()]} contentStyle={{ borderRadius: 8, fontSize: 11 }} />
              <Line type="monotone" dataKey="sma" stroke="#0047AB" strokeWidth={2} dot={false} name="SMA-20" />
              <Line type="monotone" dataKey="ema" stroke="#10B981" strokeWidth={2} dot={false} name="EMA-20" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* RSI Chart */}
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-sm font-semibold text-text-primary mb-3">RSI-14</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={rsiData}>
              <defs>
                <linearGradient id="rsiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0047AB" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#0047AB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={d => d.slice(5)} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => [v.toFixed(2), 'RSI-14']} contentStyle={{ borderRadius: 8, fontSize: 11 }} />
              <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="4 2" label={{ value: 'Overbought', fontSize: 9, fill: '#EF4444' }} />
              <ReferenceLine y={30} stroke="#10B981" strokeDasharray="4 2" label={{ value: 'Oversold', fontSize: 9, fill: '#10B981' }} />
              <Area type="monotone" dataKey="value" stroke="#0047AB" strokeWidth={2} fill="url(#rsiGrad)" name="RSI-14" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* MACD Chart */}
        <div className="bg-white rounded-xl border border-border p-4 md:col-span-2">
          <p className="text-sm font-semibold text-text-primary mb-3">MACD (12/26/9)</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={macdData}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={d => d.slice(5)} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number, name: string) => [v.toFixed(4), name]} contentStyle={{ borderRadius: 8, fontSize: 11 }} />
              <ReferenceLine y={0} stroke="#E5E7EB" />
              <Bar dataKey="histogram" name="Histogram" fill="#0047AB" opacity={0.7} radius={[2, 2, 0, 0]} />
              <Bar dataKey="value"     name="MACD"      fill="#10B981" opacity={0.5} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

function MarketStatusSection() {
  const { data: live, loading } = useMarketStatus()
  const { data: liveHolidays }  = useMarketHolidays()
  const status   = live ?? polygonMarketStatus
  const holidays = liveHolidays?.length ? liveHolidays.filter(h => h.exchange === 'NYSE') : polygonHolidays

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Globe size={18} className="text-brand" />
        <h2 className="text-lg font-semibold text-text-primary">Market Status</h2>
        {loading && <span className="text-xs text-text-muted animate-pulse">Refreshing…</span>}
        {!loading && <span className="text-xs text-success font-medium">● Live · auto-refreshes every 60s</span>}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {[
          { label: 'NYSE',   value: status.nyse },
          { label: 'NASDAQ', value: status.nasdaq },
          { label: 'Crypto', value: status.crypto },
          { label: 'Forex',  value: status.fx },
        ].map(({ label, value }) => (
          <div key={label} className={`rounded-xl p-4 border ${value === 'open' ? 'border-success/30 bg-success/5' : 'border-danger/30 bg-danger/5'}`}>
            <p className="text-xs text-text-muted mb-1">{label}</p>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${value === 'open' ? 'bg-success animate-pulse' : 'bg-danger'}`} />
              <span className={`font-bold capitalize ${value === 'open' ? 'text-success' : 'text-danger'}`}>{value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Holidays */}
      <div className="bg-white rounded-xl border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={16} className="text-brand" />
          <p className="text-sm font-semibold text-text-primary">Upcoming NYSE Holidays</p>
        </div>
        <div className="divide-y divide-border">
          {holidays.slice(0, 8).map((h, i) => (
            <div key={i} className="flex items-center justify-between py-2 text-sm">
              <span className="text-text-secondary">{h.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-text-muted tabular-nums">{h.date}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${h.status === 'closed' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'}`}>
                  {h.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ForexCryptoSection() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <BarChart2 size={18} className="text-brand" />
        <h2 className="text-lg font-semibold text-text-primary">Forex & Crypto (Polygon.io)</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {polygonIndices.filter(i => ['EURUSD', 'BTCUSD'].includes(i.symbol)).map(idx => (
          <div key={idx.symbol} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-bold text-text-primary">{idx.name}</p>
                <p className="text-xs text-text-muted">{idx.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold tabular-nums">{idx.value.toLocaleString(undefined, { maximumFractionDigits: 5 })}</p>
                <p className={`text-sm font-semibold ${idx.changePct >= 0 ? 'text-success' : 'text-danger'}`}>
                  {idx.changePct >= 0 ? <TrendingUp size={12} className="inline mr-1" /> : <TrendingDown size={12} className="inline mr-1" />}
                  {formatPercent(idx.changePct)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PolygonResearch() {
  const [selectedTicker, setSelectedTicker] = useState('AAPL')

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Market Research</h1>
          <p className="text-sm text-text-secondary mt-1">
            Live financial data powered by{' '}
            <a href="https://polygon.io" target="_blank" rel="noopener noreferrer" className="text-brand underline">
              Polygon.io
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted bg-surface-secondary px-3 py-2 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>Connected to Polygon.io REST API</span>
        </div>
      </div>

      {/* Live Prices */}
      <LivePricesSection />

      {/* Forex & Crypto */}
      <ForexCryptoSection />

      {/* Technical Indicators */}
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {['AAPL', 'MSFT', 'TSLA', 'NVDA'].map(t => (
            <button
              key={t}
              onClick={() => setSelectedTicker(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                selectedTicker === t
                  ? 'bg-brand text-white'
                  : 'bg-surface-secondary text-text-secondary hover:bg-brand-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <TechnicalIndicatorsSection ticker={selectedTicker} />
      </div>

      {/* Market Status */}
      <MarketStatusSection />

      {/* API Attribution */}
      <div className="bg-surface-secondary rounded-xl p-4 text-xs text-text-muted">
        <p className="font-semibold text-text-secondary mb-1">Data Attribution</p>
        <p>
          All market data on this page is sourced from the{' '}
          <a href="https://polygon.io/docs/" target="_blank" rel="noopener noreferrer" className="text-brand underline">
            Polygon.io REST API
          </a>
          . Stock prices reflect the latest daily close. Technical indicators are computed server-side by Polygon.io.
          Market status refreshes every 60 seconds. Historical data is provided for educational purposes only and does
          not constitute financial advice.
        </p>
      </div>
    </div>
  )
}
