import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import { PatientServiceContextProvider } from './apis/PatientService'
import { AppRouter } from './router';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PatientServiceContextProvider>
        <AppRouter />
      </PatientServiceContextProvider>
    </BrowserRouter>
  );
}

export default App;
