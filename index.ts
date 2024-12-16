import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res)  => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        res.status(400).json({
            error: "malformatted parameters"
        });
    }

    const bmi = calculateBmi(height, weight);
    res.status(200).json({
        height,
        weight,
        bmi
    });
});

app.post('/exercises', (req, res): any => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        return res.status(400).send({ error: 'parameters missing '});
    } else if (isNaN(Number(target))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    const exercises: number[] = [];
    for (const exercise of daily_exercises) {
        if (isNaN(Number(exercise))) {
            return res.status(400).send({ error: 'malformatted parameters' });
        }
        exercises.push(Number(exercise));
    }

    const result = calculateExercises(exercises, Number(target));
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});