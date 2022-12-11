import '../../assets/styles/components/confirm-dialogue.scss';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const confirmDialog = (confirmObj) => {
  const { title, text, confirmButtonText, cancelButtonText } = confirmObj;

  return MySwal.fire({
    title,
    html: text,
    // icon: 'question',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      confirmButton: 'btn btn-primary me-2',
      cancelButton: 'btn btn-danger me-2',
    },
    buttonsStyling: false,
  });
};
