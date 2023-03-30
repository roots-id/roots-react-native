import {PureComponent, useCallback, useEffect, useState} from 'react';
import ReactNative, {
  Animated,
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Platform, TouchableOpacity, Linking,
} from 'react-native';
import { IconButton } from 'react-native-paper';
// const { DIDFunctionalities } = ReactNative.NativeModules;

import { faker } from '@faker-js/faker';
import React from 'react';
import { CompositeScreenProps } from '@react-navigation/core/src/types';
import { styles } from '../styles/styles';
import { ConfigService } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserContact } from '../store/selectors/contact';
import {
  Camera,
  CameraDevice,
  CameraDevices,
  CameraPermissionStatus,
  useCameraDevices, useFrameProcessor
} from "react-native-vision-camera";
import 'react-native-reanimated';
import {runOnJS} from "react-native-reanimated";
import {useScanBarcodes, BarcodeFormat, Barcode} from 'vision-camera-code-scanner';
import { addContact } from '../store/slices/contact';

const configService = new ConfigService();

// const BarcodeWrapper = (props) => {
  // return Platform.OS === 'web' ? (
  //   <Camera {...props} />
  // ) : (
  //   <BarCodeScanner {...props} />
  // );
// };

export default function ScanQrCodeScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  console.log('Scan QR - route params', route.params);
  const [qr, setQr] = useState<string>();
  const [scanned, setScanned] = useState<boolean>(false);
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout>();
  const [devices,setDevices] = useState<CameraDevice[]>();
  const [prefDevice,setPrefDevice] = useState<CameraDevice>();
  const [error,setError] = useState<string>("");
  const currentUser = useSelector(getCurrentUserContact);
  const dispatch = useDispatch();
  const modelType = route.params.type;
  // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
  //   checkInverted: true,
  // });



  const onSuccess = e => {
    console.log('Scan QR - onSuccess');
    Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err)
    );
  };

  const handleDemo = async () => {
      console.log('Scan QR - pretending to scan with demo data');
      alert('Adding demo data.');
      
      dispatch(addContact({}))
  };

  useEffect(() => {
    const initFunc = async () => {
      // const { status } = await BarCodeScanner.requestPermissionsAsync();
      // setHasPermission(status === 'granted');
      const cameraPermission = await Camera.getCameraPermissionStatus()
      console.log("camera permission",cameraPermission)

      const microphonePermission = await Camera.getMicrophonePermissionStatus()
      console.log("microphone permission",microphonePermission)

      if (cameraPermission === null || cameraPermission == "not-determined") {
        const reqCamPerm = await Camera.requestCameraPermission()
        console.log("req camera permission",reqCamPerm)
        if(reqCamPerm != "authorized") {
          setError(error+"\nAccess to camera denied:\n"+reqCamPerm)
        }
      }
      if (cameraPermission != "authorized") {
        setError(error+"\nNo access to camera:\n"+cameraPermission)
      }

      if (microphonePermission === null || microphonePermission == "not-determined") {
        const reqMicPerm = await Camera.requestMicrophonePermission()
        console.log("req mic permission",reqMicPerm)
        if(reqMicPerm != "authorized") {
          setError(error+"\nAccess to mic denied:\n"+reqMicPerm)
        }
      }
      if (microphonePermission != "authorized") {
        setError(error+"\nNo access to mic:\n"+microphonePermission)
      }
          // if (await configService.getDemo()) {
      //   setTimeOutId(setTimeout(handleDemo, 10000));
      // }
      const devices = await Camera.getAvailableCameraDevices()
      console.log("available devices",devices)
      if(devices) {
        setDevices(devices)
        getDevice()
      }
    };

    initFunc().catch(console.error);

  }, []);

  function processBarcode(barcode:Barcode): string {
    if(barcode.displayValue && (qr == undefined || qr.length <= 0)) {
      //handleBarCodeScanned(barcode).catch(console.error)
      setQr(barcode.displayValue)
      console.log("ScanQR - Scanned"+qr)
    } else {
      console.log("ScanQR - Already Scanned"+qr)
    }
    return""
  }


  useEffect(() => {
      if (!scanned && qr) {
        setScanned(true);
        console.log(
            'Scan QR - new qr found',
            modelType,
            qr
        );
        alert("You scanned "+qr)
        //this qr will be a string that is encoded in the QR code
      } else {
        handleDemo().catch(console.error)
        console.log('Scan QR - Scan already completed, skipping processing')
      }
    }, [qr]);

  const clearAndGoBack = () => {
    if (timeOutId) clearTimeout(timeOutId);
    if (navigation.canGoBack()) {
      console.log("Scan QR - navigating back")
      navigation.goBack();
    } else {
      console.log("Scan QR - can't navigate back")
    }
  };


  function getDevice(): CameraDevice {
    if (!prefDevice) {
      devices?.every(d => {
            console.log("device: ", d)
            if (d) {
              setPrefDevice(d)
              return false;
            }
            return true;
          }
      )
    }
    return prefDevice as CameraDevice
  }


  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

    return (
        <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
        >
          <Pressable style={styles.pressable} onPress={clearAndGoBack}/>
          <View style={styles.closeButtonContainer}>
            <IconButton
                icon='close-circle'
                size={36}
                iconColor='#e69138'
                onPress={() => navigation.goBack()}
            />
          </View>
          <Animated.View
              style={[styles.viewAnimated, {minWidth: '90%', minHeight: '90%'}]}
          >
            <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
            >
              <Text>{error}</Text>
              {
                prefDevice == undefined ?
                    <Text>{JSON.stringify(getDevice())}</Text> :
                    <Camera
                        style={StyleSheet.absoluteFill}
                        device={getDevice()}
                        isActive={true}
                        frameProcessor={frameProcessor}
                        frameProcessorFps={5}

                    />

              }
              {
                barcodes.map((barcode, idx) => (
                      <Text key={idx} style={localStyles.barcodeTextURL}>
                        {processBarcode(barcode)}
                      </Text>
                ))
              }


              {/*<RNCamera*/}
              {/*    ref={ref => {*/}
              {/*      setCamera(ref);*/}
              {/*    }}*/}
              {/*    style={localStyles.preview}*/}
              {/*    type={RNCamera.Constants.Type.back}*/}
              {/*    flashMode={RNCamera.Constants.FlashMode.on}*/}
              {/*    androidCameraPermissionOptions={{*/}
              {/*      title: 'Permission to use camera',*/}
              {/*      message: 'We need your permission to use your camera',*/}
              {/*      buttonPositive: 'Ok',*/}
              {/*      buttonNegative: 'Cancel',*/}
              {/*    }}*/}
              {/*    androidRecordAudioPermissionOptions={{*/}
              {/*      title: 'Permission to use audio recording',*/}
              {/*      message: 'We need your permission to use your audio',*/}
              {/*      buttonPositive: 'Ok',*/}
              {/*      buttonNegative: 'Cancel',*/}
              {/*    }}*/}
              {/*    onGoogleVisionBarcodesDetected={({ barcodes }) => {*/}
              {/*      console.log(barcodes);*/}
              {/*    }}*/}
              {/*/>*/}
              {/*<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>*/}
              {/*  <TouchableOpacity onPress={() => takePicture()} style={localStyles.capture}>*/}
              {/*    <Text style={{ fontSize: 14 }}> SNAP </Text>*/}
              {/*  </TouchableOpacity>*/}
              {/*</View>*/}
              {/*<BarcodeWrapper*/}
              {/*  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}*/}
              {/*  style={StyleSheet.absoluteFillObject}*/}
              {/*/>*/}
              {/*{scanned && (*/}
              {/*  <Button*/}
              {/*    title={'Tap to Scan Again'}*/}
              {/*    onPress={() => setScanned(false)}*/}
              {/*  />*/}
              {/*)}*/}
              {/*<QRCodeScanner*/}
              {/*    onRead={onSuccess}*/}
              {/*    flashMode={RNCamera.Constants.FlashMode.torch}*/}
              {/*    topContent={*/}
              {/*      <Text style={localStyles.centerText}>*/}
              {/*        Go to{' '}*/}
              {/*        <Text style={localStyles.textBold}>wikipedia.org/wiki/QR_code</Text> on*/}
              {/*        your computer and scan the QR code.*/}
              {/*      </Text>*/}
              {/*    }*/}
              {/*    bottomContent={*/}
              {/*      <TouchableOpacity style={localStyles.buttonTouchable}>*/}
              {/*        <Text style={styles.buttonText}>OK. Got it!</Text>*/}
              {/*      </TouchableOpacity>*/}
              {/*    }*/}
              {/*/>*/}
            </View>
          </Animated.View>
        </View>
    );
  }

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
})
