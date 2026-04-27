import { createContext, useContext, useState, type ReactNode } from 'react'
import { mockUser, mockChildren } from '../data/mock-users'
import type { User, ChildProfile } from '../types/user'

interface AuthState {
  user: User | null
  children: ChildProfile[]
  isAuthenticated: boolean
  activeRole: 'parent' | 'child'
  activeChildId: string | null
  login: () => void
  logout: () => void
  switchToChild: (childId: string) => void
  switchToParent: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children: kids }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeRole, setActiveRole] = useState<'parent' | 'child'>('parent')
  const [activeChildId, setActiveChildId] = useState<string | null>(null)

  const login = () => {
    setUser(mockUser)
    setIsAuthenticated(true)
    setActiveRole('parent')
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setActiveRole('parent')
    setActiveChildId(null)
  }

  const switchToChild = (childId: string) => {
    setActiveRole('child')
    setActiveChildId(childId)
  }

  const switchToParent = () => {
    setActiveRole('parent')
    setActiveChildId(null)
  }

  return (
    <AuthContext.Provider value={{
      user, children: mockChildren, isAuthenticated, activeRole, activeChildId,
      login, logout, switchToChild, switchToParent,
    }}>
      {kids}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
