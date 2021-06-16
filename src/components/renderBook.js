import React from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

const BookGenerator = ({ book }) => {

    /*  
          Constant Values 
          
          NUM_OF_LINES - Number of lines in a Text Component on Screen
          CPL - Characters per line
              Formula: CPL = Width / (font-size/font-constant)
          bookPartsLength - computes how many Views will be generated   
          // 1.91 - Arial/Sans-serif font-constant     
      */
    const NUM_OF_LINES = 25;
    const CPL = 300 / (18 / 1.9);
    const bookPartsLength = Math.round((book.length / CPL) * NUM_OF_LINES);

    const generateBookParts = (book) => {
        // All the Views will be stored in bookParts List
        const bookPartsList = [];

        // Assign a temporary value bookPart that will hold the book value
        let bookPart = book;
        // Slice bookPart by the Characters Per Line (CPL) and Number of Lines per Screen/View
        for (let i = 1; i <= bookPartsLength; i++) {
            if (bookPart.slice(0, CPL * NUM_OF_LINES)) {
                bookPartsList.push(
                    <View style={styles.viewStyle} key={i}>
                        <Text style={styles.textContent}>
                            {bookPart.slice(0, CPL * NUM_OF_LINES)}
                        </Text>
                        <Text style={styles.pageNumberStyle}>Page {i}</Text>
                    </View>
                );
                // Continue from the sliced bookPart
                bookPart = bookPart.slice(CPL * NUM_OF_LINES);
            }
        }
        return bookPartsList;
    };

    return (
        <ViewPager style={styles.viewPager} initialPage={0}>
            {generateBookParts(book)}
        </ViewPager>
    );
};

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    viewStyle: {

        padding: 15,
    },
    textContent: {
        fontFamily: 'sans-serif',
        fontSize: 18,
        textAlign: 'justify',
    },
    pageNumberStyle: {
        fontSize: 10,
        color: 'gray',
        alignSelf: 'flex-end',
    },
});

export default BookGenerator;