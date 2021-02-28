import express from 'express';
import { calculateBMI } from './bmiCalculator'
import { calculateExercises, Result } from './exerciseCalculator'

const app = express();

app.use(express.json())

// /hello Endpoint
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// /bmi GET Endpoint
app.get('/bmi', (_req, res) => {
  let height, weight;

  if (!isNaN(Number(_req.query.height)) && !isNaN(Number(_req.query.weight))) {
      height = Number(_req.query.height);
      weight = Number(_req.query.weight);

      const result = calculateBMI(height, weight, `Height: ${height}cm, Weight: ${weight}kg => BMI:`);
      res.send(result);
  } else {
      res.send('malformatted parameters');
  }
});

// /exercises POST endpoint
app.post('/exercises', (req, res) => {

  const body = req.body;
  const bodyParams = [body.target, ...body.daily_exercises];
  if (bodyParams.length < 2)
  {
    res.json({error: 'parameter missing'});
  }
  // check params
  bodyParams.forEach((el) => {
    if (isNaN(Number(el))) {
      res.json({error: 'Provided values were not numbers!'});
    }
  });

  const result: Result = calculateExercises(bodyParams);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});