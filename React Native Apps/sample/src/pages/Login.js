import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Dimensions, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({})
  const [responseError, setResponseError] =  useState('');
  const navigation = useNavigation()

  const checkIsValid = () => {
    const errors = {...error}
    if (username == '') {
      errors['username'] = "Username is required"
    }
    if (password == '') {
      errors["password"] = 'Password is required'
    }
    setError(errors)
    if (Object.keys(errors).length == 0) {
      return true;
    } else {
      return false;
    }
  }
  const handleLogin = async () => {
    // Your login logic here
    // For simplicity, just logging the input values for now
    const isValid = checkIsValid()
    if (isValid) {
    try {
      let data1;
      const response = await fetch("http://10.0.2.2:7000/api/users/login/", {
          method: 'POST', // Specify the HTTP method
          headers: {
              "Accept": 'application/json',
              'Content-Type': 'application/json' // Specify content type
          },
          body: JSON.stringify({"userName": username, "password": password})
      }).then(response=>response.json()).then(data2=> {
          data1 = data2
      })
  console.log("data1data1", data1)
      //const data = await response.json();
      if (!data1.ok) {
          console.log("Invalid cresentials or network error")
          setResponseError("Invalid credentials")
          return
        //throw new Error('Network response was not ok');
      }
      setResponseError('')
      console.log("response in fe", data1)
      const jsonData = data1;
      //setData(jsonData);
      const id = data1?.userId
      const un = data1?.userName
      console.log('jsonData', data1, 'id', id)
      if (data1) {
        await AsyncStorage.setItem('userId', id);
        await AsyncStorage.setItem('name', un);
        navigation.navigate('Dashboard')
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
  };
}
  const handleOnPress = () => {
    navigation.navigate("RegistrationScreen")
}
const handleOnClick = (value, type) => {
  if (responseError) {
    setResponseError('')
  }
  if (type == 'username') {
    if (value == '') {
      setError({...error, username: 'Username is required'})
    } else {
      delete error?.["username"]
    }
    setUsername(value)
  } else if (type == 'password') {
    if (value == '') {
      setError({...error, password: 'Password is required'})
    } else {
      delete error?.['password']
    }
    setPassword(value)
  }
}
  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>Login</Text>
      <View style={styles.fullLine} />
      </View>
      <View style={styles.parentContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => handleOnClick(text, 'username')}
        />
        <View style={styles.line} />
        {error?.username && <Text style ={styles.error}>{error?.username}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => handleOnClick(text, 'password')}
        />
        <View style={styles.line} />
        {error?.password && <Text style ={styles.error}>{error?.password}</Text>}
        </View>
      </View>
      {responseError && <Text style= {styles.invalidError}>{responseError}</Text>}
      <TouchableOpacity style={styles.buttonProperties} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    <Text style ={styles.alreadyAmember}>Not a Member <Text style ={styles.link} onPress={handleOnPress}>Signup</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  invalidError: {
    color: 'red',
    alignSelf: 'center'
  },
  error: {
    color: 'red',
    marginLeft: 20,
  },
  link: {
    color: 'blue'
},
alreadyAmember: {
    //justifyContent: "center",
    alignSelf: "center",
    marginTop: 5,
    fontSize: 15
},
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // padding: 16,
  },
  fullLine: { 
    marginTop: 5,
    height: 1,
    width: Dimensions.get('window').width,
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    // alignContent: 'center',
    // justifyContent:'center',
    // alignItems: 'center'
    textAlign: 'center'
  },
  inputContainer: {
    marginBottom: 16,
    borderWidth: 0,
    marginLeft: 2,
    padding: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    //paddingLeft: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  line: {
    marginTop: 5,
    height: 1,
    marginLeft:20,
    marginRight:20,
    backgroundColor: 'gray',
  },
  parentContainer: {
    marginTop: 15,
  },
  buttonProperties: {
    borderRadius: 25,
    color: 'red',
    backgroundColor:'gray',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginLeft:20,
    marginRight:20,
  },
  buttonText: {
    color: 'black', // Set your desired text color
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
