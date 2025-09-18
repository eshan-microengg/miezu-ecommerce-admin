// src/components/ToastNotification.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss'

const ToastNotification = () => {
  return <ToastContainer position="top-center" autoClose={4000} hideProgressBar />;
};

export const showToast = (message, type = 'info') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    default:
      toast.info(message);
  }
};

export default ToastNotification;