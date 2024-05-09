import { StyleSheet, Text, View, TextInput, Button, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewMeasurement() {
  const [name, setName] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [food, setFood] = useState('');
  const [error, setError] = useState({})
  const [alert, setAlert] = useState('')
  const [response, setResponse] = useState();
  useEffect(() => {
    let currentDate = new Date();
    console.log('currentDate', currentDate )
    currentDate.setMonth(currentDate.getMonth()+1)
    currentDate = currentDate.getMonth() + '/' + currentDate.getDate() + '/' + currentDate.getFullYear()
    setDate(currentDate)
    let currentTime = new Date();
    currentTime = currentTime.getHours() + ':' + currentTime.getMinutes() + ":" + currentTime.getSeconds()
    setTime(currentTime.toString())
  }, [])
  useEffect(() => {
    if (response) {
      const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        console.log('beast.........')
        setAlert("")
        setSystolic('')
        setDiastolic('')
        setPulse('')
        setWeight('')
        setFood('')
      }, 3000)
      return () => {
        console.log('inclear')
        clearTimeout(timeId)
      }
    }
  }, [response]);
  const getDetails = async ()=> {
    const bb  = await AsyncStorage.getItem('userId');
  console.log('bmsnnb', bb)


  }
  getDetails()
  console.log("date", date)
  const checkIsValid = () => {
    const errors = { ...error }
    if (name == '') {
      errors.name = "Enter your name"
    }
    if (systolic == '') {
      errors.systolic = "Enter your systolic"
    }
    if (diastolic == '') {
      errors.diastolic = "Enter your diastolic"
    }
    if (pulse == '') {
      errors.pulse = "Enter your pulse"
    }
    if (weight == '') {
      errors.weight = "Enter your weight"
    }
    if (date == '') {
      errors.date = "Enter your date"
    }
    if (time == '') {
      errors.time = "Enter your time"
    }
    if (food == '') {
      errors.food = "Enter food"
    }
    setError(errors)
    console.log('Object.keys(errors).length', Object.keys(errors).length, 'error', errors)
    if (Object.keys(errors).length == 0) {
      console.log('true')
      return true
    } else {
      console.log('false')
      return false
    }
  }
  const handleLogin = async () => {
    console.log("clicked..")
    const isValid = checkIsValid();
    if (isValid) {
      console.log("in if")
      try {
        let currentDate = new Date();
        currentDate = currentDate.getMonth() + '/' + currentDate.getDate() + '/' + currentDate.getFullYear()
        setDate(currentDate.toString())
        let currentTime = new Date();
        currentTime = currentTime.getHours() + ':' + currentTime.getMinutes() + ":" + currentTime.getSeconds()
        setTime(currentTime.toString())
        const response = await fetch("http://10.0.2.2:7000/api/users/newmeasurement/", {
          method: 'POST', // Specify the HTTP method
          headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json' // Specify content type
          },
          body: JSON.stringify({ "name": name, "systolic": systolic, "diastolic": diastolic, "pulse": pulse, "weight": weight, "date": currentDate, "time": currentTime, "food": food })
        });
        setResponse(response)
        if (!response.ok) {
          setAlert("Details not saved successfully")
          console.log("user details not postedor network error")
          return
          //throw new Error('Network response was not ok');
        }
        console.log("response", response)
        const jsonData = response;
        //setData(jsonData);
        console.log('jsonData', jsonData)
        if (response.ok)
          setAlert("Details saved successfully.")
        console.log('Details saved successfully')

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleOnClick = (value, type) => {
    if (type == 'name') {
      if (value == '') {
        setError({ ...error, name: "Enter your name" })
      } else {
        delete error["name"]
      }
      setName(value)
    }
    else if (type == 'systolic') {
      if (value == '') {
        setError({ ...error, systolic: "Enter your Systolic" })
      } else {
        delete error["systolic"]
      }
      setSystolic(value)
    }
    else if (type == 'diastolic') {
      if (value == '') {
        setError({ ...error, diastolic: "Enter your Diastolic" })
      } else {
        delete error["diastolic"]
      }
      setDiastolic(value)
    }
    else if (type == 'pulse') {
      if (value == '') {
        setError({ ...error, pulse: "Enter your pulse" })
      } else {
        delete error["pulse"]
      }
      setPulse(value)
    }
    else if (type == 'weight') {
      if (value == '') {
        setError({ ...error, weight: "Enter your weight" })
      } else {
        delete error["weight"]
      }
      setWeight(value)
    }
    else if (type == 'date') {
      if (value == '') {
        setError({ ...error, date: "Enter your date" })
      } else {
        delete error["date"]
      }
      setDate(value)
    }
    else if (type == 'time') {
      if (value == '') {
        setError({ ...error, time: "Enter your time" })
      } else {
        delete error["time"]
      }
      setTime(value)
    }
    else if (type == 'food') {
      if (value == '') {
        setError({ ...error, food: "Enter your food" })
      } else {
        delete error["food"]
      }
      setFood(value)
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.title}>Add Details</Text>
          </View>
          <View>
            <Text style={styles.title}>New Details</Text>
          </View>
        </View>
        <View style={styles.parentContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => handleOnClick(text, 'name')}
            />
            {error?.name && <Text style={styles.errorLabel}>{error?.name}</Text>}

          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Systolic</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter systolic"
              value={systolic}
              onChangeText={(text) => handleOnClick(text, 'systolic')}
            />
            {error?.systolic && <Text style={styles.errorLabel}>{error?.systolic}</Text>}

          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Diastolic</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter diastolic"
              value={diastolic}
              onChangeText={(text) => handleOnClick(text, 'diastolic')}
            />
            {error?.diastolic && <Text style={styles.errorLabel}>{error?.diastolic}</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pulse</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pulse"
              value={pulse}
              onChangeText={(text) => handleOnClick(text, 'pulse')}
            />
            {error?.pulse && <Text style={styles.errorLabel}>{error?.pulse}</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weight</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter weight"
              value={weight}
              onChangeText={(text) => handleOnClick(text, 'weight')}
            />
            {error?.weight && <Text style={styles.errorLabel}>{error?.weight}</Text>}
          </View>
          <View style={styles.dateTimeContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Date"
                value={date}
                onChangeText={(text) => handleOnClick(text, 'date')}
              />
              {error?.date && <Text style={styles.errorLabel}>{error?.date}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Time</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Time"
                value={time}
                onChangeText={(text) => handleOnClick(text, 'time')}
              />
              {error?.time && <Text style={styles.errorLabel}>{error?.time}</Text>}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Food</Text>
            <TextInput
              style={styles.input}
              placeholder="Text enter here"
              value={food}
              onChangeText={(text) => handleOnClick(text, 'food')}
            />
            {error?.food && <Text style={styles.errorLabel}>{error?.food}</Text>}
          </View>
        </View>
        <View style={styles.buttonView}>
          {alert && <Text style={styles.alertText}>{alert}</Text>}
          <TouchableOpacity style={styles.buttonProperties} onPress={handleLogin}>
            <Text style={styles.buttonText}>Save Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  alertText: {
    color: 'green'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // padding: 16,
    margin: 'auto'
  },
  fullLine: {
    marginTop: 5,
    height: 1,
    width: Dimensions.get('window').width,
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 24,
    //marginBottom: 16,
    // alignContent: 'center',
    // justifyContent:'center',
    // alignItems: 'center'
    //textAlign: 'center'

  },
  inputContainer: {
    marginBottom: 16,
    borderWidth: 0,
    marginLeft: 3,
    marginRight: 8,
    borderRadius: 10,
    backgroundColor: "lightblue",
    padding: 5,
  },
  errorLabel: {
    color: 'red',
    marginLeft: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    //paddingLeft: 8,
    marginLeft: 8,
    marginRight: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 6,
  },
  line: {
    marginTop: 5,
    height: 1,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'gray',
  },
  parentContainer: {
    marginTop: 15,
  },
  buttonProperties: {
    borderRadius: 30,
    color: 'blue',
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 4,
    //   height: 90,
    //   marginTop: "auto",
    //   marginBottom: 'auto',
    marginTop: 50,
    width: 200,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black', // Set your desired text color
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: 10,
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  headerContainer: {
    backgroundColor: 'white',
    height: 50,
    //flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    justifyContent: 'space-between'
  }
});