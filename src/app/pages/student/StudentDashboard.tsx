import { Link } from 'react-router';
import { BookOpen, Calendar, Clock, DollarSign, TrendingUp, Bell, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const progressData = [
  { week: 'W1', listening: 55, reading: 48, writing: 42, speaking: 50 },
  { week: 'W2', listening: 62, reading: 55, writing: 48, speaking: 55 },
  { week: 'W3', listening: 68, reading: 60, writing: 54, speaking: 62 },
  { week: 'W4', listening: 72, reading: 65, writing: 58, speaking: 66 },
  { week: 'W5', listening: 75, reading: 70, writing: 62, speaking: 70 },
  { week: 'W6', listening: 80, reading: 74, writing: 67, speaking: 73 },
];

const radarData = [
  { subject: 'Listening', score: 80, fullMark: 100 },
  { subject: 'Reading', score: 74, fullMark: 100 },
  { subject: 'Writing', score: 67, fullMark: 100 },
  { subject: 'Speaking', score: 73, fullMark: 100 },
  { subject: 'Vocabulary', score: 70, fullMark: 100 },
  { subject: 'Grammar', score: 65, fullMark: 100 },
];

const schedule = [
  { day: 'Monday', time: '9:00 AM', subject: 'IELTS Listening', teacher: 'Md. Rafiqul Islam', room: 'Room 201' },
  { day: 'Monday', time: '6:00 PM', subject: 'Spoken English', teacher: 'Rumana Akter', room: 'Online' },
  { day: 'Wednesday', time: '9:00 AM', subject: 'IELTS Reading', teacher: 'Tanvir Ahmed', room: 'Room 201' },
  { day: 'Friday', time: '9:00 AM', subject: 'IELTS Writing', teacher: 'Tanvir Ahmed', room: 'Room 201' },
  { day: 'Friday', time: '6:00 PM', subject: 'Mock Test', teacher: 'Md. Rafiqul Islam', room: 'Hall A' },
];

const notifications = [
  { type: 'exam', text: 'Mock Test scheduled for Friday 9 AM', time: '2 hours ago' },
  { type: 'assignment', text: 'New writing assignment: Task 2 Essay due Sunday', time: '5 hours ago' },
  { type: 'fee', text: 'February fee payment due in 5 days', time: '1 day ago' },
  { type: 'result', text: 'Listening Test result published — Band 7.0', time: '2 days ago' },
];

export function StudentDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-bold text-foreground">Welcome back, Tasneem!</h2>
        <p className="text-muted-foreground text-sm">Academic IELTS • Batch A2 • Uttara Branch</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Enrolled Courses', value: '2', sub: 'Academic IELTS + Spoken', icon: <BookOpen size={18} />, color: '#ea580c' },
          { label: 'Upcoming Class', value: 'Today', sub: 'IELTS Listening @ 9 AM', icon: <Clock size={18} />, color: '#0284c7' },
          { label: 'Attendance', value: '87%', sub: '26/30 classes attended', icon: <Calendar size={18} />, color: '#16a34a' },
          { label: 'Due Amount', value: '৳3,000', sub: 'February fee due', icon: <DollarSign size={18} />, color: '#dc2626' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ background: card.color + '18', color: card.color }}>
                {card.icon}
              </div>
            </div>
            <div className="font-bold text-foreground">{card.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{card.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Progress chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Weekly Progress Report</h3>
            <span className="text-xs text-muted-foreground">Last 6 weeks</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={progressData}>
              <defs>
                {[{ k: 'l', c: '#ea580c' }, { k: 'r', c: '#0284c7' }, { k: 'w', c: '#7c3aed' }, { k: 's', c: '#16a34a' }].map(g => (
                  <linearGradient key={g.k} id={`g${g.k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={g.c} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={g.c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[40, 100]} />
              <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid rgba(0,0,0,0.08)' }} />
              <Area type="monotone" dataKey="listening" name="Listening" stroke="#ea580c" fill="url(#gl)" strokeWidth={2} />
              <Area type="monotone" dataKey="reading" name="Reading" stroke="#0284c7" fill="url(#gr)" strokeWidth={2} />
              <Area type="monotone" dataKey="writing" name="Writing" stroke="#7c3aed" fill="url(#gw)" strokeWidth={2} />
              <Area type="monotone" dataKey="speaking" name="Speaking" stroke="#16a34a" fill="url(#gs)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skills radar */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Skills Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(0,0,0,0.08)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
              <Radar name="Score" dataKey="score" stroke="#ea580c" fill="#ea580c" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-2 text-center">
            <div className="font-bold" style={{ color: '#ea580c' }}>Estimated Band: 7.0</div>
            <div className="text-xs text-muted-foreground">Based on last 3 mock tests</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Weekly schedule */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Class Schedule</h3>
            <TrendingUp size={16} className="text-muted-foreground" />
          </div>
          <div className="space-y-2">
            {schedule.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="text-center w-16 flex-shrink-0">
                  <div className="text-xs font-medium text-foreground">{s.day}</div>
                  <div className="text-xs text-muted-foreground">{s.time}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{s.subject}</div>
                  <div className="text-xs text-muted-foreground">{s.teacher} • {s.room}</div>
                </div>
                <div style={{ background: '#fff7ed', color: '#ea580c' }} className="text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                  Upcoming
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <Bell size={16} className="text-muted-foreground" />
          </div>
          <div className="space-y-2">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="mt-0.5 flex-shrink-0">
                  {n.type === 'exam' && <AlertCircle size={15} style={{ color: '#ea580c' }} />}
                  {n.type === 'assignment' && <BookOpen size={15} style={{ color: '#0284c7' }} />}
                  {n.type === 'fee' && <DollarSign size={15} className="text-red-500" />}
                  {n.type === 'result' && <CheckCircle size={15} className="text-green-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="#" style={{ color: '#ea580c' }} className="text-xs flex items-center gap-1 mt-3 hover:underline">
            View all notifications <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
