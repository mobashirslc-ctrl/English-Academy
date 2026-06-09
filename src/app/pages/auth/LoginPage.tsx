import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { BookOpen, Eye, EyeOff, LogIn } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState('student');
  const [form, setForm] = useState({ email: '', password: '' });

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (role === 'student') navigate('/student');
    else if (role === 'teacher') navigate('/teacher');
    else navigate('/admin');
  }

  const roles = [
    { id: 'student', label: 'Student' },
    { id: 'teacher', label: 'Teacher' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div style={{ background: '#ea580c' }} className="p-2 rounded-xl">
              <BookOpen size={24} className="text-white" />
            </div>
          </div>
          <h1 className="font-bold text-white">EnglishPro Academy</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Role selector */}
          <div className="flex rounded-xl overflow-hidden border border-border mb-6">
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${role === r.id ? 'text-white' : 'text-muted-foreground hover:bg-muted/50'}`}
                style={role === r.id ? { background: '#ea580c' } : {}}
              >
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                {role === 'student' ? 'Student ID or Email' : 'Email Address'}
              </label>
              <input
                type="text"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder={role === 'student' ? 'EP-2024-001 or email@example.com' : 'admin@englishpro.com.bd'}
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-colors text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Link to="#" style={{ color: '#ea580c' }} className="text-xs hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-colors text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{ background: '#ea580c' }}
              className="w-full flex items-center justify-center gap-2 py-3 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors"
            >
              <LogIn size={16} /> Sign In as {roles.find(r => r.id === role)?.label}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#ea580c' }} className="font-medium hover:underline">Register Now</Link>
          </p>

          {/* Demo hint */}
          <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
            <strong>Demo:</strong> Select any role and click Sign In to explore the portal. No password needed.
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          <Link to="/" className="hover:text-slate-400">← Back to Website</Link>
        </p>
      </div>
    </div>
  );
}
