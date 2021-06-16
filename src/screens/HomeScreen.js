import React from 'react';
import {
    ScrollView,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    LogBox
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import Constants from 'expo-constants';

LogBox.ignoreAllLogs();

const Item = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Book', { item: props })}>
            <Image
                style={{ resizeMode: 'contain', height: 200, width: 150 }}
                source={{ uri: props.image }}
            />
            <Text>{props.bookname}</Text>
        </TouchableOpacity>
    );
};

export default class Home extends React.Component {

    state = {
        data: [],
        keys: []
    }
    componentDidMount() {
        firebase.database().ref('books/').on('value', (snapshot) => {
            const dbdata = snapshot.val()
            this.setState({data: Object.values(dbdata)})
        })
    }

 
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.listHeader}>Recommended</Text>
                <FlatList
                    renderItem={({ item }) => (
                        <Item {...item} />
                    )}
                    data={this.state.data}
                    keyExtractor={(item) => item.bookname}
                    horizontal
                />   
                <Text style={styles.listHeader}>Science fiction</Text>
                <FlatList
                    renderItem={({ item }) => (
                        <Item {...item} />
                    )}
                    data={(this.state.data).filter(obj => {
                        if (obj.genre === 'Science fiction') return true
                    })}

                    keyExtractor={(item) => item.bookname}
                    horizontal
                />    

                <Text style={styles.listHeader}>Romance</Text>
                <FlatList
                    renderItem={({ item }) => (
                        <Item {...item} />
                    )}
                    data={(this.state.data).filter(obj => {
                        if (obj.genre === 'Romance') return true
                    })}

                    keyExtractor={(item) => item.bookname}
                    horizontal
                />  

                <Text style={styles.listHeader}>Epic</Text>
                <FlatList
                    renderItem={({ item }) => (
                        <Item {...item} />
                    )}
                    data={(this.state.data).filter(obj => {
                        if (obj.genre === 'Epic') return true
                    })}

                    keyExtractor={(item) => item.bookname}
                    horizontal
                />                  

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
    },
    item: {
        alignItems: 'center',
    },
    listHeader: {
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 15,
    }

})
