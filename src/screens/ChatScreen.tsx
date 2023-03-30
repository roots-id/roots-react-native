import React, { useEffect, useState, useCallback } from 'react';
import { Linking, Text, View } from 'react-native';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Reply,
  User,
} from 'react-native-gifted-chat';
import { handleUserInput } from '../events'
import {
  renderInputToolbar,
  renderBubble,
  renderComposer,
  renderSend,
} from "../components/gifted-chat";
import * as models from '../models';;
import { styles } from '../styles/styles';
import { CompositeScreenProps } from '@react-navigation/core/src/types';
import { BubbleProps } from 'react-native-gifted-chat/lib/Bubble';
import { MessageType } from '../models/constants';
import { ROUTE_NAMES } from '../navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getChatById } from '../store/selectors/chat';

import {
  getContactById,
  getCurrentUserContact,
} from '../store/selectors/contact';
import { sendMessageToChat } from '../store/thunks/chat';
import { updateMessageQuickReplyStatus } from "../store/slices/chat";
import { addCredential } from '../store/slices/credential';

export default function ChatScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  console.log('ChatScreen - route params', route.params);
  const user = route.params.user;
  // roots.getChatItem(route.params.chatId)
  const [contact, setContact] = useState<models.contact>();
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);
  const currentChat = useSelector((state) => getChatById(state, user._id));
  const currentUser = useSelector(getCurrentUserContact);
  const getUserById = useSelector(getContactById);
  const dispatch = useDispatch();

  //create use effect for two async calls
  useEffect(() => {
    console.log('Current route', route);
    console.log('Current state');

    const getContact = async () => {
      const contact = await getUserById(user._id);
      console.log('contact', contact);
      setContact(contact);
      setLoading(false);
    };
    getContact();
  }, [user._id]);

  const openRelationshipDetailScreen = (user) => {
    navigation.navigate(ROUTE_NAMES.RELATIONSHIP_DETAILS, {
      user,
    });
  };

  function handleQuickReply(replies: Reply[]) {
    console.log('replies', replies);
    if (replies) {
      for (const reply of replies) {
        if (reply.value.endsWith(MessageType.CRED_VIEW)) {
          console.log('ChatScreen - quick reply view issued credential');
          console.log("currentChat", currentChat)
          const msgCurrentChat = currentChat?.messages.find(
            (message) => message._id === reply.messageId
          );
          navigation.navigate(ROUTE_NAMES.CREDENTIAL_DETAILS, {
            // cred: msgCurrentChat?.data?.credential,
            msg: msgCurrentChat
          });
        }
        else if (reply.value.startsWith(MessageType.ISSUED_CREDENTIAL)) {
          console.log('ChatScreen - quick reply view credential');
          const msgCurrentChat = currentChat?.messages.find(
            (message) => message._id === reply.messageId
          );
          navigation.navigate(ROUTE_NAMES.CREDENTIAL_DETAILS, {
            cred: msgCurrentChat?.data?.credential,
            msg: msgCurrentChat
          });
        }
        else {
          console.log(
            'ChatScreen - reply value not recognized, was',
            reply.value
          );
        }
      }
    } else {
      console.log('ChatScreen - reply', replies, 'were undefined');
    }
  }

  //   function processBubbleClick(context: any, message: IMessage): void {
  //     console.log('ChatScreen - bubble pressed', context, message);
  //     const msg = roots.getMessageById(message._id.toString());
  //     if (msg) {
  //       switch (msg.type) {
  //         case roots.MessageType.BLOCKCHAIN_URL:
  //           console.log('ChatScreen - Clicked blockchain url msg', msg.data);
  //           Linking.openURL(msg.data);
  //           break;
  //         case roots.MessageType.DID:
  //           console.log('ChatScreen - Clickable did msg', msg.data);
  //           const c = getContactByDid(msg.data);
  //           if (c) {
  //             showQR(navigation, asContactShareable(c));
  //           }
  //           break;
  //         default:
  //           console.log('ChatScreen - Clicked non-active message type', msg.type);
  //       }
  //     }
  //   }

  //   if (loading) {
  //     console.log('ChatScreen - Loading....');
  //     return <Loading />;
  //   }

  const onSendNow = useCallback((messages: any, dispatch: any, currentChat: any) => {
    messages.forEach((message: any) => {
      handleUserInput(message, dispatch, currentChat);
    });

  }, []);

  return (
    <View style={{ backgroundColor: '#000000', flex: 1, display: 'flex' }}>
      <GiftedChat
        isTyping={processing}
        inverted={false}
        onQuickReply={handleQuickReply}
        messages={currentChat?.messages?.sort((a, b) => {
          return a.createdAt < b.createdAt ? -1 : 1;
        })}
        placeholder={'Tap to type...'}
        onSend={messages => onSendNow(messages, dispatch, currentChat)}
        user={{
          _id: currentUser._id,
          name: currentUser.displayName,
          avatar: currentUser.displayPictureUrl,
        }}
        showUserAvatar={false}
        renderUsernameOnMessage={true}
        parsePatterns={(linkStyle) => [
          {
            type: 'url',
            style: styles.clickableListTitle,
            onPress: (tag: string) => Linking.openURL(tag),
          },
          {
            pattern: /\*Click to geek out on Cardano blockchain details\*/,
            style: styles.red,
          },
        ]}
        renderAvatarOnTop={true}
        renderComposer={renderComposer}
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        renderSend={renderSend}
        quickReplyStyle={{
          backgroundColor: "#140A0F",
          borderRadius: 4,
          borderWidth: 0,
          elevation: 3,
          marginRight: 4,
          marginTop: 6,
        }}
        quickReplyTextStyle={{
          color: "#DE984F",
          fontSize: 12,
        }}
        showAvatarForEveryMessage={true}
        onPressAvatar={(u) => openRelationshipDetailScreen(getUserById(u._id))}
      />
    </View>
  );

}
