import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { PRICING_TIERS, PORTFOLIO_TYPES } from '../../lib/constants'

const benchmarks = [
  { type: 'Growth (Aggressive)', annual: '7.65%', y1: '7.65%', y5: '44.1%', y10: '107.59%' },
  { type: 'Balanced', annual: '6.80%', y1: '6.80%', y5: '38.9%', y10: '93.90%' },
  { type: 'Conservative', annual: '5.60%', y1: '5.60%', y5: '31.45%', y10: '73.60%' },
]

export default function PortfoliosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-indigo-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight animate-fade-in-up">
            Portfolios &{' '}
            <span className="bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent">Pricing</span>
          </h1>
          <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto">
            Choose from professionally managed portfolios or build your own. Simple, transparent pricing.
          </p>
        </div>
      </section>

      {/* Portfolio Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary text-center mb-12">Investment Portfolios</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {PORTFOLIO_TYPES.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-lg font-semibold text-text-primary mb-2">{p.name}</h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">{p.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-text-muted">Target Return</p>
                    <p className="text-lg font-bold text-brand">{p.targetReturn}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    p.risk === 'Balanced' ? 'bg-brand-light text-brand' :
                    p.risk === 'High' ? 'bg-warning-light text-warning' :
                    p.risk === 'Variable' ? 'bg-surface-tertiary text-text-secondary' :
                    'bg-success-light text-success'
                  }`}>
                    {p.risk} Risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Benchmarks */}
      <section className="bg-surface-secondary py-20 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary text-center mb-10">Performance Benchmarks</h2>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-secondary">
                  <th className="text-left px-6 py-3 font-semibold text-text-primary">Portfolio Type</th>
                  <th className="text-right px-6 py-3 font-semibold text-text-primary">Annual Return</th>
                  <th className="text-right px-6 py-3 font-semibold text-text-primary hidden sm:table-cell">1-Year ROI</th>
                  <th className="text-right px-6 py-3 font-semibold text-text-primary hidden md:table-cell">5-Year ROI</th>
                  <th className="text-right px-6 py-3 font-semibold text-text-primary">10-Year ROI</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map(b => (
                  <tr key={b.type} className="border-t border-border hover:bg-brand-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-text-primary">{b.type}</td>
                    <td className="px-6 py-4 text-right text-success font-semibold tabular-nums">{b.annual}</td>
                    <td className="px-6 py-4 text-right text-text-secondary tabular-nums hidden sm:table-cell">{b.y1}</td>
                    <td className="px-6 py-4 text-right text-text-secondary tabular-nums hidden md:table-cell">{b.y5}</td>
                    <td className="px-6 py-4 text-right font-semibold text-brand tabular-nums">{b.y10}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">Start free, upgrade when you're ready.</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto stagger-children">
            {PRICING_TIERS.map(tier => (
              <div key={tier.id} className={`rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                tier.highlighted
                  ? 'bg-brand text-white border-brand shadow-xl shadow-brand/20 relative'
                  : 'bg-white border-border hover:shadow-lg'
              }`}>
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-warning text-text-primary text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-xl font-bold ${tier.highlighted ? 'text-white' : 'text-text-primary'}`}>{tier.name}</h3>
                <p className={`text-sm mt-1 ${tier.highlighted ? 'text-white/70' : 'text-text-secondary'}`}>{tier.description}</p>
                <div className="mt-6 mb-6">
                  {tier.price !== null ? (
                    <p className={`text-4xl font-extrabold ${tier.highlighted ? 'text-white' : 'text-text-primary'}`}>
                      ${tier.price}<span className="text-base font-medium">{tier.period}</span>
                    </p>
                  ) : (
                    <p className={`text-4xl font-extrabold ${tier.highlighted ? 'text-white' : 'text-text-primary'}`}>
                      {tier.period}
                    </p>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={16} className={`mt-0.5 shrink-0 ${tier.highlighted ? 'text-white/80' : 'text-success'}`} />
                      <span className={tier.highlighted ? 'text-white/90' : 'text-text-secondary'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-colors ${
                    tier.highlighted
                      ? 'bg-white text-brand hover:bg-brand-50'
                      : 'bg-brand text-white hover:bg-brand-dark'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
