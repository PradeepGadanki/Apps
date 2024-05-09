import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Dimensions, TouchableOpacity } from 'react-native';

export default function More() {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.childContainer}>
                    <Text style={styles.text}>Daily Reminder</Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.text}>Notifications</Text>
                </View>
            </View>

            <Text style={styles.heading}>
                Discovery
            </Text>

            <View style={styles.container}>
                <View style={styles.childContainer}>
                    <Text style={styles.text}>Blood Pressure Categories
                    {'\n'}Reading the new blood pressure guidelines
                    </Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.text}>Natural ways to  {'\n'}Lower Blood Pressure</Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.text}>Healthy eating to lower your  {'\n'}blood pressure</Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.text}>How nighttime blood pressure may be  {'\n'}more important than Daytime readings</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        //flex: 1,
        //justifyContent: 'center',
        // alignItems: 'center',
        // padding: 16,
    },
    container: {
        //flex:1,
        flexDirection: 'column',
        //alignContent: 'center'

    },
    childContainer: {
        marginTop: 15,
        backgroundColor: 'lightblue',
        height: 60,
        justifyContent: 'center',
        paddingLeft: 15,
       width: Dimensions.get('window').width
    },
    heading: {
        marginTop: 50,
        marginBottom: 20,
        fontSize: 20,
    },
    text : {
        fontSize: 18,
        fontWeight: '500'
    }
});
