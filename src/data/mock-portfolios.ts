import type { Portfolio, Transaction } from '../types/portfolio'

function genHistory(months: number, start: number, growth: number) {
  const pts: { date: string; value: number }[] = []
  const now = new Date()
  let v = start
  for (let i = months; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    v = v * (1 + growth / 12 + (Math.random() - 0.5) * 0.02)
    pts.push({ date: d.toISOString().split('T')[0], value: Math.round(v) })
  }
  return pts
}

export const mockPortfolios: Portfolio[] = [
  {
    id: 'port-001', goalId: 'goal-001', portfolioType: 'classic',
    equityPct: 55, bondsPct: 35, alternativesPct: 7, cashPct: 3,
    totalValue: 47250, totalReturn: 12.4, lastRebalanced: '2026-03-15',
    holdings: [
      { id: 'h1', ticker: 'VOO', securityName: 'Vanguard S&P 500 ETF', assetClass: 'ETF', quantity: 25, averageCost: 420.5, currentPrice: 468.3, weight: 24.8 },
      { id: 'h2', ticker: 'QQQ', securityName: 'Invesco QQQ Trust', assetClass: 'ETF', quantity: 12, averageCost: 380.2, currentPrice: 425.6, weight: 10.8 },
      { id: 'h3', ticker: 'AAPL', securityName: 'Apple Inc.', assetClass: 'Equity', quantity: 30, averageCost: 175.4, currentPrice: 198.5, weight: 12.6 },
      { id: 'h4', ticker: 'MSFT', securityName: 'Microsoft Corp.', assetClass: 'Equity', quantity: 15, averageCost: 385, currentPrice: 428.75, weight: 13.6 },
      { id: 'h5', ticker: 'AGG', securityName: 'iShares Core US Agg Bond ETF', assetClass: 'Bond', quantity: 80, averageCost: 98.5, currentPrice: 101.2, weight: 17.1 },
      { id: 'h6', ticker: 'LQD', securityName: 'iShares IG Corporate Bond ETF', assetClass: 'Bond', quantity: 45, averageCost: 108.75, currentPrice: 112.4, weight: 10.7 },
      { id: 'h7', ticker: 'GLD', securityName: 'SPDR Gold Shares', assetClass: 'Alternative', quantity: 10, averageCost: 185, currentPrice: 197.5, weight: 4.2 },
    ],
    performanceHistory: genHistory(12, 35000, 0.068),
  },
  {
    id: 'port-002', goalId: 'goal-002', portfolioType: 'classic',
    equityPct: 35, bondsPct: 55, alternativesPct: 5, cashPct: 5,
    totalValue: 12800, totalReturn: 5.2, lastRebalanced: '2026-02-20',
    holdings: [
      { id: 'h9', ticker: 'VOO', securityName: 'Vanguard S&P 500 ETF', assetClass: 'ETF', quantity: 5, averageCost: 415, currentPrice: 468.3, weight: 18.3 },
      { id: 'h10', ticker: 'AGG', securityName: 'iShares Core US Agg Bond ETF', assetClass: 'Bond', quantity: 40, averageCost: 97.8, currentPrice: 101.2, weight: 31.6 },
      { id: 'h11', ticker: 'LQD', securityName: 'iShares IG Corporate Bond ETF', assetClass: 'Bond', quantity: 20, averageCost: 107.5, currentPrice: 112.4, weight: 17.6 },
      { id: 'h12', ticker: 'BND', securityName: 'Vanguard Total Bond Market ETF', assetClass: 'Bond', quantity: 30, averageCost: 72.5, currentPrice: 74.8, weight: 17.5 },
    ],
    performanceHistory: genHistory(12, 9500, 0.035),
  },
  {
    id: 'port-003', goalId: 'goal-003', portfolioType: 'classic',
    equityPct: 75, bondsPct: 15, alternativesPct: 7, cashPct: 3,
    totalValue: 18500, totalReturn: 18.7, lastRebalanced: '2026-03-01',
    holdings: [
      { id: 'h14', ticker: 'QQQ', securityName: 'Invesco QQQ Trust', assetClass: 'ETF', quantity: 10, averageCost: 375, currentPrice: 425.6, weight: 23 },
      { id: 'h15', ticker: 'TSLA', securityName: 'Tesla Inc.', assetClass: 'Equity', quantity: 8, averageCost: 240, currentPrice: 285.4, weight: 12.3 },
      { id: 'h16', ticker: 'PLTR', securityName: 'Palantir Technologies', assetClass: 'Equity', quantity: 100, averageCost: 22.5, currentPrice: 28.9, weight: 15.6 },
      { id: 'h17', ticker: 'VOO', securityName: 'Vanguard S&P 500 ETF', assetClass: 'ETF', quantity: 3, averageCost: 425, currentPrice: 468.3, weight: 7.6 },
      { id: 'h18', ticker: 'AGG', securityName: 'iShares Core US Agg Bond ETF', assetClass: 'Bond', quantity: 25, averageCost: 99, currentPrice: 101.2, weight: 13.7 },
    ],
    performanceHistory: genHistory(12, 10000, 0.085),
  },
]

export const mockTransactions: Transaction[] = [
  { id: 'tx-001', goalId: 'goal-001', type: 'deposit', amount: 5000, currency: 'USD', createdAt: '2025-09-20T14:00:00Z', contributorName: 'Sarah Al-Rashid' },
  { id: 'tx-002', goalId: 'goal-001', type: 'buy', amount: 4200, currency: 'USD', ticker: 'VOO', quantity: 10, pricePerUnit: 420.5, createdAt: '2025-09-22T10:00:00Z' },
  { id: 'tx-003', goalId: 'goal-001', type: 'deposit', amount: 800, currency: 'USD', createdAt: '2025-10-01T10:00:00Z', contributorName: 'Sarah Al-Rashid' },
  { id: 'tx-004', goalId: 'goal-001', type: 'deposit', amount: 800, currency: 'USD', createdAt: '2025-11-01T10:00:00Z', contributorName: 'Sarah Al-Rashid' },
  { id: 'tx-005', goalId: 'goal-001', type: 'dividend', amount: 45.5, currency: 'USD', ticker: 'VOO', createdAt: '2025-12-15T10:00:00Z' },
  { id: 'tx-006', goalId: 'goal-001', type: 'deposit', amount: 800, currency: 'USD', createdAt: '2025-12-01T10:00:00Z', contributorName: 'Sarah Al-Rashid' },
  { id: 'tx-007', goalId: 'goal-001', type: 'deposit', amount: 1000, currency: 'USD', createdAt: '2026-01-15T10:00:00Z', contributorName: 'Ahmed Al-Rashid' },
  { id: 'tx-008', goalId: 'goal-001', type: 'deposit', amount: 800, currency: 'USD', createdAt: '2026-02-01T10:00:00Z', contributorName: 'Sarah Al-Rashid' },
  { id: 'tx-009', goalId: 'goal-001', type: 'deposit', amount: 500, currency: 'USD', createdAt: '2026-02-14T10:00:00Z', contributorName: 'Fatima Al-Rashid' },
  { id: 'tx-010', goalId: 'goal-001', type: 'deposit', amount: 800, currency: 'USD', createdAt: '2026-03-01T10:00:00Z', contributorName: 'Sarah Al-Rashid' },
  { id: 'tx-011', goalId: 'goal-001', type: 'deposit', amount: 800, currency: 'USD', createdAt: '2026-04-01T10:00:00Z', contributorName: 'Sarah Al-Rashid' },
]
