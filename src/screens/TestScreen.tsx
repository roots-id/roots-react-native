import React, { useEffect, useState, useContext } from 'react';
import { Button, Image, Linking, Text, View } from 'react-native';
import { Title } from 'react-native-paper';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

import { displayOrHide, styles } from '../styles/styles';
import { CompositeScreenProps } from '@react-navigation/core/src/types';
import { LocalStorageService } from '../services';
import { USER_AUTH } from '../common/constants';
import { AuthContext } from '../navigation/Routes';
import { ROUTE_NAMES } from '../navigation';

const localStorageService = new LocalStorageService()
export default function TestScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  console.log(
    'TestScreen - This is our test screen'
  );


  return (
    <View style={styles.centeredContainer}>
      <Image
        style={{ width: 150, height: 150 }}
        source={{
          uri: 'https://github.com/roots-id/rootswallet/raw/main/src/assets/LogoOnlyGlow512.png',
        }}
      />
      <Title style={styles.titleText}>Test Screen</Title>
    </View>
  );
}
