/**
 * polygonService.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Polygon.io REST API client for the Gabi (Dhakium) project.
 *
 * All requests go through the Polygon.io public REST API.
 * The API key is read from the VITE_POLYGON_API_KEY environment variable.
 *
 * Free-tier limitations:
 *   - Aggregates, reference data, and indicators: available
 *   - Real-time last trade/quote: requires Starter plan
 *   - Options chain snapshot: requires Options plan
 *
 * Docs: https://polygon.io/docs/
 * ─────────────────────────────────────────────────────────────────────────────
 */

const BASE_URL = 'https://api.polygon.io'
const API_KEY  = import.meta.env.VITE_POLYGON_API_KEY as string

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AggBar {
  timestamp: number
  open:      number
  high:      number
  low:       number
  close:     number
  volume:    number
}

export interface TickerDetail {
  ticker:          string
  name:            string
  market:          string
  primaryExchange: string
  type:            string
  currency:        string
  marketCap:       number | null
  employees:       number | null
  sicCode:         string | null
  sicDescription:  string | null
  description:     string
  homepageUrl:     string | null
  logoUrl:         string | null
}

export interface LiveStockPrice {
  ticker:    string
  name:      string
  price:     number
  open:      number
  high:      number
  low:       number
  change:    number
  changePct: number
  volume:    number
  marketCap: number | null
  sparkline: number[]
  timestamp: number
}

export interface MarketStatusData {
  market:     string
  nyse:       string
  nasdaq:     string
  otc:        string
  crypto:     string
  fx:         string
  afterHours: boolean
  earlyHours: boolean
}

export interface MarketHoliday {
  exchange: string
  name:     string
  status:   string
  date:     string
  open:     string | null
  close:    string | null
}

export interface IndicatorValue {
  date:  string
  value: number
}

export interface MacdValue {
  date:      string
  value:     number
  signal:    number
  histogram: number
}

export interface TechnicalIndicators {
  sma20?: IndicatorValue[]
  ema20?: IndicatorValue[]
  macd?:  MacdValue[]
  rsi14?: IndicatorValue[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function get<T>(path: string, params: Record<string, string | number | boolean> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('apiKey', API_KEY)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v))
  }
  const res = await fetch(url.toString())
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Polygon API error ${res.status}: ${body.slice(0, 120)}`)
  }
  return res.json() as Promise<T>
}

function toIso(d: Date) {
  return d.toISOString().split('T')[0]
}

function daysAgo(n: number) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}

// ── API Methods ───────────────────────────────────────────────────────────────

/**
 * Fetch daily OHLCV aggregate bars for a ticker over a date range.
 */
export async function getAggBars(
  ticker: string,
  from: string,
  to:   string,
  timespan: 'minute' | 'hour' | 'day' | 'week' | 'month' = 'day',
  multiplier = 1,
  limit = 30,
): Promise<AggBar[]> {
  const data = await get<{ results?: Array<{ t: number; o: number; h: number; l: number; c: number; v: number }> }>(
    `/v2/aggs/ticker/${ticker}/range/${multiplier}/${timespan}/${from}/${to}`,
    { adjusted: true, sort: 'asc', limit },
  )
  return (data.results ?? []).map(r => ({
    timestamp: r.t,
    open:      r.o,
    high:      r.h,
    low:       r.l,
    close:     r.c,
    volume:    r.v,
  }))
}

/**
 * Fetch ticker details (company info, market cap, description, etc.)
 */
export async function getTickerDetail(ticker: string): Promise<TickerDetail | null> {
  try {
    const data = await get<{ results?: {
      ticker: string; name: string; market: string; primary_exchange: string;
      type: string; currency_name: string; market_cap: number; total_employees: number;
      sic_code: string; sic_description: string; description: string;
      homepage_url: string; branding?: { logo_url?: string }
    } }>(`/v3/reference/tickers/${ticker}`)
    const r = data.results
    if (!r) return null
    return {
      ticker:          r.ticker,
      name:            r.name,
      market:          r.market,
      primaryExchange: r.primary_exchange,
      type:            r.type,
      currency:        r.currency_name,
      marketCap:       r.market_cap ?? null,
      employees:       r.total_employees ?? null,
      sicCode:         r.sic_code ?? null,
      sicDescription:  r.sic_description ?? null,
      description:     r.description ?? '',
      homepageUrl:     r.homepage_url ?? null,
      logoUrl:         r.branding?.logo_url ?? null,
    }
  } catch {
    return null
  }
}

/**
 * Fetch current market status across exchanges and asset classes.
 */
export async function getMarketStatus(): Promise<MarketStatusData | null> {
  try {
    const data = await get<{
      market: string
      exchanges: { nyse: string; nasdaq: string; otc: string }
      currencies: { crypto: string; fx: string }
      afterHours: boolean
      earlyHours: boolean
    }>('/v1/marketstatus/now')
    return {
      market:     data.market,
      nyse:       data.exchanges?.nyse ?? 'unknown',
      nasdaq:     data.exchanges?.nasdaq ?? 'unknown',
      otc:        data.exchanges?.otc ?? 'unknown',
      crypto:     data.currencies?.crypto ?? 'unknown',
      fx:         data.currencies?.fx ?? 'unknown',
      afterHours: data.afterHours ?? false,
      earlyHours: data.earlyHours ?? false,
    }
  } catch {
    return null
  }
}

/**
 * Fetch upcoming market holidays.
 */
export async function getMarketHolidays(): Promise<MarketHoliday[]> {
  try {
    const data = await get<Array<{
      exchange: string; name: string; status: string; date: string;
      open?: string; close?: string
    }>>('/v1/marketstatus/upcoming')
    return (Array.isArray(data) ? data : []).map(h => ({
      exchange: h.exchange,
      name:     h.name,
      status:   h.status,
      date:     h.date,
      open:     h.open ?? null,
      close:    h.close ?? null,
    }))
  } catch {
    return []
  }
}

/**
 * Fetch SMA values for a ticker.
 */
export async function getSMA(ticker: string, window = 20, limit = 10): Promise<IndicatorValue[]> {
  try {
    const data = await get<{ results?: { values?: Array<{ timestamp: number; value: number }> } }>(
      `/v1/indicators/sma/${ticker}`,
      { timespan: 'day', adjusted: true, window, series_type: 'close', limit },
    )
    return (data.results?.values ?? []).map(v => ({
      date:  new Date(v.timestamp).toISOString().split('T')[0],
      value: v.value,
    }))
  } catch {
    return []
  }
}

/**
 * Fetch EMA values for a ticker.
 */
export async function getEMA(ticker: string, window = 20, limit = 10): Promise<IndicatorValue[]> {
  try {
    const data = await get<{ results?: { values?: Array<{ timestamp: number; value: number }> } }>(
      `/v1/indicators/ema/${ticker}`,
      { timespan: 'day', adjusted: true, window, series_type: 'close', limit },
    )
    return (data.results?.values ?? []).map(v => ({
      date:  new Date(v.timestamp).toISOString().split('T')[0],
      value: v.value,
    }))
  } catch {
    return []
  }
}

/**
 * Fetch MACD values for a ticker.
 */
export async function getMACD(ticker: string, limit = 5): Promise<MacdValue[]> {
  try {
    const data = await get<{ results?: { values?: Array<{ timestamp: number; value: number; signal: number; histogram: number }> } }>(
      `/v1/indicators/macd/${ticker}`,
      { timespan: 'day', adjusted: true, short_window: 12, long_window: 26, signal_window: 9, series_type: 'close', limit },
    )
    return (data.results?.values ?? []).map(v => ({
      date:      new Date(v.timestamp).toISOString().split('T')[0],
      value:     v.value,
      signal:    v.signal,
      histogram: v.histogram,
    }))
  } catch {
    return []
  }
}

/**
 * Fetch RSI values for a ticker.
 */
export async function getRSI(ticker: string, window = 14, limit = 10): Promise<IndicatorValue[]> {
  try {
    const data = await get<{ results?: { values?: Array<{ timestamp: number; value: number }> } }>(
      `/v1/indicators/rsi/${ticker}`,
      { timespan: 'day', adjusted: true, window, series_type: 'close', limit },
    )
    return (data.results?.values ?? []).map(v => ({
      date:  new Date(v.timestamp).toISOString().split('T')[0],
      value: v.value,
    }))
  } catch {
    return []
  }
}

/**
 * Fetch all technical indicators for a ticker in one call.
 */
export async function getAllIndicators(ticker: string): Promise<TechnicalIndicators> {
  const [sma20, ema20, macd, rsi14] = await Promise.all([
    getSMA(ticker, 20, 10),
    getEMA(ticker, 20, 10),
    getMACD(ticker, 5),
    getRSI(ticker, 14, 10),
  ])
  return { sma20, ema20, macd, rsi14 }
}

/**
 * Build a full LiveStockPrice object for a ticker using agg bars + ticker details.
 */
export async function getLiveStockPrice(ticker: string): Promise<LiveStockPrice | null> {
  try {
    const from = toIso(daysAgo(10))
    const to   = toIso(new Date())
    const [bars, detail] = await Promise.all([
      getAggBars(ticker, from, to, 'day', 1, 10),
      getTickerDetail(ticker),
    ])
    if (!bars.length) return null
    const latest = bars[bars.length - 1]
    const prev   = bars.length >= 2 ? bars[bars.length - 2] : latest
    const change    = latest.close - prev.close
    const changePct = prev.close ? (change / prev.close) * 100 : 0
    return {
      ticker,
      name:      detail?.name ?? ticker,
      price:     latest.close,
      open:      latest.open,
      high:      latest.high,
      low:       latest.low,
      change:    parseFloat(change.toFixed(4)),
      changePct: parseFloat(changePct.toFixed(4)),
      volume:    latest.volume,
      marketCap: detail?.marketCap ?? null,
      sparkline: bars.map(b => b.close),
      timestamp: latest.timestamp,
    }
  } catch {
    return null
  }
}
