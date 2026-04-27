export interface EducationModule {
  id: number
  title: string
  description: string
  weeks: string
  cfaWeight: string
  cfaEquivalent: string
  lessons: Lesson[]
  totalLessons: number
}

export interface Lesson {
  id: number
  moduleId: number
  title: string
  description: string
  contentPreview: string
  durationMinutes: number
  hasVideo: boolean
  hasQuiz: boolean
}

export interface EducationProgress {
  childId: string
  moduleId: number
  lessonId: number
  completionPct: number
  quizScore?: number
  completedAt?: string
}

export interface QuizQuestion {
  id: number
  moduleId: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt?: string
  requirement: string
}

export interface Achievement {
  totalXP: number
  level: number
  currentStreak: number
  longestStreak: number
  badges: Badge[]
  completedModules: number
}
