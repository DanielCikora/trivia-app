"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { TriviaQuestion, TriviaApiResponse } from "@/utils/dataTypes";

const API_URL = "https://opentdb.com/api.php?amount=15";

const downloadJSON = (data: TriviaQuestion[]) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "trivia_questions.json";
  link.click();
  URL.revokeObjectURL(url);
};

const downloadCSV = (data: TriviaQuestion[]) => {
  const header =
    "Category, Difficulty, Question, Correct Answer, Incorrect Answers";
  const rows = data
    .map(
      (item) =>
        `"${item.category}", "${item.difficulty}", "${item.question}", "${
          item.correct_answer
        }", "${item.incorrect_answers.join(" | ")}"`
    )
    .join("\n");
  const csvContent = `${header}\n${rows}`;
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "trivia_questions.csv";
  link.click();
  URL.revokeObjectURL(url);
};

const Trivia = () => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);

  useEffect(() => {
    axios
      .get<TriviaApiResponse>(API_URL)
      .then((response) => {
        setQuestions(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching trivia:", error);
      });
  }, []);

  const handlePrintToConsole = () => {
    console.log(questions);
  };
  return (
    <section className='trivia'>
      <div className='trivia-content'>
        <h1 className='text-2xl font-bold mb-4 text-center'>
          Trivia Questions
        </h1>
        <table className='border border-solid rounded-lg shadow-lg'>
          <thead>
            <tr className='border-b-2 border-solid border-black'>
              <th className='px-4 py-2 border-b text-left'>Category</th>
              <th className='px-4 py-2 border-b text-left'>Difficulty</th>
              <th className='px-4 py-2 border-b text-left'>Question</th>
              <th className='px-4 py-2 border-b text-left'>Correct Answer</th>
              <th className='px-4 py-2 border-b text-left'>
                Incorrect Answers
              </th>
            </tr>
          </thead>
          <tbody className='border border-solid border-black'>
            {questions.map((q, index) => (
              <tr key={index} className='hover:bg-gray-100'>
                <td className='px-4 py-2 border-b'>{q.category}</td>
                <td className='px-4 py-2 border-b'>{q.difficulty}</td>
                <td className='px-4 py-2 border-b'>{q.question}</td>
                <td className='px-4 py-2 border-b'>{q.correct_answer}</td>
                <td className='px-4 py-2 border-b'>
                  {q.incorrect_answers.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-10 flex justify-center gap-4 '>
          <button
            onClick={() => downloadJSON(questions)}
            className='cursor-pointer border border-solid border-blue-500 text-blue-500 hover:text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none'
          >
            Download JSON
          </button>

          <button
            onClick={() => downloadCSV(questions)}
            className='cursor-pointer border border-solid border-green-500 text-green-500 hover:text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none'
          >
            Download CSV
          </button>

          <button
            onClick={handlePrintToConsole}
            className='cursor-pointer border border-solid border-gray-500 text-gray-500 hover:text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none'
          >
            Print to Console
          </button>
        </div>
      </div>
    </section>
  );
};

export default Trivia;
