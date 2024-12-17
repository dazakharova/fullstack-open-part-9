import patientsData from '../../data/patients';
import { NonSensitivePatientEntry, Patient } from '../../src/types';

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

export default {
    getEntries,
    getNonSensitiveEntries,
};
