import express from 'express';
import { z } from 'zod';
import patientsService from '../services/patientsService';
import { Request, Response, NextFunction } from 'express';
import {Diagnosis, NewPatientEntry, NonSensitivePatientEntry, Patient, NewEntry, Entry} from '../types';
import { newPatientEntrySchema, EntrySchema } from '../utils';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const entry = EntrySchema.parse(req.body);

        if (entry.diagnosisCodes) {
            entry.diagnosisCodes = parseDiagnosisCodes(entry);
        }

        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient | unknown>) => {
    try {
        const addedEntry = patientsService.addPatientEntry(req.body);
        res.json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
});

router.get('/:id', (req: Request, res: Response<Patient | unknown>) => {
    try {
        const foundEntry = patientsService.getEntryById(req.params.id);
        res.json(foundEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
});

router.post('/:id/entries', newEntryParser, (req: Request<{id: string}, unknown, NewEntry>, res: Response<Entry | unknown>) => {
    try {
        const addedEntry = patientsService.addEntryForPatient(req.params.id, req.body);
        res.json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
});

router.use(errorMiddleware);

export default router;