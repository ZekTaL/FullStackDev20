interface BMIValues {
    height: number;
    weight: number;
}
  
const parseArguments = (args: Array<string>): BMIValues => {
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

const calculateBMI = (height: number, weight: number, resultMessage: string) => {
    const bmi = weight / Math.pow((height/100), 2);
    if (bmi < 18.5) 
        console.log(resultMessage, `${bmi} - Underweight`);
    else if (bmi >= 18.5 && bmi < 25)
        console.log(resultMessage, `${bmi} - Normal`);
    else if (bmi >= 25 && bmi < 30)
        console.log(resultMessage, `${bmi} - Overweight`);
    else if (bmi >= 30)
        console.log(resultMessage, `${bmi} - Obese`);
}

try {
    const { height, weight } = parseArguments(process.argv);
    calculateBMI(height, weight, `Height: ${height}cm, Weight: ${weight}kg ==> BMI:`);
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}