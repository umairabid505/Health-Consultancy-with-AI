import { createSlice } from "@reduxjs/toolkit";

const diagnosisSlice = createSlice({
  name: "Diagnose",
  initialState: {
    currentStep: 0,
    completedStep: 0,
    steps: ["Introduction", "Patient", "Symptoms", "Interview", "Results"],
    pateineName: "",
  },
  reducers: {
    setCompletedStep: (state, action) => {
      state.completedStep = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setPatientName: (state, action) => {
      state.pateineName = action.payload;
    },
  },
});

export const diagnoseActions = diagnosisSlice.actions;
export default diagnosisSlice;
