import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from 'expo-font';
import MainPage from "./components/MainPage";
import AuthPage from "./components/AuthPage";
import AccountSetup from './components/AccountSetup';
import PhoneNumberSearch from "./components/PhoneNumberSearch";
import SettingsPage from "./components/SettingsPage";
import FriendRequests from "./components/FriendRequests";
import UserIdContext from './UserIdContext';
import LocationPermission from "./components/LocationPermission";
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

  useEffect(() => {
    async function requestLocationUpdates() {
      try {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 3 * 1000,
          distanceInterval: 10000,
          showsBackgroundLocationIndicator: false,
        });
      } catch (error) {
        console.error("Error starting location updates:", error);
      }
    }
    requestLocationUpdates();
  }, []);  
  
  return (
    <View style={styles.container}>
      <UserIdContext.Provider value={{userId, setUserId}}>
        <NavigationContainer styles={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name="Sign" component={AuthPage} options={{headerShown: false}} />
            <Stack.Screen name="AccountSetup" component={AccountSetup} options={{headerShown: false}} />
            <Stack.Screen name="LocationPermission" component={LocationPermission} options={{headerShown: false}} />
            <Stack.Screen name="PhoneNumberSearch" component={PhoneNumberSearch} options={{headerShown: false}}/>
            <Stack.Screen name="Main" component={MainPage} options={{headerShown: false}}/>
            <Stack.Screen name="FriendRequests" component={FriendRequests} options={{headerShown: false}} />
            <Stack.Screen name="SettingsPage" component={SettingsPage} options={{headerShown: false}}/>
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
