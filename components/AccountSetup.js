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


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



export default function AccountSetup({ navigation, route }) {

  const { setUserId } = React.useContext(UserIdContext);


    const [fetchedProfiles, setFetchedProfiles] = useState([]);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const {userEmail, userId} = route.params;
    const [driving, setDriving] = useState(false);
    const [snooze, setSnooze] = useState(false);

    console.log(userId)
  
  
  
  const addProfile = async () => {
    try {
        const {data, error } = await supabase.from("profiles").insert( {id: userId, first_name: first_name, last_name: last_name, email: userEmail, phone: phone, driving: driving, snooze: snooze });
        console.log("data: ", data)
        console.log("error: ", error)
        setUserId(userId);
        console.log("SET USER ID: ", userId);
        navigation.navigate("Main", { userId: userId }); // Add this line to navigate to mainpage screen
    } catch (err) {
      console.log("HEY APPS BROKEN BOSS", err.message)
    }
  }
  
  
    return (
    <SafeAreaView style={styles.container}>
        <Pressable onPress={() => navigation.navigate('Sign')}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>go back</Text>
                </View>
            </Pressable>
        <View style={styles.header}>
            <Text style = {styles.title}>make a profile</Text>
            <View style={styles.textInput}>
            <TextInput
                style={styles.input}
                placeholder="first name"
                value={first_name}
                onChangeText={setFirstName}/>
            </View>
            <View style={styles.textInput}>
                <TextInput
                style={styles.input}
                placeholder="last name"
                value={last_name}
                onChangeText={setLastName}/>
            </View>
            <View style={styles.textInput}>
                <TextInput
                style={styles.input}
                placeholder="phone"
                value={phone}
                onChangeText={setPhone}/>
            </View>
            <View style={styles.column}>
            <View style={styles.authButton}>
                <Pressable style={styles.pressable} onPress={addProfile}>
                <Text style={styles.authText}>finish signing up</Text>
                </Pressable>
            </View>
            </View>
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
    button: {
        backgroundColor: colors.darkpurple,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        justifyContent: "flex-start"
      },
    header: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: 'center',
        alignSelf: "center",
        alignContent: "center",
        padding: 50,
        backgroundColor: colors.background,
        flex: 1,

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
    paddingLeft: 10
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