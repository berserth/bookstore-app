import React from 'react';
import { StyleSheet } from 'react-native';
import BookGenerator from '../components/renderBook';

const readerScreen = ({ route }) => {
    const { file } = route.params;

    return (
        <BookGenerator book={file} />
    );
};

const styles = StyleSheet.create({});

readerScreen.navigationOptions = () => {
    return {
        headerStyle: {
            backgroundColor: '#f5a142',
        },
        headerTintColor: '#ffff',
        headerTitleStyle: {
            fontSize: 30,
        },
    }
};

export default readerScreen;