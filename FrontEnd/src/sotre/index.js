import { configureStore } from "@reduxjs/toolkit";
import diagnosisSlice from "./DiagnosisSlice";
import PatientSlice from "./PatientSlice";

const DiagnoseStore = configureStore({
  reducer: {
    diagnosis: diagnosisSlice.reducer,
    patient: PatientSlice.reducer,
  },
});

export default DiagnoseStore;
