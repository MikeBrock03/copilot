import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from 'expo-font';
import MainPage from "./components/MainPage";
import AuthPage from "./components/AuthPage";
import AccountSetup from './components/AccountSetup';
import PhoneNumberSearch from "./components/PhoneNumberSearch";
import FriendRequests from "./components/FriendRequests";
import UserIdContext from './UserIdContext';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';


const Stack = createNativeStackNavigator();

const LOCATION_TASK_NAME = 'background-speed-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { locations }, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  const speed = locations[0].coords.speed;  // Gets speed of the most recent location update
  console.log('Received speed:', speed);
  // Handle the speed here (e.g., send to server, store locally, etc.)
});


export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  let [fontsLoaded] = useFonts({
    'helveticaneue': require('./assets/Fonts/helveticaneue.ttf'),
  });

  const [userId, setUserId] = useState(null);
  

  // TODO: change this to when they first make their account
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Foreground permission denied');
        return;
      }

      // Request background permissions
      let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        setErrorMsg('Background permission denied');
        return;
      }

      // 2. Start location updates
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,  // Good balance between accuracy and power consumption
        timeInterval: 4 * 60 * 1000,  // Update every 4 minutes
        distanceInterval: 10000,  // Update every 100 meters of movement
        showsBackgroundLocationIndicator: false,  // No need to show the background location indicator
    });    
    })();
  }, []);


  
  
  return (
    <View style={styles.container}>
      <UserIdContext.Provider value={{userId, setUserId}}>
        <NavigationContainer styles={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name="Sign" component={AuthPage} options={{headerShown: false}} />
            <Stack.Screen name="AccountSetup" component={AccountSetup} options={{headerShown: false}} />
            <Stack.Screen name="PhoneNumberSearch" component={PhoneNumberSearch} options={{headerShown: false}}/>
            <Stack.Screen name="Main" component={MainPage} options={{headerShown: false}}/>
            <Stack.Screen name="FriendRequests" component={FriendRequests} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
        
      </UserIdContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
