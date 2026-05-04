import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { TrendingUp, DollarSign, Target, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import MarketStatusBanner from '../../components/common/MarketStatusBanner'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { mockGoals } from '../../data/mock-goals'
import { mockPortfolios, mockTransactions } from '../../data/mock-portfolios'
import { mockNotifications } from '../../data/mock-market-data'
import { formatCurrency, formatPercent, formatDate, formatRelativeDate, calculateAge, getInitials } from '../../lib/utils'

const kpis = [
  { label: 'Total Portfolio Value', value: '$78,550', icon: DollarSign, change: '+12.4%', positive: true, color: 'text-brand', bg: 'bg-brand-light' },
  { label: 'Monthly Contributions', value: '$1,600', icon: TrendingUp, change: '+$200', positive: true, color: 'text-success', bg: 'bg-success-light' },
  { label: 'Active Goals', value: '3', icon: Target, change: '2 children', positive: true, color: 'text-[#8B5CF6]', bg: 'bg-[#F5F3FF]' },
  { label: 'Avg. Portfolio Return', value: '+12.1%', icon: PieChart, change: 'YTD', positive: true, color: 'text-warning', bg: 'bg-warning-light' },
]

export default function DashboardHome() {
  const { user, children: childProfiles } = useAuth()
  const portfolio = mockPortfolios[0]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Live Market Status Banner — Polygon.io */}
      <MarketStatusBanner />

      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Welcome back, {user?.name.split(' ')[0]}! 👋</h1>
        <p className="text-sm text-text-secondary mt-1">Here's an overview of your family's financial portfolio.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {kpis.map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${k.bg} rounded-xl flex items-center justify-center`}>
                <k.icon className={k.color} size={20} />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${k.positive ? 'text-success' : 'text-danger'}`}>
                {k.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {k.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-text-primary tabular-nums">{k.value}</p>
            <p className="text-xs text-text-muted mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Charts & Children */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Portfolio Performance</h2>
            <div className="flex gap-1">
              {['1M', '3M', '6M', '1Y'].map((t, i) => (
                <button key={t} className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${i === 3 ? 'bg-brand text-white' : 'text-text-muted hover:bg-surface-secondary'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolio.performanceHistory}>
                <defs>
                  <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0047AB" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#0047AB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={d => new Date(d).toLocaleDateString('en-US', { month: 'short' })} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: any) => [formatCurrency(v), 'Value'] as any} labelFormatter={l => formatDate(l as string)} contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke="#0047AB" strokeWidth={2} fill="url(#dashGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Children Summary */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Your Children</h2>
          <div className="space-y-4">
            {childProfiles.map(child => {
              const childGoals = mockGoals.filter(g => g.childId === child.id)
              const totalValue = childGoals.reduce((s, g) => s + g.currentValue, 0)
              const totalTarget = childGoals.reduce((s, g) => s + g.targetAmount, 0)
              const pct = totalTarget > 0 ? (totalValue / totalTarget) * 100 : 0
              return (
                <div key={child.id} className="p-4 bg-surface-secondary rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center">
                      {getInitials(child.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{child.name}</p>
                      <p className="text-xs text-text-muted">Age {calculateAge(child.dateOfBirth)} • {childGoals.length} goals</p>
                    </div>
                  </div>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-text-secondary">{formatCurrency(totalValue)}</span>
                    <span className="text-text-muted">{formatCurrency(totalTarget)}</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-brand rounded-full transition-all duration-500" style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                  <p className="text-xs text-text-muted mt-1">{pct.toFixed(0)}% of total goals</p>
                </div>
              )
            })}
            <Link to="/dashboard/children" className="block text-sm text-brand font-medium hover:underline text-center pt-2">
              Manage Children →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Transactions & Notifications */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Transactions */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {mockTransactions.slice(0, 7).reverse().map(tx => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                    tx.type === 'deposit' ? 'bg-success-light text-success' :
                    tx.type === 'buy' ? 'bg-brand-light text-brand' :
                    tx.type === 'dividend' ? 'bg-warning-light text-warning' :
                    'bg-surface-tertiary text-text-muted'
                  }`}>
                    {tx.type === 'deposit' ? '+' : tx.type === 'buy' ? 'B' : '$'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary capitalize">{tx.type}{tx.ticker ? ` — ${tx.ticker}` : ''}</p>
                    <p className="text-xs text-text-muted">{tx.contributorName || formatDate(tx.createdAt)}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold tabular-nums ${tx.type === 'sell' ? 'text-danger' : 'text-success'}`}>
                  {tx.type === 'sell' ? '-' : '+'}${tx.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Notifications</h2>
            <Link to="/dashboard/notifications" className="text-sm text-brand font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {mockNotifications.map(n => (
              <div key={n.id} className={`p-3 rounded-xl border transition-colors ${n.read ? 'border-border bg-white' : 'border-brand/20 bg-brand-50'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    n.type === 'success' ? 'bg-success' : n.type === 'warning' ? 'bg-warning' : n.type === 'alert' ? 'bg-danger' : 'bg-brand'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{n.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{n.message}</p>
                    <p className="text-xs text-text-muted mt-1">{formatRelativeDate(n.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
