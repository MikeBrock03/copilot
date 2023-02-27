import { StyleSheet, Text, Image, Dimensions } from "react-native";
import { Themes } from "../assets/Themes";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import images from "../assets/Images/images";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SpotifyAuthButton = ({authFunction}) => {
    return (
        <Pressable style={styles.authButton} onPress = {authFunction}> 
        <Image source = { images.spotify} style={styles.headerIcons}/>
        <Text style={styles.authText}>Connect with Spotify</Text>
      </Pressable>
    );
};

const styles = StyleSheet.create({
  headerIcons: {
    height: windowWidth * 0.05,
    width: windowWidth * 0.05,
    color: "white",
},
    authButton: {
        flexDirection: "row",
        backgroundColor: Themes.colors.spotify,
        padding: 12,
        borderRadius: 999999,
      },
      authText: {
        color: "white",
        paddingLeft: 10,
        paddingTop: 1,
      },
});

export default SpotifyAuthButton;