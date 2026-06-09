import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import {
  LayoutDashboard, BookOpen, Calendar, ClipboardList, BarChart3,
  CreditCard, Bell, User, LogOut, Menu, X, ChevronDown, ChevronRight,
  Users, GraduationCap, Briefcase, DollarSign, Settings, FileText,
  Mic, PenTool, Headphones, BookMarked, Target, TrendingUp,
  Building2, MessageSquare, Award
} from 'lucide-react';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

function getNavItems(role: string): NavItem[] {
  if (role === 'student') {
    return [
      { label: 'Dashboard', to: '/student', icon: <LayoutDashboard size={16} /> },
      { label: 'My Courses', to: '/student/courses', icon: <BookOpen size={16} /> },
      { label: 'Attendance', to: '/student/attendance', icon: <Calendar size={16} /> },
      { label: 'Assignments', to: '/student/assignments', icon: <ClipboardList size={16} /> },
      { label: 'IELTS Module', to: '/student/ielts', icon: <Target size={16} />, children: [
        { label: 'Listening', to: '/student/ielts/listening', icon: <Headphones size={14} /> },
        { label: 'Reading', to: '/student/ielts/reading', icon: <BookMarked size={14} /> },
        { label: 'Writing', to: '/student/ielts/writing', icon: <PenTool size={14} /> },
        { label: 'Speaking', to: '/student/ielts/speaking', icon: <Mic size={14} /> },
      ]},
      { label: 'Results', to: '/student/results', icon: <BarChart3 size={16} /> },
      { label: 'Payments', to: '/student/payments', icon: <CreditCard size={16} /> },
    ];
  }
  if (role === 'teacher') {
    return [
      { label: 'Dashboard', to: '/teacher', icon: <LayoutDashboard size={16} /> },
      { label: 'My Students', to: '/teacher/students', icon: <Users size={16} /> },
      { label: 'Assignments', to: '/teacher/assignments', icon: <ClipboardList size={16} /> },
      { label: 'Writing Eval', to: '/teacher/writing-eval', icon: <PenTool size={16} /> },
      { label: 'Speaking Eval', to: '/teacher/speaking-eval', icon: <Mic size={16} /> },
    ];
  }
  if (role === 'admin') {
    return [
      { label: 'Dashboard', to: '/admin', icon: <LayoutDashboard size={16} /> },
      { label: 'Leads (CRM)', to: '/admin/leads', icon: <TrendingUp size={16} /> },
      { label: 'Students', to: '/admin/students', icon: <GraduationCap size={16} /> },
      { label: 'Teachers', to: '/admin/teachers', icon: <Briefcase size={16} /> },
      { label: 'Batches', to: '/admin/batches', icon: <Building2 size={16} /> },
      { label: 'Accounts', to: '/admin/accounts', icon: <DollarSign size={16} /> },
      { label: 'Reports', to: '/admin/reports', icon: <BarChart3 size={16} /> },
      { label: 'Settings', to: '/admin/settings', icon: <Settings size={16} /> },
    ];
  }
  return [];
}

function getRole(pathname: string): string {
  if (pathname.startsWith('/teacher')) return 'teacher';
  if (pathname.startsWith('/admin')) return 'admin';
  return 'student';
}

function getRoleLabel(role: string) {
  if (role === 'teacher') return { title: 'Teacher Portal', user: 'Md. Rafiqul Islam', sub: 'Senior IELTS Trainer', avatar: 'RI' };
  if (role === 'admin') return { title: 'Admin ERP', user: 'Admin Karim', sub: 'Branch Admin • Uttara', avatar: 'AK' };
  return { title: 'Student Portal', user: 'Tasneem Akter', sub: 'IELTS Batch — A2', avatar: 'TA' };
}

function NavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = location.pathname === item.to;
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    const anyChildActive = item.children!.some(c => location.pathname === c.to);
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${anyChildActive || open ? 'text-orange-400 bg-white/10' : 'text-sidebar-foreground hover:bg-white/10 hover:text-white'}`}
        >
          <span className="flex items-center gap-2">{item.icon} {item.label}</span>
          {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>
        {open && (
          <div className="ml-4 mt-1 flex flex-col gap-0.5">
            {item.children!.map(child => (
              <NavLink key={child.to} item={child} depth={1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.to}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'text-white font-medium' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
      style={isActive ? { background: '#ea580c' } : {}}
    >
      {item.icon} {item.label}
    </Link>
  );
}

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const role = getRole(location.pathname);
  const navItems = getNavItems(role);
  const roleInfo = getRoleLabel(role);

  return (
    <div className="flex h-screen overflow-hidden bg-muted">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: '#1a1a2e' }}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div style={{ background: '#ea580c' }} className="p-1.5 rounded-lg">
              <BookOpen size={16} className="text-white" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">EnglishPro</div>
              <div className="text-slate-400 text-xs">{roleInfo.title}</div>
            </div>
          </Link>
          <button className="md:hidden text-slate-400" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div style={{ background: '#ea580c' }} className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
              {roleInfo.avatar}
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">{roleInfo.user}</div>
              <div className="text-slate-400 text-xs truncate">{roleInfo.sub}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto flex flex-col gap-0.5">
          {navItems.map(item => (
            <NavLink key={item.to} item={item} />
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-white/10 flex flex-col gap-1">
          <Link to="#" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
            <Bell size={16} /> Notifications
          </Link>
          <Link to="#" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
            <User size={16} /> Profile
          </Link>
          <button onClick={() => navigate('/login')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <div>
              <h1 className="font-semibold text-foreground capitalize">{roleInfo.title}</h1>
              <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString('en-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <Link to="/" className="text-xs text-muted-foreground hover:text-orange-600">← Public Site</Link>
            </div>
            <button className="relative">
              <Bell size={18} className="text-muted-foreground" />
              <span style={{ background: '#ea580c', fontSize: '10px' }} className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center">3</span>
            </button>
            <div style={{ background: '#ea580c' }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              {roleInfo.avatar}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
