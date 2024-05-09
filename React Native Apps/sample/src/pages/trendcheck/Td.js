import React from 'react';
import { ECharts } from 'react-native-echarts-wrapper';
import {fr} from '../utils/fr.js'
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
    React.useEffect(()=> {
        handleOnPredict()
      }, [])
      const handleOnPredict = async () => {
        console.log("clikedddd..")
        const uu = await AsyncStorage.getItem('name');
        try {
            await fetch(`http://10.0.2.2:7000/api/users/predict/${uu}`).then(response =>
                response.json()).then(data1=>{
                console.log("final", data1)
                let arr = [];
                let fetchedDates = []
                for(let i =0; i< data1?.["last5Days"]?.length; i++) {
                  arr.push(parseInt(data1?.["last5Days"][i]['pulse']))
                  const givenDate = new Date(data1?.["last5Days"][i]['date'])
                  const day = givenDate.getDate()-1
                  const month = givenDate.getMonth()+2
                  fetchedDates.push(day+ '/' +month)
                }
                //setDates(fetchedDates)
                //setPulse(arr) 
            })   
        } catch (err) { 
            console.log("error", err)
        }
    
    }
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
                    function getfrDaysFromDate() {
                        const twentyDays = [];
                        let c = [];
                        let today = new Date(); 
                        today.setMonth(today.getMonth()+1); 
                        for (let i = 0; i < 5; i++) {
                            let currentDate = new Date(today);
                            currentDate.setDate(currentDate.getDate() +i+1); 
                            //currentDate.setMonth(currentDate.getMonth() +i+1); 
                            twentyDays.push(currentDate); 
                            const day = currentDate.getDate()
                            const month = currentDate.getMonth()
                            const val = fr(1)
                            finalArray.push([day + '/' + month, val.toString()])
                        }

                        return c;
                    }
                    const res = getfrDaysFromDate()
                    finalArray.push(res)
                    console.log('finalArray in my refe', finalArray)
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
   
    const option = {
        xAxis: {
            type: 'category',
            data: details.map(item => item[0]),
            name: 'Past\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\Present\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\Futere',
            nameLocation: 'middle',
            marginTop: 20,
            nameTextStyle: {
                fontSize: 12,
                fontWeight: 'bold',
                marginTop: 70
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
            [{
                type: 'value',
                showLabel: false,
            },
            // {
            //     type: 'value',
            // }
        ],
        backgroundColor: '#ca0177',
        grid: {
            left: '10%',
            bottom: 60, 
            right: '10%'
        },
        tooltip: { 
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                },
            },
        },
        series: [
            {
                data: details.map(item => item[1]),
                type: 'line',
                lineStyle: {
                    width: 8,
                    color: 'rgb(255, 255, 255, 0.8)',
                    marginButtom: 100,
                },
                showSymbol: false,
            },

            // {
            //     name: 'Bar',
            //     type: 'bar',
            //     data: pulseDetails.map(item => item[1]),
            //     marginTop: 150,
            //     barWidth: '60%', 
            //     itemStyle: {
            //         color: 'rgb(255, 255, 250, 0.8)',
            //         marginLeft: 50,
            //     }
            // },
        ],
    };

    return (
        // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        // <View style={{ marginLeft: 10, width: '100%', height: 350 }}>
        // <ECharts
        //     option={option}
        //     backgroundColor="transparent"
        //     style={{ flex: 1 }}
        // />
    //     </View>
    //    </ScrollView>
    // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    //         <View style={{ marginLeft: 10, width: '100%', height: 350 }}>
    //             <ECharts
    //                 option={option}
    //                 backgroundColor="transparent"
    //                 style={{ flex: 1 }}
    //             />
    //         </View>
    //     </ScrollView>
        //  <View>
        //  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
         <View style={{ marginLeft: 10, width: '100%', height: 350 }}>
             <ECharts
                 option={option}
                 backgroundColor="transparent"
                 style={{ width: '100%', height: 350 }}
             />
             </View>
    //      </ScrollView>
    //  </View>
    );
};

export default Td;
