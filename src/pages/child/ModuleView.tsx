import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, CheckCircle, Lock, Play,
  Star, Zap, Clock, BookOpen, Award, GraduationCap, Trophy
} from 'lucide-react'
import { educationModules } from '../../data/education-content'
import { useEducationStore } from '../../store/educationStore'

export default function ModuleView() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const mid = parseInt(moduleId ?? '1')
  const module = educationModules.find(m => m.id === mid)

  const { lessonProgress, moduleProgress } = useEducationStore()

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <GraduationCap size={48} className="text-text-muted" />
        <p className="text-text-muted">Module not found.</p>
        <Link to="/learn" className="text-brand hover:underline">Back to Learning Hub</Link>
      </div>
    )
  }

  const completedLessons = module.lessons.filter(l => !!lessonProgress[l.id]?.completedAt).length
  const totalLessons = module.lessons.length
  const progressPct = Math.round((completedLessons / totalLessons) * 100)
  const modProgress = moduleProgress[mid]
  const isModuleComplete = !!modProgress?.completedAt

  const totalXP = module.lessons.reduce((sum, l) => sum + l.xpReward, 0)
  const earnedXP = module.lessons.reduce((sum, l) => sum + (lessonProgress[l.id]?.xpEarned ?? 0), 0)

  const prevModule = educationModules.find(m => m.id === mid - 1)
  const nextModule = educationModules.find(m => m.id === mid + 1)

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-16">
      {/* Breadcrumb */}
      <Link to="/learn" className="flex items-center gap-1.5 text-sm text-text-muted hover:text-brand transition-colors">
        <ArrowLeft size={16} /> Back to Learning Hub
      </Link>

      {/* Module Hero */}
      <div className={`rounded-3xl bg-gradient-to-br ${module.color} p-8 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-8 -translate-x-8" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-5xl mb-3">{module.icon}</div>
              <h1 className="text-2xl font-bold">{module.title}</h1>
              <p className="text-white/80 mt-1">{module.subtitle}</p>
            </div>
            {isModuleComplete && (
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center">
                <Trophy size={24} className="mx-auto mb-1" />
                <p className="text-xs font-bold">Complete!</p>
              </div>
            )}
          </div>

          <p className="text-white/70 text-sm mt-3 leading-relaxed">{module.description}</p>

          {/* Progress */}
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">{completedLessons}/{totalLessons} lessons complete</span>
              <span className="font-bold">{progressPct}%</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-sm text-white/80">
              <Zap size={14} /> {earnedXP}/{totalXP} XP
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/80">
              <Clock size={14} /> {module.lessons.reduce((s, l) => s + l.durationMinutes, 0)} min total
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/80">
              <BookOpen size={14} /> {module.lessons.filter(l => l.hasQuiz).length} quizzes
            </div>
          </div>
        </div>
      </div>

      {/* CFA Reference */}
      <div className="bg-white rounded-2xl border border-border p-4 flex items-center gap-3">
        <GraduationCap size={20} className="text-brand shrink-0" />
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">CFA Curriculum</p>
          <p className="text-sm text-text-secondary">{module.cfaLevel}</p>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-text-primary">Lessons</h2>
        {module.lessons.map((lesson, i) => {
          const lp = lessonProgress[lesson.id]
          const isComplete = !!lp?.completedAt
          const isLocked = i > 0 && !lessonProgress[module.lessons[i - 1].id]?.completedAt
          const stars = lp?.stars ?? 0

          return (
            <div
              key={lesson.id}
              className={`bg-white rounded-2xl border transition-all ${
                isComplete ? 'border-success/30 bg-success/2' :
                isLocked ? 'border-border opacity-60' :
                'border-border hover:border-brand/40 hover:shadow-sm'
              }`}
            >
              <div className="p-5 flex items-start gap-4">
                {/* Status Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isComplete ? 'bg-success/10 text-success' :
                  isLocked ? 'bg-surface-secondary text-text-muted' :
                  'bg-brand/10 text-brand'
                }`}>
                  {isComplete ? <CheckCircle size={20} /> :
                   isLocked ? <Lock size={18} /> :
                   <Play size={18} />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-text-primary">{lesson.title}</h3>
                      <p className="text-sm text-text-muted mt-0.5">{lesson.subtitle}</p>
                    </div>
                    {/* Stars */}
                    {isComplete && (
                      <div className="flex gap-0.5 shrink-0">
                        {[1,2,3].map(s => (
                          <Star key={s} size={14} className={s <= stars ? 'text-warning fill-warning' : 'text-border'} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><Clock size={11} /> {lesson.durationMinutes} min</span>
                    <span className="flex items-center gap-1"><Zap size={11} className="text-warning" /> {lesson.xpReward} XP</span>
                    {lesson.hasQuiz && <span className="flex items-center gap-1 text-brand"><BookOpen size={11} /> Quiz</span>}
                    {lp?.quizScore !== null && lp?.quizScore !== undefined && (
                      <span className="flex items-center gap-1 text-success">
                        <Award size={11} /> {lp.quizScore}%
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  {!isLocked && (
                    <div className="flex gap-2 mt-3">
                      <Link
                        to={`/learn/lesson/${mid}/${lesson.id}`}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          isComplete
                            ? 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary'
                            : 'bg-brand text-white hover:bg-brand-dark'
                        }`}
                      >
                        {isComplete ? 'Review' : 'Start Lesson'}
                        <ArrowRight size={12} />
                      </Link>
                      {lesson.hasQuiz && (
                        <Link
                          to={`/learn/quiz/${mid}/${lesson.id}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-warning/10 text-warning hover:bg-warning/20 transition-colors"
                        >
                          <Award size={12} />
                          {lp?.quizScore !== null && lp?.quizScore !== undefined ? 'Retake Quiz' : 'Take Quiz'}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Module Completion Banner */}
      {isModuleComplete && (
        <div className={`rounded-2xl bg-gradient-to-r ${module.color} p-6 text-white text-center`}>
          <Trophy size={32} className="mx-auto mb-2" />
          <h3 className="text-xl font-bold">Module Complete! 🎉</h3>
          <p className="text-white/80 text-sm mt-1">
            You earned {modProgress.totalXP} XP with an average score of {modProgress.averageScore}%
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        {prevModule ? (
          <Link to={`/learn/module/${prevModule.id}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-brand transition-colors">
            <ArrowLeft size={16} /> {prevModule.title}
          </Link>
        ) : <div />}
        {nextModule ? (
          <Link to={`/learn/module/${nextModule.id}`} className="flex items-center gap-2 text-sm text-brand font-medium hover:underline">
            {nextModule.title} <ArrowRight size={16} />
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
