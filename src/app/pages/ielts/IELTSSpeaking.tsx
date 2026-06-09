import { useState, useEffect } from 'react';
import { Mic, MicOff, Play, Square, Clock, CheckCircle, ChevronRight } from 'lucide-react';

const parts = [
  {
    id: 1,
    title: 'Part 1 — Introduction & Interview',
    duration: '4–5 minutes',
    description: 'The examiner will ask you general questions about yourself and familiar topics.',
    questions: [
      'Can you tell me a bit about where you are from?',
      'Do you enjoy studying English? Why or why not?',
      'What do you usually do in your free time?',
      'How often do you use the internet for communication?',
    ]
  },
  {
    id: 2,
    title: 'Part 2 — Long Turn (Cue Card)',
    duration: '3–4 minutes',
    description: 'You will speak about a topic for 1–2 minutes after 1 minute of preparation.',
    cueCard: {
      topic: 'Describe a time when you helped someone.',
      points: ['Who you helped', 'What the situation was', 'How you helped them', 'How you felt about it']
    }
  },
  {
    id: 3,
    title: 'Part 3 — Two-way Discussion',
    duration: '4–5 minutes',
    description: 'The examiner will ask you abstract questions related to the Part 2 topic.',
    questions: [
      'Why do you think it\'s important for people to help each other in society?',
      'Do young people today help others less than previous generations? Why?',
      'How can governments encourage citizens to volunteer and help their communities?',
      'Should helping others be made compulsory in schools?',
    ]
  }
];

const criteria = [
  { name: 'Fluency & Coherence', description: 'Speaks without undue hesitation, uses cohesive devices', icon: '🗣️' },
  { name: 'Lexical Resource', description: 'Range of vocabulary, idiomatic language, paraphrase', icon: '📚' },
  { name: 'Grammatical Range & Accuracy', description: 'Uses variety of structures, minor errors only', icon: '✍️' },
  { name: 'Pronunciation', description: 'Clear, consistent accent, natural intonation', icon: '🔊' },
];

export function IELTSSpeaking() {
  const [activePart, setActivePart] = useState(1);
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState<Record<number, boolean>>({});
  const [prepTime, setPrepTime] = useState(60);
  const [inPrep, setInPrep] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (inPrep && prepTime > 0) {
      interval = setInterval(() => setPrepTime(t => t - 1), 1000);
    } else if (prepTime === 0) {
      setInPrep(false);
    }
    return () => clearInterval(interval);
  }, [inPrep, prepTime]);

  const part = parts.find(p => p.id === activePart)!;

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-border p-8 text-center">
          <CheckCircle size={40} className="text-green-600 mx-auto mb-4" />
          <h2 className="font-bold text-foreground mb-2">Speaking Test Submitted!</h2>
          <p className="text-muted-foreground text-sm mb-6">Your recordings have been sent to your teacher for evaluation. You'll receive band scores within 24 hours.</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {criteria.map(c => (
              <div key={c.name} className="bg-muted/30 rounded-lg p-3 text-left">
                <div className="text-lg mb-1">{c.icon}</div>
                <div className="text-xs font-semibold text-foreground">{c.name}</div>
                <div className="text-lg font-bold text-muted-foreground mt-1">—</div>
                <div className="text-xs text-muted-foreground">Pending review</div>
              </div>
            ))}
          </div>
          <button style={{ background: '#16a34a' }} className="px-6 py-2 text-white rounded-lg text-sm" onClick={() => setSubmitted(false)}>
            Back to Practice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="font-bold text-foreground">IELTS Speaking Module</h2>
        <p className="text-muted-foreground text-sm">Practice all 3 parts with guided questions and recording</p>
      </div>

      {/* Scoring criteria */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {criteria.map(c => (
          <div key={c.name} className="bg-white rounded-xl border border-border p-3">
            <div className="text-xl mb-1">{c.icon}</div>
            <div className="text-xs font-semibold text-foreground">{c.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{c.description}</div>
          </div>
        ))}
      </div>

      {/* Part selector */}
      <div className="flex gap-2 mb-5">
        {parts.map(p => (
          <button
            key={p.id}
            onClick={() => setActivePart(p.id)}
            className={`flex-1 p-3 rounded-xl border text-sm font-medium transition-colors ${activePart === p.id ? 'border-green-400 bg-green-50 text-green-700' : 'border-border bg-white text-muted-foreground hover:border-green-200'}`}
          >
            <div className="flex items-center justify-between">
              <span>Part {p.id}</span>
              {recorded[p.id] && <CheckCircle size={14} className="text-green-600" />}
            </div>
            <div className="text-xs mt-0.5 font-normal text-muted-foreground">{p.duration}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Questions/Cue card */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-green-50 text-green-600"><Mic size={14} /></div>
            <h3 className="font-semibold text-foreground text-sm">{part.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{part.description}</p>

          {part.cueCard ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="font-semibold text-green-800 mb-3">{part.cueCard.topic}</div>
              <div className="text-sm font-medium text-green-700 mb-2">You should say:</div>
              <ul className="space-y-1">
                {part.cueCard.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                    <ChevronRight size={14} className="mt-0.5 flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
              {activePart === 2 && !inPrep && prepTime === 60 && (
                <button
                  onClick={() => setInPrep(true)}
                  className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg text-sm"
                >
                  <Clock size={14} /> Start 1-minute prep time
                </button>
              )}
              {inPrep && (
                <div className="mt-3 text-center font-bold text-green-700">
                  Prep time: {prepTime}s
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {part.questions?.map((q, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                  <span className="text-green-600 font-bold text-sm flex-shrink-0">Q{i + 1}.</span>
                  <p className="text-sm text-foreground">{q}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recording area */}
        <div className="bg-white rounded-xl border border-border p-5 flex flex-col items-center justify-center text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors ${recording ? 'bg-red-100' : 'bg-green-50'}`}>
            {recording ? <MicOff size={36} className="text-red-600 animate-pulse" /> : <Mic size={36} className="text-green-600" />}
          </div>
          {recording ? (
            <>
              <div className="font-semibold text-red-600 mb-2 animate-pulse">● Recording...</div>
              <p className="text-sm text-muted-foreground mb-4">Speak clearly into your microphone</p>
              <button
                onClick={() => { setRecording(false); setRecorded(p => ({ ...p, [activePart]: true })); }}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl text-sm"
              >
                <Square size={14} /> Stop Recording
              </button>
            </>
          ) : recorded[activePart] ? (
            <>
              <CheckCircle size={24} className="text-green-600 mb-2" />
              <div className="font-semibold text-green-700 mb-2">Part {activePart} Recorded!</div>
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg mb-4 w-full">
                <Play size={14} className="text-green-600" />
                <div className="flex-1 h-1 bg-green-200 rounded-full" />
                <span className="text-xs text-muted-foreground">02:34</span>
              </div>
              <button
                onClick={() => setRecording(true)}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted/50"
              >
                <Mic size={14} /> Re-record
              </button>
            </>
          ) : (
            <>
              <div className="font-semibold text-foreground mb-2">Ready to Record?</div>
              <p className="text-sm text-muted-foreground mb-4">
                {activePart === 2 && !recorded[2] ? 'Prepare your response using the cue card' : 'Answer all questions naturally and completely'}
              </p>
              <button
                onClick={() => setRecording(true)}
                disabled={activePart === 2 && prepTime > 0 && prepTime < 60 && prepTime !== 0 && !inPrep}
                style={{ background: '#16a34a' }}
                className="flex items-center gap-2 px-6 py-3 text-white rounded-xl text-sm disabled:opacity-50"
              >
                <Mic size={14} /> Start Recording
              </button>
            </>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6 w-full">
            {activePart < 3 ? (
              <button
                onClick={() => setActivePart(activePart + 1)}
                className="flex-1 py-2 border border-border rounded-lg text-sm hover:bg-muted/50"
              >
                Next Part →
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                style={{ background: '#16a34a' }}
                className="flex-1 py-2 text-white rounded-lg text-sm"
              >
                Submit for Evaluation ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
