import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { diagnoseActions } from "../sotre/DiagnosisSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PatientActions } from "../sotre/PatientSlice";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoBase64 from "../assets/logoBase64";
import { handleError } from "./errorHandler";
import { genHeaRepPromt, symptomPrompt } from "../assets/genHealthRep";

const useDiagButtonHandlers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentStep, steps } = useSelector((store) => store.diagnosis);

  const { setCurrentStep, setCompletedStep } = diagnoseActions;
  const { setSymptoms, setPatientReport, setLoading } = PatientActions;
  const { age, existingCondition } = useSelector((store) => store.patient);

  // Handle Next Button
  const handleNext = (index) => {
    if (!index) {
      throw new Error("An unexpected error occurred. Please try again.");
    }

    const stepPath = steps[index].toLowerCase();
    navigate(`/Diagnosis/${stepPath}`); // Navigate to the corresponding step

    // Update completedStep for forward navigation only
    if (index > currentStep) {
      const findMax = Math.max(currentStep, index);
      dispatch(setCompletedStep(findMax));
    }

    dispatch(setCurrentStep(index));
  };

  // Handle Previous Button
  const handlePrevious = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      dispatch(setLoading(true));
      dispatch(setCompletedStep(newStep)); // Mark the current step as incomplete
      handleNext(newStep); // Move to the previous step
    }
  };

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const get_symptoms_fromGemini = async (diseaseName) => {
    try {
      // Validate that the disease name is provided
      if (!diseaseName || diseaseName.trim() === "") {
        throw new Error("An unexpected error occurred. Please try again."); // Custom error for missing disease name
      }

      // Calling the generative model API (Gemini)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = symptomPrompt(diseaseName);
      // console.log(prompt);

      if (!prompt || prompt == "") {
        throw new Error("An unexpected error occurred. Please try again.");
      }

      // Send the request to Gemini
      const result = await model.generateContent(prompt);
      console.log(result);

      // Validate the response from the API
      if (!result || !result.response || !result.response.text()) {
        throw new Error("An unexpected error occurred. Please try again.");
      }

      // Parse the API response
      const cleanedString = result.response.text().replace(/```json|```/g, "");
      const symptoms_obj = JSON.parse(cleanedString);

      // Dispatch the parsed symptoms to the store
      dispatch(setSymptoms(symptoms_obj));
    } catch (error) {
      if (!navigator.onLine) {
        // alert("No internet connection. Please check your network and try again.");
        error =
          "No internet connection. Please check your network and try again.";
      }
      // Use the global handleError function to get the error message
      handleError(error);
      // Optionally log the error or show it in the UI
      console.log(error);
    }
  };

  const generate_health_report = async (finalSym, predicted_disease) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = genHeaRepPromt(
        existingCondition,
        age,
        finalSym,
        predicted_disease
      );

      // Ensure the prompt is valid
      if (!prompt || prompt.trim() === "") {
        throw new Error("An unexpected error occurred. Please try again.");
      }

      // Call the API to generate content
      const result = await model.generateContent(prompt);

      // Validate the response structure before processing
      if (
        !result ||
        !result.response ||
        typeof result.response.text !== "function"
      ) {
        throw new Error("An unexpected error occurred. Please try again.");
      }

      // Parse and clean the response text
      const cleanedReport = result.response.text().replace(/```json|```/g, "");
      let report_obj;

      // Validate JSON parsing and ensure the structure is as expected
      try {
        report_obj = JSON.parse(cleanedReport);
      } catch (jsonError) {
        throw new Error("An unexpected error occurred. Please try again.");
      }

      // Check if the report object has the expected structure
      if (
        !report_obj ||
        typeof report_obj !== "object" ||
        !Object.keys(report_obj).length
      ) {
        throw new Error("An unexpected error occurred. Please try again.");
      }

      console.log(report_obj);
      // Dispatch the parsed report object to the Redux store
      dispatch(setPatientReport(report_obj));
    } catch (error) {
      if (!navigator.onLine) {
        // alert("No internet connection. Please check your network and try again.");
        error =
          "No internet connection. Please check your network and try again.";
      }
      // Use the global error handler to manage the error
      handleError(error);
    }
  };

  const generatePDF = (checkupDetails) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 5;

    doc.addImage(logoBase64, "PNG", 10, 3, 17, 11);

    doc.setFontSize(18);
    doc.text("Health Checkup Report", 105, 10, { align: "center" });

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}, ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    doc.setFontSize(12);
    let y = 23; // Vertical offset for content

    const personalInfo = checkupDetails.slice(0, 4);
    const name =
      personalInfo.find((info) => info.label === "Name")?.value || "";
    const age = personalInfo.find((info) => info.label === "Age")?.value || "";
    const gender =
      personalInfo.find((info) => info.label === "Gender")?.value || "";
    const dateTime = formattedDate;

    const tableData = [
      ["Name", name, "Age", age],
      ["Gender", gender, "Date & Time", dateTime],
    ];

    doc.autoTable({
      startY: 20,
      body: tableData,
      theme: "grid",
      styles: {
        halign: "center", // Center align text in cells
      },
      columnStyles: {
        0: { halign: "left", cellWidth: 40 },
        1: { halign: "center", cellWidth: 50 },
        2: { halign: "left", cellWidth: 40 },
        3: { halign: "center", cellWidth: 50 },
      },
      didParseCell: function (data) {
        // Apply bold style to keys (Column 0 and 2)
        if (data.row.index === 0 || data.row.index === 1) {
          if (data.column.index === 0 || data.column.index === 2) {
            // data.cell.styles.fontStyle = "bold"; // Make keys bold
            data.cell.styles.textColor = [0, 0, 0];
          }
        }
      },
    });

    y = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text("Reported symptoms:", 10, y);
    y += 9;

    doc.setFontSize(12);
    const rep_sym = checkupDetails[4].reported_symptoms;
    rep_sym.forEach((symptom) => {
      const lines = doc.splitTextToSize(`•  ${symptom}`, 180);
      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - 10) {
          doc.addPage();
          y = 17;
        }
        doc.text(line, 13, y);
        y += 7;
      });
    });

    y += 5;
    doc.setFontSize(14);
    doc.text("Predicted Diseases:", 10, y);
    y += 5;

    const diseases = checkupDetails[4].possible_diseases;
    const diseaseTableBody = diseases.map((disease) => [
      disease.name,
      disease.probability,
      disease.level,
    ]);

    doc.autoTable({
      startY: y,
      head: [["Name", "Probability", "Level"]],
      body: diseaseTableBody,
      theme: "grid",
      headStyles: { fillColor: [100, 149, 237] },
      bodyStyles: { fontSize: 10, textColor: [64, 64, 64] },
    });

    y = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(14);
    doc.text("Precautions:", 10, y);
    y += 9;

    doc.setFontSize(12);
    const precautions = checkupDetails[4].precautions;
    precautions.forEach((precaution) => {
      const lines = doc.splitTextToSize(`•  ${precaution}`, 180);
      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - 10) {
          doc.addPage();
          y = 17;
        }
        doc.text(line, 13, y);
        y += 7;
      });
    });

    y += 6;
    doc.setFontSize(14);
    if (y + lineHeight > pageHeight - 10) {
      doc.addPage();
      y = 13;
    }
    doc.text("Medications:", 10, y);
    y += 9;

    doc.setFontSize(12);
    const medications = checkupDetails[4].medications;
    medications.forEach((medication) => {
      const lines = doc.splitTextToSize(`•  ${medication}`, 180);
      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - 10) {
          doc.addPage();
          y = 17;
        }
        doc.text(line, 13, y);
        y += 7;
      });
    });

    y += 6;
    doc.setFontSize(14);
    if (y + lineHeight > pageHeight - 10) {
      doc.addPage();
      y = 10;
    }
    doc.text("Risk Factors:", 10, y);
    y += 8;

    const riskFactors = checkupDetails[4].Risk_factor;
    riskFactors.forEach((risk) => {
      if (y + lineHeight > pageHeight - 10) {
        doc.addPage();
        y = 10;
      }
      doc.setFontSize(13);
      doc.text(risk.heading, 12, y);
      y += 7;

      doc.setFontSize(12);
      const paragraph = doc.splitTextToSize(risk.paragraph, 170);
      paragraph.forEach((line) => {
        if (y + lineHeight > pageHeight - 10) {
          doc.addPage();
          y = 10;
        }
        doc.text(line, 16, y);
        y += 5;
      });
    });

    y += 7;
    const note_dis = checkupDetails[4].Note_discription;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Note: ", 10, y, { baseline: "top" });

    doc.setFont("helvetica", "normal");
    note_dis.forEach((note) => {
      const dis = doc.splitTextToSize(note.paragraph, 170);
      dis.forEach((line, index) => {
        if (y + lineHeight > pageHeight - 10) {
          doc.addPage();
          y = 17;
        }
        if (index === 0) {
          y += 3.5;
          doc.text(line, 21, y);
        } else {
          y += 5;
          doc.text(line, 14, y);
        }
      });
    });

    y += 18;
    doc.setTextColor(128, 128, 128);
    doc.setFontSize(12);

    doc.text("UR Smart Developers", 14, y, { align: "left" });
    doc.text("HealthConsultancyWithAi.com", 198, y, { align: "right" });

    doc.save("Health_Checkup_Report.pdf");
  };

  const healthQuizApp = async (prompt) => {
    try {
      // Calling the generative model API (Gemini)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      if (!prompt || prompt == "") {
        throw new Error("An unexpected error occurred. Please try again.");
      }

      // Send the request to Gemini
      let result = await model.generateContent(prompt);

      // Validate the response from the API
      if (!result || !result.response || !result.response.text()) {
        throw new Error("An unexpected error occurred. Please try again.");
      }

      result = result.response.text();

      // Parse the API response
      const cleanedString = result.replace(/```json|```/g, "").trim();

      if (cleanedString === "It’s not a health-related topic.") {
        return cleanedString;
      }

      const symptoms_obj = JSON.parse(cleanedString);

      return symptoms_obj;
    } catch (error) {
      if (!navigator.onLine) {
        // alert("No internet connection. Please check your network and try again.");
        error =
          "No internet connection. Please check your network and try again.";
      }
      // Use the global handleError function to get the error message
      handleError(error);
      // Optionally log the error or show it in the UI
      console.log(error);
    }
  };

  const dietPlanApp = async (prompt) => {
    try {
      // Calling the generative model API (Gemini)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      if (!prompt || prompt == "") {
        throw new Error("An unexpected error occurred. Please try again.");
      }

      // Send the request to Gemini
      let result = await model.generateContent(prompt);

      // Validate the response from the API
      if (!result || !result.response || !result.response.text()) {
        throw new Error("An unexpected error occurred. Please try again.");
      }

      result = result.response.text();

      // Parse the API response
      const cleanedString = result.replace(/```json|```/g, "").trim();

      const symptoms_obj = JSON.parse(cleanedString);

      return symptoms_obj;
    } catch (error) {
      if (!navigator.onLine) {
        // alert("No internet connection. Please check your network and try again.");
        error =
          "No internet connection. Please check your network and try again.";
      }
      // Use the global handleError function to get the error message
      handleError(error);
      // Optionally log the error or show it in the UI
      console.log(error);
    }
  };

  return {
    handleNext,
    handlePrevious,
    get_symptoms_fromGemini,
    generate_health_report,
    generatePDF,
    healthQuizApp,
    dietPlanApp,
  };
};

export default useDiagButtonHandlers;
