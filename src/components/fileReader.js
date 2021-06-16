import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as firebase from 'firebase';

const FileReader = ({ name, onFileSubmit, path }) => {




  const readBookFile = () => {
    firebase.storage().ref(path).child(name + '.txt').getDownloadURL()
      .then((url) => {
        FileSystem.downloadAsync(url, FileSystem.documentDirectory + '122324a.txt')
          .then(({ uri }) => {
            FileSystem.readAsStringAsync(uri)
              .then((strVal) => onFileSubmit(strVal))
          })
          .catch((error) =>
            alert(`An error was encountered with ${error.message}`)
          );
      })
  }


  return (

      <Button title='Read as txt' onPress={readBookFile} />

  );
};

export default FileReader;
