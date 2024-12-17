import express from 'express';
import patientsService from '../services/patientsService';
import { Response } from 'express';
import { NonSensitivePatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientsService.getNonSensitiveEntries());
});

export default router;