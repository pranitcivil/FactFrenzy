import React, { useRef, useState } from "react";

import { QuizData } from "../QuizData";
const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(QuizData[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let option5 = useRef(null);

  const option_array = [option1, option2, option3, option4, option5];

  const checkans = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("bg-green-400", "border-black");
        setLock(true);
        setScore((prevState) => prevState + 1);
      } else {
        e.target.classList.add("bg-red-400", "border-black");
        setLock(true);
        option_array[question.ans - 1].current.classList.add(
          "bg-green-400",
          "border-black"
        );
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === QuizData.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(index + 1);
      setQuestion(QuizData[index + 1]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("bg-red-400", "border-black");
        option.current.classList.remove("bg-green-400", "border-black");
        return null;
      });
    }
  };
  const reset = () => {
    setIndex(0);
    setQuestion(QuizData[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };
  return (
    <div className="w-[640px]  bg-white m-auto flex flex-col gap-5 rounded-xl p-10">
      <h1 className="font-bold text-4xl">Quiz App</h1>
      <hr className="h-[2px] bg-stone-700 border-0" />
      {result ? (
        <></>
      ) : (
        <>
          <h2 className="text-2xl ">
            {index + 1}.{question.question}?
          </h2>
          <ul>
            <li
              ref={option1}
              onClick={(e) => {
                checkans(e, 1);
              }}
              className="p-2 border-2 border-solid border-bg-stone-700 mt-2 rounded-md"
            >
              {question.option1}
            </li>
            <li
              ref={option2}
              onClick={(e) => {
                checkans(e, 2);
              }}
              className="p-2 border-2 border-solid border-bg-stone-700 mt-2 rounded-md"
            >
              {question.option2}
            </li>
            <li
              ref={option3}
              onClick={(e) => {
                checkans(e, 3);
              }}
              className="p-2 border-2 border-solid border-bg-stone-700 mt-2 rounded-md"
            >
              {question.option3}
            </li>
            <li
              ref={option4}
              onClick={(e) => {
                checkans(e, 4);
              }}
              className="p-2 border-2 border-solid border-bg-stone-700 mt-2 rounded-md"
            >
              {question.option4}
            </li>
          </ul>
          <button
            onClick={next}
            className="m-auto w-52 h-12 bg-violet-700 text-white text-xl font-[500] rounded-lg cursor-pointer"
          >
            Next
          </button>
          <div className="m-auto text-[18px]">
            {index + 1} of {QuizData.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          {" "}
          <h2>
            You Scored {score} out of {QuizData.length}
          </h2>
          <button
            onClick={reset}
            className="m-auto w-52 h-12 bg-violet-700 text-white text-xl font-[500] rounded-lg cursor-pointer"
          >
            Reset
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
