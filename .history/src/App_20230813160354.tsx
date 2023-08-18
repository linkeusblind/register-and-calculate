import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import Header from './components/Header';
import { initializeApp } from 'firebase/app';
import { config } from './config/config';
import AuthRoute from './components/AuthRoute';

initializeApp(config.firebaseConfig);

export interface IApplicationProps { }

const Application: React.FC<IApplicationProps> = (props) => {
  return (
    <Header>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <HomePage />
              </AuthRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Header>
  );
};

export default Application;