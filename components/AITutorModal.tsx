import React, { useState, useEffect } from 'react';
import { getTutorExplanation } from '../services/geminiService';
import { OwlIcon } from './icons/OwlIcon';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  userAnswer: string;
  correctAnswer: string;
}

const AITutorModal: React.FC<AITutorModalProps> = ({ isOpen, onClose, question, userAnswer, correctAnswer }) => {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);
      setExplanation('');
      getTutorExplanation(question, userAnswer, correctAnswer)
        .then(setExplanation)
        .catch(err => {
            console.error(err);
            setError('Hubo un error al obtener la explicación. Por favor, inténtalo de nuevo.');
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, question, userAnswer, correctAnswer]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg text-white relative animate-fade-in-scale">
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
        <div className="flex items-center mb-4">
          <OwlIcon className="w-10 h-10 text-cyan-400 mr-3" />
          <h2 className="text-2xl font-bold text-cyan-400">La Perspicacia de Sócrates</h2>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <p className="ml-4">El búho de Minerva está pensando...</p>
          </div>
        ) : error ? (
           <div className="text-red-400 p-4 bg-red-900/50 rounded-md">
                {error}
           </div>
        ) : (
          <div className="text-slate-300 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <p><strong>Pregunta:</strong> {question}</p>
            <p><strong>Tu respuesta:</strong> <span className="text-red-400">{userAnswer}</span></p>
            <p><strong>Respuesta Correcta:</strong> <span className="text-green-400">{correctAnswer}</span></p>
            <hr className="border-slate-600 my-4" />
            <div className="whitespace-pre-wrap bg-slate-900 p-3 rounded-md">{explanation}</div>
          </div>
        )}
        <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-cyan-600 rounded-md hover:bg-cyan-700 transition-colors font-semibold"
            >
              Entendido
            </button>
        </div>
      </div>
    </div>
  );
};

export default AITutorModal;