import { FlatList, Text, Dimensions, Image, View, StyleSheet } from "react-native";
import { Icons, Themes } from "../assets/Themes";
import * as React from 'react';
import { useState, useEffect } from "react";
import Header from "./header";
import {AntDesign} from '@expo/vector-icons';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigation } from "@react-navigation/native";
import images from "../assets/Images/images";
import { colors } from "../assets/Themes/colors";
import supabase from "../utils/supabaseClient";
import {Input, Button} from 'react-native-elements';
import FriendRequests from "./FriendRequests";
import UserIdContext from '../UserIdContext';
import { Linking } from 'react-native';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function FriendList() {
  const [friends, setFriends] = useState([]);
  const { userId } = React.useContext(UserIdContext);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFriends();
  }, [userId]);

  const fetchFriends = async () => {
    try {
      let { data: friendshipsData, error } = await supabase
        .from('friendships')
        .select(`user_id1, user_id2`)
        .or(`user_id1.eq.${userId},user_id2.eq.${userId}`);

      if (error) throw error;

      const friendIds = friendshipsData.map(f => f.user_id1 === userId ? f.user_id2 : f.user_id1);
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, phone')
        .in('id', friendIds);

      if (userError) throw userError;

      setFriends(userData);
    } catch (error) {
      console.error("Error fetching friends: ", error);
    }
  }

  const FriendCard = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.profileback}>
        <Image style={styles.logo} source={images.profile} />
      </View>
      <View style={styles.row}>
        <Text numberOfLines={1}>{item.first_name} {item.last_name}</Text>
        <View style={[styles.row, styles.buttonContainer]}>
          <Pressable onPress={() => Linking.openURL(`tel:${item.phone}`)}>  
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>call</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>snooze</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={friends}
      renderItem={FriendCard}
      keyExtractor={item => item.id.toString()}
    />
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.darkpurple,
    borderRadius: 99999,
    flex: 1,
    display: "inlike-flex",
    alignItems: "center", 
    justifyContent: "center",
    width: windowWidth * .15,
    height: windowHeight *.05,
    marginRight: 10,
    
   
},
buttonTitle: {
  fontFamily: "helveticaneue",
  fontSize: 14,
  color: colors.white,
  fontWeight: "bold",
},
  profileback: {
      backgroundColor: colors.white,
      borderRadius: 99999,
      width: undefined,
      height: windowHeight *.07,
      display: "inlike-flex",
      alignItems: "center", 
      justifyContent: "center",
      aspectRatio: 1 / 1,

  },
  row: {
      flexDirection: "row",
      alignContent: "space-between",
      alignSelf: "flex-start",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      backgroundColor: colors.background,
      flex: 1,
      
  },
  subtitle: {
    fontFamily: "helveticaneue",
    fontSize: 20,
    color: colors.darkpurple,
    paddingLeft: 10
},
  column: {
      justifyContent: "space-between",
      flexDirection: "column",
      alignContent: "flex-start",
      alignSelf: "center",
      paddingLeft: 10,
      backgroundColor: colors.background,
  },
  logo: {
      width: "70%",
      height: undefined,
      aspectRatio: 1 / .9,
      justifyContent: "space-between",
      alignSelf: "center",
  }, 
  buttonContainer: {
      flexDirection: 'row',
      marginLeft: 10,
      flex: 1,
    },
});




