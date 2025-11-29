'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from cookies or localStorage)
    const checkAuth = () => {
      const userCookie = Cookies.get('ashapurna_user');
      if (userCookie) {
        try {
          setUser(JSON.parse(userCookie));
        } catch (error) {
          // Silent error handling for invalid user cookie
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    Cookies.set('ashapurna_user', JSON.stringify(userData), { expires: 7 }); // 7 days expiry
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('ashapurna_user');
  };

  const updateUser = (userData) => {
    setUser(userData);
    Cookies.set('ashapurna_user', JSON.stringify(userData), { expires: 7 });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;



