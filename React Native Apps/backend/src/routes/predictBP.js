import express from 'express';
const router = express.Router();
import * as tf from '@tensorflow/tfjs';
import csv from 'csv-parser';
import fs from 'fs';

router.get("/predict/:name", async (req, res) => {
const data = await readDataFromCSV('C:\\Users\\suchi\\Downloads\\React Native Apps (1)\\React Native Apps\\backend\\src\\csv\\bdp.csv');
const pastSystolicValues = data
console.log('data in the form', data)

const x = pastSystolicValues.map((value, index) => [index]); 
const y = pastSystolicValues;
console.log('x in first', x)
console.log('y in firt', y)
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

const xTensor = tf.tensor2d(x);
const yTensor = tf.tensor2d(y, [y.length, 1]);

await model.fit(xTensor, yTensor, { epochs: 800 });

  const futurePredictions = [];
  for (let i = 0; i < 10; i++) {
    const futureIndex = pastSystolicValues.length + i; // Index for future time point
    const predictedSystolicTensor = model.predict(tf.tensor2d([[futureIndex]]));
    const predictedSystolic = predictedSystolicTensor.dataSync()[0];
    futurePredictions.push(predictedSystolic);
  }
  return res.json({"details": futurePredictions, "ok": true})

})

const readDataFromCSV = async (filePath) => {
    const data = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          const parsedRow = {
            "Pulse": parseInt(row['Pulse']),
            'Systolic Pressure': parseInt(row['Systolic Pressure']),
            'Diastolic Pressure': parseInt(row['Diastolic Pressure'])
          };
          data.push(parseInt(row['Systolic Pressure']));
        })
        .on('end', () => {
          resolve(data);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  };
  const predictBloodPressure = async (data) => {
    const x = data.map((row, index) => [index]);
    const y = data.map((row) => row['Systolic Pressure']);

  console.log("x values in fun", x)
  console.log("y values in fun", y)
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

    const xTensor = tf.tensor2d(x);
    const yTensor = tf.tensor2d(y, [y.length, 1]);

    // model.fit(xTensor, yTensor, { epochs: 100 }).then(() => {
    //   const futurePredictions = [];
    //   for (let i = 0; i < 10; i++) {
    //     const futureIndex = x.length + i; // Index for future time point
    //     const predictedSystolicTensor = model.predict(tf.tensor2d([[futureIndex]]));
    //     console.log('predictedSystolicTensor first', predictedSystolicTensor)

    //     const predictedSystolic = predictedSystolicTensor.dataSync()[0];
    //     console.log('predictedSystolic first', predictedSystolic)
    //     futurePredictions.push(predictedSystolic);
    //   }

    //   console.log('Predicted future systolic blood pressure:', futurePredictions);
    // return futurePredictions;

    // });

    // const futurePredictions = [];
    // for (let i = 0; i < 10; i++) {
    //   const futureIndex = y.length + i;
    //   const predictedSystolicTensor = model.predict(tf.tensor2d([[futureIndex]]));
    //   console.log("predictedSystolicTensor", predictedSystolicTensor)
    //   const predictedSystolic = predictedSystolicTensor.dataSync()[0];
    //   console.log("predictedSystolic", predictedSystolic)
    //   futurePredictions.push(predictedSystolic);
    // }
    await model.fit(xTensor, yTensor, { epochs: 100 });

// Predict future systolic blood pressure values
const futurePredictions = [];
for (let i = 0; i < 10; i++) {
  const futureIndex = x.length + i;
  const predictedSystolicTensor = model.predict(tf.tensor2d([[futureIndex]]));
  console.log("predictedSystolicTensor", predictedSystolicTensor);
  const predictedSystolic = predictedSystolicTensor.dataSync()[0];
  console.log("predictedSystolic", predictedSystolic);
  futurePredictions.push(predictedSystolic);
}
  };


export default router;


