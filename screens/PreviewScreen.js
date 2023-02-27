import {StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import SongList from '../components/SongList';

const PreviewScreen = ({ route }) => {
    const { parameter } = route.params;
    return <WebView source={{uri: parameter}} />;   
}

export default PreviewScreen;

const styles = StyleSheet.create({

});