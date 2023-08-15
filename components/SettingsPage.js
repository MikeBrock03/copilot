import React from "react";
import { StyleSheet, View, Text, Pressable, useState } from "react-native";
import { colors } from "../assets/Themes/colors";
import { useNavigation } from "@react-navigation/native";
import UserIdContext from '../UserIdContext';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-speed-task'; // Place the actual task name you've defined

export default function SettingsPage() {
  const navigation = useNavigation();
  const { userId } = React.useContext(UserIdContext);

  const fast = 2 * 1000; // TODO: change to 30 seconds after testing
  const medium = 120 * 1000; // every 2 minutes
  const slow = 300 * 1000 // every 5 minutes

  console.log(userId);

  const adjustLocationInterval = async (newInterval) => {
    try {
        const { status } = await Location.getBackgroundPermissionsAsync();

        if (status !== 'granted') {
            console.log('No location permission');
            alert('Please grant location permission to adjust speed updates.');
            return; // Exit the function if permission isn't granted.
        } else {
            console.log('Location permission granted');
        }

        // If permissions are granted, proceed with the location updates.
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: newInterval,
            distanceInterval: 20,
            showsBackgroundLocationIndicator: false,
        });
    } catch (error) {
        console.error("Error adjusting location interval:", error);
    }
    }


  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.buttonText}>Go back</Text>
      </Pressable>

      <Text style={styles.title}>Choose Speed Update Frequency</Text>
      <Text style={styles.subtitle}>Frequent updates give accurate estimates, but slow updates save battery</Text>

      <Pressable onPress={() => adjustLocationInterval(fast)} style={styles.optionButton}>
        <Text style={styles.optionText}>Fast</Text>
      </Pressable>
      <Pressable onPress={() => adjustLocationInterval(medium)} style={styles.optionButton}>
        <Text style={styles.optionText}>Regular</Text>
      </Pressable>
      <Pressable onPress={() => adjustLocationInterval(slow)} style={styles.optionButton}>
        <Text style={styles.optionText}>Slow</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.darkpurple,
  },
  optionButton: {
    backgroundColor: colors.darkpurple,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  subtitle: {
    fontFamily: "helveticaneue",
    fontWeight: "bold",
    fontSize: 15,
    padding: 10,
    color: colors.darkpurple,
    textAlign: "center",

  },
  optionText: {
    color: colors.white,
    fontWeight: "bold",
  },
  button: {
    position: 'absolute',
    top: 50,
    left: 10,
    backgroundColor: colors.darkpurple,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
