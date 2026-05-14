import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Shield, Users, Award } from 'lucide-react'

const team = [
  {
    name: 'Gabriela Nowak',
    role: 'AI, Strategy & Business Transformation Advisor',
    bio: 'Gabriela is an AI, Strategy & Business Transformation Consulting Director with over 15 years advising and leading programs for the Financial, Technology, and Healthcare sectors. She has a proven record of delivering shareholder value creation through technological advancement for portfolio companies, with deep expertise in Mergers and Acquisitions (M&A) and operating models across CEMEA. Since March 2025, she is Founder of Janzen Advisory & Partners, an ADGM-registered boutique technology and strategy advisory focused on AI-powered advisory services for SME.',
    credentials: ['Executive MBA, INSEAD', 'MSc Economics and Marketing, Gdansk University of Technology', 'BA (Hons) Business Administration, Robert Gordon University', 'PMP Certified | CFA in progress']
  },
  {
    name: 'Anand Vengurlekar',
    role: 'INSEAD Faculty | Senior Lecturer & Lead Facilitator, Strategy & Innovation',
    bio: 'Anand is INSEAD\'s senior lecturer and lead facilitator for C-level strategy and innovation workshops. His approach combines three career experiences: global strategic roles at multinationals including the Ministry of Economy of UAE, Samsung Scandinavia, and SONY Europe; significant design thinking expertise from LEGO and IDEO; and an academic foundation through a Global Executive MBA from INSEAD.',
    credentials: ['Global Executive MBA, INSEAD', 'Business Coaching Diploma, PWC & ICF']
  },
  {
    name: 'Candice Elsmore',
    role: 'Startup Advisor | Angel Investor | Venture Growth Strategist',
    bio: 'Candice Elsmore helps founders raise capital, scale teams strategically, and implement the operational frameworks needed to accelerate from ambition to execution. She has 7+ years in M&A advisory in London, including the Aston Martin IPO, and served as COO at a technology M&A boutique.',
    credentials: ['MBA, London Business School', 'Exchange Program, Wharton School']
  },
  {
    name: 'Ramy Lahoud',
    role: 'Ecosystem & Alliance Expert | EMEA Market Accelerator',
    bio: 'Ramy Lahoud is a seasoned strategist and market accelerator with over 20 years of experience in the technology industry across the Middle East and Africa. Known for his sharp acumen in Go-To-Market (GTM) strategies, alliance building, and ecosystem development, Ramy has successfully guided international businesses in navigating complex regional landscapes.',
    credentials: ['INSEAD EMBA', 'Active mentor and angel investor across UAE startup ecosystem']
  },
  {
    name: 'Zara Basharat Higgs',
    role: 'Public Policy, Communications & Sustainability Expert',
    bio: 'Zara has a prolific international career spanning 20 years across tech, corporate and the development sector. She served as Head of Public Policy Programs and Partnerships for Middle East, Türkiye, Africa, Pakistan and South Asia at TikTok, and has led Communications and Sustainability portfolios at Jazz, PepsiCo, Nestlé, the World Bank and the UN.',
    credentials: ['MBA, London Business School', 'Social Impact Strategy, University of Pennsylvania']
  },
  {
    name: 'Sanita Pukite',
    role: 'Psychodynamic Leadership & Team Coach',
    bio: 'Sanita Pukite empowers senior leaders and teams operating in complex, high-pressure environments to improve decision quality, relational intelligence, and sustain high-performance over time. With 20+ years of global sales, strategy and leadership across 3 continents — including 16 years at Johnson & Johnson as an ELT Member.',
    credentials: ['Executive MBA, INSEAD', 'Masters Degree: Consulting and Leading in Organizations, Tavistock Institute', 'Executive Coaching Certificate, INSEAD']
  },
  {
    name: 'Robert J. Webb',
    role: 'Global CIO | Executive Advisor | Digital Transformation Guide',
    bio: 'Rob Webb is an accomplished global technology executive, digital transformation guide, growth advisor, management consultant and executive coach. He served most recently as Digital and Technology Advisor to the GCEO for DGDA, the $150B heritage and real estate development project part of the Saudi Vision 2030 Program. Previously, he held the positions of Global CIO for Etihad Aviation Group and Hilton Worldwide.',
    credentials: ['Executive Masters in Consulting and Coaching for Change, INSEAD', 'Advanced Executive Coaching Certification, Columbia Business School', 'MBA, ESCP European School of Management']
  }
]

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-50 via-white to-indigo-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight animate-fade-in-up">About Dhakium</h1>
          <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto">
            Building the next generation's financial future through education, technology, and smart investing.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">Our Mission</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Only 33% of people globally are financially literate. Dhakium Technologies Limited is on a mission to change that, starting with the next generation.
              </p>
              <p className="text-text-secondary leading-relaxed">
                We believe every child deserves the knowledge and tools to build wealth. By combining gamified education with real investment tools, we're bridging the financial literacy gap for families across the GCC and beyond.
              </p>
            </div>
            <div className="bg-gradient-to-br from-brand to-brand-700 rounded-2xl p-8 text-white">
              <p className="text-4xl font-extrabold mb-2">33%</p>
              <p className="text-white/80 text-sm">of people globally are financially literate</p>
              <div className="mt-6 h-px bg-white/20" />
              <p className="text-4xl font-extrabold mt-6 mb-2">2.78M</p>
              <p className="text-white/80 text-sm">adolescents aged 14–18 in GCC target markets</p>
              <div className="mt-6 h-px bg-white/20" />
              <p className="text-4xl font-extrabold mt-6 mb-2">$77K+</p>
              <p className="text-white/80 text-sm">annual cost of higher education in the US</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-secondary py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {[
              { icon: Globe, title: 'Accessibility', desc: 'Financial education should be available to every family, regardless of background.' },
              { icon: Shield, title: 'Trust & Security', desc: 'Regulatory compliance and data security are non-negotiable foundations.' },
              { icon: Users, title: 'Family-First', desc: 'Every feature is designed with both parents and children in mind.' },
              { icon: Award, title: 'Excellence', desc: 'CFA-aligned curriculum and institutional-grade investment tools.' },
            ].map(v => (
              <div key={v.title} className="bg-white rounded-xl border border-border p-6 text-center hover:shadow-md transition-shadow">
                <v.icon className="text-brand mx-auto mb-3" size={28} />
                <h3 className="font-semibold text-text-primary mb-2">{v.title}</h3>
                <p className="text-sm text-text-secondary">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map(member => (
              <div key={member.name} className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-text-primary mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-brand mb-4">{member.role}</p>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">{member.bio}</p>
                <div className="space-y-1">
                  {member.credentials.map((cred, i) => (
                    <p key={i} className="text-xs text-text-muted flex items-start gap-2">
                      <span className="text-brand mt-0.5">•</span> {cred}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="bg-surface-secondary py-20 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-8">Target Markets</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { flag: '🇦🇪', country: 'UAE', reg: 'ADGM Sandbox', detail: 'Abu Dhabi, Dubai' },
              { flag: '🇸🇦', country: 'Saudi Arabia', reg: 'SAMA Compliance', detail: 'Riyadh, Jeddah' },
              { flag: '🇶🇦', country: 'Qatar', reg: 'QFCRA Sandbox', detail: 'Doha' },
            ].map(m => (
              <div key={m.country} className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                <span className="text-4xl">{m.flag}</span>
                <h3 className="text-lg font-semibold text-text-primary mt-3">{m.country}</h3>
                <p className="text-sm text-brand font-medium mt-1">{m.reg}</p>
                <p className="text-xs text-text-muted mt-1">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Join the Financial Literacy Revolution</h2>
          <Link to="/register" className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 bg-white text-brand font-semibold rounded-xl hover:bg-brand-50 transition-colors">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
