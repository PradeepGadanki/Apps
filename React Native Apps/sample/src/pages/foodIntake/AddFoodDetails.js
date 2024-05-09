import { StyleSheet, Button,TouchableOpacity, Text, View, ScrollView, TextInput, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFoodDetails = () => {
    const [carbohydrates, setCarbohydrates] = useState('');
    const [fat, setFat] = useState('');
    const [protein, setProtein] = useState('');
    const [food, setFood] = useState('');
    const [foodType, setFoodType] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation()
    const route = useRoute();
    const { data } = route.params;
    useEffect(() => {
        setFoodType(data)
    }, [data])
    console.log('data in add', data)
    const handleOnClick = (value, type) => {
        error && setError('')
        if (type == 'carbohydrates') {
            setCarbohydrates(value)
        } else if(type == 'fats') {
            setFat(value)
        } else if (type == 'proteins') {
            setProtein(value)
        } else if (type == 'food') {
            setFood(value)
        }
    }
    
    const saveDetails = async ()=> {
        if (fat !== '' && carbohydrates !== '' && protein !== '' && food !== '' && foodType !=='') {
            error && setError('')
                console.log("clikedddd..")
                const uu = 'almonds';
                let currentDate = new Date();
                const username = await AsyncStorage.getItem('name');
                try {
                  await fetch(`http://10.0.2.2:7000/api/users/eatenFood/`,{
                    method: 'POST', // Specify the HTTP method
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json' // Specify content type
                    },
                    body: JSON.stringify({"name": username, "fat": fat, "carbohydrates": carbohydrates, "protein": protein, 'date': currentDate, "food": food, 'foodType': foodType})
                  }).then(response =>
                    response.json())
                    .then(data1 => {
                      console.log("final in add", data1);
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
    
    const screenHeight = Dimensions.get('window').height
    return (
        <View style={styles.container}>
             <View style={styles.mainContainer}>
             <Text style={styles.heading}>Add food details</Text>
            <Text style={styles.label}>Enter Food <Text style={{color: 'red'}}>*</Text></Text>
            <TextInput
                    style={styles.input}
                    placeholder="Enter Food name"
                    value={food}
                    placeholderTextSize="10"
                    onChangeText={text => handleOnClick(text, 'food')}
                >
                </TextInput>
            <Text style={styles.label}>Enter carbohydrates <Text style={{color: 'red'}}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter carbohydrates"
                    value={carbohydrates}
                    placeholderTextSize="10"
                    onChangeText={text => handleOnClick(text, 'carbohydrates')}
                >
                </TextInput>
                <Text style={styles.label}>Enter fats <Text style={{color: 'red'}}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter fats"
                    value={fat}
                    onChangeText={text => handleOnClick(text, 'fats')}
                >
                </TextInput>
                <Text style={styles.label}>Enter proteins <Text style={{color: 'red'}}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter proteins"
                    value={protein}
                    onChangeText={text => handleOnClick(text, 'proteins')}
                >
                </TextInput>
            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity onPress={saveDetails} style={styles.addContainer}>
                    <Text style={styles.plus}>Save Details</Text></TouchableOpacity>
                    </View>
    </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
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
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 20,
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
        height: 60,
    },
    addContainer: {
        marginTop: 25,
        backgroundColor: 'blue',
        borderRadius: 23,
        width: '50%',
        alignSelf: 'center',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plus: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        borderRadius: 30,
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
export default AddFoodDetails;