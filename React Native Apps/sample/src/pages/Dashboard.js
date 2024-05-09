import { StyleSheet, Text, View, TextInput, Button, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard() {
    const navigation = useNavigation()
        
    const handleOnClick = (screenType) => {
      console.log('screenType', screenType)
      if (screenType == 'NewMeasurement') {
        navigation.navigate('NewMeasurement')
      } else if (screenType == "Insights") {
        navigation.navigate('Insights')
      } else if (screenType == "FoodIntake") {
        navigation.navigate('FoodSearch')
      }else if (screenType == "TrendCheck") {
        navigation.navigate('TrendCheck')
      }else if (screenType == "More") {
        navigation.navigate('More')
      }
      };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonProperties} onPress={()=>handleOnClick('NewMeasurement')}>
                <Text style={styles.buttonText}>New Measurement</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonProperties} onPress={()=>handleOnClick('Insights')}>
                <Text style={styles.buttonText}>Insights</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonProperties} onPress={()=>handleOnClick('FoodIntake')}>
                <Text style={styles.buttonText}>Food Intake</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonProperties} onPress={()=>handleOnClick('TrendCheck')}>
                <Text style={styles.buttonText}>Trend Check</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonProperties} onPress={()=>handleOnClick('More')}>
                <Text style={styles.buttonText}>More</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
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
      marginBottom: 16,
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
      borderRadius: 10,
      color: 'blue',
      backgroundColor:'rgb(37, 150, 190)',
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginLeft:20,
      marginRight:20,
      height: 90,
      marginTop: "auto",
      marginBottom: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'black',
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });



