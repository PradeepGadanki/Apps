// import React from 'react';
// import { View, Text } from 'react-native';
// import PieChart from 'react-native-pie-chart';

// const data = [
//   { value: 30, color: 'red' },
//   { value: 40, color: 'green' },
//   { value: 20, color: 'blue' },
// ];

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <PieChart
//         data={data}
//         width={200}
//         height={200}
//         innerRadius={30}
//         outerRadius={70}
//       />
//     </View>
//   )
// };

import { Background } from '@react-navigation/elements'
import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native'
import PieChart from 'react-native-pie-chart'
import jsonFood from '../../jsons/images.json'
import seaFood from '../../../assets/seaFood.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from './Images.js'
const PieChartWithPercentage = ({ data, goalDetails }) => {
  console.log("data in pie", data, 'goalDetails', goalDetails)
  const [eatenData, setEatenData] = useState([]);
  const [setUpGoalDetails, setSetupGoalDetails] = useState({})
  const [fatPer, setFatPer] = useState(0);
  const [carboPer, setCarboPer] = useState(0);
  const [proteinPer, setProteinPer] = useState(0);
  useEffect(() => {
    setEatenData(data)
    setSetupGoalDetails(goalDetails)
    let tempfat = (data?.fat * 100) / goalDetails?.fat
    setFatPer(tempfat || 0)
    let tempCarbo = (data?.carbohydrates * 100) / goalDetails?.carbohydrates
    setCarboPer(tempCarbo || 0)
    let tempProtein = (data?.protein * 100) / goalDetails?.protein
    setProteinPer(tempProtein || 0)
  }, [data, goalDetails])
  const widthAndHeight = 250
  const series1 = [carboPer || 0, carboPer <=100 ?100 - (carboPer || 0): 0]
  const series2 = [fatPer || 0, fatPer<=100? 100 - (fatPer || 0): 0]
  const series3 = [proteinPer || 0, proteinPer <= 100?100 - (proteinPer || 0): 0]
  // const series1 = [carboPer || 0, 100]
  // const series2 = [fatPer || 0, 100]
  // const series3 = [proteinPer || 0, 100 - (proteinPer || 0)]
  console.log('fat perm', fatPer, 'series1', series1)
  const carboSliceColor = ['#39b6ae', 'rgb(238,238,228)']
  const fatSliceColor = ['#4c0f63', 'rgb(238,238,228)']
  const protienSliceColor = ['#f7b346', 'rgb(238,238,228)']
  const renderLabel = (percent) => {
    return (
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {`${Math.round(50.76)}%`}
        </Text>
      </View>
    );
  };
  console.log('print')
  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        <View style={styles.chartContainer}>
          <Text style={styles.text1}>Carbohydrates</Text>
          <PieChart
            widthAndHeight={110}
            series={series1}
            sliceColor={carboSliceColor}
            coverRadius={0.75}
            //coverFill={'#FFF'}
            // renderLabel={renderLabel}
            // labelPosition={50}
            //strokeCap={'butt'}
            renderCustomLabel={() => renderLabel(carboPer)}

          />
          <Text style={styles.text}>{(setUpGoalDetails?.carbohydrates - eatenData?.carbohydrates> 0 ?setUpGoalDetails?.carbohydrates - eatenData?.carbohydrates: 0) || 0}g left</Text>
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.text2}>Fat</Text>
          <PieChart
            widthAndHeight={110}
            series={series2}
            sliceColor={fatSliceColor}
            coverRadius={0.75}
            coverFill={'#FFF'}
          />
          <Text style={styles.text}>{(setUpGoalDetails?.fat - eatenData?.fat>0? setUpGoalDetails?.fat - eatenData?.fat:0) || 0}g left</Text>
        </View>
        <View>
          <Text style={styles.text3}>Protein</Text>
          <PieChart
            widthAndHeight={110}
            series={series3}
            sliceColor={protienSliceColor}
            coverRadius={0.75}
            coverFill={'#FFF'}
          />
          <Text style={styles.text}>{(setUpGoalDetails?.protein - eatenData?.protein? setUpGoalDetails?.protein - eatenData?.protein:0) || 0}g left</Text>
        </View>
      </View>
      {/* <View style={styles.imageView}>
        {jsonFood && jsonFood?.map((foodDetails, index) => {
          return (
            <View key={index}>
              <Image
                source={seaFood}
                style={styles.image}
              />
              <Text>{foodDetails?.name}</Text>
            </View>
          )
        })}
      </View> */}
      <Images />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  text: {
    fontSize: 14,
    alignSelf: "center",
  },
  text1: {
    fontSize: 14,
    alignSelf: "center",
    color: "#39b6ae",
    marginBottom: 2,
  },
  text2: {
    fontSize: 14,
    alignSelf: "center",
    color: "#4c0f63",
    marginBottom: 2,
  },
  text3: {
    fontSize: 14,
    alignSelf: "center",
    color: "#f7b346",
    marginBottom: 4,
  },
  chart: {
    flexDirection: 'row',
    marginLeft: 60,
    marginRight: 60,
    justifyContent: "space-between",
    backgroundColor: 'white',
    padding: 20,

  },
  chartContainer: {
    marginRight: 10,
  },
  labelContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: 'black'
  },
  imageView: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between'

  },
  image: {
    width: 140,
    height: 120
  }
})

export default PieChartWithPercentage;