import express from 'express';
import {calculateBMI} from './bmiCalculator'

const app = express();

// /hello Endpoint
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// /bmi Endpoint
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});