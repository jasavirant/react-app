import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MenuImage from "../../components/MenuImage/MenuImage";
//import styles from "./styles";

export default function ScannerScreen(props) {

    const { navigation } = props;

    useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <MenuImage
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => <View />,
      });
    }, []);

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
    (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    return (
    <View style={styles.container}>
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});