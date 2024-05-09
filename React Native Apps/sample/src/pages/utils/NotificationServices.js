// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export async function requestUserPermission() {
//   try {
//     const authorizationStatus = await messaging().requestPermission();
//     const enabled = authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED || authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     console.log('Authorization status: ', authorizationStatus);

//     if (enabled) {
//       console.log('Permission granted');
//       await getFcmToken();
//     } else {
//       console.log('Permission denied');
//     }
//   } catch (error) {
//     console.log('Error requesting permission: ', error);
//   }
// }

// const getFcmToken = async () => {
//   try {
//     let fcmToken = await AsyncStorage.getItem('fcmToken');
//     console.log('Saved fcmToken:', fcmToken);

//     if (!fcmToken) {
//       const newFcmToken = await messaging().getToken();
//       console.log('New FCM token:', newFcmToken);
      
//       if (newFcmToken) {
//         await AsyncStorage.setItem('fcmToken', newFcmToken);
//       }
//     }
//   } catch (error) {
//     console.log('Error getting FCM token:', error);
//   }
// };
