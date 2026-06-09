import { useState, useEffect } from 'react';
import { Clock, CheckCircle, Play, Pause } from 'lucide-react';

const passage = `The phenomenon of urbanisation has dramatically transformed human settlements over the past two centuries. As populations migrate from rural to urban areas in search of economic opportunities, cities have expanded at an unprecedented rate. This migration, driven by the promise of better employment, education, and healthcare, has created both opportunities and challenges for urban planners.

Environmental sustainability has emerged as one of the most pressing concerns in contemporary urban development. The concentration of millions of people in limited geographic areas inevitably strains natural resources and generates substantial waste. However, cities also represent opportunities for more efficient resource utilisation: compact living arrangements can reduce per capita energy consumption compared to sprawling suburban developments.

The concept of the "smart city" has gained considerable traction among policymakers and urban planners in recent decades. Proponents argue that integrating digital technologies into urban infrastructure can significantly improve the efficiency of public services, reduce energy consumption, and enhance the quality of life for residents. Sensor networks, data analytics, and artificial intelligence are being deployed to optimise traffic flow, monitor air quality, and manage waste collection.

Critics, however, raise valid concerns about privacy, data security, and social equity. The implementation of pervasive surveillance infrastructure, even when intended for benign purposes such as traffic management, inevitably creates vast repositories of data about citizens' movements and behaviours. Moreover, the financial investment required for smart city infrastructure may exacerbate existing inequalities if benefits accrue disproportionately to affluent neighbourhoods.`;

const questions = [
  { id: 1, text: 'What has primarily driven urban migration according to the passage?', options: ['Political stability', 'Economic opportunities, education, and healthcare', 'Climate change', 'Government policies'], answer: null },
  { id: 2, text: 'According to the passage, smart cities can improve quality of life through:', options: ['Increased housing', 'Digital technology integration', 'Rural development', 'Immigration control'], answer: null },
  { id: 3, text: 'True/False/Not Given: Smart cities always improve social equity.', options: ['True', 'False', 'Not Given'], answer: null },
  { id: 4, text: 'The word "traction" in paragraph 3 most closely means:', options: ['Speed', 'Acceptance/momentum', 'Technology', 'Direction'], answer: null },
  { id: 5, text: 'Which concern is NOT mentioned about smart cities?', options: ['Privacy', 'Data security', 'Job displacement', 'Social equity'], answer: null },
  { id: 6, text: 'What does the author suggest about compact living?', options: ['It is more dangerous', 'It may use less energy per person', 'It increases pollution', 'It creates unemployment'], answer: null },
];

export function IELTSReading() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [running, setRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const correctAnswers: Record<number, string> = {
    1: 'Economic opportunities, education, and healthcare',
    2: 'Digital technology integration',
    3: 'False',
    4: 'Acceptance/momentum',
    5: 'Job displacement',
    6: 'It may use less energy per person',
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (running && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running, timeLeft]);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const answered = Object.keys(answers).length;

  if (submitted) {
    const correct = Object.entries(answers).filter(([id, ans]) => correctAnswers[+id] === ans).length;
    const pct = Math.round((correct / questions.length) * 100);
    const band = pct >= 90 ? 8.5 : pct >= 80 ? 7.5 : pct >= 70 ? 7.0 : pct >= 60 ? 6.5 : 6.0;
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-border p-8 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#e0f2fe' }}>
            <CheckCircle size={32} className="text-blue-600" />
          </div>
          <h2 className="font-bold text-foreground mb-2">Reading Test Complete!</h2>
          <div className="flex justify-center gap-6 my-6">
            <div className="text-center">
              <div className="font-bold text-3xl text-blue-600">{correct}/{questions.length}</div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl" style={{ color: '#ea580c' }}>Band {band}</div>
              <div className="text-xs text-muted-foreground">Estimated</div>
            </div>
          </div>
          <div className="space-y-2 text-left mb-6">
            {questions.map(q => (
              <div key={q.id} className={`flex items-start gap-2 p-2 rounded-lg text-sm ${answers[q.id] === correctAnswers[q.id] ? 'bg-green-50' : 'bg-red-50'}`}>
                <span className={answers[q.id] === correctAnswers[q.id] ? 'text-green-600' : 'text-red-600'}>
                  {answers[q.id] === correctAnswers[q.id] ? '✓' : '✗'}
                </span>
                <div>
                  <div className="font-medium">{q.text}</div>
                  {answers[q.id] !== correctAnswers[q.id] && (
                    <div className="text-xs text-green-700">Correct: {correctAnswers[q.id]}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => { setSubmitted(false); setAnswers({}); setTimeLeft(60*60); }} style={{ background: '#0284c7' }} className="px-6 py-2 text-white rounded-lg text-sm">
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-foreground">IELTS Reading Test</h2>
          <p className="text-muted-foreground text-sm">Passage 1 • 6 questions • 60 minutes</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold ${timeLeft < 600 ? 'bg-red-100 text-red-600' : 'bg-muted text-foreground'}`}>
            <Clock size={16} /> {mins}:{secs}
          </div>
          <button
            onClick={() => setRunning(!running)}
            style={{ background: running ? '#dc2626' : '#0284c7' }}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-xl text-sm"
          >
            {running ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Start</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Passage */}
        <div className="bg-white rounded-xl border border-border p-5 overflow-y-auto max-h-[600px]">
          <h3 className="font-semibold text-foreground mb-3">Passage 1: Urbanisation and Smart Cities</h3>
          <div className="text-sm text-foreground leading-7 space-y-3">
            {passage.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((q, qi) => (
            <div key={q.id} className="bg-white rounded-xl border border-border p-4">
              <p className="font-medium text-foreground text-sm mb-2">Q{qi + 1}. {q.text}</p>
              <div className="space-y-1.5">
                {q.options.map(opt => (
                  <label key={opt} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border text-sm transition-colors ${answers[q.id] === opt ? 'border-blue-400 bg-blue-50' : 'border-transparent hover:bg-muted/40'}`}>
                    <input type="radio" name={`q${q.id}`} value={opt} checked={answers[q.id] === opt} onChange={() => setAnswers(p => ({ ...p, [q.id]: opt }))} className="accent-blue-500" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{answered}/{questions.length} answered</span>
            <button
              onClick={() => setSubmitted(true)}
              className="px-6 py-2 text-white rounded-lg text-sm"
              style={{ background: '#0284c7' }}
            >
              Submit Test ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
