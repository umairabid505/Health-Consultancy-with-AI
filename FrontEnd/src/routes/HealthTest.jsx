import React, { useState } from "react";
import useDiagButtonHandlers from "../utils/DiagHandlers";
import ResultSkeleton from "../components/QuizResultSkeleton";
import QuizSkeleton from "../components/QuizQuestionSkeleton";
import { handleError } from "../utils/errorHandler";
import { FaLessThan } from "react-icons/fa6";
import { quizQuestionPrompt, quizResulkPrompt } from "../assets/genHealthRep";

const QuizApp = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [quizData, setQuizData] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const { healthQuizApp } = useDiagButtonHandlers();

  const generateQuiz = async () => {
    try {
      if (!topic.trim())
        throw new Error("Please enter a health related topic.");
      setLoading(true);

      const prompt = quizQuestionPrompt(topic, difficulty);

      const data = await healthQuizApp(prompt);

      if (Array.isArray(data)) {
        setQuizData(data);
        setQuizStarted(true);
      } else if (
        typeof data === "string" &&
        data.includes("It’s not a health-related topic.")
      ) {
        throw new Error("It’s not a health-related topic.");
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      handleError(err);
      console.log(err)
    }

    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formattedAnswers = quizData.map((q, i) => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      userAnswer: userAnswers[i] || "",
    }));

    const prompt = quizResulkPrompt(formattedAnswers);

    try {
      const result = await healthQuizApp(prompt);
      console.log(result);

      if (result) {
        setResultData(result);
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Error evaluating quiz:", err);
      handleError(err);
    }

    setLoading(false);
  };

  const handleOptionSelect = (option) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQ] = option;
    setUserAnswers(updatedAnswers);
    console.log(userAnswers);
  };

  if (loading) {
    if (!quizData) {
      return (
        <div className="p-8 text-center w-full ">
          <QuizSkeleton />
        </div>
      );
    }
    if (quizData) {
      return (
        <div className="p-8 text-center w-full">
          <ResultSkeleton />
        </div>
      );
    }
  }

  if (!quizStarted) {
    return (
      <div className="flex justify-center items-center min-h-[89.4vh] ">
        <div className="max-w-xl min-h-[300px] mx-auto p-6 text-center bg-white rounded-md shadow-md ">
          <h2 className="text-2xl font-bold mb-9">Start Health Quiz</h2>
          <input
            type="text"
            className="border outline-sky-500 w-full p-2 mb-5 "
            placeholder="Enter health topic e.g. Fever"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <select
            className="border w-full p-2 mb-4 outline-sky-500 "
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button
            onClick={generateQuiz}
            class="rounded-md w-fit mt-5 group border-2 border-sky-500 font-medium hover:bg-gradient-to-r hover:from-[#32ebe4] hover:to-[#304ffd]  py-2 px-5 capitalize focus:outline-none hover:text-white shadow-lg hover:shadow-xl cursor-pointer "
          >
            Generate Quiz
          </button>
        </div>
      </div>
    );
  }

  if (resultData) {
    const { quizData, totalScore } = resultData;

    return (
      <div className="max-w-3xl mx-auto p-6 bg-white my-4 rounded-md shadow-md ">
        <h2 className="text-2xl font-bold mb-4">Your Results</h2>
        <p className="mb-4">
          <strong>Score:</strong> {totalScore.correct} / {totalScore.total}
        </p>

        {quizData.map((item, index) => (
          <div
            key={index}
            className="mb-4 p-4 border rounded shadow-sm leading-6"
          >
            <p>
              <strong>Q{index + 1}:</strong> {item.question}
            </p>
            <p>
              <h2 className="inline font-medium">Your Answer: </h2>
              {item.userAnswer ? item.userAnswer : "No answer provided"}
            </p>
            {!item.isCorrect && item?.correctAnswer && (
              <p>
                <h2 className="inline font-medium">Right Answer: </h2>
                {item.correctAnswer ? item.correctAnswer : "No answer provided"}
              </p>
            )}
            <p
              className={`font-semibold ${
                item.isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.isCorrect ? "Correct" : "Incorrect"}
            </p>
            <p className="text-sm text-gray-600 leading-normal">
              {item.explanation}
            </p>
          </div>
        ))}

        <div className="text-center">
          <button
            className="mt-6 bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded"
            onClick={() => window.location.reload()}
          >
            Try Another Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData[currentQ];

  return (
    <div className="flex justify-center items-center min-h-[89.4vh]  w-full ">
      <div className="w-[700px] mx-auto p-6 pb-4 shadow-md bg-white rounded-md">
        <h2 className="text-lg font-bold mb-4">
          Question {currentQ + 1} of {quizData.length}
        </h2>
        <div key={currentQ} className="mb-10">
          <p className="mb-4 font-semibold">{currentQuestion.question}</p>
          {currentQuestion.options.map((opt, i) => {
            {
              /* const label = opt.charAt(0); // "A", "B", etc.
          const text = opt.substring(3); // "Option text" */
            }
            return (
              <div key={i} className="mb-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`q-${currentQ}`}
                    value={opt}
                    checked={userAnswers[currentQ] === opt}
                    onChange={() => handleOptionSelect(opt)}
                  />
                  <span>{opt}</span>
                </label>
              </div>
            );
          })}
        </div>
        <div
          className={`flex ${currentQ > 0 ? "justify-between" : "justify-end"}`}
        >
          {currentQ > 0 && (
            <button
              className={` sm:px-4 px-3 py-2 text-[#06A1B7] rounded-lg transition shadow-md flex items-center`}
              onClick={() => setCurrentQ(currentQ - 1)}
            >
              <FaLessThan /> <span className="ms-1">Previous</span>
            </button>
          )}
          {currentQ < quizData.length - 1 ? (
            <button
              onClick={() => setCurrentQ(currentQ + 1)}
              className=" bg-[#06A1B7] hover:bg-[#06a2b7ec] text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
