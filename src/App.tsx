import React, { useState } from 'react';
import { 
  BookOpen, 
  Brain, 
  Check, 
  X, 
  ChevronRight, 
  RefreshCcw, 
  Sparkles, 
  Settings, 
  AlertCircle, 
  FileText, 
  GraduationCap, 
  Loader2,
  //Trophy,
  //ArrowRight
} from 'lucide-react';

type Difficulty = 'Fácil' | 'Médio' | 'Difícil';

interface QuizConfig {
  material: string;
  difficulty: Difficulty;
  questionCount: number;
  customInstructions: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

type AppState = 'setup' | 'generating' | 'playing' | 'results';

const SetupScreen = ({ 
  onGenerate, 
  isGenerating 
}: { 
  onGenerate: (config: QuizConfig) => void, 
  isGenerating: boolean 
}) => {
  const [material, setMaterial] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Médio');
  const [questionCount, setQuestionCount] = useState(5);
  const [customInstructions, setCustomInstructions] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!material.trim()) return;
    onGenerate({ material, difficulty, questionCount, customInstructions });
  };

  return (
    <div className="max-w-2xl mx-auto relative z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-800 border border-zinc-700 text-green-500 mb-6 shadow-xl shadow-green-900/10">
          <GraduationCap size={40} />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
          <span className="text-green-500">Quiz Escolar</span>
        </h1>
        <p className="text-zinc-400 text-lg">Cole seu material e crie um desafio instantâneo.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-700 overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          <div className="space-y-3">
            <label className="flex items-center text-sm font-bold text-zinc-300 uppercase tracking-wider">
              <FileText size={16} className="mr-2 text-green-500" />
              Material da Aula
            </label>
            <textarea
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Cole aqui o texto do PDF, artigo ou resumo da aula..."
              className="w-full h-40 p-4 rounded-xl bg-zinc-900/50 border border-zinc-700 text-zinc-100 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all resize-none placeholder:text-zinc-600"
              required
            />
            <p className="text-xs text-zinc-500 text-right">
              {material.length} caracteres
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="flex items-center text-sm font-bold text-zinc-300 uppercase tracking-wider">
                <Settings size={16} className="mr-2 text-green-500" />
                Dificuldade
              </label>
              <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-700">
                {(['Fácil', 'Médio', 'Difícil'] as Difficulty[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                      difficulty === level 
                        ? 'bg-zinc-700 text-green-400 shadow-md border border-zinc-600' 
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center text-sm font-bold text-zinc-300 uppercase tracking-wider">
                <Brain size={16} className="mr-2 text-green-500" />
                Questões: <span className="ml-2 text-white">{questionCount}</span>
              </label>
              <div className="px-2 py-3">
                <input 
                  type="range" 
                  min="3" 
                  max="10" 
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-2">
                  <span>3</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center text-sm font-bold text-zinc-300 uppercase tracking-wider">
              <Sparkles size={16} className="mr-2 text-yellow-500" />
              Observações (Opcional)
            </label>
            <input
              type="text"
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              placeholder="Ex: Foque em datas históricas; Use humor..."
              className="w-full p-3 rounded-xl bg-zinc-900/50 border border-zinc-700 text-zinc-100 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-zinc-600"
            />
          </div>

        </div>

        <div className="p-6 bg-zinc-900/30 border-t border-zinc-700">
          <button
            type="submit"
            disabled={isGenerating || !material.trim()}
            className={`w-full flex items-center justify-center py-4 px-6 rounded-xl font-bold text-lg transition-all transform active:scale-[0.98] ${
              !material.trim() 
                ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/30 hover:shadow-green-500/20 border-b-4 border-green-800 hover:border-green-700 active:border-b-0 active:translate-y-1'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Criando Quiz...
              </>
            ) : (
              <>
                Gerar Quiz Mágico <ChevronRight className="ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const QuizGame = ({ 
  questions, 
  onFinish 
}: { 
  questions: Question[], 
  onFinish: (score: number, total: number) => void 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    setShowExplanation(true);

    if (index === currentQuestion.correctIndex) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      onFinish(score + (selectedOption === currentQuestion.correctIndex ? 0 : 0), questions.length);
    }
  };

  return (
    <div className="max-w-2xl mx-auto relative z-10">
      <div className="mb-8 flex items-center space-x-4">
        <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
          <div 
            className="h-full bg-green-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center font-bold text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-lg border border-yellow-500/20">
          <Sparkles size={16} className="mr-2 fill-current" />
          {streak}
        </div>
      </div>

      <div className="bg-zinc-800 rounded-2xl shadow-2xl p-6 md:p-10 mb-32 border border-zinc-700 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
         <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl"></div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-bold text-green-500 uppercase tracking-wider">Questão {currentIndex + 1} de {questions.length}</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            let btnStyle = "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-500";
            
            if (isAnswered) {
              if (idx === currentQuestion.correctIndex) {
                btnStyle = "bg-green-500/20 border-green-500 text-green-400";
              } else if (idx === selectedOption) {
                btnStyle = "bg-red-500/20 border-red-500 text-red-400";
              } else {
                btnStyle = "opacity-40 border-zinc-800";
              }
            } else if (selectedOption === idx) {
              btnStyle = "border-green-500 bg-green-500/10 text-green-400";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border-2 text-left font-medium text-lg transition-all transform active:scale-[0.99] ${btnStyle} flex justify-between items-center group`}
              >
                <span>{option}</span>
                {isAnswered && idx === currentQuestion.correctIndex && <Check className="text-green-500" />}
                {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && <X className="text-red-500" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 w-full p-6 md:p-8 border-t border-zinc-700/50 backdrop-blur-lg transition-transform duration-300 z-50 ${showExplanation ? 'translate-y-0' : 'translate-y-full'} ${
        selectedOption === currentQuestion.correctIndex ? 'bg-green-900/90' : 'bg-red-900/90'
      }`}>
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {selectedOption === currentQuestion.correctIndex ? (
                <div className="flex items-center text-green-100 font-bold text-2xl">
                  <div className="bg-green-500 p-1 rounded-full mr-3"><Check size={20} className="text-green-900" /></div>
                  Correto!
                </div>
              ) : (
                <div className="flex items-center text-red-100 font-bold text-2xl">
                  <div className="bg-red-500 p-1 rounded-full mr-3"><X size={20} className="text-red-900" /></div>
                  Incorreto
                </div>
              )}
            </div>
            <p className="text-zinc-200 text-lg leading-relaxed opacity-90">
              {currentQuestion.explanation}
            </p>
          </div>
          <button 
            onClick={handleNext}
            className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold text-white shadow-lg uppercase tracking-wide transition-all transform hover:scale-105 ${
              selectedOption === currentQuestion.correctIndex 
                ? 'bg-green-500 hover:bg-green-400 text-green-950' 
                : 'bg-red-500 hover:bg-red-400 text-red-950'
            }`}
          >
            {currentIndex < questions.length - 1 ? 'Continuar' : 'Ver Resultado'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ResultsScreen = ({ score, total, onReset }: { score: number, total: number, onReset: () => void }) => {
  const percentage = (score / total) * 100;
  let message = "";
  let colorClass = "";

  if (percentage === 100) { message = "Lendário!"; colorClass = "text-yellow-500"; }
  else if (percentage >= 80) { message = "Incrível!"; colorClass = "text-green-500"; }
  else if (percentage >= 50) { message = "Bom trabalho!"; colorClass = "text-blue-500"; }
  else { message = "Continue praticando!"; colorClass = "text-zinc-400"; }

  return (
    <div className="text-center py-12 animate-in fade-in zoom-in duration-500 relative z-10">
      <div className="inline-block p-8 rounded-full bg-zinc-800 border border-zinc-700 shadow-2xl mb-8 relative">
         <div className={`absolute inset-0 rounded-full opacity-20 blur-2xl ${percentage >= 50 ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <div className={`text-7xl font-black ${colorClass} relative z-10`}>
          {Math.round(percentage)}%
        </div>
      </div>
      
      <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">{message}</h2>
      <p className="text-xl text-zinc-400 mb-12">
        Você acertou <span className="text-white font-bold">{score}</span> de <span className="text-white font-bold">{total}</span> questões.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onReset}
          className="flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition-all shadow-lg shadow-green-900/30 border-b-4 border-green-800 active:border-b-0 active:translate-y-1"
        >
          <RefreshCcw className="mr-2" /> Criar Novo Quiz
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [state, setState] = useState<AppState>('setup');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

  const generateQuiz = async (config: QuizConfig) => {
    setState('generating');
    setError(null);

    try {
      const prompt = `
        Você é um gerador de Quiz educacional profissional. 
        Gere um quiz com exatamente ${config.questionCount} questões.
        Dificuldade: ${config.difficulty}.
        
        Contexto/Material de Estudo:
        "${config.material}"

        Instruções Extras do Professor:
        "${config.customInstructions}"

        Regras OBRIGATÓRIAS:
        1. A resposta deve ser EXCLUSIVAMENTE um JSON válido.
        2. Não inclua markdown, crases ou texto antes/depois do JSON.
        3. O idioma deve ser Português (Brasil).
        4. Formato do JSON:
        [
          {
            "id": 1,
            "text": "Enunciado da questão aqui?",
            "options": ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
            "correctIndex": 0,
            "explanation": "Explicação curta e didática de por que esta é a correta."
          }
        ]
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      if (!response.ok) throw new Error('Falha na API do Gemini');

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      const cleanJson = rawText.replace(/```json|```/g, '').trim();
      const parsedQuestions = JSON.parse(cleanJson);

      setQuestions(parsedQuestions);
      setState('playing');

    } catch (err) {
      console.error(err);
      setError("Ops! A IA ficou confusa com o material. Tente simplificar o texto ou tente novamente.");
      setState('setup');
    }
  };

  const handleFinish = (finalScore: number) => {
    setScore(finalScore);
    setState('results');
  };

  return (
    <div className="min-h-screen bg-zinc-900 font-sans text-zinc-100 selection:bg-green-500 selection:text-white overflow-x-hidden relative">
      
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-green-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-green-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative z-10">
        
        <header className="flex items-center justify-between mb-12 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2 text-white font-black text-xl tracking-tight">
            <div className="bg-green-600 p-1.5 rounded-lg"><BookOpen size={20} className="text-white" /></div>
            <span><span className="text-green-500">Quiz Escolar</span></span>
          </div>
          {state !== 'setup' && (
             <button 
               onClick={() => setState('setup')}
               className="text-sm text-zinc-500 hover:text-green-400 font-medium transition-colors"
             >
               Sair / Voltar
             </button>
          )}
        </header>

        <main>
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl flex items-center gap-3 border border-red-500/20 backdrop-blur-sm">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {state === 'setup' && (
            <SetupScreen onGenerate={generateQuiz} isGenerating={false} />
          )}

          {state === 'generating' && (
            <div className="text-center py-20 animate-pulse">
              <Loader2 size={48} className="animate-spin text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Processando material...</h2>
              <p className="text-zinc-500">A IA está criando o desafio perfeito.</p>
            </div>
          )}

          {state === 'playing' && (
            <QuizGame questions={questions} onFinish={handleFinish} />
          )}

          {state === 'results' && (
            <ResultsScreen score={score} total={questions.length} onReset={() => setState('setup')} />
          )}
        </main>

      </div>
    </div>
  );
}
