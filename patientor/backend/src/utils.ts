import { NewPatientEntry, Gender } from './types';
import { z } from 'zod';

export const newPatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(z.unknown()).default([]),
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return newPatientEntrySchema.parse(object);
};

export default toNewPatientEntry;