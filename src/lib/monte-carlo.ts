import { RISK_PARAMS } from './constants'

export type RiskProfile = 'Conservative' | 'Balanced' | 'Aggressive'

export interface MonteCarloResult {
  median: number
  p10: number
  p90: number
  totalContributed: number
  estimatedGainMedian: number
  yearlyProjections: { year: number; p10: number; median: number; p90: number }[]
}

/**
 * Monte Carlo simulation engine (Section 7.6).
 * Runs 10,000 iterations of projected portfolio returns to provide
 * a probabilistic range of outcomes.
 */
export function runMonteCarlo(
  initialInvestment: number,
  monthlyContribution: number,
  years: number,
  riskProfile: RiskProfile,
  inflationAdjustment: boolean = false,
  nSimulations: number = 5000 // reduced from 10k for browser perf
): MonteCarloResult {
  const params = RISK_PARAMS[riskProfile]
  let mu = params.mu
  const sigma = params.sigma

  if (inflationAdjustment) {
    mu -= 0.027
  }

  const months = years * 12
  const finalValues: number[] = []

  // Store yearly snapshots for all simulations
  const yearlySnapshots: number[][] = Array.from({ length: years }, () => [])

  for (let sim = 0; sim < nSimulations; sim++) {
    let portfolioValue = initialInvestment

    for (let m = 1; m <= months; m++) {
      // Log-normal monthly return: r_t = exp(μ/12 - σ²/24 + σ/√12 * Z)
      const z = gaussianRandom()
      const monthlyReturn = Math.exp(
        mu / 12 - (sigma * sigma) / 24 + (sigma / Math.sqrt(12)) * z
      )
      portfolioValue = portfolioValue * monthlyReturn + monthlyContribution

      // Record yearly snapshots
      if (m % 12 === 0) {
        const yearIdx = m / 12 - 1
        yearlySnapshots[yearIdx].push(portfolioValue)
      }
    }

    finalValues.push(portfolioValue)
  }

  finalValues.sort((a, b) => a - b)

  const totalContributed = initialInvestment + monthlyContribution * months
  const median = percentile(finalValues, 50)

  // Compute yearly projections
  const yearlyProjections = yearlySnapshots.map((values, idx) => {
    values.sort((a, b) => a - b)
    return {
      year: idx + 1,
      p10: percentile(values, 10),
      median: percentile(values, 50),
      p90: percentile(values, 90),
    }
  })

  return {
    median,
    p10: percentile(finalValues, 10),
    p90: percentile(finalValues, 90),
    totalContributed,
    estimatedGainMedian: median - totalContributed,
    yearlyProjections,
  }
}

/** Box-Muller transform for standard normal random variable */
function gaussianRandom(): number {
  let u = 0, v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

function percentile(sortedArr: number[], p: number): number {
  const idx = (p / 100) * (sortedArr.length - 1)
  const lower = Math.floor(idx)
  const upper = Math.ceil(idx)
  if (lower === upper) return sortedArr[lower]
  const fraction = idx - lower
  return sortedArr[lower] * (1 - fraction) + sortedArr[upper] * fraction
}
