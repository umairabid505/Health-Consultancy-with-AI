import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "animate.css";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS CSS file
AOS.init(); // Initialize AOS animations
import App from "./App.jsx";
import Home from "./routes/Home.jsx";
import Introduction from "./routes/Diagnose/DiagComponents/Introduction.jsx";
import Patient from "./routes/Diagnose/DiagComponents/Patient.jsx";
import Symptoms from "./routes/Diagnose/DiagComponents/Symptoms.jsx";
import Interview from "./routes/Diagnose/DiagComponents/Interview.jsx";
import Results from "./routes/Diagnose/DiagComponents/Results.jsx";
import DiagnoseStore from "./sotre/index.js";
import About from "./routes/About.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Services from "./routes/Services.jsx";
import ContactUs from "./routes/ContactUs.jsx";
import Diagnosis from "./routes/Diagnose/Diagnosis.jsx";
import QuizApp from "./routes/HealthTest.jsx";
import DietPlanner from "./components/DietPlanner.jsx";
import HealthFacilities from "./components/HealthFacilities.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/Diagnosis",
    element: <Diagnosis />,
    errorElement: <ErrorPage />,
    children: [
      { path: "introduction", element: <Introduction /> },
      { path: "patient", element: <Patient /> },
      { path: "symptoms", element: <Symptoms /> },
      { path: "interview", element: <Interview /> },
      { path: "results", element: <Results /> },
      {
        path: "healthfacilities",
        element: <HealthFacilities />,
        children: [
          { path: "healthquiz", element: <QuizApp /> },
          { path: "dietplan", element: <DietPlanner /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={DiagnoseStore}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);
