import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Award, TrendingUp, Download } from 'lucide-react';

const results = [
  { exam: 'Mock Test 1', date: '5 Jan 2025', listening: 6.5, reading: 6.0, writing: 5.5, speaking: 6.0, overall: 6.0, type: 'Mock Test' },
  { exam: 'Mock Test 2', date: '12 Jan 2025', listening: 7.0, reading: 6.5, writing: 6.0, speaking: 6.5, overall: 6.5, type: 'Mock Test' },
  { exam: 'Mock Test 3', date: '19 Jan 2025', listening: 7.0, reading: 7.0, writing: 6.5, speaking: 7.0, overall: 7.0, type: 'Mock Test' },
  { exam: 'Weekly Test — Grammar', date: '10 Jan 2025', marks: 78, total: 100, type: 'Weekly Test' },
  { exam: 'Weekly Test — Vocabulary', date: '17 Jan 2025', marks: 85, total: 100, type: 'Weekly Test' },
  { exam: 'Final Mock Exam', date: '25 Jan 2025', listening: 7.5, reading: 7.0, writing: 7.0, speaking: 7.5, overall: 7.25, type: 'Final Mock' },
];

const progressChart = [
  { name: 'Mock 1', band: 6.0 },
  { name: 'Mock 2', band: 6.5 },
  { name: 'Mock 3', band: 7.0 },
  { name: 'Final', band: 7.25 },
];

const bandColors = (band: number) => band >= 7 ? '#16a34a' : band >= 6 ? '#d97706' : '#dc2626';

export function StudentResults() {
  const best = Math.max(...results.filter(r => r.overall).map(r => r.overall || 0));

  return (
    <div>
      <h2 className="font-bold text-foreground mb-1">Exam Results</h2>
      <p className="text-muted-foreground text-sm mb-6">All test scores and performance history</p>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Best Band Score', value: best.toFixed(1), color: '#16a34a' },
          { label: 'Current Target', value: '7.5', color: '#ea580c' },
          { label: 'Tests Taken', value: results.filter(r => r.type.includes('Mock')).length, color: '#0284c7' },
          { label: 'Avg Score', value: '82%', color: '#7c3aed' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-4 text-center">
            <div className="font-bold text-2xl" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Band progression chart */}
      <div className="bg-white rounded-xl border border-border p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Band Score Progression</h3>
          <TrendingUp size={16} className="text-green-600" />
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={progressChart} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 9]} ticks={[0, 3, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => [`Band ${v}`, 'Score']} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
            <Bar dataKey="band" radius={[4, 4, 0, 0]}>
              {progressChart.map((entry, i) => <Cell key={i} fill={bandColors(entry.band)} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground text-center mt-2">Target: Band 7.5 for university admission</p>
      </div>

      {/* Mock Test results */}
      <div className="bg-white rounded-xl border border-border overflow-hidden mb-6">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">IELTS Mock Test Results</h3>
          <Award size={16} style={{ color: '#ea580c' }} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {['Exam', 'Date', 'Listening', 'Reading', 'Writing', 'Speaking', 'Overall', 'Action'].map(h => (
                  <th key={h} className="text-left p-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {results.filter(r => r.type !== 'Weekly Test').map((r, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-medium text-foreground whitespace-nowrap">{r.exam}</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">{r.date}</td>
                  {[r.listening, r.reading, r.writing, r.speaking].map((score, si) => (
                    <td key={si} className="p-3">
                      <span className="font-medium" style={{ color: bandColors(score || 0) }}>{score?.toFixed(1)}</span>
                    </td>
                  ))}
                  <td className="p-3">
                    <span className="font-bold px-2 py-1 rounded-lg text-white text-xs" style={{ background: bandColors(r.overall || 0) }}>
                      Band {r.overall?.toFixed(1)}
                    </span>
                  </td>
                  <td className="p-3">
                    <button style={{ color: '#ea580c' }} className="flex items-center gap-1 text-xs hover:underline">
                      <Download size={12} /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly test results */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Weekly Test Results</h3>
        </div>
        <div className="divide-y divide-border">
          {results.filter(r => r.type === 'Weekly Test').map((r, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground text-sm">{r.exam}</div>
                <div className="text-xs text-muted-foreground">{r.date}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-bold" style={{ color: '#ea580c' }}>{r.marks}/{r.total}</div>
                  <div className="text-xs text-muted-foreground">{Math.round((r.marks! / r.total!) * 100)}%</div>
                </div>
                <div className="w-20 bg-muted rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${(r.marks! / r.total!) * 100}%`, background: '#ea580c' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
