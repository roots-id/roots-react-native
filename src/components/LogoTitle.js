import React from 'react';
import { Image, Text, View } from 'react-native';

export default function LogoTitle(...props) {
    function getLogo() {
        if(props[0]["logo"]) {
            return <Image
                style={{width: 50, height: 50}}
                source={props[0]["logo"]}
            />
        }
    }

  return (
        <View style={{flexDirection:'row'}}>
            {getLogo()}
            <Text style={{color: '#eeeeee',fontSize: 20,fontWeight: 'normal',textAlignVertical: "center",textAlign: "center", }}>
                {props[0]["title"]}
            </Text>
        </View>
  );
}
