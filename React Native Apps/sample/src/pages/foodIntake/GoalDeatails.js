import { StyleSheet, Button,TouchableOpacity, Text, View, ScrollView, TextInput, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoalDetails = () => {
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

    console.log('details of goalhhd', details, 'details of eaten food', eatenFood, 'snackDetails', snackDetails)
    const navigation = useNavigation()

    useEffect(() => {
      setRemainingCal(totalCal-totalEatenCal)
    }, [totalCal, totalEatenCal])
    const handleOnClick = (value, type) => {
        error && setError('')
        if (type == 'carbohydrates') {
            setCarbohydrates(value)
        } else if(type == 'fats') {
            setFat(value)
        } else if (type == 'proteins') {
            setProtein(value)
        }
    }

    useEffect(()=> {
      console.log('details in useEffect', details)
      if (details) {
        const total = parseInt(details?.carbohydrates)   + parseInt(details?.fat)   + parseInt(details?.protein)
        setTotalCal(total)
      }
    }, [details])

    useEffect(() => {
        fetchEatenFoodDetails()
       fetchDetailsOfGoal()

    },[])
    const fetchDetailsOfGoal = async () => {
        let currentDate = new Date();
        let username = await AsyncStorage.getItem('name');
        try {
          await fetch(`http://10.0.2.2:7000/api/users/goal/${username}/${currentDate}`).then(response =>
            response.json())
            .then(data1 => {
              console.log("finalnd egeths  in osetup goald", data1);
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
            console.log("data for eatenfooddetsails...", data1);
            setEatenFood(data1?.data)
            if (data1?.data) {
              let totalData = 0;
              let breakfastData = {"carbohydrates": 0, "fat": 0,"protein": 0, "total":0, "food": '' }
              let lunchData = {"carbohydrates": 0, "fat": 0,"protein": 0, "total":0, "food": '' }
              let dinnerData = {"carbohydrates": 0, "fat": 0,"protein": 0, "total":0, "food": '' }
              let snackData = {"carbohydrates": 0, "fat": 0,"protein": 0, "total":0, "food": '' }
              for (let i=0; i<data1?.data?.length; i++) {
                totalData+=parseInt(data1?.data?.[i]?.carbohydrates) + parseInt(data1?.data?.[i]?.fat) + parseInt(data1?.data?.[i]?.protein)
                if (data1?.data?.[i]?.foodType == 'Snack') {
                  snackData= {"carbohydrates": snackData?.['carbohydrates'] + parseInt(data1?.data?.[i]?.carbohydrates), "fat": snackData?.['fat'] + parseInt(data1?.data?.[i]?.fat),"protein": snackData?.['protein'] + parseInt(data1?.data?.[i]?.protein), "total":snackData?.['total'] + parseInt(data1?.data?.[i]?.carbohydrates)+parseInt(data1?.data?.[i]?.fat) + parseInt(data1?.data?.[i]?.protein), "food": snackData?.['food'] == '' ?snackData?.['food'] + data1?.data?.[i]?.food: snackData?.['food']+ ', ' + data1?.data?.[i]?.food  }
                  
                } else if(data1?.data?.[i]?.foodType == 'Breakfast') {
                  breakfastData= {"carbohydrates": breakfastData?.['carbohydrates'] + parseInt(data1?.data?.[i]?.carbohydrates), "fat": breakfastData?.['fat'] + parseInt(data1?.data?.[i]?.fat),"protein": breakfastData?.['protein'] + parseInt(data1?.data?.[i]?.protein), "total":breakfastData?.['total'] + parseInt(data1?.data?.[i]?.carbohydrates)+parseInt(data1?.data?.[i]?.fat) + parseInt(data1?.data?.[i]?.protein), "food": breakfastData?.['food'] == '' ?breakfastData?.['food'] + data1?.data?.[i]?.food: breakfastData?.['food']+ ', ' + data1?.data?.[i]?.food  }
                } else if(data1?.data?.[i]?.foodType == 'Lunch') {
                  lunchData= {"carbohydrates": lunchData?.['carbohydrates'] + parseInt(data1?.data?.[i]?.carbohydrates), "fat": lunchData?.['fat'] + parseInt(data1?.data?.[i]?.fat),"protein": lunchData?.['protein'] + parseInt(data1?.data?.[i]?.protein), "total":lunchData?.['total'] + parseInt(data1?.data?.[i]?.carbohydrates)+parseInt(data1?.data?.[i]?.fat) + parseInt(data1?.data?.[i]?.protein), "food": lunchData?.['food'] == '' ?lunchData?.['food'] + data1?.data?.[i]?.food: lunchData?.['food']+ ', ' + data1?.data?.[i]?.food  }
                } else if(data1?.data?.[i]?.foodType == 'Dinner') {
                  dinnerData= {"carbohydrates": dinnerData?.['carbohydrates'] + parseInt(data1?.data?.[i]?.carbohydrates), "fat": dinnerData?.['fat'] + parseInt(data1?.data?.[i]?.fat),"protein": dinnerData?.['protein'] + parseInt(data1?.data?.[i]?.protein), "total":dinnerData?.['total'] + parseInt(data1?.data?.[i]?.carbohydrates)+parseInt(data1?.data?.[i]?.fat) + parseInt(data1?.data?.[i]?.protein), "food": dinnerData?.['food'] == '' ?dinnerData?.['food'] + data1?.data?.[i]?.food: dinnerData?.['food']+ ', ' + data1?.data?.[i]?.food  }
                }
              }
              setBreakfastData(breakfastData)
              setdinnerData(dinnerData)
              setLunchData(lunchData)
              setSnackData(snackData)
            setTotalEatenCal(totalData)
            setIndividualTotalEatenCal({
              "totalEatenCarbo": breakfastData?.carbohydrates+lunchData?.carbohydrates+dinnerData?.carbohydrates+snackData?.carbohydrates,
              "totalEatenFat": breakfastData?.fat+lunchData?.fat+dinnerData?.fat+snackData?.fat,
              "totalEatenProtein": breakfastData?.protein+lunchData?.protein+dinnerData?.protein+snackData?.protein,
            })
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
    const goBack = () => {
      navigation.navigate("FoodSearch", {data: ''})
    }
    const saveDetails = async ()=> {
        if (fat !== '' && carbohydrates !== '', protein !== '') {
            error && setError('')
                console.log("clikedddd..")
                const uu = 'almonds';
                let currentDate = new Date();
                let username = await AsyncStorage.getItem('name');
                try {
                  await fetch(`http://10.0.2.2:7000/api/users/goal/`,{
                    method: 'POST', // Specify the HTTP method
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json' // Specify content type
                    },
                    body: JSON.stringify({"name": username, "fat": fat, "carbohydrates": carbohydrates, "protein": protein, 'date': currentDate})
                  }).then(response =>
                    response.json())
                    .then(data1 => {
                      console.log("final in osetup goald", data1);
                      //navigation.navigate("FoodSearch")
                    })
                } catch (err) {
                  if (!response.ok) {
                    console.log("Invalid cresentials or network error")
                    return
                  }
                  console.log("errojhgfrj", err)
                }
            

        } else {
            setError('Enter All mandotory fields')
        }
    }
    const fetchingApiData1 = async () => {
        console.log("clikedddd..")
        const uu = 'almonds'
        try {
          await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${uu}`,{
              headers:{
                "X-Api-Key":'Er3YneGn0u7DGWdvRA+EWw==0NztTM9aUE8NuSXg'
              }
          }).then(response =>
            response.json())
            .then(data1 => {
              console.log("final in outside food", data1)
              //setBpGraphData(data1?.["allData"])
            //   let arr = [];
            //   let fetchedDates = []
            //   let finalArray = [];
            //   for (let i = 0; i < data1?.["allData"]?.length; i++) {
            //     console.log('data1?.["allData"][i]', data1?.["allData"][i]['systolic'])
            //     arr.push(parseInt(data1?.["allData"][i]['systolic']))
            //     const givenDate = new Date(data1?.["allData"][i]['date'])
            //     const day = givenDate.getDate()
            //     const month = givenDate.getMonth() + 2
            //     fetchedDates.push(day + '/' + month)
            //     finalArray.push([day + '/' + month, data1?.["allData"][i]['systolic']])
              //}
              // fetchedDates.push('29/9')
              // arr.push(60)
            //   setDetails(finalArray)
            //   setDates(fetchedDates)
              //setSystolic(arr)
            })
        } catch (err) {
          if (!response.ok) {
            console.log("Invalid cresentials or network error")
            return
          }
          console.log("errorj", err)
        }
    
      }
    const handleOnPress = (type) => {
      navigation.navigate('FoodSearch', {data: type})
    }
    const screenHeight = Dimensions.get('window').height
    return (
        <View>
              <Text style={styles.heading}>Goal</Text>
        <View style={styles.container}>
            <View style={styles.goalText}>
                <Text style={styles.text}>Goal       -    Amount eaten      =      Remaining</Text>
                <Text>{totalCal || 0} kcal              {totalEatenCal || 0} kcal                                {remainingCal> 0 && remainingCal || 0} kcal</Text>
            </View>
            <View style={styles.goalText1}>
            <Text style={styles.text}>{(individualTotalEatenCal?.totalEatenProtein+'/'+(details?.protein || 0) || 0)+ '                           '+((individualTotalEatenCal?.totalEatenFat || 0)+'/'+(details?.fat || 0)) + '                       '+  (individualTotalEatenCal?.totalEatenCarbo || 0)+'/'+(details?.carbohydrates || 0)}</Text>
            <Text style={styles.temp}>Protein                                 Fats                   Carbohydrates</Text>
            </View>
            <View style={styles.subContainer}>
              <View style={styles.line}>
                <Text style={styles.text}>Add Breakfast</Text>
                <TouchableOpacity style={styles.addContainer} onPress={()=>handleOnPress('Breakfast')}>
                    <Text style={styles.plus}>+</Text></TouchableOpacity>
                    </View>
                {breakfastDetails?.food && <View>
                  <Text>
                    {breakfastDetails?.food}
                  </Text>
                  <Text style={styles.text}>{breakfastDetails?.total}       |    {breakfastDetails?.protein} g             |      {breakfastDetails?.fat} g         |       {breakfastDetails?.carbohydrates} g</Text>
                <Text>kcal           |       Proteins      |    Fats            |       carbohydrates   </Text>
                </View>}
            </View>
            <View style={styles.subContainer}>
            <View style={styles.line}>
                <Text style={styles.text}>Add Lunch</Text>
                <TouchableOpacity style={styles.addContainer} onPress={()=>handleOnPress('Lunch')}>
                    <Text style={styles.plus}>+</Text></TouchableOpacity>
                    </View>
               {lunchDetails?.food && (<View>
                  <Text>
                    {lunchDetails?.food}
                  </Text>
                  <Text style={styles.text}>{lunchDetails?.total}             |    {lunchDetails?.protein} g            |      {lunchDetails?.fat} g        |       {lunchDetails?.carbohydrates} g</Text>
                <Text>kcal           |       Proteins      |    Fats            |       Carbohydrates   </Text>
                </View>)}
            </View>
            <View style={styles.subContainer}>
            <View style={styles.line}>
            <Text style={styles.text}>Add Dinner</Text>
            <TouchableOpacity style={styles.addContainer} onPress={()=>handleOnPress("Dinner")}>
                    <Text style={styles.plus}>+</Text></TouchableOpacity>
                    </View>
                    {dinnerDetails?.food && <View>
                  <Text>
                    {dinnerDetails?.food}
                  </Text>
                  <Text style={styles.text}>{dinnerDetails?.total}       |    {dinnerDetails?.protein} g             |      {dinnerDetails?.fat} g         |       {dinnerDetails?.carbohydrates} g</Text>
                <Text>kcal           |       Proteins      |    Fats            |       carbohydrates   </Text>
                </View>}
            </View>
            <View style={styles.subContainer}>
            <View style={styles.line}>
            <Text style={styles.text}>Add Snack </Text>
            <TouchableOpacity style={styles.addContainer} onPress={()=>handleOnPress("Snack")}>
                    <Text style={styles.plus}>+</Text></TouchableOpacity>
                    </View>
                    {snackDetails?.food && <View>
                  <Text>
                    {snackDetails?.food}
                  </Text>
                  <Text style={styles.text}>{snackDetails?.total}       |    {snackDetails?.protein} g             |      {snackDetails?.fat} g         |       {snackDetails?.carbohydrates} g</Text>
                <Text>kcal           |       Proteins      |    Fats            |       carbohydrates   </Text>
                </View>}
            </View>
            <TouchableOpacity onPress={goBack} style={styles.goBack}>
                    <Text style={styles.plus1}>Back</Text></TouchableOpacity>
    </View>
    </View>

    )

}
const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'lightblue',
        //opacity: 0.4,
        height: Dimensions.get('window').height
    },
    line: {
      flexDirection: 'row',
      justifyContent:'space-between'   
    },
    mainContainer: {
        marginTop: 100,
    },
    heading: {
        alignSelf: 'center',
        fontSize: 25,
        marginBottom: 15
    },
    goalText: {
      backgroundColor: 'lightblue',
      padding: 15,
      borderRadius: 19,
      margin: 5,
      fontWeight: 'bold'


    },
    goalText1:{
      backgroundColor: 'lightblue',
      padding: 15,
      borderRadius: 19,
      margin: 5,
      fontWeight: 'bold'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16
    },
    subContainer: {
      backgroundColor: 'lightblue',
      padding: 15,
      borderRadius: 19,
      margin: 5,
    },
    plus: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
      borderRadius: 30,
      alignSelf: 'center',
      //padding: 1,
  },
  addContainer: {
    // marginTop: 4,
    // marginButtom: 4,
    backgroundColor: 'blue',
    borderRadius: 23,
    width: '8%',
    // alignItems: 'center',
    // justifyContent: 'center',
    // justifyItems: 'center'
},
goBack: {
  marginTop: 30,
  width: 120,
  height: 50,
  alignSelf:'center',
  color: 'black',
  backgroundColor: 'blue',
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center'
},
plus1: {
  alignSelf: 'center',
  fontSize: 25,
  color: 'white',
  justifyContent: 'center',
  alignItems:'center',
  padding: 'auto'
},
temp: {
  width: '80%'
}

});
export default GoalDetails;