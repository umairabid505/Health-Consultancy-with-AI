import axios from "axios";
import React, { useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import DiagButtons from "../DiagButtons";
import useDiagButtonHandlers from "../../../utils/DiagHandlers";
import { useDispatch, useSelector } from "react-redux";
import { PatientActions } from "../../../sotre/PatientSlice";
import allSymptoms from "../../../assets/symptom.json";
import { handleError } from "../../../utils/errorHandler";
import DOMPurify from "dompurify";

const Symptoms = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const { handleNext, get_symptoms_fromGemini } = useDiagButtonHandlers();
  const { currentStep } = useSelector((store) => store.diagnosis);
  const { setDisease, setCombineSym } = PatientActions;
  const dispatch = useDispatch();
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const itemRefs = useRef([]); // References for dropdown items

  // Predefined thresholds for progress percentage
  const symptomThresholds = [
    { count: 0, percentage: 0 },
    { count: 2, percentage: 7 },
    { count: 4, percentage: 25 },
    { count: 6, percentage: 40 },
    { count: 10, percentage: 60 },
    { count: 13, percentage: 85 },
    { count: 15, percentage: 95 },
    { count: 131, percentage: 100 },
  ];

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    if (query) {
      const matches = allSymptoms.filter((symptom) =>
        symptom.toLowerCase().includes(query)
      );
      setFilteredSymptoms(matches);
    } else {
      setFilteredSymptoms([]);
    }
    setHighlightedIndex(-1); // Reset the highlighted index
  };

  const handleAddSymptom = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, DOMPurify.sanitize(symptom)]);
    }
    if (selectedSymptoms.length === 0) {
      setError(false);
    }
    setSearch("");
    setFilteredSymptoms([]);
    setHighlightedIndex(-1); // Reset highlight
  };

  const handleRemoveSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  // Calculate progress percentage based on selected symptoms
  const getPercentage = () => {
    const symptomsCount = selectedSymptoms.length;
    let percentage = 0;

    for (const threshold of symptomThresholds) {
      if (symptomsCount <= threshold.count) {
        percentage = threshold.percentage;
        break;
      }
    }

    return percentage;
  };

  const percentage = getPercentage();

  const predictDisease = async () => {
    try {
      // Validate that symptoms are selected
      if (selectedSymptoms.length === 0) {
        setError(true); // Trigger error for no symptoms selected
        return;
      }
      // Send POST request to your Python API with timeout handling
      const response = await axios.post(
        "http://127.0.0.1:3000/predict",
        {
          symptoms: selectedSymptoms, // Sending selected symptoms
        },
        {
          timeout: 10000, // Set timeout of 10 seconds for the request
        }
      );

      // Check response and handle success or unexpected results
      if (response.status === 200 && response.data?.predicted_disease) {
        const pred_dise = response.data.predicted_disease;

        // Update state and navigate to the next step
        dispatch(setDisease(pred_dise));
        dispatch(setCombineSym(selectedSymptoms));
        get_symptoms_fromGemini(pred_dise);
        handleNext(currentStep + 1); // Navigate to the next step
      } else {
        handleError(response);
      }
    } catch (error) {
      // Use the centralized error handler
      console.log(error);
      
      handleError(error);
    }
  };

  const handleKeyDown = (e) => {
    if (filteredSymptoms.length === 0) return;

    if (e.key === "ArrowDown") {
      // Move down in the list
      setHighlightedIndex((prevIndex) => {
        const newIndex =
          prevIndex < filteredSymptoms.length - 1 ? prevIndex + 1 : 0;
        scrollToHighlightedItem(newIndex);
        return newIndex;
      });
    } else if (e.key === "ArrowUp") {
      // Move up in the list
      setHighlightedIndex((prevIndex) => {
        const newIndex =
          prevIndex > 0 ? prevIndex - 1 : filteredSymptoms.length - 1;
        scrollToHighlightedItem(newIndex);
        return newIndex;
      });
    } else if (e.key === "Enter") {
      // Select the highlighted symptom
      if (highlightedIndex >= 0 && highlightedIndex < filteredSymptoms.length) {
        handleAddSymptom(filteredSymptoms[highlightedIndex]);
      }
    }
  };

  const scrollToHighlightedItem = (index) => {
    const item = itemRefs.current[index];
    if (item) {
      item.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <>
      <div className=" min-h-[393px]  px-4 pt-4 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add your symptoms
        </h2>
        <div className=" max-w-[90%] flex flex-col md:flex-row mx-auto gap-7 mt-10">
          {/* Left Section: Search and Selected Symptoms */}
          <div className="basis-[55%] ">
            {/* Search Bar */}
            <div className="relative flex items-center mb-4">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown} // Add keyboard navigation
                placeholder="Search, e.g., Fever"
                autoFocus
                className="w-full p-3 border border-black rounded-lg focus:outline-1 focus:outline-blue-500 focus:outline-offset-4"
              />
              <button className="absolute right-3 text-blue-500">
                <IoSearchOutline className="font-bold w-[30px] h-[23px]" />
              </button>

              {/* Dropdown Suggestions */}
              {filteredSymptoms.length > 0 && (
                <ul className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md z-10 h-[200px] overflow-auto ">
                  {filteredSymptoms.map((symptom, index) => (
                    <li
                      key={index}
                      ref={(el) => (itemRefs.current[index] = el)} // Assign ref to each item
                      onClick={() => handleAddSymptom(symptom)}
                      className={`p-2 cursor-pointer hover:bg-blue-100 ${
                        highlightedIndex === index ? "bg-blue-200" : ""
                      }`}
                    >
                      {symptom}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {error && (
              <p className="text-red-500 text-sm -mb-4 ">
                Add at least one symptom
              </p>
            )}
            {/* Selected Symptoms */}
            <div className="mt-6 bg-gray-100 h-[170px] rounded-lg text-center p-2">
              {selectedSymptoms.length === 0 ? (
                <p className="text-center text-gray-500 flex items-center justify-center h-full">
                  Please try to add more symptoms.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-[160px] overflow-auto">
                  {selectedSymptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="flex items-center max-h-7 bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {symptom}

                      <button
                        onClick={() => handleRemoveSymptom(symptom)}
                        className="ml-2 text-white font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section: Progress Bar */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              <svg width="150" height="150" className="transform -rotate-90">
                {/* Background Circle */}
                <circle
                  cx="75"
                  cy="75"
                  r="65"
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth="10"
                />
                {/* Progress Circle */}
                <circle
                  cx="75"
                  cy="75"
                  r="65"
                  fill="none"
                  stroke="#ff6b6b"
                  strokeWidth="10"
                  strokeDasharray="408" // Circumference = 2 * Math.PI * 65
                  strokeDashoffset={(408 * (100 - percentage)) / 100}
                  strokeLinecap="round"
                />
              </svg>
              {/* Text Inside the Circle */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#f13232] ">
                  {percentage}%
                </span>
                <span className="text-sm text-gray-600">
                  {selectedSymptoms.length} Symptoms
                </span>
              </div>
              <h3 className="text-center mt-1 font-medium">Result Accuracy</h3>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
      <DiagButtons stepsHandler={predictDisease} />
    </>
  );
};

export default Symptoms;
