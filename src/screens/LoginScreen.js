import React from 'react';
import { View, TextInput, Alert, Button, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

export default class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    render() {
        return (
            <View>
                <TextInput style={styles.textInput}
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                    placeholder='Email' />
                <TextInput style={styles.textInput}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                    placeholder='Password'
                    secureTextEntry />
                <Button title='Login' onPress={this.onLoginPress} />
                <Button title='SignUp' onPress={() => this.props.navigation.navigate('SignUp')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: 300,
        height: 40,
        borderWidth: 1,
        alignSelf: 'center'
    }
})



