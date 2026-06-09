import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { Download, TrendingUp } from 'lucide-react';

const attendanceData = [
  { branch: 'Uttara', rate: 88 },
  { branch: 'Mirpur', rate: 82 },
  { branch: 'Dhanmondi', rate: 85 },
  { branch: 'Online', rate: 76 },
];

const enrollmentTrend = [
  { month: 'Aug', students: 320 },
  { month: 'Sep', students: 365 },
  { month: 'Oct', students: 402 },
  { month: 'Nov', students: 445 },
  { month: 'Dec', students: 498 },
  { month: 'Jan', students: 543 },
];

const leadConversion = [
  { name: 'Converted', value: 62, color: '#16a34a' },
  { name: 'In Pipeline', value: 25, color: '#d97706' },
  { name: 'Lost', value: 13, color: '#dc2626' },
];

const teacherPerformance = [
  { name: 'Rafiqul Islam', rating: 4.9, students: 87, avgBand: 7.2 },
  { name: 'Rumana Akter', rating: 4.8, students: 62, avgBand: null },
  { name: 'Tanvir Ahmed', rating: 4.7, students: 54, avgBand: 6.9 },
  { name: 'Sabrina Chowdhury', rating: 4.9, students: 38, avgBand: null },
  { name: 'Nasir Uddin', rating: 4.6, students: 48, avgBand: 6.7 },
];

const reports = [
  { name: 'Monthly Revenue Report — January 2025', type: 'Financial', date: '9 Jan 2025' },
  { name: 'Student Attendance Report — December 2024', type: 'Attendance', date: '1 Jan 2025' },
  { name: 'IELTS Results Summary — Q4 2024', type: 'Academic', date: '28 Dec 2024' },
  { name: 'Lead Conversion Report — December 2024', type: 'CRM', date: '31 Dec 2024' },
  { name: 'Teacher Performance Review — Q4 2024', type: 'HR', date: '30 Dec 2024' },
];

export function AdminReports() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-foreground mb-1">Reports & Analytics</h2>
          <p className="text-muted-foreground text-sm">Comprehensive data insights across all operations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted/50">
          <Download size={14} /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Enrollment trend */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Student Enrollment Trend</h3>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={enrollmentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="students" stroke="#ea580c" strokeWidth={3} dot={{ fill: '#ea580c', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance by branch */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Attendance Rate by Branch</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={attendanceData} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="branch" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(v: number) => [`${v}%`, 'Attendance']} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="rate" fill="#ea580c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lead conversion */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Lead Conversion Rate</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={leadConversion} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {leadConversion.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {leadConversion.map(l => (
                <div key={l.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
                    <span className="text-sm text-foreground">{l.name}</span>
                  </div>
                  <span className="font-bold" style={{ color: l.color }}>{l.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Teacher performance */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Teacher Performance</h3>
          <div className="space-y-3">
            {teacherPerformance.map(t => (
              <div key={t.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div style={{ background: '#ea580c' }} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {t.name.split(' ')[0][0]}{t.name.split(' ')[1]?.[0] || ''}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.students} students</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-yellow-500">★ {t.rating}</div>
                  {t.avgBand && <div className="text-xs text-muted-foreground">Avg Band {t.avgBand}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent reports */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Generated Reports</h3>
        </div>
        <div className="divide-y divide-border">
          {reports.map((r, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/20">
              <div>
                <div className="text-sm font-medium text-foreground">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.type} • {r.date}</div>
              </div>
              <button style={{ color: '#ea580c' }} className="flex items-center gap-1 text-xs hover:underline">
                <Download size={12} /> Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
