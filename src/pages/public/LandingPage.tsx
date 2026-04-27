import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, PiggyBank, Bot, BarChart3, Shield, TrendingUp } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const performanceData = Array.from({ length: 24 }, (_, i) => ({
  month: `M${i + 1}`,
  conservative: 10000 * Math.pow(1 + 0.035 / 12, i),
  balanced: 10000 * Math.pow(1 + 0.06 / 12, i),
  aggressive: 10000 * Math.pow(1 + 0.085 / 12, i),
}))

const stats = [
  { value: '600K+', label: 'Target GCC Users', delay: 0 },
  { value: '33%', label: 'Global Financial Literacy', delay: 100 },
  { value: '8', label: 'CFA-Aligned Modules', delay: 200 },
  { value: '<1%', label: 'Management Fees', delay: 300 },
]

const pillars = [
  { icon: GraduationCap, title: 'Financial Education', desc: 'CFA-aligned curriculum with gamified learning for teens aged 14–18. 8 modules covering ethics, economics, stocks, bonds, and portfolio management.', color: 'text-brand', bg: 'bg-brand-light' },
  { icon: PiggyBank, title: 'Smart Savings', desc: 'Custodial savings accounts with multi-contributor support. Family and friends can contribute to a child\'s financial goals.', color: 'text-success', bg: 'bg-success-light' },
  { icon: Bot, title: 'AI Robo-Advisory', desc: 'Monte Carlo-powered goal planning with personalized investment recommendations based on risk tolerance and time horizon.', color: 'text-[#8B5CF6]', bg: 'bg-[#F5F3FF]' },
]

const features = [
  { icon: BarChart3, title: 'Managed Portfolios', desc: 'Classic, SRI, Islamic, and Private Equity options', color: 'text-brand' },
  { icon: TrendingUp, title: 'Trading Simulator', desc: 'Practice investing with $10K virtual cash using real market data', color: 'text-success' },
  { icon: Shield, title: 'Secure & Compliant', desc: 'ADGM, SAMA, QFCRA regulatory sandbox compliant', color: 'text-warning' },
]

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-indigo-50" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-light text-brand text-xs font-semibold rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                Now accepting early access applications
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight tracking-tight">
                Smart{' '}
                <span className="bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent">
                  Financial Planning
                </span>
                <br />
                for Children & Families
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-xl">
                Empower your family's financial future with AI-powered education,
                robo-advisory investing, and managed portfolios — all designed for the next generation.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30"
                  id="hero-get-started"
                >
                  Get Started Free
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-text-primary font-semibold rounded-xl border border-border hover:border-brand/30 hover:bg-brand-50 transition-all"
                  id="hero-learn-more"
                >
                  Explore Features
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {['S', 'A', 'M', 'R'].map((l, i) => (
                    <div key={i} className={`w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${['bg-brand', 'bg-success', 'bg-warning', 'bg-[#8B5CF6]'][i]}`}>
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Trusted by 1,200+ families</p>
                  <p className="text-xs text-text-muted">in the UAE, Saudi Arabia & Qatar</p>
                </div>
              </div>
            </div>

            {/* Right — Dashboard Preview */}
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl border border-border/50 p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-text-muted">Total Portfolio Value</p>
                      <p className="text-2xl font-bold text-text-primary tabular-nums">$47,250</p>
                    </div>
                    <span className="px-2.5 py-1 bg-success-light text-success text-xs font-semibold rounded-full">+12.4%</span>
                  </div>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData.slice(0, 12)}>
                        <defs>
                          <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0047AB" stopOpacity={0.15} />
                            <stop offset="100%" stopColor="#0047AB" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="balanced" stroke="#0047AB" strokeWidth={2} fill="url(#heroGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-4 mt-3">
                    {[
                      { label: 'Equities', pct: 55, color: 'bg-brand' },
                      { label: 'Bonds', pct: 35, color: 'bg-success' },
                      { label: 'Others', pct: 10, color: 'bg-warning' },
                    ].map(a => (
                      <div key={a.label} className="flex items-center gap-1.5 text-xs text-text-secondary">
                        <div className={`w-2 h-2 rounded-full ${a.color}`} />
                        {a.label} {a.pct}%
                      </div>
                    ))}
                  </div>
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-border p-3 animate-float">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎓</span>
                    <div>
                      <p className="text-xs font-semibold text-text-primary">Module 3 Completed!</p>
                      <p className="text-[10px] text-text-muted">+150 XP earned</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-extrabold text-brand tabular-nums">{s.value}</p>
                <p className="text-sm text-text-secondary mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">Three Pillars of Financial Success</h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Dhakium combines education, savings, and intelligent investing in a single family-oriented platform.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {pillars.map(p => (
              <div key={p.title} className="bg-white rounded-2xl border border-border p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-12 h-12 ${p.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <p.icon className={p.color} size={24} />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{p.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Chart */}
      <section className="bg-surface-secondary py-20 lg:py-28 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">Grow Wealth with Intelligent Planning</h2>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                See how different risk profiles project over 24 months. Our Monte Carlo simulation
                runs 10,000 iterations to give you confidence in your investment plan.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { label: 'Conservative', ret: '3.5%', color: 'bg-success' },
                  { label: 'Balanced', ret: '6.0%', color: 'bg-brand' },
                  { label: 'Aggressive', ret: '8.5%', color: 'bg-warning' },
                ].map(r => (
                  <div key={r.label} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${r.color}`} />
                    <span className="text-sm font-medium text-text-primary w-28">{r.label}</span>
                    <span className="text-sm text-text-secondary">Expected return: {r.ret} p.a.</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="gradCons" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.1} />
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradBal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0047AB" stopOpacity={0.1} />
                        <stop offset="100%" stopColor="#0047AB" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradAgg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.1} />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => [`$${v.toFixed(0)}`, '']} contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
                    <Area type="monotone" dataKey="conservative" stroke="#10B981" strokeWidth={2} fill="url(#gradCons)" />
                    <Area type="monotone" dataKey="balanced" stroke="#0047AB" strokeWidth={2} fill="url(#gradBal)" />
                    <Area type="monotone" dataKey="aggressive" stroke="#F59E0B" strokeWidth={2} fill="url(#gradAgg)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">Everything Your Family Needs</h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              From education to live investing, Dhakium covers the complete journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {features.map(f => (
              <div key={f.title} className="flex items-start gap-4 bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className="shrink-0 mt-0.5">
                  <f.icon className={f.color} size={22} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text-primary mb-1">{f.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand to-brand-700 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Start Building Your Child's Financial Future Today</h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Join thousands of families across the GCC who are investing in the next generation's financial literacy and wealth.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-8 py-4 bg-white text-brand font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-lg" id="cta-get-started">
              Get Started Free
            </Link>
            <Link to="/portfolios" className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
