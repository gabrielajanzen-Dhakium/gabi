import { Link } from 'react-router-dom'
import { GraduationCap, Bot, TrendingUp, PieChart, LineChart, PiggyBank, ArrowRight, CheckCircle2 } from 'lucide-react'

const modules = [
  {
    icon: GraduationCap, title: 'Financial Education', color: 'text-brand', bg: 'bg-brand-light',
    desc: 'Comprehensive 8-module curriculum aligned with CFA Level I, designed for teenagers aged 14–18.',
    highlights: ['Gamified learning with badges & XP', '24 interactive lessons', 'Video + text + quizzes', 'Progress tracking for parents'],
  },
  {
    icon: Bot, title: 'AI Chatbot — Dhaki', color: 'text-[#8B5CF6]', bg: 'bg-[#F5F3FF]',
    desc: 'Meet Dhaki, your 24/7 AI financial tutor. Ask any question about money, investing, or the economy.',
    highlights: ['Powered by GPT-4.1', 'Age-appropriate explanations', 'Module-aware context', 'Step-by-step calculations'],
  },
  {
    icon: TrendingUp, title: 'Robo-Advisory Engine', color: 'text-success', bg: 'bg-success-light',
    desc: 'AI-powered goal-based investment planning using Monte Carlo simulation with 10,000 iterations.',
    highlights: ['3 risk profiles', 'Inflation-adjusted projections', 'Probability cone visualization', 'Asset allocation optimizer'],
  },
  {
    icon: PieChart, title: 'Managed Portfolios', color: 'text-warning', bg: 'bg-warning-light',
    desc: 'Professionally managed portfolios with automatic rebalancing and performance reporting.',
    highlights: ['Classic, SRI, Islamic options', 'Quarterly rebalancing', 'Monthly performance reports', 'Tax-optimized investing'],
  },
  {
    icon: LineChart, title: 'Trading Simulator', color: 'text-danger', bg: 'bg-danger-light',
    desc: 'Practice investing with $10,000 virtual cash using real-time market data from NASDAQ.',
    highlights: ['Real market prices (15-min delay)', 'Market & limit orders', 'P&L tracking', 'AI-powered trade insights'],
  },
  {
    icon: PiggyBank, title: 'Savings & Custodial Accounts', color: 'text-[#EC4899]', bg: 'bg-[#FDF2F8]',
    desc: 'Multi-contributor savings goals with shareable payment links for family events.',
    highlights: ['Birthday & Eid contribution links', 'Contribution tracking', 'Goal gap analysis', 'Partner bank integration'],
  },
]

export default function FeaturesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-indigo-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight animate-fade-in-up">
            Everything in{' '}
            <span className="bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent">One Platform</span>
          </h1>
          <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Six interconnected modules designed to educate, save, and invest — all in a single family-oriented product.
          </p>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {modules.map((mod, i) => (
            <div key={mod.title} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`w-12 h-12 ${mod.bg} rounded-xl flex items-center justify-center mb-5`}>
                  <mod.icon className={mod.color} size={24} />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">{mod.title}</h2>
                <p className="text-text-secondary leading-relaxed mb-6">{mod.desc}</p>
                <ul className="space-y-3">
                  {mod.highlights.map(h => (
                    <li key={h} className="flex items-center gap-2.5 text-sm text-text-primary">
                      <CheckCircle2 size={18} className="text-success shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`bg-surface-secondary rounded-2xl border border-border h-64 flex items-center justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="text-center">
                  <mod.icon className={`${mod.color} mx-auto mb-3`} size={48} />
                  <p className="text-sm text-text-muted font-medium">Interactive Preview</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-3 text-white/80">Join Dhakium today and start your family's financial journey.</p>
          <Link to="/register" className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 bg-white text-brand font-semibold rounded-xl hover:bg-brand-50 transition-colors">
            Create Free Account <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
