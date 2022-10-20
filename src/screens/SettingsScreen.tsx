import React, { useEffect, useState } from 'react';
import { Animated, Text, Pressable, View, Button } from 'react-native';
import { IconButton, ToggleButton } from 'react-native-paper';
import { styles } from '../styles/styles';
import { CompositeScreenProps } from '@react-navigation/core/src/types';
import { useCardAnimation } from '@react-navigation/stack';
import FormButton from '../components/FormButton';
import { Picker } from '../components/picker';
import { ConfigService, ServerService } from '../services';
import { MediatorType, ServerType } from '../models/constants';

const serverService = new ServerService();
const configService = new ConfigService();

export default function SettingsScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  const [demoMode, setDemoMode] = useState<boolean>();
  const [host, setHost] = useState<string>();
  useCardAnimation();
  useEffect(() => {
    async function getHost() {
      const hostReceived = await serverService.getHost();
      setHost(hostReceived);
    }

    async function getDemo() {
      const demoReceived = await configService.getDemo();
      setDemoMode(demoReceived);
    }

    getHost();
    getDemo();
  }, []);

  const handleDemoModeChange = () => {
    configService.setDemo(!configService.isDemo);
    setDemoMode(!configService.isDemo);
  };

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
      <Animated.View style={styles.viewAnimatedStart}>
        <Text style={[styles.titleText, styles.black]}>Settings:</Text>
        <Text />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.listItemCenteredBlack}>Server: </Text>
          <Picker
            itemList={[
              {
                label: ServerType.Local.label,
                value: ServerType.Local.hostValue,
              },
              {
                label: ServerType.Prism.label,
                value: ServerType.Prism.hostValue,
              },
            ]}
            selectedValue={host}
            onValueChange={(itemValue) => setHost(String(itemValue))}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.listItemCenteredBlack}>Mediator: </Text>
          <Picker
            itemList={[
              {
                label: MediatorType.Roots.label,
                value: MediatorType.Roots.value,
              },
            ]}
            selectedValue={MediatorType.Roots.value}
            onValueChange={(itemValue) => console.log(itemValue)}
          />
        </View>
        <Text />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.listItemCenteredBlack}>Demo Mode ON/OFF: </Text>
          <ToggleButton
            icon={demoMode ? 'toggle-switch' : 'toggle-switch-off-outline'}
            size={26}
            color='#e69138'
            value='toggle demo switch'
            onPress={handleDemoModeChange}
          />
        </View>
        <Text />
        <View style={{ flexDirection: 'row' }}>
          <FormButton
            title='Save/Restore Wallet'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            onPress={() => navigation.navigate('Save')}
          />
        </View>
        <Text />
        <View style={{ flexDirection: 'row' }}>
          <FormButton
            title='Developers Only'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            onPress={() => navigation.navigate('Developers')}
          />
        </View>
      </Animated.View>
    </View>
  );
}
