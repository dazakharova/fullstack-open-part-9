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


const result = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log("Result is", result);