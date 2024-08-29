"use client";

import React, { useEffect, useState } from "react";
import { questions as initialQuestions } from "@/data/questions";
import {
  AnswerInterface,
  QuestionInterface,
} from "@/interfaces/questionInterface";
import Loading from "@/components/Loading";
import { isStarted, userAnswer } from "@/constant/constant";

// Utility function to simulate loading delay
const simulateLoading = () => {
  return new Promise((resolve) => {
    const delay = Math.random() * 500 + 200; // Random delay between 0.5 to 1 second
    setTimeout(resolve, delay);
  });
};

const QuizPage = () => {
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionInterface | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const savedQuizStarted = localStorage.getItem(isStarted);
    const savedUserAnswers = localStorage.getItem(userAnswer);
    const savedSelectedCategory = localStorage.getItem("selectedCategory");
    const savedCurrentQuestionIndex = localStorage.getItem(
      "currentQuestionIndex"
    );

    if (savedQuizStarted === "true") {
      setQuizStarted(true);
    }

    if (savedUserAnswers) {
      try {
        setUserAnswers(JSON.parse(savedUserAnswers));
      } catch (error) {
        console.error("Error parsing savedUserAnswers:", error);
      }
    }

    if (savedSelectedCategory) {
      setSelectedCategory(savedSelectedCategory);
      try {
        changeCategory(
          savedSelectedCategory,
          JSON.parse(savedUserAnswers || "[]"),
          parseInt(savedCurrentQuestionIndex || "0", 10)
        ).then(() => setInitialLoading(false));
      } catch (error) {
        console.error(
          "Error parsing savedUserAnswers for category change:",
          error
        );
        changeCategory(
          savedSelectedCategory,
          [],
          parseInt(savedCurrentQuestionIndex || "0", 10)
        ).then(() => setInitialLoading(false));
      }
    } else {
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(isStarted, quizStarted.toString());
  }, [quizStarted]);

  useEffect(() => {
    localStorage.setItem(userAnswer, JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    localStorage.setItem(
      "currentQuestionIndex",
      currentQuestionIndex.toString()
    );
  }, [currentQuestionIndex]);

  const changeCategory = async (
    category: string,
    savedAnswers: string[] = [],
    savedIndex: number = 0
  ) => {
    setLoading(true);
    await simulateLoading();
    try {
      const filteredQuestions = initialQuestions.filter(
        (question) => question.category === category
      );
      setQuestions(filteredQuestions);
      setCurrentQuestion(filteredQuestions[savedIndex]);
      setCurrentQuestionIndex(savedIndex);
      setUserAnswers(savedAnswers);
      setScore(null);
    } catch (error) {
      console.error("Error filtering questions by category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizStart = (category: string) => {
    setSelectedCategory(category);
    setQuizStarted(true);
    changeCategory(category);
    localStorage.setItem("selectedCategory", category);
  };

  const handleNextQuestion = async () => {
    if (userAnswers[currentQuestionIndex] === undefined) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    if (questions && currentQuestionIndex < questions.length - 1) {
      setLoading(true);
      await simulateLoading();
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
      setLoading(false);
    } else {
      calculateScore();
    }
  };

  const handlePreviousQuestion = async () => {
    if (questions && currentQuestionIndex > 0) {
      setLoading(true);
      await simulateLoading();
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setCurrentQuestion(questions[prevIndex]);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = answer;
      localStorage.setItem(userAnswer, JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        score += 1;
      }
    });
    setScore(score);
  };

  if (initialLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-light-base dark:bg-dark-base text-light-textPrimary dark:text-dark-textPrimary p-4 flex items-center justify-center">
      {!quizStarted ? (
        <div className="flex flex-col items-center bg-white dark:bg-dark-accent p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Select a Category</h1>
          {["Geography", "Mathematics", "History", "Science", "Literature"].map(
            (category) => (
              <button
                key={category}
                className="bg-light-primary dark:bg-dark-primary text-dark-textPrimary py-2 px-6 rounded mb-4 hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover transition"
                onClick={() => handleQuizStart(category)}
              >
                {category}
              </button>
            )
          )}
        </div>
      ) : score === null ? (
        <div className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6">
            Questions for {selectedCategory}
          </h1>
          {loading ? (
            <Loading />
          ) : (
            currentQuestion && (
              <div className="mb-6">
                <p className="font-semibold text-xl mb-4">
                  {currentQuestion.question}
                </p>
                <ul className="space-y-3">
                  {currentQuestion.answers.map((answer, idx) => (
                    <li
                      key={idx}
                      className={`cursor-pointer border p-4 rounded-lg text-lg transition ${
                        userAnswers[currentQuestionIndex] === answer.answer
                          ? "bg-light-secondary dark:bg-dark-warning dark:text-dark-primary text-white"
                          : "bg-gray-100 dark:bg-dark-neutral hover:bg-light-accent dark:hover:bg-dark-accent"
                      }`}
                      onClick={() => handleAnswerSelect(answer.answer)}
                    >
                      {answer.answer}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-8">
                  <button
                    className="bg-light-secondary dark:bg-dark-primary text-dark-textPrimary py-2 px-4 rounded hover:bg-light-accent dark:hover:bg-dark-secondary transition"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </button>
                  <span className="text-lg">
                    {currentQuestionIndex + 1} / {questions.length}
                  </span>
                  <button
                    className="bg-light-secondary dark:bg-dark-primary text-dark-textPrimary py-2 px-4 rounded hover:bg-light-accent dark:hover:bg-dark-secondary transition"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex === questions.length - 1
                      ? "Submit"
                      : "Next"}
                  </button>
                </div>
                {showAlert && (
                  <div className="mt-4 text-red-500">
                    Please select an answer before proceeding.
                  </div>
                )}
              </div>
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center bg-white dark:bg-dark-accent p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Quiz Completed</h1>
          <p className="text-xl">
            Your score is {score} out of {questions.length}
          </p>
          <button
            className="bg-light-primary dark:bg-dark-primary text-dark-textPrimary py-2 px-6 rounded mt-4 hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover transition"
            onClick={() => setQuizStarted(false)}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
