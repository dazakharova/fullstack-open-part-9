const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/((height / 100) * (height / 100));
    if (bmi <= 25) {
        return 'Normal range';
    } else if (bmi > 25 && bmi < 29) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}

console.log(calculateBmi(180, 74))