/* ===== Risk Profile Parameters (Section 7.3) ===== */
export const RISK_PARAMS = {
  Conservative: { mu: 0.035, sigma: 0.05, label: 'Conservative', color: '#10B981', maxDrawdown: '5–10%' },
  Balanced: { mu: 0.06, sigma: 0.1, label: 'Balanced', color: '#3B82F6', maxDrawdown: '10–20%' },
  Aggressive: { mu: 0.085, sigma: 0.15, label: 'Aggressive', color: '#F59E0B', maxDrawdown: '20–40%' },
} as const

/* ===== Asset Allocation by Risk Profile (Section 7.4) ===== */
export const ASSET_ALLOCATIONS = {
  Conservative: {
    'US Equity ETFs': 22, 'Regional Equities': 8, 'Government Bonds': 28,
    'Corporate Bonds': 22, 'Mutual Funds': 10, 'Alternatives': 5, 'Cash': 5,
  },
  Balanced: {
    'US Equity ETFs': 38, 'Regional Equities': 12, 'Government Bonds': 18,
    'Corporate Bonds': 17, 'Mutual Funds': 7, 'Alternatives': 5, 'Cash': 3,
  },
  Aggressive: {
    'US Equity ETFs': 52, 'Regional Equities': 18, 'Government Bonds': 7,
    'Corporate Bonds': 8, 'Mutual Funds': 5, 'Alternatives': 7, 'Cash': 3,
  },
} as const

/* ===== Portfolio Types (Section 7.7) ===== */
export const PORTFOLIO_TYPES = [
  { id: 'classic', name: 'Classic Portfolio', description: 'Diversified across 100+ companies, geographies, and industries', targetReturn: '7.65%', risk: 'Balanced' },
  { id: 'sri', name: 'Socially Responsible (SRI)', description: 'ESG-focused, green bonds, ethical ETFs', targetReturn: '6.5–7%', risk: 'Balanced' },
  { id: 'islamic', name: 'Islamic / Sharia-Compliant', description: 'Sharia-compliant assets, World Equity Index, Sukuk', targetReturn: '6–7%', risk: 'Balanced' },
  { id: 'private-credit', name: 'Private Credit', description: 'Partner-managed high-yield instruments', targetReturn: '7–9%', risk: 'Moderate' },
  { id: 'private-equity', name: 'Private Equity', description: 'Fractional PE, targeting returns exceeding 4.75%', targetReturn: '8–12%', risk: 'High' },
  { id: 'self-directed', name: 'Self-Directed', description: 'DIY ETF/stock trading with risk management tools', targetReturn: 'Variable', risk: 'Variable' },
] as const

/* ===== Goal Types (Section 7.2) ===== */
export const GOAL_TYPES = [
  { id: 'education', label: 'Education', icon: '🎓', color: '#3B82F6' },
  { id: 'apartment', label: 'Apartment', icon: '🏠', color: '#10B981' },
  { id: 'living_costs', label: 'Living Costs', icon: '💰', color: '#F59E0B' },
  { id: 'first_car', label: 'First Car', icon: '🚗', color: '#8B5CF6' },
  { id: 'wedding', label: 'Wedding', icon: '💍', color: '#EC4899' },
  { id: 'other', label: 'Other', icon: '🎯', color: '#6B7280' },
] as const

/* ===== Education Modules (Section 5.3) ===== */
export const EDUCATION_MODULES = [
  { id: 1, title: 'Money, Ethics & Financial Responsibility', weeks: '1–2', cfaWeight: '10%', cfaEquivalent: 'Ethical and Professional Standards' },
  { id: 2, title: 'Understanding Numbers & Financial Math', weeks: '3–4', cfaWeight: '12%', cfaEquivalent: 'Quantitative Methods' },
  { id: 3, title: 'How the Economy Works', weeks: '5–6', cfaWeight: '12%', cfaEquivalent: 'Economics' },
  { id: 4, title: 'Reading Company Financial Statements', weeks: '7–8', cfaWeight: '15%', cfaEquivalent: 'Financial Statement Analysis' },
  { id: 5, title: 'Stock Market Investing', weeks: '9–10', cfaWeight: '15%', cfaEquivalent: 'Equity Investments' },
  { id: 6, title: 'Bonds & Fixed Income', weeks: '11–12', cfaWeight: '12%', cfaEquivalent: 'Fixed Income' },
  { id: 7, title: 'Building Your Investment Portfolio', weeks: '13–14', cfaWeight: '15%', cfaEquivalent: 'Portfolio Management' },
  { id: 8, title: 'Advanced Investments & Risk Management', weeks: '15–16', cfaWeight: '9%', cfaEquivalent: 'Derivatives & Alternative Investments' },
] as const

/* ===== Navigation Items ===== */
export const PUBLIC_NAV_ITEMS = [
  { label: 'Features', href: '/features' },
  { label: 'Portfolios', href: '/portfolios' },
  { label: 'Financial Education', href: '/education' },
  { label: 'About', href: '/about' },
] as const

export const PARENT_NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Children', href: '/dashboard/children', icon: 'Users' },
  { label: 'Goals', href: '/dashboard/goals/new', icon: 'Target' },
  { label: 'Portfolio', href: '/dashboard/portfolio/1', icon: 'PieChart' },
  { label: 'Invest', href: '/dashboard/invest', icon: 'TrendingUp' },
  { label: 'Auto-Invest', href: '/dashboard/auto-invest', icon: 'RefreshCw' },
  { label: 'Bank Accounts', href: '/dashboard/bank-accounts', icon: 'Building2' },
  { label: 'Subscription', href: '/dashboard/subscription', icon: 'CreditCard' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
] as const

export const CHILD_NAV_ITEMS = [
  { label: 'Home', href: '/learn', icon: 'Home' },
  { label: 'Learning Hub', href: '/learn/hub', icon: 'BookOpen' },
  { label: 'Achievements', href: '/learn/achievements', icon: 'Award' },
  { label: 'Simulator', href: '/learn/simulator', icon: 'LineChart' },
  { label: 'Chat with Dhaki', href: '/learn/chat', icon: 'MessageCircle' },
] as const

/* ===== Pricing Tiers (Section 2.4) ===== */
export const PRICING_TIERS = [
  {
    id: 'freemium',
    name: 'Free',
    price: 0,
    period: '',
    description: 'Get started with financial education',
    features: ['Full education curriculum', 'AI chatbot (limited)', 'Investment simulator', 'Basic goal planning', '1 child profile'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    period: '/month',
    description: 'Unlock the full Dhakium experience',
    features: ['Everything in Free', 'Unlimited AI chatbot', 'Robo-advisory tools', 'Advanced simulations', 'Up to 5 child profiles', 'Monthly reports', 'Priority support'],
    cta: 'Start Premium',
    highlighted: true,
  },
  {
    id: 'managed',
    name: 'Managed',
    price: null,
    period: '0.5% AUM',
    description: 'Professional portfolio management',
    features: ['Everything in Premium', 'Managed portfolios', 'Quarterly rebalancing', 'Tax-optimized investing', 'Dedicated advisor', 'Custom reports', 'Private equity access'],
    cta: 'Contact Sales',
    highlighted: false,
  },
] as const
