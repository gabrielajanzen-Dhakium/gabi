/**
 * MarketStatusBanner.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Live market status banner powered by Polygon.io.
 * Shows whether NYSE/NASDAQ are open, in after-hours, or closed.
 * Auto-refreshes every 60 seconds via the useMarketStatus hook.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useMarketStatus } from '../../hooks/usePolygon'
import { polygonMarketStatus, polygonHolidays } from '../../data/polygon-snapshot'

const STATUS_COLORS: Record<string, string> = {
  open:        'bg-success text-white',
  closed:      'bg-danger  text-white',
  'early-close': 'bg-warning text-white',
  unknown:     'bg-surface-secondary text-text-muted',
}

const STATUS_DOTS: Record<string, string> = {
  open:    'bg-white animate-pulse',
  closed:  'bg-white/60',
  unknown: 'bg-white/40',
}

export default function MarketStatusBanner() {
  const { data: live, loading } = useMarketStatus()

  // Fall back to snapshot if live data is unavailable
  const status = live ?? polygonMarketStatus

  // Find next holiday
  const today = new Date().toISOString().split('T')[0]
  const nextHoliday = polygonHolidays.find(
    h => h.exchange === 'NYSE' && h.date >= today
  )

  const marketState = status.market ?? 'unknown'
  const colorClass  = STATUS_COLORS[marketState] ?? STATUS_COLORS.unknown
  const dotClass    = STATUS_DOTS[marketState]   ?? STATUS_DOTS.unknown

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs font-medium rounded-xl ${colorClass}`}>
      {/* Left: Overall status */}
      <div className="flex items-center gap-2">
        <span className={`inline-block w-2 h-2 rounded-full ${dotClass}`} />
        <span className="font-semibold uppercase tracking-wide">
          Market {loading ? '...' : marketState.replace('-', ' ')}
        </span>
        {status.afterHours && (
          <span className="px-2 py-0.5 bg-white/20 rounded-full">After Hours</span>
        )}
        {status.earlyHours && (
          <span className="px-2 py-0.5 bg-white/20 rounded-full">Pre-Market</span>
        )}
      </div>

      {/* Center: Exchange breakdown */}
      <div className="flex items-center gap-4">
        {[
          { label: 'NYSE',   value: status.nyse },
          { label: 'NASDAQ', value: status.nasdaq },
          { label: 'Crypto', value: status.crypto },
          { label: 'Forex',  value: status.fx },
        ].map(({ label, value }) => (
          <span key={label} className="flex items-center gap-1">
            <span className="opacity-70">{label}</span>
            <span className={`font-semibold ${value === 'open' ? 'text-white' : 'text-white/60'}`}>
              {value ?? '—'}
            </span>
          </span>
        ))}
      </div>

      {/* Right: Next holiday */}
      {nextHoliday && (
        <div className="flex items-center gap-1 opacity-80">
          <span>Next closure:</span>
          <span className="font-semibold">{nextHoliday.name}</span>
          <span>({nextHoliday.date})</span>
        </div>
      )}

      {/* Powered by badge */}
      <div className="flex items-center gap-1 opacity-60 text-[10px]">
        <span>Powered by</span>
        <a
          href="https://polygon.io"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-100"
        >
          Polygon.io
        </a>
      </div>
    </div>
  )
}
