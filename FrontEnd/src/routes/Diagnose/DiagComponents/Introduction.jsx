import React from "react";
import { useSelector } from "react-redux";
import DiagButtons from "../DiagButtons";
import useDiagButtonHandlers from "../../../utils/DiagHandlers";

function Introduction() {
  const { handleNext } = useDiagButtonHandlers();
  const { currentStep } = useSelector((store) => store.diagnosis);

  return (
    <>
      <div className="min-h-[86%] md:flex flex-wrap md:flex-nowrap gap-5 items-center pt-3 px-4 md:px-5">
        {/* Text Section */}
        <div className="flex-1">
          <h1 className="text-[18px] sm:text-2xl font-bold text-gray-800">
            Evaluate Your Symptoms
          </h1>
          <p className="mt-2 text-gray-600">
            Your information remains private and secure. The results will
            provide:
          </p>
          <ul className="mt-3 text-gray-600 space-y-2 list-disc pl-5">
            <li>Potential causes of your symptoms</li>
            <li>Suggested next steps for care</li>
          </ul>

          <h2 className="mt-10 text-[18px] sm:text-2xl font-semibold text-gray-800">
            About This Tool
          </h2>
          <ul className="mt-2 text-gray-600 space-y-2 list-disc pl-5">
            <li>Designed and reviewed by medical professionals</li>
            <li>Validated using real patient cases</li>
            <li>Certified as a Class I medical device in the EU</li>
          </ul>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center h-[230px] sm:h-[260px] md:h-[280px] mt-5 md:mt-0">
          <img
            src="/images/introductionVector.avif" // Replace with the correct image path
            alt="Symptom Assessment"
            className="md:max-w-full  rounded-lg shadow-lg"
          />
        </div>
      </div>
      <DiagButtons stepsHandler={() => handleNext(currentStep + 1)} />
    </>
  );
}

export default Introduction;
