import { Link } from 'react-router';
import { Headphones, BookOpen, PenTool, Mic, Target, TrendingUp, Award } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const modules = [
  { title: 'Listening', to: '/student/ielts/listening', icon: <Headphones size={22} />, color: '#ea580c', band: 7.0, tests: 12, lastTest: '19 Jan' },
  { title: 'Reading', to: '/student/ielts/reading', icon: <BookOpen size={22} />, color: '#0284c7', band: 7.0, tests: 10, lastTest: '17 Jan' },
  { title: 'Writing', to: '/student/ielts/writing', icon: <PenTool size={22} />, color: '#7c3aed', band: 6.5, tests: 8, lastTest: '15 Jan' },
  { title: 'Speaking', to: '/student/ielts/speaking', icon: <Mic size={22} />, color: '#16a34a', band: 7.0, tests: 6, lastTest: '18 Jan' },
];

const radarData = [
  { subject: 'Listening', A: 7.0 },
  { subject: 'Reading', A: 7.0 },
  { subject: 'Writing', A: 6.5 },
  { subject: 'Speaking', A: 7.0 },
];

const bandDescriptors: Record<number, string> = {
  9: 'Expert User',
  8: 'Very Good User',
  7: 'Good User',
  6: 'Competent User',
  5: 'Modest User',
};

function getBandDesc(band: number) {
  const floor = Math.floor(band);
  return bandDescriptors[floor] || bandDescriptors[5];
}

export function IELTSDashboard() {
  const overall = ((7.0 + 7.0 + 6.5 + 7.0) / 4).toFixed(1);

  return (
    <div>
      <h2 className="font-bold text-foreground mb-1">IELTS Module</h2>
      <p className="text-muted-foreground text-sm mb-6">Practice all 4 IELTS skills with timed tests and instant feedback</p>

      {/* Band prediction banner */}
      <div className="rounded-xl p-5 mb-6 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #1a1a2e, #2d2d44)' }}>
        <div>
          <div className="text-slate-400 text-sm mb-1">Predicted Band Score</div>
          <div className="flex items-end gap-2">
            <div className="font-bold text-5xl" style={{ color: '#f97316' }}>{overall}</div>
            <div className="text-white pb-1 font-medium">{getBandDesc(parseFloat(overall))}</div>
          </div>
          <div className="flex items-center gap-1 text-green-400 text-sm mt-1">
            <TrendingUp size={14} /> +1.0 improvement from first mock
          </div>
        </div>
        <div className="hidden md:block">
          <ResponsiveContainer width={180} height={150}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.15)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 9]} tick={false} />
              <Radar dataKey="A" stroke="#ea580c" fill="#ea580c" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Module cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {modules.map(mod => (
          <Link key={mod.title} to={mod.to} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl" style={{ background: mod.color + '18', color: mod.color }}>
                {mod.icon}
              </div>
              <div className="text-right">
                <div className="font-bold text-2xl" style={{ color: mod.color }}>Band {mod.band}</div>
                <div className="text-xs text-muted-foreground">{getBandDesc(mod.band)}</div>
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{mod.title}</h3>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{mod.tests} tests completed</span>
              <span>Last: {mod.lastTest}</span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all" style={{ color: mod.color }}>
              Practice Now →
            </div>
          </Link>
        ))}
      </div>

      {/* Vocabulary & Grammar quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600"><Target size={16} /></div>
            <h3 className="font-semibold text-foreground">Vocabulary Builder</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Learn 10 new IELTS words daily. Current streak: 14 days</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {['ubiquitous', 'proliferation', 'detrimental', 'albeit', 'conjecture'].map(w => (
              <span key={w} className="bg-yellow-50 text-yellow-800 border border-yellow-200 px-2 py-0.5 rounded text-xs">{w}</span>
            ))}
          </div>
          <button className="text-yellow-600 text-xs hover:underline font-medium">View all vocabulary →</button>
        </div>

        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600"><Award size={16} /></div>
            <h3 className="font-semibold text-foreground">Grammar Essentials</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Master key grammar structures for IELTS band 7+</p>
          <div className="space-y-1.5">
            {['Conditional Sentences', 'Passive Voice', 'Complex Sentences', 'Cohesive Devices'].map((g, i) => (
              <div key={g} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{g}</span>
                <div className="w-20 bg-muted rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-purple-500" style={{ width: `${[80, 65, 70, 55][i]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
