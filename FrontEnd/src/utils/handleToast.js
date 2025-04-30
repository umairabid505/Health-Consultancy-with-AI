import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showSweetToast = (message, type = "error") => {
  MySwal.fire({
    toast: true,
    position: "top-right", // Position the toast
    html: `<div class="content"> 
    <div class="custom-error-icon">✖</div>
    <span class="heading">Error</span>
    </div>
     <div class="message">${message}</div>`, // Toast message
    showConfirmButton: false,
    timer: 5000, // Auto-dismiss after 3 seconds
    timerProgressBar: true, // Show the timer progress bar
    showClass: {
      popup: `animate__animated animate__fadeInRight animate__faster custom-toast-popup`, // Show animation
    },
    hideClass: {
      popup: `animate__animated animate__fadeOutRight animate__faster`, // Hide animation
    },
  });
};

