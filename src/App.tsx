import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Layouts
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import ChildLayout from './components/layout/ChildLayout'

// Public Pages
import LandingPage from './pages/public/LandingPage'
import FeaturesPage from './pages/public/FeaturesPage'
import PortfoliosPage from './pages/public/PortfoliosPage'
import EducationOverviewPage from './pages/public/EducationOverviewPage'
import AboutPage from './pages/public/AboutPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'

// Parent Pages
import DashboardHome from './pages/parent/DashboardHome'
import ChildProfiles from './pages/parent/ChildProfiles'
import GoalWizard from './pages/parent/GoalWizard'
import PortfolioView from './pages/parent/PortfolioView'
import InvestmentCatalog from './pages/parent/InvestmentCatalog'
import { AutoInvest, BankAccounts, Subscription, Notifications, SettingsPage, Reports } from './pages/parent/OtherPages'

// Child Pages
import WelcomeScreen from './pages/child/WelcomeScreen'
import LearningHub from './pages/child/LearningHub'
import LessonView from './pages/child/LessonView'
import QuizInterface from './pages/child/QuizInterface'
import Achievements from './pages/child/Achievements'
import TradingSimulator from './pages/child/TradingSimulator'
import ChatbotPage from './pages/child/ChatbotPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/portfolios" element={<PortfoliosPage />} />
        <Route path="/education" element={<EducationOverviewPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Parent Dashboard */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/children" element={<ChildProfiles />} />
        <Route path="/dashboard/goals/new" element={<GoalWizard />} />
        <Route path="/dashboard/portfolio/:id" element={<PortfolioView />} />
        <Route path="/dashboard/invest" element={<InvestmentCatalog />} />
        <Route path="/dashboard/auto-invest" element={<AutoInvest />} />
        <Route path="/dashboard/bank-accounts" element={<BankAccounts />} />
        <Route path="/dashboard/subscription" element={<Subscription />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
        <Route path="/dashboard/reports" element={<Reports />} />
      </Route>

      {/* Child/Teen Dashboard */}
      <Route element={<ProtectedRoute><ChildLayout /></ProtectedRoute>}>
        <Route path="/learn" element={<WelcomeScreen />} />
        <Route path="/learn/hub" element={<LearningHub />} />
        <Route path="/learn/module/:moduleId" element={<LessonView />} />
        <Route path="/learn/quiz/:moduleId" element={<QuizInterface />} />
        <Route path="/learn/achievements" element={<Achievements />} />
        <Route path="/learn/simulator" element={<TradingSimulator />} />
        <Route path="/learn/chat" element={<ChatbotPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
