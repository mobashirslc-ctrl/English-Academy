import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Clock, Headphones } from 'lucide-react';

const questions = [
  { id: 1, section: 'Section 1', text: 'What is the woman\'s surname?', type: 'short-answer', answer: '' },
  { id: 2, section: 'Section 1', text: 'What is the man\'s phone number?', type: 'short-answer', answer: '' },
  { id: 3, section: 'Section 1', text: 'Where does the woman live?', options: ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi'], type: 'mcq', answer: '' },
  { id: 4, section: 'Section 2', text: 'The museum opens at _____ on weekdays.', type: 'fill-blank', answer: '' },
  { id: 5, section: 'Section 2', text: 'Which section contains ancient artifacts?', options: ['Section A', 'Section B', 'Section C', 'Section D'], type: 'mcq', answer: '' },
  { id: 6, section: 'Section 3', text: 'What is the main topic of the students\' project?', options: ['Climate change', 'Renewable energy', 'Water conservation', 'Air pollution'], type: 'mcq', answer: '' },
  { id: 7, section: 'Section 3', text: 'When is the project deadline?', type: 'short-answer', answer: '' },
  { id: 8, section: 'Section 4', text: 'The lecture focuses on _____ management in urban areas.', type: 'fill-blank', answer: '' },
];

export function IELTSListening() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [running, setRunning] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState('Section 1');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (running && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running, timeLeft]);

  const sections = Array.from(new Set(questions.map(q => q.section)));
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const answered = Object.keys(answers).length;

  if (submitted) {
    const score = Math.floor(Math.random() * 5) + 28; // demo score
    const band = score >= 39 ? 9 : score >= 37 ? 8.5 : score >= 35 ? 8 : score >= 33 ? 7.5 : score >= 30 ? 7 : score >= 27 ? 6.5 : 6;
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-border p-8 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#fff7ed' }}>
            <CheckCircle size={32} style={{ color: '#ea580c' }} />
          </div>
          <h2 className="font-bold text-foreground mb-2">Listening Test Complete!</h2>
          <div className="flex justify-center gap-6 my-6">
            <div className="text-center">
              <div className="font-bold text-3xl" style={{ color: '#ea580c' }}>{score}/40</div>
              <div className="text-xs text-muted-foreground">Raw Score</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl text-green-600">Band {band}</div>
              <div className="text-xs text-muted-foreground">IELTS Band</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl text-blue-600">{answered}</div>
              <div className="text-xs text-muted-foreground">Attempted</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">Great performance! Focus on Section 3 & 4 to improve further.</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => { setSubmitted(false); setAnswers({}); setTimeLeft(30*60); }} className="px-4 py-2 border border-border rounded-lg text-sm">Retake Test</button>
            <button style={{ background: '#ea580c' }} className="px-6 py-2 text-white rounded-lg text-sm hover:bg-orange-700">View Answers</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-foreground">IELTS Listening Test</h2>
          <p className="text-muted-foreground text-sm">40 questions • 4 sections • 30 minutes</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold ${timeLeft < 300 ? 'bg-red-100 text-red-600' : 'bg-muted text-foreground'}`}>
            <Clock size={16} /> {mins}:{secs}
          </div>
          <button
            onClick={() => setRunning(!running)}
            style={{ background: running ? '#dc2626' : '#ea580c' }}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-xl text-sm"
          >
            {running ? <><Pause size={14} /> Pause</> : <><Play size={14} /> {timeLeft === 30*60 ? 'Start' : 'Resume'}</>}
          </button>
        </div>
      </div>

      {/* Audio player mock */}
      <div style={{ background: '#1a1a2e' }} className="rounded-xl p-4 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Headphones size={20} className="text-orange-400" />
          <div>
            <div className="text-white text-sm font-medium">Section 1: A phone conversation</div>
            <div className="text-slate-400 text-xs">Track 1 of 4 • 08:32</div>
          </div>
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          style={{ background: '#ea580c' }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white text-xs"
        >
          {playing ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Play</>}
        </button>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {sections.map(sec => (
          <button
            key={sec}
            onClick={() => setCurrentSection(sec)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentSection === sec ? 'text-white' : 'bg-white border border-border text-muted-foreground hover:text-foreground'}`}
            style={currentSection === sec ? { background: '#ea580c' } : {}}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.filter(q => q.section === currentSection).map((q, qi) => {
          const globalIdx = questions.findIndex(x => x.id === q.id) + 1;
          return (
            <div key={q.id} className="bg-white rounded-xl border border-border p-5">
              <p className="font-medium text-foreground mb-3">Q{globalIdx}. {q.text}</p>
              {q.type === 'mcq' && q.options && (
                <div className="space-y-2">
                  {q.options.map(opt => (
                    <label key={opt} className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer border transition-colors ${answers[q.id] === opt ? 'border-orange-400 bg-orange-50' : 'border-transparent hover:bg-muted/40'}`}>
                      <input type="radio" name={`q${q.id}`} value={opt} checked={answers[q.id] === opt} onChange={() => setAnswers(p => ({ ...p, [q.id]: opt }))} className="accent-orange-500" />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              )}
              {(q.type === 'short-answer' || q.type === 'fill-blank') && (
                <input
                  type="text"
                  value={answers[q.id] || ''}
                  onChange={e => setAnswers(p => ({ ...p, [q.id]: e.target.value }))}
                  placeholder={q.type === 'fill-blank' ? 'Fill in the blank...' : 'Type your answer...'}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 bg-input-background"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          {answered} of {questions.length} questions answered
        </div>
        <div className="flex gap-3">
          {currentSection !== sections[sections.length - 1] ? (
            <button
              onClick={() => setCurrentSection(sections[sections.indexOf(currentSection) + 1])}
              style={{ background: '#ea580c' }}
              className="px-5 py-2 text-white rounded-lg text-sm"
            >
              Next Section →
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              style={{ background: '#16a34a' }}
              className="px-5 py-2 text-white rounded-lg text-sm"
            >
              Submit Test ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
