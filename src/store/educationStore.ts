/**
 * educationStore.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Zustand store for the Gabi financial education system.
 * Tracks lesson completion, quiz scores, XP, stars, badges, streaks,
 * and triggers confetti celebrations.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  badgeDefs,
  educationModules,
  getStarRating,
  getXpForScore,
} from '../data/education-content'
import type { BadgeDef } from '../data/education-content'

// ── Types ────────────────────────────────────────────────────────────────────

export interface LessonProgress {
  lessonId: number
  moduleId: number
  completedAt: string | null
  quizScore: number | null      // 0–100
  stars: 0 | 1 | 2 | 3
  xpEarned: number
  attempts: number
}

export interface ModuleProgress {
  moduleId: number
  completedAt: string | null
  totalXP: number
  averageScore: number
}

export interface EarnedBadge {
  badgeId: string
  earnedAt: string
}

export interface EducationState {
  // Progress
  lessonProgress: Record<number, LessonProgress>   // keyed by lessonId
  moduleProgress: Record<number, ModuleProgress>   // keyed by moduleId
  earnedBadges: EarnedBadge[]
  totalXP: number
  currentStreak: number
  longestStreak: number
  lastStudiedDate: string | null

  // UI State
  confettiTrigger: number   // increment to fire confetti
  newBadges: BadgeDef[]     // badges just earned (for modal)

  // Actions
  completeLesson: (lessonId: number, moduleId: number) => void
  submitQuiz: (lessonId: number, moduleId: number, score: number, baseXp: number) => void
  dismissNewBadges: () => void
  triggerConfetti: () => void
  resetProgress: () => void
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

function checkAndAwardBadges(state: EducationState): BadgeDef[] {
  const newlyEarned: BadgeDef[] = []
  const earnedIds = new Set(state.earnedBadges.map(b => b.badgeId))

  for (const badge of badgeDefs) {
    if (earnedIds.has(badge.id)) continue

    let earned = false

    switch (badge.requirementType) {
      case 'lesson_count': {
        const completed = Object.values(state.lessonProgress).filter(
          lp => lp.completedAt !== null
        ).length
        earned = completed >= badge.requirementValue
        break
      }
      case 'module_complete': {
        const completedModules = Object.values(state.moduleProgress).filter(
          mp => mp.completedAt !== null
        ).length
        earned = completedModules >= badge.requirementValue
        break
      }
      case 'perfect_quiz': {
        earned = Object.values(state.lessonProgress).some(
          lp => (lp.quizScore ?? 0) >= 100
        )
        break
      }
      case 'streak': {
        earned = state.currentStreak >= badge.requirementValue
        break
      }
      case 'half_modules': {
        const completedModules = Object.values(state.moduleProgress).filter(
          mp => mp.completedAt !== null
        ).length
        earned = completedModules >= badge.requirementValue
        break
      }
      case 'all_modules': {
        const completedModules = Object.values(state.moduleProgress).filter(
          mp => mp.completedAt !== null
        ).length
        earned = completedModules >= educationModules.length
        break
      }
      case 'xp_total': {
        earned = state.totalXP >= badge.requirementValue
        break
      }
      case 'trade': {
        // Handled by trading simulator — skip here
        break
      }
    }

    if (earned) {
      newlyEarned.push(badge)
    }
  }

  return newlyEarned
}

function updateStreak(state: EducationState): { streak: number; longest: number } {
  const today = todayStr()
  const last = state.lastStudiedDate

  if (last === today) {
    return { streak: state.currentStreak, longest: state.longestStreak }
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  let newStreak = last === yesterdayStr ? state.currentStreak + 1 : 1
  const longest = Math.max(newStreak, state.longestStreak)
  return { streak: newStreak, longest }
}

function checkModuleCompletion(
  moduleId: number,
  lessonProgress: Record<number, LessonProgress>
): boolean {
  const _module = educationModules.find(m => m.id === moduleId)
  if (!_module) return false
  return _module.lessons.every(
    lesson => lessonProgress[lesson.id]?.completedAt !== null
  )
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useEducationStore = create<EducationState>()(
  persist(
    (set, _get) => ({
      lessonProgress: {},
      moduleProgress: {},
      earnedBadges: [],
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastStudiedDate: null,
      confettiTrigger: 0,
      newBadges: [],

      completeLesson: (lessonId, moduleId) => {
        set(state => {
          const existing = state.lessonProgress[lessonId]
          if (existing?.completedAt) return state // already completed

          const { streak, longest } = updateStreak(state)
          const today = todayStr()

          const newLessonProgress: Record<number, LessonProgress> = {
            ...state.lessonProgress,
            [lessonId]: {
              lessonId,
              moduleId,
              completedAt: today,
              quizScore: existing?.quizScore ?? null,
              stars: existing?.stars ?? 0,
              xpEarned: existing?.xpEarned ?? 0,
              attempts: existing?.attempts ?? 0,
            },
          }

          // Check module completion
          const moduleComplete = checkModuleCompletion(moduleId, newLessonProgress)
          const newModuleProgress = { ...state.moduleProgress }
          if (moduleComplete && !newModuleProgress[moduleId]?.completedAt) {
            const _module = educationModules.find(m => m.id === moduleId)
            const lessons = Object.values(newLessonProgress).filter(
              lp => lp.moduleId === moduleId
            )
            const totalXP = lessons.reduce((sum, lp) => sum + lp.xpEarned, 0)
            const scores = lessons.filter(lp => lp.quizScore !== null).map(lp => lp.quizScore!)
            const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
            newModuleProgress[moduleId] = {
              moduleId,
              completedAt: today,
              totalXP,
              averageScore: Math.round(avgScore),
            }
          }

          const newState: Partial<EducationState> = {
            lessonProgress: newLessonProgress,
            moduleProgress: newModuleProgress,
            currentStreak: streak,
            longestStreak: longest,
            lastStudiedDate: today,
          }

          // Check badges
          const tempState = { ...state, ...newState } as EducationState
          const newlyEarned = checkAndAwardBadges(tempState)
          if (newlyEarned.length > 0) {
            const xpFromBadges = newlyEarned.reduce((sum, b) => sum + b.xpReward, 0)
            newState.totalXP = (state.totalXP) + xpFromBadges
            newState.earnedBadges = [
              ...state.earnedBadges,
              ...newlyEarned.map(b => ({ badgeId: b.id, earnedAt: today })),
            ]
            newState.newBadges = newlyEarned
            newState.confettiTrigger = state.confettiTrigger + 1
          }

          if (moduleComplete) {
            newState.confettiTrigger = (newState.confettiTrigger ?? state.confettiTrigger) + 1
          }

          return newState as EducationState
        })
      },

      submitQuiz: (lessonId, moduleId, score, baseXp) => {
        set(state => {
          const existing = state.lessonProgress[lessonId]
          const stars = getStarRating(score)
          const xpEarned = getXpForScore(baseXp, score)
          const today = todayStr()
          const { streak, longest } = updateStreak(state)

          // Only award XP if this is the best score
          const prevScore = existing?.quizScore ?? -1
          const xpDelta = score > prevScore ? xpEarned - (existing?.xpEarned ?? 0) : 0

          const newLessonProgress: Record<number, LessonProgress> = {
            ...state.lessonProgress,
            [lessonId]: {
              lessonId,
              moduleId,
              completedAt: today,
              quizScore: Math.max(score, prevScore),
              stars: Math.max(stars, existing?.stars ?? 0) as 0 | 1 | 2 | 3,
              xpEarned: Math.max(xpEarned, existing?.xpEarned ?? 0),
              attempts: (existing?.attempts ?? 0) + 1,
            },
          }

          const newTotalXP = state.totalXP + Math.max(0, xpDelta)

          // Check module completion
          const moduleComplete = checkModuleCompletion(moduleId, newLessonProgress)
          const newModuleProgress = { ...state.moduleProgress }
          if (moduleComplete && !newModuleProgress[moduleId]?.completedAt) {
            const lessons = Object.values(newLessonProgress).filter(
              lp => lp.moduleId === moduleId
            )
            const totalXP = lessons.reduce((sum, lp) => sum + lp.xpEarned, 0)
            const scores = lessons.filter(lp => lp.quizScore !== null).map(lp => lp.quizScore!)
            const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
            newModuleProgress[moduleId] = {
              moduleId,
              completedAt: today,
              totalXP,
              averageScore: Math.round(avgScore),
            }
          }

          const newState: Partial<EducationState> = {
            lessonProgress: newLessonProgress,
            moduleProgress: newModuleProgress,
            totalXP: newTotalXP,
            currentStreak: streak,
            longestStreak: longest,
            lastStudiedDate: today,
          }

          // Check badges
          const tempState = { ...state, ...newState, totalXP: newTotalXP } as EducationState
          const newlyEarned = checkAndAwardBadges(tempState)
          if (newlyEarned.length > 0) {
            const xpFromBadges = newlyEarned.reduce((sum, b) => sum + b.xpReward, 0)
            newState.totalXP = newTotalXP + xpFromBadges
            newState.earnedBadges = [
              ...state.earnedBadges,
              ...newlyEarned.map(b => ({ badgeId: b.id, earnedAt: today })),
            ]
            newState.newBadges = newlyEarned
          }

          // Confetti for 3 stars or module completion
          if (stars === 3 || moduleComplete || newlyEarned.length > 0) {
            newState.confettiTrigger = state.confettiTrigger + 1
          }

          return newState as EducationState
        })
      },

      dismissNewBadges: () => set({ newBadges: [] }),

      triggerConfetti: () =>
        set(state => ({ confettiTrigger: state.confettiTrigger + 1 })),

      resetProgress: () =>
        set({
          lessonProgress: {},
          moduleProgress: {},
          earnedBadges: [],
          totalXP: 0,
          currentStreak: 0,
          longestStreak: 0,
          lastStudiedDate: null,
          confettiTrigger: 0,
          newBadges: [],
        }),
    }),
    {
      name: 'gabi-education-progress',
      version: 1,
    }
  )
)
