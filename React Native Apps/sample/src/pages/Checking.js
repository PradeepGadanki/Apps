import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Define and train a simple linear regression model
const Checking = () => {

    
    // // Initialize TensorFlow.js
    // async function initializeTF() {
    //   await tf.ready();
    //   // Now you can safely use TensorFlow.js methods
    // }
    
    // // Call the initialization function before using TensorFlow.js
    // initializeTF().then(() => {
    //   // Your TensorFlow.js code goes here
    //   const previousBloodPressureValues = [120, 130, 140];
    //   console.log('in initializing TF')
    //   const features = tf.tensor2d(previousBloodPressureValues, [previousBloodPressureValues.length, 1]);
    //   const labels = tf.tensor2d([130, 140, 150], [previousBloodPressureValues.length, 1]); // Corresponding future values
    //   console.log('b for ball')
    //   trainModel(features, labels);
    //   console.log('g for dog')
    // });
    
    // // Define and train a simple linear regression model
    // async function trainModel(features, labels) {
    //   const model =  tf.sequential();
    //   model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    //   model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
    //   console.log('com')
    //   await model.fit(features, labels, { epochs: 100 });
    //     console.log('in async')
    //   // Make predictions
    //   const futurePrediction = model.predict(tf.tensor2d([[150]], [1, 1])); // Predict for a new input (e.g., previous blood pressure value)
    //   futurePrediction.print();
    // }
    const trainModel = async (features, labels) => {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
        model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
        await model.fit(features, labels, { epochs: 100 });
        return model;
      };
      
      // Example usage
      const previousBloodPressureValues = [120, 130, 140];
      const features = tf.tensor2d(previousBloodPressureValues, [previousBloodPressureValues.length, 1]);
      const labels = tf.tensor2d([130, 140, 150], [previousBloodPressureValues.length, 1]); // Corresponding future values
      const model =  trainModel(features, labels);
      
      // Make predictions
      const futurePrediction = model.predict(tf.tensor2d([[150]], [1, 1])); // Predict for a new input (e.g., previous blood pressure value)
     console.log('pred..  final...', futurePrediction)

      //futurePrediction.print();
}
export default Checking;
