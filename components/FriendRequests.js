import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, SafeAreaView } from "react-native";
import { colors } from "../assets/Themes/colors";
import supabase from "../utils/supabaseClient";
import {useNavigation} from '@react-navigation/native';
import { Pressable } from "react-native";
import UserIdContext from '../UserIdContext';


export default function FriendRequests() {

  const navigation = useNavigation();

  
  const [loading, setLoading] = useState(true);
  const [userProfiles, setUserProfiles] = useState({});
  const { userId } = React.useContext(UserIdContext);
  
  console.log("USER ID IN THE FRIEND REQUEST PAGE", userId);

  const [friendRequests, setFriendRequests] = useState([]);

  async function fetchFriendRequests(userId) {
    console.log("USER ID IN FETCH FRIENDS", userId);
    try {
      const { data, error } = await supabase
        .from("friend_requests")
        .select("sender_id")
        .eq("receiver_id", userId)
        .eq("status", 0); // assuming 0 represents pending requests
      if (error) {
        throw error;
      }
      console.log("DATA FROM FETCH FRIEND", data)
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchUserProfile(userId) {
    console.log("USER ID IN FETCH USER PROFILE: ", userId);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", userId);
  
      if (error) {
        throw error;
      }
      console.log("DATA FROM FETCH USER: ", data);
      return data; // Returns the first (and likely only) result
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }
  


  async function handleFriendRequest(senderId, accepted) {
    try {
      const status = accepted ? 1 : 2; // assuming status 1 is accepted, 2 is rejected
      const { error } = await supabase
        .from("friend_requests")
        .update({ status: status })
        .eq("sender_id", senderId)
        .eq("receiver_id", userId);

      if (error) throw error;

      if (accepted) {
        // If the request is accepted, add a new friendship to the friendships table
        const { data: friendship, error: friendshipError } = await supabase
          .from('friendships')
          .insert([
            { user_id1: senderId, user_id2: userId },
          ]);
        if (friendshipError) throw friendshipError;
        console.log("New friendship added: ", friendship);
      }

      // Refresh the friend requests
      const requests = await fetchFriendRequests(userId);
      setFriendRequests(requests);
    } catch (error) {
      console.error("Error handling friend request:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (userId) {
          const friendRequestsData = await fetchFriendRequests(userId);
          setFriendRequests(friendRequestsData);
  
          // Fetch user profiles for each friend request
          const profiles = {};
          for (const request of friendRequestsData) {
            console.log("REQUEST.SENDER_ID", request.sender_id);
            const profile = await fetchUserProfile(request.sender_id);
            console.log('Profile:', profile); // Check if profiles are fetched correctly
            profiles[request.sender_id] = profile;
            console.log("Profiles array: ", profiles[request.sender_id]);
          }
          setUserProfiles(profiles);
          console.log("userProfiles array:", userProfiles);
          console.log(userProfiles);
  
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    }
    fetchData();
  }, [userId]);
  
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable onPress={() => navigation.navigate('Main', { userId: userId })}>
          <View style={styles.backButton}>
            <Text style={styles.backButtonText}>go back</Text>
          </View>
        </Pressable>
        <Text style={styles.title}>Requests</Text>
        {friendRequests.length === 0 ? (
          <Text style={styles.noRequestsText}>No friend requests now!</Text>
        ) : (
          friendRequests.map((request) => {
            console.log("request: ", request);
            console.log("userProfiles: ", userProfiles);
            console.log("attempt at pulling first name: ", userProfiles[request.sender_id][0]?.first_name);
            return (
            <View key={request.id} style={styles.requestRow}>
              <Text style={styles.senderText}>
                {userProfiles[request.sender_id][0]?.first_name} {userProfiles[request.sender_id][0]?.last_name} wants to be your friend</Text>
              <View style={styles.buttons}>
                <Pressable
                  style={[styles.button, styles.acceptButton]}
                  onPress={() => handleFriendRequest(request.sender_id, true)}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.rejectButton]}
                  onPress={() => handleFriendRequest(request.sender_id, false)}
                >
                  <Text style={styles.buttonText}>Reject</Text>
                </Pressable>
              </View>
            </View>
          )})  
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.darkpurple,
    textAlign: 'center',
    marginTop: 15,
  },
  button: {
    backgroundColor: colors.darkpurple,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  backButton: {
    marginLeft: 10,
    backgroundColor: colors.darkpurple,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRequestsText: {
    fontSize: 16,
    color: colors.darkpurple,
    textAlign: 'center',
    marginTop: 15,
  },
  requestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: colors.lightgrey,
    borderBottomWidth: 1,
  },
  senderText: {
    flex: 1,
    color: colors.darkpurple,
  },
  buttons: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: colors.green,
  },
  rejectButton: {
    backgroundColor: colors.red,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

