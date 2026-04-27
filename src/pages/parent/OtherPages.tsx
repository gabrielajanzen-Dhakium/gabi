import { mockBankAccounts } from '../../data/mock-users'
import { mockNotifications } from '../../data/mock-market-data'
import { PRICING_TIERS } from '../../lib/constants'
import { useAuth } from '../../context/AuthContext'
import { Building2, Plus, Bell, Check, CreditCard, Settings as SettingsIcon, RefreshCw, Download, ChevronRight } from 'lucide-react'
import { formatRelativeDate } from '../../lib/utils'
import { Link } from 'react-router-dom'

/* ======== Auto-Invest ======== */
export function AutoInvest() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary">Auto-Invest</h1>
      <div className="bg-white rounded-2xl border border-border p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center"><RefreshCw className="text-brand" size={22} /></div>
          <div><h2 className="text-lg font-semibold text-text-primary">Automatic Monthly Investment</h2><p className="text-sm text-text-secondary">Set it and forget it — we'll invest for you every month.</p></div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-border"><span className="text-sm text-text-secondary">Amount</span><span className="text-sm font-semibold text-text-primary">$1,600 / month</span></div>
          <div className="flex justify-between py-3 border-b border-border"><span className="text-sm text-text-secondary">Deduction Date</span><span className="text-sm font-semibold text-text-primary">1st of each month</span></div>
          <div className="flex justify-between py-3 border-b border-border"><span className="text-sm text-text-secondary">Bank Account</span><span className="text-sm font-semibold text-text-primary">Emirates NBD ****4532</span></div>
          <div className="flex justify-between py-3"><span className="text-sm text-text-secondary">Status</span><span className="px-2.5 py-1 bg-success-light text-success text-xs font-semibold rounded-full">Active</span></div>
        </div>
        <button className="w-full mt-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors">Edit Auto-Invest Settings</button>
      </div>
    </div>
  )
}

/* ======== Bank Accounts ======== */
export function BankAccounts() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Bank Accounts</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark"><Plus size={16} /> Link Account</button>
      </div>
      <div className="space-y-4 max-w-2xl">
        {mockBankAccounts.map(b => (
          <div key={b.id} className="bg-white rounded-xl border border-border p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center"><Building2 className="text-brand" size={22} /></div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary">{b.bankName}</p>
              <p className="text-xs text-text-muted">****{b.accountLastFour}</p>
            </div>
            {b.isPrimary && <span className="px-2.5 py-1 bg-brand-light text-brand text-xs font-semibold rounded-full">Primary</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ======== Subscription ======== */
export function Subscription() {
  const { user } = useAuth()
  const currentPlan = PRICING_TIERS.find(t => t.id === user?.subscriptionPlan) ?? PRICING_TIERS[1]
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary">Subscription</h1>
      <div className="bg-white rounded-2xl border border-border p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center"><CreditCard className="text-brand" size={22} /></div>
          <div><h2 className="text-lg font-semibold text-text-primary">{currentPlan.name} Plan</h2><p className="text-sm text-text-secondary">{currentPlan.description}</p></div>
        </div>
        <ul className="space-y-2 mb-6">
          {currentPlan.features.map(f => (
            <li key={f} className="flex items-center gap-2 text-sm text-text-secondary"><Check size={16} className="text-success" />{f}</li>
          ))}
        </ul>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark">Manage Billing</button>
          <button className="px-5 py-2.5 bg-surface-secondary text-text-primary text-sm font-semibold rounded-xl hover:bg-surface-tertiary">Change Plan</button>
        </div>
      </div>
    </div>
  )
}

/* ======== Notifications ======== */
export function Notifications() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
      <div className="space-y-3 max-w-2xl">
        {mockNotifications.map(n => (
          <div key={n.id} className={`bg-white rounded-xl border p-4 transition-colors ${n.read ? 'border-border' : 'border-brand/20 bg-brand-50'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${n.type === 'success' ? 'bg-success' : n.type === 'warning' ? 'bg-warning' : n.type === 'alert' ? 'bg-danger' : 'bg-brand'}`} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">{n.title}</p>
                <p className="text-sm text-text-secondary mt-0.5">{n.message}</p>
                <p className="text-xs text-text-muted mt-1">{formatRelativeDate(n.createdAt)}</p>
              </div>
              {n.actionUrl && <Link to={n.actionUrl} className="text-brand"><ChevronRight size={18} /></Link>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ======== Settings ======== */
export function SettingsPage() {
  const { user } = useAuth()
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
      <div className="bg-white rounded-2xl border border-border p-6 max-w-2xl space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Profile</h2>
          <div className="space-y-3">
            {[['Name', user?.name], ['Email', user?.email], ['Phone', user?.phone], ['Country', user?.country], ['KYC Status', user?.kycStatus]].map(([l, v]) => (
              <div key={l} className="flex justify-between py-2 border-b border-border last:border-0"><span className="text-sm text-text-secondary">{l}</span><span className="text-sm font-medium text-text-primary capitalize">{v}</span></div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Security</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border"><span className="text-sm text-text-secondary">Two-Factor Auth</span><span className="px-2.5 py-1 bg-success-light text-success text-xs font-semibold rounded-full">Enabled</span></div>
            <div className="flex justify-between items-center py-2"><span className="text-sm text-text-secondary">Language</span><span className="text-sm font-medium text-text-primary">English</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ======== Reports ======== */
export function Reports() {
  const reports = [
    { id: 'r1', title: 'Q1 2026 Performance Report', date: 'Apr 1, 2026', type: 'Quarterly' },
    { id: 'r2', title: 'March 2026 Monthly Report', date: 'Mar 31, 2026', type: 'Monthly' },
    { id: 'r3', title: 'February 2026 Monthly Report', date: 'Feb 28, 2026', type: 'Monthly' },
    { id: 'r4', title: 'January 2026 Monthly Report', date: 'Jan 31, 2026', type: 'Monthly' },
  ]
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary">Reports</h1>
      <div className="space-y-3 max-w-2xl">
        {reports.map(r => (
          <div key={r.id} className="bg-white rounded-xl border border-border p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center"><Download className="text-brand" size={18} /></div>
            <div className="flex-1"><p className="text-sm font-semibold text-text-primary">{r.title}</p><p className="text-xs text-text-muted">{r.date} • {r.type}</p></div>
            <button className="px-3 py-1.5 bg-surface-secondary text-text-primary text-xs font-semibold rounded-lg hover:bg-surface-tertiary">Download PDF</button>
          </div>
        ))}
      </div>
    </div>
  )
}
