import { FlatList, Text, Dimensions, Image, View, StyleSheet, TextInput } from "react-native";
import { Icons, Themes } from "../assets/Themes";
import { useState, useEffect } from "react";
import * as React from 'react';
import Header from "./header";
import {AntDesign} from '@expo/vector-icons';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigation } from "@react-navigation/native";
import images from "../assets/Images/images";
import { colors } from "../assets/Themes/colors";
import supabase from "../utils/supabaseClient";
import { SafeAreaView } from "react-native-safe-area-context";
import {Input, Button} from 'react-native-elements';
import UserIdContext from '../UserIdContext';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LOCATION_TASK_NAME = 'background-speed-task';


export default function LocationPermission({ navigation, route }) {

  const { userId } = React.useContext(UserIdContext);

  console.log(userId)

  const requestLocationPermission = async () => {
    let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus !== 'granted') {
      setErrorMsg('Background permission denied');
      return;
    }

    // Start the location updates
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 3 * 1000,
      distanceInterval: 10000,
      showsBackgroundLocationIndicator: false,
    });

    navigation.navigate("Main");
};

  const locationExplanation = "Copilot uses a battery-conscious, low-latency speed detector so we know when you and your friends can radio into each other!";
  const locationFurtherExplanation = "We care a lot about privacy and security. We only hold your speed, not your location, and will not use this information for anything other than driving detection."
  
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>location permission</Text>
        </View>
        <View style={styles.logoBox}>
            <Image source={images.logo} style={styles.logo} />
        </View>
        <View style={styles.descriptionBox}>
            <Text style={styles.subtitle}>{locationExplanation}</Text>
            <Text style={styles.smallText}>{locationFurtherExplanation}</Text>
        </View>
        <View style={styles.buttonBox}>
            <Pressable style={styles.authButton} onPress={requestLocationPermission}>
                <Text style={styles.authText}>give location permission</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  );
  }
  
  const styles = StyleSheet.create({
    headerIcons: {
      height: windowWidth * 0.05,
      width: windowWidth * 0.05,
      color: "white",
    },
    logo: {
      width: windowWidth * 0.5,
      height: windowWidth * 0.5,  // Adjusted for a square aspect ratio, modify if needed
      resizeMode: 'contain', // This will ensure the entire image is visible
    }, 
    button: {
        backgroundColor: colors.darkpurple,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        justifyContent: "flex-start"
      },
    buttonBox: {
      justifyContent: "center",
      alignItems: 'center',
      padding: 10,
    },
    header: {
      justifyContent: "center",
      alignItems: 'center',
      padding: 20, // Reduced padding
      paddingTop: 50,
    },
    logoBox: {
      justifyContent: "center",
      alignItems: 'center',
    },
    column: {
      justifyContent: "space-between",
      flexDirection: "column",
      alignItems: 'center',
      alignSelf: "center",
      alignContent: "center",
      paddingLeft: 10,
      backgroundColor: colors.background,
  },
  container: {
   flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
},
  title: {
    fontFamily: "helveticaneue",
    fontWeight: "bold",
    fontSize: 50,
    color: colors.darkpurple,
    paddingLeft: 10,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "helveticaneue",
    fontWeight: "bold",
    fontSize: 20,
    padding: 20,
    color: colors.darkpurple,
    textAlign: "center",

  },
  smallText: {
    fontFamily: "helveticaneue",
    fontWeight: "bold",
    fontSize: 12,
    color: colors.darkpurple,
    textAlign: "center",
    padding: 20,


  },
  descriptionBox: {
    justifyContent: "center",
    alignItems: 'center',
    padding: 10, 
  },
  authButton: {
    flexDirection: "row",
    backgroundColor: Themes.colors.darkpurple,
    borderRadius: 999999,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: windowWidth * 0.8,
    height: windowHeight * .07,
    justifyContent: "center",
    marginTop: 10,
  },
  textInput: {
    flexDirection: "row",
    backgroundColor: Themes.colors.white,
    borderRadius: 999999,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: windowWidth * 0.8,
    height: windowHeight * .05,
    justifyContent: "center",
    marginTop: 10,
  },
  pressable: {
    alignSelf: "center",
    justifyContent: "center",
    
  },
  authText: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
  },
  });