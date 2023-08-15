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
        navigation.navigate("LocationPermission"); 
    } catch (err) {
      console.log("HEY APPS BROKEN BOSS", err.message)
    }
  }
  
  
  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.headerSection}>
              <Pressable onPress={() => navigation.navigate('Sign')}>
                  <View style={styles.button}>
                      <AntDesign name="left" size={24} color="white" />
                  </View>
              </Pressable>
          </View>
          <View style={styles.topSection}>
              <Text style={styles.title}>make a profile</Text>
          </View>
  
        <View style={styles.middleSection}>
            <View style={styles.textInput}>
            <TextInput
                style={styles.input}
                placeholder="first name"
                value={first_name}
                onChangeText={setFirstName}
                autoCorrect={false}
                />
            </View>
            <View style={styles.textInput}>
                <TextInput
                style={styles.input}
                placeholder="last name"
                value={last_name}
                onChangeText={setLastName}
                autoCorrect={false}
                />
            </View>
            <View style={styles.textInput}>
                <TextInput
                style={styles.input}
                placeholder="phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType='phone-pad'
                />
            </View>
            <View style={styles.bottomSection}>
              <View style={styles.authButton}>
                <Pressable style={styles.pressable} onPress={addProfile}>
                    <Text style={styles.authText}>next</Text>
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
      alignSelf: 'flex-start',  // Align back button to the left
      backgroundColor: colors.darkpurple,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 4,
    },
  header: {
    flex: 1,
    justifyContent: "center", // This should center the inputs vertically
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
    column: {
      justifyContent: "space-evenly",
      flexDirection: "column",
      alignItems: 'center',
      alignSelf: "center",
      alignContent: "center",
      paddingLeft: 10,
      backgroundColor: colors.background,
      flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topSection: {
    flexDirection: "row",
    flex: .5,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerSection: {
    flex: .5,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  middleSection: {
    flexDirection: "column",
    flex: 1.5,  // Allocate more space for this section
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
bottomSection: {
    flex: 1,
    justifyContent: 'flex-end', 
    alignItems: 'center',
    marginBottom: 20,
},
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    width: '100%',
  },
  title: {
    fontFamily: "helveticaneue",
    fontWeight: "bold",
    fontSize: 40,
    color: colors.darkpurple,
  },
  authButton: {
    flexDirection: "row",
    backgroundColor: Themes.colors.darkpurple,
    borderRadius: 999999,
    alignItems: "flex-end",
    alignContent: "flex-end",
    alignSelf: "flex-end",
    width: windowWidth * 0.8,
    height: windowHeight * .07,
    justifyContent: "center",
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
    flex: 1,
    
  },
  authText: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 13,
  },
  });