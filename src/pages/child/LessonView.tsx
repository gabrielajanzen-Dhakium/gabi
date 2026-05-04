import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, BookOpen, Play, CheckCircle,
  Star, Clock, Zap, ChevronDown, ChevronUp, GraduationCap,
  MessageCircle, Award
} from 'lucide-react'
import { educationModules } from '../../data/education-content'
import { useEducationStore } from '../../store/educationStore'

export default function LessonView() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>()

  const mid = parseInt(moduleId ?? '1')
  const lid = parseInt(lessonId ?? '1')

  const module = educationModules.find(m => m.id === mid)
  const lesson = module?.lessons.find(l => l.id === lid)
  const lessonIndex = module?.lessons.findIndex(l => l.id === lid) ?? 0
  const nextLesson = module?.lessons[lessonIndex + 1]
  const prevLesson = module?.lessons[lessonIndex - 1]

  const { lessonProgress, completeLesson } = useEducationStore()
  const progress = lessonProgress[lid]
  const isCompleted = !!progress?.completedAt

  const [videoPlaying, setVideoPlaying] = useState(false)
  const [activeSection, setActiveSection] = useState<number | null>(0)
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.body.scrollHeight - window.innerHeight
      if (docHeight > 0) setReadingProgress(Math.min(100, Math.round((window.scrollY / docHeight) * 100)))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMarkComplete = () => {
    if (!lesson || !module) return
    completeLesson(lid, mid)
  }

  if (!module || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <GraduationCap size={48} className="text-text-muted" />
        <p className="text-text-muted">Lesson not found.</p>
        <Link to="/learn" className="text-brand hover:underline">Back to Learning Hub</Link>
      </div>
    )
  }

  const starRating = progress?.stars ?? 0

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-16">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border">
        <div className="h-full bg-brand transition-all duration-150" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 pt-2">
        <Link to={`/learn/module/${mid}`} className="flex items-center gap-1.5 text-sm text-text-muted hover:text-brand transition-colors">
          <ArrowLeft size={16} /> Back to {module.title}
        </Link>
      </div>

      {/* Module Badge */}
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${module.color}`}>
        <span>{module.icon}</span>
        <span>{module.subtitle}</span>
      </div>

      {/* Lesson Title */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{lesson.title}</h1>
            <p className="text-text-muted mt-1">{lesson.subtitle}</p>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1 shrink-0">
              {[1, 2, 3].map(s => (
                <Star key={s} size={20} className={s <= starRating ? 'text-warning fill-warning' : 'text-border'} />
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 mt-3 text-sm text-text-muted">
          <span className="flex items-center gap-1"><Clock size={14} /> {lesson.durationMinutes} min</span>
          <span className="flex items-center gap-1"><Zap size={14} className="text-warning" /> {lesson.xpReward} XP</span>
          {lesson.hasQuiz && <span className="flex items-center gap-1 text-brand"><BookOpen size={14} /> Quiz included</span>}
          {isCompleted && <span className="flex items-center gap-1 text-success"><CheckCircle size={14} /> Completed</span>}
        </div>
      </div>

      {/* Key Points */}
      <div className="bg-brand/5 border border-brand/20 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-brand mb-3 flex items-center gap-2"><Zap size={14} /> Key Takeaways</h2>
        <ul className="space-y-2">
          {lesson.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
              <span className="w-5 h-5 rounded-full bg-brand text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">{i + 1}</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Video Player */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="relative bg-black aspect-video">
          {!videoPlaying ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group" onClick={() => setVideoPlaying(true)}>
              <img
                src={`https://img.youtube.com/vi/${lesson.videoId}/maxresdefault.jpg`}
                alt={lesson.videoTitle}
                className="absolute inset-0 w-full h-full object-cover opacity-70"
                onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${lesson.videoId}/hqdefault.jpg` }}
              />
              <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play size={28} className="text-brand ml-1" fill="currentColor" />
              </div>
              <p className="relative z-10 mt-3 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">{lesson.videoTitle}</p>
            </div>
          ) : (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${lesson.videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={lesson.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">{lesson.videoTitle}</p>
            <p className="text-xs text-text-muted">{lesson.videoChannel}</p>
          </div>
          <span className="text-xs bg-surface-secondary px-2 py-1 rounded-full text-text-muted">{lesson.durationMinutes} min</span>
        </div>
      </div>

      {/* Lesson Sections */}
      <div ref={contentRef} className="space-y-4">
        {lesson.sections.map((section, i) => (
          <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface-secondary/50 transition-colors"
              onClick={() => setActiveSection(activeSection === i ? null : i)}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span className="font-semibold text-text-primary">{section.heading}</span>
              </div>
              {activeSection === i ? <ChevronUp size={18} className="text-text-muted" /> : <ChevronDown size={18} className="text-text-muted" />}
            </button>
            {activeSection === i && (
              <div className="px-5 pb-5 space-y-3 border-t border-border">
                <p className="text-sm text-text-secondary leading-relaxed mt-4">{section.body}</p>
                {section.highlight && (
                  <blockquote className="border-l-4 border-brand bg-brand/5 rounded-r-xl px-4 py-3">
                    <p className="text-sm text-brand font-medium italic">{section.highlight}</p>
                  </blockquote>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Glossary */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-secondary/50 transition-colors" onClick={() => setGlossaryOpen(!glossaryOpen)}>
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-brand" />
            <span className="font-semibold text-text-primary">Glossary ({lesson.glossary.length} terms)</span>
          </div>
          {glossaryOpen ? <ChevronUp size={18} className="text-text-muted" /> : <ChevronDown size={18} className="text-text-muted" />}
        </button>
        {glossaryOpen && (
          <div className="border-t border-border divide-y divide-border">
            {lesson.glossary.map((item, i) => (
              <div key={i} className="px-5 py-3">
                <span className="text-sm font-semibold text-brand">{item.term}</span>
                <p className="text-sm text-text-secondary mt-0.5">{item.definition}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CFA Reference */}
      <div className="bg-surface-secondary rounded-xl px-4 py-3 flex items-start gap-3">
        <GraduationCap size={18} className="text-text-muted mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">CFA Curriculum Reference</p>
          <p className="text-sm text-text-secondary mt-0.5">{module.cfaLevel}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Link to="/learn/chat" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-sm font-medium text-text-primary hover:bg-surface-secondary transition-colors">
          <MessageCircle size={16} className="text-brand" /> Ask Dhaki for help
        </Link>
        {!isCompleted ? (
          <button onClick={handleMarkComplete} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-brand-dark transition-colors">
            <CheckCircle size={18} /> Mark as Complete (+{lesson.xpReward} XP)
          </button>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-success/10 text-success rounded-xl font-semibold border border-success/30">
            <CheckCircle size={18} /> Lesson Completed!
          </div>
        )}
        {lesson.hasQuiz && (
          <Link to={`/learn/quiz/${mid}/${lid}`} className="flex items-center justify-center gap-2 px-6 py-3 bg-warning text-white rounded-xl font-semibold hover:bg-warning/90 transition-colors">
            <Award size={18} /> Take Quiz
          </Link>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        {prevLesson ? (
          <Link to={`/learn/lesson/${mid}/${prevLesson.id}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-brand transition-colors">
            <ArrowLeft size={16} /> {prevLesson.title}
          </Link>
        ) : <div />}
        {nextLesson ? (
          <Link to={`/learn/lesson/${mid}/${nextLesson.id}`} className="flex items-center gap-2 text-sm text-brand font-medium hover:underline">
            {nextLesson.title} <ArrowRight size={16} />
          </Link>
        ) : lesson.hasQuiz ? (
          <Link to={`/learn/quiz/${mid}/${lid}`} className="flex items-center gap-2 text-sm text-warning font-medium hover:underline">
            Take the Quiz <ArrowRight size={16} />
          </Link>
        ) : (
          <Link to={`/learn/module/${mid}`} className="flex items-center gap-2 text-sm text-brand font-medium hover:underline">
            Back to Module <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  )
}
