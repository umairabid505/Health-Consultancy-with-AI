import React, { useEffect, useState } from "react";
import DiagButtons from "../DiagButtons";
import useDiagButtonHandlers from "../../../utils/DiagHandlers";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { useNavigation } from "react-router-dom";
import Loader from "../Loader";
import { PatientActions } from "../../../sotre/PatientSlice";

const Interview = () => {
  const { Gem_symptoms, combineSym, diseaseName, loading } = useSelector(
    (store) => store.patient
  );
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const { handleNext, generate_health_report } = useDiagButtonHandlers();
  const { currentStep } = useSelector((store) => store.diagnosis);

  const { setCombineSym, setLoading } = PatientActions;

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (Gem_symptoms && Object.keys(Gem_symptoms).length > 0)
        dispatch(setLoading(false));
    }, 3000);
  }, [Gem_symptoms]);

  // Handle checkbox toggle
  const handleCheckboxChange = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      // Remove symptom if already selected
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      // Add symptom to the selected list
      setSelectedSymptoms([...selectedSymptoms, DOMPurify.sanitize(symptom)]);
    }
  };

  const submitSym = () => {
    dispatch(setLoading(true));
    const finalSym = [...selectedSymptoms, ...combineSym];
    generate_health_report(finalSym, diseaseName);
    dispatch(setCombineSym(finalSym));
    handleNext(currentStep + 1);
  };

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="w-full min-h-[393px] mx-auto px-5 pt-4 ">
            <h2 className="text-xl sm:text-2xl font-medium sm:font-bold text-gray-800 mb-3">
              Do you have any of the following symptoms?
            </h2>
            <p className="text-gray-600 mb-2">Select all answers that apply:</p>

            {/* Checkbox list */}
            <div className="max-w-[700px] mx-auto divide-y divide-gray-300 overflow-auto max-h-[279px] ">
              {Gem_symptoms?.symptoms?.map((symptom, index) => (
                <div key={index} className="py-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      value={symptom}
                      checked={selectedSymptoms.includes(symptom)}
                      onChange={() => handleCheckboxChange(symptom)}
                      className="sm:h-5 h-4 w-4 sm:w-5 "
                    />
                    <span className="text-sm xs:text-[16px] sm:text-base text-gray-800">
                      {symptom}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <DiagButtons stepsHandler={submitSym} />
        </>
      )}
    </>
  );
};

export default Interview;
