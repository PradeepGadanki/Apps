import { StyleSheet, Text, View, TextInput, Button, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Summary from './Summary';
import Graph from './Graph';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Insights() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('summary');
  
    const handleLogin = () => {
        // Your login logic here
        // For simplicity, just logging the input values for now
        //console.log(`Username: ${username}, Password: ${password}`);
      };

    const handleOnClick = (selectedTab) => {
        setActiveTab(selectedTab)
    }
    return (
        <View style={activeTab == 'summary'?styles.summaryContainer: styles.container}>
            <View style={styles.line}></View>
        <View style={activeTab == 'summary'?styles.summaryHeaderContainer:styles.headerContainer}>
        <View>
        <View style={styles.line}></View>
        <TouchableOpacity id="summary" onPress={() => handleOnClick("summary")}><Text style={activeTab == 'summary'?styles.tab: styles.selectedTab}>Summary</Text></TouchableOpacity>
        </View>
        <View>
        <View style={styles.line}></View>
        <TouchableOpacity id='graph' onPress={() => handleOnClick('graph')}><Text style={activeTab == 'graph'?styles.tab: styles.selectedTab}>Graph</Text></TouchableOpacity>
        <View style={styles.verticleLine}></View>
        </View>
        </View>
        {activeTab == 'summary'? <Summary />: <Graph />}
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'center',
      // alignItems: 'center',
      // padding: 16,
      margin: 'auto',
      backgroundColor:'lightblue'
    },
    summaryContainer: {
        flex: 1,
        //justifyContent: 'center',
        // alignItems: 'center',
        // padding: 16,
        margin: 'auto',
        backgroundColor:'white'
      },
    fullLine: { 
      marginTop: 5,
      height: 1,
      width: Dimensions.get('window').width,
      backgroundColor: 'gray',
    },
    tab: {
      fontSize: 24,
      marginTop:0,
      marginLeft: 20,
      //marginBottom: 16,
      // alignContent: 'center',
      // justifyContent:'center',
      // alignItems: 'center'
      //textAlign: 'center'

    },
    selectedTab: {
        fontSize: 24,
        marginTop:0,
        marginLeft: 20,
        //marginBottom: 16,
        // alignContent: 'center',
        // justifyContent:'center',
        // alignItems: 'center'
        //textAlign: 'center'
        borderWidth: 2, // Border width
        borderColor: 'black', // Border color
        //borderLeftW
        //padding: 4,
        paddingLeft: 20,
        paddingRight: 20, 
        borderTopWidth: 0,

  
      },
    inputContainer: {
      marginBottom: 16,
      borderWidth: 0,
      marginLeft: 3,
      marginRight: 8,
      borderRadius:10,
      backgroundColor: "lightblue",
      padding: 5,
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
      height: 1,
      backgroundColor: 'gray',
      position: 'relative',
      borderRightWidth: 1,
      width: '100%',

    },
    verticleLine: {
        // height: 6,
        // backgroundColor: 'red',
        // //position: 'relative',
        // borderBottomEndRadius: 4,
        // borderBottomRightRadius: 4,
        // borderBottomRightRadius: 4,
        // width: 2,
    },
    parentContainer: {
      marginTop: 15,
    },
    buttonProperties: {
      borderRadius: 30,
      color: 'blue',
      backgroundColor:'blue',
      paddingVertical: 12,
      paddingHorizontal: 4,
    //   height: 90,
    //   marginTop: "auto",
    //   marginBottom: 'auto',
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
        marginLeft:10,
    },
    buttonView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 6,
    },
    headerContainer: {
        backgroundColor: 'lightblue',
        height: 50,
        //flex:1,
        flexDirection: 'row',
        paddingLeft: 12,
        paddingRight: 12,
    },
    summaryHeaderContainer :{
        backgroundColor: 'white',
        height: 50,
        //flex:1,
        flexDirection: 'row',
        paddingLeft: 12,
        paddingRight: 12,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'space-between'
    }
  });