export interface AnswerInterface {
  questionId: number;
  answer: string;
}

export interface QuestionInterface {
  id: number;
  question: string;
  answers: AnswerInterface[];
  category: string;
  correctAnswer: string;
}
