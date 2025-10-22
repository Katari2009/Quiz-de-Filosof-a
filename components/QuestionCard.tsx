
import React, { useState, useEffect } from 'react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedOption: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    setIsAnswered(true);
    
    setTimeout(() => {
      onAnswer(option);
    }, 1500); // Wait a bit to show feedback
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return 'bg-slate-700 hover:bg-slate-600';
    }
    if (option === question.correctAnswer) {
      return 'bg-green-500 transform scale-105';
    }
    if (option === selectedAnswer) {
      return 'bg-red-500';
    }
    return 'bg-slate-700 opacity-50';
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-slate-800 rounded-lg shadow-xl text-white">
      <h2 className="text-2xl font-semibold mb-6 text-slate-200">{question.question}</h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
            className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${getButtonClass(option)}`}
          >
            <span className="font-medium">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
