import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing comment');
    }

    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }

    return dateOfBirth;
};

const isSSN = (ssn: string): boolean => {
    const regex = /^[a-zA-Z0-9]{6}-[a-zA-Z0-9]{3,4}$/;
    return regex.test(ssn);
};

const parseSSN = (ssn: unknown): string => {
    if (!isString(ssn) || !isSSN(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

const isGender = (gender: unknown): gender is Gender => {
    return Object.values(Gender).includes(gender as Gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }

    return occupation;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;