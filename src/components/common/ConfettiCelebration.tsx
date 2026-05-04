/**
 * ConfettiCelebration.tsx
 * Fires canvas-confetti whenever the `trigger` prop increments.
 */
import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

interface Props {
  trigger: number   // increment this to fire confetti
  type?: 'quiz' | 'module' | 'badge' | 'standard'
}

export default function ConfettiCelebration({ trigger, type = 'standard' }: Props) {
  const prevTrigger = useRef(trigger)

  useEffect(() => {
    if (trigger <= prevTrigger.current) return
    prevTrigger.current = trigger

    if (type === 'module') {
      // Big celebration for module completion
      const duration = 3000
      const end = Date.now() + duration
      const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6']

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        })
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()
    } else if (type === 'badge') {
      // Star burst for badge
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a'],
        shapes: ['star'],
        scalar: 1.2,
      })
    } else if (type === 'quiz') {
      // Medium celebration for quiz completion
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'],
      })
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6, x: 0.3 },
        })
      }, 300)
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6, x: 0.7 },
        })
      }, 500)
    } else {
      // Standard confetti
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      })
    }
  }, [trigger, type])

  return null
}
