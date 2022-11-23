import { useEffect, useState } from 'react';
import {
  Animated,
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BarCodeEvent } from 'expo-barcode-scanner/src/BarCodeScanner';
import { Camera } from 'expo-camera';
import { faker } from '@faker-js/faker';
// import { getDemoCred } from '../credentials';
// import { getDemoRel, getUserId } from '../relationships';
// import {
//   getDid,
//   importContact,
//   importVerifiedCredential,
// } from '../roots';
import React from 'react';
import { CompositeScreenProps } from '@react-navigation/core/src/types';
import { styles } from '../styles/styles';
import { ConfigService } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserContact, getRootsHelperContact } from '../store/selectors/contact';
import { createNewCredential, initiateNewContact } from '../store/thunks/wallet';

const configService = new ConfigService();

const BarcodeWrapper = (props) => {
  return Platform.OS === 'web' ? (
    <Camera {...props} />
  ) : (
    <BarCodeScanner {...props} />
  );
};

export default function ScanQrCodeScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  console.log('Scan QR - route params', route.params);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout>();
  const rootsHelper = useSelector(getRootsHelperContact);
  const currentUser = useSelector(getCurrentUserContact);
  const dispatch = useDispatch();
  const modelType = route.params.type;

  const addDummyCredenial = async () => {
    dispatch(createNewCredential());
  };

  const addDummyContact = async () => {
    dispatch(initiateNewContact());
  };
  
  const handleDemo = async () => {
    if (!scanned && configService.getDemo()) {
      setScanned(true);
      console.log('Scan QR - pretending to scan with demo data');
      alert('No data scanned, using demo data instead.');

      if (modelType === 'contact') {
        console.log('Scan QR - getting contact demo data');
        // const demoData = getDemoRel();
        // await importContact(demoData);
        addDummyContact();
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
    console.log(
      'Scan QR - scan complete but only using dummy data',
      modelType,
      type,
      data
    );
    // const jsonData = JSON.parse(data);
    if (modelType == 'credential') {
      console.log('Scan QR - Importing dummy vc', data);
      addDummyCredenial();
      // await importVerifiedCredential(jsonData);
    } else if (modelType == 'contact') {
      console.log('Scan QR - Importing dummy contact', data);
      addDummyContact();
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
          <BarcodeWrapper
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
