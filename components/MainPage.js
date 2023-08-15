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

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Body />
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
