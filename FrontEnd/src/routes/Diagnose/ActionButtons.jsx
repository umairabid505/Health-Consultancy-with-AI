import useDiagButtonHandlers from "../../utils/DiagHandlers";
import { useSelector } from "react-redux";

const ActionButtons = ({ onStartNewCheckup }) => {
  const { patientReport, name, age, gender, combineSym } = useSelector(
    (store) => store.patient
  );

  const { generatePDF } = useDiagButtonHandlers();

  const checkupDetails = [
    { label: "Name", value: name },
    { label: "Age", value: age },
    { label: "Gender", value: gender },
    { label: "Predicted Disease" },
    {
      reported_symptoms: combineSym,
      possible_diseases: patientReport.possible_diseases,
      medications: patientReport.medications,
      Risk_factor: patientReport.patient_condition,
      precautions: patientReport.precautions,
      Note_discription: [
        {
          paragraph:
            "Please note that the information from this tool is only for educational purposes and isn’t a qualified medical opinion. This information shouldn’t be considered a doctor’s or other medical professional’s advice or opinion about your actual health. You should get help for your symptoms from a doctor or other medical professional. If you’re having a health emergency, you should call the local emergency number right away for help.",
        },
      ],
    },
  ];

  return (
    <div className="flex justify-center space-x-3 mt-6">
      {/* Download PDF Button */}
      <button
        className="bg-blue-600 text-sm sm:text-base text-white px-6 py-3 rounded-md hover:bg-blue-700"
        onClick={() => {
          generatePDF(checkupDetails);
        }}
      >
        Download as PDF
      </button>

      {/* Start New Checkup Button */}
      <button
        className="bg-green-600 text-sm sm:text-base text-white px-6 py-3 rounded-md hover:bg-green-700"
        onClick={onStartNewCheckup}
      >
        Start New Checkup
      </button>
    </div>
  );
};

export default ActionButtons;
