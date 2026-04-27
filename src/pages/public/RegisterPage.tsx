import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'

const steps = ['Account', 'Personal', 'Child Profile', 'Review']

export default function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '', country: 'UAE', childName: '', childDob: '' })

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async () => {
    await new Promise(r => setTimeout(r, 800))
    login()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-surface-secondary py-12 px-4">
      <div className="w-full max-w-lg animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Create your account</h1>
          <p className="text-sm text-text-secondary mt-1">Start your family's financial journey</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i <= step ? 'bg-brand text-white' : 'bg-surface-tertiary text-text-muted'
              }`}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-brand' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
                <input id="reg-email" type="email" value={form.email} onChange={e => update('email', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-text-primary mb-1.5">Password</label>
                <input id="reg-password" type="password" value={form.password} onChange={e => update('password', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10" placeholder="Create a strong password" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium text-text-primary mb-1.5">Full Name</label>
                <input id="reg-name" type="text" value={form.name} onChange={e => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10" placeholder="Sarah Al-Rashid" />
              </div>
              <div>
                <label htmlFor="reg-phone" className="block text-sm font-medium text-text-primary mb-1.5">Phone</label>
                <input id="reg-phone" type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10" placeholder="+971 50 123 4567" />
              </div>
              <div>
                <label htmlFor="reg-country" className="block text-sm font-medium text-text-primary mb-1.5">Country</label>
                <select id="reg-country" value={form.country} onChange={e => update('country', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm outline-none focus:border-brand">
                  <option value="UAE">🇦🇪 United Arab Emirates</option>
                  <option value="KSA">🇸🇦 Saudi Arabia</option>
                  <option value="QAT">🇶🇦 Qatar</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="reg-child-name" className="block text-sm font-medium text-text-primary mb-1.5">Child's Name</label>
                <input id="reg-child-name" type="text" value={form.childName} onChange={e => update('childName', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10" placeholder="Aisha" />
              </div>
              <div>
                <label htmlFor="reg-child-dob" className="block text-sm font-medium text-text-primary mb-1.5">Date of Birth</label>
                <input id="reg-child-dob" type="date" value={form.childDob} onChange={e => update('childDob', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10" />
              </div>
              <p className="text-xs text-text-muted">You can add more children later from your dashboard.</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Review Your Details</h3>
              {[
                { label: 'Email', value: form.email || 'sarah.alrashid@email.com' },
                { label: 'Name', value: form.name || 'Sarah Al-Rashid' },
                { label: 'Country', value: form.country },
                { label: 'Child', value: form.childName || 'Aisha' },
              ].map(r => (
                <div key={r.label} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-text-secondary">{r.label}</span>
                  <span className="text-sm font-medium text-text-primary">{r.value}</span>
                </div>
              ))}
              <label className="flex items-start gap-2 mt-4 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" className="mt-0.5 rounded border-border" defaultChecked />
                <span>I agree to the Terms of Service, Privacy Policy, and Risk Disclosure.</span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary">
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="flex items-center gap-1 px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-colors">
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit} className="px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-colors" id="register-submit">
                Create Account
              </button>
            )}
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-text-secondary">
          Already have an account? <Link to="/login" className="text-brand font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
