import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { Animated, View, Text, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useCardAnimation } from '@react-navigation/stack';
import { IconButton, ToggleButton } from 'react-native-paper';
//import QRCode from 'react-native-qrcode-svg';
import { styles } from '../styles/styles';
import QRCode from "react-native-qrcode-svg";
import BottomSheet from "@gorhom/bottom-sheet";
import {CompositeScreenProps} from "@react-navigation/core/src/types";

export default function ShowQrCodeScreen({ route, navigation }: CompositeScreenProps<any, any>) {
  console.log('showQR - params are', route.params);
  const jsonData = route.params.qrdata;
  //console.log('showQR - raw qr data', data);
  //const jsonData = JSON.stringify(data);
  console.log('showQR - json qr data', jsonData);
  const qrView = 1;
  const textView = 2;
  const [viewSelection, setViewSelection] = useState(qrView);
  const [viewIcon, setViewIcon] = useState('toggle-switch');
  const [viewOut, setViewOut] = useState(<Text style={{color: '#FFFFFF'}}>Nothing to show</Text>);
  const { colors } = useTheme();
  const { current } = useCardAnimation();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const onButtonToggle = (value) => {
    setViewSelection(viewSelection === qrView ? textView : qrView);
  };

  useEffect(() => {
    switch (viewSelection) {
      case qrView:
        setViewOut(<QRCode value={jsonData} size={300} />);
        setViewIcon('format-text');
        break;
      case textView:
        setViewOut(<Text  style={{color: '#FFFFFF'}}>{jsonData}</Text>);
        setViewIcon('qrcode');
        break;
      default:
        console.error('Unknown view', viewSelection);
        break;
    }
  }, [viewSelection]);

  return (
      <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{backgroundColor: '#140A0F', borderWidth: 1, borderColor: '#DE984F'}}
      >
        <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 16
            }}
        >
        <View style={styles.closeButtonContainer}>
          <IconButton
              icon={viewIcon}
              size={28}
              iconColor='#C5C8D1'
              onPress={onButtonToggle}
              style={{borderWidth: 1, borderColor: '#FFA149', borderRadius: 10 }}
          />
          <IconButton
              icon="close-circle"
              size={28}
              iconColor="#C5C8D1"
              onPress={() => navigation.goBack()}
              style={{borderWidth: 1, borderColor: '#FFA149', borderRadius: 10 }}
          />

        </View>
      <Animated.View style={styles.viewAnimated}>
        {viewOut}
      </Animated.View>
    </View>
      </BottomSheet>
  );
}
