// // frontend/src/components/AddDiseaseForm.jsx

// import { useState } from "react";
// import axios from "axios";

// function AddDiseaseForm() {
//   const [disease, setDisease] = useState("");
//   const [symptomsText, setSymptomsText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const symptomsArray = symptomsText
//       .split(",")
//       .map((s) => s.trim().toLowerCase())
//       .filter((s) => s);

//     if (!disease || symptomsArray.length === 0) {
//       alert("Please provide both disease name and symptoms.");
//       return;
//     }

//     try {
//       console.log(disease, symptomsArray);

//       setLoading(true);
//       const response = await axios.post(
//         "http://localhost:5000/api/admin/add-disease",
//         {
//           disease: disease.trim().toLowerCase(),
//           symptoms: symptomsArray,
//         }
//       );

//       alert(response.data.message);
//       setDisease("");
//       setSymptomsText("");
//     } catch (err) {
//       alert(err.response?.data?.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="form-box">
//       <h2>Add New Disease</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Disease Name"
//           value={disease}
//           onChange={(e) => setDisease(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Comma-separated symptoms (e.g. fever, headache)"
//           value={symptomsText}
//           onChange={(e) => setSymptomsText(e.target.value)}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Adding..." : "Add Disease"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddDiseaseForm;





import { useState } from "react";
import axios from "axios";

function AddDiseaseForm() {
  const [disease, setDisease] = useState("");
  const [symptomsText, setSymptomsText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const symptomsArray = symptomsText
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s);

    if (!disease || symptomsArray.length === 0) {
      alert("Please provide both disease name and symptoms.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/admin/add-disease",
        {
          disease: disease.trim().toLowerCase(),
          symptoms: symptomsArray,
        }
      );

      alert(response.data.message);
      setDisease("");
      setSymptomsText("");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen bg-gray-100 p-4">
    <h1 className="text-[30px] font-bold">Admin Dashboard</h1>
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Add New Disease
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">
              Disease Name
            </label>
            <input
              type="text"
              placeholder="Enter disease name"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-semibold">
              Symptoms (comma-separated)
            </label>
            <textarea
              placeholder="e.g. fever, headache, nausea"
              value={symptomsText}
              onChange={(e) => setSymptomsText(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-300"
          >
            {loading ? "Adding..." : "Add Disease"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDiseaseForm;
