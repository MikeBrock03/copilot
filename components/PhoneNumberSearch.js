import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { colors } from "../assets/Themes/colors";
import supabase from "../utils/supabaseClient";
import {useNavigation} from '@react-navigation/native';
import { Pressable } from "react-native";

import UserIdContext from '../UserIdContext';


export default function PhoneNumberSearch() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [result, setResult] = useState(null);

  const { userId } = React.useContext(UserIdContext);

  console.log("USER ID IN THE PHONE SEARCH PAGE", userId);


  const searchPhoneNumber = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("phone", phoneNumber);
  
      if (error) throw error;
      if (!data || data.length === 0) {
        Alert.alert("Not found", "Phone number not found.");
      } else if (data.length > 1) {
        Alert.alert("Error", "Multiple users found for this phone number.");
      } else {
        setResult(data[0]);
      }
    } catch (err) {
      Alert.alert("Error", "An error occurred while searching for the phone number.");
    }
  };

  async function sendFriendRequest(senderId, receiverId) {
    console.log("SENDER ID:", senderId, "RECEIVERID:", receiverId );
    try {
      const { data, error } = await supabase
        .from("friend_requests")
        .insert([
          { sender_id: senderId, receiver_id: receiverId, status: 0 } // Assuming status 0 is pending
        ]);

      if (error) throw error;
      Alert.alert("Success", "Friend request sent successfully!");
    } catch (error) {
      console.error("Error sending friend request:", error.message);
      Alert.alert("Error", "An error occurred while sending the friend request.");
    }
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Main', { userId: userId })}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>go back</Text>
        </View>
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={searchPhoneNumber}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {result && (
        <View style={styles.resultContainer}>
          <Text>{result.first_name}</Text>
          <Text>{result.last_name}</Text>
          <Text>{result.phone}</Text>
          <Pressable onPress={() => sendFriendRequest(userId, result.id)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add Friend</Text>
            </View>
          </Pressable>
        </View>
      )}
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
  input: {
    width: "80%",
    borderColor: colors.darkpurple,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.darkpurple,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
  },
});
