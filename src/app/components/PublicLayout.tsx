import { Outlet, Link, useLocation } from 'react-router';
import { useState } from 'react';
import { Menu, X, BookOpen, Phone, ChevronDown } from 'lucide-react';

export function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Courses', to: '/courses' },
    { label: 'Free Mock Test', to: '/mock-test' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div style={{ background: '#ea580c' }} className="text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-sm">🎓 Bangladesh's Premier English Coaching Institute</span>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1"><Phone size={12} /> +880 1700-000000</span>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="bg-white text-orange-600 px-3 py-0.5 rounded-full hover:bg-orange-50 transition-colors">Register</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div style={{ background: '#ea580c' }} className="p-1.5 rounded-lg">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <span className="font-semibold text-foreground">EnglishPro</span>
              <span style={{ color: '#ea580c' }} className="font-semibold"> Academy</span>
              <div className="text-xs text-muted-foreground leading-none">IELTS | Spoken | English Medium</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-orange-600 ${location.pathname === link.to ? 'text-orange-600 border-b-2 border-orange-600 pb-0.5' : 'text-foreground'}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="relative group">
              <button className="text-sm font-medium text-foreground flex items-center gap-1 hover:text-orange-600">
                Portals <ChevronDown size={14} />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/student" className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 rounded-t-lg">Student Portal</Link>
                <Link to="/teacher" className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600">Teacher Portal</Link>
                <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 rounded-b-lg">Admin ERP</Link>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-foreground hover:text-orange-600">Login</Link>
            <Link to="/register" style={{ background: '#ea580c' }} className="text-sm text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Enroll Now
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 py-3 flex flex-col gap-3">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="text-sm font-medium" onClick={() => setMenuOpen(false)}>{link.label}</Link>
            ))}
            <Link to="/student" className="text-sm font-medium text-orange-600" onClick={() => setMenuOpen(false)}>Student Portal</Link>
            <Link to="/teacher" className="text-sm font-medium text-orange-600" onClick={() => setMenuOpen(false)}>Teacher Portal</Link>
            <Link to="/admin" className="text-sm font-medium text-orange-600" onClick={() => setMenuOpen(false)}>Admin ERP</Link>
            <Link to="/login" style={{ background: '#ea580c' }} className="text-sm text-white px-4 py-2 rounded-lg text-center" onClick={() => setMenuOpen(false)}>Login / Register</Link>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ background: '#1a1a2e' }} className="text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div style={{ background: '#ea580c' }} className="p-1.5 rounded-lg">
                <BookOpen size={16} className="text-white" />
              </div>
              <span className="font-semibold">EnglishPro Academy</span>
            </div>
            <p className="text-sm text-slate-400">Bangladesh's leading English coaching institute with branches in Uttara, Mirpur, and Dhanmondi.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Courses</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <span>Academic IELTS</span><span>General IELTS</span><span>Spoken English</span><span>Kids Program</span><span>English Medium Support</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Branches</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <span>Uttara Branch</span><span>Mirpur Branch</span><span>Dhanmondi Branch</span><span>Online Branch</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <span>📞 +880 1700-000000</span>
              <span>📧 info@englishpro.com.bd</span>
              <span>🌐 www.englishpro.com.bd</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-slate-700 pt-4 text-center text-sm text-slate-500">
          © 2024 EnglishPro Academy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
