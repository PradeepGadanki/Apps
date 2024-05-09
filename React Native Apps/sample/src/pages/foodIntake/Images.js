
import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native'
import jsonFood from '../../jsons/images.json'
import FishandSeafood from '../../../assets/seaFood.jpg'
import Avocado from '../../../assets/avocado.jpg'
import Berries from '../../../assets/berries.jpg'
import Broccoli from '../../../assets/broccoli.jpg'
import Lentils from '../../../assets/lentils.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Chiken from '../../../assets/chiken.jpg'
import leafyGreens from '../../../assets/leafyGreens.jpg'
import nuts from '../../../assets/nuts.jpg'
import wholegrains from '../../../assets/wholegrains.jpg'
import yogurt from '../../../assets/yogurt.jpg'

const Images = () => {
    return(
        <View style= {styles.imageContainer}>
        <Text style={styles.label}>Try this Food</Text>

        <ScrollView horizontal scrollEnabled={true}>

            <View style={styles.imageView}>
                {jsonFood && jsonFood?.map((foodDetails, index) => {
                    return (
                        <View key={index} style={styles.subContainer}>
                            <Image
                                source={foodDetails?.name == 'Fish and Seafood'? FishandSeafood: foodDetails?.name =='Lentils'? Lentils: foodDetails.name == 'Berries'? Berries: foodDetails.name == 'Avocado'? Avocado:foodDetails.name == 'Chicken'? Chiken: foodDetails.name == 'Nuts'? nuts: foodDetails.name == 'Whole Grains'? wholegrains: yogurt }
                                style={styles.image}
                            />
                            <Text style={styles.text}>{foodDetails?.name}</Text>
                        </View>
                    )
                })}
            </View>
        </ScrollView>

        </View>
    )
}

export default Images;

const styles = StyleSheet.create({
    imageView: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        //marginTop: 130,

    },
    label: {
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 140
    },
    subContainer: {
        padding: 15
    },
    image: {
        width: 140,
        height: 120
    },
    imageContainer: {
        alignItems: 'flex-end'
    },
    text:{
        alignSelf: 'center'
    }
})