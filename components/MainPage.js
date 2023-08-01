import { FlatList, Text, Dimensions, Image, View, StyleSheet } from "react-native";
import { Themes } from "../assets/Themes";
import * as React from 'react';
import {AntDesign} from '@expo/vector-icons';
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./header";
import Body from "./body";
import Questions from "./questions";
import { colors } from "../assets/Themes/colors";
import FriendList from "./FriendList";
import FriendRequests from "./FriendRequests";
import { supabase } from '../utils/supabaseClient'; 
import UserIdContext from '../UserIdContext';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MainPage({ navigation, route }) {

  const { userId } = React.useContext(UserIdContext);
  console.log("USERID START PAGE", userId);

  const doesUserExist = (user) => {
    return false;
  }

  const goToOtherScreen = () => navigation.navigate("Sign");

  // SPEED CALCULATION VERY IMPORTANT

  const [speed, setSpeed] = useState(0);
  const speedLimit = 30; // mph
  const duration = 5 * 60 * 1000; // 5 minutes in milliseconds
  let timer;

  useEffect(() => {
    if (typeof DeviceMotionEvent !== "undefined") {
      const handleMotion = async (event) => {
        const { x, y, z } = event.accelerationIncludingGravity;
        const calculatedSpeed = calculateSpeed(x, y, z);

        setSpeed(calculatedSpeed);

        if (calculatedSpeed > speedLimit) {
          if (!timer) {
            timer = setTimeout(async () => {
              await updateSpeedStatusInSupabase(true);
            }, duration);
          }
        } else {
          if (timer) {
            clearTimeout(timer);
            timer = null;
            await updateSpeedStatusInSupabase(false);
          }
        }
      };

      window.addEventListener("devicemotion", handleMotion);

      return () => {
        window.removeEventListener("devicemotion", handleMotion);
        clearTimeout(timer);
      };
    }
  }, []);

  const calculateSpeed = (x, y, z) => {
    // Implement speed calculation logic here when ready
    return Math.random() * 50;
  };

  const updateSpeedStatusInSupabase = async (status) => {
    const { error } = await supabase
      .from("profiles")
      .update({ speed: status })
      .eq("id", userId);

    if (error) {
      console.error("Failed to update speed status:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Body speed={speed.toFixed(2)} />
      <Questions />
      <Pressable
        style={styles.friendRequestButton}
        onPress={() => {
          console.log("USER ID WHEN NAVIGATING:", userId)
          navigation.navigate('FriendRequests')}
        }
      >
        <Text style={styles.friendRequestText}>Friend Requests</Text>
      </Pressable>
      <FriendList userId={userId} />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  friendRequestButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.darkpurple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendRequestText: {
    color: 'white',
    fontSize: 16,
  },
});
