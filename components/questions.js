import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import images from "../assets/Images/images";
import * as React from 'react';
import Icons from "../assets/Icons";
import { colors } from "../assets/Themes/colors";
import { Pressable } from "react-native";
import {useNavigation} from '@react-navigation/native';
import UserIdContext from '../UserIdContext';




const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Questions = () => {
    const navigation = useNavigation();
    const { userId } = React.useContext(UserIdContext);

    console.log(userId);
    return (
        // update appropriate icons soon
        <View style={styles.header}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>snooze all</Text>
            </View>
            <View style={styles.button}>
                <Pressable onPress={() => navigation.navigate('PhoneNumberSearch')}>
                    <Text style={styles.buttonTitle}>add friend</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    headerIcons: {
        height: windowWidth * 0.12,
        width: windowWidth * 0.12,
    },
    button: {
        backgroundColor: colors.darkpurple,
        borderRadius: 99999,
        display: "inlike-flex",
        alignItems: "center", 
        justifyContent: "center",
        width: windowWidth * .2,
        height: windowHeight *.05,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        
    },
    title: {
        fontFamily: "SydneyBold",
        fontSize: 32,
    },
    buttonTitle: {
        fontFamily: "helveticaneue",
        fontSize: 14,
        color: colors.white,
        fontWeight: "bold",
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: 'center',
        padding: 1,

    }
});

export default Questions;