import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class User extends React.Component {
    render() {
        return (
            <View>

                <Button title='Upload book' onPress={() => this.props.navigation.navigate('Upload')} />
            </View>
        );
    }
}
