import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import ActionButtons from "../ActionButtons";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { PatientActions } from "../../../sotre/PatientSlice";

const Results = () => {
  const { patientReport, name, age, gender, loading } = useSelector(
    (store) => store.patient
  );
  console.log(patientReport);
  const { setLoading } = PatientActions;
  const dispatch = useDispatch();
  
  useEffect(() => {
    setTimeout(() => {
      if (patientReport && Object.keys(patientReport).length > 0)
        dispatch(setLoading(false));
    }, 3000);
  }, [patientReport]);

  const [showMedications, setShowMedications] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [activeCondition, setActiveCondition] = useState(null);

  const handleStartNewCheckup = () => {
    // Reset or navigate logic here
    // navigate("/Diagnosis/introduction");
    window.location.reload();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen basis-[80%]">
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div>
          {/* Main Result Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex sm:flex-row flex-col items-center gap-6">
            {/* Text Content */}
            {patientReport?.patient_condition?.map((elem, index) => (
              <div className="basis-[65%] order-2 sm:order-1 ">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                  {elem.heading}
                </h2>
                <p className="text-gray-700 mb-4 text-justify">
                  {elem.paragraph}
                </p>
              </div>
            ))}

            {/* Image Section */}
            <div className="basis-[35%] order-1 sm:order-2 flex justify-end">
              <img
                src="/stethoscope-removebg-preview.png"
                alt="Self-care illustration"
                className="w-40 h-40 object-cover rounded-md"
              />
            </div>
          </div>

          {/* Possible Conditions Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="xs:text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Possible Conditions
            </h3>
            {patientReport?.possible_diseases?.map((condition, index) => (
              <div
                key={index}
                className="border-b border-gray-200 py-4 flex flex-col"
              >
                {/* Accordion Header */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setActiveCondition(activeCondition === index ? null : index)
                  }
                >
                  {/* Disease Name */}
                  <span className="text-gray-800 font-medium sm:font-bold flex items-center">
                    {condition.name}
                    <span className="ml-2">
                      {activeCondition === index ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </span>
                  </span>

                  {/* Probability Level with Progress Bar */}
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-sm ${
                        condition.level === "High"
                          ? "text-red-600"
                          : condition.level === "Moderate"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {condition.level}
                    </span>
                    <div className="w-10 sm:w-16 h-2 bg-gray-300 rounded">
                      <div
                        className={`h-2 rounded ${
                          condition.level === "High"
                            ? "bg-red-600"
                            : condition.level === "Moderate"
                            ? "bg-yellow-600"
                            : "bg-green-600"
                        }`}
                        style={{ width: `${condition.probability}` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Accordion Content */}
                {activeCondition === index && (
                  <div className="mt-4 pl-4 text-gray-700">
                    <p>{condition.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Medications and Recommendations Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <h3 className="xs:text-lg sm:text-xl font-semibold text-gray-800">
                Medications & Recommendations
              </h3>
              <button
                onClick={() => setShowMedications(!showMedications)}
                className="text-blue-600 hover:underline"
              >
                {showMedications ? "Hide" : "Show"}
              </button>
            </div>
            {showMedications && (
              <div className="mt-4 pl-5">
                <p className="text-gray-700 font-bold mb-2"> Medications:</p>
                <ul className="list-disc ml-6">
                  {patientReport?.medications?.map((element, index) => (
                    <li key={index} className="text-gray-700">
                      {element}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 font-bold mb-2 mt-4">
                  {" "}
                  Precautions:
                </p>
                <ul className="list-disc ml-6">
                  {patientReport.precautions.map((element, index) => (
                    <li key={index} className="text-gray-700">
                      {element}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 font-bold mb-2 mt-4"> Workout:</p>
                <ul className="list-disc ml-6">
                  {patientReport.workout.map((element, index) => (
                    <li key={index} className="text-gray-700">
                      {element}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 font-bold mb-2 mt-4">Diets:</p>
                <ul className="list-disc ml-6">
                  {patientReport.diets.map((element, index) => (
                    <li key={index} className="text-gray-700">
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Personal Information Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center">
              <h3 className="xs:text-lg sm:text-xl font-semibold text-gray-800">
                Personal Information
              </h3>
              <button
                onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                className="text-blue-600 hover:underline"
              >
                {showPersonalInfo ? "Hide" : "Show"}
              </button>
            </div>
            {showPersonalInfo && (
              <div className="mt-4">
                <p className="text-gray-700">
                  <strong>Name:</strong> {name}
                </p>
                <p className="text-gray-700">
                  <strong>Age:</strong> {age}
                </p>
                <p className="text-gray-700">
                  <strong>Gender:</strong> {gender}
                </p>
              </div>
            )}
          </div>
          <div className="container mx-auto p-6">
            <h1 className="text-lg xs:text-xl sm:text-2xl font-semibold sm:font-bold mb-6">
              Health Checkup Results
            </h1>

            {/* Render action buttons */}
            <ActionButtons onStartNewCheckup={handleStartNewCheckup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
