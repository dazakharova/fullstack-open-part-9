import { z } from 'zod';
import { newPatientEntrySchema } from './utils';

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = z.infer<typeof newPatientEntrySchema>;
