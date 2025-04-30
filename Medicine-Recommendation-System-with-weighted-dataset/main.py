# Import necessary libraries
from flask import Flask, request, jsonify             # Core Flask modules for handling requests and responses
import numpy as np                                     # For numerical computations (used if needed in logic)
import pandas as pd                                    # For data manipulation and CSV handling
from joblib import load                                # To load the pre-trained machine learning model
from flask_cors import CORS                            # To handle Cross-Origin Resource Sharing (CORS)
from flask_limiter import Limiter                      # Flask extension to apply rate limiting
from flask_limiter.util import get_remote_address      # Utility to identify clients by IP address
from markupsafe import escape                          # Sanitize user inputs to prevent XSS
import logging                                          # For application logging and debugging

# Initialize the Flask application
app = Flask(__name__)

# Configure CORS policy
# Allow requests only from the frontend running at localhost:5173
CORS(
    app,
    supports_credentials=True,                         # Allow sending credentials like cookies with requests
    resources={r"/predict": {"origins": "http://localhost:5173"}}  # Apply CORS rules only to the /predict endpoint
)

# Configure rate limiting middleware
# This helps prevent abuse and protects the server from being overwhelmed
limiter = Limiter(
    key_func=get_remote_address,                       # Use client IP address to track rate limits
    default_limits=["100 per hour"]                    # Global limit: 100 requests per hour per IP
)

# Attach limiter to the Flask app instance
limiter.init_app(app)

# Configure logging to log errors and important events
# Logs are written to 'app.log' with timestamps and severity levels
logging.basicConfig(
    level=logging.INFO,
    filename="app.log",                                # Log file location
    filemode="a",                                       # Append to log file
    format="%(asctime)s - %(levelname)s - %(message)s" # Log format
)

# ========================== Load ML Model ==========================

# Load the trained Random Forest model from a .joblib file
# This model is used to make predictions based on input symptoms
RandomForest_loaded = load('RandomForest2.joblib')


# ========================== Load Symptom and Disease Data ==========================

# Load the list of symptoms and their IDs from CSV
symptoms_df = pd.read_csv('symptoms_and_disease_dictionary/symptom.csv')

# Load the list of diseases and their IDs from CSV
diseases_df = pd.read_csv('symptoms_and_disease_dictionary/disease.csv')

# Convert symptom names into a dictionary with format:
# { 'fever': 0, 'cough': 1, ... } based on index
symptoms_dict = pd.Series(symptoms_df.index.values, index=symptoms_df['Symptom']).to_dict()

# Convert disease ID to disease name with format:
# { 0: 'Flu', 1: 'COVID-19', ... }
diseases_list = pd.Series(diseases_df['Disease_Name'].values, index=diseases_df['Disease_ID']).to_dict()



def get_predicted_value(patient_symptoms):
    try:
        # Step 1: Initialize an input vector with zeros
        # This vector corresponds to the entire list of symptoms in the dataset.
        input_vector = np.zeros(len(symptoms_dict))
        print(patient_symptoms)

        # Step 2: Loop through each symptom provided by the user
        for symptom in patient_symptoms:
            try:
                # Normalize symptom text: lowercase and replace spaces with underscores for consistency
                symptom = symptom.lower().replace(" ", "_")
                print("1",symptom)
                # Check if the symptom exists in the symptom dictionary
                if symptom in symptoms_dict:
                    # Set the corresponding index in the input vector to 1 (indicating presence of symptom)
                    print("2",symptom)
                    input_vector[symptoms_dict[symptom]] = 1
                else:
                    # If the symptom is not recognized, return a generic error message
                    return {"status": "error", "error": "An unexpected error occurred. Please try again later."}
            except Exception as e:
                # Catch and handle any unexpected issues during symptom processing
                return {"status": "error", "error": "An unexpected error occurred. Please try again later."}

        errorMessage = "An unexpected error occurred. Please try again later."

        # Step 3: Validate that at least one symptom was recognized and encoded
        if not np.any(input_vector):
            # If no symptoms were valid or matched, raise an error
            raise ValueError(errorMessage)

        # Step 4: Use the trained model to predict the disease based on the input vector
        try:
            prediction_index = RandomForest_loaded.predict([input_vector])[0]
            # prediction_index is a numeric class label representing a disease
        except Exception as e:
            # If prediction fails, raise a runtime error
            raise RuntimeError(errorMessage)

        # Step 5: Map the predicted index back to the disease name using the dictionary
        disease = diseases_list.get(prediction_index, None)
        if disease is None:
            # If mapping fails (missing disease ID), raise a key error
            raise KeyError(errorMessage)

        # Step 6: Return the prediction result
        return {"status": "success", "predicted_disease": disease}

    # ================= Error Handling ===================

    except ValueError as ve:
        # Specific handling for ValueErrors (e.g., empty symptom input)
        print(f"ValueError: {ve}")
        return {"status": "error", "error": str(ve)}

    except KeyError as ke:
        # Handle errors if disease index is not found in the dictionary
        print(f"KeyError: {ke}")
        return {"status": "error", "error": str(ke)}

    except RuntimeError as re:
        # Handle prediction-related errors
        print(f"RuntimeError: {re}")
        return {"status": "error", "error": str(re)}

    except Exception as e:
        # Catch-all for any unexpected or uncategorized exceptions
        print(f"Unexpected error: {e}")
        return {"status": "error", "error": "An unexpected error occurred."}



# Define the Flask route to handle POST requests at '/predict'
@app.route('/predict', methods=['POST'])
# Apply rate limiting: allow max 10 requests per minute per IP address
@limiter.limit("10 per minute")  # Prevent abuse or DoS attacks
def predict():
    try:
        errorMessage = "Bad Request. Please provide valid symptoms."  # Standard error message for invalid input

        # Step 1: Check if the incoming request has JSON content
        if not request.is_json:
            return jsonify({
                "status": "error",
                "error": errorMessage
            }), 400  # Return HTTP 400 for bad request (non-JSON)

        # Step 2: Parse the JSON data from the request body
        data = request.get_json()
        print(data)  # For debugging purposes (can be removed or logged securely)

        # Step 3: Ensure that the request body is not empty
        if not data:
            return jsonify({
                "status": "error",
                "error": errorMessage
            }), 400

        # Step 4: Extract 'symptoms' from the parsed JSON data
        symptoms = data.get('symptoms')

        # Step 5: Validate that 'symptoms' exists and is a list
        if not symptoms or not isinstance(symptoms, list):
            return jsonify({
                "status": "error",
                "error": errorMessage
            }), 400

        # Step 6: Sanitize the symptoms input to prevent XSS or malicious inputs
        sanitized_symptoms = [str(escape(symptom.strip().lower())) for symptom in symptoms]

        # Step 7: Call the prediction function with sanitized symptoms
        predicted_result = get_predicted_value(sanitized_symptoms)

        # Step 8: Handle error response from prediction logic
        if predicted_result.get("status") == "error":
            return jsonify({
                "status": "error",
                "error": predicted_result.get("error", "An unexpected error occurred. Please try again later.")
            }), 500  # Internal server error if prediction fails

        print(predicted_result)  # Debug log (can be replaced with secure logging)

        # Step 9: Return a successful JSON response with predicted disease
        return jsonify({
            "status": "success",
            "predicted_disease": predicted_result.get("predicted_disease"),
            "message": "Prediction successful."
        }), 200  # HTTP 200 OK

    except Exception as e:
        # Step 10: Catch and log unexpected runtime errors
        logging.error(f"Unexpected error: {str(e)}")  # Log the error details for investigation

        # Step 11: Return a generic error response
        return jsonify({
            "status": "error",
            "error": "An unexpected error occurred. Please try again later."
        }), 500  # Internal server error


# Only run the Flask server if this file is executed directly (not imported as a module)
if __name__ == '__main__':
    app.run(
        debug=True,            # Enable Flask debug mode (auto-reloads on changes, detailed error messages)
        host='127.0.0.1',      # Localhost - accessible only on your machine
        port=3000              # Custom port where the app will run (http://127.0.0.1:3000)
    )
