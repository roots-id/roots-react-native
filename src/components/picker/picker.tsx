import React from 'react';
import { View, Platform } from 'react-native';
import { Picker as RNPicker, PickerIOS } from '@react-native-picker/picker';
import { styles } from './styles';
import { styles as globalStyles } from '../../styles/styles';
import { IPickerType } from './types';

export function Picker({selectedValue, onValueChange, itemList}: IPickerType) {
  const viewStyles = {  width: '80%', marginLeft: 10 }
  const pickerStyles = {}
  let PickerComponent;
  if (Platform.OS !== 'ios') {
    pickerStyles['mode'] = 'dropdown'
    pickerStyles['dropdownIconColor'] = '#e69138'
    viewStyles['backgroundColor'] = '#24121B';
    PickerComponent = RNPicker
  } else {
    pickerStyles['itemStyle'] = { ...styles.iosPickerItem }
    PickerComponent = PickerIOS;
  }
  
  return (
    <View style={{ ...viewStyles }}>
      <PickerComponent
        style={globalStyles.clickableListTitle}
        numberOfLines={5}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        {...pickerStyles}
      >
        {
        itemList.map(item => <RNPicker.Item label={item.label} value={item.value} />)
        }
      </PickerComponent>
    </View>
  );
}
