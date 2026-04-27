import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { PUBLIC_NAV_ITEMS } from '../../lib/constants'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsMobileOpen(false) }, [location])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" id="nav-logo">
            <div className="w-9 h-9 bg-brand rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-text-primary">Dhakium</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {PUBLIC_NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? 'text-brand bg-brand-light'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              AR
            </button>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              id="nav-sign-in"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-brand rounded-lg hover:bg-brand-dark transition-colors shadow-sm"
              id="nav-get-started"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
            id="nav-mobile-toggle"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden border-t border-border pb-4 animate-fade-in">
            <div className="pt-3 space-y-1">
              {PUBLIC_NAV_ITEMS.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg ${
                    location.pathname === item.href
                      ? 'text-brand bg-brand-light'
                      : 'text-text-secondary hover:bg-surface-secondary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2 px-3">
              <Link to="/login" className="py-2.5 text-sm font-medium text-text-secondary text-center">
                Sign In
              </Link>
              <Link to="/register" className="py-2.5 text-sm font-semibold text-white bg-brand rounded-lg text-center">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
