export interface Portfolio {
  id: string
  goalId: string
  portfolioType: 'classic' | 'sri' | 'islamic' | 'private-credit' | 'private-equity' | 'self-directed'
  equityPct: number
  bondsPct: number
  alternativesPct: number
  cashPct: number
  totalValue: number
  totalReturn: number
  lastRebalanced: string
  holdings: PortfolioHolding[]
  performanceHistory: PerformancePoint[]
}

export interface PortfolioHolding {
  id: string
  ticker: string
  securityName: string
  assetClass: 'Equity' | 'Bond' | 'ETF' | 'MutualFund' | 'Alternative'
  quantity: number
  averageCost: number
  currentPrice: number
  weight: number
}

export interface PerformancePoint {
  date: string
  value: number
}

export interface Transaction {
  id: string
  goalId: string
  type: 'deposit' | 'withdrawal' | 'buy' | 'sell' | 'dividend'
  amount: number
  currency: string
  ticker?: string
  quantity?: number
  pricePerUnit?: number
  contributorName?: string
  createdAt: string
}
