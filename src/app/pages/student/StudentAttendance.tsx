import { CheckCircle, XCircle, Clock } from 'lucide-react';

const months = ['January 2025'];
const attendance: Record<string, Record<number, 'present' | 'absent' | 'late' | null>> = {
  'IELTS Listening': { 1: 'present', 3: 'present', 6: 'present', 8: 'present', 10: 'absent', 13: 'present', 15: 'late', 17: 'present', 20: 'present', 22: 'present', 24: 'present', 27: 'present', 29: 'present', 31: 'present' },
  'IELTS Writing': { 2: 'present', 5: 'present', 7: 'present', 9: 'late', 12: 'present', 14: 'present', 16: 'absent', 19: 'present', 21: 'present', 23: 'present', 26: 'present', 28: 'present', 30: 'present' },
};

const daysInJan = Array.from({ length: 31 }, (_, i) => i + 1);

export function StudentAttendance() {
  const summary = { present: 26, absent: 2, late: 2, total: 30 };
  const pct = Math.round((summary.present / summary.total) * 100);

  return (
    <div>
      <h2 className="font-bold text-foreground mb-1">Attendance</h2>
      <p className="text-muted-foreground text-sm mb-6">Monthly attendance record for all enrolled courses</p>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Present', value: summary.present, color: '#16a34a', icon: <CheckCircle size={16} /> },
          { label: 'Absent', value: summary.absent, color: '#dc2626', icon: <XCircle size={16} /> },
          { label: 'Late', value: summary.late, color: '#d97706', icon: <Clock size={16} /> },
          { label: 'Attendance %', value: `${pct}%`, color: '#ea580c', icon: <CheckCircle size={16} /> },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ background: s.color + '18', color: s.color }}>{s.icon}</div>
            <div>
              <div className="font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance progress bar */}
      <div className="bg-white rounded-xl border border-border p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-foreground text-sm">Overall Attendance</span>
          <span className="font-bold" style={{ color: pct >= 75 ? '#16a34a' : '#dc2626' }}>{pct}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div className="h-3 rounded-full transition-all" style={{ width: `${pct}%`, background: pct >= 75 ? '#16a34a' : '#dc2626' }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Minimum 75% attendance required to sit in exams</p>
      </div>

      {/* Calendar view */}
      <div className="bg-white rounded-xl border border-border p-5 mb-6">
        <h3 className="font-semibold text-foreground mb-4">January 2025 — Calendar View</h3>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
          ))}
        </div>
        {/* Jan 2025 starts on Wednesday (offset 3) */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 3 }, (_, i) => <div key={`empty-${i}`} />)}
          {daysInJan.map(day => {
            const listenStatus = attendance['IELTS Listening'][day];
            const writeStatus = attendance['IELTS Writing'][day];
            const status = listenStatus || writeStatus;
            return (
              <div
                key={day}
                className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium ${
                  status === 'present' ? 'text-white' :
                  status === 'absent' ? 'text-white' :
                  status === 'late' ? 'text-white' : 'bg-muted/30 text-muted-foreground'
                }`}
                style={{
                  background: status === 'present' ? '#16a34a' : status === 'absent' ? '#dc2626' : status === 'late' ? '#d97706' : undefined
                }}
                title={status ? `${status.charAt(0).toUpperCase() + status.slice(1)}` : 'No class'}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-600 inline-block" /> Present</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-600 inline-block" /> Absent</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-600 inline-block" /> Late</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-200 inline-block" /> No Class</span>
        </div>
      </div>

      {/* Detailed table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Attendance Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 text-xs font-semibold text-muted-foreground">Date</th>
                <th className="text-left p-3 text-xs font-semibold text-muted-foreground">Course</th>
                <th className="text-left p-3 text-xs font-semibold text-muted-foreground">Teacher</th>
                <th className="text-left p-3 text-xs font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { date: '31 Jan', course: 'IELTS Listening', teacher: 'Md. Rafiqul', status: 'present' },
                { date: '30 Jan', course: 'IELTS Writing', teacher: 'Tanvir Ahmed', status: 'present' },
                { date: '29 Jan', course: 'IELTS Listening', teacher: 'Md. Rafiqul', status: 'present' },
                { date: '28 Jan', course: 'IELTS Writing', teacher: 'Tanvir Ahmed', status: 'present' },
                { date: '27 Jan', course: 'IELTS Listening', teacher: 'Md. Rafiqul', status: 'present' },
                { date: '26 Jan', course: 'IELTS Writing', teacher: 'Tanvir Ahmed', status: 'present' },
                { date: '24 Jan', course: 'IELTS Listening', teacher: 'Md. Rafiqul', status: 'present' },
                { date: '23 Jan', course: 'IELTS Writing', teacher: 'Tanvir Ahmed', status: 'present' },
                { date: '22 Jan', course: 'IELTS Listening', teacher: 'Md. Rafiqul', status: 'present' },
                { date: '21 Jan', course: 'IELTS Writing', teacher: 'Tanvir Ahmed', status: 'present' },
                { date: '20 Jan', course: 'IELTS Listening', teacher: 'Md. Rafiqul', status: 'present' },
                { date: '16 Jan', course: 'IELTS Writing', teacher: 'Tanvir Ahmed', status: 'absent' },
                { date: '15 Jan', course: 'IELTS Listening', teacher: 'Md. Rafiqul', status: 'late' },
                { date: '14 Jan', course: 'IELTS Writing', teacher: 'Tanvir Ahmed', status: 'present' },
                { date: '10 Jan', course: 'IELTS Listening', teacher: 'Md. Rafiqul', status: 'absent' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3 text-foreground">{row.date}</td>
                  <td className="p-3 text-foreground">{row.course}</td>
                  <td className="p-3 text-muted-foreground">{row.teacher}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.status === 'present' ? 'bg-green-100 text-green-700' :
                      row.status === 'absent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {row.status === 'present' ? <CheckCircle size={11} /> : row.status === 'absent' ? <XCircle size={11} /> : <Clock size={11} />}
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
