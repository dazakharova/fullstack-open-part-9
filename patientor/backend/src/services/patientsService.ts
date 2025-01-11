import { v1 as uuidv1 } from 'uuid';
import patientsData from '../../data/patients';
import {NewPatientEntry, NonSensitivePatientEntry, Patient, NewEntry, Entry} from '../../src/types';

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

const getEntryById = (id: string): Patient => {
    const foundEntry = patients.find((patient) => patient.id === id);
    if (!foundEntry) {
        throw new Error(`Patient with id ${id} not found`);
    }
    return foundEntry;
};

const addPatientEntry = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuidv1(),
        ...entry,
        entries: []
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntryForPatient = (id: string, entry: NewEntry): Entry => {
    console.log(id, entry);
    const modifiedPatient = patients.find((patient) => patient.id === id);
    if (!modifiedPatient) {
        throw new Error(`Patient with id ${id} not found`);
    }

    const newEntry = {
        id: uuidv1(),
        ...entry,
    };

    modifiedPatient.entries.concat(newEntry);

    return newEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatientEntry,
    getEntryById,
    addEntryForPatient
};
