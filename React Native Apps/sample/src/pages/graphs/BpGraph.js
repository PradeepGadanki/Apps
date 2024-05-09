import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BpGraph = () => {
  const [bpgraphData, setBpGraphData] = React.useState()
  const [avgBp, setAvgOfBp] = React.useState()
  const [systolicValues, setSystolicValues] = React.useState([])
  const [dates, setDates] = React.useState([])

  useEffect(() => {
    fetchingApiData1()
  }, [])
  const fetchingApiData1 = async () => {
    console.log("clikedddd..")
    const uu = await AsyncStorage.getItem('name');
    try {
      await fetch(`http://10.0.2.2:7000/api/users/ndaysBloodPressure/${uu}`).then(response =>
        response.json()).then(data1 => {
          console.log("final in bp geap", data1)
          setBpGraphData(data1?.["last5Days"])
          let arr = [];
          let fetchedDates = []
          for (let i = 0; i < data1?.["last5Days"]?.length; i++) {
            arr.push(parseInt(data1?.["last5Days"][i]['systolic']))
            const givenDate = new Date(data1?.["last5Days"][i]['date'])
            const day = givenDate.getDate()-1
            const month = givenDate.getMonth() + 2
            fetchedDates.push(day + '/' + month)
          }
          // fetchedDates.push('29/9')
          // arr.push(60)
          setDates(fetchedDates)
          setSystolicValues(arr)
          setAvgOfBp(data1?.['avg'])
        })
    } catch (err) {
      if (!response.ok) {
        console.log("Invalid cresentials or network error")
        return
      }
      console.log("error", err)
    }

  }
  console.log('systolicValues', systolicValues)
  const data = {
    labels: dates || ['2/3'],
    //['2/20', '2/21', '2/22', '2/22', '2/22'],
    datasets: [
      {
        data: systolicValues || [60],
        //[0, 60, 120, 180, 240, 300],
        //colors: [(opacity = 1)=> ]
        colors: [
          (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red
          (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Green
          (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue
          (opacity = 1) => `rgba(255, 255, 0, ${opacity})`, // Yellow
          (opacity = 1) => `rgba(255, 0, 255, ${opacity})`, // Magenta
          (opacity = 1) => `rgba(0, 255, 255, ${opacity})`, // Cyan
        ],
      },
    ],
  };
  return (
    <View>
      <Text style={styles.heading}>Blood Pressure</Text>
      <BarChart
        data={systolicValues ? data : []}
        width={330}
        height={200}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,

        }}
        //withInnerLines={false}
        withCustomBarColorFromData
        flatColor
        fromZero={true}
      //yAxisLabelFormatter = {0, 60, 120, 180, 240}
      />
    </View>
  );
};

export default BpGraph;

const styles = StyleSheet.create({
  graphContainer: {
    margin: 10,
    backgroundColor: 'white',
    height: 250,
    borderRadius: 6
  },
  heading: {
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 3,
    fontSize: 16
  }
});