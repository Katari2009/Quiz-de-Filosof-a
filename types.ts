export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface UserAnswer {
  question:string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface User {
  email: string;
}
