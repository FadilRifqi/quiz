"use client";

import React, { useEffect, useState } from "react";
import { FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Loading from "@/components/Loading"; // Assuming you have a Loading component

const simulateLoading = () => {
  return new Promise((resolve) => {
    const delay = Math.random() * 500 + 200; // Random delay between 0.5 to 0.7 second
    setTimeout(resolve, delay);
  });
};

const ContactPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    simulateLoading().then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
      <div className="flex space-x-6 mb-8">
        <a
          href="https://www.instagram.com/ataullahrifqi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="h-8 w-8 hover:text-pink-500" />
        </a>
        <a
          href="https://github.com/FadilRifqi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="h-8 w-8 hover:text-gray-700" />
        </a>
        <a
          href="https://www.linkedin.com/in/muhammad-fadil-ataullah-rifqi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="h-8 w-8 hover:text-blue-700" />
        </a>
        <a
          href="mailto:fadilataullahrifqi@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope className="h-8 w-8 hover:text-red-500" />
        </a>
      </div>
      <a
        href="https://portfolio-fadil-rifqi.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-medium text-blue-500 hover:underline"
      >
        Check out my portfolio
      </a>
    </div>
  );
};

export default ContactPage;
