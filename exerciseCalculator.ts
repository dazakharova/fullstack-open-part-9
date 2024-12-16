interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (exerciseHours: number[], target: number): Result => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(h => h > 0).length;
    const totalHours = exerciseHours.reduce((acc, val) => acc + val, 0);
    const average = totalHours / periodLength;

    const success = average >= target;

    let rating: number;
    let ratingDescription: string;
    const percentage = average / target;

    if (percentage >= 1) {
        rating = 3;
        ratingDescription = "excellent";
    } else if (percentage >= 0.5) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "needs significant improvement";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const parseArguments = (args: string[]): { hours: number[]; target: number } => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 15) throw new Error('Too many arguments');
    const target = Number(args[2]);
    if (isNaN(target)) {
        throw new Error('Provided value was not a number!');
    }

    const hours: number[] = [];

    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers!');
        }
        hours.push(Number(args[i]));
    }

    return { hours, target };
};


try {
    const { hours, target } = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
