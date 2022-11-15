import React from 'react';

import { CONFIG } from '../config/config';

import {
  GetAllPatientReposonse,
  PatientApi,
  isPatientDtoList,
} from './PatientApi';

function usePatientService(): PatientApi {
  async function listAllPatients(): Promise<GetAllPatientReposonse> {
    const backendUrl = CONFIG.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/patient`);

    if (response.status === 200) {
      const body: unknown = await response.json();
      if (isPatientDtoList(body)) {
        return {
          status: 200,
          data: body,
        };
      }
      return {
        status: 500,
        data: 'Response body does not match expected format',
      };
    }

    if (response.status === 404 || response.status === 500) {
      return {
        status: response.status,
        data: undefined,
      };
    }
    throw Error('Received unexpected response!');
  }

  return {
    listAllPatients: listAllPatients,
  };
}

const PatientApiContext = React.createContext<PatientApi | undefined>(
  undefined,
);

interface Props {
  children?: React.ReactNode;
}
export const PatientServiceContextProvider: React.FC<Props> = (props) => {
  const patientService = usePatientService();

  return (
    <PatientApiContext.Provider value={patientService}>
      {props.children}
    </PatientApiContext.Provider>
  );
};

export const usePatientApiContext = (): PatientApi => {
  const context = React.useContext(PatientApiContext);
  if (!context) {
    throw Error(
      'Your component does not seem to be part of the PatientApiContext!',
    );
  }

  return context;
};
