import React from 'react';
import { View, TextInput, StyleSheet, Button, Text, Alert } from 'react-native';
import * as firebase from 'firebase';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default class Upload extends React.Component {
    state = {
        bookname: '',
        author: '',
        description: '',
        image: '',
        pdf: '',
        path: '',
        genre: ''
    }

    render() {
        return (
            <View>
                <Text style={styles.textHeader}>Enter information about book</Text>
                <TextInput
                style={styles.textInput}
                    onChangeText={(text) => this.setState({ bookname: text, path: 'books/' + text })}
                    value={this.state.bookname}
                    placeholder='Book name'
                />

                <TextInput
                style={styles.textInput}
                    onChangeText={(text) => this.setState({ author: text })}
                    value={this.state.author}
                    placeholder='Author'
                />

                <TextInput
                style={styles.textInput}
                    onChangeText={(text) => this.setState({ description: text })}
                    value={this.state.description}
                    placeholder='Description'
                />

                <TextInput
                style={styles.textInput}
                    onChangeText={(text) => this.setState({ genre: text })}
                    value={this.state.genre}
                    placeholder='Genre'
                />


                <TextInput
                style={styles.textInput}
                    onChangeText={(text) => this.setState({ image: text })}
                    value={this.state.image}
                    placeholder='Image link'
                />


                <TextInput
                style={styles.textInput}
                    onChangeText={(text) => this.setState({ pdf: text })}
                    value={this.state.pdf}
                    placeholder='PDF link'
                />


                <Button title='Choose txt file' onPress={async () => {
                    let { uri, name } = await DocumentPicker.getDocumentAsync({ type: 'text/plain' });
                    let text = await FileSystem.readAsStringAsync(uri);
                    let blob = new Blob([text], { type: 'text/plain' });
                    firebase.storage().ref('books/' + this.state.bookname + '/' + name).put(blob);

                }} />

                <Button title='Submit' onPress={() =>{
                    firebase.database().ref('books/' + this.state.bookname).set({
                        bookname: this.state.bookname,
                        author: this.state.author,
                        description: this.state.description,
                        path: this.state.path,
                        image: this.state.image,
                        genre: this.state.genre,
                        pdf: this.state.pdf
                    })
                    Alert.alert('Book successfully uploaded!')
                } }/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        margin: 10
    },
    textHeader: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }
})