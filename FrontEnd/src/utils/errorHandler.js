import { showSweetToast } from "./handleToast";

export const handleError = (error) => {
  let errorMessage = error || "An unexpected error occurred. Please try again." ;

  // Handle request timeout (error.code === "ECONNABORTED")
  if (error.code === "ECONNABORTED") {
    // Timeout-specific message
    errorMessage = "The request took too long. Please try again later.";
  } else if (error.code === "ERR_BAD_REQUEST") {
    errorMessage = "Bad Request: some thing went wrong.";
  }
  // Handle API response errors (status codes like 400, 500, 504)
  else if (error.response) {
    const status = error.response.status;

    // Custom messages for specific status codes
    switch (status) {
      case 400:
        errorMessage = "Bad Request: some thing went wrong.";
        break;
      case 404:
        errorMessage = "Not Found: The requested resource could not be found.";
        break;
      case 500:
        errorMessage =
          "Server Error: There is an issue on our end. Please try again later.";
        break;
      case 504:
        errorMessage =
          "Gateway Timeout: The request took too long to process. Please try again.";
        break;
      default:
        // Generic error message for other status codes
        errorMessage = errorMessage;
    }
  }

  // Handle network errors (request made but no response received)
  else if (error.request) {
    errorMessage =
      "Unable to reach the server. Please check your connection and try again.";
  }

  // Handle manually thrown errors (e.g., `throw new Error(...)`)
  else if (error instanceof Error) {
    errorMessage = error; // Return the error message from the thrown error
  }

  // Catch-all for unexpected errors
  showSweetToast(errorMessage);
};
