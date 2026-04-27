import type { ETFProduct, MarketIndex, NewsItem, StockPrice } from '../types/market'
import type { Notification } from '../types/market'

const spark = (base: number, vol: number, n = 30) =>
  Array.from({ length: n }, () => base + (Math.random() - 0.45) * vol)

export const mockStockPrices: StockPrice[] = [
  { ticker: 'VOO', name: 'Vanguard S&P 500 ETF', price: 468.3, change: 3.2, changePct: 0.69, volume: 4_200_000, high52w: 485, low52w: 390, sparkline: spark(450, 40) },
  { ticker: 'QQQ', name: 'Invesco QQQ Trust', price: 425.6, change: -1.8, changePct: -0.42, volume: 3_800_000, high52w: 445, low52w: 340, sparkline: spark(400, 50) },
  { ticker: 'AGG', name: 'iShares Core US Agg Bond ETF', price: 101.2, change: 0.15, changePct: 0.15, volume: 6_100_000, high52w: 104, low52w: 95, sparkline: spark(99, 5) },
  { ticker: 'GLD', name: 'SPDR Gold Shares', price: 197.5, change: 1.4, changePct: 0.71, volume: 8_500_000, high52w: 210, low52w: 170, sparkline: spark(190, 20) },
  { ticker: 'LQD', name: 'iShares IG Corporate Bond ETF', price: 112.4, change: 0.3, changePct: 0.27, volume: 2_900_000, high52w: 116, low52w: 104, sparkline: spark(110, 6) },
  { ticker: 'AAPL', name: 'Apple Inc.', price: 198.5, change: 2.85, changePct: 1.46, volume: 52_000_000, high52w: 210, low52w: 155, marketCap: 3_050_000_000_000, peRatio: 30.2, sparkline: spark(185, 25) },
  { ticker: 'MSFT', name: 'Microsoft Corp.', price: 428.75, change: -0.5, changePct: -0.12, volume: 22_000_000, high52w: 450, low52w: 370, marketCap: 3_190_000_000_000, peRatio: 35.1, sparkline: spark(415, 30) },
  { ticker: 'TSLA', name: 'Tesla Inc.', price: 285.4, change: 8.2, changePct: 2.96, volume: 95_000_000, high52w: 310, low52w: 180, marketCap: 900_000_000_000, peRatio: 72.5, sparkline: spark(260, 50) },
]

export const mockETFs: ETFProduct[] = [
  { ticker: 'VOO', name: 'Vanguard S&P 500 ETF', type: 'ETF', historicalReturn: '~12.5% p.a.', riskLevel: 'Low', expenseRatio: 0.03, description: 'Tracks the S&P 500 Index, providing broad US large-cap equity exposure.', sparkline: spark(450, 40) },
  { ticker: 'AGG', name: 'iShares Core US Agg Bond ETF', type: 'Bond ETF', historicalReturn: '~3.2% p.a.', riskLevel: 'Low', expenseRatio: 0.03, description: 'Broad US investment-grade bond exposure including government and corporate bonds.', sparkline: spark(99, 5) },
  { ticker: 'QQQ', name: 'Invesco QQQ Trust', type: 'ETF', historicalReturn: '~18.7% p.a.', riskLevel: 'Medium', expenseRatio: 0.20, description: 'Tracks the Nasdaq-100 Index, focused on large-cap technology stocks.', sparkline: spark(400, 50) },
  { ticker: 'GLD', name: 'SPDR Gold Shares', type: 'ETF', historicalReturn: '~8.1% p.a.', riskLevel: 'Medium', expenseRatio: 0.40, description: 'Provides exposure to the price of gold through physical gold bullion holdings.', sparkline: spark(190, 20) },
  { ticker: 'LQD', name: 'iShares IG Corporate Bond ETF', type: 'Bond ETF', historicalReturn: '~4.5% p.a.', riskLevel: 'Low', expenseRatio: 0.14, description: 'Investment-grade corporate bond exposure for income-focused investors.', sparkline: spark(110, 6) },
]

export const mockIndices: MarketIndex[] = [
  { name: 'S&P 500', symbol: 'SPX', value: 5248.32, change: 28.45, changePct: 0.54 },
  { name: 'Nasdaq', symbol: 'IXIC', value: 16428.82, change: -42.15, changePct: -0.26 },
  { name: 'Dow Jones', symbol: 'DJI', value: 39872.99, change: 167.44, changePct: 0.42 },
  { name: 'ADX General', symbol: 'ADI', value: 9245.67, change: 15.23, changePct: 0.16 },
]

export const mockNews: NewsItem[] = [
  { id: 'n1', title: 'Federal Reserve Signals Potential Rate Cut in Q3 2026', summary: 'Markets rally as Fed minutes suggest openness to easing monetary policy.', source: 'Reuters', publishedAt: '2026-04-24T08:00:00Z', url: '#', category: 'economy' },
  { id: 'n2', title: 'S&P 500 Reaches New All-Time High', summary: 'The benchmark index crossed 5,250 for the first time, driven by tech earnings.', source: 'Bloomberg', publishedAt: '2026-04-24T06:30:00Z', url: '#', category: 'market' },
  { id: 'n3', title: 'Apple Reports Record Q2 Revenue', summary: 'iPhone maker beats estimates with $94.8B in quarterly revenue.', source: 'CNBC', publishedAt: '2026-04-23T16:00:00Z', url: '#', category: 'company' },
  { id: 'n4', title: 'UAE Financial Literacy Initiative Launched', summary: 'ADGM partners with EdTech platforms to boost youth financial education.', source: 'Gulf News', publishedAt: '2026-04-23T10:00:00Z', url: '#', category: 'education' },
  { id: 'n5', title: 'Gold Prices Hit $2,400 Amid Geopolitical Uncertainty', summary: 'Safe-haven demand pushes gold to near-record levels.', source: 'Financial Times', publishedAt: '2026-04-22T14:00:00Z', url: '#', category: 'market' },
]

export const mockNotifications: Notification[] = [
  { id: 'notif-1', title: 'Monthly Contribution Processed', message: '$800 has been deposited into Aisha\'s University Fund.', type: 'success', read: false, createdAt: '2026-04-24T09:00:00Z', actionUrl: '/dashboard/portfolio/port-001' },
  { id: 'notif-2', title: 'Portfolio Rebalancing Recommended', message: 'Aisha\'s portfolio equity allocation has drifted 6% above target.', type: 'warning', read: false, createdAt: '2026-04-23T14:00:00Z', actionUrl: '/dashboard/portfolio/port-001' },
  { id: 'notif-3', title: 'New Badge Earned!', message: 'Aisha earned the "Quiz Ace" badge for scoring 100% on Module 2.', type: 'info', read: true, createdAt: '2026-04-22T16:00:00Z' },
  { id: 'notif-4', title: 'Quarterly Report Available', message: 'Your Q1 2026 performance report is ready for download.', type: 'info', read: true, createdAt: '2026-04-15T10:00:00Z', actionUrl: '/dashboard/reports' },
  { id: 'notif-5', title: 'Goal Milestone Reached', message: 'Omar\'s Education Fund has reached 12% of its target!', type: 'success', read: true, createdAt: '2026-04-10T08:00:00Z' },
]
