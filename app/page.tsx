"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading"; // Assuming you have a Loading component

const simulateLoading = () => {
  return new Promise((resolve) => {
    const delay = Math.random() * 500 + 500; // Random delay between 0.5 to 1 second
    setTimeout(resolve, delay);
  });
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    simulateLoading().then(() => setLoading(false));
  }, []);

  const startQuiz = () => {
    router.push("/quiz");
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-light-base dark:bg-dark-base">
      <h1 className="text-4xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-8">
        Welcome to the Quiz App
      </h1>
      <button
        onClick={startQuiz}
        className="px-6 py-3 bg-light-primary dark:bg-dark-primary text-dark-textPrimary rounded-lg hover:bg-light-secondary dark:hover:bg-dark-secondary"
      >
        Start Quiz
      </button>
    </div>
  );
}
