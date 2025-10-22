import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import QuestionCard from './components/QuestionCard';
import Scoreboard from './components/Scoreboard';
import ProgressBar from './components/ProgressBar';
import ResultsScreen from './components/ResultsScreen';
import DynamicBackground from './components/DynamicBackground';
import { quizQuestions } from './data/quizData';
import type { Question, UserAnswer, User } from './types';

const TOTAL_LIVES = 3;
const POINTS_PER_CORRECT_ANSWER = 10;

// Function to shuffle array
const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(TOTAL_LIVES);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isQuizOver, setIsQuizOver] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('philoquest_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setQuestions(shuffleArray(quizQuestions));
  }, []);
  
  const handleLogin = (email: string) => {
    const newUser = { email };
    localStorage.setItem('philoquest_user', JSON.stringify(newUser));
    setUser(newUser);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('philoquest_user');
    setUser(null);
    handleRestart(); // Reset quiz state on logout
  };

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
        setScore(prev => prev + POINTS_PER_CORRECT_ANSWER);
    } else {
        setLives(prev => prev - 1);
    }

    setUserAnswers(prev => [...prev, {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
    }]);
    
    const isGameOver = !isCorrect && lives <= 1;
    const isQuizFinished = currentQuestionIndex + 1 >= questions.length;

    if (isGameOver || isQuizFinished) {
        setIsQuizOver(true);
    } else {
        setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setQuestions(shuffleArray(quizQuestions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setLives(TOTAL_LIVES);
    setUserAnswers([]);
    setIsQuizOver(false);
  };
  
  const renderContent = () => {
    if (!user) {
        return <LoginScreen onLogin={handleLogin} />;
    }
    
    if (isQuizOver) {
      return <ResultsScreen 
                userAnswers={userAnswers} 
                score={score} 
                onRestart={handleRestart}
                user={user}
                onLogout={handleLogout}
             />;
    }
    
    if (questions.length === 0) {
      return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-cyan-400 mb-4">Bienvenido, filósofo/a</h1>
            <p className="text-slate-300 mb-8">Preparando el desafío socrático...</p>
        </div>
      );
    }
    
    return (
      <div className="w-full max-w-3xl flex flex-col items-center">
        {isQuizOver ? (
          <ResultsScreen userAnswers={userAnswers} score={score} onRestart={handleRestart} user={user} onLogout={handleLogout} />
        ) : (
          questions.length > 0 && (
            <>
              <div className="w-full max-w-2xl mb-4">
                <h1 className="text-3xl font-bold text-center text-cyan-400 mb-2">PhiloQuest</h1>
                <p className="text-center text-slate-300 mb-6">Pregunta {currentQuestionIndex + 1} de {questions.length}</p>
              </div>
              <div className="w-full max-w-2xl">
                <Scoreboard score={score} lives={lives} totalLives={TOTAL_LIVES} />
                <div className="my-4">
                  <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
                </div>
                <QuestionCard 
                  question={questions[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                />
              </div>
            </>
          )
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col relative text-white">
        <DynamicBackground />
        <main className="flex-grow flex flex-col items-center justify-center p-4 relative z-10">
            {renderContent()}
        </main>
        <footer className="flex-shrink-0 text-center text-slate-400 text-sm p-4 relative z-10">
            Creado por: Christian Núñez V., Asesor Pedagógico, Programa PACE-UDA, 2025
        </footer>
    </div>
  );
};

export default App;