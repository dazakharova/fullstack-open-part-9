import { NewPatientEntry, Gender, HealthCheckRating } from './types';
import { z } from 'zod';

const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string(),
    }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.string().date(),
        endDate: z.string().date(),
    }).optional(),
});

export const EntrySchema = z.union([HealthCheckEntrySchema, HospitalEntrySchema, OccupationalHealthcareEntrySchema]);

const FullEntrySchema = z.union([
    HealthCheckEntrySchema.extend({ id: z.string() }),
    HospitalEntrySchema.extend({ id: z.string() }),
    OccupationalHealthcareEntrySchema.extend({ id: z.string() }),
]);

export const newPatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(FullEntrySchema).default([]),
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return newPatientEntrySchema.parse(object);
};

export default toNewPatientEntry;