/**
 * mock-market-data.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Market data for the Gabi (Dhakium) app.
 *
 * Stock prices, ETF prices, and market indices are now seeded from real
 * Polygon.io data (fetched 2026-05-04). Live data is fetched at runtime
 * via src/services/polygonService.ts and src/hooks/usePolygon.ts.
 *
 * See: src/data/polygon-snapshot.ts  — raw Polygon.io snapshot
 *      src/services/polygonService.ts — live API client
 *      src/hooks/usePolygon.ts        — React hooks
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { ETFProduct, MarketIndex, NewsItem, StockPrice } from '../types/market'
import type { Notification } from '../types/market'
import {
  polygonStockPrices,
  polygonETFPrices,
  polygonIndices,
} from './polygon-snapshot'

// Re-export real stock prices (AAPL, MSFT, TSLA, NVDA, GOOGL, AMZN, META)
export const mockStockPrices: StockPrice[] = polygonStockPrices

// Re-export real ETF prices (VOO, QQQ, AGG, GLD, LQD)
export const mockETFPrices: StockPrice[] = polygonETFPrices

// Combined list for the Trading Simulator watchlist
export const mockAllPrices: StockPrice[] = [...polygonStockPrices, ...polygonETFPrices]

// Re-export real market indices (S&P 500, Nasdaq, Dow Jones, EUR/USD, BTC/USD)
export const mockIndices: MarketIndex[] = polygonIndices

// ── ETF product catalog (static metadata, prices from polygonETFPrices) ───────
export const mockETFs: ETFProduct[] = [
  {
    ticker: 'VOO', name: 'Vanguard S&P 500 ETF', type: 'ETF',
    historicalReturn: '~12.5% p.a.', riskLevel: 'Low', expenseRatio: 0.03,
    description: 'Tracks the S&P 500 Index, providing broad US large-cap equity exposure.',
    sparkline: polygonETFPrices.find(e => e.ticker === 'VOO')?.sparkline ?? [],
  },
  {
    ticker: 'AGG', name: 'iShares Core US Agg Bond ETF', type: 'Bond ETF',
    historicalReturn: '~3.2% p.a.', riskLevel: 'Low', expenseRatio: 0.03,
    description: 'Broad US investment-grade bond exposure including government and corporate bonds.',
    sparkline: polygonETFPrices.find(e => e.ticker === 'AGG')?.sparkline ?? [],
  },
  {
    ticker: 'QQQ', name: 'Invesco QQQ Trust', type: 'ETF',
    historicalReturn: '~18.7% p.a.', riskLevel: 'Medium', expenseRatio: 0.20,
    description: 'Tracks the Nasdaq-100 Index, focused on large-cap technology stocks.',
    sparkline: polygonETFPrices.find(e => e.ticker === 'QQQ')?.sparkline ?? [],
  },
  {
    ticker: 'GLD', name: 'SPDR Gold Shares', type: 'ETF',
    historicalReturn: '~8.1% p.a.', riskLevel: 'Medium', expenseRatio: 0.40,
    description: 'Provides exposure to the price of gold through physical gold bullion holdings.',
    sparkline: polygonETFPrices.find(e => e.ticker === 'GLD')?.sparkline ?? [],
  },
  {
    ticker: 'LQD', name: 'iShares IG Corporate Bond ETF', type: 'Bond ETF',
    historicalReturn: '~4.5% p.a.', riskLevel: 'Low', expenseRatio: 0.14,
    description: 'Investment-grade corporate bond exposure for income-focused investors.',
    sparkline: polygonETFPrices.find(e => e.ticker === 'LQD')?.sparkline ?? [],
  },
]

// ── News items (updated with real market context from Polygon data) ────────────
export const mockNews: NewsItem[] = [
  {
    id: 'n1',
    title: 'Apple Surges 3.2% — Closes at $280.14 on Strong Volume',
    summary: 'AAPL gained $8.79 on May 1st with 79.9M shares traded, pushing its market cap past $4.1 trillion. RSI-14 at 66.7 signals continued momentum.',
    source: 'Polygon.io Market Data',
    publishedAt: '2026-05-01T16:00:00Z',
    url: 'https://polygon.io',
    category: 'company',
  },
  {
    id: 'n2',
    title: 'S&P 500 Climbs to 5,686 — Broad Market Rally Continues',
    summary: 'The S&P 500 rose 1.47% to 5,686.67, led by gains in technology and consumer discretionary sectors. Nasdaq added 1.5% to close at 17,977.',
    source: 'Polygon.io Market Data',
    publishedAt: '2026-05-04T16:00:00Z',
    url: 'https://polygon.io',
    category: 'market',
  },
  {
    id: 'n3',
    title: 'NVDA Gains 2.3% — AI Chip Demand Drives Continued Outperformance',
    summary: "NVIDIA closed at $111.00, up $2.50. The company's market cap stands at $2.71 trillion as demand for AI infrastructure accelerates.",
    source: 'Polygon.io Market Data',
    publishedAt: '2026-05-01T16:00:00Z',
    url: 'https://polygon.io',
    category: 'company',
  },
  {
    id: 'n4',
    title: 'EUR/USD Holds at 1.1725 — Dollar Weakens on Fed Signals',
    summary: 'The euro traded at 1.17250 against the dollar, near a one-year high. Forex markets remain cautious ahead of upcoming central bank meetings.',
    source: 'Polygon.io Forex Data',
    publishedAt: '2026-05-02T12:00:00Z',
    url: 'https://polygon.io',
    category: 'economy',
  },
  {
    id: 'n5',
    title: 'Bitcoin Consolidates Near $78,550 After Recent Rally',
    summary: 'BTC/USD closed at $78,549.99, with daily volume of 5,589 BTC. The cryptocurrency market remains open 24/7 per Polygon.io market status.',
    source: 'Polygon.io Crypto Data',
    publishedAt: '2026-05-02T20:00:00Z',
    url: 'https://polygon.io',
    category: 'market',
  },
]

// ── Notifications (unchanged) ─────────────────────────────────────────────────
export const mockNotifications: Notification[] = [
  { id: 'notif-1', title: 'Monthly Contribution Processed', message: "$800 has been deposited into Aisha's University Fund.", type: 'success', read: false, createdAt: '2026-04-24T09:00:00Z', actionUrl: '/dashboard/portfolio/port-001' },
  { id: 'notif-2', title: 'Portfolio Rebalancing Recommended', message: "Aisha's portfolio equity allocation has drifted 6% above target.", type: 'warning', read: false, createdAt: '2026-04-23T14:00:00Z', actionUrl: '/dashboard/portfolio/port-001' },
  { id: 'notif-3', title: 'New Badge Earned!', message: 'Aisha earned the "Quiz Ace" badge for scoring 100% on Module 2.', type: 'info', read: true, createdAt: '2026-04-22T16:00:00Z' },
  { id: 'notif-4', title: 'Quarterly Report Available', message: 'Your Q1 2026 performance report is ready for download.', type: 'info', read: true, createdAt: '2026-04-15T10:00:00Z', actionUrl: '/dashboard/reports' },
  { id: 'notif-5', title: 'Goal Milestone Reached', message: "Omar's Education Fund has reached 12% of its target!", type: 'success', read: true, createdAt: '2026-04-10T08:00:00Z' },
]
