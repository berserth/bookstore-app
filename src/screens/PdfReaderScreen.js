import React from 'react';
import PDFReader from 'rn-pdf-reader-js';
import Constants from 'expo-constants';

export default function PdfReader({route}) {
  const {uri} = route.params;
  return (
      <PDFReader
        source={{
          uri: uri,
        }}
        webviewStyle={{ marginHorizontal: -22 }}
        customStyle={{
          readerContainerZoomContainerButton: {
            
          },
        }}
      />
  );
}