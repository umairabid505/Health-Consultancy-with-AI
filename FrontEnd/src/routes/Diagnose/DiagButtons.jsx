import React from "react";
import { useSelector } from "react-redux";
import { FaLessThan } from "react-icons/fa6";
import useDiagButtonHandlers from "../../utils/DiagHandlers";

const DiagButtons = (props) => {
  const { handlePrevious } = useDiagButtonHandlers();
  const { currentStep, steps } = useSelector((store) => store.diagnosis);

  return (
    <div
      className={`flex border-t border-gray-300 mt-2 lg:mt-0 py-3 px-4 md:pb-0  ${
        currentStep === 0 ? "justify-end" : "justify-between"
      }`}
    >
      <button
        className={` sm:px-4 px-3 py-2 text-[#06A1B7] rounded-lg transition shadow-md flex items-center ${
          currentStep === 0 && "hidden"
        }`}
        disabled={currentStep === 0}
        onClick={() => handlePrevious()}
      >
        <FaLessThan /> <span className="ms-1">Previous</span>
      </button>
      <button
        className={`sm:px-6 px-5 py-2 text-white bg-[#06A1B7] rounded-md hover:bg-[#06a2b7ec] transition disabled:opacity-50`}
        disabled={currentStep === steps.length - 1}
        onClick={() => props.stepsHandler()}
      >
        Next
      </button>
    </div>
  );
};

export default DiagButtons;
