import { useEffect, useState } from 'react';
import {
  Animated,
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import { getDemoCred } from '../credentials';
// import { getDemoRel, getUserId } from '../relationships';
// import {
//   getDid,
//   importContact,
//   importVerifiedCredential,
// } from '../roots';
import React from 'react';
import { CompositeScreenProps } from '@react-navigation/core/src/types';
import { BarCodeEvent } from 'expo-barcode-scanner/src/BarCodeScanner';
import { styles } from '../styles/styles';
import { ConfigService } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { addCredential } from '../store/slices/credential';
import { getVerifiedCredentials } from '../store/selectors/credential';

const configService = new ConfigService();

export default function ScanQrCodeScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  console.log('Scan QR - route params', route.params);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout>();
  const verifiedCredentials = useSelector(getVerifiedCredentials);
  const dispatch = useDispatch();
  const modelType = route.params.type;

  const addDummyCredenial = () => {
    dispatch(
      addCredential({
        alias: `dummy${verifiedCredentials.length + 1}_credentialAlias`,
        verifiedCredential: {
          encodedSignedCredential: `dummy${verifiedCredentials.length + 1}_verifiedCredential_${Date.now()}`,
          proof: {
            hash: `dummy${verifiedCredentials.length + 1}_proofHash_${Date.now()}`,
            index: verifiedCredentials.length,
          },
        },
      })
    );
  }

  const handleDemo = async () => {
    if (!scanned && configService.getDemo()) {
      setScanned(true);
      console.log('Scan QR - pretending to scan with demo data');
      alert('No data scanned, using demo data instead.');
      
      if (modelType === 'contact') {
        console.log('Scan QR - getting contact demo data');
        // const demoData = getDemoRel();
        // await importContact(demoData);
      } else {
        console.log('Scan QR - getting credential demo data');
        // const did = getDid(getUserId());
        // if (did) {
        //   const demoData = getDemoCred(did).verifiedCredential;
        //   await importVerifiedCredential(demoData);
        // }
        addDummyCredenial();
      }
    } else {
      console.log(
        'Scan QR - Demo interval triggered, but scanned or not demo',
        scanned,
        configService.getDemo()
      );
    }
    clearAndGoBack();
  };

  useEffect(() => {
    const scanFunc = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (configService.getDemo()) {
        setTimeOutId(setTimeout(handleDemo, 10000));
      }
    };

    scanFunc().catch(console.error);
  }, []);

  const handleBarCodeScanned = async ({ type, data }: BarCodeEvent) => {
    setScanned(true);
    console.log('Scan QR - scanned data', modelType, type, data);
    const jsonData = JSON.parse(data);
    if (modelType == 'credential') {
      console.log('Scan QR - Importing scanned vc', jsonData);
      addDummyCredenial();
      // await importVerifiedCredential(jsonData);
    } else if (modelType == 'contact') {
      console.log('Scan QR - Importing scanned contact', jsonData);
      // await importContact(jsonData);
    }
    clearAndGoBack();
  };

  const clearAndGoBack = () => {
    setScanned(true);
    if (timeOutId) clearTimeout(timeOutId);
    if (navigation.canGoBack()) navigation.goBack();
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Pressable style={styles.pressable} onPress={clearAndGoBack} />
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon='close-circle'
          size={36}
          color='#e69138'
          onPress={() => navigation.goBack()}
        />
      </View>
      <Animated.View
        style={[styles.viewAnimated, { minWidth: '90%', minHeight: '90%' }]}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <BarCodeScanner
            // type={}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button
              title={'Tap to Scan Again'}
              onPress={() => setScanned(false)}
            />
          )}
        </View>
      </Animated.View>
    </View>
  );
}
