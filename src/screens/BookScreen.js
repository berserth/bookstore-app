import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

import FileReader from '../components/fileReader';

export default class Book extends React.Component {
    render() {
        const { item } = this.props.route.params;
        return (
            <View>
                <View style={styles.imageView}>
                <Image
                    style={{ resizeMode: 'contain', height: 300, width: 200 }}
                    source={{ uri: item.image }}
                />
                <View style={styles.buttonsView}>
                <Button
                    title="Read as PDF"
                    onPress={() =>
                        this.props.navigation.navigate('PDF', { uri: item.pdf })
                    }
                />
                <FileReader
                    title={"Read as TXT"}
                    path={item.path}
                    name={item.bookname}
                    onFileSubmit={(value) => this.props.navigation.navigate('TextReader', {
                        file: value
                    })}
                />
                </View>
                </View>
                <Text style={styles.text}>Author: {item.author}</Text>
                <Text style={styles.text}>Description: {item.description}</Text>
                

            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageView: {
        flexDirection: 'row',
    },
    buttonsView: {
        flex: 1,
        justifyContent: 'center',
        margin: 20,
    },
    text: {
        fontSize: 16,
    }
})