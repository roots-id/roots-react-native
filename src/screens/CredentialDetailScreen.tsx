import React, { useEffect, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  Text,
  Pressable,
  View,
  ScrollView,
} from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import * as models from '../models';
import { styles } from '../styles/styles';
import { CompositeScreenProps } from '@react-navigation/core/src/types';
import {
  decodeCredential,
  getCredentialItem,
} from '../models/samples/credentials';
import { DIDS } from '../models/samples';
import { goToShowQrCode } from '../navigation/helper/navigate-to';
import { useDispatch } from 'react-redux';
import { updateCredentialValidation } from '../store/thunks/credential';
const credLogo = require('../assets/vc.png');

export default function CredentialDetailScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  console.log('cred details - route params are', JSON.stringify(route.params));
  const dispatch = useDispatch();
  const [cred, setCred] = useState<models.credential>(
    getCredentialItem(DIDS[0])
  );
  const [verified, setVerified] = useState('help-circle');

  //   useEffect(() => {
  //     console.log('cred details - initially setting cred', cred);
  //     setCred(route.params.cred);
  //   }, []);

  const updateVerification = async () => {
    if(route.params?.cred?._id) {
      const isRevoked = (await dispatch(updateCredentialValidation(route.params?.cred))).payload;
      if(isRevoked){
        setVerified("close-octagon-outline")
      } else {
        setVerified("check-bold")
      }
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Pressable style={styles.pressable} onPress={navigation.goBack} />
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon='close-circle'
          size={36}
          color='#e69138'
          onPress={() => navigation.goBack()}
        />
      </View>
      <Animated.View style={styles.viewAnimated}>
        <View style={{ flexDirection: 'row' }}>
          <IconButton icon={verified} size={36} color='#e69138' onPress={updateVerification} />
          <IconButton
            icon='qrcode'
            size={36}
            color='#e69138'
            onPress={() =>
              goToShowQrCode(navigation, {
                encodedSignedCredential: 'dummy_vcEncodedSignedCredential',
                proof: {
                  hash: 'dummy_proofHash',
                  index: 0,
                },
              })
            }
          />
        </View>
        <Image source={credLogo} style={styles.credLogoStyle} />
        <FlatList
          data={Object.entries(
            decodeCredential(cred.verifiedCredential.encodedSignedCredential)
              .credentialSubject
          )}
          keyExtractor={([key, val]) => key}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={(item) => {
            return (
              <ScrollView style={styles.scrollableModal}>
                <Text style={{ color: 'black' }}>
                  {item.item[0] + ': ' + item.item[1]}
                </Text>
              </ScrollView>
            );
          }}
        />
      </Animated.View>
    </View>
  );
}
