import { v1 as uuidv1 } from 'uuid';
import patientsData from '../../data/patients';
import {NewPatientEntry, NonSensitivePatientEntry, Patient} from '../../src/types';

const patients: Patient[] = patientsData as Patient[];

const getEntries= (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatientEntry = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuidv1(),
        ...entry,
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatientEntry,
};