import { StyleSheet, Text, View, ScrollView, Linking } from 'react-native';
import { useState } from 'react';
import TrendCheckGraph from './trendcheck/TrendCheckGraph'
import TrendCheckGraph1 from './trendcheck/TrendCheckGraph1'
import Td from './trendcheck/Td.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TrendCheck() {

const phoneNumber = '+16057282189'
  const handleCallPress = () => {
    // Check if the device supports phone call functionality
    Linking.openURL(`tel:${phoneNumber}`);
//     Linking.canOpenURL(`tel:${phoneNumber}`)
//       .then((supported) => {
//         if (!supported) {
//           console.log(`Phone call to ${phoneNumber} is not supported on this device`, supported);
//         } else {
//           // Open the phone dialer with the specified phone number
//           return Linking.openURL(`tel:${phoneNumber}`);
//         }
//       })
//       .catch((error) => console.error('An error occurred:', error));
     };

//   return (
//     <View>
//       <Button title={`Call ${phoneNumber}`} onPress={handleCallPress} />
//     </View>
//   );



    return (
        <ScrollView>
            <View>
            <Text style={{alignSelf:'center', fontWeight:"bold", fontSize: 17, marginTop: 8}}>Blood Pressure</Text>
                <View style={styles.graphContainer}>
                    {/* <TrendCheckGraph1 /> */}
                    <Td />
                </View>
                <View style={styles.container}>
                <Text style={styles.text1}>The line graph depicts an upward in blood pressuere (BP) over recent days, suggesting a potential increase in these vital signs in the near future.</Text>
                </View>
                <Text style={{alignSelf:'center', fontWeight:"bold", fontSize: 17, marginTop: 8}}>Heart Rate</Text>
                <View style={styles.graphContainer}>
                    {/* <TrendCheckGraph1 /> */}
                    <TrendCheckGraph1 />
                </View>
                <View style={styles.container}>
                <Text style={styles.text1}>The line graph depicts an upward in heart rate over recent days, suggesting a potential increase in these vital signs in the near future.</Text>
                </View>
                <View style={styles.graphContainer1}>
                <Text style={{alignSelf:'center', fontWeight:"bold", fontSize: 17, marginTop: 8}}>Daily Tracking</Text>
                    <TrendCheckGraph />
                </View>
                <View style={styles.container}>
                <Text style={styles.text1}>The line graph depicts an upward in blood pressuer (BP) over recent days, suggesting a potential increase in these vital signs in the near future.</Text>
                </View>
                <View style={styles.container}>
                <Text style={styles.text2}>Notifications</Text>
                </View>
                <View style={styles.container}>
                <Text style={styles.text2} onPress={handleCallPress}>Call a doctor</Text>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    graphContainer: {
        margin: 10,
        backgroundColor: 'white',
        height: 350,
        borderRadius: 6
    },
    graphContainer1: {
        //margin: 10,
        backgroundColor: 'white',
        height: 350,
        borderRadius: 6
    },
    container: {
        backgroundColor: 'skyblue',
        //height: 100,
        padding: 15,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 10
    },
    subContainer: {
        backgroundColor: 'white',
        borderRadius: 6,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 5

    },
    text2: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 5,
        //marginTop: 4,
        justifyContent: "center",
        

    },
    text3: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 5,
        marginBottom: 4

    }
});