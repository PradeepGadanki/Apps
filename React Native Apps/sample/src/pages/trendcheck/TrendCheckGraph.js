import React, { useEffect } from 'react';
import { View, Dimensions, ScrollView, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ECharts } from 'react-native-echarts-wrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrendCheckGraph = () => {
  const [dates, setDates] = React.useState([''])
  const [systolic, setSystolic] = React.useState([''])
  const [details, setDetails] = React.useState([])
  React.useEffect(() => {
    fetchingApiData1()
  }, [])
  console.log('dates', dates, 'syst', systolic)
  let currentDate = new Date()
  currentDate = currentDate.getDate() + '/' + currentDate.getMonth()
  const fetchingApiData1 = async () => {
    console.log("clikedddd..")
    const uu = await AsyncStorage.getItem('name');
    try {
      await fetch(`http://10.0.2.2:7000/api/users/allBpData/${uu}`).then(response =>
        response.json()).then(data1 => {
          console.log("final in allbp", data1)
          //setBpGraphData(data1?.["allData"])
          let arr = [];
          let fetchedDates = []
          let finalArray = [];
          for (let i = 0; i < data1?.["allData"]?.length; i++) {
            console.log('data1?.["allData"][i]', data1?.["allData"][i]['systolic'])
            arr.push(parseInt(data1?.["allData"][i]['systolic']))
            const givenDate = new Date(data1?.["allData"][i]['date'])
            const day = givenDate.getDate()
            const month = givenDate.getMonth() + 2
            fetchedDates.push(day + '/' + month)
            finalArray.push([day + '/' + month, data1?.["allData"][i]['systolic']])
          }
          // fetchedDates.push('29/9')
          // arr.push(60)
          setDetails(finalArray)
          setDates(fetchedDates)
          setSystolic(arr)
        })
    } catch (err) {
      if (!response.ok) {
        console.log("Invalid cresentials or network error")
        return
      }
      console.log("error", err)
    }

  }
  const option = {
    xAxis: {
      type: 'category',
      data: details.map(item => item[0]),
      nameLocation: 'middle',
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      axisLabel: {
        show: true, // Show x-axis labels
        color: 'black',
      },
      axisTick: {  // Show ticks
        show: true,
        alignWithLabel: true,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(240, 240, 240, 2)',
        }
      },
      splitLine: { // Show split lines
        show: true,
        lineStyle: {
          color: 'rgba(240, 240, 240, 1)', // Set color of the split lines
          type: 'solid', // Set line type to dashed
        },
      },
    },
    yAxis: {
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(240, 240, 240, 1)',
          type: 'solid',
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(240, 240, 240, 2)',
        },
      }
    },
    backgroundColor: 'white',
    grid: {
      left: 0,
      containLabel: true,
      show: true,
      borderColor: '#f0f0f0',
      borderWidth: 1,
    },
    series: [
      {
        data: details.map(item => ({ value: item[1], label: { show: true, position: 'top', color: 'black' } })),
        type: 'line',
        lineStyle: {
          width: 1,
          color: 'blue',
          marginButtom: 100,
        },
        itemStyle: {
          color: 'blue',
        }
      },
    ],
  };
  const useScrollView = details.length > 4
  return (
    // <ScrollView horizontal scrollEnabled={false}>
        <ECharts
          option={option}
          backgroundColor="transparent"
          style={{ flex: 1 }}
        />
    // </ScrollView>
  )  
}
const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 3,
    fontSize: 16,
    alignSelf: 'center'
  },
  container: {
    backgroundColor: 'skyblue',
    height: 100,
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 6
  },
  subContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5

  },
  text1: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
    marginTop: 4

  },
  text3: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
    marginBottom: 4

  }
});
export default TrendCheckGraph;


