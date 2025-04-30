# import google.generativeai as genai
# import flask
# from google.generativeai.types import ContentType


# genai.configure(api_key="AIzaSyDT_HTZBrmTW68fncTsirhE6tmnYTFRpr4")

# # print models list which is supported......
# for m in genai.list_models():
# 	if 'generateContent' in m.supported_generation_methods:
# 		print(m.name)
		


# exceptin handling To attack protection app code
# ======================================================================

# from flask import Flask, jsonify, request, session
# from flask_wtf.csrf import CSRFProtect
# from flask_limiter import Limiter
# from flask_limiter.util import get_remote_address
# from markupsafe import escape
# import signal
# import logging
# import os

# app = Flask(__name__)
# app.secret_key = os.urandom(24)  # Secret key for session management and CSRF

# # Enable CSRF Protection
# csrf = CSRFProtect(app)

# # Enable Rate Limiting
# limiter = Limiter(
#     app,
#     key_func=get_remote_address,  # Tracks requests by IP address
#     default_limits=["100 per hour"]  # Limit API to 100 requests per hour per IP
# )

# # Set timeout for requests
# def timeout_handler(signum, frame):
#     raise TimeoutError("Request took too long")

# @app.before_request
# def set_request_timeout():
#     signal.signal(signal.SIGALRM, timeout_handler)
#     signal.alarm(10)  # Set a timeout of 10 seconds for requests

# @app.after_request
# def clear_timeout(response):
#     signal.alarm(0)  # Reset the timeout after the request
#     return response

# Setup logging for errors
# logging.basicConfig(level=logging.INFO, filename="app.log", filemode="a",
#                     format="%(asctime)s - %(levelname)s - %(message)s")


# @app.errorhandler(Exception)
# def handle_unexpected_error(e):
    """Catch all unexpected errors and log them."""
    logging.error(f"Unexpected error: {str(e)}")
    return jsonify({
        "status": "error",
        "error": "An unexpected error occurred. Please try again later."
    }), 500


# @app.errorhandler(TimeoutError)
# def handle_timeout_error(e):
#     """Handle request timeouts."""
#     return jsonify({
#         "status": "error",
#         "error": "Request timed out. Please try again later."
#     }), 504


# @app.route('/predict', methods=['POST'])
# @csrf.exempt  # If CSRF validation is not required for APIs, exempt this route
# @limiter.limit("10 per minute")  # Limit prediction calls to 10 per minute per IP
# def predict():
#     """
#     Predicts the disease based on symptoms provided in the request.

#     Request Payload (JSON):
#     {
#         "symptoms": ["symptom1", "symptom2", ...]
#     }

#     Response (JSON):
#     - Success:
#       {
#           "status": "success",
#           "predicted_disease": "Disease Name",
#           "message": "Prediction successful."
#       }
#     - Error:
#       {
#           "status": "error",
#           "error": "Error details."
#       }
#     """
#     try:
#         errorMessage = "Bad Request. Please provide valid symptoms."
#         # Validate the request content type
#         if not request.is_json:
#             return jsonify({
#                 "status": "error",
#                 "error": errorMessage
#             }), 400

#         # Parse JSON data
#         data = request.get_json()
#         if not data:
#             return jsonify({
#                 "status": "error",
#                 "error": errorMessage
#             }), 400

#         # Validate 'symptoms' in the request
#         symptoms = data.get('symptoms')
#         if not symptoms or not isinstance(symptoms, list):
#             return jsonify({
#                 "status": "error",
#                 "error": errorMessage
#             }), 400

#         # Sanitize user input to prevent XSS
#         sanitized_symptoms = [escape(symptom.strip().lower()) for symptom in symptoms]

#         # Call the prediction function
#         predicted_result = get_predicted_value(sanitized_symptoms)

#         # Check the result from the prediction function
#         if predicted_result.get("status") == "error":
#             return jsonify({
#                 "status": "error",
#                 "error": predicted_result.get("error", "An unexpected error occurred. Please try again later.")
#             }), 500

#         # Success response
#         return jsonify({
#             "status": "success",
#             "predicted_disease": predicted_result.get("predicted_disease"),
#             "message": "Prediction successful."
#         }), 200

#     except TimeoutError:
#         # Handle request timeout
#         return jsonify({
#             "status": "error",
#             "error": "Request timed out. Please try again later."
#         }), 504
#     except Exception as e:
#         # Catch unexpected errors
#         logging.error(f"Unexpected error: {str(e)}")
#         return jsonify({
#             "status": "error",
#             "error": "An unexpected error occurred. Please try again later."
#         }), 500




def get_predicted_value(symptoms):
    """
    Mockup function for prediction logic.
    Replace this with your actual implementation.
    """
    try:
        # Example: Simple mock prediction logic
        if "fever" in symptoms:
            return {"status": "success", "predicted_disease": "Flu"}
        elif "cough" in symptoms:
            return {"status": "success", "predicted_disease": "Cold"}
        else:
            return {"status": "success", "predicted_disease": "Unknown disease"}
    except Exception as e:
        logging.error(f"Prediction error: {e}")
        return {"status": "error", "error": str(e)}

if __name__ == "__main__":
    app.run(debug=True)
