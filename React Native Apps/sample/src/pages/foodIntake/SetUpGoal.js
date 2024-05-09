import { StyleSheet, Button,TouchableOpacity, Text, View, ScrollView, TextInput, Dimensions } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetUpGoal = () => {
    const [carbohydrates, setCarbohydrates] = useState('');
    const [fat, setFat] = useState('');
    const [protein, setProtein] = useState('');
    const [error, setError] = useState('')

    const navigation = useNavigation()

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
                      navigation.navigate('GoalDetails')
                    })
                } catch (err) {
                  if (!response.ok) {
                    console.log("Invalid cresentials or network error")
                    return
                  }
                  console.log("errorj", err)
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
      //fetchingApiData1()
    const screenHeight = Dimensions.get('window').height
    return (
        <View style={styles.container}>
             <View style={styles.mainContainer}>
             <Text style={styles.heading}>Setup Today's Goal</Text>
            {/* <View style={styles.inputContainer}> */}
            <Text style={styles.label}>Enter carbohydrates <Text style={{color: 'red'}}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter carbohydrates for today goal"
                    value={carbohydrates}
                    placeholderTextSize="10"
                    onChangeText={text => handleOnClick(text, 'carbohydrates')}
                >
                </TextInput>
                <Text style={styles.label}>Enter fats <Text style={{color: 'red'}}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter fats for today goal"
                    value={fat}
                    onChangeText={text => handleOnClick(text, 'fats')}
                >
                </TextInput>
                <Text style={styles.label}>Enter proteins <Text style={{color: 'red'}}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter proteins for today goal"
                    value={protein}
                    onChangeText={text => handleOnClick(text, 'proteins')}
                >
                </TextInput>
            {/* </View> */}
            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity onPress={saveDetails} style={styles.addContainer}>
                    <Text style={styles.plus}>Save Todays Goal Details</Text></TouchableOpacity>
                    </View>
    </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        //opacity: 0.4,
        height: Dimensions.get('window').height
    },
    mainContainer: {
        marginTop: 100,
    },
    save: {
        marginTop: 30,
        width: 100,
    },
    heading: {
        alignSelf: 'center',
        fontSize: 25,
        marginBottom: 15
    },
    input: {
        marginTop: 5,
        height: 40,
        borderColor: 'gray',
        borderWidth: 0,
        //paddingLeft: 8,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        //height: 55,
        padding: 10,
        paddingLeft: 16,
        paddingTop: 8,
        width: '90%',
        fontSize: 20
    },
    inputContainer: {
        borderRadius: 28,
        backgroundColor: 'white',
        margin: 10,
        //flexDirection: 'coloumn',
        //alignItems: 'center',
        height: 60,
        //justifyItems: 'center'
    },
    addContainer: {
        marginTop: 25,
        // marginButtom: 4,
        backgroundColor: 'blue',
        borderRadius: 23,
        width: '50%',
        alignSelf: 'center',
        height: 40,
        //width: '14%',
        alignItems: 'center',
        justifyContent: 'center',
        // justifyItems: 'center'
    },
    plus: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        borderRadius: 30,
        //alignSelf: 'center',
        //padding: 1,
    },
    label: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: '400'
    },
    placeholder: {
        fontSize: 15,
        color: 'gray',
        paddingLeft: 5
    },
    error: {
        color: 'red',
        alignSelf: "center",
        marginTop: 30
    }

});
export default SetUpGoal;