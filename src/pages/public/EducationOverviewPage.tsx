import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Award, Clock, Users } from 'lucide-react'
import { EDUCATION_MODULES } from '../../lib/constants'

const tracks = [
  { name: 'Seedling', ages: '8–13', modules: 3, style: 'Animated stories, simple games', color: 'bg-success', bg: 'bg-success-light' },
  { name: 'Explorer', ages: '14–16', modules: 5, style: 'Interactive quizzes, video lessons', color: 'bg-brand', bg: 'bg-brand-light' },
  { name: 'Investor', ages: '16–18', modules: 8, style: 'Case studies, portfolio projects, AI chatbot', color: 'bg-warning', bg: 'bg-warning-light' },
]

export default function EducationOverviewPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand to-brand-700 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight animate-fade-in-up">
            Capital Markets Education
          </h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            A 16-week, CFA-aligned curriculum designed to make teenagers financially literate and investment-ready.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {[
              { icon: BookOpen, label: '8 Modules', value: '24 Lessons' },
              { icon: Clock, label: '16 Weeks', value: 'Self-Paced' },
              { icon: Award, label: 'CFA Level I', value: 'Aligned' },
              { icon: Users, label: 'Ages 14–18', value: 'Target Audience' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <s.icon className="text-white/80 mx-auto mb-2" size={28} />
                <p className="text-sm font-bold text-white">{s.label}</p>
                <p className="text-xs text-white/60">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Tracks */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary text-center mb-12">Three Learning Tracks</h2>
          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {tracks.map(t => (
              <div key={t.name} className="bg-white rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow text-center">
                <div className={`w-16 h-16 ${t.bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                  <span className={`w-4 h-4 rounded-full ${t.color}`} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-1">{t.name}</h3>
                <p className="text-sm text-text-muted mb-4">Ages {t.ages}</p>
                <p className="text-sm text-text-secondary mb-3">{t.modules} modules • {t.style}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Curriculum */}
      <section className="bg-surface-secondary py-20 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary text-center mb-12">Full Curriculum (Investor Track)</h2>
          <div className="space-y-4 stagger-children">
            {EDUCATION_MODULES.map(m => (
              <div key={m.id} className="bg-white rounded-xl border border-border p-5 flex items-center gap-5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                  {m.id}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-text-primary">{m.title}</h3>
                  <p className="text-xs text-text-muted mt-0.5">Weeks {m.weeks} • CFA: {m.cfaEquivalent}</p>
                </div>
                <span className="hidden sm:inline-flex px-2.5 py-1 bg-brand-light text-brand text-xs font-semibold rounded-full shrink-0">
                  {m.cfaWeight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-text-primary">Start Learning Free</h2>
          <p className="mt-3 text-text-secondary">Begin your financial education journey today. No credit card required.</p>
          <Link to="/register" className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors shadow-lg shadow-brand/25">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
