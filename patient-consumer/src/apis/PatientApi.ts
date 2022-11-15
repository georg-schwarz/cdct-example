import { Response } from './Response';

export interface PatientDto {
  id: string;
  name: string;
}
export function isPatientDto(dto: unknown): dto is PatientDto {
  if (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (dto as PatientDto).id === undefined ||
    typeof (dto as PatientDto).id !== 'string'
  ) {
    return false;
  }
  if (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (dto as PatientDto).name === undefined ||
    typeof (dto as PatientDto).name !== 'string'
  ) {
    return false;
  }
  return true;
}

export interface PatientApi {
  listAllPatients(): Promise<GetAllPatientReposonse>;
}

export type GetAllPatientReposonse =
  | Response<200, PatientDto[]>
  | Response<500, unknown>;
