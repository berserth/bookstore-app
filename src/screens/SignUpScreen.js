import React from 'react';
import { View, Button, TextInput, Alert, Text, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

export default class SignupScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
        };
    }

    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });

        this.props.navigation.navigate('Login');

    }

    render() {
        return (
            <View style={styles.container}>

                <Text>Signup</Text>

                <TextInput style={styles.textInput}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({ email: text }) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{ paddingTop: 10 }} />

                <TextInput style={styles.textInput}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({ password: text }) }}
                    placeholder="Password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{ paddingTop: 10 }} />

                <TextInput style={styles.textInput}
                    value={this.state.passwordConfirm}
                    onChangeText={(text) => { this.setState({ passwordConfirm: text }) }}
                    placeholder="Password (confirm)"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Button title="Signup" onPress={this.onSignupPress} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: 200,
        height: 40,
        borderWidth: 1
    },
    container: {
        paddingTop: 50,
        alignItems: "center"
    }
})

