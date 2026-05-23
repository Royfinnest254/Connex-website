import React, { createContext, useState, useContext, useEffect } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(966);
  const [initialStatus, setInitialStatus] = useState('idle');

  useEffect(() => {
    // 1. Fetch persistent count from server
    const fetchCount = async () => {
      try {
        const response = await fetch('/get_count.php');
        const data = await response.json();
        if (data.count) {
          setWaitlistCount(data.count);
        }
      } catch (err) {
        console.error("Failed to fetch waitlist count:", err);
        // Fallback to local calculation if server fails
        const localSignups = parseInt(localStorage.getItem('connex_waitlist_new') || '0', 10);
        setWaitlistCount(966 + localSignups);
      }
    };

    fetchCount();

    if (window.location.search.includes('waitlist_success=true')) {
      setIsWaitlistModalOpen(true);
      setInitialStatus('success');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const incrementWaitlist = () => {
    // Locally increment for immediate feedback
    setWaitlistCount(prev => prev + 1);
    // Also track locally just in case
    const currentNew = parseInt(localStorage.getItem('connex_waitlist_new') || '0', 10);
    localStorage.setItem('connex_waitlist_new', (currentNew + 1).toString());
  };

  const openWaitlistModal = () => setIsWaitlistModalOpen(true);
  const closeWaitlistModal = () => setIsWaitlistModalOpen(false);

  return (
    <ModalContext.Provider value={{ isWaitlistModalOpen, openWaitlistModal, closeWaitlistModal, waitlistCount, incrementWaitlist, initialStatus }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
