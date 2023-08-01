import 'react-native-url-polyfill/auto';
import * as React from 'react';
import { StyleSheet, Text, Image, Dimensions, View, TextInput } from "react-native";
import { Themes } from "../assets/Themes";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import SignInHeader from "./SignInHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../assets/Themes/colors";
import supabase from '../utils/supabaseClient';
import UserIdContext from '../UserIdContext';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AuthPage( { navigation }) {

  const { setUserId } = React.useContext(UserIdContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signUpUser = async () => {
    try {
      console.log("email", email);
      console.log("password", password);
      const { data, error, user, session } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log("SIGN UP DATA", data);
  
      if (data && data.user) {
        console.log("USER ID PULLED OUT", data.user.id);
        navigation.navigate("AccountSetup", { userEmail: email, userId: data.user.id }); 
      } else {
        if (error) {
          console.log("Sign up error:", error.message);
        } else {
          console.log("Sign up error: data or data.user is null");
        }
      }  
    } catch (error) {
      console.log("Error during sign up:", error.message);
    }
  };
  

  const loginUser = async () => {
    try {
      console.log("email", email);
      console.log("password", password);
      const { data, error, user, session } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("data", data);
      console.log("user: ", user);
  
      if (data && data.user) {
        setUserId(data.user.id);
        navigation.navigate("Main");
      } else {
        if (error) {
          console.log("Error during sign in:", error.message);
        } else {
          console.log("Error during sign in: data or data.user is null");
        }
        // You can add any custom error message or notification to inform the user here.
      }
  
    } catch (error) {
      console.log("Error during sign in:", error.message);
      // You can add any custom error message or notification to inform the user here.
    }
  }
  


  return (
    <SafeAreaView style={styles.container}>
      <SignInHeader />
      <View style={styles.textInput}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}/>
      </View>
        <View style={styles.textInput}>
          <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}/>
        </View>
      <View style={styles.column}>
        <View style={styles.authButton}>
          <Pressable style={styles.pressable} onPress={signUpUser}>
            <Text style={styles.authText}>sign up</Text>
          </Pressable>
        </View>
        <View style={styles.authButton}>
          <Pressable style={styles.pressable} onPress={loginUser}>
            <Text style={styles.authText}>log in</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerIcons: {
    height: windowWidth * 0.05,
    width: windowWidth * 0.05,
    color: "white",
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  column: {
    justifyContent: "space-between",
    flexDirection: "column",
    alignContent: "flex-start",
    alignSelf: "center",
    paddingLeft: 10,
    backgroundColor: colors.background,
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