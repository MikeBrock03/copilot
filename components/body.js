import { View, Text, Image, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { colors } from "../assets/Themes/colors";
import { Themes } from "../assets/Themes";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Body = ({speed}) => {
    return (
        <View style={styles.navigationContainer}>
           <Text style={styles.title}>no friends driving now!</Text>
        </View>
        
    );
};

const styles = StyleSheet.create({
    navigationContainer: {
        flexDirection: 'column',
        backgroundColor: Themes.colors.darkpurple,
        alignItems: 'baseline',
        justifyContent: 'space-around',
        borderRadius: 10,
        marginTop: 20,
        height: windowHeight * .2,
        width: windowWidth * .95,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
      },
    title: {
        fontFamily: "helveticaneue",
        fontWeight: 'bold',
        fontSize: 30,
        color: colors.lighterpurple,
    },
    subtitle: {
        fontFamily: "helveticaneue",
        fontWeight: 'bold',
        fontSize: 15,
        color: colors.lighterpurple,
    },
    
});
export default Body;