import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import images from "../assets/Images/images";
import Icons from "../assets/Icons";
import { colors } from "../assets/Themes/colors";
import { Themes } from "../assets/Themes";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { useHistory } from "react-router-dom";
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Header() {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <Pressable onPress={() => navigation.navigate('Sign')}>
                <View style={styles.button}>
                    <Image source={Icons.profile.dark} style={styles.headerIcons}/>
                </View>
            </Pressable>
            <Image source={images.logo} style={styles.logo} />
            <Pressable onPress={() => navigation.navigate('Sign')}>
                <View style={styles.button}>
                    <Image source={Icons.settings.dark} style={styles.headerIcons}/>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create( {
    headerIcons: {
        height: windowWidth * 0.12,
        width: windowWidth * 0.12,
    },
    logo: {
        width: "10%",
        height: undefined,
        aspectRatio: 1 / 1.6,
        justifyContent: "space-between",
        alignSelf: "center",
    }, 
    title: {
        fontFamily: "SydneyBold",
        fontSize: 32,
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: 'center',
        padding: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 10,
    },
    button: {
            backgroundColor: colors.darkpurple,
            borderRadius: 99999,
            display: "inlike-flex",
            alignItems: "center", 
            justifyContent: "center",
    },
});
