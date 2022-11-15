import { Response } from './Response'

export interface PatientDto {
    id: string,
    name: string,
}
export function isPatientDto(dto: unknown): dto is PatientDto {
    if ((dto as PatientDto).id === undefined || typeof (dto as PatientDto).id !== 'string') {
        return false;
    }
    if ((dto as PatientDto).name === undefined || typeof (dto as PatientDto).name !== 'string') {
        return false;
    }
    return true;
}

export interface PatientApi {

    listAllPatients(): Promise<GetAllPatientReposonse>;
}

export type GetAllPatientReposonse = Response<200, PatientDto[]>;
