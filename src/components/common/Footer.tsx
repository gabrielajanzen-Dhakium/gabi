import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-surface-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-text-primary">Dhakium</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Smart financial planning for children and families. Building wealth through education and investment.
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map(social => (
                <a key={social} href="#" className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-text-muted hover:text-brand hover:border-brand transition-colors" aria-label={social}>
                  <span className="text-xs font-semibold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Products</h3>
            <ul className="space-y-2.5">
              {['Education Module', 'Robo-Advisory', 'Managed Investment', 'Self-Directed Trading'].map(item => (
                <li key={item}>
                  <Link to="/features" className="text-sm text-text-secondary hover:text-brand transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '#' },
                { label: 'Press', href: '#' },
                { label: 'Partners', href: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-text-secondary hover:text-brand transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {['Privacy Policy', 'Terms of Service', 'Risk Disclosure', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-text-secondary hover:text-brand transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-text-secondary">
            © 2026 Dhakium Technologies Limited. All rights reserved.
          </p>
          <p className="text-xs text-text-muted mt-2">
            Investment involves risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  )
}
