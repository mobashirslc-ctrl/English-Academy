import { Users, BookOpen, ClipboardList, Calendar, TrendingUp, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const classesData = [
  { day: 'Mon', students: 24, present: 20 },
  { day: 'Tue', students: 18, present: 16 },
  { day: 'Wed', students: 24, present: 22 },
  { day: 'Thu', students: 18, present: 15 },
  { day: 'Fri', students: 30, present: 26 },
  { day: 'Sat', students: 22, present: 19 },
];

const todayClasses = [
  { time: '9:00 AM', batch: 'IELTS Batch A2', room: 'Room 201', students: 24, topic: 'Listening Section 3 Practice' },
  { time: '11:00 AM', batch: 'IELTS Batch A3', room: 'Room 201', students: 18, topic: 'Reading Passage Analysis' },
  { time: '4:00 PM', batch: 'Spoken English SE-2', room: 'Room 105', students: 15, topic: 'Advanced Grammar Review' },
  { time: '6:00 PM', batch: 'Online IELTS OB-1', room: 'Zoom', students: 22, topic: 'Writing Task 2 Workshop' },
];

const recentSubmissions = [
  { student: 'Tasneem Akter', assignment: 'Writing Task 2 Essay', submitted: '2 hours ago', status: 'pending' },
  { student: 'Ariful Islam', assignment: 'Reading Passage Summary', submitted: '4 hours ago', status: 'pending' },
  { student: 'Nusrat Jahan', assignment: 'Grammar Exercise Set 3', submitted: '1 day ago', status: 'reviewed' },
  { student: 'Farhan Hossain', assignment: 'Writing Task 1 Graph', submitted: '2 days ago', status: 'reviewed' },
];

export function TeacherDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-bold text-foreground">Welcome, Rafiqul!</h2>
        <p className="text-muted-foreground text-sm">Senior IELTS Trainer • Uttara Branch • 4 classes today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Students', value: '87', sub: 'Across 5 batches', icon: <Users size={18} />, color: '#ea580c' },
          { label: "Today's Classes", value: '4', sub: 'Next: 9:00 AM', icon: <Clock size={18} />, color: '#0284c7' },
          { label: 'Pending Assignments', value: '12', sub: 'Need review', icon: <ClipboardList size={18} />, color: '#d97706' },
          { label: 'Upcoming Exams', value: '2', sub: 'This week', icon: <Calendar size={18} />, color: '#7c3aed' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ background: card.color + '18', color: card.color }}>{card.icon}</div>
            </div>
            <div className="font-bold text-foreground">{card.value}</div>
            <div className="text-xs text-muted-foreground">{card.label}</div>
            <div className="text-xs text-muted-foreground">{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Attendance chart */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Weekly Attendance</h3>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={classesData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="students" name="Enrolled" fill="#f1f5f9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="present" name="Present" fill="#ea580c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Today's schedule */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Today's Classes</h3>
          <div className="space-y-2">
            {todayClasses.map((cls, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="text-center w-14 flex-shrink-0">
                  <div className="text-xs font-bold" style={{ color: '#ea580c' }}>{cls.time}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{cls.batch}</div>
                  <div className="text-xs text-muted-foreground">{cls.topic}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-medium text-foreground">{cls.students} students</div>
                  <div className="text-xs text-muted-foreground">{cls.room}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent submissions */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Recent Assignment Submissions</h3>
          <span className="text-xs text-muted-foreground">12 pending review</span>
        </div>
        <div className="divide-y divide-border">
          {recentSubmissions.map((s, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div style={{ background: '#ea580c' }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {s.student.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{s.student}</div>
                  <div className="text-xs text-muted-foreground">{s.assignment} • {s.submitted}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${s.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                  {s.status === 'pending' ? 'Needs Review' : 'Reviewed'}
                </span>
                {s.status === 'pending' && (
                  <button style={{ background: '#ea580c' }} className="text-white text-xs px-3 py-1 rounded-lg hover:bg-orange-700">
                    Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
