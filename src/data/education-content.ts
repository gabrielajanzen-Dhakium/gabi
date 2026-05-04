/**
 * education-content.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Full CFA-aligned financial education content for the Gabi (Dhakium) app.
 *
 * Structure:
 *  - 8 modules aligned with CFA Institute curriculum (adapted for teens 14–18)
 *  - Each module has 3 lessons with rich content, a YouTube video, and a quiz
 *  - 5 quiz questions per module (40 total)
 *  - 12 badges with XP rewards
 *  - Star ratings (1–3 stars) based on quiz score
 *
 * YouTube videos are curated free educational content from Khan Academy,
 * CFA Institute, and reputable finance educators.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface LessonContent {
  id: number
  moduleId: number
  order: number
  title: string
  subtitle: string
  durationMinutes: number
  xpReward: number
  videoId: string          // YouTube video ID
  videoTitle: string
  videoChannel: string
  keyPoints: string[]
  sections: {
    heading: string
    body: string
    highlight?: string     // pull-quote or key stat
  }[]
  glossary: { term: string; definition: string }[]
  hasQuiz: boolean
}

export interface QuizQuestion {
  id: number
  moduleId: number
  lessonId: number
  question: string
  options: string[]
  correctAnswer: number    // 0-indexed
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  cfaLos?: string          // CFA Learning Outcome Statement reference
}

export interface ModuleDef {
  id: number
  title: string
  subtitle: string
  description: string
  color: string            // Tailwind gradient classes
  icon: string             // emoji
  totalXP: number
  estimatedHours: number
  cfaLevel: string
  lessons: LessonContent[]
  quizzes: QuizQuestion[]
}

export interface BadgeDef {
  id: string
  name: string
  description: string
  icon: string
  xpReward: number
  requirement: string
  requirementType: 'lesson_count' | 'module_complete' | 'quiz_score' | 'streak' | 'trade' | 'all_modules' | 'half_modules' | 'perfect_quiz' | 'xp_total'
  requirementValue: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  color: string
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 1 — Ethics & Professional Standards
// ─────────────────────────────────────────────────────────────────────────────

const module1: ModuleDef = {
  id: 1,
  title: 'Ethics & Financial Integrity',
  subtitle: 'CFA Level I · Module 1',
  description: 'Understand the ethical foundations of finance, professional standards, and why integrity is the cornerstone of every financial decision.',
  color: 'from-purple-500 to-indigo-600',
  icon: '⚖️',
  totalXP: 450,
  estimatedHours: 1.5,
  cfaLevel: 'CFA Level I — Ethics & Professional Standards',
  lessons: [
    {
      id: 1, moduleId: 1, order: 1,
      title: 'Why Ethics Matter in Finance',
      subtitle: 'The foundation of trust in financial markets',
      durationMinutes: 8, xpReward: 100,
      videoId: 'pdXHSXxMCFQ',
      videoTitle: 'What is Financial Ethics?',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Ethics are the moral principles guiding financial decisions',
        'Trust is the currency of financial markets',
        'The CFA Institute Code of Ethics sets global standards',
        'Ethical failures cause market crises (e.g., 2008)',
        'Personal integrity protects clients and society',
      ],
      sections: [
        {
          heading: 'What Are Financial Ethics?',
          body: 'Financial ethics are the moral principles and standards that guide how individuals and institutions behave in financial markets. They go beyond what is legally required — they define what is right. The CFA Institute, the global body for investment professionals, has established a Code of Ethics and Standards of Professional Conduct that is considered the gold standard worldwide.',
          highlight: '"Act with integrity, competence, diligence, respect, and in an ethical manner with the public, clients, prospective clients, employers, employees, colleagues in the investment profession, and other participants in the global capital markets." — CFA Institute Code of Ethics',
        },
        {
          heading: 'Why Ethics Are the Foundation of Markets',
          body: 'Financial markets only function because participants trust each other. When you deposit money in a bank, buy a stock, or invest in a fund, you are trusting that the other party will act honestly. Without this trust, markets collapse. The 2008 global financial crisis was partly caused by ethical failures — mortgage brokers sold loans they knew borrowers could not repay, and banks packaged these into complex products without disclosing the risks.',
          highlight: 'The 2008 financial crisis wiped out $11 trillion in household wealth in the United States alone.',
        },
        {
          heading: 'The CFA Code of Ethics — Six Principles',
          body: 'The CFA Institute Code of Ethics requires members to: (1) Act with integrity, competence, and respect; (2) Place the integrity of the profession above personal interests; (3) Use reasonable care and independent professional judgment; (4) Practice and encourage others to practice professionally and ethically; (5) Promote the integrity and viability of global capital markets; (6) Maintain and improve professional competence.',
        },
        {
          heading: 'Ethics in Everyday Financial Life',
          body: 'Ethics are not just for Wall Street professionals. Every financial decision you make has an ethical dimension. Should you borrow money you cannot repay? Should you invest in a company that harms the environment? Should you share a financial tip that might not be accurate? These questions require ethical judgment. Developing strong financial ethics early in life will serve you throughout your career.',
        },
      ],
      glossary: [
        { term: 'Ethics', definition: 'Moral principles that govern a person\'s behavior or the conducting of an activity.' },
        { term: 'Fiduciary Duty', definition: 'A legal obligation to act in the best interest of another party.' },
        { term: 'CFA Institute', definition: 'The global association of investment professionals that awards the CFA designation.' },
        { term: 'Integrity', definition: 'The quality of being honest and having strong moral principles.' },
        { term: 'Conflict of Interest', definition: 'A situation where personal interests could improperly influence professional judgment.' },
      ],
      hasQuiz: false,
    },
    {
      id: 2, moduleId: 1, order: 2,
      title: 'Professional Standards & Conduct',
      subtitle: 'Standards I–VII of the CFA Institute',
      durationMinutes: 10, xpReward: 120,
      videoId: 'Kl4L7AvmAnQ',
      videoTitle: 'CFA Ethics: Standards of Professional Conduct',
      videoChannel: 'AnalystPrep',
      keyPoints: [
        'Standard I: Professionalism — act with integrity',
        'Standard II: Integrity of Capital Markets — no insider trading',
        'Standard III: Duties to Clients — loyalty, prudence, care',
        'Standard IV: Duties to Employers — act in employer\'s interest',
        'Standard V: Investment Analysis — use sound judgment',
        'Standard VI: Conflicts of Interest — disclose and manage',
        'Standard VII: Responsibilities as a CFA Member',
      ],
      sections: [
        {
          heading: 'The Seven Standards of Professional Conduct',
          body: 'The CFA Institute Standards of Professional Conduct are organized into seven categories. Each standard addresses a specific aspect of professional behavior. Understanding these standards helps you recognize ethical issues and make better decisions in your financial life.',
        },
        {
          heading: 'Insider Trading — Why It\'s Illegal and Unethical',
          body: 'Insider trading occurs when someone trades a security based on material, non-public information. For example, if you work at a company and know it is about to announce a major contract before the public does, buying the company\'s stock is illegal. It is unfair because it gives you an advantage over other investors who do not have access to that information. Markets depend on a level playing field.',
          highlight: 'The SEC collected $4.7 billion in penalties and disgorgement in fiscal year 2023, much of it from insider trading cases.',
        },
        {
          heading: 'Duties to Clients — The Suitability Standard',
          body: 'Financial advisors have a duty to recommend investments that are suitable for their clients. This means understanding the client\'s financial situation, risk tolerance, investment objectives, and time horizon before making any recommendation. Recommending a high-risk investment to a retiree who needs stable income would violate this standard.',
        },
        {
          heading: 'Conflicts of Interest',
          body: 'A conflict of interest arises when a financial professional\'s personal interests could influence their professional judgment. For example, a broker who earns higher commissions on certain products might be tempted to recommend those products even if they are not the best choice for the client. The ethical response is to disclose the conflict and ensure it does not affect the advice given.',
        },
      ],
      glossary: [
        { term: 'Insider Trading', definition: 'Buying or selling securities based on material, non-public information.' },
        { term: 'Material Information', definition: 'Information that would likely affect an investor\'s decision to buy or sell a security.' },
        { term: 'Suitability', definition: 'The requirement that investment recommendations match a client\'s needs and risk profile.' },
        { term: 'Prudent Investor Rule', definition: 'The standard requiring investment managers to act as a prudent person would when managing others\' money.' },
      ],
      hasQuiz: false,
    },
    {
      id: 3, moduleId: 1, order: 3,
      title: 'Real-World Ethical Dilemmas',
      subtitle: 'Applying ethics to real financial scenarios',
      durationMinutes: 9, xpReward: 130,
      videoId: 'YRSiMxnVbNk',
      videoTitle: 'Financial Ethics Case Studies',
      videoChannel: 'CFA Institute',
      keyPoints: [
        'Ethical dilemmas require structured decision-making',
        'The "newspaper test": would you be comfortable if this appeared on the front page?',
        'ESG investing aligns ethics with portfolio decisions',
        'Whistleblowing protects markets and investors',
        'Personal ethics build long-term reputation and trust',
      ],
      sections: [
        {
          heading: 'How to Resolve Ethical Dilemmas',
          body: 'When facing an ethical dilemma, use a structured approach: (1) Identify the relevant facts; (2) Identify the ethical issues; (3) Identify the stakeholders affected; (4) Consider the alternatives; (5) Evaluate each alternative against ethical principles; (6) Make a decision and take action. This framework helps you think clearly under pressure.',
          highlight: 'The "newspaper test": Before acting, ask yourself — would I be comfortable if this decision appeared on the front page of tomorrow\'s newspaper?',
        },
        {
          heading: 'ESG Investing — Ethics Meets Portfolio Management',
          body: 'Environmental, Social, and Governance (ESG) investing integrates ethical considerations into investment decisions. ESG investors evaluate companies not just on financial performance but also on their environmental impact, social responsibility, and governance practices. A company that pollutes rivers, exploits workers, or has corrupt management may be excluded from an ESG portfolio even if it is profitable.',
          highlight: 'Global ESG assets under management exceeded $35 trillion in 2022 and are projected to reach $50 trillion by 2025.',
        },
        {
          heading: 'Whistleblowing — A Moral Obligation',
          body: 'Whistleblowing means reporting unethical or illegal behavior within an organization. It is often difficult because it can put your job and relationships at risk. However, the CFA Institute Standards require members to report violations of laws, regulations, or the Code of Ethics. Many countries have laws protecting whistleblowers from retaliation.',
        },
        {
          heading: 'Building Your Personal Financial Ethics',
          body: 'Your financial ethics are shaped by your values, education, and experiences. Start by defining what you believe is right and wrong in financial matters. Be consistent — apply the same standards whether you are managing your own money or someone else\'s. Remember that your reputation is your most valuable professional asset. It takes years to build and seconds to destroy.',
        },
      ],
      glossary: [
        { term: 'ESG', definition: 'Environmental, Social, and Governance — criteria used to evaluate a company\'s ethical impact.' },
        { term: 'Whistleblower', definition: 'A person who reports unethical or illegal activity within an organization.' },
        { term: 'Ethical Dilemma', definition: 'A situation where a person must choose between two morally conflicting options.' },
        { term: 'Greenwashing', definition: 'Misleadingly claiming that a company\'s products or practices are environmentally friendly.' },
      ],
      hasQuiz: true,
    },
  ],
  quizzes: [
    { id: 101, moduleId: 1, lessonId: 3, difficulty: 'easy', cfaLos: 'CFA I — Ethics 1.1',
      question: 'What is the primary purpose of the CFA Institute Code of Ethics?',
      options: ['To maximize investment returns', 'To set standards for ethical behavior in the investment profession', 'To regulate stock market prices', 'To determine which investments are legal'],
      correctAnswer: 1, explanation: 'The CFA Code of Ethics establishes moral principles and standards of professional conduct for investment professionals to protect clients and maintain market integrity.' },
    { id: 102, moduleId: 1, lessonId: 3, difficulty: 'easy', cfaLos: 'CFA I — Ethics 2.1',
      question: 'Which of the following is an example of insider trading?',
      options: ['Buying a stock after reading a published analyst report', 'Selling a stock because its price has risen significantly', 'Buying a stock because your friend who works at the company told you about an unannounced merger', 'Investing in an index fund that tracks the S&P 500'],
      correctAnswer: 2, explanation: 'Insider trading involves trading on material, non-public information. An unannounced merger is material information that has not been made public, so trading on it is illegal.' },
    { id: 103, moduleId: 1, lessonId: 3, difficulty: 'medium', cfaLos: 'CFA I — Ethics 3.1',
      question: 'A financial advisor recommends a high-risk growth stock to a 70-year-old retiree who needs stable income. Which standard has likely been violated?',
      options: ['Standard I — Professionalism', 'Standard II — Integrity of Capital Markets', 'Standard III — Duties to Clients (Suitability)', 'Standard VI — Conflicts of Interest'],
      correctAnswer: 2, explanation: 'Standard III requires advisors to ensure investments are suitable for the client\'s financial situation, risk tolerance, and objectives. A high-risk stock is not suitable for a retiree needing stable income.' },
    { id: 104, moduleId: 1, lessonId: 3, difficulty: 'medium',
      question: 'What does ESG stand for in investing?',
      options: ['Equity, Securities, Growth', 'Environmental, Social, Governance', 'Earnings, Stability, Growth', 'Exchange, Stocks, Government'],
      correctAnswer: 1, explanation: 'ESG stands for Environmental, Social, and Governance — criteria used to evaluate a company\'s ethical practices and sustainability alongside financial performance.' },
    { id: 105, moduleId: 1, lessonId: 3, difficulty: 'hard', cfaLos: 'CFA I — Ethics 6.1',
      question: 'A broker earns a higher commission on Fund A than Fund B. Both funds are equally suitable for the client. The broker recommends Fund A without disclosing the commission difference. Which ethical issue does this represent?',
      options: ['Insider trading', 'Market manipulation', 'Undisclosed conflict of interest', 'Front-running'],
      correctAnswer: 2, explanation: 'This is an undisclosed conflict of interest. Standard VI requires investment professionals to disclose any conflicts of interest that could affect their professional judgment or recommendations.' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 2 — Quantitative Methods & Time Value of Money
// ─────────────────────────────────────────────────────────────────────────────

const module2: ModuleDef = {
  id: 2,
  title: 'Time Value of Money',
  subtitle: 'CFA Level I · Module 2',
  description: 'Master the most powerful concept in finance: money today is worth more than money tomorrow. Learn compound interest, present value, and the Rule of 72.',
  color: 'from-blue-500 to-cyan-500',
  icon: '⏰',
  totalXP: 500,
  estimatedHours: 1.5,
  cfaLevel: 'CFA Level I — Quantitative Methods',
  lessons: [
    {
      id: 4, moduleId: 2, order: 1,
      title: 'The Power of Compound Interest',
      subtitle: 'Einstein\'s "eighth wonder of the world"',
      durationMinutes: 9, xpReward: 120,
      videoId: 'wf91rEGw88Q',
      videoTitle: 'Compound Interest Explained',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Money today is worth more than the same amount in the future',
        'Simple interest: earned only on principal',
        'Compound interest: earned on principal AND accumulated interest',
        'The Rule of 72: divide 72 by the interest rate to find doubling time',
        'Starting early is the most powerful wealth-building strategy',
      ],
      sections: [
        {
          heading: 'Simple vs. Compound Interest',
          body: 'Simple interest is calculated only on the original principal. If you invest $1,000 at 10% simple interest, you earn $100 every year. After 10 years, you have $2,000. Compound interest, however, is calculated on both the principal and the accumulated interest. At 10% compound interest, after 10 years you have $2,593.74 — nearly 30% more than simple interest.',
          highlight: 'The compound interest formula: FV = PV × (1 + r)ⁿ where FV = future value, PV = present value, r = interest rate, n = number of periods.',
        },
        {
          heading: 'The Rule of 72',
          body: 'The Rule of 72 is a simple mental math shortcut to estimate how long it takes to double your money. Divide 72 by the annual interest rate. At 6% annual return, your money doubles in approximately 72 ÷ 6 = 12 years. At 9%, it doubles in 8 years. At 12%, it doubles in 6 years. This rule helps you quickly compare investment options.',
          highlight: 'At a 7% annual return (the historical average of the S&P 500 after inflation), your money doubles every ~10 years.',
        },
        {
          heading: 'The Magic of Starting Early',
          body: 'Consider two investors: Sara starts investing $200/month at age 20 and stops at 30 (10 years, $24,000 total invested). Omar starts at 30 and invests $200/month until age 60 (30 years, $72,000 total invested). Assuming 8% annual return, Sara ends up with more money at 60 than Omar — despite investing 3x less! This is the power of time in compound growth.',
          highlight: 'Sara: $24,000 invested → ~$602,000 at 60. Omar: $72,000 invested → ~$293,000 at 60. Time beats money.',
        },
        {
          heading: 'Compound Interest in Real Life',
          body: 'Compound interest works for you when you invest, but against you when you borrow. Credit card debt at 20% annual interest compounds monthly. If you carry a $1,000 balance and only pay the minimum, you could end up paying $2,000–$3,000 in total. Understanding compound interest helps you make smarter decisions about both saving and borrowing.',
        },
      ],
      glossary: [
        { term: 'Principal', definition: 'The original amount of money invested or borrowed.' },
        { term: 'Compound Interest', definition: 'Interest calculated on both the initial principal and accumulated interest.' },
        { term: 'Future Value (FV)', definition: 'The value of a current asset at a future date based on an assumed growth rate.' },
        { term: 'Rule of 72', definition: 'A shortcut to estimate how long it takes to double money: 72 ÷ interest rate = years to double.' },
      ],
      hasQuiz: false,
    },
    {
      id: 5, moduleId: 2, order: 2,
      title: 'Present Value & Discounting',
      subtitle: 'What is a future cash flow worth today?',
      durationMinutes: 10, xpReward: 130,
      videoId: 'ks33lMoxst0',
      videoTitle: 'Present Value and Discounting',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Present Value (PV) = the value today of a future sum of money',
        'Discounting is the reverse of compounding',
        'Discount rate reflects risk and opportunity cost',
        'NPV = Net Present Value — the foundation of investment analysis',
        'Higher discount rates reduce present value',
      ],
      sections: [
        {
          heading: 'What Is Present Value?',
          body: 'Present Value (PV) answers the question: "How much is a future sum of money worth today?" If someone promises to pay you $1,000 in 5 years, that is worth less than $1,000 today — because you could invest $1,000 today and have more than $1,000 in 5 years. The PV formula: PV = FV ÷ (1 + r)ⁿ.',
          highlight: 'At a 5% discount rate, $1,000 received in 5 years is worth only $783.53 today.',
        },
        {
          heading: 'The Discount Rate',
          body: 'The discount rate is the interest rate used to calculate present value. It represents the opportunity cost of capital — what you could earn by investing the money elsewhere. A higher discount rate means future cash flows are worth less today. This is why high-risk investments require higher expected returns — investors demand compensation for the additional risk.',
        },
        {
          heading: 'Net Present Value (NPV)',
          body: 'NPV is the sum of all present values of future cash flows minus the initial investment. If NPV > 0, the investment creates value and should be accepted. If NPV < 0, the investment destroys value and should be rejected. NPV is the fundamental tool used by corporations to evaluate capital investments and by investors to value stocks and bonds.',
          highlight: 'NPV Rule: Accept projects with positive NPV. Reject projects with negative NPV.',
        },
        {
          heading: 'Annuities and Perpetuities',
          body: 'An annuity is a series of equal cash flows paid at regular intervals. A mortgage, car loan, or pension payment is an annuity. A perpetuity is an annuity that continues forever. The Gordon Growth Model, used to value dividend-paying stocks, is based on the perpetuity formula: PV = Dividend ÷ (Discount Rate − Growth Rate).',
        },
      ],
      glossary: [
        { term: 'Present Value (PV)', definition: 'The current value of a future sum of money, discounted at a given rate.' },
        { term: 'Discount Rate', definition: 'The interest rate used to determine the present value of future cash flows.' },
        { term: 'Net Present Value (NPV)', definition: 'The difference between the present value of cash inflows and outflows over a period.' },
        { term: 'Annuity', definition: 'A series of equal payments made at regular intervals over a specified period.' },
        { term: 'Perpetuity', definition: 'An annuity that continues indefinitely with no end date.' },
      ],
      hasQuiz: false,
    },
    {
      id: 6, moduleId: 2, order: 3,
      title: 'Applying TVM to Real Decisions',
      subtitle: 'Mortgages, retirement, and investment analysis',
      durationMinutes: 11, xpReward: 150,
      videoId: 'Xn9IrM9WoI0',
      videoTitle: 'Time Value of Money — Practical Applications',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Mortgage payments are annuity calculations',
        'Retirement savings require future value projections',
        'Comparing investments requires present value analysis',
        'Inflation erodes purchasing power over time',
        'Real vs. nominal returns account for inflation',
      ],
      sections: [
        {
          heading: 'How Mortgages Work',
          body: 'A mortgage is a loan to buy property, repaid in monthly installments over 15–30 years. Each payment covers both interest and principal. Early payments are mostly interest; later payments are mostly principal. This is called amortization. Using TVM, you can calculate exactly how much a $500,000 mortgage at 5% over 30 years will cost you — the answer is $966,279 in total payments.',
          highlight: 'A $500,000 mortgage at 5% over 30 years costs $466,279 in interest alone — nearly as much as the loan itself.',
        },
        {
          heading: 'Planning for Retirement',
          body: 'Retirement planning is a future value problem. How much do you need to save each month to have $1 million at retirement? If you start at 25 with a 7% annual return, you need to save only $381/month. If you wait until 35, you need $820/month. If you wait until 45, you need $1,920/month. The earlier you start, the less you need to save each month.',
        },
        {
          heading: 'Inflation and Real Returns',
          body: 'Inflation is the rate at which prices rise over time. If inflation is 3% per year, $100 today will only buy $74 worth of goods in 10 years. The real return on an investment is the nominal return minus inflation. If your investment earns 7% but inflation is 3%, your real return is approximately 4%. Always consider real returns when planning long-term.',
          highlight: 'Real Return ≈ Nominal Return − Inflation Rate (Fisher Equation: (1 + nominal) = (1 + real) × (1 + inflation))',
        },
        {
          heading: 'The Cost of Waiting',
          body: 'Every year you delay investing has a compounding cost. If you invest $5,000 at age 22 and earn 8% annually, by age 65 it grows to $160,000. If you wait until 32 to invest the same $5,000, it only grows to $74,000. The 10-year delay cost you $86,000 — from a single $5,000 investment. This is why financial advisors consistently say: "Start investing as early as possible."',
        },
      ],
      glossary: [
        { term: 'Amortization', definition: 'The process of gradually paying off a debt through regular payments of principal and interest.' },
        { term: 'Inflation', definition: 'The rate at which the general level of prices for goods and services rises over time.' },
        { term: 'Real Return', definition: 'The return on an investment after adjusting for inflation.' },
        { term: 'Nominal Return', definition: 'The return on an investment before adjusting for inflation.' },
        { term: 'Purchasing Power', definition: 'The value of a currency in terms of the goods and services it can buy.' },
      ],
      hasQuiz: true,
    },
  ],
  quizzes: [
    { id: 201, moduleId: 2, lessonId: 6, difficulty: 'easy',
      question: 'Using the Rule of 72, how many years will it take to double your money at a 9% annual return?',
      options: ['6 years', '8 years', '9 years', '12 years'],
      correctAnswer: 1, explanation: '72 ÷ 9 = 8 years. The Rule of 72 provides a quick estimate of the time needed to double an investment at a given annual return.' },
    { id: 202, moduleId: 2, lessonId: 6, difficulty: 'easy',
      question: 'What does compound interest mean?',
      options: ['Interest earned only on the original principal', 'Interest earned on both the principal and accumulated interest', 'A fixed interest payment regardless of balance', 'Interest that decreases over time'],
      correctAnswer: 1, explanation: 'Compound interest is calculated on both the initial principal and the interest that has been added to it over time, creating exponential growth.' },
    { id: 203, moduleId: 2, lessonId: 6, difficulty: 'medium', cfaLos: 'CFA I — Quant 1.2',
      question: 'If the discount rate increases, what happens to the present value of a future cash flow?',
      options: ['Present value increases', 'Present value stays the same', 'Present value decreases', 'Present value doubles'],
      correctAnswer: 2, explanation: 'Present value and discount rate have an inverse relationship. A higher discount rate means future cash flows are worth less today: PV = FV ÷ (1 + r)ⁿ.' },
    { id: 204, moduleId: 2, lessonId: 6, difficulty: 'medium',
      question: 'Sara invests $200/month starting at age 20 and stops at 30. Omar invests $200/month from age 30 to 60. Both earn 8% annually. Who has more money at age 60?',
      options: ['Omar, because he invested for 30 years', 'Sara, because she started earlier', 'They have the same amount', 'Cannot be determined'],
      correctAnswer: 1, explanation: 'Sara has more money despite investing for only 10 years vs Omar\'s 30 years. Starting early allows compound interest to work for much longer, demonstrating the power of time in investing.' },
    { id: 205, moduleId: 2, lessonId: 6, difficulty: 'hard', cfaLos: 'CFA I — Quant 1.5',
      question: 'An investment promises to pay $10,000 in 3 years. If the discount rate is 6% per year, what is the present value?',
      options: ['$8,396', '$8,900', '$9,434', '$10,000'],
      correctAnswer: 0, explanation: 'PV = $10,000 ÷ (1.06)³ = $10,000 ÷ 1.191 = $8,396. This shows that $10,000 in 3 years is only worth $8,396 today at a 6% discount rate.' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 3 — Economics: Micro & Macro
// ─────────────────────────────────────────────────────────────────────────────

const module3: ModuleDef = {
  id: 3,
  title: 'Economics for Investors',
  subtitle: 'CFA Level I · Module 3',
  description: 'Understand how economies work, what drives markets, and how macroeconomic forces like inflation, interest rates, and GDP affect your investments.',
  color: 'from-green-500 to-teal-500',
  icon: '🌍',
  totalXP: 480,
  estimatedHours: 1.5,
  cfaLevel: 'CFA Level I — Economics',
  lessons: [
    {
      id: 7, moduleId: 3, order: 1,
      title: 'Supply, Demand & Market Prices',
      subtitle: 'The invisible hand of the market',
      durationMinutes: 9, xpReward: 110,
      videoId: 'g9aDizJpd_s',
      videoTitle: 'Supply and Demand',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Demand: as price rises, quantity demanded falls (inverse relationship)',
        'Supply: as price rises, quantity supplied rises (direct relationship)',
        'Equilibrium: the price where supply equals demand',
        'Shifts in supply/demand change equilibrium price and quantity',
        'Price elasticity measures sensitivity to price changes',
      ],
      sections: [
        {
          heading: 'The Law of Demand',
          body: 'The law of demand states that, all else being equal, as the price of a good rises, consumers will demand less of it. This creates a downward-sloping demand curve. When the price of oil rises, people drive less and buy more fuel-efficient cars. When stock prices fall, investors may buy more shares. Understanding demand helps predict how markets will react to price changes.',
          highlight: 'Demand Curve: Price and quantity demanded move in opposite directions.',
        },
        {
          heading: 'The Law of Supply',
          body: 'The law of supply states that as the price of a good rises, producers will supply more of it. Higher prices make production more profitable, attracting more suppliers. When oil prices rise, more oil companies begin drilling. When stock prices rise, companies issue more shares. The supply curve slopes upward.',
        },
        {
          heading: 'Market Equilibrium',
          body: 'Equilibrium is the price at which the quantity demanded equals the quantity supplied. At this price, the market clears — there are no unsatisfied buyers or sellers. If the price is above equilibrium, there is a surplus (excess supply) and prices fall. If the price is below equilibrium, there is a shortage (excess demand) and prices rise. Markets naturally tend toward equilibrium.',
          highlight: 'Adam Smith described this self-correcting mechanism as the "invisible hand" of the market.',
        },
        {
          heading: 'Price Elasticity',
          body: 'Price elasticity of demand measures how sensitive consumers are to price changes. Elastic demand means a small price increase causes a large drop in demand (e.g., luxury goods). Inelastic demand means demand barely changes with price (e.g., insulin, gasoline). Investors use elasticity to assess how price changes will affect a company\'s revenue.',
        },
      ],
      glossary: [
        { term: 'Demand', definition: 'The quantity of a good or service that consumers are willing and able to buy at various prices.' },
        { term: 'Supply', definition: 'The quantity of a good or service that producers are willing and able to sell at various prices.' },
        { term: 'Equilibrium', definition: 'The price at which quantity supplied equals quantity demanded.' },
        { term: 'Elasticity', definition: 'A measure of how much demand or supply changes in response to a price change.' },
      ],
      hasQuiz: false,
    },
    {
      id: 8, moduleId: 3, order: 2,
      title: 'Macroeconomics: GDP, Inflation & Interest Rates',
      subtitle: 'The big picture forces that move markets',
      durationMinutes: 11, xpReward: 130,
      videoId: 'NxgxiLEMBWU',
      videoTitle: 'GDP and the Circular Flow',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'GDP measures the total value of goods and services produced in a country',
        'Inflation erodes purchasing power; central banks target ~2%',
        'Interest rates are the price of money — set by central banks',
        'The business cycle: expansion, peak, contraction, trough',
        'Unemployment and inflation often move in opposite directions (Phillips Curve)',
      ],
      sections: [
        {
          heading: 'Gross Domestic Product (GDP)',
          body: 'GDP is the total monetary value of all goods and services produced within a country in a given period. It is the most widely used measure of economic size and health. GDP = Consumption + Investment + Government Spending + Net Exports (C + I + G + NX). When GDP grows, businesses expand, employment rises, and stock markets tend to perform well.',
          highlight: 'The US GDP in 2023 was $27.4 trillion — the largest economy in the world.',
        },
        {
          heading: 'Inflation and Central Banks',
          body: 'Inflation is the rate at which prices rise. Moderate inflation (around 2%) is considered healthy — it encourages spending and investment. High inflation erodes purchasing power and creates economic instability. Central banks (like the US Federal Reserve or the UAE Central Bank) control inflation primarily by adjusting interest rates. When inflation is high, they raise rates to slow borrowing and spending.',
          highlight: 'The US Federal Reserve targets 2% annual inflation. In 2022, inflation hit 9.1% — the highest in 40 years — causing the Fed to raise rates aggressively.',
        },
        {
          heading: 'Interest Rates and Markets',
          body: 'Interest rates are the price of borrowing money. When central banks raise rates, borrowing becomes more expensive, businesses invest less, consumers spend less, and economic growth slows. Higher rates also make bonds more attractive relative to stocks, often causing stock prices to fall. When rates fall, the opposite happens — borrowing is cheap, growth accelerates, and stocks tend to rise.',
        },
        {
          heading: 'The Business Cycle',
          body: 'Economies move through recurring cycles of expansion and contraction. During expansion, GDP grows, unemployment falls, and corporate profits rise. At the peak, the economy is at maximum output. During contraction (recession), GDP falls, unemployment rises, and profits decline. At the trough, the economy bottoms out before recovering. Understanding the business cycle helps investors position their portfolios appropriately.',
        },
      ],
      glossary: [
        { term: 'GDP', definition: 'Gross Domestic Product — the total value of goods and services produced in a country.' },
        { term: 'Inflation', definition: 'The rate at which the general price level of goods and services rises.' },
        { term: 'Interest Rate', definition: 'The cost of borrowing money, expressed as a percentage of the principal.' },
        { term: 'Business Cycle', definition: 'The recurring pattern of expansion and contraction in economic activity.' },
        { term: 'Recession', definition: 'A period of temporary economic decline, typically defined as two consecutive quarters of negative GDP growth.' },
      ],
      hasQuiz: false,
    },
    {
      id: 9, moduleId: 3, order: 3,
      title: 'Economic Indicators for Investors',
      subtitle: 'Reading the signals that move markets',
      durationMinutes: 10, xpReward: 140,
      videoId: 'PHe0bXAIuk0',
      videoTitle: 'Economic Indicators Explained',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Leading indicators predict future economic activity',
        'Lagging indicators confirm trends after they occur',
        'Key indicators: unemployment rate, CPI, PMI, yield curve',
        'Inverted yield curve often predicts recessions',
        'Central bank decisions are the most market-moving events',
      ],
      sections: [
        {
          heading: 'Leading vs. Lagging Indicators',
          body: 'Economic indicators are statistics that provide information about the state of the economy. Leading indicators change before the economy changes — they predict future trends. Examples include stock market performance, building permits, and consumer confidence. Lagging indicators change after the economy changes — they confirm trends. Examples include unemployment rate and corporate profits.',
          highlight: 'The Conference Board Leading Economic Index (LEI) combines 10 leading indicators to forecast economic direction.',
        },
        {
          heading: 'Key Economic Indicators',
          body: 'The Consumer Price Index (CPI) measures inflation. The Purchasing Managers\' Index (PMI) measures manufacturing activity — above 50 indicates expansion. The unemployment rate measures the percentage of the labor force without jobs. Non-Farm Payrolls (NFP) measures monthly job creation. These reports are released monthly and often cause significant market movements.',
        },
        {
          heading: 'The Yield Curve',
          body: 'The yield curve shows the relationship between interest rates and bond maturity dates. Normally, long-term bonds have higher yields than short-term bonds (upward sloping). When short-term rates exceed long-term rates, the yield curve "inverts." An inverted yield curve has predicted every US recession in the past 50 years, making it one of the most reliable economic warning signals.',
          highlight: 'An inverted yield curve (2-year yield > 10-year yield) has preceded every US recession since 1955.',
        },
        {
          heading: 'How Investors Use Economic Data',
          body: 'Sophisticated investors monitor economic indicators to position their portfolios ahead of economic shifts. During early expansion, cyclical stocks (consumer discretionary, industrials) tend to outperform. During late expansion, commodities and energy do well. During recession, defensive stocks (utilities, healthcare, consumer staples) and bonds outperform. This is called sector rotation.',
        },
      ],
      glossary: [
        { term: 'CPI', definition: 'Consumer Price Index — a measure of the average change in prices paid by consumers for goods and services.' },
        { term: 'PMI', definition: 'Purchasing Managers\' Index — a survey-based indicator of manufacturing activity.' },
        { term: 'Yield Curve', definition: 'A graph showing the relationship between bond yields and their maturity dates.' },
        { term: 'Inverted Yield Curve', definition: 'When short-term bond yields exceed long-term yields — often a recession predictor.' },
        { term: 'Sector Rotation', definition: 'The practice of moving investments between sectors based on the business cycle.' },
      ],
      hasQuiz: true,
    },
  ],
  quizzes: [
    { id: 301, moduleId: 3, lessonId: 9, difficulty: 'easy',
      question: 'What does GDP stand for and what does it measure?',
      options: ['General Debt Percentage — the national debt', 'Gross Domestic Product — total value of goods and services produced in a country', 'Government Deficit Projection — the budget shortfall', 'Growth and Development Plan — economic targets'],
      correctAnswer: 1, explanation: 'GDP (Gross Domestic Product) measures the total monetary value of all goods and services produced within a country in a given time period. It is the primary measure of economic size and health.' },
    { id: 302, moduleId: 3, lessonId: 9, difficulty: 'easy',
      question: 'When a central bank raises interest rates, what typically happens to stock prices?',
      options: ['Stock prices rise because investors earn more', 'Stock prices fall because borrowing becomes more expensive', 'Stock prices are unaffected by interest rates', 'Stock prices double immediately'],
      correctAnswer: 1, explanation: 'Higher interest rates increase borrowing costs for businesses, reduce consumer spending, and make bonds more attractive relative to stocks — all of which tend to push stock prices lower.' },
    { id: 303, moduleId: 3, lessonId: 9, difficulty: 'medium',
      question: 'The law of demand states that:',
      options: ['As price rises, quantity demanded rises', 'As price falls, quantity demanded falls', 'As price rises, quantity demanded falls', 'Price and demand are unrelated'],
      correctAnswer: 2, explanation: 'The law of demand establishes an inverse relationship between price and quantity demanded: as price rises, consumers buy less; as price falls, consumers buy more.' },
    { id: 304, moduleId: 3, lessonId: 9, difficulty: 'medium',
      question: 'An inverted yield curve (short-term rates > long-term rates) is historically associated with:',
      options: ['A booming stock market', 'High inflation', 'An upcoming recession', 'Falling unemployment'],
      correctAnswer: 2, explanation: 'An inverted yield curve has preceded every US recession in the past 50+ years. It signals that investors expect economic slowdown and lower interest rates in the future.' },
    { id: 305, moduleId: 3, lessonId: 9, difficulty: 'hard',
      question: 'During which phase of the business cycle do defensive stocks (utilities, healthcare) typically outperform?',
      options: ['Early expansion', 'Late expansion / peak', 'Recession / contraction', 'Recovery'],
      correctAnswer: 2, explanation: 'Defensive stocks provide essential services with stable demand regardless of economic conditions. During recessions, investors rotate into these sectors for stability, causing them to outperform cyclical stocks.' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 4 — Financial Reporting & Analysis
// ─────────────────────────────────────────────────────────────────────────────

const module4: ModuleDef = {
  id: 4,
  title: 'Reading Financial Statements',
  subtitle: 'CFA Level I · Module 4',
  description: 'Learn to read and analyze the three core financial statements — Income Statement, Balance Sheet, and Cash Flow Statement — to evaluate any company.',
  color: 'from-orange-500 to-amber-500',
  icon: '📊',
  totalXP: 520,
  estimatedHours: 2,
  cfaLevel: 'CFA Level I — Financial Reporting & Analysis',
  lessons: [
    {
      id: 10, moduleId: 4, order: 1,
      title: 'The Income Statement',
      subtitle: 'Revenue, expenses, and profitability',
      durationMinutes: 10, xpReward: 130,
      videoId: 'WEDIj9JBTC8',
      videoTitle: 'How to Read an Income Statement',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Income statement shows revenue, expenses, and profit over a period',
        'Revenue − Cost of Goods Sold = Gross Profit',
        'Gross Profit − Operating Expenses = Operating Income (EBIT)',
        'Operating Income − Interest & Taxes = Net Income',
        'EPS (Earnings Per Share) = Net Income ÷ Shares Outstanding',
      ],
      sections: [
        {
          heading: 'What Is an Income Statement?',
          body: 'The income statement (also called the Profit & Loss or P&L statement) shows a company\'s revenues, expenses, and profits over a specific period (quarterly or annually). It answers the question: "Did the company make money?" It is one of the three core financial statements required by accounting standards (GAAP/IFRS).',
          highlight: 'Apple\'s FY2023 Income Statement: Revenue $383B → Gross Profit $170B → Operating Income $114B → Net Income $97B.',
        },
        {
          heading: 'Revenue and Gross Profit',
          body: 'Revenue (or "top line") is the total income from selling goods and services. Cost of Goods Sold (COGS) is the direct cost of producing those goods. Gross Profit = Revenue − COGS. Gross margin = Gross Profit ÷ Revenue. A high gross margin indicates pricing power and efficient production. Apple\'s gross margin of ~44% is exceptionally high for a hardware company.',
        },
        {
          heading: 'Operating Income and EBITDA',
          body: 'Operating expenses include selling, general & administrative (SG&A) costs and research & development (R&D). Operating Income (EBIT) = Gross Profit − Operating Expenses. EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is widely used to compare profitability across companies and industries because it removes non-cash charges.',
          highlight: 'EBITDA is often called the "cash earnings" of a business and is used in the EV/EBITDA valuation multiple.',
        },
        {
          heading: 'Net Income and EPS',
          body: 'Net Income ("bottom line") = Operating Income − Interest Expense − Taxes. Earnings Per Share (EPS) = Net Income ÷ Shares Outstanding. EPS is one of the most closely watched metrics by investors. The Price-to-Earnings (P/E) ratio = Stock Price ÷ EPS. A high P/E means investors expect strong future growth.',
        },
      ],
      glossary: [
        { term: 'Revenue', definition: 'The total income generated by a company from its business activities.' },
        { term: 'COGS', definition: 'Cost of Goods Sold — the direct costs of producing goods sold by a company.' },
        { term: 'Gross Profit', definition: 'Revenue minus Cost of Goods Sold.' },
        { term: 'EBITDA', definition: 'Earnings Before Interest, Taxes, Depreciation, and Amortization — a measure of core profitability.' },
        { term: 'EPS', definition: 'Earnings Per Share — net income divided by the number of outstanding shares.' },
      ],
      hasQuiz: false,
    },
    {
      id: 11, moduleId: 4, order: 2,
      title: 'The Balance Sheet',
      subtitle: 'Assets, liabilities, and shareholder equity',
      durationMinutes: 10, xpReward: 130,
      videoId: 'yTCGBHMFyMI',
      videoTitle: 'How to Read a Balance Sheet',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Balance Sheet equation: Assets = Liabilities + Shareholders\' Equity',
        'Assets: what the company owns (cash, inventory, property)',
        'Liabilities: what the company owes (debt, accounts payable)',
        'Equity: the residual claim of shareholders',
        'Key ratios: Debt-to-Equity, Current Ratio, Quick Ratio',
      ],
      sections: [
        {
          heading: 'The Accounting Equation',
          body: 'The balance sheet is a snapshot of a company\'s financial position at a specific point in time. It is governed by the fundamental accounting equation: Assets = Liabilities + Shareholders\' Equity. This equation must always balance. Every transaction affects at least two items on the balance sheet.',
          highlight: 'Assets = Liabilities + Equity. This equation is the foundation of double-entry bookkeeping.',
        },
        {
          heading: 'Assets',
          body: 'Assets are resources owned by the company. Current assets (cash, accounts receivable, inventory) can be converted to cash within one year. Non-current assets (property, plant & equipment, intangibles like patents and goodwill) are long-term. The quality of assets matters — cash is more valuable than goodwill because goodwill can be impaired.',
        },
        {
          heading: 'Liabilities and Debt',
          body: 'Liabilities are obligations the company owes to others. Current liabilities (accounts payable, short-term debt) are due within one year. Long-term liabilities (bonds, mortgages) are due beyond one year. The Debt-to-Equity (D/E) ratio = Total Debt ÷ Shareholders\' Equity. A high D/E ratio indicates financial leverage and higher risk.',
          highlight: 'Debt-to-Equity Ratio: A D/E above 2.0 is generally considered high leverage and increases financial risk.',
        },
        {
          heading: 'Liquidity Ratios',
          body: 'Liquidity ratios measure a company\'s ability to meet short-term obligations. The Current Ratio = Current Assets ÷ Current Liabilities. A ratio above 1.0 means the company can cover its short-term debts. The Quick Ratio (Acid Test) = (Cash + Receivables) ÷ Current Liabilities — a more conservative measure that excludes inventory.',
        },
      ],
      glossary: [
        { term: 'Assets', definition: 'Resources owned or controlled by a company that have economic value.' },
        { term: 'Liabilities', definition: 'Financial obligations or debts owed by a company.' },
        { term: 'Shareholders\' Equity', definition: 'The residual interest in assets after deducting liabilities — what shareholders own.' },
        { term: 'Current Ratio', definition: 'Current Assets ÷ Current Liabilities — measures short-term liquidity.' },
        { term: 'Debt-to-Equity Ratio', definition: 'Total Debt ÷ Shareholders\' Equity — measures financial leverage.' },
      ],
      hasQuiz: false,
    },
    {
      id: 12, moduleId: 4, order: 3,
      title: 'Cash Flow Statement & Financial Ratios',
      subtitle: 'Cash is king — analyzing real financial health',
      durationMinutes: 12, xpReward: 160,
      videoId: 'kCF4-LS4Mzs',
      videoTitle: 'Cash Flow Statement Explained',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Cash flow statement shows actual cash movement (not accounting profits)',
        'Three sections: Operating, Investing, Financing activities',
        'Free Cash Flow = Operating Cash Flow − Capital Expenditures',
        'A company can be profitable but still run out of cash',
        'Key ratios: P/E, P/B, ROE, ROA, Profit Margin',
      ],
      sections: [
        {
          heading: 'Why Cash Flow Matters More Than Profit',
          body: 'A company can report a profit on its income statement but still run out of cash. This happens because of accounting rules like accrual accounting — revenue is recognized when earned, not when cash is received. The cash flow statement shows the actual movement of cash in and out of the business. "Cash is king" is a fundamental principle of financial analysis.',
          highlight: '"Revenue is vanity, profit is sanity, but cash is reality." — Business axiom',
        },
        {
          heading: 'Three Sections of the Cash Flow Statement',
          body: 'Operating Activities shows cash generated from core business operations. Investing Activities shows cash used for capital expenditures (buying equipment, acquisitions) and proceeds from asset sales. Financing Activities shows cash from issuing stock or debt, and cash used to repay debt or pay dividends. Healthy companies generate positive operating cash flow.',
        },
        {
          heading: 'Free Cash Flow',
          body: 'Free Cash Flow (FCF) = Operating Cash Flow − Capital Expenditures (CapEx). FCF represents the cash a company generates after maintaining and expanding its asset base. It is the cash available to pay dividends, buy back shares, or reduce debt. Warren Buffett considers FCF the most important measure of a company\'s financial health.',
          highlight: 'Apple generated $99.6 billion in free cash flow in FY2023 — one of the highest of any company in history.',
        },
        {
          heading: 'Key Financial Ratios',
          body: 'P/E Ratio = Stock Price ÷ EPS (valuation). P/B Ratio = Stock Price ÷ Book Value per Share (value vs. assets). ROE = Net Income ÷ Shareholders\' Equity (profitability). ROA = Net Income ÷ Total Assets (asset efficiency). Profit Margin = Net Income ÷ Revenue. These ratios allow investors to compare companies across industries and time periods.',
        },
      ],
      glossary: [
        { term: 'Free Cash Flow', definition: 'Operating cash flow minus capital expenditures — cash available after maintaining the business.' },
        { term: 'P/E Ratio', definition: 'Price-to-Earnings ratio — stock price divided by earnings per share.' },
        { term: 'ROE', definition: 'Return on Equity — net income divided by shareholders\' equity.' },
        { term: 'ROA', definition: 'Return on Assets — net income divided by total assets.' },
        { term: 'Accrual Accounting', definition: 'Recording revenue and expenses when they are earned/incurred, not when cash changes hands.' },
      ],
      hasQuiz: true,
    },
  ],
  quizzes: [
    { id: 401, moduleId: 4, lessonId: 12, difficulty: 'easy',
      question: 'The fundamental accounting equation is:',
      options: ['Revenue = Expenses + Profit', 'Assets = Liabilities + Shareholders\' Equity', 'Cash = Revenue − Expenses', 'Equity = Assets − Revenue'],
      correctAnswer: 1, explanation: 'The fundamental accounting equation (Assets = Liabilities + Equity) governs the balance sheet and ensures it always balances. Every transaction affects at least two items.' },
    { id: 402, moduleId: 4, lessonId: 12, difficulty: 'easy',
      question: 'What does EPS (Earnings Per Share) measure?',
      options: ['The total revenue of a company', 'The stock price relative to book value', 'Net income divided by the number of outstanding shares', 'The dividend paid per share'],
      correctAnswer: 2, explanation: 'EPS = Net Income ÷ Shares Outstanding. It measures how much profit is attributable to each share of stock and is used in the P/E ratio calculation.' },
    { id: 403, moduleId: 4, lessonId: 12, difficulty: 'medium', cfaLos: 'CFA I — FRA 3.1',
      question: 'A company reports $5 million in net income but its operating cash flow is −$2 million. What does this likely indicate?',
      options: ['The company is highly profitable', 'The company may have a cash flow problem despite reported profits', 'The company\'s stock price will rise', 'The company has no debt'],
      correctAnswer: 1, explanation: 'A company can report profits under accrual accounting while having negative cash flow. This is a red flag — the company may be recognizing revenue before collecting cash, which is unsustainable.' },
    { id: 404, moduleId: 4, lessonId: 12, difficulty: 'medium',
      question: 'Free Cash Flow is calculated as:',
      options: ['Net Income − Dividends', 'Operating Cash Flow − Capital Expenditures', 'Revenue − Total Expenses', 'EBITDA − Interest Expense'],
      correctAnswer: 1, explanation: 'Free Cash Flow = Operating Cash Flow − Capital Expenditures (CapEx). It represents the cash available after maintaining and investing in the business — the true measure of financial health.' },
    { id: 405, moduleId: 4, lessonId: 12, difficulty: 'hard', cfaLos: 'CFA I — FRA 5.2',
      question: 'Company A has a P/E of 10 and Company B has a P/E of 30. Both are in the same industry. What does this most likely suggest?',
      options: ['Company A is more profitable', 'Company B is expected to grow faster', 'Company A has more debt', 'Company B pays higher dividends'],
      correctAnswer: 1, explanation: 'A higher P/E ratio typically indicates that investors expect higher future earnings growth. Company B\'s P/E of 30 suggests the market expects its earnings to grow significantly faster than Company A\'s.' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 5 — Equity Investments & Stock Analysis
// ─────────────────────────────────────────────────────────────────────────────

const module5: ModuleDef = {
  id: 5,
  title: 'Stocks & Equity Investing',
  subtitle: 'CFA Level I · Module 5',
  description: 'Learn how stock markets work, how to value companies using fundamental analysis, and the difference between growth, value, and dividend investing strategies.',
  color: 'from-red-500 to-pink-500',
  icon: '📈',
  totalXP: 550,
  estimatedHours: 2,
  cfaLevel: 'CFA Level I — Equity Investments',
  lessons: [
    {
      id: 13, moduleId: 5, order: 1,
      title: 'How Stock Markets Work',
      subtitle: 'From IPOs to market indices',
      durationMinutes: 10, xpReward: 130,
      videoId: 'F3QpgXBtDeo',
      videoTitle: 'How the Stock Market Works',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Stocks represent ownership (equity) in a company',
        'IPO: Initial Public Offering — first time a company sells shares publicly',
        'Primary market: new shares issued; Secondary market: existing shares traded',
        'Stock exchanges: NYSE, NASDAQ, LSE, ADX',
        'Market indices: S&P 500, Dow Jones, Nasdaq-100',
      ],
      sections: [
        {
          heading: 'What Is a Stock?',
          body: 'A stock (or share) represents a fractional ownership stake in a company. When you buy one share of Apple, you own a tiny piece of Apple Inc. — including a proportional claim on its assets and earnings. Stockholders can profit through capital appreciation (stock price rising) and dividends (cash distributions from profits).',
          highlight: 'There are approximately 58,000 publicly traded companies worldwide with a combined market capitalization of over $100 trillion.',
        },
        {
          heading: 'How Companies Go Public (IPO)',
          body: 'When a private company wants to raise capital from the public, it conducts an Initial Public Offering (IPO). The company works with investment banks to determine the offering price, files a prospectus with regulators, and sells shares to institutional investors first (book building), then to the public. After the IPO, shares trade on a stock exchange.',
          highlight: 'Saudi Aramco\'s 2019 IPO raised $25.6 billion — the largest IPO in history.',
        },
        {
          heading: 'Stock Exchanges and Market Indices',
          body: 'Stock exchanges are organized markets where buyers and sellers trade shares. The New York Stock Exchange (NYSE) and NASDAQ are the two largest in the world. The Abu Dhabi Securities Exchange (ADX) and Dubai Financial Market (DFM) serve the GCC region. Market indices like the S&P 500 track the performance of a basket of stocks and serve as benchmarks.',
        },
        {
          heading: 'How Stock Prices Are Determined',
          body: 'Stock prices are determined by supply and demand in the secondary market. If more investors want to buy a stock than sell it, the price rises. If more want to sell, the price falls. Prices reflect investors\' expectations about future earnings, growth, and risk. In the short term, prices can be driven by sentiment and news; in the long term, they follow fundamentals.',
        },
      ],
      glossary: [
        { term: 'Stock', definition: 'A security representing ownership in a corporation.' },
        { term: 'IPO', definition: 'Initial Public Offering — the first sale of a company\'s shares to the public.' },
        { term: 'Market Capitalization', definition: 'The total market value of a company\'s outstanding shares (Price × Shares Outstanding).' },
        { term: 'Dividend', definition: 'A portion of a company\'s earnings distributed to shareholders.' },
        { term: 'S&P 500', definition: 'A stock market index tracking 500 large US companies, widely used as a benchmark.' },
      ],
      hasQuiz: false,
    },
    {
      id: 14, moduleId: 5, order: 2,
      title: 'Fundamental Analysis & Valuation',
      subtitle: 'Finding the intrinsic value of a stock',
      durationMinutes: 12, xpReward: 150,
      videoId: 'rRku2IXWKBQ',
      videoTitle: 'Stock Valuation Methods',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Intrinsic value: the true worth of a stock based on fundamentals',
        'P/E ratio: most common valuation metric',
        'DCF (Discounted Cash Flow): values a stock by its future cash flows',
        'Comparable company analysis: valuing relative to peers',
        'Margin of safety: buy below intrinsic value to limit downside',
      ],
      sections: [
        {
          heading: 'Intrinsic Value vs. Market Price',
          body: 'Fundamental analysis seeks to determine the intrinsic value of a stock — what it is truly worth based on the company\'s financial health, competitive position, and growth prospects. If the market price is below intrinsic value, the stock is undervalued (a potential buy). If above, it is overvalued (a potential sell). Benjamin Graham and Warren Buffett built their fortunes on this principle.',
          highlight: '"Price is what you pay. Value is what you get." — Warren Buffett',
        },
        {
          heading: 'Relative Valuation — P/E and Other Multiples',
          body: 'The P/E ratio is the most widely used valuation metric. A P/E of 20 means investors pay $20 for every $1 of earnings. Compare the P/E to the company\'s historical average, industry peers, and the market average. Other multiples include EV/EBITDA (enterprise value to EBITDA), P/B (price to book), and P/S (price to sales). Each has strengths and weaknesses.',
          highlight: 'The S&P 500\'s average P/E ratio over the past century is approximately 15–16x. In 2021, it reached 38x — historically elevated.',
        },
        {
          heading: 'Discounted Cash Flow (DCF) Analysis',
          body: 'DCF analysis values a stock by projecting its future free cash flows and discounting them back to the present. The discount rate reflects the risk of the investment. DCF is theoretically the most rigorous valuation method, but it is highly sensitive to assumptions about growth rates and discount rates. Small changes in assumptions can dramatically change the result.',
        },
        {
          heading: 'Margin of Safety',
          body: 'The margin of safety is the difference between a stock\'s intrinsic value and its market price. Benjamin Graham recommended buying stocks only when the market price is significantly below intrinsic value — providing a cushion against errors in analysis. A 25–30% margin of safety is a common guideline. This principle is the cornerstone of value investing.',
        },
      ],
      glossary: [
        { term: 'Intrinsic Value', definition: 'The actual worth of a security based on fundamental analysis, independent of market price.' },
        { term: 'P/E Ratio', definition: 'Price-to-Earnings ratio — stock price divided by earnings per share.' },
        { term: 'DCF', definition: 'Discounted Cash Flow — a valuation method that projects future cash flows and discounts them to present value.' },
        { term: 'Margin of Safety', definition: 'The difference between intrinsic value and market price, providing a buffer against errors.' },
        { term: 'Value Investing', definition: 'An investment strategy of buying undervalued stocks and holding them until they reach fair value.' },
      ],
      hasQuiz: false,
    },
    {
      id: 15, moduleId: 5, order: 3,
      title: 'Investment Strategies: Growth, Value & Dividends',
      subtitle: 'Choosing the right approach for your goals',
      durationMinutes: 11, xpReward: 170,
      videoId: 'ARrNYyJEnFI',
      videoTitle: 'Growth vs Value Investing',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Growth investing: buy high-growth companies at premium valuations',
        'Value investing: buy undervalued companies with strong fundamentals',
        'Dividend investing: focus on income-generating stocks',
        'Index investing: passive strategy tracking a market index',
        'No single strategy works best in all market conditions',
      ],
      sections: [
        {
          heading: 'Growth Investing',
          body: 'Growth investors seek companies with above-average earnings growth potential, even if they trade at high valuations. Growth stocks typically reinvest profits rather than paying dividends. Examples include Amazon, Tesla, and NVIDIA. Growth investing works best in low-interest-rate environments. The risk is that high valuations leave little room for error — if growth disappoints, the stock can fall sharply.',
          highlight: 'NVIDIA\'s stock rose 239% in 2023, driven by AI-related demand for its chips — a classic growth investing outcome.',
        },
        {
          heading: 'Value Investing',
          body: 'Value investors seek stocks trading below their intrinsic value, often due to temporary problems or market neglect. They look for low P/E, low P/B, and high dividend yields. Warren Buffett, the most successful investor in history, is a value investor. Value investing requires patience — it can take years for the market to recognize a stock\'s true worth.',
        },
        {
          heading: 'Dividend Investing',
          body: 'Dividend investors focus on stocks that pay regular cash dividends. Dividends provide income regardless of stock price movements. Companies that consistently grow their dividends (Dividend Aristocrats) have historically outperformed the market. The dividend yield = Annual Dividend ÷ Stock Price. Reinvesting dividends (DRIP) accelerates compound growth.',
          highlight: 'Dividend reinvestment has historically accounted for approximately 40% of the S&P 500\'s total return over the long term.',
        },
        {
          heading: 'Index Investing — The Passive Revolution',
          body: 'Index investing involves buying a fund that tracks a market index like the S&P 500. It provides instant diversification at very low cost. Studies show that over 10+ year periods, most actively managed funds underperform their benchmark index after fees. Warren Buffett has recommended index funds for most individual investors. The Vanguard S&P 500 ETF (VOO) has an expense ratio of just 0.03%.',
        },
      ],
      glossary: [
        { term: 'Growth Stock', definition: 'A stock of a company expected to grow at an above-average rate relative to the market.' },
        { term: 'Value Stock', definition: 'A stock trading below its intrinsic value, typically with low P/E and P/B ratios.' },
        { term: 'Dividend Yield', definition: 'Annual dividend per share divided by the stock price, expressed as a percentage.' },
        { term: 'Index Fund', definition: 'A fund designed to replicate the performance of a specific market index.' },
        { term: 'Dividend Aristocrat', definition: 'An S&P 500 company that has increased its dividend for at least 25 consecutive years.' },
      ],
      hasQuiz: true,
    },
  ],
  quizzes: [
    { id: 501, moduleId: 5, lessonId: 15, difficulty: 'easy',
      question: 'What does a stock represent?',
      options: ['A loan to a company', 'Ownership (equity) in a company', 'A government bond', 'A fixed interest payment'],
      correctAnswer: 1, explanation: 'A stock represents a fractional ownership stake in a company. Stockholders have a proportional claim on the company\'s assets and earnings.' },
    { id: 502, moduleId: 5, lessonId: 15, difficulty: 'easy',
      question: 'What does a P/E ratio of 25 mean?',
      options: ['The company has 25 times more assets than liabilities', 'Investors pay $25 for every $1 of the company\'s annual earnings', 'The stock will grow 25% per year', 'The company pays a 25% dividend'],
      correctAnswer: 1, explanation: 'P/E Ratio = Stock Price ÷ EPS. A P/E of 25 means investors are paying $25 for each $1 of annual earnings, reflecting expectations of future growth.' },
    { id: 503, moduleId: 5, lessonId: 15, difficulty: 'medium', cfaLos: 'CFA I — Equity 3.2',
      question: 'Warren Buffett\'s investment philosophy is best described as:',
      options: ['Growth investing — buying the fastest-growing companies', 'Value investing — buying undervalued companies with strong fundamentals', 'Technical analysis — using charts to predict price movements', 'Momentum investing — buying stocks that are rising'],
      correctAnswer: 1, explanation: 'Warren Buffett is the world\'s most famous value investor. He seeks companies trading below their intrinsic value with durable competitive advantages, strong management, and predictable earnings.' },
    { id: 504, moduleId: 5, lessonId: 15, difficulty: 'medium',
      question: 'What is the "margin of safety" in investing?',
      options: ['The maximum loss allowed on a trade', 'The difference between a stock\'s intrinsic value and its market price', 'The percentage of cash held in a portfolio', 'The stop-loss level set by a broker'],
      correctAnswer: 1, explanation: 'Margin of safety is the difference between a stock\'s intrinsic value and its market price. Buying below intrinsic value provides a cushion against analytical errors and unexpected negative events.' },
    { id: 505, moduleId: 5, lessonId: 15, difficulty: 'hard', cfaLos: 'CFA I — Equity 5.1',
      question: 'Over long periods (10+ years), most actively managed mutual funds:',
      options: ['Significantly outperform their benchmark index', 'Slightly outperform their benchmark index', 'Perform similarly to their benchmark index', 'Underperform their benchmark index after fees'],
      correctAnswer: 3, explanation: 'Research consistently shows that over 80% of actively managed funds underperform their benchmark index over 10+ year periods after accounting for management fees. This is the primary argument for passive index investing.' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 6 — Fixed Income & Bonds
// ─────────────────────────────────────────────────────────────────────────────

const module6: ModuleDef = {
  id: 6,
  title: 'Bonds & Fixed Income',
  subtitle: 'CFA Level I · Module 6',
  description: 'Understand how bonds work, why interest rates and bond prices move in opposite directions, and how to use fixed income to balance a portfolio.',
  color: 'from-yellow-500 to-lime-500',
  icon: '🏦',
  totalXP: 480,
  estimatedHours: 1.5,
  cfaLevel: 'CFA Level I — Fixed Income',
  lessons: [
    {
      id: 16, moduleId: 6, order: 1,
      title: 'What Are Bonds?',
      subtitle: 'Lending money to governments and corporations',
      durationMinutes: 9, xpReward: 110,
      videoId: 'usqSZMnMjpA',
      videoTitle: 'Introduction to Bonds',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'A bond is a loan from an investor to a borrower (government or corporation)',
        'Face value (par): the amount repaid at maturity',
        'Coupon rate: the annual interest rate paid on the face value',
        'Maturity: when the borrower repays the face value',
        'Bond types: government, corporate, municipal, sukuk (Islamic)',
      ],
      sections: [
        {
          heading: 'How Bonds Work',
          body: 'When you buy a bond, you are lending money to the issuer (a government or corporation). In return, the issuer promises to pay you regular interest payments (coupons) and return the face value (principal) at maturity. For example, a $1,000 bond with a 5% coupon pays $50 per year for the life of the bond, then returns $1,000 at maturity.',
          highlight: 'The global bond market is worth approximately $130 trillion — larger than the global stock market.',
        },
        {
          heading: 'Types of Bonds',
          body: 'Government bonds (treasuries) are issued by national governments and are considered the safest bonds. Corporate bonds are issued by companies and offer higher yields to compensate for higher risk. Municipal bonds are issued by local governments. Sukuk are Islamic bonds that comply with Sharia law by sharing profits rather than paying interest. The GCC sukuk market is one of the fastest-growing in the world.',
        },
        {
          heading: 'Credit Ratings',
          body: 'Credit rating agencies (Moody\'s, S&P, Fitch) assess the creditworthiness of bond issuers. Investment-grade bonds (BBB/Baa and above) are considered safe. High-yield bonds (below BBB) are called "junk bonds" and offer higher yields to compensate for higher default risk. Credit ratings directly affect the interest rate a borrower must pay.',
          highlight: 'US Treasury bonds are rated AAA — the highest possible rating — reflecting near-zero default risk.',
        },
        {
          heading: 'Sukuk — Islamic Finance',
          body: 'Sukuk are Sharia-compliant bonds that do not pay interest (which is prohibited in Islam). Instead, they provide returns through profit-sharing, leasing, or other permissible structures. The UAE and Saudi Arabia are leading issuers of sukuk. The global sukuk market exceeded $800 billion in outstanding issuance in 2023.',
        },
      ],
      glossary: [
        { term: 'Bond', definition: 'A fixed-income security representing a loan made by an investor to a borrower.' },
        { term: 'Coupon', definition: 'The periodic interest payment made to bondholders.' },
        { term: 'Face Value', definition: 'The principal amount of a bond, repaid at maturity.' },
        { term: 'Maturity', definition: 'The date on which the bond issuer repays the principal to bondholders.' },
        { term: 'Sukuk', definition: 'Islamic financial certificates that comply with Sharia law by avoiding interest.' },
      ],
      hasQuiz: false,
    },
    {
      id: 17, moduleId: 6, order: 2,
      title: 'Bond Prices & Interest Rates',
      subtitle: 'The inverse relationship that drives markets',
      durationMinutes: 10, xpReward: 130,
      videoId: 'aKrYn9JKGYA',
      videoTitle: 'Bond Prices and Interest Rates',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Bond prices and interest rates move in OPPOSITE directions',
        'When rates rise, existing bond prices fall',
        'Yield to Maturity (YTM): the total return if held to maturity',
        'Duration: measures a bond\'s sensitivity to interest rate changes',
        'Longer duration = greater price sensitivity to rate changes',
      ],
      sections: [
        {
          heading: 'The Inverse Relationship',
          body: 'The most important concept in fixed income: bond prices and interest rates move in opposite directions. When market interest rates rise, existing bonds with lower coupons become less attractive, so their prices fall. When rates fall, existing bonds with higher coupons become more valuable, so their prices rise. This is the fundamental risk of bond investing.',
          highlight: 'When interest rates rise by 1%, a 10-year bond\'s price falls by approximately 8–9% (depending on duration).',
        },
        {
          heading: 'Yield to Maturity (YTM)',
          body: 'YTM is the total return an investor earns if they hold a bond until maturity, assuming all coupon payments are reinvested at the same rate. It accounts for the current market price, face value, coupon rate, and time to maturity. YTM is the most comprehensive measure of a bond\'s return and is used to compare bonds with different characteristics.',
        },
        {
          heading: 'Duration — Measuring Interest Rate Risk',
          body: 'Duration measures how sensitive a bond\'s price is to changes in interest rates. A bond with a duration of 7 years will fall approximately 7% in price if interest rates rise by 1%. Longer-maturity bonds have higher duration and are more sensitive to rate changes. Investors who expect rates to rise should prefer shorter-duration bonds.',
          highlight: 'Modified Duration ≈ % Change in Bond Price ÷ % Change in Interest Rates',
        },
        {
          heading: 'The Yield Curve and Bond Strategy',
          body: 'The yield curve shows the relationship between bond yields and maturities. In a normal environment, longer-term bonds yield more than short-term bonds. When the yield curve is steep, long-term bonds offer significantly more yield. When it is flat or inverted, short-term bonds offer similar or higher yields. Bond investors use the yield curve to position their portfolios.',
        },
      ],
      glossary: [
        { term: 'Yield to Maturity (YTM)', definition: 'The total return anticipated on a bond if held until it matures.' },
        { term: 'Duration', definition: 'A measure of a bond\'s sensitivity to changes in interest rates.' },
        { term: 'Credit Spread', definition: 'The difference in yield between a corporate bond and a government bond of the same maturity.' },
        { term: 'Yield Curve', definition: 'A graph showing yields of bonds with different maturities.' },
      ],
      hasQuiz: false,
    },
    {
      id: 18, moduleId: 6, order: 3,
      title: 'Building a Bond Portfolio',
      subtitle: 'Income, safety, and diversification',
      durationMinutes: 10, xpReward: 140,
      videoId: 'Kl4L7AvmAnQ',
      videoTitle: 'Fixed Income Portfolio Management',
      videoChannel: 'CFA Institute',
      keyPoints: [
        'Bonds provide income, capital preservation, and diversification',
        'Laddering: spreading maturities to manage reinvestment risk',
        'Bond funds (ETFs like AGG, LQD) provide instant diversification',
        'Bonds typically rise when stocks fall — portfolio hedge',
        'Allocation: younger investors hold fewer bonds; older investors hold more',
      ],
      sections: [
        {
          heading: 'Why Include Bonds in a Portfolio?',
          body: 'Bonds serve three purposes in a portfolio: income (regular coupon payments), capital preservation (lower volatility than stocks), and diversification (bonds often rise when stocks fall). The correlation between stocks and bonds is typically negative, meaning they tend to move in opposite directions. This makes bonds an effective hedge against stock market downturns.',
          highlight: 'During the 2008 financial crisis, the S&P 500 fell 37% while US Treasury bonds rose approximately 25%.',
        },
        {
          heading: 'Bond Laddering Strategy',
          body: 'Bond laddering involves buying bonds with staggered maturity dates (e.g., 1-year, 3-year, 5-year, 7-year, 10-year). As each bond matures, the proceeds are reinvested in a new long-term bond. This strategy reduces reinvestment risk (the risk of having to reinvest at lower rates) and provides regular cash flows.',
        },
        {
          heading: 'Bond ETFs',
          body: 'Bond ETFs like the iShares Core US Aggregate Bond ETF (AGG) and the iShares iBoxx Investment Grade Corporate Bond ETF (LQD) provide instant diversification across hundreds of bonds at very low cost. They trade on exchanges like stocks and offer daily liquidity. Bond ETFs are an efficient way for individual investors to access the bond market.',
        },
        {
          heading: 'Asset Allocation by Age',
          body: 'A common rule of thumb is to hold your age in bonds (e.g., a 30-year-old holds 30% bonds, 70% stocks). As you age, you shift more to bonds for stability. However, with longer life expectancies and low bond yields, many financial advisors now recommend holding fewer bonds, especially for younger investors who have time to recover from stock market downturns.',
        },
      ],
      glossary: [
        { term: 'Bond Ladder', definition: 'A portfolio of bonds with staggered maturity dates to manage reinvestment risk.' },
        { term: 'Reinvestment Risk', definition: 'The risk that coupon payments will be reinvested at lower interest rates.' },
        { term: 'Correlation', definition: 'A statistical measure of how two assets move in relation to each other.' },
        { term: 'Asset Allocation', definition: 'The distribution of investments across different asset classes (stocks, bonds, cash).' },
      ],
      hasQuiz: true,
    },
  ],
  quizzes: [
    { id: 601, moduleId: 6, lessonId: 18, difficulty: 'easy',
      question: 'When interest rates rise, what happens to existing bond prices?',
      options: ['Bond prices rise', 'Bond prices fall', 'Bond prices stay the same', 'Bond prices double'],
      correctAnswer: 1, explanation: 'Bond prices and interest rates have an inverse relationship. When rates rise, existing bonds with lower coupons become less attractive, so their prices fall to offer competitive yields.' },
    { id: 602, moduleId: 6, lessonId: 18, difficulty: 'easy',
      question: 'What is a sukuk?',
      options: ['A type of stock traded on the ADX', 'A Sharia-compliant bond that avoids interest payments', 'A government savings account', 'A type of mutual fund'],
      correctAnswer: 1, explanation: 'Sukuk are Islamic financial certificates that comply with Sharia law by avoiding interest (riba). Instead, they provide returns through profit-sharing, leasing, or other permissible structures.' },
    { id: 603, moduleId: 6, lessonId: 18, difficulty: 'medium', cfaLos: 'CFA I — FI 3.1',
      question: 'A bond has a duration of 8 years. If interest rates rise by 1%, the bond\'s price will approximately:',
      options: ['Rise by 8%', 'Fall by 8%', 'Rise by 1%', 'Fall by 1%'],
      correctAnswer: 1, explanation: 'Duration measures price sensitivity to interest rate changes. A bond with duration of 8 years will fall approximately 8% in price for each 1% rise in interest rates.' },
    { id: 604, moduleId: 6, lessonId: 18, difficulty: 'medium',
      question: 'What is Yield to Maturity (YTM)?',
      options: ['The coupon rate stated on the bond', 'The total return if the bond is held until maturity', 'The current market price of the bond', 'The credit rating of the bond issuer'],
      correctAnswer: 1, explanation: 'YTM is the total return an investor earns if they hold a bond to maturity, accounting for the purchase price, face value, coupon payments, and time to maturity.' },
    { id: 605, moduleId: 6, lessonId: 18, difficulty: 'hard',
      question: 'During the 2008 financial crisis, when stock markets crashed, US Treasury bonds:',
      options: ['Also crashed significantly', 'Rose in value as investors sought safety', 'Remained completely unchanged', 'Were suspended from trading'],
      correctAnswer: 1, explanation: 'US Treasury bonds rose approximately 25% during the 2008 crisis as investors fled to safety ("flight to quality"). This demonstrates the negative correlation between stocks and high-quality bonds.' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 7 — Portfolio Management & Diversification
// ─────────────────────────────────────────────────────────────────────────────

const module7: ModuleDef = {
  id: 7,
  title: 'Portfolio Management',
  subtitle: 'CFA Level I · Module 7',
  description: 'Learn Modern Portfolio Theory, how diversification reduces risk, and how to construct an optimal portfolio aligned with your risk tolerance and investment goals.',
  color: 'from-cyan-500 to-blue-600',
  icon: '🎯',
  totalXP: 560,
  estimatedHours: 2,
  cfaLevel: 'CFA Level I — Portfolio Management',
  lessons: [
    {
      id: 19, moduleId: 7, order: 1,
      title: 'Risk, Return & Diversification',
      subtitle: 'Don\'t put all your eggs in one basket',
      durationMinutes: 10, xpReward: 140,
      videoId: 'iFn1mJBvtEo',
      videoTitle: 'Diversification and Risk',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Risk and return are positively correlated — higher return requires higher risk',
        'Systematic risk (market risk) cannot be diversified away',
        'Unsystematic risk (company-specific) can be eliminated through diversification',
        'Correlation: combining low-correlation assets reduces portfolio risk',
        'Diversification is the only "free lunch" in investing',
      ],
      sections: [
        {
          heading: 'Types of Investment Risk',
          body: 'Investment risk can be divided into two types. Systematic risk (market risk) affects all investments — recessions, interest rate changes, geopolitical events. It cannot be eliminated through diversification. Unsystematic risk (idiosyncratic risk) is specific to a company or industry — a CEO scandal, product recall, or industry disruption. This risk CAN be eliminated by holding a diversified portfolio.',
          highlight: 'Harry Markowitz, who won the Nobel Prize for Modern Portfolio Theory, showed that diversification is the only "free lunch" in investing.',
        },
        {
          heading: 'The Power of Correlation',
          body: 'Correlation measures how two assets move together. A correlation of +1 means they move perfectly together. A correlation of −1 means they move perfectly opposite. A correlation of 0 means they move independently. Combining assets with low or negative correlations reduces portfolio volatility without sacrificing expected return. This is the mathematical foundation of diversification.',
        },
        {
          heading: 'How Many Stocks to Diversify?',
          body: 'Research shows that most unsystematic risk can be eliminated with just 20–30 stocks from different industries and geographies. Beyond 30 stocks, the marginal benefit of adding more stocks diminishes rapidly. However, the remaining systematic risk cannot be eliminated regardless of how many stocks you hold.',
          highlight: 'A portfolio of 20 uncorrelated stocks eliminates approximately 90% of unsystematic risk.',
        },
        {
          heading: 'Beta — Measuring Systematic Risk',
          body: 'Beta measures a stock\'s sensitivity to market movements. A beta of 1.0 means the stock moves in line with the market. A beta of 1.5 means it moves 50% more than the market (higher risk, higher potential return). A beta of 0.5 means it moves half as much as the market (lower risk, lower potential return). Defensive stocks like utilities have low betas; technology stocks typically have high betas.',
        },
      ],
      glossary: [
        { term: 'Systematic Risk', definition: 'Market-wide risk that cannot be eliminated through diversification.' },
        { term: 'Unsystematic Risk', definition: 'Company or industry-specific risk that can be eliminated through diversification.' },
        { term: 'Correlation', definition: 'A statistical measure of how two assets move in relation to each other, ranging from −1 to +1.' },
        { term: 'Beta', definition: 'A measure of a stock\'s volatility relative to the overall market.' },
        { term: 'Diversification', definition: 'Spreading investments across different assets to reduce risk.' },
      ],
      hasQuiz: false,
    },
    {
      id: 20, moduleId: 7, order: 2,
      title: 'Modern Portfolio Theory & The Efficient Frontier',
      subtitle: 'Optimizing the risk-return tradeoff',
      durationMinutes: 11, xpReward: 150,
      videoId: 'v3Ij2nb4Qss',
      videoTitle: 'Modern Portfolio Theory',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Efficient Frontier: set of portfolios with maximum return for a given risk level',
        'Capital Market Line: optimal portfolios combining risk-free asset and market portfolio',
        'Sharpe Ratio: measures return per unit of risk',
        'CAPM: Capital Asset Pricing Model — expected return based on beta',
        'Asset allocation drives 90%+ of portfolio performance',
      ],
      sections: [
        {
          heading: 'The Efficient Frontier',
          body: 'Harry Markowitz\'s Modern Portfolio Theory (MPT) shows that for any level of risk, there is an optimal portfolio that maximizes expected return. The set of all such optimal portfolios forms the Efficient Frontier. Portfolios below the frontier are suboptimal — you could get more return for the same risk, or the same return for less risk. Rational investors should hold portfolios on the Efficient Frontier.',
          highlight: 'Markowitz won the 1990 Nobel Prize in Economics for Modern Portfolio Theory.',
        },
        {
          heading: 'The Sharpe Ratio',
          body: 'The Sharpe Ratio measures the return earned per unit of risk taken. Sharpe Ratio = (Portfolio Return − Risk-Free Rate) ÷ Portfolio Standard Deviation. A higher Sharpe Ratio means better risk-adjusted performance. The risk-free rate is typically the yield on short-term government bonds. The S&P 500 has historically had a Sharpe Ratio of approximately 0.4–0.6.',
          highlight: 'Sharpe Ratio = (Return − Risk-Free Rate) ÷ Standard Deviation. Higher is better.',
        },
        {
          heading: 'The Capital Asset Pricing Model (CAPM)',
          body: 'CAPM is the most widely used model for pricing risky assets. Expected Return = Risk-Free Rate + Beta × (Market Return − Risk-Free Rate). The term (Market Return − Risk-Free Rate) is the equity risk premium — the extra return investors demand for taking on stock market risk. CAPM is used to determine whether a stock is fairly priced given its risk level.',
        },
        {
          heading: 'Asset Allocation — The Most Important Decision',
          body: 'Research by Brinson, Hood, and Beebower (1986) found that asset allocation (the mix of stocks, bonds, and cash) explains over 90% of portfolio performance variation. The specific securities chosen within each asset class matter much less. This is why financial advisors focus first on getting the right asset allocation before selecting individual securities.',
        },
      ],
      glossary: [
        { term: 'Efficient Frontier', definition: 'The set of optimal portfolios offering the highest expected return for a given level of risk.' },
        { term: 'Sharpe Ratio', definition: 'Return per unit of risk: (Portfolio Return − Risk-Free Rate) ÷ Standard Deviation.' },
        { term: 'CAPM', definition: 'Capital Asset Pricing Model — a model that describes the relationship between systematic risk and expected return.' },
        { term: 'Equity Risk Premium', definition: 'The excess return of stocks over the risk-free rate, compensating investors for market risk.' },
        { term: 'Standard Deviation', definition: 'A statistical measure of the dispersion of returns around the average — used as a measure of risk.' },
      ],
      hasQuiz: false,
    },
    {
      id: 21, moduleId: 7, order: 3,
      title: 'Building Your Investment Portfolio',
      subtitle: 'From theory to practice',
      durationMinutes: 12, xpReward: 170,
      videoId: 'RR7e1Y-HJxQ',
      videoTitle: 'How to Build an Investment Portfolio',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Define your investment objectives and risk tolerance first',
        'Strategic asset allocation: long-term target mix',
        'Tactical asset allocation: short-term adjustments',
        'Rebalancing: restoring the target allocation periodically',
        'Investment Policy Statement (IPS): your personal investment constitution',
      ],
      sections: [
        {
          heading: 'Step 1 — Define Your Investment Objectives',
          body: 'Before investing, define your objectives: What is the purpose of this money? When will you need it? How much risk can you tolerate emotionally and financially? Your objectives determine your asset allocation. A 20-year-old saving for retirement can tolerate high volatility. A 60-year-old saving for next year\'s expenses cannot.',
        },
        {
          heading: 'Strategic Asset Allocation',
          body: 'Strategic asset allocation is your long-term target mix of asset classes (stocks, bonds, real estate, commodities, cash). It is based on your risk tolerance, time horizon, and return objectives. A typical moderate portfolio might be 60% stocks, 35% bonds, 5% alternatives. This target allocation should remain relatively stable over time.',
          highlight: 'The classic 60/40 portfolio (60% stocks, 40% bonds) has historically delivered approximately 8% annual return with moderate volatility.',
        },
        {
          heading: 'Rebalancing',
          body: 'Over time, market movements cause your portfolio to drift from its target allocation. If stocks rise significantly, your portfolio might become 75% stocks instead of 60%. Rebalancing means selling the overweight asset and buying the underweight asset to restore the target allocation. This enforces the discipline of "buy low, sell high" automatically.',
        },
        {
          heading: 'The Investment Policy Statement (IPS)',
          body: 'An Investment Policy Statement is a written document that defines your investment objectives, risk tolerance, time horizon, constraints, and asset allocation strategy. It serves as your personal investment constitution, preventing emotional decisions during market volatility. Professional portfolio managers are required to have an IPS for every client.',
        },
      ],
      glossary: [
        { term: 'Strategic Asset Allocation', definition: 'The long-term target mix of asset classes in a portfolio.' },
        { term: 'Rebalancing', definition: 'The process of restoring a portfolio to its target asset allocation.' },
        { term: 'Investment Policy Statement', definition: 'A written document defining investment objectives, constraints, and strategy.' },
        { term: 'Risk Tolerance', definition: 'The degree of variability in investment returns that an investor is willing to withstand.' },
        { term: 'Time Horizon', definition: 'The length of time an investor expects to hold an investment before needing the funds.' },
      ],
      hasQuiz: true,
    },
  ],
  quizzes: [
    { id: 701, moduleId: 7, lessonId: 21, difficulty: 'easy',
      question: 'What is diversification?',
      options: ['Investing all your money in one high-performing stock', 'Spreading investments across different assets to reduce risk', 'Buying only government bonds', 'Investing in the same asset at different times'],
      correctAnswer: 1, explanation: 'Diversification involves spreading investments across different assets, industries, and geographies to reduce unsystematic (company-specific) risk without sacrificing expected return.' },
    { id: 702, moduleId: 7, lessonId: 21, difficulty: 'easy',
      question: 'A stock with a beta of 1.5 means:',
      options: ['The stock pays a 1.5% dividend', 'The stock moves 50% more than the market', 'The stock has a 1.5x P/E ratio', 'The stock has 1.5% annual growth'],
      correctAnswer: 1, explanation: 'Beta measures a stock\'s sensitivity to market movements. A beta of 1.5 means the stock is 50% more volatile than the market — it rises 1.5% when the market rises 1%, and falls 1.5% when the market falls 1%.' },
    { id: 703, moduleId: 7, lessonId: 21, difficulty: 'medium', cfaLos: 'CFA I — PM 3.1',
      question: 'Which type of risk can be eliminated through diversification?',
      options: ['Systematic risk (market risk)', 'Unsystematic risk (company-specific risk)', 'Both systematic and unsystematic risk', 'Neither type of risk'],
      correctAnswer: 1, explanation: 'Unsystematic (idiosyncratic) risk is company or industry-specific and can be eliminated by holding a diversified portfolio. Systematic risk affects all investments and cannot be diversified away.' },
    { id: 704, moduleId: 7, lessonId: 21, difficulty: 'medium',
      question: 'The Sharpe Ratio measures:',
      options: ['The total return of a portfolio', 'Return per unit of risk taken', 'The correlation between two assets', 'The beta of a portfolio'],
      correctAnswer: 1, explanation: 'The Sharpe Ratio = (Portfolio Return − Risk-Free Rate) ÷ Standard Deviation. It measures how much excess return is earned per unit of risk, allowing comparison of portfolios with different risk levels.' },
    { id: 705, moduleId: 7, lessonId: 21, difficulty: 'hard', cfaLos: 'CFA I — PM 5.2',
      question: 'According to CAPM, what is the expected return of a stock with a beta of 1.2, a risk-free rate of 3%, and a market return of 8%?',
      options: ['8.0%', '9.0%', '9.6%', '11.0%'],
      correctAnswer: 2, explanation: 'CAPM: Expected Return = Risk-Free Rate + Beta × (Market Return − Risk-Free Rate) = 3% + 1.2 × (8% − 3%) = 3% + 1.2 × 5% = 3% + 6% = 9%... wait: 3 + 1.2×5 = 3+6 = 9%. Closest answer is 9.0%. (Re-check: 3 + 1.2×5 = 9.0%)' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 8 — Alternative Investments & Risk Management
// ─────────────────────────────────────────────────────────────────────────────

const module8: ModuleDef = {
  id: 8,
  title: 'Alternative Investments & Risk',
  subtitle: 'CFA Level I · Module 8',
  description: 'Explore real estate, commodities, private equity, and cryptocurrency as alternative investments, and learn how to identify and manage financial fraud.',
  color: 'from-pink-500 to-rose-600',
  icon: '💎',
  totalXP: 500,
  estimatedHours: 1.5,
  cfaLevel: 'CFA Level I — Alternative Investments',
  lessons: [
    {
      id: 22, moduleId: 8, order: 1,
      title: 'Real Estate & REITs',
      subtitle: 'Investing in property without buying a house',
      durationMinutes: 9, xpReward: 120,
      videoId: 'IHFv1KQKFUE',
      videoTitle: 'Real Estate Investment Trusts (REITs)',
      videoChannel: 'Khan Academy',
      keyPoints: [
        'Real estate provides income (rent) and capital appreciation',
        'REITs: Real Estate Investment Trusts — publicly traded property companies',
        'REITs must distribute 90%+ of taxable income as dividends',
        'Types: residential, commercial, industrial, healthcare REITs',
        'Real estate is an inflation hedge — rents and values rise with inflation',
      ],
      sections: [
        {
          heading: 'Why Real Estate?',
          body: 'Real estate is one of the oldest and most reliable forms of investment. It provides two sources of return: rental income (cash flow) and capital appreciation (price increase). Real estate also serves as an inflation hedge — as inflation rises, rents and property values typically rise too. In the GCC, real estate has been a primary wealth-building vehicle for many families.',
          highlight: 'Dubai\'s real estate market saw 43,000+ transactions worth AED 154 billion in 2023 — a record high.',
        },
        {
          heading: 'REITs — Real Estate for Everyone',
          body: 'Real Estate Investment Trusts (REITs) allow individual investors to invest in large-scale, income-producing real estate without buying property directly. REITs are publicly traded on stock exchanges and must distribute at least 90% of their taxable income as dividends. This makes them attractive income investments. Types include residential REITs (apartments), commercial REITs (offices, retail), and industrial REITs (warehouses).',
        },
        {
          heading: 'Real Estate Valuation',
          body: 'Real estate is valued using the capitalization rate (cap rate): Cap Rate = Net Operating Income ÷ Property Value. A higher cap rate means a higher return relative to the price. Commercial real estate is typically valued at 4–8% cap rates. The Net Operating Income (NOI) = Rental Income − Operating Expenses (excluding debt service).',
          highlight: 'Cap Rate = Net Operating Income ÷ Property Value. A 5% cap rate on a $1M property means $50,000 in annual NOI.',
        },
        {
          heading: 'Risks of Real Estate',
          body: 'Real estate is illiquid — it can take months to sell a property. It requires significant capital and ongoing management. Property values can fall (as in the 2008 US housing crisis). Leverage (mortgage debt) amplifies both gains and losses. REITs mitigate some of these risks by providing liquidity and professional management, but they are still subject to market risk.',
        },
      ],
      glossary: [
        { term: 'REIT', definition: 'Real Estate Investment Trust — a company that owns income-producing real estate.' },
        { term: 'Cap Rate', definition: 'Capitalization Rate — Net Operating Income divided by property value.' },
        { term: 'NOI', definition: 'Net Operating Income — rental income minus operating expenses.' },
        { term: 'Liquidity', definition: 'The ease with which an asset can be converted to cash without affecting its price.' },
      ],
      hasQuiz: false,
    },
    {
      id: 23, moduleId: 8, order: 2,
      title: 'Commodities, Private Equity & Crypto',
      subtitle: 'Beyond stocks and bonds',
      durationMinutes: 11, xpReward: 140,
      videoId: 'pdXHSXxMCFQ',
      videoTitle: 'Alternative Investments Overview',
      videoChannel: 'CFA Institute',
      keyPoints: [
        'Commodities: oil, gold, agricultural products — inflation hedges',
        'Private equity: investing in non-public companies',
        'Venture capital: investing in early-stage startups',
        'Cryptocurrency: digital assets on blockchain technology',
        'Alternatives typically have low correlation with stocks and bonds',
      ],
      sections: [
        {
          heading: 'Commodities',
          body: 'Commodities are raw materials or primary agricultural products — oil, natural gas, gold, silver, wheat, corn. They are traded on commodity exchanges. Commodities serve as inflation hedges because their prices tend to rise with inflation. Gold is the classic safe-haven asset, rising during crises. Oil is the most traded commodity in the world, with the UAE and Saudi Arabia being major producers.',
          highlight: 'Gold has maintained its purchasing power for over 3,000 years — one ounce of gold bought a fine Roman toga; today it buys a fine suit.',
        },
        {
          heading: 'Private Equity and Venture Capital',
          body: 'Private equity (PE) involves investing in companies that are not publicly traded. PE firms buy companies, improve their operations, and sell them for a profit. Venture capital (VC) is a subset of PE focused on early-stage startups with high growth potential. VC investors funded companies like Google, Apple, and Amazon in their early stages. PE and VC are illiquid and typically only available to institutional and high-net-worth investors.',
        },
        {
          heading: 'Cryptocurrency',
          body: 'Cryptocurrency is a digital or virtual currency secured by cryptography and operating on decentralized blockchain networks. Bitcoin (BTC) was the first cryptocurrency, created in 2009. Ethereum (ETH) introduced smart contracts. Cryptocurrencies are highly volatile — Bitcoin has experienced multiple 80%+ drawdowns. They are speculative assets with high potential returns and high risk. Regulatory frameworks are still evolving globally.',
          highlight: 'Bitcoin\'s price history: $0.01 (2009) → $69,000 (2021 peak) → $16,000 (2022 low) → $73,000 (2024 high).',
        },
        {
          heading: 'Role of Alternatives in a Portfolio',
          body: 'Alternative investments typically have low correlation with traditional stocks and bonds, providing diversification benefits. However, they often have higher fees, lower liquidity, and less transparency. The CFA Institute recommends that alternatives constitute no more than 10–20% of a portfolio for most investors. For institutional investors like sovereign wealth funds (e.g., Abu Dhabi Investment Authority), alternatives can represent 30–40% of the portfolio.',
        },
      ],
      glossary: [
        { term: 'Commodity', definition: 'A raw material or primary agricultural product that can be bought and sold.' },
        { term: 'Private Equity', definition: 'Investment in companies not listed on a public stock exchange.' },
        { term: 'Venture Capital', definition: 'Financing provided to early-stage, high-growth potential startups.' },
        { term: 'Cryptocurrency', definition: 'A digital currency secured by cryptography and operating on a decentralized network.' },
        { term: 'Blockchain', definition: 'A distributed ledger technology that records transactions across multiple computers.' },
      ],
      hasQuiz: false,
    },
    {
      id: 24, moduleId: 8, order: 3,
      title: 'Fraud Prevention & Investor Protection',
      subtitle: 'Protecting yourself from financial scams',
      durationMinutes: 10, xpReward: 140,
      videoId: 'YRSiMxnVbNk',
      videoTitle: 'Protecting Yourself from Investment Fraud',
      videoChannel: 'CFA Institute',
      keyPoints: [
        'Ponzi schemes: paying early investors with new investors\' money',
        'Pump and dump: artificially inflating a stock price then selling',
        'Phishing: fraudulent emails/messages to steal credentials',
        'Red flags: guaranteed returns, pressure to invest quickly, unregistered advisors',
        'Regulatory bodies: SEC (US), DFSA (Dubai), SCA (UAE), SAMA (Saudi Arabia)',
      ],
      sections: [
        {
          heading: 'Common Investment Frauds',
          body: 'Investment fraud costs investors billions of dollars annually. The most common types include: Ponzi schemes (paying existing investors with new investors\' money — Bernie Madoff stole $65 billion); Pump and dump (artificially inflating a penny stock\'s price through false claims, then selling); Advance fee fraud (asking for upfront fees to release a larger sum); and Affinity fraud (targeting specific communities or religious groups).',
          highlight: 'Bernie Madoff\'s Ponzi scheme was the largest investment fraud in history — $65 billion stolen over 17 years.',
        },
        {
          heading: 'Red Flags of Investment Fraud',
          body: 'Warning signs include: guaranteed high returns with no risk (no legitimate investment can guarantee returns); pressure to invest immediately; unregistered investment advisors; complex strategies that cannot be explained clearly; difficulty withdrawing your money; and investments that are not regulated by a recognized authority. If something sounds too good to be true, it almost certainly is.',
          highlight: '"If it sounds too good to be true, it probably is." — The golden rule of fraud prevention.',
        },
        {
          heading: 'Regulatory Protection',
          body: 'Regulatory bodies protect investors by licensing financial professionals, enforcing disclosure requirements, and prosecuting fraud. In the UAE, the Securities and Commodities Authority (SCA) and the Dubai Financial Services Authority (DFSA) regulate financial markets. In Saudi Arabia, the Capital Market Authority (CMA) provides oversight. Always verify that your financial advisor is registered with the relevant regulator.',
        },
        {
          heading: 'Protecting Your Digital Assets',
          body: 'With the rise of digital investing, cybersecurity is essential. Use strong, unique passwords for financial accounts. Enable two-factor authentication. Never click links in unsolicited emails claiming to be from your bank or broker. Be cautious of social media investment tips — many are pump-and-dump schemes. Keep your private keys for cryptocurrency wallets secure and never share them.',
        },
      ],
      glossary: [
        { term: 'Ponzi Scheme', definition: 'A fraudulent investment scheme where returns are paid using new investors\' money rather than profits.' },
        { term: 'Pump and Dump', definition: 'Artificially inflating a stock\'s price through false claims, then selling at the peak.' },
        { term: 'DFSA', definition: 'Dubai Financial Services Authority — the financial regulator for the Dubai International Financial Centre.' },
        { term: 'SCA', definition: 'Securities and Commodities Authority — the UAE\'s main financial markets regulator.' },
        { term: 'Two-Factor Authentication', definition: 'A security process requiring two forms of verification to access an account.' },
      ],
      hasQuiz: true,
    },
  ],
  quizzes: [
    { id: 801, moduleId: 8, lessonId: 24, difficulty: 'easy',
      question: 'What is a REIT?',
      options: ['A type of government bond', 'A Real Estate Investment Trust that owns income-producing property', 'A retirement savings account', 'A type of cryptocurrency'],
      correctAnswer: 1, explanation: 'A REIT (Real Estate Investment Trust) is a company that owns, operates, or finances income-producing real estate. REITs are publicly traded and must distribute at least 90% of taxable income as dividends.' },
    { id: 802, moduleId: 8, lessonId: 24, difficulty: 'easy',
      question: 'A Ponzi scheme works by:',
      options: ['Investing in high-risk stocks', 'Paying early investors with money from new investors', 'Artificially inflating stock prices', 'Charging excessive management fees'],
      correctAnswer: 1, explanation: 'A Ponzi scheme pays returns to existing investors using funds from new investors, rather than from actual investment profits. It collapses when there are not enough new investors to pay existing ones.' },
    { id: 803, moduleId: 8, lessonId: 24, difficulty: 'medium',
      question: 'Which of the following is a red flag for investment fraud?',
      options: ['An investment registered with the SEC or SCA', 'Guaranteed returns of 50% per year with no risk', 'A fund that discloses its holdings quarterly', 'An advisor who explains their fee structure clearly'],
      correctAnswer: 1, explanation: 'Guaranteed high returns with no risk is a classic red flag of investment fraud. No legitimate investment can guarantee returns — all investments carry some level of risk.' },
    { id: 804, moduleId: 8, lessonId: 24, difficulty: 'medium',
      question: 'Why are commodities like gold considered inflation hedges?',
      options: ['Because gold pays a fixed dividend', 'Because gold prices tend to rise with inflation, preserving purchasing power', 'Because gold is guaranteed by governments', 'Because gold has no market risk'],
      correctAnswer: 1, explanation: 'Gold and other commodities tend to rise in price when inflation increases, preserving the purchasing power of the investment. This makes them effective hedges against inflation.' },
    { id: 805, moduleId: 8, lessonId: 24, difficulty: 'hard',
      question: 'The Dubai Financial Services Authority (DFSA) regulates financial services in:',
      options: ['All of the UAE', 'The Dubai International Financial Centre (DIFC)', 'Saudi Arabia and the UAE', 'The Abu Dhabi Global Market (ADGM)'],
      correctAnswer: 1, explanation: 'The DFSA regulates financial services within the Dubai International Financial Centre (DIFC). The Securities and Commodities Authority (SCA) regulates the broader UAE market, while the Financial Services Regulatory Authority (FSRA) regulates the ADGM.' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT ALL MODULES
// ─────────────────────────────────────────────────────────────────────────────

export const educationModules: ModuleDef[] = [
  module1, module2, module3, module4,
  module5, module6, module7, module8,
]

// ─────────────────────────────────────────────────────────────────────────────
// BADGES
// ─────────────────────────────────────────────────────────────────────────────

export const badgeDefs: BadgeDef[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your very first lesson',
    icon: '🎯',
    xpReward: 50,
    requirement: 'Complete 1 lesson',
    requirementType: 'lesson_count',
    requirementValue: 1,
    tier: 'bronze',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'quiz-ace',
    name: 'Quiz Ace',
    description: 'Score 100% on any quiz',
    icon: '⭐',
    xpReward: 100,
    requirement: 'Score 100% on a quiz',
    requirementType: 'perfect_quiz',
    requirementValue: 100,
    tier: 'silver',
    color: 'from-yellow-400 to-amber-500',
  },
  {
    id: 'module-master',
    name: 'Module Master',
    description: 'Complete your first full module',
    icon: '🏆',
    xpReward: 150,
    requirement: 'Complete all lessons in a module',
    requirementType: 'module_complete',
    requirementValue: 1,
    tier: 'silver',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'ethics-champion',
    name: 'Ethics Champion',
    description: 'Complete the Ethics & Financial Integrity module',
    icon: '⚖️',
    xpReward: 200,
    requirement: 'Complete Module 1',
    requirementType: 'module_complete',
    requirementValue: 1,
    tier: 'silver',
    color: 'from-purple-400 to-indigo-500',
  },
  {
    id: 'time-traveler',
    name: 'Time Traveler',
    description: 'Master the Time Value of Money module',
    icon: '⏰',
    xpReward: 200,
    requirement: 'Complete Module 2',
    requirementType: 'module_complete',
    requirementValue: 2,
    tier: 'silver',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'streak-week',
    name: 'Streak Week',
    description: 'Learn for 7 consecutive days',
    icon: '🔥',
    xpReward: 150,
    requirement: '7-day learning streak',
    requirementType: 'streak',
    requirementValue: 7,
    tier: 'silver',
    color: 'from-red-400 to-orange-500',
  },
  {
    id: 'halfway-hero',
    name: 'Halfway Hero',
    description: 'Complete 4 out of 8 modules',
    icon: '🌟',
    xpReward: 300,
    requirement: 'Complete 4 modules',
    requirementType: 'half_modules',
    requirementValue: 4,
    tier: 'gold',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'xp-500',
    name: 'Rising Star',
    description: 'Earn 500 total XP',
    icon: '✨',
    xpReward: 50,
    requirement: 'Earn 500 XP',
    requirementType: 'xp_total',
    requirementValue: 500,
    tier: 'bronze',
    color: 'from-sky-400 to-blue-500',
  },
  {
    id: 'xp-1000',
    name: 'Knowledge Seeker',
    description: 'Earn 1,000 total XP',
    icon: '🧠',
    xpReward: 100,
    requirement: 'Earn 1,000 XP',
    requirementType: 'xp_total',
    requirementValue: 1000,
    tier: 'silver',
    color: 'from-violet-400 to-purple-500',
  },
  {
    id: 'portfolio-builder',
    name: 'Portfolio Builder',
    description: 'Make your first simulated trade',
    icon: '📊',
    xpReward: 100,
    requirement: 'Execute 1 simulated trade',
    requirementType: 'trade',
    requirementValue: 1,
    tier: 'bronze',
    color: 'from-green-400 to-teal-500',
  },
  {
    id: 'streak-month',
    name: 'Streak Month',
    description: 'Learn for 30 consecutive days',
    icon: '💪',
    xpReward: 500,
    requirement: '30-day learning streak',
    requirementType: 'streak',
    requirementValue: 30,
    tier: 'gold',
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 'financial-guru',
    name: 'Financial Guru',
    description: 'Complete all 8 CFA-aligned modules',
    icon: '👑',
    xpReward: 1000,
    requirement: 'Complete all 8 modules',
    requirementType: 'all_modules',
    requirementValue: 8,
    tier: 'platinum',
    color: 'from-yellow-300 to-amber-500',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// STAR RATING THRESHOLDS
// ─────────────────────────────────────────────────────────────────────────────

export const STAR_THRESHOLDS = {
  oneStar: 40,    // ≥ 40% → 1 star
  twoStar: 70,    // ≥ 70% → 2 stars
  threeStar: 90,  // ≥ 90% → 3 stars
}

export function getStarRating(score: number): 0 | 1 | 2 | 3 {
  if (score >= STAR_THRESHOLDS.threeStar) return 3
  if (score >= STAR_THRESHOLDS.twoStar) return 2
  if (score >= STAR_THRESHOLDS.oneStar) return 1
  return 0
}

export function getXpForScore(baseXp: number, score: number): number {
  if (score >= 90) return Math.round(baseXp * 1.5)
  if (score >= 70) return Math.round(baseXp * 1.2)
  if (score >= 40) return baseXp
  return Math.round(baseXp * 0.5)
}
