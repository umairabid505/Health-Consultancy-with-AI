import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import DiagnoseSidebar from "./DiagnoseSidebar.jsx";
import DiagnoseContent from "./DiagnoseContent.jsx";
import { diagnoseActions } from "../../sotre/DiagnosisSlice.js";
import DiagHeader from "./DiagHeader.jsx";

export default function Diagnosis() {
  const { setCurrentStep } = diagnoseActions;

  const { completedStep, steps, currentStep } = useSelector(
    (store) => store.diagnosis
  );
  console.log(steps);
  const dispatch = useDispatch();

  const location = useLocation(); // Current location

  const navigate = useNavigate(); // Navigate between routes
  const [loading, setLoading] = useState(true); // 3-second enforced loading
  const navigation = useNavigation(); // Track navigation state

  const isHealthTestRoute = location.pathname.includes(
    "/Diagnosis/healthfacilities"
  );

  // Redirect to "Introduction" on page load or refresh
  useEffect(() => {
    const currentPath = location.pathname.split("/").pop(); // Extract step from URL
    const stepIndex = steps.findIndex(
      (step) => step.toLowerCase() === currentPath
    );
    // Redirect if:
    // 1. The current path is invalid (not in steps array).
    // 2. The user directly accesses a step they haven't completed yet.
    // 3. On page refresh, always redirect to "Introduction."

    if (!isHealthTestRoute) {
      if (
        stepIndex === -1 ||
        stepIndex > completedStep ||
        location.pathname === "/Diagnosis"
      ) {
        navigate("/Diagnosis/introduction", { replace: true });
        dispatch(setCurrentStep(0));
      } else {
        dispatch(setCurrentStep(stepIndex));
      }
    }
  }, [location.pathname, steps, completedStep, navigate]);

  useEffect(() => {
    // Simulate a strict 3-second loading
    const timer = setTimeout(() => {
      setLoading(false); // Allow loading to complete after 3 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // If navigation is still loading or 3-second enforced loading is active
  if (loading || navigation.state === "loading") {
    return (
      <div className="container loader-section">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <DiagHeader />
      {isHealthTestRoute ? (
        <Outlet />
      ) : (
        <div className="bg-[#F3F5F7] lg:px-[20px] min-h-[543px]">
          <div className="flex lg:flex-row flex-col max-w-[1050px] mx-auto">
            {/* Sidebar */}
            <DiagnoseSidebar />
            {/* Content Section */}
            {currentStep === 4 ? <Outlet /> : <DiagnoseContent />}
            <hr />
          </div>
        </div>
      )}
    </>
  );
}
