import React, { useState } from 'react';
import type { UserAnswer, User } from '../types';
import AITutorModal from './AITutorModal';
import { StarIcon } from './icons/StarIcon';
import { OwlIcon } from './icons/OwlIcon';

// !!! IMPORTANTE: REEMPLAZA ESTA URL con la URL de tu aplicación web de Google Apps Script !!!
const SCRIPT_URL = 'URL_DE_TU_APPS_SCRIPT_AQUI'; 

interface ResultsScreenProps {
  userAnswers: UserAnswer[];
  score: number;
  onRestart: () => void;
  user: User;
  onLogout: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ userAnswers, score, onRestart, user, onLogout }) => {
    const [tutorModalData, setTutorModalData] = useState<{ question: string; userAnswer: string; correctAnswer: string; } | null>(null);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

    const correctAnswersCount = userAnswers.filter(a => a.isCorrect).length;
    const accuracy = userAnswers.length > 0 ? (correctAnswersCount / userAnswers.length) * 100 : 0;
    
    let rank = { title: "Neófito Curioso", color: "text-slate-400" };
    if (accuracy >= 95) rank = { title: "Maestro/a Filósofo/a", color: "text-amber-300" };
    else if (accuracy >= 80) rank = { title: "Pensador/a Profundo/a", color: "text-cyan-400" };
    else if (accuracy >= 60) rank = { title: "Estudiante de Lógica", color: "text-green-400" };
    else if (accuracy >= 40) rank = { title: "Iniciado en la Academia", color: "text-blue-400" };


    const openTutorModal = (answer: UserAnswer) => {
        setTutorModalData({
            question: answer.question,
            userAnswer: answer.selectedAnswer,
            correctAnswer: answer.correctAnswer,
        });
    };

    const handleSubmitResults = async () => {
      if (SCRIPT_URL === 'URL_DE_TU_APPS_SCRIPT_AQUI') {
        alert('Error de configuración: La URL del script no ha sido establecida por el desarrollador.');
        return;
      }

      setSubmitStatus('submitting');
      
      const payload = {
        email: user.email,
        score: score,
        correctAnswers: correctAnswersCount,
        totalQuestions: userAnswers.length,
        accuracy: `${accuracy.toFixed(2)}%`,
        rank: rank.title,
      };

      try {
        const response = await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Importante para evitar errores de CORS con scripts simples
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        // En modo no-cors, no podemos leer la respuesta, así que asumimos éxito si no hay error.
        setSubmitStatus('submitted');
      } catch (error) {
        console.error('Error submitting results:', error);
        setSubmitStatus('error');
      }
    };

    const getSubmitButtonText = () => {
      switch (submitStatus) {
        case 'submitting': return 'Enviando...';
        case 'submitted': return '¡Resultados Enviados!';
        case 'error': return 'Error al Enviar - Reintentar';
        default: return 'Enviar Resultados al Profesor';
      }
    };

    return (
        <div className="w-full max-w-3xl p-8 space-y-6 bg-slate-800 rounded-lg shadow-lg animate-fade-in">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-cyan-400">¡Desafío Completado!</h1>
                <p className={`text-xl font-semibold ${rank.color}`}>{rank.title}</p>
            </div>
            
            <div className="flex justify-center items-center p-6 bg-slate-900 rounded-lg">
                <StarIcon className="w-12 h-12 text-amber-400" />
                <span className="text-5xl font-bold text-white ml-4">{score}</span>
                <span className="text-lg text-slate-400 ml-2">puntos</span>
            </div>
            <p className="text-center text-slate-300">Respondiste correctamente {correctAnswersCount} de {userAnswers.length} preguntas. ({accuracy.toFixed(2)}% de precisión)</p>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {userAnswers.map((answer, index) => (
                    <div key={index} className="p-3 bg-slate-700 rounded-md">
                        <p className="font-semibold text-slate-200">{answer.question}</p>
                        <p className={`mt-1 ${answer.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            Tu respuesta: {answer.selectedAnswer} {answer.isCorrect ? '✓' : '✗'}
                        </p>
                        {!answer.isCorrect && (
                            <>
                            <p className="mt-1 text-slate-400">Respuesta correcta: {answer.correctAnswer}</p>
                            <button onClick={() => openTutorModal(answer)} className="text-cyan-400 hover:underline mt-2 flex items-center text-sm">
                                <OwlIcon className="w-4 h-4 mr-1" />
                                ¿Por qué es incorrecto? (Tutor IA)
                            </button>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <button
                    onClick={onRestart}
                    className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-cyan-600 rounded-md hover:bg-cyan-700 transition-colors"
                >
                    Jugar de nuevo
                </button>
                <button
                    onClick={handleSubmitResults}
                    disabled={submitStatus === 'submitting' || submitStatus === 'submitted'}
                    className={`w-full sm:w-auto px-6 py-3 font-semibold text-white rounded-md transition-colors ${
                      submitStatus === 'submitted' ? 'bg-green-600' 
                      : submitStatus === 'error' ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-slate-600 hover:bg-slate-700 disabled:bg-slate-500'
                    }`}
                >
                    {getSubmitButtonText()}
                </button>
            </div>
             <div className="text-center mt-4">
              <button onClick={onLogout} className="text-slate-400 hover:text-slate-200 text-sm underline">
                Cerrar sesión ({user.email})
              </button>
            </div>

            {tutorModalData && (
                <AITutorModal
                    isOpen={!!tutorModalData}
                    onClose={() => setTutorModalData(null)}
                    question={tutorModalData.question}
                    userAnswer={tutorModalData.userAnswer}
                    correctAnswer={tutorModalData.correctAnswer}
                />
            )}
        </div>
    );
};

export default ResultsScreen;