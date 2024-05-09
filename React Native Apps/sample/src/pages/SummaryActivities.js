import { StyleSheet, Text, View, TextInput, Button, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SummaryActivities({values, unit, days}) {
   

    const handleOnClick = (selectedTab) => {
        setActiveTab(selectedTab)
    }
    return (
        <View>
            <View style={styles.body}>
                <Text>
                    {days? 15 :7} Days Average
                </Text>
                <Text>
                    {values?.last7Days} {unit}
                </Text>
            </View>
            <View style={styles.body}>
                <Text>
                {days? 30 :14} Days Average
                </Text>
                <Text>
                    {values?.last14Days} {unit}
                </Text>
            </View>
            <View style={styles.body}>
                <Text>
                {days? 2 :30} {days? "months": "Days"} Average
                </Text>
                <Text>
                {values?.last30Days} {unit}
                </Text>
            </View>
            <View style={styles.body}>
                <Text>
                {days? 3 :90}  {days? "months": "Days"} Average
                </Text>
                <Text>
                {values?.last90Days} {unit}
                </Text>
            </View>
            <View style={styles.body}>
                <Text>
                    All-time Average
                </Text>
                <Text>
                {values?.lastAllDays} {unit}
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        color: 'red',
        fontStyle: 'normal',
        fontWeight: 'bold'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'lightblue',
        padding: 6,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 5,
    }
  });