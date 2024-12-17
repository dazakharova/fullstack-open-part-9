import express from 'express';
import diagnosesService from '../services/diagnosesService';
import { Response } from 'express';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.send(diagnosesService.getEntries());
});

export default router;

