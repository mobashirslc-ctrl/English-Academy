import { useState } from 'react';
import { Headphones, BookOpen, PenTool, Mic, Clock, CheckCircle, ArrowRight, Play, ChevronRight } from 'lucide-react';

const sections = [
  {
    id: 'listening',
    title: 'Listening Test',
    icon: <Headphones size={20} />,
    color: '#ea580c',
    duration: '30 min',
    questions: 40,
    description: 'Test your ability to understand spoken English. 4 sections with different question types.',
    status: 'available'
  },
  {
    id: 'reading',
    title: 'Reading Test',
    icon: <BookOpen size={20} />,
    color: '#0284c7',
    duration: '60 min',
    questions: 40,
    description: 'Academic reading passages with comprehension questions. Covers all question types.',
    status: 'available'
  },
  {
    id: 'writing',
    title: 'Writing Assessment',
    icon: <PenTool size={20} />,
    color: '#7c3aed',
    duration: '60 min',
    questions: 2,
    description: 'Task 1 (Graph/Chart description) and Task 2 (Essay). Teacher evaluates and scores.',
    status: 'available'
  },
  {
    id: 'speaking',
    title: 'Speaking Assessment',
    icon: <Mic size={20} />,
    color: '#16a34a',
    duration: '15 min',
    questions: 3,
    description: 'Part 1, 2 & 3 speaking test. Record your answers for expert evaluation.',
    status: 'available'
  },
];

const listeningQuestions = [
  {
    audio: 'Section 1: A conversation about renting an apartment',
    questions: [
      { id: 1, text: 'What is the monthly rent for the apartment?', options: ['৳15,000', '৳18,000', '৳20,000', '৳22,000'], answer: null },
      { id: 2, text: 'How many bedrooms does the apartment have?', options: ['1', '2', '3', '4'], answer: null },
      { id: 3, text: 'When is the apartment available from?', options: ['January 1', 'January 15', 'February 1', 'February 15'], answer: null },
    ]
  }
];

export function MockTestPage() {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  function startTest(id: string) {
    setActiveTest(id);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
  }

  function submitListening() {
    const correct = Object.values(answers).filter((v, i) => ['৳18,000', '2', 'February 1'][i] === v).length;
    setScore(correct);
    setSubmitted(true);
  }

  if (activeTest === 'listening') {
    return (
      <div className="py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-bold text-foreground">Listening Test — Section 1</h1>
              <p className="text-muted-foreground text-sm">Demo version • 3 questions</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={14} />
              <span>30:00 remaining</span>
            </div>
          </div>

          {!submitted ? (
            <>
              <div style={{ background: '#fff7ed', borderColor: '#fed7aa' }} className="border rounded-xl p-4 mb-6 flex items-center gap-3">
                <Headphones size={20} style={{ color: '#ea580c' }} />
                <div>
                  <div className="font-medium text-sm text-foreground">{listeningQuestions[0].audio}</div>
                  <button style={{ color: '#ea580c' }} className="text-xs flex items-center gap-1 mt-1 hover:underline">
                    <Play size={12} /> Play Audio (Demo)
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {listeningQuestions[0].questions.map((q, qi) => (
                  <div key={q.id} className="bg-white rounded-xl border border-border p-5">
                    <p className="font-medium text-foreground mb-3">Q{qi + 1}. {q.text}</p>
                    <div className="space-y-2">
                      {q.options.map(opt => (
                        <label key={opt} className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer border transition-colors ${answers[q.id] === opt ? 'border-orange-400 bg-orange-50' : 'border-transparent hover:bg-muted/50'}`}>
                          <input
                            type="radio"
                            name={`q${q.id}`}
                            value={opt}
                            checked={answers[q.id] === opt}
                            onChange={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                            className="accent-orange-500"
                          />
                          <span className="text-sm text-foreground">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <button onClick={() => setActiveTest(null)} className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted/50 transition-colors">
                  ← Back
                </button>
                <button
                  onClick={submitListening}
                  style={{ background: '#ea580c' }}
                  className="px-6 py-2 text-white rounded-lg text-sm hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  Submit Test <ArrowRight size={14} />
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-border p-8 text-center">
              <div style={{ background: '#dcfce7' }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="font-bold text-foreground mb-2">Test Submitted!</h2>
              <p className="text-muted-foreground mb-4">Demo Score: {score}/3 correct</p>
              <div style={{ background: '#fff7ed' }} className="rounded-xl p-4 mb-6 text-left">
                <p className="text-sm font-medium text-foreground mb-2">Estimated Band Score</p>
                <div className="flex items-center gap-3">
                  <div style={{ background: '#ea580c' }} className="text-white text-2xl font-bold px-4 py-2 rounded-lg">
                    {score === 3 ? '7.5' : score === 2 ? '6.5' : '5.5'}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on your performance in this demo test. Enroll for the full evaluation.</p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setActiveTest(null)} className="px-4 py-2 border border-border rounded-lg text-sm">Try Another</button>
                <button onClick={() => window.location.href = '/register'} style={{ background: '#ea580c' }} className="px-6 py-2 text-white rounded-lg text-sm">
                  Enroll for Full Test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #2d2d44)' }} className="py-12 mb-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-bold text-white mb-2">Free IELTS Mock Test</h1>
          <p className="text-slate-400">Experience our exam system with a free practice test. Register to access the full version.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {sections.map(sec => (
            <div key={sec.id} className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl" style={{ background: sec.color + '18', color: sec.color }}>
                  {sec.icon}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} /> {sec.duration}
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-1">{sec.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{sec.description}</p>
              <div className="text-xs text-muted-foreground mb-4">{sec.questions} questions</div>
              <button
                onClick={() => startTest(sec.id)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
                style={{ background: sec.color }}
              >
                Start Demo Test <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff7ed', borderColor: '#fed7aa' }} className="border rounded-xl p-6 text-center">
          <h3 className="font-semibold text-foreground mb-2">Want the Full Mock Test Experience?</h3>
          <p className="text-sm text-muted-foreground mb-4">Register as a student to access timed full-length mock tests, teacher evaluations, and band score reports.</p>
          <div className="flex justify-center gap-3">
            <a href="/register" style={{ background: '#ea580c' }} className="px-6 py-2.5 text-white rounded-lg text-sm hover:bg-orange-700 transition-colors">
              Register Free
            </a>
            <a href="/login" className="px-6 py-2.5 border border-border rounded-lg text-sm hover:bg-muted/50 transition-colors">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
