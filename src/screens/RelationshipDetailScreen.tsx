import React, { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  Text,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import { CompositeScreenProps } from '@react-navigation/core/src/types';
import { styles } from '../styles/styles';

import * as models from '../models';
import { goToShowQrCode } from '../navigation/helper/navigate-to';
// import { showQR } from '../qrcode';
// import { addDidDoc, asContactShareable } from '../relationships';
// import { recursivePrint } from '../utils';

export default function RelationshipDetailScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  console.log(
    'RelDetailScreen - route params are',
    JSON.stringify(route.params)
  );
  const [rel, setRel] = useState<any>(route.params.user);

  useEffect(() => {
    console.log('RelDetailScreen - rel changed', rel);
  }, [rel]);

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
          <IconButton
            icon='text-box'
            size={36}
            color='#e69138'
            onPress={async () => {
              if (rel) {
                console.log('RelDetailScreen - setting rel', rel);
                // setRel(await addDidDoc(rel));
              } else {
                console.error(
                  'RelDetailScreen - cant set rel, rel not set',
                  rel
                );
              }
            }}
          />
          <IconButton
            icon='qrcode'
            size={36}
            color='#e69138'
            onPress={() => {
              if (rel) {
                console.log('RelDetailScreen - show QR for rel', rel);
                goToShowQrCode(navigation, rel)
              } else {
                console.error(
                  'RelDetailScreen - cant show qr, rel not set',
                  rel
                );
              }
            }}
          />
        </View>
        <Image
          source={{ uri: rel.displayPictureUrl }}
          style={{
            // width: '30%',
            // height: '30%',
            resizeMode: 'contain',
            margin: 8,
            justifyContent: 'flex-start',
            width: 65,
            height: 75,
          }}
        />
        <Text style={styles.subText}>{rel.displayName}</Text>
        <Divider />
        <ScrollView style={styles.scrollableModal}>
          <Text style={styles.subText}>{rel?.did}</Text>
          <Divider />
          <Text
            style={styles.subText}
          >{`did:prism:0206326ed47eda4bd9917886cfad6bdaf9d6420af80ecc23af5791bfc7bcc05c:Cr8BCrwBEjsKB21hc3RlcjAQAUouCglzZWNwMjU2azESIQN6DKpb9OFDasJVeXCPBU34cF4E6FGaljA3VBlA7EJqjhI8Cghpc3N1aW5nMBACSi4KCXNlY3AyNTZrMRIhA1NKHFw8xk2ptXovPwKGzMokfddV9YRvs2X14P66HrzsEj8KC3Jldm9jYXRpb24wEAVKLgoJc2VjcDI1NmsxEiECH-dwm0ZXDHz6xSDKAQDQFl3hQT0pcyqdE0xKJcm7nrs`}</Text>
        </ScrollView>
      </Animated.View>
    </View>
  );
}
