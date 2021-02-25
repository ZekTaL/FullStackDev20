interface BMIValues {
    height: number;
    weight: number;
}
  
export const parseArguments = (args: Array<string>): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

export const calculateBMI = (height: number, weight: number, resultMessage: string): string|undefined => {
    const bmi = weight / Math.pow((height/100), 2);
    if (bmi < 18.5) 
        return resultMessage + `${bmi} - Underweight`;
    else if (bmi >= 18.5 && bmi < 25)
        return resultMessage + `${bmi} - Normal`;
    else if (bmi >= 25 && bmi < 30)
        return resultMessage + `${bmi} - Overweight`;
    else if (bmi >= 30)
        return resultMessage + `${bmi} - Obese`;

    return '';
}

try {
    const { height, weight } = parseArguments(process.argv);
    calculateBMI(height, weight, `Height: ${height}cm, Weight: ${weight}kg => BMI:`);
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}