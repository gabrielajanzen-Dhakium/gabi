export interface User {
  id: string
  email: string
  name: string
  phone: string
  country: string
  kycStatus: 'pending' | 'verified' | 'rejected'
  subscriptionPlan: 'freemium' | 'premium' | 'managed'
  avatar?: string
  createdAt: string
}

export interface ChildProfile {
  id: string
  parentId: string
  name: string
  dateOfBirth: string
  avatar?: string
  ageGroup: 'child' | 'teen'
}

export interface BankAccount {
  id: string
  userId: string
  bankName: string
  accountLastFour: string
  isPrimary: boolean
}
