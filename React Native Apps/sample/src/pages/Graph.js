import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { useState } from 'react';
import BpGraph from './graphs/BpGraph';
import HeartRateGraph from './graphs/HeartRateGraph';
import WeightGraph from './graphs/WeightGraph'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Graph() {
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
        <ScrollView>
        <View>
            <Text></Text>
            <View style={styles.graphContainer}>
                <BpGraph />
            </View>

            <View style={styles.graphContainer}>
                <HeartRateGraph />
                </View>

                <View style={styles.graphContainer1}>
                <WeightGraph />
                <View style={styles.container}>
                <View style={styles.subContainer}>
                <Text style={styles.text1}>weight category (BMI) = Obese Class 1</Text>
                <Text style={styles.text}>60-61 in (152 - 155 cm)</Text>
                <Text style={styles.text3}>153-180 lb (69-82 kg)</Text>
                </View>
                </View>
                </View>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    graphContainer: {
        margin: 10,
        backgroundColor: 'white',
        height: 250,
        borderRadius: 6
    },
    graphContainer1: {
        margin: 10,
        backgroundColor: 'white',
        height: 350,
        borderRadius: 6
    },
    container: {
        backgroundColor: 'skyblue',
        height: 100,
        padding: 15,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 6
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
      text1: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 5,
        marginTop: 4

    },
    text3: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 5,
        marginBottom: 4

    }
  });