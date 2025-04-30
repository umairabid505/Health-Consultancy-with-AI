import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const HealthFacilities = () => {
  const location = useLocation();

  // Show buttons only at exact /Diagnosis/healthfacilities
  const isMainHealthFacilitiesRoute =
    location.pathname === "/Diagnosis/healthfacilities";

  return (
    <div className="flex items-center justify-center min-h-[89.4vh] gap-10 flex-col bg-gray-100">
      {isMainHealthFacilitiesRoute && (
        <>
          <h2 className="text-3xl font-bold mb-6">Health Facilities</h2>
          <div className="flex items-center justify-between sm:flex-row flex-col gap-5   ">
            <Link
              to={"/Diagnosis/healthfacilities/dietplan"}
              className="bg-green-600 hover:bg-green-700 text-white text-2xl font-semibold py-10 px-10 rounded-xl shadow-lg transition-all duration-200"
            >
              Diet Planner
            </Link>

            <Link
              to={"/Diagnosis/healthfacilities/healthquiz"}
              className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold py-10 px-10 rounded-xl shadow-lg transition-all duration-200"
            >
              Health Test
            </Link>
          </div>
        </>
      )}

      <Outlet />
    </div>
  );
};

export default HealthFacilities;
