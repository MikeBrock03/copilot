import { FlatList, Text, Dimensions, Image, View, StyleSheet } from "react-native";
import { Themes } from "../assets/Themes";
import { millisToMinutesAndSeconds } from "../utils";
import Header from "./header";
import {AntDesign} from '@expo/vector-icons';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigation } from "@react-navigation/native";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SongList = ({tracks}) => {
    const navigation = useNavigation();
    return <FlatList 
    contentContainerStyle={{alignItems: "stretch"}}
    data = {tracks} 
    renderItem = {({ item, index }) => {
        const duration = millisToMinutesAndSeconds(item.duration);
        
        // now must insert play button from expo vector, detailed in 3rd party lecture
        return (
            <View style={styles.row}>
                <Pressable onPress={() => navigation.navigate('PreviewScreen', { parameter: item.previewUrl})}>
                    <View>
                        <AntDesign name="play" size={24} color={Themes.colors.spotify} style = {styles.playButton} />
                    </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('DetailsScreen', { parameter: item.externalUrl})} >
                    <View style={styles.infoRow}>
                        <Image style = {styles.image} source = {{uri: item.imageUrl}} />
                        <View style={styles.column}>
                            <Text style = {styles.title} numberOfLines={1} >{item.songTitle}</Text>
                            <Text style = {styles.artist} numberOfLines={1}>{(item.songArtists[0].name)}</Text>
                        </View>
                        <Text style = {styles.album} numberOfLines={1} >{item.albumName}</Text>
                        <Text style = {styles.duration} numberOfLines={1} >{duration}</Text>
                    </View>
                </Pressable>
            </View>
        );
    }}
    keyExtractor = {(item) => item.id}
    />
};

const styles = StyleSheet.create({
    index: {
        color: Themes.colors.gray,
        width: windowWidth * .08,
        alignSelf: "center",

    },
    mainText: {
        color: Themes.colors.white,
    },
    artist: {
        color: Themes.colors.gray,
        paddingRight: 15,

    },
    title: {
        color: Themes.colors.white,
        paddingRight: 15,

    },
    album: {
        color: Themes.colors.white,
        width: windowWidth * .25,
        alignSelf: "center",
    },
    duration: {
        color: Themes.colors.gray,
        width: windowWidth * .1,
        alignSelf: "center",
        paddingLeft: 10
        

    },
    subtitleText: {
        color: Themes.colors.gray,
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
        width: windowWidth * .99,
        flexDirection: "row",
        alignContent: "flex-start",
        alignSelf: "center",
        padding: 10,
        backgroundColor:  Themes.colors.background,
    },
    infoRow: {
        flex: 1,
        justifyContent: "space-between",
        width: windowWidth * .85,
        flexDirection: "row",
        alignContent: "flex-start",
        alignSelf: "center",
        padding: 10,
        backgroundColor:  Themes.colors.background,
    },
    column: {
        width: windowWidth * .98,
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "column",
        alignContent: "flex-start",
        alignSelf: "center",
        paddingLeft: 10,
        backgroundColor:  Themes.colors.background,
    },
    image: {
        height: windowWidth * 0.13,
        width: windowWidth * 0.13,
    },
    playButton: {
        paddingTop: 28,
    }
});

export default SongList;