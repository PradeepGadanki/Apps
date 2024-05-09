import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeightGraph = () => {
  const [bpgraphData, setBpGraphData] = React.useState()
  const [dates, setDates] = React.useState([])
  const [weight, setWeight] = React.useState([])
  React.useEffect(() => {
    fetchingApiData1()
  }, [])
  let currentDate = new Date()
  currentDate = currentDate.getDate() + '/' + currentDate.getMonth()
  const fetchingApiData1 = async () => {
    const uu = await AsyncStorage.getItem('name');
    try {
      await fetch(`http://10.0.2.2:7000/api/users/ndaysBloodPressure/${uu}`).then(response =>
        response.json()).then(data1 => {
          console.log("final in weight", data1)
          setBpGraphData(data1?.["last5Days"])
          let arr = [];
          let fetchedDates = []
          for (let i = 0; i < data1?.["last5Days"]?.length; i++) {
            arr.push(parseInt(data1?.["last5Days"][i]['weight']))
            const givenDate = new Date(data1?.["last5Days"][i]['date'])
            const day = givenDate.getDate()-1
            const month = givenDate.getMonth() + 2
            fetchedDates.push(day + '/' + month)
          }
          setDates(fetchedDates)
          setWeight(arr)
        })
    } catch (err) {
      if (!response.ok) {
        console.log("Invalid cresentials or network error")
        return
      }
      console.log("error", err)
    }

  }
  const data = {
    labels: dates || currentDate,
    datasets: [
      {
        data: weight || '2',
        //   colors: [
        //     (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red
        //     (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Green
        //     (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue
        //     (opacity = 1) => `rgba(255, 255, 0, ${opacity})`, // Yellow
        //     (opacity = 1) => `rgba(255, 0, 255, ${opacity})`, // Magenta
        //     (opacity = 1) => `rgba(0, 255, 255, ${opacity})`, // Cyan
        //   ],
      },
      {
        data: [30, 20, 12, 10, 240],
        // colors: [
        //   (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red
        //   (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Green
        //   (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue
        //   (opacity = 1) => `rgba(255, 255, 0, ${opacity})`, // Yellow
        //   (opacity = 1) => `rgba(255, 0, 255, ${opacity})`, // Magenta
        //   (opacity = 1) => `rgba(0, 255, 255, ${opacity})`, // Cyan
        // ],
      },
    ],
  };
  return (
    <View>
      <Text style={styles.heading}>Weight</Text>
      <BarChart
        data={weight ? data : []}
        width={300}
        height={200}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          color: (opacity = 1) => `rgba(250, 230, 0, ${opacity})`,
          strokeWidth: 1,
          barPercentage: 0.6,
          style: {
            borderRadius: 16,
          },
        }}

        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        withInnerLines={true}
        fromZero={true}
      />
    </View>
  );
};

export default WeightGraph;
const styles = StyleSheet.create({
  graphContainer: {
    margin: 10,
    backgroundColor: 'white',
    height: 'auto',
    borderRadius: 6
  },
  heading: {
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 3,
    fontSize: 16
  },
});