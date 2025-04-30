import { createSlice } from "@reduxjs/toolkit";

const PatientSlice = createSlice({
  name: "Patient",
  initialState: {
    name: "",
    age: "",
    gender: "",
    existingCondition: "",
    diseaseName: "",
    Gem_symptoms: {},
    combineSym: [],
    patientReport: {},
    loading: true,
  },
  reducers: {
    setPatientInfo: (state, action) => {
      Object.assign(state, action.payload);
    },
    setDisease: (state, action) => {
      state.diseaseName = action.payload;
    },
    setSymptoms: (state, action) => {
      state.Gem_symptoms = action.payload;
    },
    setCombineSym: (state, action) => {
      state.combineSym = action.payload;
    },
    setPatientReport: (state, action) => {
      state.patientReport = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const PatientActions = PatientSlice.actions;
export default PatientSlice;
