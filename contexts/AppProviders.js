'use client';

import { AuthProvider } from './AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AppProviders({ children }) {
  useEffect(() => {
    // Register ScrollTrigger globally
    gsap.registerPlugin(ScrollTrigger);
    
    // Enable normalizeScroll globally to prevent browser tab hiding on small screens
    ScrollTrigger.normalizeScroll(true);
    
    return () => {
      // Cleanup on unmount
      ScrollTrigger.normalizeScroll(false);
    };
  }, []);

  return (
    <AuthProvider>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  );
}



