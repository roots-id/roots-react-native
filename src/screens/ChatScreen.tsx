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

import { renderInputToolbar, renderBubble } from '../components/gifted-chat';
// import * as contacts from '../relationships';
import * as models from '../models';
// import { showQR } from '../qrcode';
// import {
//   asContactShareable,
//   getContactByAlias,
//   getContactByDid,
//   showRel,
// } from '../relationships';
// import * as roots from '../roots';
import Loading from '../components/Loading';
import { styles } from '../styles/styles';
import { CompositeScreenProps } from '@react-navigation/core/src/types';
import { BubbleProps } from 'react-native-gifted-chat/lib/Bubble';
import {
  getChatByUser,
  getCurrentUser,
  getMappedCurrentUser,
  getUserById,
} from '../models/samples';
import { MessageType } from '../models/constants';
import { ROUTE_NAMES } from '../navigation';
import { useSelector } from 'react-redux';
import { getChatById } from '../store/selectors/chat';

export default function ChatScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  console.log('ChatScreen - route params', route.params);
  const user = route.params.user;
  const [chat, setChat] = useState<models.chat>();
  // roots.getChatItem(route.params.chatId)
  const [contact, setContact] = useState<models.contact>();
  console.log('ChatScreen - got chatItem ', chat);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<IMessage[]>(getChatByUser(user._id));
  const [processing, setProcessing] = useState<boolean>(false);
  const currentChat = useSelector((state) => getChatById(state, user._id));

  // useEffect(() => {
  //   setMessages(messages);
  // }, []);
  //   useEffect(() => {
  //     console.log('ChatScreen - chat set', chat);
  //     const chatSession = roots.startChatSession(chat.id, {
  //       chat: chat,
  //       onReceivedMessage: (message) => {
  //         if (message && GiftedChat) {
  //           setMessages((currentMessages) => {
  //             const iMsg = mapMessage(message);
  //             if (iMsg) {
  //               return GiftedChat.append(currentMessages, [iMsg]);
  //             }
  //           });
  //         }
  //       },
  //       onProcessing: (processing) => {
  //         setProcessing(processing);
  //         console.log('ChatScreen - updated processing indicator', processing);
  //       },
  //     });
  //     if (chatSession.succeeded) {
  //       console.log('ChatScreen - chat session started successfully');
  //     } else {
  //       console.error('ChatScreen - chat session failed', chatSession.error);
  //     }

  //     setContact(getContactByAlias(chat.id));
  //     console.log('ChatScreen - getting all messages');
  //     const msgs = roots.getMessagesByChat(chat.id);
  //     console.log('ChatScreen - got', msgs.length, 'msgs');
  //     const mapMsgs = msgs.map((msg) => {
  //       return mapMessage(msg);
  //     });
  //     setMessages(mapMsgs);
  //     setLoading(false);
  //     return () => {
  //       chatSession.end;
  //     };
  //   }, [chat]);

  //   useEffect(() => {}, [messages]);

  //   async function handleSend(pendingMsgs: IMessage[]) {
  //     console.log('ChatScreen - handle send', pendingMsgs);
  //     const result = await roots.sendMessages(
  //       chat,
  //       pendingMsgs.map((msg) => msg.text),
  //       roots.MessageType.TEXT,
  //       contacts.getUserId()
  //     );
  //   }

  const openRelationshipDetailScreen = (user) => {
    navigation.navigate(ROUTE_NAMES.RELATIONSHIP_DETAILS, {
      user,
    });
  };

  function handleQuickReply(replies: Reply[]) {
    console.log('replies', replies);
    if (replies) {
      for (const reply of replies) {
        if (reply.value.startsWith(MessageType.PROMPT_OWN_DID)) {
          console.log('ChatScreen - quick reply view did');
          openRelationshipDetailScreen(getCurrentUser());
        } else if (
          reply.value.startsWith(MessageType.PROMPT_ISSUED_CREDENTIAL)
        ) {
          if (reply.value.endsWith(MessageType.CRED_REVOKE)) {
            console.log(
              'ChatScreen - process quick reply for revoking credential'
            );
            console.log('reply is here', reply)
            console.log('ChatScreen - credential revoked?');
          } else if (reply.value.endsWith(MessageType.CRED_VIEW)) {
            console.log('ChatScreen - quick reply view issued credential');
            navigation.navigate(ROUTE_NAMES.CREDENTIAL_DETAILS);
          }
        } else if (reply.value.startsWith(MessageType.PROMPT_OWN_CREDENTIAL)) {
          console.log('ChatScreen - process quick reply for owned credential');
          if (reply.value.endsWith(MessageType.CRED_VIEW)) {
            console.log('ChatScreen - quick reply view imported credential');
            navigation.navigate(ROUTE_NAMES.CREDENTIAL_DETAILS);
          }
        } else {
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

  const onSend = useCallback((messages = []) => {
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, messages)
    // );
  }, []);

  return (
    <View style={{ backgroundColor: '#251520', flex: 1, display: 'flex' }}>
      <GiftedChat
        isTyping={processing}
        inverted={false}
        onQuickReply={handleQuickReply}
        messages={currentChat?.messages?.sort((a, b) => {
          return a.createdAt < b.createdAt ? -1 : 1;
        })}
        placeholder={'Make a note...'}
        onSend={onSend}
        user={getMappedCurrentUser()}
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
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        renderQuickReplySend={() => (
          <Text style={{ color: '#e69138', fontSize: 18 }}>Confirm</Text>
        )}
        // quickReplyStyle={{backgroundColor: '#e69138',borderColor: '#e69138',elevation: 3}}
        renderUsernameOnMessage={true}
        showAvatarForEveryMessage={true}
        onPressAvatar={(u) =>
          openRelationshipDetailScreen(getUserById(u._id as number))
        }
      />
    </View>
  );

  //   function mapMessage(message: models.message): IMessage {
  //     console.log('ChatScreen - Map message for gifted', message);
  //     const image = message.image;
  //     const user = getContactByAlias(message.rel);
  //     const mappedMsg: IMessage = {
  //       _id: message.id,
  //       createdAt: message.createdTime,
  //       system: message.system,
  //       text: message.body,
  //       user: mapUser(user),
  //     };
  //     if (message.image) {
  //       mappedMsg.image = message.image;
  //     }
  //     if (message.quickReplies) {
  //       mappedMsg.quickReplies = message.quickReplies;
  //     }
  //     console.log('ChatScreen - got mapped message', mappedMsg);
  //     return mappedMsg;
  //     //image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png',
  //     // You can also add a video prop:
  //     //video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  //     // Mark the message as sent, using one tick
  //     //sent: true,
  //     // Mark the message as received, using two tick
  //     //received: true,
  //     // Mark the message as pending with a clock loader
  //     //pending: true,
  //     // Any additional custom parameters are passed through
  //   }

  //   function mapUser(rel: models.contact | undefined): User {
  //     console.log('ChatScreen - Map User for gifted', rel);
  //     let user: User;
  //     if (rel) {
  //       user = {
  //         _id: rel.id,
  //         name: rel.displayName,
  //         avatar: rel.displayPictureUrl,
  //       };
  //     } else {
  //       console.error('Unable to map user', rel);
  //       user = {
  //         _id: '',
  //         name: '',
  //         avatar: '',
  //       };
  //     }

  //     console.log('ChatScreen - mapped user is', user);
  //     return user;
  //   }
}
