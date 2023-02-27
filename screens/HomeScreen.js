import {StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import SongList from '../components/SongList';

const HomeScreen = ({ route }) => {
    const { parameter } = route.params;
    return <WebView source={{uri: parameter}} />;   
}

export default HomeScreen;

const styles = StyleSheet.create({

});