import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  id: number
  role: 'user' | 'bot'
  text: string
  typing?: boolean
  actions?: string[]
}

const RESPONSES: Record<string, { text: string; actions?: string[] }> = {
  'what is a bond': { text: "Great question! 🎉\n\nA **bond** is like a loan you give to a government or company. Here's how it works:\n\n1. You lend them money (buy the bond)\n2. They pay you interest regularly (called a **coupon**)\n3. At the end of a set period (called **maturity**), they give back your original money\n\nThink of it like this: If your friend borrows $100 and promises to pay you back in a year with $5 extra, that $5 is the coupon and the $100 is the face value!\n\nBonds are generally considered less risky than stocks, which is why they're an important part of a diversified portfolio. 📊", actions: ['Take Module 6 Quiz', 'What are credit ratings?', 'View Bond ETFs'] },
  'compound interest': { text: "Compound interest is truly the **8th wonder of the world**! 🌟\n\nSimple interest: You earn interest only on your original deposit.\nCompound interest: You earn interest on your deposit AND on the interest you've already earned!\n\n**Example:**\n- You invest $1,000 at 10% annual interest\n- Year 1: $1,000 × 1.10 = $1,100 (+$100)\n- Year 2: $1,100 × 1.10 = $1,210 (+$110)\n- Year 3: $1,210 × 1.10 = $1,331 (+$121)\n\nNotice how you earn more each year? That's compounding!\n\n**Rule of 72:** Divide 72 by your interest rate to know how many years it takes to double your money.\n72 ÷ 10 = 7.2 years to double! 🚀", actions: ['Try the Rule of 72 Calculator', 'Take Module 2 Quiz'] },
  'stock market': { text: "The **stock market** is where people buy and sell tiny pieces of ownership in companies — these pieces are called **shares** or **stocks**. 📈\n\nHere's the simple version:\n\n🏢 A company needs money to grow\n📋 It lists its shares on a stock exchange (like NYSE or NASDAQ)\n🧑‍💼 Investors buy shares, becoming partial owners\n💰 If the company does well, share prices go up!\n\n**Key terms:**\n- **Bull market** = prices going up 🐂\n- **Bear market** = prices going down 🐻\n- **Index** = tracks a group of stocks (like the S&P 500)\n\nYou can practice buying stocks in our **Trading Simulator** with $10,000 virtual cash! No real money at risk. 🎮", actions: ['Try Trading Simulator', 'View Module 5', 'What is an ETF?'] },
  'default': { text: "That's a great question! 🤔\n\nI'm Dhaki, your AI financial education assistant. In the full version of the platform, I can help you with:\n\n📚 Explaining any financial concept\n🧮 Step-by-step calculations\n📊 Market insights and news\n🎯 Quiz help and study tips\n\nFor now, try asking me about:\n- \"What is a bond?\"\n- \"Explain compound interest\"\n- \"How does the stock market work?\"\n\nI'm here to make learning about money fun! 😊", actions: ['What is a bond?', 'Explain compound interest', 'How does the stock market work?'] },
}

function getResponse(msg: string): { text: string; actions?: string[] } {
  const lower = msg.toLowerCase()
  if (lower.includes('bond')) return RESPONSES['what is a bond']
  if (lower.includes('compound') || lower.includes('interest')) return RESPONSES['compound interest']
  if (lower.includes('stock') || lower.includes('market') || lower.includes('share')) return RESPONSES['stock market']
  return RESPONSES['default']
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'bot', text: "Hi there! I'm **Dhaki** 🤖, your friendly financial education assistant!\n\nI'm here to help you learn about money, investing, and the economy. Ask me anything, or try one of the suggestions below!", actions: ['What is a bond?', 'Explain compound interest', 'How does the stock market work?'] },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    // Simulate streaming delay
    setTimeout(() => {
      const res = getResponse(text)
      setTyping(false)
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: res.text, actions: res.actions }])
    }, 1200 + Math.random() * 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)] animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-600 rounded-xl flex items-center justify-center">
          <Bot className="text-white" size={22} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-text-primary">Chat with Dhaki</h1>
          <p className="text-xs text-text-muted flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-success rounded-full" /> AI Financial Tutor • Module 3 context
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'bot' && (
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="text-white" size={16} />
              </div>
            )}
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-brand text-white rounded-2xl rounded-tr-md px-4 py-3' : 'bg-white border border-border rounded-2xl rounded-tl-md px-4 py-3'}`}>
              <div className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'bot' ? 'text-text-primary' : ''}`}>
                {msg.text.split('**').map((part, i) =>
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                )}
              </div>
              {msg.actions && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {msg.actions.map(a => (
                    <button key={a} onClick={() => sendMessage(a)} className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                      msg.role === 'bot' ? 'bg-brand-light text-brand hover:bg-brand/10' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}>
                      {a}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 bg-surface-tertiary rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <User className="text-text-muted" size={16} />
              </div>
            )}
          </div>
        ))}

        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shrink-0">
              <Bot className="text-white" size={16} />
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3 pt-4 border-t border-border">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Dhaki anything about finance..."
          className="flex-1 px-4 py-3 bg-white rounded-xl border border-border text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all"
          id="chatbot-input"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-11 h-11 bg-brand text-white rounded-xl flex items-center justify-center hover:bg-brand-dark disabled:opacity-40 transition-colors"
          id="chatbot-send"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
