import React from 'react';
import { View, Text } from 'react-native';
import {
  Avatar,
  Bubble,
  BubbleProps,
  SystemMessage,
  Message,
  MessageText,
  IMessage,
} from 'react-native-gifted-chat';

export const renderAvatar = (props) => (
  <Avatar
    {...props}
    containerStyle={{ left: { borderWidth: 3, borderColor: 'red' }, right: {} }}
    imageStyle={{ left: { borderWidth: 3, borderColor: 'blue' }, right: {} }}
  />
);

export const renderBubble = (props: BubbleProps<IMessage>) => (
  <Bubble
    {...props}
    wrapperStyle={{
      left: {
        backgroundColor: '#231F20',
      },
      right: {
        backgroundColor: '#24121B',
      },
    }}
    textStyle={{
      left: {
        color: '#fff',
      },
      right: {
        color: '#fff',
      },
    }}
  />
);

export const renderSystemMessage = (props) => (
  <SystemMessage {...props} />
);

export const renderMessage = (props) => (
  <Message
    {...props}
    // renderDay={() => <Text>Date</Text>}
    // containerStyle={{
    //   left: { backgroundColor: 'lime' },
    //   right: { backgroundColor: 'gold' },
    // }}
  />
);

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    // containerStyle={{
    //   left: { backgroundColor: 'yellow' },
    //   right: { backgroundColor: 'purple' },
    // }}
    // textStyle={{
    //   left: { color: 'red' },
    //   right: { color: 'green' },
    // }}
    // linkStyle={{
    //   left: { color: 'orange' },
    //   right: { color: 'orange' },
    // }}
    // customTextStyle={{ fontSize: 24, lineHeight: 24 }}
  />
);

export const renderCustomView = ({ user }) => (
  <View style={{ minHeight: 20, alignItems: 'center' }}>
    <Text>
      Current user:
      {user.name}
    </Text>
    <Text>From CustomView</Text>
  </View>
);
