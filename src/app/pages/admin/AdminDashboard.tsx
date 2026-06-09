import { Users, GraduationCap, DollarSign, TrendingUp, Building2, AlertCircle, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const revenueData = [
  { month: 'Aug', revenue: 185000, expenses: 95000 },
  { month: 'Sep', revenue: 210000, expenses: 98000 },
  { month: 'Oct', revenue: 245000, expenses: 102000 },
  { month: 'Nov', revenue: 268000, expenses: 105000 },
  { month: 'Dec', revenue: 290000, expenses: 110000 },
  { month: 'Jan', revenue: 315000, expenses: 112000 },
];

const leadSourceData = [
  { name: 'Facebook', value: 42, color: '#1877f2' },
  { name: 'WhatsApp', value: 28, color: '#25d366' },
  { name: 'Website', value: 18, color: '#ea580c' },
  { name: 'Walk-in', value: 12, color: '#7c3aed' },
];

const branches = [
  { name: 'Uttara', students: 180, revenue: 720000, teachers: 5, growth: '+12%' },
  { name: 'Mirpur', students: 145, revenue: 580000, teachers: 4, growth: '+8%' },
  { name: 'Dhanmondi', students: 120, revenue: 480000, teachers: 3, growth: '+15%' },
  { name: 'Online', students: 98, revenue: 392000, teachers: 3, growth: '+32%' },
];

const recentLeads = [
  { name: 'Kamrul Hassan', course: 'Academic IELTS', source: 'Facebook', status: 'new', time: '30 min ago' },
  { name: 'Sumaiya Khatun', course: 'Spoken English', source: 'WhatsApp', status: 'follow-up', time: '2h ago' },
  { name: 'Tanveer Ahmed', course: 'Online IELTS', source: 'Website', status: 'interested', time: '4h ago' },
  { name: 'Rokshana Begum', course: 'Kids Program', source: 'Walk-in', status: 'converted', time: '1d ago' },
];

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  'follow-up': 'bg-yellow-100 text-yellow-700',
  interested: 'bg-purple-100 text-purple-700',
  converted: 'bg-green-100 text-green-700',
};

export function AdminDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-bold text-foreground">Admin Dashboard</h2>
        <p className="text-muted-foreground text-sm">EnglishPro Academy — All Branches Overview</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Students', value: '543', sub: '+28 this month', icon: <GraduationCap size={18} />, color: '#ea580c' },
          { label: 'Total Teachers', value: '15', sub: '4 branches', icon: <Users size={18} />, color: '#0284c7' },
          { label: 'Monthly Revenue', value: '৳3.15L', sub: '+8% vs last month', icon: <DollarSign size={18} />, color: '#16a34a' },
          { label: 'New Leads (MTD)', value: '87', sub: '62% conversion rate', icon: <TrendingUp size={18} />, color: '#7c3aed' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ background: card.color + '18', color: card.color }}>{card.icon}</div>
              <span className="text-xs text-green-600 font-medium">{card.sub}</span>
            </div>
            <div className="font-bold text-2xl text-foreground">{card.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Revenue vs Expenses</h3>
            <span className="text-xs text-muted-foreground">Last 6 months (BDT)</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `৳${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`৳${v.toLocaleString()}`, '']} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#16a34a" fill="url(#gr)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#dc2626" fill="url(#ge)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lead sources */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={leadSourceData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {leadSourceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Branch overview */}
      <div className="bg-white rounded-xl border border-border overflow-hidden mb-5">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Branch Overview</h3>
          <Building2 size={16} className="text-muted-foreground" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {['Branch', 'Students', 'Revenue', 'Teachers', 'Growth'].map(h => (
                  <th key={h} className="text-left p-3 text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {branches.map(b => (
                <tr key={b.name} className="hover:bg-muted/20">
                  <td className="p-3 font-medium text-foreground">{b.name}</td>
                  <td className="p-3 text-foreground">{b.students}</td>
                  <td className="p-3 font-medium" style={{ color: '#ea580c' }}>৳{b.revenue.toLocaleString()}</td>
                  <td className="p-3 text-foreground">{b.teachers}</td>
                  <td className="p-3 text-green-600 font-medium">{b.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Recent Leads</h3>
          <a href="/admin/leads" style={{ color: '#ea580c' }} className="text-xs hover:underline">View all →</a>
        </div>
        <div className="divide-y divide-border">
          {recentLeads.map((lead, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div style={{ background: '#ea580c' }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{lead.name}</div>
                  <div className="text-xs text-muted-foreground">{lead.course} • {lead.source} • {lead.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[lead.status]}`}>{lead.status}</span>
                {lead.status !== 'converted' && (
                  <button style={{ color: '#ea580c' }} className="text-xs hover:underline">Follow Up</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
