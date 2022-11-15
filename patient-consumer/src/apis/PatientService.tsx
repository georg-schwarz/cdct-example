import React from 'react';

import { GetAllPatientReposonse, PatientApi } from './PatientApi';

function usePatientService(): PatientApi {
  function listAllPatients(): Promise<GetAllPatientReposonse> {
    return Promise.resolve({
      status: 200,
      data: [
        {
          id: '123',
          name: 'tester',
        },
      ],
    });
    // TODO: implement
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
