import { useParams, Link } from 'react-router-dom'
import { mockModules } from '../../data/mock-education'
import { ArrowLeft, ArrowRight, Play, BookmarkPlus, CheckCircle2, MessageCircle } from 'lucide-react'

export default function LessonView() {
  const { moduleId } = useParams()
  const mod = mockModules.find(m => m.id === Number(moduleId)) ?? mockModules[0]
  const lesson = mod.lessons[0]

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <Link to="/learn/hub" className="hover:text-brand">Learning Hub</Link>
        <span>/</span>
        <span className="text-text-secondary">Module {mod.id}: {mod.title}</span>
      </div>

      {/* Module Header */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center font-bold">{mod.id}</div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">{mod.title}</h1>
            <p className="text-sm text-text-muted">Weeks {mod.weeks} • CFA: {mod.cfaEquivalent} ({mod.cfaWeight})</p>
          </div>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">{mod.description}</p>
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        {mod.lessons.map((l, i) => (
          <div key={l.id} className={`bg-white rounded-xl border border-border p-5 ${i === 0 ? 'ring-2 ring-brand/20' : ''}`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${i === 0 ? 'bg-brand text-white' : i === 1 ? 'bg-surface-tertiary text-text-muted' : 'bg-surface-tertiary text-text-muted'}`}>
                {i < 1 ? <Play size={18} /> : i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-text-primary">{l.title}</h3>
                  {l.hasVideo && <span className="px-1.5 py-0.5 bg-brand-light text-brand text-[10px] font-semibold rounded">VIDEO</span>}
                  {l.hasQuiz && <span className="px-1.5 py-0.5 bg-warning-light text-warning text-[10px] font-semibold rounded">QUIZ</span>}
                </div>
                <p className="text-sm text-text-secondary mt-1">{l.description}</p>
                <p className="text-xs text-text-muted mt-2">{l.durationMinutes} min</p>

                {/* Content Preview */}
                <div className="mt-4 p-4 bg-surface-secondary rounded-xl">
                  <p className="text-sm text-text-secondary leading-relaxed">{l.contentPreview}</p>
                </div>

                {i === 0 && (
                  <div className="mt-4 flex gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors">
                      <CheckCircle2 size={16} /> Mark Complete
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-surface-secondary text-text-secondary text-sm font-medium rounded-lg hover:bg-surface-tertiary transition-colors">
                      <BookmarkPlus size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        {mod.id > 1 ? (
          <Link to={`/learn/module/${mod.id - 1}`} className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-brand">
            <ArrowLeft size={16} /> Previous Module
          </Link>
        ) : <div />}
        {mod.lessons.some(l => l.hasQuiz) && (
          <Link to={`/learn/quiz/${mod.id}`} className="px-5 py-2.5 bg-warning text-white text-sm font-semibold rounded-xl hover:bg-warning/90 transition-colors">
            Take Quiz →
          </Link>
        )}
        {mod.id < 8 && (
          <Link to={`/learn/module/${mod.id + 1}`} className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-brand">
            Next Module <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {/* Floating Dhaki Button */}
      <Link to="/learn/chat" className="fixed bottom-20 right-6 lg:bottom-8 lg:right-8 w-14 h-14 bg-brand text-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-dark transition-colors z-40" title="Ask Dhaki">
        <MessageCircle size={24} />
      </Link>
    </div>
  )
}
