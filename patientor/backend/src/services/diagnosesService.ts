import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../../src/types';

const diagnoses: Diagnosis[] = diagnosesData as Diagnosis[];

const getEntries= (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getEntries,
};
