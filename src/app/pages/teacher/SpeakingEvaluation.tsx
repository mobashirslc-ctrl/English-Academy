import { useState } from 'react';
import { Mic, Play, CheckCircle } from 'lucide-react';

const recordings = [
  { id: 1, student: 'Nusrat Jahan', batch: 'IELTS A3', part: 'Part 1 & 2', duration: '6:42', submitted: '1d ago' },
  { id: 2, student: 'Sadia Rahman', batch: 'IELTS A3', part: 'Full Speaking', duration: '12:15', submitted: '2d ago' },
];

const criteria = [
  { key: 'fluency', label: 'Fluency & Coherence', icon: '🗣️', desc: 'Natural flow, minimal hesitation, connected speech' },
  { key: 'lexical', label: 'Lexical Resource', icon: '📚', desc: 'Vocabulary range, idiomatic language, paraphrasing' },
  { key: 'grammar', label: 'Grammatical Range & Accuracy', icon: '✍️', desc: 'Variety of structures, tense control, error frequency' },
  { key: 'pronunciation', label: 'Pronunciation', icon: '🔊', desc: 'Clarity, intonation, word stress, accent intelligibility' },
];

export function SpeakingEvaluation() {
  const [selected, setSelected] = useState(1);
  const [scores, setScores] = useState<Record<number, Record<string, number>>>({});
  const [comments, setComments] = useState<Record<number, string>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});
  const [playing, setPlaying] = useState(false);

  const rec = recordings.find(r => r.id === selected)!;
  const currentScores = scores[selected] || {};
  const avgBand = Object.values(currentScores).length === 4
    ? (Object.values(currentScores).reduce((a, b) => a + b, 0) / 4).toFixed(1)
    : null;

  return (
    <div>
      <h2 className="font-bold text-foreground mb-1">Speaking Evaluation</h2>
      <p className="text-muted-foreground text-sm mb-6">Listen to recordings and score each speaking criterion</p>

      {/* Selector */}
      <div className="flex gap-3 mb-5">
        {recordings.map(r => (
          <button
            key={r.id}
            onClick={() => setSelected(r.id)}
            className={`flex-1 p-3 rounded-xl border text-left text-sm transition-colors ${selected === r.id ? 'border-green-400 bg-green-50' : 'border-border bg-white hover:border-green-200'}`}
          >
            <div className="font-medium text-foreground flex items-center justify-between">
              {r.student}
              {saved[r.id] && <CheckCircle size={14} className="text-green-600" />}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{r.part} • {r.duration}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Audio player */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-border p-5">
            <div className="flex items-center gap-3 mb-4">
              <Mic size={20} className="text-green-600" />
              <div>
                <div className="font-semibold text-foreground text-sm">{rec.student} — {rec.part}</div>
                <div className="text-xs text-muted-foreground">Submitted {rec.submitted}</div>
              </div>
            </div>

            {/* Mock audio player */}
            <div style={{ background: '#1a1a2e' }} className="rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => setPlaying(!playing)}
                  style={{ background: '#ea580c' }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
                >
                  <Play size={14} className={playing ? 'hidden' : ''} />
                  {playing && <span className="text-xs">II</span>}
                </button>
                <div className="flex-1">
                  <div className="w-full bg-white/20 rounded-full h-2 cursor-pointer">
                    <div className="h-2 rounded-full" style={{ width: playing ? '35%' : '0%', background: '#ea580c', transition: 'width 0.5s' }} />
                  </div>
                </div>
                <span className="text-slate-400 text-xs font-mono">{rec.duration}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                {['Part 1', 'Part 2', 'Part 3'].map(p => (
                  <button key={p} className="hover:text-slate-300 transition-colors">{p}</button>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
              💡 <strong>Evaluation Tips:</strong> Score based on a full-test impression, not individual sentences. Reward range and flexibility over accuracy alone.
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-3 text-sm">Detailed Comments</h3>
            <textarea
              value={comments[selected] || ''}
              onChange={e => setComments(p => ({ ...p, [selected]: e.target.value }))}
              rows={5}
              placeholder="e.g., Strong vocabulary range but some hesitation in Part 3. Pronunciation clear with minor stress errors. Recommend practising complex sentence structures..."
              className="w-full p-3 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500/30 bg-input-background"
            />
          </div>
        </div>

        {/* Scoring */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4 text-sm">Band Score per Criterion</h3>
            <div className="space-y-5">
              {criteria.map(c => (
                <div key={c.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{c.icon} {c.label}</span>
                    {currentScores[c.key] && <span className="font-bold text-green-600">Band {currentScores[c.key]}</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{c.desc}</p>
                  <div className="flex gap-1">
                    {[4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map(band => (
                      <button
                        key={band}
                        onClick={() => setScores(p => ({ ...p, [selected]: { ...p[selected], [c.key]: band } }))}
                        className={`flex-1 py-1 rounded text-xs font-medium transition-colors ${currentScores[c.key] === band ? 'text-white' : 'bg-muted text-muted-foreground hover:bg-green-100 hover:text-green-700'}`}
                        style={currentScores[c.key] === band ? { background: '#16a34a' } : {}}
                      >
                        {band}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {avgBand && (
              <div className="mt-5 p-4 rounded-xl flex items-center justify-between bg-green-50 border border-green-200">
                <span className="font-semibold text-green-800">Overall Speaking Band</span>
                <span className="font-bold text-3xl text-green-700">Band {avgBand}</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setSaved(p => ({ ...p, [selected]: true }))}
            style={{ background: '#16a34a' }}
            className="w-full flex items-center justify-center gap-2 py-3 text-white rounded-xl text-sm hover:bg-green-700"
          >
            <CheckCircle size={14} /> Save Speaking Evaluation
          </button>
          {saved[selected] && (
            <p className="text-center text-sm text-green-600 flex items-center justify-center gap-1">
              <CheckCircle size={14} /> Evaluation saved and sent to {rec.student}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
