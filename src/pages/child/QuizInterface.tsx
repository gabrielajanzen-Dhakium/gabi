import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { mockQuizzes, mockModules } from '../../data/mock-education'
import { CheckCircle2, XCircle, ArrowRight, Award, MessageCircle } from 'lucide-react'

export default function QuizInterface() {
  const { moduleId } = useParams()
  const mod = mockModules.find(m => m.id === Number(moduleId)) ?? mockModules[0]
  const questions = mockQuizzes.filter(q => q.moduleId === mod.id)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[current]

  const handleAnswer = () => {
    if (selected === null) return
    setAnswered(true)
    if (selected === q.correctAnswer) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  if (!q || finished) {
    const pct = questions.length > 0 ? (score / questions.length) * 100 : 0
    const xp = score * 50
    return (
      <div className="max-w-xl mx-auto text-center py-12 animate-fade-in-up">
        <div className="bg-white rounded-2xl border border-border p-8">
          <div className="text-5xl mb-4">{pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📚'}</div>
          <h1 className="text-2xl font-bold text-text-primary">Quiz Complete!</h1>
          <p className="text-lg text-text-secondary mt-2">Module {mod.id}: {mod.title}</p>

          <div className="my-8">
            <p className="text-5xl font-extrabold text-brand">{score}/{questions.length}</p>
            <p className="text-sm text-text-muted mt-1">{pct.toFixed(0)}% correct</p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="px-4 py-2 bg-warning-light rounded-xl">
              <p className="text-sm font-bold text-warning">+{xp} XP</p>
            </div>
            {pct === 100 && (
              <div className="px-4 py-2 bg-success-light rounded-xl flex items-center gap-1">
                <Award size={16} className="text-success" />
                <p className="text-sm font-bold text-success">Quiz Ace Badge!</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <Link to="/learn/hub" className="px-5 py-2.5 bg-surface-secondary text-text-primary text-sm font-semibold rounded-xl hover:bg-surface-tertiary">
              Back to Hub
            </Link>
            <Link to={`/learn/module/${mod.id + 1}`} className="px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark">
              Next Module →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-text-primary">Module {mod.id} Quiz</h1>
        <span className="text-sm font-semibold text-brand">Question {current + 1} of {questions.length}</span>
      </div>

      {/* Progress */}
      <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
        <div className="h-full bg-brand rounded-full transition-all duration-300" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl border border-border p-8">
        <h2 className="text-lg font-semibold text-text-primary mb-6">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let style = 'border-border hover:border-brand/30 hover:bg-brand-50'
            if (answered) {
              if (i === q.correctAnswer) style = 'border-success bg-success-light'
              else if (i === selected) style = 'border-danger bg-danger-light'
              else style = 'border-border opacity-50'
            } else if (selected === i) {
              style = 'border-brand bg-brand-light'
            }

            return (
              <button
                key={i}
                onClick={() => !answered && setSelected(i)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${style}`}
              >
                <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                  answered && i === q.correctAnswer ? 'border-success bg-success text-white' :
                  answered && i === selected ? 'border-danger bg-danger text-white' :
                  selected === i ? 'border-brand bg-brand text-white' : 'border-border text-text-muted'
                }`}>
                  {answered && i === q.correctAnswer ? <CheckCircle2 size={14} /> : answered && i === selected ? <XCircle size={14} /> : String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm font-medium text-text-primary">{opt}</span>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div className={`mt-6 p-4 rounded-xl ${selected === q.correctAnswer ? 'bg-success-light' : 'bg-warning-light'}`}>
            <p className="text-sm font-semibold text-text-primary mb-1">
              {selected === q.correctAnswer ? '✅ Correct!' : '❌ Not quite!'}
            </p>
            <p className="text-sm text-text-secondary">{q.explanation}</p>
            {selected !== q.correctAnswer && (
              <Link to="/learn/chat" className="inline-flex items-center gap-1 mt-2 text-sm text-brand font-medium hover:underline">
                <MessageCircle size={14} /> Ask Dhaki for help
              </Link>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end mt-6">
          {!answered ? (
            <button onClick={handleAnswer} disabled={selected === null} className="px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark disabled:opacity-40 transition-colors">
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} className="flex items-center gap-1 px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-colors">
              {current + 1 >= questions.length ? 'See Results' : 'Next'} <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
