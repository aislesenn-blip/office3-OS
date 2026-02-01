import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS, REQUESTS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState(() => {
    const stored = localStorage.getItem('office3_users');
    return stored ? JSON.parse(stored) : USERS;
  });
  const [requests, setRequests] = useState(() => {
    const stored = localStorage.getItem('office3_requests');
    return stored ? JSON.parse(stored) : REQUESTS;
  });

  useEffect(() => {
    localStorage.setItem('office3_users', JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem('office3_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('office3_user_id');
    if (storedUserId) {
      const foundUser = usersList.find(u => u.id === storedUserId);
      if (foundUser) {
        setUser(foundUser);
      } else {
          setUser(usersList[0]);
      }
    } else {
      setUser(usersList[0]);
    }
  }, []);

  const login = (userId) => {
    const foundUser = usersList.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('office3_user_id', userId);
    }
  };

  const addUser = (newUser) => {
      const user = { ...newUser, id: `u${Date.now()}`, avatar: `https://i.pravatar.cc/150?u=${Date.now()}` };
      setUsersList([...usersList, user]);
      login(user.id);
  };

  const addRequest = (req) => {
      const newRequest = { ...req, id: `r${Date.now()}`, status: 'Pending', date: new Date().toISOString() };
      setRequests([newRequest, ...requests]);
  };

  return (
    <AuthContext.Provider value={{ user, usersList, login, addUser, requests, addRequest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
