import React from 'react';

import { PatientDto } from '../apis/PatientApi';
import { usePatientApiContext } from '../apis/PatientService';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const PatientListPage: React.FC<Props> = (props) => {
  const controller = useController(props);

  return (
    <React.Fragment>
      {controller.state.isLoading && <p>Loading...</p>}

      {controller.state.isError && (
        <div>
          <p>Error while loading the patients</p>
          <button
            type="submit"
            onClick={(): void => void controller.loadPatients()}
          >
            Try again
          </button>
        </div>
      )}

      {!controller.state.isLoading &&
        !controller.state.isError &&
        JSON.stringify(controller.state.patients)}
    </React.Fragment>
  );
};

interface State {
  isLoading: boolean;
  isError: boolean;
  patients: PatientDto[];
}

interface Controller {
  state: State;

  loadPatients: () => Promise<void>;
}

function useController(props: Props): Controller {
  const patientService = usePatientApiContext();

  const [state, setState] = React.useState<State>({
    isLoading: true,
    isError: false,
    patients: [],
  });

  async function loadPatients(): Promise<void> {
    setState((state) => ({ ...state, isLoading: true, isError: false }));
    const serviceDocsResponse = await patientService.listAllPatients();
    setState((state) => ({ ...state, isLoading: false }));

    console.log(serviceDocsResponse);
    if (serviceDocsResponse.status === 200) {
      setState((state) => ({
        ...state,
        isError: false,
        patients: serviceDocsResponse.data,
      }));
      return;
    }

    console.error(
      `Fetching all patients failed with status ${serviceDocsResponse.status}`,
    );
    setState((state) => ({ ...state, isError: true }));
  }

  React.useEffect(() => {
    void loadPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state: state,
    loadPatients: loadPatients,
  };
}
