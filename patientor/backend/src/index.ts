import express from 'express';
const app = express();
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import paientsRouter from './routes/patients';
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', paientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});