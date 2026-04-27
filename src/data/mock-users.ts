import type { User, ChildProfile, BankAccount } from '../types/user'

export const mockUser: User = {
  id: 'usr-001',
  email: 'sarah.alrashid@email.com',
  name: 'Sarah Al-Rashid',
  phone: '+971501234567',
  country: 'UAE',
  kycStatus: 'verified',
  subscriptionPlan: 'premium',
  createdAt: '2025-09-15T10:00:00Z',
}

export const mockChildren: ChildProfile[] = [
  {
    id: 'child-001',
    parentId: 'usr-001',
    name: 'Aisha Al-Rashid',
    dateOfBirth: '2010-03-15',
    ageGroup: 'teen',
  },
  {
    id: 'child-002',
    parentId: 'usr-001',
    name: 'Omar Al-Rashid',
    dateOfBirth: '2014-07-22',
    ageGroup: 'child',
  },
]

export const mockBankAccounts: BankAccount[] = [
  {
    id: 'bank-001',
    userId: 'usr-001',
    bankName: 'Emirates NBD',
    accountLastFour: '4532',
    isPrimary: true,
  },
  {
    id: 'bank-002',
    userId: 'usr-001',
    bankName: 'Mashreq Bank',
    accountLastFour: '7891',
    isPrimary: false,
  },
]
