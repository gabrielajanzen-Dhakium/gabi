import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, CheckCircle, XCircle, Star,
  Trophy, RotateCcw, BookOpen, Zap, GraduationCap, Award
} from 'lucide-react'
import { educationModules } from '../../data/education-content'
import { useEducationStore } from '../../store/educationStore'
import ConfettiCelebration from '../../components/common/ConfettiCelebration'
import BadgeAwardModal from '../../components/common/BadgeAwardModal'

type Phase = 'intro' | 'question' | 'results'

export default function QuizInterface() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>()

  const mid = parseInt(moduleId ?? '1')
  const lid = parseInt(lessonId ?? '1')

  const module = educationModules.find(m => m.id === mid)
  const lesson = module?.lessons.find(l => l.id === lid)
  const questions = module?.quizzes.filter(q => q.moduleId === mid) ?? []

  const { submitQuiz, lessonProgress, newBadges, dismissNewBadges } = useEducationStore()
  const existingProgress = lessonProgress[lid]

  const [phase, setPhase] = useState<Phase>('intro')
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [answers, setAnswers] = useState<{ selected: number; correct: boolean }[]>([])
  const [localConfetti, setLocalConfetti] = useState(0)
  const [showBadgeModal, setShowBadgeModal] = useState(false)

  useEffect(() => {
    if (newBadges.length > 0) setShowBadgeModal(true)
  }, [newBadges])

  if (!module || !lesson || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <GraduationCap size={48} className="text-text-muted" />
        <p className="text-text-muted">Quiz not found for this lesson.</p>
        <Link to={`/learn/lesson/${mid}/${lid}`} className="text-brand hover:underline">Back to Lesson</Link>
      </div>
    )
  }

  const q = questions[current]
  const correctCount = answers.filter(a => a.correct).length
  const score = answers.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0

  const getStars = (s: number) => {
    if (s >= 90) return 3
    if (s >= 70) return 2
    if (s >= 40) return 1
    return 0
  }
  const stars = getStars(score)

  const xpEarned = score >= 90
    ? Math.round(lesson.xpReward * 1.5)
    : score >= 70
    ? Math.round(lesson.xpReward * 1.2)
    : score >= 40
    ? lesson.xpReward
    : Math.round(lesson.xpReward * 0.5)

  const handleAnswer = () => {
    if (selected === null) return
    const correct = selected === q.correctAnswer
    setAnswered(true)
    setAnswers(prev => [...prev, { selected, correct }])
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      const finalCorrect = answers.filter(a => a.correct).length
      const finalScore = Math.round((finalCorrect / questions.length) * 100)
      submitQuiz(lid, mid, finalScore, lesson.xpReward)
      if (finalScore >= 70) setLocalConfetti(c => c + 1)
      setPhase('results')
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const handleRetry = () => {
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setAnswers([])
    setPhase('question')
  }

  // ── Intro Screen ──────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <Link to={`/learn/lesson/${mid}/${lid}`} className="flex items-center gap-1.5 text-sm text-text-muted hover:text-brand transition-colors">
          <ArrowLeft size={16} /> Back to Lesson
        </Link>

        <div className={`rounded-3xl bg-gradient-to-br ${module.color} p-8 text-white text-center`}>
          <div className="text-5xl mb-4">{module.icon}</div>
          <h1 className="text-2xl font-bold">{module.title}</h1>
          <p className="text-white/80 mt-1">{lesson.title} — Quiz</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-surface-secondary rounded-xl p-4">
              <p className="text-2xl font-bold text-text-primary">{questions.length}</p>
              <p className="text-xs text-text-muted mt-1">Questions</p>
            </div>
            <div className="bg-surface-secondary rounded-xl p-4">
              <p className="text-2xl font-bold text-warning">{lesson.xpReward}</p>
              <p className="text-xs text-text-muted mt-1">Base XP</p>
            </div>
            <div className="bg-surface-secondary rounded-xl p-4">
              <div className="flex justify-center gap-0.5">
                {[1,2,3].map(s => <Star key={s} size={16} className="text-warning fill-warning" />)}
              </div>
              <p className="text-xs text-text-muted mt-1">3 Stars at 90%</p>
            </div>
          </div>

          <div className="flex gap-2">
            {[
              { stars: 1, label: '40%+', color: 'text-amber-400' },
              { stars: 2, label: '70%+', color: 'text-amber-500' },
              { stars: 3, label: '90%+', color: 'text-warning' },
            ].map(t => (
              <div key={t.stars} className="flex-1 bg-surface-secondary rounded-xl p-3 text-center">
                <div className="flex justify-center gap-0.5 mb-1">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={12} className={`${t.color} fill-current`} />)}
                </div>
                <p className="text-xs text-text-muted">{t.label}</p>
              </div>
            ))}
          </div>

          {existingProgress?.quizScore !== null && existingProgress?.quizScore !== undefined && (
            <div className="bg-brand/5 border border-brand/20 rounded-xl p-3 flex items-center gap-3">
              <Trophy size={18} className="text-brand" />
              <div>
                <p className="text-sm font-semibold text-brand">Previous Best: {existingProgress.quizScore}%</p>
                <p className="text-xs text-text-muted">Attempts: {existingProgress.attempts}</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[1,2,3].map(s => (
                  <Star key={s} size={16} className={s <= (existingProgress.stars ?? 0) ? 'text-warning fill-warning' : 'text-border'} />
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setPhase('question')}
          className="w-full py-4 bg-brand text-white font-bold text-lg rounded-2xl hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
        >
          <Zap size={20} /> Start Quiz
        </button>
      </div>
    )
  }

  // ── Results Screen ────────────────────────────────────────────────────────
  if (phase === 'results') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <ConfettiCelebration trigger={localConfetti} type={stars === 3 ? 'module' : 'quiz'} />
        {showBadgeModal && (
          <BadgeAwardModal
            badges={newBadges}
            onClose={() => { setShowBadgeModal(false); dismissNewBadges() }}
          />
        )}

        <div className={`rounded-3xl bg-gradient-to-br ${
          stars === 3 ? 'from-yellow-400 to-amber-500' :
          stars === 2 ? 'from-blue-500 to-indigo-600' :
          stars === 1 ? 'from-green-500 to-teal-600' :
          'from-slate-400 to-slate-600'
        } p-8 text-white text-center`}>
          <div className="flex justify-center gap-2 mb-4">
            {[1,2,3].map(s => (
              <Star key={s} size={36} className={s <= stars ? 'text-white fill-white drop-shadow-lg' : 'text-white/30'} />
            ))}
          </div>
          <p className="text-6xl font-black mb-2">{score}%</p>
          <p className="text-white/90 text-lg font-semibold">
            {score >= 90 ? '🌟 Outstanding!' : score >= 70 ? '🎉 Great Work!' : score >= 40 ? '👍 Good Effort!' : '💪 Keep Practicing!'}
          </p>
          <p className="text-white/70 text-sm mt-1">{correctCount} of {questions.length} correct</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <Zap size={24} className="text-warning" />
            </div>
            <div>
              <p className="font-bold text-text-primary">XP Earned</p>
              <p className="text-sm text-text-muted">
                {score >= 90 ? '1.5× bonus for 3 stars!' : score >= 70 ? '1.2× bonus for 2 stars!' : 'Base XP awarded'}
              </p>
            </div>
          </div>
          <p className="text-2xl font-black text-warning">+{xpEarned}</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5 space-y-3">
          <h3 className="font-bold text-text-primary flex items-center gap-2">
            <BookOpen size={18} className="text-brand" /> Answer Review
          </h3>
          {questions.map((question, i) => {
            const ans = answers[i]
            if (!ans) return null
            return (
              <div key={question.id} className={`rounded-xl p-4 border ${ans.correct ? 'bg-success/5 border-success/20' : 'bg-danger/5 border-danger/20'}`}>
                <div className="flex items-start gap-3">
                  {ans.correct ? <CheckCircle size={18} className="text-success shrink-0 mt-0.5" /> : <XCircle size={18} className="text-danger shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text-primary">{question.question}</p>
                    {!ans.correct && (
                      <p className="text-xs text-text-muted mt-1">Your answer: <span className="text-danger font-medium">{question.options[ans.selected]}</span></p>
                    )}
                    <p className="text-xs text-text-muted mt-0.5">Correct: <span className="text-success font-medium">{question.options[question.correctAnswer]}</span></p>
                    <p className="text-xs text-text-secondary mt-2 bg-surface-secondary rounded-lg px-3 py-2 italic">{question.explanation}</p>
                    {question.cfaLos && (
                      <p className="text-xs text-text-muted mt-1 flex items-center gap-1"><GraduationCap size={11} /> {question.cfaLos}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3">
          <button onClick={handleRetry} className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-sm font-semibold text-text-primary hover:bg-surface-secondary transition-colors">
            <RotateCcw size={16} /> Retry
          </button>
          <Link to={`/learn/module/${mid}`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors">
            Continue <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  // ── Question Screen ───────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-text-muted">
          <span>Question {current + 1} of {questions.length}</span>
          <span className="flex items-center gap-1"><Zap size={13} className="text-warning" /> {answers.filter(a => a.correct).length} correct</span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-brand rounded-full transition-all duration-300" style={{ width: `${(current / questions.length) * 100}%` }} />
        </div>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors ${
              i < answers.length ? (answers[i].correct ? 'bg-success' : 'bg-danger') : i === current ? 'bg-brand' : 'bg-border'
            }`} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
          q.difficulty === 'easy' ? 'bg-success/10 text-success' :
          q.difficulty === 'medium' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
        }`}>
          {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
        </span>
        {q.cfaLos && <span className="text-xs text-text-muted flex items-center gap-1"><GraduationCap size={11} /> {q.cfaLos}</span>}
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
        <p className="text-lg font-semibold text-text-primary leading-relaxed">{q.question}</p>
      </div>

      <div className="space-y-3">
        {q.options.map((option, i) => {
          let cls = 'bg-white border-border hover:border-brand hover:bg-brand/5 cursor-pointer'
          if (answered) {
            if (i === q.correctAnswer) cls = 'bg-success/10 border-success'
            else if (i === selected && i !== q.correctAnswer) cls = 'bg-danger/10 border-danger'
            else cls = 'bg-white border-border opacity-50'
          } else if (selected === i) {
            cls = 'bg-brand/10 border-brand'
          }
          return (
            <button key={i} onClick={() => !answered && setSelected(i)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${cls}`} disabled={answered}>
              <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0 ${
                answered && i === q.correctAnswer ? 'bg-success border-success text-white' :
                answered && i === selected && i !== q.correctAnswer ? 'bg-danger border-danger text-white' :
                selected === i && !answered ? 'bg-brand border-brand text-white' : 'border-border text-text-muted'
              }`}>
                {answered && i === q.correctAnswer ? <CheckCircle size={16} /> :
                 answered && i === selected && i !== q.correctAnswer ? <XCircle size={16} /> :
                 String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm font-medium text-text-primary">{option}</span>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`rounded-2xl p-5 border ${answers[answers.length - 1]?.correct ? 'bg-success/5 border-success/30' : 'bg-danger/5 border-danger/30'}`}>
          <div className="flex items-start gap-3">
            {answers[answers.length - 1]?.correct ? <CheckCircle size={20} className="text-success shrink-0 mt-0.5" /> : <XCircle size={20} className="text-danger shrink-0 mt-0.5" />}
            <div>
              <p className="font-semibold text-text-primary text-sm mb-1">
                {answers[answers.length - 1]?.correct ? 'Correct! 🎉' : "Not quite — here's why:"}
              </p>
              <p className="text-sm text-text-secondary">{q.explanation}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <Link to="/learn/chat" className="flex items-center gap-1 text-sm text-text-muted hover:text-brand transition-colors">
          Need help? Ask Dhaki
        </Link>
        {!answered ? (
          <button onClick={handleAnswer} disabled={selected === null} className="px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark disabled:opacity-40 transition-colors">
            Submit Answer
          </button>
        ) : (
          <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors">
            {current + 1 >= questions.length ? 'See Results' : 'Next Question'} <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
