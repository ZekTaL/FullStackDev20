  interface Result {
      periodLength: number;
      trainingDays: number;
      target: number;
      average: number;
      success: boolean;
      rating: 1 | 2 | 3;
      ratingDescription: string;
  }

  const parseExerciseArguments = (args: Array<string>): Array<number> => {
    if (args.length < 4) throw new Error('Not enough arguments');

    let data: Array<number> = new Array<number>();

    args.forEach((arg, idx) => {
        if (idx == 0 || idx == 1)
            return;

        if (isNaN(Number(arg))) {
            throw new Error('Provided values were not numbers!');
        }

        data = data.concat(Number(arg));
    });

    return data;
}

const calculateExercises = (data: Array<number>): Result => {
    const target = data[0]
    const dailyValues = data.splice(1, data.length);
    const trainingDays = dailyValues.filter(n => n!= 0);
    const totalHours = trainingDays.reduce((a, b) => a + b);
    const average = totalHours/dailyValues.length;
    const rating = () => {
        const gap = average - target;
        if (gap > 0.5) return 1;
        if (gap <= 0.5 && gap >= -0.5) return 2
        if (gap < -0.5) return 3;
        // it should never come here
        return 2;
    }
    const ratingDescription = () => {
        switch(rating()) {
            case 1: return "good job!";
            case 2: return "you can do better!";
            case 3: return "not good enough!";
            // should never be default
            default: return "";
        }
    }

    return {
        periodLength: dailyValues.length,
        trainingDays: trainingDays.length,
        target: target,
        average: average,
        success: average > target,
        rating: rating(),
        ratingDescription: ratingDescription()
    }
}

try {
    const data = parseExerciseArguments(process.argv);
    const result = calculateExercises(data);
    console.log(result);
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}