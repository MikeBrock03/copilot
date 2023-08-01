import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from 'expo-font';
import BackgroundGeolocation from "@transistorsoft/react-native-background-geolocation";

import MainPage from "./components/MainPage";
import AuthPage from "./components/AuthPage";
import AccountSetup from './components/AccountSetup';
import PhoneNumberSearch from "./components/PhoneNumberSearch";
import FriendRequests from "./components/FriendRequests";
import UserIdContext from './UserIdContext';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'helveticaneue': require('./assets/Fonts/helveticaneue.ttf'),
  });

  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    // Define your event listeners here.
    let startSpeedTime = null;
    const SPEED_THRESHOLD = 15;
    const TIME_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

    BackgroundGeolocation.onLocation(location => {
      console.log('[location] -', location);

      if (location.speed > SPEED_THRESHOLD) {
        if (startSpeedTime === null) {
          // Start the timer
          startSpeedTime = Date.now();
        } else if (Date.now() - startSpeedTime >= TIME_THRESHOLD) {
          console.log('User has been driving for more than 5 minutes');
          // Do something when user has been driving for 5 minutes

          // Reset the timer
          startSpeedTime = null;
        }
      } else {
        // Reset the timer if speed drops below threshold
        startSpeedTime = null;
      }
    });

    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopTimeout: 1,
      debug: true, // Debug sounds & notifications.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,
      startOnBoot: true,
      batchSync: false,
      autoSync: true,
      headers: {
        "X-FOO": "bar"
      },
      enableHeadless: true,
      heartbeatInterval: 60
    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  
    // Don't forget to remove listeners!
    return () => {
      BackgroundGeolocation.removeListeners();
    };
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
