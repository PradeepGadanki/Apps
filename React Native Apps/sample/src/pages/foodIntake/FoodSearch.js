import { StyleSheet, Button,TouchableOpacity, Text, View, ScrollView, TextInput, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import PieChartWithPercentage from './PieChartWithPercentage'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
// import Checking from '../Checking.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const FoodSearch = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { data } = route.params || '';
    const [carbohydrates, setCarbohydrates] = useState('');
    const [fat, setFat] = useState('');
    const [protein, setProtein] = useState('');
    const [error, setError] = useState('')
    const [details, setDetails] = useState({});
    const [eatenFood, setEatenFood] = useState([]);
    const [totalCal, setTotalCal] = useState(0);
    const [totalEatenCal, setTotalEatenCal] = useState(0);
    const [remainingCal, setRemainingCal] = useState(0);
    const [breakfastDetails, setBreakfastData] = useState({})
    const [snackDetails, setSnackData] = useState({})
    const [lunchDetails, setLunchData] = useState({})
    const [dinnerDetails, setdinnerData] = useState({})
    const [individualTotalEatenCal, setIndividualTotalEatenCal] = useState({})
    console.log('data individualTotalEatenCal', data, individualTotalEatenCal)
    const handleOnClick = (value) => {

    }
    const fetchingApiData1 = async () => {
        console.log("clikedddd..")
        const uu = 'almonds'
        try {
          await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${uu}`,{
              headers:{
                "X-Api-Key":'iq3xaus11w9S8XYb00cVsll8m8vBIuHRNC2C2whR'
              }
          }).then(response =>
            response.json())
            .then(data1 => {
              console.log("final in outside food", data1)
            })
        } catch (err) {
          if (!response.ok) {
            console.log("Invalid cresentials or network error")
            return
          }
          console.log("errorj", err)
        }
    
      }
      const handleOnPress = () => {
        navigation.navigate('SetUpGoal', {"data": data || ''})
      }
      const handleOnPress2 = () => {
        navigation.navigate('GoalDetails', {"data": data || '' })
      }
      const handleOnPress1 = () => {
        navigation.navigate('AddFoodDetails', {"data": data || ''})
      }
      useEffect(()=>{
        fetchDetailsOfGoal()
        fetchEatenFoodDetails()
        //fetchingApiData1()
      }, [data])
      const fetchDetailsOfGoal = async () => {
        let currentDate = new Date();
        let username = await AsyncStorage.getItem('name');
        try {
          await fetch(`http://10.0.2.2:7000/api/users/goal/${username}/${currentDate}`).then(response =>
            response.json())
            .then(data1 => {
              console.log("final in foodss hhsefarch..", data1);
              setDetails(data1?.data)
            })
        } catch (err) {
          if (!response.ok) {
            console.log("Invalid cresentials or network error")
            return
          }
          console.log("errorj", err)
        }
    }
    const fetchEatenFoodDetails = async () => {
      let currentDate = new Date();
      let username = await AsyncStorage.getItem('name');
      console.log('entred bro....')
      try {
        await fetch(`http://10.0.2.2:7000/api/users/eatenFoodDetails/${username}/${currentDate}`).then(response =>
          response.json())
          .then(data1 => {
            console.log("data for eatenfooddetsails... in fs", data1);
            setEatenFood(data1?.data)
            if (data1?.data) {
              let arr = {"carbohydrates": 0, "fat": 0,"protein": 0, "total":0, "food": '' }
              for (let i=0; i<data1?.data?.length; i++) {
                arr['carbohydrates'] =arr['carbohydrates']+ parseInt(data1?.data?.[i]?.carbohydrates)
                arr['fat'] =  arr['fat']+parseInt(data1?.data?.[i]?.fat)
                arr['protein'] =  arr["protein"]+parseInt(data1?.data?.[i]?.protein)
              }
              console.log('..arr in fs...', arr)
            setIndividualTotalEatenCal(arr)
                      }
          })
      } catch (err) {
        if (!response.ok) {
          console.log("Invalid cresentials or network error")
          return
        }
        console.log("errorj", err)
      }
  }
      //fetchingApiData1()
    const screenHeight = Dimensions.get('window').height
    return (
        <View style={styles.container}>
         
          <View style={styles.sc}>
          <TouchableOpacity style={styles.addContainer1} onPress={handleOnPress}>
                    <Text style={styles.plus1}>Setup Goal</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.addContainer1} onPress={handleOnPress2}>
                    <Text style={styles.plus1}>Goal Details</Text></TouchableOpacity>
                    </View>
            {/* <View style={styles.inputContainer}> */}
             {/* <TextInput
                    style={styles.input}
                    placeholder="Search your product"
                    // value={username}
                    onChangeText={text => handleOnClick(text)}
                >
                </TextInput> */}
                {/* <TouchableOpacity style={styles.addContainer} onPress={handleOnPress}>
                    <Text style={styles.plus}>Set goal</Text></TouchableOpacity> */}
            {/* </View> */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Food Details"
                    // value={username}
                    onChangeText={text => handleOnClick(text)}
                >
                </TextInput>
                <TouchableOpacity style={styles.addContainer} onPress={handleOnPress1}>
                    <Text style={styles.plus}>+</Text></TouchableOpacity>
            </View>
            <PieChartWithPercentage data={individualTotalEatenCal} goalDetails={details} />
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        //opacity: 0.4,
        height: Dimensions.get('window').height
    },
    input: {
        //marginTop: 20,
        height: 40,
        borderColor: 'gray',
        borderWidth: 0,
        //paddingLeft: 8,
        marginLeft: 20,
        marginRight: 20,
        //backgroundColor: 'white',
        //borderRadius: 25,
        //height: 55,
        padding: 10,
        width: '65%',
        fontSize: 20
    },
    inputContainer: {
        borderRadius: 28,
        backgroundColor: 'white',
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        justifyItems: 'center'
    },
    addContainer: {
        // marginTop: 4,
        // marginButtom: 4,
        backgroundColor: 'blue',
        borderRadius: 23,
        width: '14%',
        // alignItems: 'center',
        // justifyContent: 'center',
        // justifyItems: 'center'
    },
    addContainer1: {
      // marginTop: 4,
      // marginButtom: 4,
      backgroundColor: 'blue',
      borderRadius: 23,
      width: '34%',
      alignSelf: 'center',
      height: 40,
      justifyContent: 'center'
      // alignItems: 'center',
      // justifyContent: 'center',
      // justifyItems: 'center'
  },
    plus: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        borderRadius: 30,
        alignSelf: 'center',
        //padding: 1,
    },
    plus1: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      borderRadius: 30,
      alignSelf: 'center',
      //padding: 1,
  },
  sc: {
    flexDirection: 'row',
    alignContent:'space-between',
    justifyContent: 'space-between',
    margin: 12
  }

});
export default FoodSearch;