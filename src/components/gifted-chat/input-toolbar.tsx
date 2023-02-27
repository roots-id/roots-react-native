import React from 'react';
import { Image } from 'react-native';
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
  InputToolbarProps,
  IMessage
} from 'react-native-gifted-chat';
import { IconButton, Button } from "react-native-paper";

export const renderInputToolbar = (props: InputToolbarProps<IMessage>) => (
  <InputToolbar
    {...props}
    containerStyle={{
        backgroundColor: "#000000",
        borderBottomColor: "#DE984F",
        borderBottomWidth: 1,
        borderTopColor: "#DE984F",
    }}
  />
);

export const renderActions = (props) => (
  <Actions
    {...props}
    // containerStyle={{
    //   width: 44,
    //   height: 44,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   marginLeft: 4,
    //   marginRight: 4,
    //   marginBottom: 0,
    // }}
    // icon={() => (
    //   <Image
    //     style={{ width: 32, height: 32 }}
    //     source={{
    //       uri: 'https://placeimg.com/32/32/any',
    //     }}
    //   />
    // )}
    // options={{
    //   'Choose From Library': () => {
    //     console.log('Choose From Library');
    //   },
    //   Cancel: () => {
    //     console.log('Cancel');
    //   },
    // }}
    // optionTintColor="#222B45"
  />
);

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputStyle={{
        color: "#F7F7F7",
    }}
  />
);

export const renderSend = (props) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    }}
  >
      <IconButton icon="send" size={28} iconColor="#e69138" />
  </Send>
);
