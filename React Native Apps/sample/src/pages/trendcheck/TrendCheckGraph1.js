import React from 'react';
import { ECharts } from 'react-native-echarts-wrapper';
import { View, Dimensions, ScrollView, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Td = () => {
    const [dates, setDates] = React.useState([''])
    const [systolic, setSystolic] = React.useState([''])
    const [details, setDetails] = React.useState([])
    const [pulseDetails, setPulseDetails] = React.useState([])
    React.useEffect(() => {
        fetchingApiData1()
    }, [])
    console.log('dates in TTDDD', dates, 'details', details, 'pulse', pulseDetails)
    console.log('details', details)
    let currentDate = new Date()
    currentDate = currentDate.getDate() + '/' + currentDate.getMonth()
    const fetchingApiData1 = async () => {
        console.log("clikedddd..")
        const uu = await AsyncStorage.getItem('name');
        try {
            await fetch(`http://10.0.2.2:7000/api/users/allBpData/${uu}`).then(response =>
                response.json()).then(data1 => {
                    console.log("final in allbpk", data1)
                    let arr = [];
                    let fetchedDates = []
                    let finalArray = [];
                    let cd;
                    let tempPulse = []
                    let finalPulseDetails = []
                    for (let i = 0; i < data1?.["allData"]?.length; i++) {
                        if (i < 20) {
                            if (i == 0) {
                                cd = new Date(data1?.["allData"][i]['date'])
                            }
                            console.log('data1?.["allData"][i]', data1?.["allData"][i]['systolic'])
                            arr.push(parseInt(data1?.["allData"][i]['systolic']))
                            tempPulse.push(parseInt(data1?.["allData"][i]['pulse']))
                            const givenDate = new Date(data1?.["allData"][i]['date'])
                            const day = givenDate.getDate()
                            const month = givenDate.getMonth() + 2
                            fetchedDates.push(day + '/' + month)
                            finalArray.push([day + '/' + month, data1?.["allData"][i]['systolic']])
                            finalPulseDetails.push([day + '/' + month, data1?.["allData"][i]['pulse']])
                        }
                    }
                    function getLastTwentyDaysFromDate(date) {
                        console.log('bbbbbb', date)
                        const twentyDays = [];
                        const currentDate = new Date(date); 
                        for (let i = 0; i < 11; i++) {
                            const newDate = new Date(currentDate);
                            newDate.setDate(currentDate.getDate() - i); 
                            twentyDays.push(newDate); 
                        }
                        return twentyDays;
                    }

                    setPulseDetails(finalPulseDetails)
                    setDetails(finalArray)
                    setDates(fetchedDates)
                    setSystolic(arr)
                })
        } catch (err) {
            if (!response.ok) {
                return
            }
            console.log("error", err)
        }

    }
    // try {
    //     // Sample blood pressure data
    //     const bloodPressureData = [
    //       [1, 120], // [timestamp, systolic]
    //       [2, 122],
    //       // Add more data points
    //     ];
      
    //     // Extract features and target variable
    //     const timestamps = bloodPressureData.map(([timestamp, _]) => timestamp);
    //     const systolicValues = bloodPressureData.map(([_, systolic]) => systolic);
      
    //     // Train linear regression model
    //     const regressionModel = new LinearRegression(timestamps, systolicValues);
      
    //     // Make predictions for future timestamps
    //     const futureTimestamps = [3, 4, 5]; // Example future timestamps
    //     const predictedSystolicValues = futureTimestamps.map(timestamp =>
    //       regressionModel.predict(timestamp)
    //     );
      
    //     // Display predicted blood pressure values
    //     console.log('Predicted systolic values:', predictedSystolicValues);
    //   } catch (error) {
    //     // Handle the error
    //     console.error('An error occurred:', error);
    //   }
    // Sample data for demonstration
    //   const data = [
    //     ['Mon', 820],
    //     ['Tue', 932],
    //     ['Wed', 901],
    //     ['Thu', 934],
    //     ['Fri', 1290],
    //     ['Sat', 1330],
    //     ['Sun', 1320],
    //   ];

    // const pastBloodPressureValues = [120, 125, 130, 135, 140, 145, 150];

    // // Convert past blood pressure values to tensor
    // const pastBloodPressureTensor = tf.tensor(pastBloodPressureValues);

    // // Define a linear regression model
    // const model = tf.sequential();
    // model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // // Compile the model
    // model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

    // // Train the model
    // model.fit(pastBloodPressureTensor, pastBloodPressureTensor, { epochs: 10 })
    //     .then(() => {
    //         // Use the trained model to predict future blood pressure values
    //         const futurePredictions = model.predict(tf.tensor([0, 1, 2, 3, 4])).dataSync();
    //         console.log('Predicted future blood pressure values:', futurePredictions);
    //     });


    const option = {
        xAxis: {
            type: 'category',
            data: details.map(item => item[0]),
            name: 'Past\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\Present\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\Futere',
            nameLocation: 'middle',
            nameTextStyle: {
                fontSize: 12,
                fontWeight: 'bold',
            },
            axisLabel: {
              interval: 3, 
              rotate: 0, 
              margin: 1,
              paddingLeft: 30
            },
            boundaryGap: true, 
        },
        yAxis:
            [
            //   {
            //     type: 'value',
            //     showLabel: false,
            //     // axisLabel: {
            //     //     show: true,
            //     //     rotate: -270, // Rotate the label vertically
            //     //     formatter: 'Blood Pressure', // Optional formatting
            //     //     textStyle: { // Apply style to the label
            //     //         color: 'black', // Change text color
            //     //         fontSize: 12, // Adjust font size
            //     //         fontFamily: 'Arial, sans-serif', // Specify font family
            //     //         fontWeight: 'bold', // Apply bold font weight
            //     //         marginRight: 20,
            //     //         marginLeft: 30
            //     //     },
            //     //     marginRight: 30, 
            //     //},
            // },
            {
                type: 'value',
                //name: 'Bar',
            }],
        backgroundColor: '#ca0177',
        grid: {
            left: '10%',
            bottom: 60, 
        },
        series: [
            // {
            //     data: details.map(item => item[1]),
            //     type: 'line',
            //     lineStyle: {
            //         width: 8,
            //         color: 'rgb(255, 255, 255, 0.8)',
            //         marginButtom: 100,
            //     },
            //     showSymbol: false,
            // },

            {
                name: 'Bar',
                type: 'bar',
                data: pulseDetails.map(item => item[1]),
                marginTop: 150,
                barWidth: '60%', 
                itemStyle: {
                    color: 'rgb(255, 255, 250, 0.8)',
                    marginLeft: 50,
                }
            },
        ],
    };

    return (
         <View style={{ marginLeft: 10, width: '100%', height: 350 }}>
             <ECharts
                 option={option}
                 backgroundColor="transparent"
                 style={{ width: '100%', height: 350 }}
             />
             </View>
    );
};

export default Td;
