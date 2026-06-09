import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

const courses = ['Academic IELTS', 'General IELTS', 'Online IELTS', 'Spoken English (Beginner)', 'Spoken English (Intermediate)', 'Spoken English (Advanced)', 'Kids Spoken English', 'O Level English', 'A Level English'];
const branches = ['Uttara Branch', 'Mirpur Branch', 'Dhanmondi Branch', 'Online'];

export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', email: '', dob: '', course: '', branch: '', password: '', confirm: '' });

  function next(e: React.FormEvent) {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else navigate('/student');
  }

  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)' }}>
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <div style={{ background: '#ea580c' }} className="p-2 rounded-xl">
              <BookOpen size={22} className="text-white" />
            </div>
          </div>
          <h1 className="font-bold text-white">Join EnglishPro Academy</h1>
          <p className="text-slate-400 text-sm mt-1">Start your English learning journey today</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {['Personal Info', 'Course Selection', 'Set Password'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'text-white' : 'bg-white/10 text-slate-400'}`}
                style={step === i + 1 ? { background: '#ea580c' } : {}}>
                {step > i + 1 ? <CheckCircle size={12} /> : <span>{i + 1}</span>}
                <span className="hidden sm:inline">{s}</span>
              </div>
              {i < 2 && <div className="w-6 h-px bg-white/20" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={next}>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                  <input required value={form.name} onChange={upd('name')} placeholder="Tasneem Akter" className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone *</label>
                    <input required value={form.phone} onChange={upd('phone')} placeholder="01700-000000" className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Date of Birth</label>
                    <input type="date" value={form.dob} onChange={upd('dob')} className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                  <input type="email" value={form.email} onChange={upd('email')} placeholder="tasneem@example.com" className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-sm" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground mb-4">Course Selection</h3>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Select Course *</label>
                  <select required value={form.course} onChange={upd('course')} className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-sm">
                    <option value="">-- Choose a course --</option>
                    {courses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Branch *</label>
                  <select required value={form.branch} onChange={upd('branch')} className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-sm">
                    <option value="">-- Choose a branch --</option>
                    {branches.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div style={{ background: '#fff7ed', borderColor: '#fed7aa' }} className="border rounded-lg p-3 text-sm text-muted-foreground">
                  💡 Our counsellor will call you within 24 hours to confirm your batch and schedule a free consultation.
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground mb-4">Create Password</h3>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Password *</label>
                  <input required type="password" value={form.password} onChange={upd('password')} placeholder="Minimum 8 characters" className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password *</label>
                  <input required type="password" value={form.confirm} onChange={upd('confirm')} placeholder="Re-enter password" className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-sm" />
                </div>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5" />
                  <span>I agree to the Terms & Conditions and Privacy Policy of EnglishPro Academy.</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-6">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted/50">
                  ← Back
                </button>
              )}
              <button
                type="submit"
                style={{ background: '#ea580c' }}
                className="ml-auto flex items-center gap-2 px-6 py-2.5 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors text-sm"
              >
                {step === 3 ? 'Complete Registration' : 'Continue'}
                <ArrowRight size={14} />
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-5">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#ea580c' }} className="font-medium hover:underline">Sign In</Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          <Link to="/" className="hover:text-slate-400">← Back to Website</Link>
        </p>
      </div>
    </div>
  );
}
