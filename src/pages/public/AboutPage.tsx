import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Shield, Users, Award } from 'lucide-react'
import gabrielaPhoto from '../../assets/gabriela-nowak.png'

const partners = [
  {
    name: 'Anand Vengurlekar',
    role: 'INSEAD Faculty | Senior Lecturer & Lead Facilitator, Strategy & Innovation',
    bio: "Anand is INSEAD's senior lecturer and lead facilitator for C-level strategy and innovation workshops. His approach combines global strategic roles at multinationals including the Ministry of Economy of UAE, Samsung Scandinavia, and SONY Europe; significant design thinking expertise from LEGO and IDEO where he led innovation projects for Fortune 50 companies; and an academic foundation through a Global Executive MBA from INSEAD. He has taught leadership, strategy, and innovation on INSEAD's customised programs for 7 years, as well as through PWC, Mubadala, Korn Ferry, Emiritus and McKinsey.",
    credentials: ['Global Executive MBA, INSEAD', 'Business Coaching Diploma, PWC & ICF'],
    tags: ['MBA, INSEAD', 'PWC & ICF Coaching'],
  },
  {
    name: 'Candice Elsmore',
    role: 'Startup Advisor | Angel Investor | Venture Growth Strategist',
    bio: 'Candice Elsmore helps founders raise capital, scale teams strategically, and implement the operational frameworks needed to accelerate from ambition to execution. She brings 7+ years in M&A advisory in London — including the Aston Martin IPO — and served as COO at Arma Partners, a technology M&A boutique subsequently acquired by a global merchant bank. She is Co-Founder & COO/CFO of TechPulse Inc., a US-based AI-powered automotive diagnostic platform, and Strategic Advisor to Nolana, a London-based AI Fintech.',
    credentials: ['MBA, London Business School (Mo Ibrahim Foundation Scholar)', 'Exchange Program, Wharton School, University of Pennsylvania'],
    tags: ['MBA, London Business School', 'Wharton Exchange'],
  },
  {
    name: 'Ramy Lahoud',
    role: 'Ecosystem & Alliance Expert | EMEA Market Accelerator for B2B Enterprise',
    bio: 'Ramy Lahoud is a seasoned strategist and market accelerator with over 20 years of experience in the technology industry across the Middle East and Africa. Known for his sharp acumen in Go-To-Market (GTM) strategies, alliance building, and ecosystem development, Ramy has successfully guided international businesses in navigating complex regional landscapes. As a Partner at A8 Innovation, he brings a future-forward mindset rooted in operational excellence and collaborative growth. As co-founder of Realex (PropTech) and an active angel investor, Ramy combines entrepreneurial energy with deep market expertise to drive innovation and strategic growth for clients.',
    credentials: ['INSEAD EMBA', 'Active mentor and angel investor across UAE startup ecosystem'],
    tags: ['Executive MBA, INSEAD', 'Channel & Alliance Expert'],
  },
  {
    name: 'Zara Basharat Higgs',
    role: 'Public Policy, Communications & Sustainability Expert',
    bio: 'Zara has a prolific international career spanning 20 years across tech, corporate and the development sector, with a focus on public policy, communications, sustainability and strategy. She served as Head of Public Policy Programs and Partnerships for Middle East, Türkiye, Africa, Pakistan and South Asia at TikTok, where she built and led the programs portfolio focusing on strategic partnerships to address critical regional challenges — from education access and digital safety to climate change. She has also led Communications and Sustainability portfolios at Jazz (VEON Group), PepsiCo, Nestlé, the World Bank and the United Nations Information Centre.',
    credentials: ['MBA, London Business School', 'Social Impact Strategy, University of Pennsylvania', 'IVLP: Developing Future Women Leaders (U.S. State Department)'],
    tags: ['MBA, London Business School', 'UPenn Social Impact'],
  },
  {
    name: 'Sanita Pukite',
    role: 'Psychodynamic Leadership & Team Coach | Ex-J&J EMEA Leader | INSEAD Alumni',
    bio: 'Sanita Pukite empowers senior leaders and teams operating in complex, high-pressure environments to improve decision quality, relational intelligence, and sustain high-performance over time. Her work integrates adaptive leadership with deep insight into the psychological dynamics of pressure. With 20+ years of global sales, strategy and leadership across 3 continents — including 16 years at Johnson & Johnson as an ELT Member — Sanita brings cross-functional team leadership, Regional Strategy, Brand Leadership, Digital Transformation, M&A, CEO Advisory, and L&D expertise. She has been based in the Middle East for 10 years.',
    credentials: ['Executive MBA, INSEAD', 'Masters Degree: Consulting and Leading in Organizations (Psychodynamic), Tavistock Institute, UK', 'Executive Coaching Certificate, INSEAD', 'ICF Accredited, ACC'],
    tags: ['Executive MBA, INSEAD', 'Masters, Tavistock Institute'],
  },
  {
    name: 'Robert J. Webb',
    role: 'Global CIO | Executive Advisor | Digital Transformation Guide & Executive Coach',
    bio: 'Rob Webb is an accomplished global technology executive, digital transformation guide, growth advisor, management consultant and executive coach with proven expertise driving strategic change through technology innovation. He served most recently as Digital and Technology Advisor to the GCEO for DGDA, the $150B heritage and real estate development project part of the Saudi Vision 2030 Program. Previously, he held the positions of Global CIO for Etihad Aviation Group, Global CIO for Hilton Worldwide, Global CIO at Equifax, and divisional CIO positions at General Electric. He began his career as a management consultant with Accenture.',
    credentials: ['Executive Masters in Consulting and Coaching for Change, INSEAD Singapore', 'Advanced Executive Coaching Certification, Columbia Business School', 'MBA, ESCP European School of Management, Paris'],
    tags: ['MBA, ESCP Europe', 'Executive Masters, INSEAD'],
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
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

      {/* Team — Founder Feature */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">Leadership</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">Our Team</h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Founded and led by a seasoned strategist with deep expertise in AI, transformation, and growth advisory.
            </p>
          </div>

          {/* Gabriela Nowak — Founder Featured Card */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-16">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Photo */}
              <div className="relative h-80 md:h-auto overflow-hidden bg-brand-50">
                <img
                  src={gabrielaPhoto}
                  alt="Gabriela Janzen-Nowak"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Bio */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">Managing Director &amp; Founder</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-1">Gabriela Janzen-Nowak</h3>
                <p className="text-brand font-medium mb-6">AI, Strategy &amp; Business Transformation</p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Founder of Janzen Advisory &amp; Partners, Gabriela is an AI, Strategy &amp; Business Transformation Consulting Director with deep expertise in operational execution, digital transformation, and guiding late-stage SMEs through critical growth phases towards successful acquisitions or significant investment rounds.
                </p>
                <p className="text-text-secondary leading-relaxed mb-6">
                  With a career spanning C-level advisory across the UAE and international markets, Gabriela combines academic rigor with hands-on entrepreneurial experience to unlock value and position ambitious enterprises for premium exits.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['INSEAD', 'C-Level Advisory', 'AI Strategy', 'M&A Readiness'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-brand-light text-brand text-xs font-semibold rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map(member => (
              <div key={member.name} className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-brand mb-4 leading-snug">{member.role}</p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{member.bio}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border space-y-1">
                  {member.credentials.map((cred, i) => (
                    <p key={i} className="text-xs text-text-muted flex items-start gap-2">
                      <span className="text-brand mt-0.5 shrink-0">•</span>
                      <span>{cred}</span>
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
