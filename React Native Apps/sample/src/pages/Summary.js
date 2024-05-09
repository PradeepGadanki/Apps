import { StyleSheet, Text, View, TextInput, Button, Dimensions, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import SummaryActivities from './SummaryActivities'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Summary() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('summary');
    const [bpData, setBpData] = useState();
    const [pulseData, setPulseData] = useState();
    const [weightData, setWeightData] = useState();
    const handleLogin = () => {
        // Your login logic here
        // For simplicity, just logging the input values for now
        //console.log(`Username: ${username}, Password: ${password}`);
      };
console.log("datadata", bpData)
    const handleOnClick = (selectedTab) => {
        setActiveTab(selectedTab)
    }

    useEffect(() => {
        fetchingApiData()
        fetchingApiData1()
        fetchingApiData2()
    }, [])
    const values = {
        Day7: '0/0',
        Day14: '0/0',
        Day30: '0/0',
        Day90: '0/0',
        AllTime: '0/0'
    }
    const fetchingApiData = async () => {
        console.log("clikedddd..")
        const uu = await AsyncStorage.getItem('name');
        try {
            await fetch(`http://10.0.2.2:7000/api/users/avgBloodPressure/${uu}`).then(response =>
                response.json()).then(data1=>{
                console.log("final", data1)
                setBpData(data1)
            })   
        } catch (err) {
            if (!response.ok) {
                console.log("Invalid cresentials or network error")
                return
            }  
            console.log("error", err)
        }

    }
    const fetchingApiData1 = async () => {
        console.log("clikedddd..")
        const uu = await AsyncStorage.getItem('name');
        try {
            await fetch(`http://10.0.2.2:7000/api/users/avgPulse/${uu}`).then(response =>
                response.json()).then(data1=>{
                console.log("final", data1)
                setPulseData(data1)
            })   
        } catch (err) {
            if (!response.ok) {
                console.log("Invalid cresentials or network error")
                return
            }  
            console.log("error", err)
        }

    }
    const fetchingApiData2 = async () => {
        console.log("clikedddd..");
        const uu = await AsyncStorage.getItem('name');
        try {
            await fetch(`http://10.0.2.2:7000/api/users/avgWeight/${uu}`).then(response =>
                response.json()).then(data1=>{
                    console.log('ff', data1)
                setWeightData(data1);
            })   
        } catch (err) {
            if (!response.ok) {
                console.log("Invalid cresentials or network error")
                return
            }  
            console.log("error", err)
        }
    }
    return (
        <View>
            <Text  style={styles.heading}>Blood Pressure</Text>
            <SummaryActivities values={bpData} unit='mmHg' />
            <Text style={styles.heading}>Pulse</Text>
            <SummaryActivities values={pulseData} unit='bpm' />
            <Text style={styles.heading}>Weight</Text>
            <SummaryActivities values={weightData} unit='lb' days={true} />
        </View>
    )
}
const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        color: 'red',
        fontStyle: 'normal',
        fontWeight: 'bold',
        margin: 5
    }
  });