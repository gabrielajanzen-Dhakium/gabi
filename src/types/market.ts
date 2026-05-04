export interface StockPrice {
  ticker: string
  name: string
  price: number
  open?: number
  high?: number
  low?: number
  change: number
  changePct: number
  volume: number
  high52w: number
  low52w: number
  marketCap?: number
  peRatio?: number
  sparkline: number[]
  timestamp?: number
}

export interface HistoricalPrice {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface MarketIndex {
  name: string
  symbol: string
  value: number
  change: number
  changePct: number
}

export interface ETFProduct {
  ticker: string
  name: string
  type: 'ETF' | 'Bond ETF'
  historicalReturn: string
  riskLevel: 'Low' | 'Medium' | 'High'
  expenseRatio: number
  description: string
  sparkline: number[]
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  publishedAt: string
  url: string
  category: 'market' | 'economy' | 'company' | 'education'
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'alert'
  read: boolean
  createdAt: string
  actionUrl?: string
}
