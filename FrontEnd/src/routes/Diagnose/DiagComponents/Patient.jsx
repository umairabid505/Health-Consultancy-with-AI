import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiagButtons from "../DiagButtons";
import useDiagButtonHandlers from "../../../utils/DiagHandlers";
import { PatientActions } from "../../../sotre/PatientSlice";
import DOMPurify from "dompurify";
import { handleError } from "../../../utils/errorHandler";

const Patient = () => {
  const patientName = useRef(); // Ref to store patient name input
  const existingConditionRef = useRef(); // Ref to store existing conditions input (optional)
  const [formErrors, setFormErrors] = useState({}); // State to track form validation errors
  const { setPatientInfo } = PatientActions;
  const { handleNext } = useDiagButtonHandlers();
  const { currentStep } = useSelector((store) => store.diagnosis);
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = () => {
    try {
      const name = patientName.current?.value
        ? DOMPurify.sanitize(patientName.current.value)
        : "";
      const age = document.getElementById("age")?.value
        ? DOMPurify.sanitize(document.getElementById("age").value)
        : "";
      const gender = document.querySelector("button.active")?.innerText
        ? DOMPurify.sanitize(document.querySelector("button.active").innerText)
        : "";
      const existingCondition = existingConditionRef.current?.value
        ? DOMPurify.sanitize(existingConditionRef.current.value)
        : "No"; // Optional Field

      // Form validation
      const errors = {};
      if (!name || name.trim() === "") errors.name = "Name is required.";
      if (!age || isNaN(age) || age < 1 || age > 120)
        errors.age = "Enter a valid age (1-120).";
      if (!gender) errors.gender = "Please select a gender.";

      // Check if there are any validation errors
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      // Dispatch actions to save form data
      dispatch(setPatientInfo({ name, age, gender, existingCondition }));

      // Proceed to the next step
      handleNext(currentStep + 1);
    } catch (error) {
      handleError("An unexpected error occurred. Please try again.");
    }
  };

  // Handle gender selection
  const handleGenderSelection = (e) => {
    document.querySelectorAll("button.gender-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    setFormErrors((prevErrors) => ({ ...prevErrors, gender: null }));
  };

  return (
    <>
      <div className="min-h-[382px] lg:min-h-[84.2%] px-6">
        <h2 className="text-2xl font-bold text-gray-800 pt-3 mt-2 text-center md:text-left">
          Patient Details
        </h2>

        <div className="flex flex-wrap items-center justify-center mt-10 lg:mt-16 gap-5 lg:gap-x-6">
          {/* Name Field */}
          <div className=" md:w-[35%] lg:w-[30%] flex flex-col ">
            <label
              htmlFor="name"
              className="text-gray-700 font-semibold text-sm sm:text-base"
            >
              Name
            </label>
            <input
              type="text"
              ref={patientName}
              id="name"
              name="name"
              className="w-full px-2 py-1 border-b border-blue-500 outline-none"
              placeholder="Enter patient's name"
              required
              autoFocus
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>

          {/* Age Field */}
          <div className="w-full md:w-[40%] lg:w-[25%] xl:w-[23%] flex flex-col gap-1 items-center">
            <label
              htmlFor="age"
              className="text-gray-700 font-semibold text-sm sm:text-base"
            >
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              className="w-20 mx-auto md:mx-0 px-2 py-1 border border-gray-300 text-center outline-none"
              placeholder="Age"
              required
            />
            {formErrors.age && (
              <p className="text-red-500 text-sm">{formErrors.age}</p>
            )}
          </div>
        </div>

        {/* Gender Field */}
        <div className="mt-8">
          <label
            htmlFor="gender"
            className="text-gray-700 font-semibold text-sm sm:text-base text-center block"
          >
            Gender
          </label>
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              type="button"
              className="gender-btn w-24 px-4 py-3 bg-blue-300 shadow-md rounded-md 
              hover:bg-blue-400 active:scale-95 transition-all duration-200"
              onClick={handleGenderSelection}
            >
              Male
            </button>
            <button
              type="button"
              className="gender-btn w-24 px-4 py-3 bg-blue-300 shadow-md rounded-md 
              hover:bg-blue-400 active:scale-95 transition-all duration-200"
              onClick={handleGenderSelection}
            >
              Female
            </button>
          </div>
          {formErrors.gender && (
            <p className="text-red-500 text-sm text-center">
              {formErrors.gender}
            </p>
          )}
        </div>

        {/* Existing Medical Conditions Field (Optional) */}
        <div className="mt-4">
          <label
            htmlFor="existingCondition"
            className="text-gray-700 font-semibold text-sm sm:text-base text-center block"
          >
            Existing Medical Conditions (Optional)
          </label>
          <div className="flex items-center justify-center mt-2">
            <input
              type="text"
              ref={existingConditionRef}
              id="existingCondition"
              name="existingCondition"
              className="w-[250px] md:w-[300px] px-3 py-2 border border-gray-300 outline-none rounded-md"
              placeholder="E.g., Diabetes, High Blood Pressure"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <DiagButtons stepsHandler={handleSubmit} />
    </>
  );
};

export default Patient;
