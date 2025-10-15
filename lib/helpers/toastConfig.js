import { toast } from 'react-toastify';

// Toast configuration options
export const toastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Toast helper functions
export const showSuccessToast = (message) => {
  toast.success(message, toastOptions);
};

export const showErrorToast = (message) => {
  toast.error(message, toastOptions);
};

export const showInfoToast = (message) => {
  toast.info(message, toastOptions);
};

export const showWarningToast = (message) => {
  toast.warning(message, toastOptions);
};

export const showLoadingToast = (message) => {
  return toast.loading(message);
};

export const updateToast = (toastId, { render, type, isLoading }) => {
  toast.update(toastId, {
    render,
    type,
    isLoading,
    autoClose: 3000,
  });
};



