import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import images from "../assets/Images/images";
import { colors } from "../assets/Themes/colors";
import { useFonts } from 'expo-font';






const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignInHeader = () => {
    let [fontsLoaded] = useFonts({
        'helveticaneue': require('../assets/Fonts/helveticaneue.ttf'),
      });
    return (
        <View style={styles.header}>
            <Image source = { images.logo} style={styles.logo}/>
            <Text style = {styles.title}>copilot</Text>
            <Text style = {styles.subtitle}>stay connected, partner</Text>
        </View>
    );
};

const styles = StyleSheet.create( {

    logo: {
        width: "50%",
        height: undefined,
        aspectRatio: 1 / 1.6,
        justifyContent: "space-between",
        marginTop: 100,
        alignSelf: "center",
    }, 
    title: {
        fontFamily: "helveticaneue",
        fontWeight: "bold",
        fontSize: 50,
        color: colors.darkpurple,
        paddingLeft: 10
    },
    subtitle: {
        fontFamily: "helveticaneue",
        fontSize: 20,
        color: colors.darkpurple,
        paddingLeft: 10
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.background,

    }
});

export default SignInHeader;