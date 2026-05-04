import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, Users, Target, PieChart, TrendingUp, RefreshCw,
  Building2, CreditCard, Settings, Bell, LogOut, ChevronLeft, ChevronRight, Search, BarChart2,
} from 'lucide-react'
import { getInitials } from '../../lib/utils'
import { mockNotifications } from '../../data/mock-market-data'

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Users, Target, PieChart, TrendingUp, RefreshCw,
  Building2, CreditCard, Settings, BarChart2,
}

const NAV = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Children', href: '/dashboard/children', icon: 'Users' },
  { label: 'New Goal', href: '/dashboard/goals/new', icon: 'Target' },
  { label: 'Portfolio', href: '/dashboard/portfolio/port-001', icon: 'PieChart' },
  { label: 'Invest', href: '/dashboard/invest', icon: 'TrendingUp' },
  { label: 'Auto-Invest', href: '/dashboard/auto-invest', icon: 'RefreshCw' },
  { label: 'Bank Accounts', href: '/dashboard/bank-accounts', icon: 'Building2' },
  { label: 'Subscription', href: '/dashboard/subscription', icon: 'CreditCard' },
  { label: 'Research', href: '/dashboard/research', icon: 'BarChart2' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
]

export default function DashboardLayout() {
  const { user, logout, children: childProfiles, switchToChild } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const unreadCount = mockNotifications.filter(n => !n.read).length

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="min-h-screen bg-surface-secondary flex">
      {/* Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-white border-r border-border transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[260px]'}`}>
        {/* Sidebar Header */}
        <div className={`h-16 flex items-center border-b border-border px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <Link to="/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-lg font-bold text-text-primary">Dhakium</span>
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-surface-secondary text-text-muted transition-colors">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {NAV.map(item => {
            const Icon = iconMap[item.icon]
            const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-brand-light text-brand' : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                {Icon && <Icon size={20} />}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Child Switch */}
        {!collapsed && (
          <div className="px-3 pb-3 border-t border-border pt-3">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-3">Switch to Child View</p>
            {childProfiles.map(child => (
              <button
                key={child.id}
                onClick={() => { switchToChild(child.id); navigate('/learn') }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-secondary transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-brand-light text-brand text-xs font-semibold flex items-center justify-center">
                  {getInitials(child.name)}
                </div>
                <span>{child.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* User / Logout */}
        <div className={`border-t border-border p-3 ${collapsed ? 'flex justify-center' : ''}`}>
          {collapsed ? (
            <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-surface-secondary text-text-muted" title="Logout">
              <LogOut size={20} />
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-brand text-white text-xs font-semibold flex items-center justify-center">
                  {user ? getInitials(user.name) : 'U'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{user?.name}</p>
                  <p className="text-xs text-text-muted truncate">{user?.email}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="p-1.5 rounded-lg hover:bg-surface-secondary text-text-muted" title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile logo */}
            <Link to="/dashboard" className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
            </Link>
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 bg-surface-secondary rounded-lg px-3 py-2 flex-1 max-w-md">
              <Search size={16} className="text-text-muted" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-text-primary outline-none w-full placeholder-text-muted"
                id="dashboard-search"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard/notifications"
              className="relative p-2 rounded-lg hover:bg-surface-secondary text-text-secondary transition-colors"
              id="dashboard-notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
            <Link
              to="/dashboard/settings"
              className="p-2 rounded-lg hover:bg-surface-secondary text-text-secondary transition-colors lg:hidden"
            >
              <Settings size={20} />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
