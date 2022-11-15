import { Response } from './Response';

export interface PatientDto {
  id: number;
  name: string;
}
export function isPatientDto(dto: unknown): dto is PatientDto {
  if (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (dto as PatientDto).id === undefined ||
    typeof (dto as PatientDto).id !== 'number'
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
export function isPatientDtoList(dtoList: unknown): dtoList is PatientDto[] {
  if (!Array.isArray(dtoList)) {
    return false;
  }
  for (const dto of dtoList) {
    if (!isPatientDto(dto)) {
      return false;
    }
  }
  return true;
}

export interface PatientApi {
  listAllPatients(): Promise<GetAllPatientReposonse>;
}

export type GetAllPatientReposonse =
  | Response<200, PatientDto[]> // Success case
  | Response<500, unknown> // Backend bug
  | Response<404, unknown>; // Backend (route) not reachable
