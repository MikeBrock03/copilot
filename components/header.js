import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import images from "../assets/Images/images";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Header = () => {
    return (
        <View style={styles.header}>
            <Image source = { images.spotify} style={styles.headerIcons}/>
            <Text style = {styles.title}>My Top Tracks</Text>
        </View>
    );
};

const styles = StyleSheet.create( {
    headerIcons: {
        height: windowWidth * 0.10,
        width: windowWidth * 0.10,
    },
    title: {
        fontFamily: "SydneyBold",
        fontSize: 20,
        color: "white",
        paddingLeft: 10
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: 'center',
        padding: 10,

    }
});

export default Header;