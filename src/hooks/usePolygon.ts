/**
 * usePolygon.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * React hooks for consuming Polygon.io data in Gabi components.
 * Each hook manages its own loading/error state and caches data in state.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from 'react'
import {
  getAggBars,
  getTickerDetail,
  getMarketStatus,
  getMarketHolidays,
  getAllIndicators,
  getLiveStockPrice,
  type AggBar,
  type TickerDetail,
  type MarketStatusData,
  type MarketHoliday,
  type TechnicalIndicators,
  type LiveStockPrice,
} from '../services/polygonService'

// ── Generic async hook ────────────────────────────────────────────────────────

function useAsync<T>(
  fn: () => Promise<T>,
  deps: unknown[] = [],
): { data: T | null; loading: boolean; error: string | null; refetch: () => void } {
  const [data,    setData]    = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  const run = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fn()
      setData(result)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => { run() }, [run])

  return { data, loading, error, refetch: run }
}

// ── Exported hooks ────────────────────────────────────────────────────────────

/**
 * Fetch OHLCV aggregate bars for a ticker.
 * @example const { data: bars } = useAggBars('AAPL', '2026-04-01', '2026-05-01')
 */
export function useAggBars(ticker: string, from: string, to: string, timespan: 'day' | 'hour' | 'minute' = 'day') {
  return useAsync<AggBar[]>(() => getAggBars(ticker, from, to, timespan), [ticker, from, to, timespan])
}

/**
 * Fetch company/ticker details.
 * @example const { data: detail } = useTickerDetail('AAPL')
 */
export function useTickerDetail(ticker: string) {
  return useAsync<TickerDetail | null>(() => getTickerDetail(ticker), [ticker])
}

/**
 * Fetch current market open/close status.
 * Auto-refreshes every 60 seconds.
 * @example const { data: status } = useMarketStatus()
 */
export function useMarketStatus() {
  const [data,    setData]    = useState<MarketStatusData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  const fetch = useCallback(async () => {
    try {
      const result = await getMarketStatus()
      setData(result)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetch()
    const interval = setInterval(fetch, 60_000) // refresh every minute
    return () => clearInterval(interval)
  }, [fetch])

  return { data, loading, error, refetch: fetch }
}

/**
 * Fetch upcoming market holidays.
 * @example const { data: holidays } = useMarketHolidays()
 */
export function useMarketHolidays() {
  return useAsync<MarketHoliday[]>(() => getMarketHolidays(), [])
}

/**
 * Fetch all technical indicators (SMA, EMA, MACD, RSI) for a ticker.
 * @example const { data: indicators } = useTechnicalIndicators('AAPL')
 */
export function useTechnicalIndicators(ticker: string) {
  return useAsync<TechnicalIndicators>(() => getAllIndicators(ticker), [ticker])
}

/**
 * Fetch a live stock price snapshot (latest close + sparkline) for a ticker.
 * @example const { data: stock } = useLiveStockPrice('AAPL')
 */
export function useLiveStockPrice(ticker: string) {
  return useAsync<LiveStockPrice | null>(() => getLiveStockPrice(ticker), [ticker])
}

/**
 * Fetch live prices for multiple tickers in parallel.
 * @example const { data: stocks } = useLiveStockPrices(['AAPL', 'MSFT', 'TSLA'])
 */
export function useLiveStockPrices(tickers: string[]) {
  const key = tickers.join(',')
  return useAsync<LiveStockPrice[]>(
    () => Promise.all(tickers.map(t => getLiveStockPrice(t))).then(r => r.filter(Boolean) as LiveStockPrice[]),
    [key],
  )
}
