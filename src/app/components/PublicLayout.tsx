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
          <span className="text-sm">🎓 English Academy — Bangladesh's Premier Multi-Platform Education Hub</span>
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
              <span className="font-semibold text-foreground">English</span>
              <span style={{ color: '#ea580c' }} className="font-semibold"> Academy</span>
              <div className="text-xs text-muted-foreground leading-none">A Multi-Platform Education Hub</div>
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

            {/* 🎯 এখানে 'Our Platforms' ড্রপডাউনটি যুক্ত করা হয়েছে */}
            <div className="relative group">
              <button className="text-sm font-medium text-foreground flex items-center gap-1 hover:text-orange-600">
                Our Platforms <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {/* ১. Saifur's Kishoreganj Platform */}
                <div className="px-4 py-2 bg-orange-50/40 border-b border-gray-100 rounded-t-lg">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Saifur's Kishoreganj</span>
                </div>
                <div className="pl-2 py-1 bg-white">
                  <Link to="/saifurs/ielts" className="block px-4 py-1.5 text-sm hover:text-orange-600">- IELTS</Link>
                  <Link to="/saifurs/spoken" className="block px-4 py-1.5 text-sm hover:text-orange-600">- Spoken English</Link>
                  <Link to="/saifurs/kids" className="block px-4 py-1.5 text-sm hover:text-orange-600">- Kids Spoken</Link>
                </div>

                {/* ২. Mirpur Cadet Coaching Platform */}
                <div className="px-4 py-2 bg-emerald-50/40 border-t border-b border-gray-100 mt-1">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Mirpur Cadet Coaching</span>
                </div>
                <div className="pl-2 py-1 bg-white">
                  <Link to="/cadet/admission" className="block px-4 py-1.5 text-sm hover:text-emerald-600">- Cadet Admission</Link>
                  <Link to="/cadet/branches" className="block px-4 py-1.5 text-sm hover:text-emerald-600">- Branch Info</Link>
                </div>

                {/* ৩. Upcoming English Medium Academy */}
                <div className="px-4 py-2 bg-blue-50/40 border-t border-b border-gray-100 mt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">English Medium Academy</span>
                    <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full font-medium">Upcoming</span>
                  </div>
                </div>
                <Link to="/english-medium" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-slate-50 rounded-b-lg bg-white">View Details</Link>
              </div>
            </div>

            {/* Portals Dropdown */}
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 py-3 flex flex-col gap-3">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="text-sm font-medium" onClick={() => setMenuOpen(false)}>{link.label}</Link>
            ))}
            <div className="h-[1px] bg-gray-100 my-1"></div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Our Platforms</div>
            <Link to="/saifurs/ielts" className="text-sm pl-2 text-orange-600" onClick={() => setMenuOpen(false)}>Saifur's Kishoreganj</Link>
            <Link to="/cadet/admission" className="text-sm pl-2 text-emerald-600" onClick={() => setMenuOpen(false)}>Mirpur Cadet Coaching</Link>
            <Link to="/english-medium" className="text-sm pl-2 text-blue-600" onClick={() => setMenuOpen(false)}>English Medium Academy (Soon)</Link>
            <div className="h-[1px] bg-gray-100 my-1"></div>
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

      {/* 🎯 ফুটার আপডেট করা হয়েছে আপনার নতুন প্ল্যাটফর্মগুলোর নাম দিয়ে */}
      <footer style={{ background: '#1a1a2e' }} className="text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div style={{ background: '#ea580c' }} className="p-1.5 rounded-lg">
                <BookOpen size={16} className="text-white" />
              </div>
              <span className="font-semibold">English Academy</span>
            </div>
            <p className="text-sm text-slate-400"> مرکزی تعلیمی نیٹ ورک — A centralized multi-platform educational ecosystem powering premier coaching and academic institutes.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Saifur's Kishoreganj</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <span>Academic & General IELTS</span>
              <span>Spoken English</span>
              <span>Kids Spoken Program</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Mirpur Cadet Coaching</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <span>Cadet College Admission</span>
              <span>School Support Program</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Upcoming Platforms</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                English Medium Academy <span className="text-[10px] bg-blue-600 text-white px-1 rounded">Soon</span>
              </span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-slate-700 pt-4 text-center text-sm text-slate-500">
          © 2026 Mobashir Ahmed Nasrullah. All rights reserved.
        </div>
      </footer>
    </div>
  );
}