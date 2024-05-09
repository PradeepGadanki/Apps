import Navigation from './Navigation'
import 'react-native-gesture-handler';
import { useEffect } from 'react';
// import { Notifications } from 'expo';
// import * as Permissions from 'expo-permissions';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  // useEffect(() => {
  //   registerForPushNotifications();
  // }, []);

  // const registerForPushNotifications = async () => {
  //   // const { status: existingStatus } = await Notifications.getPermissionsAsync(); // Use Notifications.getPermissionsAsync instead
  //   // let finalStatus = existingStatus;

  //   // if (existingStatus !== 'granted') {
  //   //   const { status } = await Notifications.requestPermissionsAsync(); // Use Notifications.requestPermissionsAsync instead
  //   //   finalStatus = status;
  //   // }

  //   // if (finalStatus !== 'granted') {
  //   //   console.log('Permission to receive push notifications denied');
  //   //   return;
  //   // }

  //   const token = (await Notifications.getExpoPushTokenAsync()).data;
  //   console.log('Expo Push Toksen  :', token);

  //   // Store the token and user ID on the server
  //   //sendTokenToServer(token);
  // };

  // const sendTokenToServer = async (token) => {
  //   // Retrieve user ID from AsyncStorage (you may have your own user authentication mechanism)
  //   const userId = await AsyncStorage.getItem('userId');

  //   // Make a POST request to your server to store the token and user ID
  //   fetch('http://your-server-url.com/store-push-token', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ userId, token }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Failed to send push token to server');
  //       }
  //       console.log('Push token sent to server successfully');
  //     })
  //     .catch((error) => {
  //       console.error('Error sending push token to server:', error);
  //     });
  // };
  return (
   
    <Navigation />
  );
}
