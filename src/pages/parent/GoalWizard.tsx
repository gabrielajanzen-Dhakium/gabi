import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuth } from '../../context/AuthContext'
import { runMonteCarlo, type RiskProfile } from '../../lib/monte-carlo'
import { GOAL_TYPES, ASSET_ALLOCATIONS } from '../../lib/constants'
import { formatCurrency } from '../../lib/utils'

const steps = ['Child & Goal', 'Target', 'Contributions', 'Risk Profile', 'Preview']

export default function GoalWizard() {
  const { children: childProfiles } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    childId: childProfiles[0]?.id ?? '',
    goalType: 'education' as string,
    goalName: '',
    targetAmount: 100000,
    currency: 'USD',
    timeHorizon: 10,
    monthlyContribution: 500,
    initialInvestment: 5000,
    riskProfile: 'Balanced' as RiskProfile,
    inflationAdjusted: true,
  })

  const update = (field: string, value: string | number | boolean) => setForm(prev => ({ ...prev, [field]: value }))

  const simulation = useMemo(() => {
    if (step < 4) return null
    return runMonteCarlo(form.initialInvestment, form.monthlyContribution, form.timeHorizon, form.riskProfile, form.inflationAdjusted)
  }, [step, form.initialInvestment, form.monthlyContribution, form.timeHorizon, form.riskProfile, form.inflationAdjusted])

  const handleCreate = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  const allocation = ASSET_ALLOCATIONS[form.riskProfile]

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Create New Goal</h1>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
              i <= step ? 'bg-brand text-white' : 'bg-surface-tertiary text-text-muted'
            }`}>
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className={`hidden sm:block text-xs font-medium ${i <= step ? 'text-text-primary' : 'text-text-muted'}`}>{s}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-brand' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border p-8">
        {/* Step 0: Child & Goal Type */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Select Child</label>
              <div className="grid grid-cols-2 gap-3">
                {childProfiles.map(c => (
                  <button key={c.id} onClick={() => update('childId', c.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${form.childId === c.id ? 'border-brand bg-brand-light' : 'border-border hover:border-brand/30'}`}>
                    <p className="text-sm font-semibold text-text-primary">{c.name}</p>
                    <p className="text-xs text-text-muted">{c.ageGroup}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Goal Type</label>
              <div className="grid grid-cols-3 gap-3">
                {GOAL_TYPES.map(g => (
                  <button key={g.id} onClick={() => { update('goalType', g.id); update('goalName', `${childProfiles.find(c => c.id === form.childId)?.name?.split(' ')[0]}'s ${g.label}`) }} className={`p-4 rounded-xl border-2 text-center transition-all ${form.goalType === g.id ? 'border-brand bg-brand-light' : 'border-border hover:border-brand/30'}`}>
                    <span className="text-2xl">{g.icon}</span>
                    <p className="text-xs font-medium text-text-primary mt-1">{g.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Target */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Goal Name</label>
              <input type="text" value={form.goalName} onChange={e => update('goalName', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Target Amount ({form.currency})</label>
              <input type="number" value={form.targetAmount} onChange={e => update('targetAmount', Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm outline-none focus:border-brand" />
              <p className="text-xs text-text-muted mt-1">{formatCurrency(form.targetAmount, form.currency)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Time Horizon: {form.timeHorizon} years</label>
              <input type="range" min={1} max={25} value={form.timeHorizon} onChange={e => update('timeHorizon', Number(e.target.value))} className="w-full accent-brand" />
              <div className="flex justify-between text-xs text-text-muted"><span>1 yr</span><span>25 yrs</span></div>
            </div>
          </div>
        )}

        {/* Step 2: Contributions */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Initial Investment</label>
              <input type="number" value={form.initialInvestment} onChange={e => update('initialInvestment', Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm outline-none focus:border-brand" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Monthly Contribution</label>
              <input type="number" value={form.monthlyContribution} onChange={e => update('monthlyContribution', Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm outline-none focus:border-brand" />
            </div>
            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="checkbox" checked={form.inflationAdjusted} onChange={e => update('inflationAdjusted', e.target.checked)} className="rounded border-border accent-brand" />
              Adjust for inflation (2.7% average)
            </label>
          </div>
        )}

        {/* Step 3: Risk */}
        {step === 3 && (
          <div className="space-y-6">
            <label className="block text-sm font-medium text-text-primary">Risk Tolerance</label>
            <div className="grid grid-cols-3 gap-4">
              {(['Conservative', 'Balanced', 'Aggressive'] as RiskProfile[]).map(r => (
                <button key={r} onClick={() => update('riskProfile', r)} className={`p-5 rounded-xl border-2 text-center transition-all ${form.riskProfile === r ? 'border-brand bg-brand-light' : 'border-border hover:border-brand/30'}`}>
                  <p className="text-sm font-semibold text-text-primary">{r}</p>
                  <p className="text-xs text-text-muted mt-1">
                    {r === 'Conservative' ? '3.5% return' : r === 'Balanced' ? '6% return' : '8.5% return'}
                  </p>
                </button>
              ))}
            </div>
            {/* Allocation Preview */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">Asset Allocation Preview</h3>
              <div className="space-y-2">
                {Object.entries(allocation).map(([cls, pct]) => (
                  <div key={cls} className="flex items-center gap-3">
                    <span className="text-xs text-text-secondary w-32 shrink-0">{cls}</span>
                    <div className="flex-1 h-3 bg-surface-tertiary rounded-full overflow-hidden">
                      <div className="h-full bg-brand rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-text-primary w-8 text-right tabular-nums">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Preview */}
        {step === 4 && simulation && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-text-muted">Projected Portfolio Value (Median)</p>
              <p className="text-4xl font-extrabold text-brand tabular-nums mt-1">{formatCurrency(simulation.median)}</p>
              <p className="text-sm text-text-secondary mt-1">
                Range: {formatCurrency(simulation.p10)} — {formatCurrency(simulation.p90)}
              </p>
            </div>

            {/* Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulation.yearlyProjections}>
                  <defs>
                    <linearGradient id="coneGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0047AB" stopOpacity={0.08} />
                      <stop offset="100%" stopColor="#0047AB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={y => `Y${y}`} />
                  <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: any) => [formatCurrency(v), ''] as any} contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
                  <Area type="monotone" dataKey="p90" stroke="none" fill="#0047AB" fillOpacity={0.05} />
                  <Area type="monotone" dataKey="median" stroke="#0047AB" strokeWidth={2} fill="url(#coneGrad)" />
                  <Area type="monotone" dataKey="p10" stroke="none" fill="#0047AB" fillOpacity={0.03} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-secondary rounded-xl p-4">
                <p className="text-xs text-text-muted">Total Contributions</p>
                <p className="text-lg font-bold text-text-primary">{formatCurrency(simulation.totalContributed)}</p>
              </div>
              <div className="bg-success-light rounded-xl p-4">
                <p className="text-xs text-text-muted">Estimated Gain</p>
                <p className="text-lg font-bold text-success">{formatCurrency(simulation.estimatedGainMedian)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary">
              <ArrowLeft size={16} /> Back
            </button>
          ) : <div />}
          {step < 4 ? (
            <button onClick={() => setStep(step + 1)} className="flex items-center gap-1 px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-colors">
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleCreate} className="px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-colors" id="goal-create">
              Create Goal ✓
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
