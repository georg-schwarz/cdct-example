import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { PatientListPage } from './pages/PatientListPage';

export const AppRouter: React.FC = () => {
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <PatientListPage />,
      },
      
      // Fallback route in case an unknown route has been navigated to.
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ];
    const routeElement = useRoutes(routes);
  
    return <React.Fragment>{routeElement}</React.Fragment>;
  };