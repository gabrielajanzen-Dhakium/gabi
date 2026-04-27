export type GoalType = 'education' | 'apartment' | 'living_costs' | 'first_car' | 'wedding' | 'other'
export type RiskProfile = 'Conservative' | 'Balanced' | 'Aggressive'

export interface FinancialGoal {
  id: string
  childId: string
  childName: string
  goalName: string
  goalType: GoalType
  targetAmount: number
  currentValue: number
  timeHorizonYears: number
  monthlyContribution: number
  initialInvestment: number
  riskProfile: RiskProfile
  inflationAdjusted: boolean
  isActive: boolean
  createdAt: string
  portfolioId?: string
}
