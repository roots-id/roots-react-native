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
export default function LoginScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  const [password, setPassword] = useState<string>('');
  const [problemText, setProblemText] = useState<string>('');
  const [error, setError] = useState<JSX.Element>(<Text />);
  const { signIn } = useContext(AuthContext)

  console.log(
    'LoginScreen - Assuming we have a wallet, trying to login in with password'
  );

  function handleOpenWithLinking() {
    Linking.openURL('https://www.rootsid.com/projects/rootswallet/help');
  }

  function handleSettings() {
    console.log('handling settings');
    navigation.navigate(ROUTE_NAMES.SETTINGS);
  }

  useEffect(() => {
    if (problemText.length > 0) {
      setError(
        <Text style={displayOrHide(true, styles.problem)}>{problemText}</Text>
      );
    } else {
      setError(<Text />);
    }
  }, [problemText]);

  const handleLogin = async () => {
    console.log('LoginScreen - Logging in with password', password);
    const walName = 'Wallet Name';
    signIn();
  };

  return (
    <View style={styles.centeredContainer}>
      <Image
        style={{ width: 150, height: 150 }}
        source={{
          uri: 'https://github.com/roots-id/rootswallet/raw/main/src/assets/LogoOnlyGlow512.png',
        }}
      />
      <Title style={styles.titleText}>Login:</Title>
      <FormInput
        labelName='Wallet Password'
        value={password}
        secureTextEntry={true}
        onChangeText={(userPassword: string) => setPassword(userPassword)}
      />
      {error}
      <FormButton
        title='Login'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        onPress={handleLogin}
      />
      <Text></Text>
      <View
        style={{
          backgroundColor: '#251520',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          width: '90%',
          maxWidth: 400,
        }}
      >
        <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
          <Button
            title='Need Help?'
            onPress={handleOpenWithLinking}
            color={'#251520'}
          />
        </View>
        <View
          style={{
            backgroundColor: '#251520',
            flex: 1,
            marginLeft: 5,
            marginRight: 10,
          }}
        >
          <Button title='Settings' onPress={handleSettings} color={'#251520'} />
        </View>
      </View>
    </View>
  );
}
