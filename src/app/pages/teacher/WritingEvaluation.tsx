import { useState } from 'react';
import { CheckCircle, Star } from 'lucide-react';

const submissions = [
  { id: 1, student: 'Tasneem Akter', batch: 'IELTS A2', task: 'Task 2 — Education Essay', submitted: '2h ago', text: 'In contemporary society, universities play a pivotal role in shaping the futures of young people. While some argue that academic knowledge should be the primary focus, others contend that practical employment skills are equally important. In my view, a balanced approach that incorporates both elements is most beneficial.\n\nThose who advocate for academic-focused education argue that universities are centres of intellectual inquiry. The development of critical thinking, research skills, and theoretical understanding provides students with a foundation that transcends any single career. For instance, a student who masters analytical reasoning in a philosophy degree can apply this skill across multiple professional contexts.\n\nConversely, proponents of practical education highlight the growing disconnect between university curricula and employment market demands. Employers frequently report that graduates lack essential workplace skills such as project management, communication, and industry-specific technical competencies. Universities that incorporate internships, case studies, and industry partnerships better prepare students for immediate employment.\n\nIn conclusion, I believe universities should strive to integrate both approaches. Academic rigour provides intellectual development, while practical components ensure employability. This dual focus would produce graduates who are both knowledgeable and career-ready, ultimately benefiting both individuals and society as a whole.', wordCount: 194 },
  { id: 2, student: 'Ariful Islam', batch: 'IELTS A2', task: 'Task 1 — Bar Chart', submitted: '4h ago', text: 'The bar chart illustrates the percentage of households with internet access in five different countries during 2010 and 2020. Overall, internet penetration increased significantly in all countries over the decade.\n\nIn 2010, South Korea had the highest proportion of internet users at 77%, followed by Australia at 71% and Germany at 68%. In contrast, Brazil and India had considerably lower rates, with 41% and 12% respectively.\n\nBy 2020, all countries had experienced substantial growth. South Korea maintained its leading position, rising to 96%. Australia and Germany also showed marked increases, reaching 89% and 87% respectively. The most dramatic improvements were recorded in developing nations: Brazil\'s rate nearly doubled to 74%, while India demonstrated remarkable growth from 12% to 50%, representing the largest percentage increase of all countries surveyed.\n\nIn summary, while developed nations consistently maintained higher levels of internet access, the developing countries displayed more rapid rates of growth over the ten-year period.', wordCount: 158 },
];

const criteria = [
  { key: 'taskAchievement', label: 'Task Achievement', desc: 'Does it answer all parts? Is the position clear?' },
  { key: 'coherence', label: 'Coherence & Cohesion', desc: 'Logical flow, paragraphing, connectors' },
  { key: 'lexical', label: 'Lexical Resource', desc: 'Vocabulary range, word choice, collocation' },
  { key: 'grammar', label: 'Grammatical Range & Accuracy', desc: 'Structures, tenses, errors' },
];

export function WritingEvaluation() {
  const [selected, setSelected] = useState(1);
  const [scores, setScores] = useState<Record<number, Record<string, number>>>({});
  const [feedback, setFeedback] = useState<Record<number, string>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});

  const submission = submissions.find(s => s.id === selected)!;
  const currentScores = scores[selected] || {};
  const avgBand = Object.values(currentScores).length === 4
    ? (Object.values(currentScores).reduce((a, b) => a + b, 0) / 4).toFixed(1)
    : null;

  function setScore(criterion: string, band: number) {
    setScores(p => ({ ...p, [selected]: { ...p[selected], [criterion]: band } }));
  }

  function save() {
    setSaved(p => ({ ...p, [selected]: true }));
  }

  return (
    <div>
      <h2 className="font-bold text-foreground mb-1">Writing Evaluation</h2>
      <p className="text-muted-foreground text-sm mb-6">Score student essays using IELTS band descriptors</p>

      {/* Submission selector */}
      <div className="flex gap-3 mb-5">
        {submissions.map(s => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            className={`flex-1 p-3 rounded-xl border text-left text-sm transition-colors ${selected === s.id ? 'border-purple-400 bg-purple-50' : 'border-border bg-white hover:border-purple-200'}`}
          >
            <div className="font-medium text-foreground flex items-center justify-between">
              {s.student}
              {saved[s.id] && <CheckCircle size={14} className="text-green-600" />}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.task} • {s.wordCount} words</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Student essay */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground text-sm">{submission.student} — {submission.task}</h3>
            <span className="text-xs text-muted-foreground">{submission.wordCount} words</span>
          </div>
          <div className="text-sm text-foreground leading-7 max-h-80 overflow-y-auto bg-muted/20 rounded-lg p-4">
            {submission.text.split('\n\n').map((p, i) => <p key={i} className="mb-3">{p}</p>)}
          </div>
        </div>

        {/* Scoring panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Band Score Assessment</h3>
            <div className="space-y-4">
              {criteria.map(c => (
                <div key={c.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{c.label}</span>
                    {currentScores[c.key] && (
                      <span className="font-bold" style={{ color: '#7c3aed' }}>Band {currentScores[c.key]}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{c.desc}</p>
                  <div className="flex gap-1">
                    {[4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map(band => (
                      <button
                        key={band}
                        onClick={() => setScore(c.key, band)}
                        className={`flex-1 py-1 rounded text-xs font-medium transition-colors ${currentScores[c.key] === band ? 'text-white' : 'bg-muted text-muted-foreground hover:bg-purple-100 hover:text-purple-700'}`}
                        style={currentScores[c.key] === band ? { background: '#7c3aed' } : {}}
                      >
                        {band}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {avgBand && (
              <div className="mt-4 p-3 rounded-lg flex items-center justify-between" style={{ background: '#f3e8ff' }}>
                <span className="font-medium text-purple-800 text-sm">Overall Band Score</span>
                <span className="font-bold text-2xl" style={{ color: '#7c3aed' }}>Band {avgBand}</span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-3 text-sm">Teacher Feedback</h3>
            <textarea
              value={feedback[selected] || ''}
              onChange={e => setFeedback(p => ({ ...p, [selected]: e.target.value }))}
              rows={4}
              placeholder="Provide detailed feedback on task achievement, coherence, vocabulary, grammar..."
              className="w-full p-3 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/30 bg-input-background"
            />
            <div className="flex gap-3 mt-3">
              <button onClick={save} style={{ background: '#7c3aed' }} className="flex items-center gap-2 px-5 py-2 text-white rounded-lg text-sm hover:bg-purple-700 flex-1">
                <Star size={14} /> Save Evaluation
              </button>
            </div>
            {saved[selected] && (
              <div className="flex items-center gap-2 text-green-600 text-sm mt-2">
                <CheckCircle size={14} /> Evaluation saved and sent to student
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
