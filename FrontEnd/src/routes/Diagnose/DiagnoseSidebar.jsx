import React from "react";
import { useSelector } from "react-redux";

const DiagnoseSidebar = () => {
  const { currentStep, completedStep, steps } = useSelector(
    (store) => store.diagnosis
  );
  console.log(completedStep);

  return (
    <>
      <div className="basis-[20%] hidden lg:block w-64 p-4 relative mt-10 h-[450px]">
        <ul className="space-y-4">
          {steps.map((step, index) => (
            <li key={step}>
              {console.log("index", index, "current", currentStep)}
              <button
                disabled={index > completedStep} // Disable buttons beyond the completed step
                // onClick={() => handleNavigation(index)}
                className={`relative w-full text-left  px-4 py-2 transition ${
                  currentStep === index
                    ? "text-black cursor-text font-semibold" //for current step
                    : index < completedStep
                    ? "text-[#1f1d1d] cursor-text" // for completed steps
                    : "text-[#6967678c] cursor-not-allowed" // for uncomplete steps
                }`}
              >
                {step}
              </button>
            </li>
          ))}
        </ul>

        {/* Progress Bar */}
        <div className="basis-[80%] absolute top-0 left-0 h-[58%] w-1 bg-gray-200 mt-5">
          <div
            className="bg-[#082258] transition-all duration-500"
            style={{
              height: `${((currentStep + 1) / steps.length) * 100}%`, // Progress changes dynamically
            }}
          ></div>
        </div>
      </div>

      {/* Mobile Progress Bar */}

      <div className="block lg:hidden w-full px-7 py-2">
        {/* Steps Indicator */}
        <div className="flex justify-between items-center mb-2 text-sm font-medium">
          <span className="text-gray-700">
            Step {currentStep + 1}/{steps.length}
          </span>
          <span className="text-gray-700">{steps[currentStep]}</span>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-[#082258] h-2.5 rounded-full transition-all duration-500"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`, // Dynamic width
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default DiagnoseSidebar;
