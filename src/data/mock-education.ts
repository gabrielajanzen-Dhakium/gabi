import type { EducationModule, QuizQuestion, Badge, EducationProgress } from '../types/education'

export const mockModules: EducationModule[] = [
  {
    id: 1, title: 'Money, Ethics & Financial Responsibility', weeks: '1–2', cfaWeight: '10%', cfaEquivalent: 'Ethical and Professional Standards', totalLessons: 3,
    description: 'Explore the nature of money, the role of ethics in markets, and the distinction between needs and wants.',
    lessons: [
      { id: 1, moduleId: 1, title: 'What is Money?', description: 'History of currency, from barter to digital payments', contentPreview: 'Money is anything widely accepted as a medium of exchange...', durationMinutes: 10, hasVideo: true, hasQuiz: false },
      { id: 2, moduleId: 1, title: 'Ethics in Finance', description: 'Why trust and integrity matter in capital markets', contentPreview: 'The CFA Code of Ethics establishes the foundational principles...', durationMinutes: 12, hasVideo: true, hasQuiz: false },
      { id: 3, moduleId: 1, title: 'Needs vs. Wants & Opportunity Cost', description: 'Making smart financial decisions every day', contentPreview: 'Every financial decision involves a trade-off...', durationMinutes: 8, hasVideo: false, hasQuiz: true },
    ],
  },
  {
    id: 2, title: 'Understanding Numbers & Financial Math', weeks: '3–4', cfaWeight: '12%', cfaEquivalent: 'Quantitative Methods', totalLessons: 3,
    description: 'Master the mathematical toolkit for investment analysis: TVM, compound interest, and statistics.',
    lessons: [
      { id: 4, moduleId: 2, title: 'Simple vs. Compound Interest', description: 'The magic of compounding and the Rule of 72', contentPreview: 'Compound interest is interest earned on interest...', durationMinutes: 12, hasVideo: true, hasQuiz: false },
      { id: 5, moduleId: 2, title: 'Time Value of Money', description: 'Present value, future value, and why $1 today ≠ $1 tomorrow', contentPreview: 'The time value of money is the foundational concept...', durationMinutes: 15, hasVideo: true, hasQuiz: false },
      { id: 6, moduleId: 2, title: 'ROI & Basic Statistics', description: 'Calculating returns and understanding risk measures', contentPreview: 'Return on Investment (ROI) measures the gain or loss...', durationMinutes: 10, hasVideo: false, hasQuiz: true },
    ],
  },
  {
    id: 3, title: 'How the Economy Works', weeks: '5–6', cfaWeight: '12%', cfaEquivalent: 'Economics', totalLessons: 3,
    description: 'Understand macroeconomics: supply/demand, business cycles, central banks, and inflation.',
    lessons: [
      { id: 7, moduleId: 3, title: 'Supply, Demand & Prices', description: 'How markets discover the right price', contentPreview: 'When supply increases and demand stays constant...', durationMinutes: 10, hasVideo: true, hasQuiz: false },
      { id: 8, moduleId: 3, title: 'Business Cycles & Central Banks', description: 'Expansion, contraction, and the role of monetary policy', contentPreview: 'The economy moves in cycles of growth and contraction...', durationMinutes: 12, hasVideo: true, hasQuiz: false },
      { id: 9, moduleId: 3, title: 'Inflation & Interest Rates', description: 'How rising prices affect your purchasing power', contentPreview: 'Inflation erodes the purchasing power of money over time...', durationMinutes: 10, hasVideo: false, hasQuiz: true },
    ],
  },
  {
    id: 4, title: 'Reading Company Financial Statements', weeks: '7–8', cfaWeight: '15%', cfaEquivalent: 'Financial Statement Analysis', totalLessons: 3,
    description: 'Learn to read balance sheets, income statements, and cash flow statements.',
    lessons: [
      { id: 10, moduleId: 4, title: 'The Balance Sheet', description: 'Assets, liabilities, and shareholder equity', contentPreview: 'A balance sheet shows what a company owns and owes...', durationMinutes: 12, hasVideo: true, hasQuiz: false },
      { id: 11, moduleId: 4, title: 'Income Statement & Profitability', description: 'Revenue, expenses, and the bottom line', contentPreview: 'The income statement shows revenue minus expenses...', durationMinutes: 12, hasVideo: true, hasQuiz: false },
      { id: 12, moduleId: 4, title: 'Cash Flow & Financial Ratios', description: 'P/E, P/B, Debt-to-Equity, and more', contentPreview: 'Cash flow tells you the actual money moving in and out...', durationMinutes: 10, hasVideo: false, hasQuiz: true },
    ],
  },
  {
    id: 5, title: 'Stock Market Investing', weeks: '9–10', cfaWeight: '15%', cfaEquivalent: 'Equity Investments', totalLessons: 3,
    description: 'How stock markets work, stock valuation, and major indices.',
    lessons: [
      { id: 13, moduleId: 5, title: 'What is a Stock?', description: 'Ownership, primary vs. secondary markets', contentPreview: 'A stock represents partial ownership in a company...', durationMinutes: 10, hasVideo: true, hasQuiz: false },
      { id: 14, moduleId: 5, title: 'Growth vs. Value Investing', description: 'Different approaches to picking stocks', contentPreview: 'Growth investors look for companies expanding rapidly...', durationMinutes: 12, hasVideo: true, hasQuiz: false },
      { id: 15, moduleId: 5, title: 'Market Indices & ETFs', description: 'S&P 500, Nasdaq, and index investing', contentPreview: 'A market index tracks the performance of a group of stocks...', durationMinutes: 10, hasVideo: false, hasQuiz: true },
    ],
  },
  {
    id: 6, title: 'Bonds & Fixed Income', weeks: '11–12', cfaWeight: '12%', cfaEquivalent: 'Fixed Income', totalLessons: 3,
    description: 'Bond markets, yield curves, credit ratings, and the role of bonds in portfolios.',
    lessons: [
      { id: 16, moduleId: 6, title: 'What is a Bond?', description: 'Coupons, maturity, and face value', contentPreview: 'A bond is a loan you make to a government or company...', durationMinutes: 10, hasVideo: true, hasQuiz: false },
      { id: 17, moduleId: 6, title: 'Yield, Duration & Credit Ratings', description: 'Understanding bond risk and return', contentPreview: 'Yield to maturity is the total return expected on a bond...', durationMinutes: 12, hasVideo: true, hasQuiz: false },
      { id: 18, moduleId: 6, title: 'Sukuk & Islamic Finance', description: 'Sharia-compliant fixed income for GCC investors', contentPreview: 'Sukuk are Islamic financial certificates similar to bonds...', durationMinutes: 10, hasVideo: false, hasQuiz: true },
    ],
  },
  {
    id: 7, title: 'Building Your Investment Portfolio', weeks: '13–14', cfaWeight: '15%', cfaEquivalent: 'Portfolio Management', totalLessons: 3,
    description: 'Construct a diversified portfolio aligned with your risk tolerance and goals.',
    lessons: [
      { id: 19, moduleId: 7, title: 'Asset Allocation Strategies', description: 'How to divide your investments across asset classes', contentPreview: 'Asset allocation is the process of dividing investments...', durationMinutes: 12, hasVideo: true, hasQuiz: false },
      { id: 20, moduleId: 7, title: 'Diversification & Correlation', description: "Don't put all your eggs in one basket", contentPreview: 'Diversification reduces risk by spreading investments...', durationMinutes: 12, hasVideo: true, hasQuiz: false },
      { id: 21, moduleId: 7, title: 'Portfolio Construction & Rebalancing', description: 'Building and maintaining your portfolio', contentPreview: 'Rebalancing restores your portfolio to its target allocation...', durationMinutes: 10, hasVideo: false, hasQuiz: true },
    ],
  },
  {
    id: 8, title: 'Advanced Investments & Risk Management', weeks: '15–16', cfaWeight: '9%', cfaEquivalent: 'Derivatives & Alternative Investments', totalLessons: 3,
    description: 'Derivatives, alternative investments, cryptocurrency, and risk management.',
    lessons: [
      { id: 22, moduleId: 8, title: 'Options & Futures Basics', description: 'Introduction to derivative instruments', contentPreview: 'Derivatives are financial instruments whose value is derived...', durationMinutes: 12, hasVideo: true, hasQuiz: false },
      { id: 23, moduleId: 8, title: 'Alternative Investments', description: 'Real estate, commodities, private equity, and crypto', contentPreview: 'Alternative investments include assets beyond stocks and bonds...', durationMinutes: 12, hasVideo: true, hasQuiz: false },
      { id: 24, moduleId: 8, title: 'Risk Management & Fraud Prevention', description: 'Protecting your investments', contentPreview: 'Investment risk comes in many forms: market, credit, liquidity...', durationMinutes: 10, hasVideo: false, hasQuiz: true },
    ],
  },
]

export const mockQuizzes: QuizQuestion[] = [
  // Module 1
  { id: 1, moduleId: 1, question: 'What is opportunity cost?', options: ['The price of a product', 'The value of the next best alternative you give up', 'A tax on purchases', 'The cost of a loan'], correctAnswer: 1, explanation: 'Opportunity cost is the value of what you give up when making a choice.' },
  { id: 2, moduleId: 1, question: 'Which of these is a "need" rather than a "want"?', options: ['Latest smartphone', 'Designer clothes', 'Nutritious food', 'Video game console'], correctAnswer: 2, explanation: 'Needs are essentials for survival; wants are things we desire but can live without.' },
  // Module 2
  { id: 3, moduleId: 2, question: 'Using the Rule of 72, how long will it take to double your money at 8% annual return?', options: ['6 years', '8 years', '9 years', '12 years'], correctAnswer: 2, explanation: '72 ÷ 8 = 9 years. The Rule of 72 provides a quick estimate.' },
  { id: 4, moduleId: 2, question: 'What does compound interest mean?', options: ['Interest on your original deposit only', 'Interest earned on interest', 'A fixed interest payment', 'Interest that decreases over time'], correctAnswer: 1, explanation: 'Compound interest is interest calculated on both the initial principal and accumulated interest.' },
  // Module 5
  { id: 5, moduleId: 5, question: 'What does a P/E ratio measure?', options: ['Profit margin', 'Price relative to earnings', 'Portfolio efficiency', 'Purchasing power'], correctAnswer: 1, explanation: 'P/E ratio = Stock Price / Earnings Per Share. It shows how much investors pay per dollar of earnings.' },
]

export const mockBadges: Badge[] = [
  { id: 'b1', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earnedAt: '2025-10-01', requirement: 'Complete 1 lesson' },
  { id: 'b2', name: 'Module Master', description: 'Complete any full module', icon: '🏆', earnedAt: '2025-11-15', requirement: 'Complete all lessons in a module' },
  { id: 'b3', name: 'Quiz Ace', description: 'Score 100% on any quiz', icon: '⭐', earnedAt: '2025-11-20', requirement: '100% quiz score' },
  { id: 'b4', name: 'Streak Week', description: 'Learn 7 days in a row', icon: '🔥', earnedAt: '2025-12-01', requirement: '7-day learning streak' },
  { id: 'b5', name: 'Portfolio Builder', description: 'Make your first simulated trade', icon: '📊', earnedAt: '2026-01-10', requirement: 'Execute 1 simulated trade' },
  { id: 'b6', name: 'Curious Mind', description: 'Ask Dhaki 10 questions', icon: '🧠', earnedAt: '2026-02-05', requirement: 'Ask 10 chatbot questions' },
  { id: 'b7', name: 'Half Way There', description: 'Complete 4 modules', icon: '🌟', requirement: 'Complete 4 modules' },
  { id: 'b8', name: 'Financial Guru', description: 'Complete all 8 modules', icon: '👑', requirement: 'Complete all 8 modules' },
  { id: 'b9', name: 'Investor Pro', description: 'Achieve 10% simulated returns', icon: '💎', requirement: '10%+ simulator returns' },
  { id: 'b10', name: 'News Reader', description: 'Read 20 market news articles', icon: '📰', requirement: 'Read 20 news articles' },
  { id: 'b11', name: 'Streak Month', description: 'Learn 30 days in a row', icon: '💪', requirement: '30-day learning streak' },
  { id: 'b12', name: 'Social Learner', description: 'Share your progress with family', icon: '🤝', requirement: 'Share progress report' },
]

export const mockProgress: EducationProgress[] = [
  { childId: 'child-001', moduleId: 1, lessonId: 1, completionPct: 100, quizScore: 90, completedAt: '2025-10-05' },
  { childId: 'child-001', moduleId: 1, lessonId: 2, completionPct: 100, completedAt: '2025-10-08' },
  { childId: 'child-001', moduleId: 1, lessonId: 3, completionPct: 100, quizScore: 85, completedAt: '2025-10-12' },
  { childId: 'child-001', moduleId: 2, lessonId: 4, completionPct: 100, completedAt: '2025-10-18' },
  { childId: 'child-001', moduleId: 2, lessonId: 5, completionPct: 100, completedAt: '2025-10-22' },
  { childId: 'child-001', moduleId: 2, lessonId: 6, completionPct: 100, quizScore: 100, completedAt: '2025-10-28' },
  { childId: 'child-001', moduleId: 3, lessonId: 7, completionPct: 100, completedAt: '2025-11-02' },
  { childId: 'child-001', moduleId: 3, lessonId: 8, completionPct: 60 },
  { childId: 'child-002', moduleId: 1, lessonId: 1, completionPct: 100, completedAt: '2026-01-10' },
  { childId: 'child-002', moduleId: 1, lessonId: 2, completionPct: 45 },
]
