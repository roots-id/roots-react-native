import { ID_SEPARATOR, ModelType, message, DID_PUBLISH_TX, getStorageKey } from '../models';
import { MessageType } from '../models/constants/chat-enums';

export function createMessageId(chatId: string, relId: string, timestamp: number): string {
    let msgId = getStorageKey(typeof chatId === 'string' ? chatId : String(chatId), ModelType.MESSAGE) + ID_SEPARATOR + relId + ID_SEPARATOR + String(timestamp);
    return msgId;
}

export function formatMessage(
  msgId: string,
  bodyText: string,
  statusText: string,
  timeInMillis: number,
  chatId: string,
  senderId: string,
  system = false,
  data: any
): any {
  const msg = {
    text: bodyText,
    createdAt: timeInMillis,
    data: data,
    _id: msgId,
    rel: chatId,
    senderId: senderId,
    system: system,
    type: statusText,
  };
  return msg;
}
function addQuickReply(msg: message) {


  if (msg.type === MessageType.CREDENTIAL_OFFER) {
    msg.quickReplies = {
      type: 'radio',
      keepIt: true,
      values: [
        {
          title: 'View',
          value: MessageType.CRED_VIEW,
          messageId: msg._id,
        },
      ],
    };
  }


  // if (msg.type === MessageType.PROMPT_PUBLISH) {
  //   msg.quickReplies = {
  //     type: 'radio',
  //     keepIt: true,
  //     values: [
  //       {
  //         title: 'Add to Prism',
  //         value: MessageType.PROMPT_PUBLISH + DID_PUBLISH_TX,
  //         messageId: msg._id,
  //       },
  //     ],
  //   };
  // }
  // if (msg.type === MessageType.PROMPT_DISPLAY_IDENTIFIER) {
  //   msg.quickReplies = {
  //     type: 'radio',
  //     keepIt: false,
  //     values: [
  //       {
  //         title: 'View',
  //         value: MessageType.PROMPT_DISPLAY_IDENTIFIER,
  //         messageId: msg._id,
  //       },
  //       {
  //         title: 'Invitation',
  //         value: MessageType.PROMPT_DISPLAY_OOB,
  //         messageId: msg._id,
  //       },
  //     ],
  //   };
  // }
  // if (msg.type === MessageType.PROMPT_GET_MESSAGES) {
  //   msg.quickReplies = {
  //     type: 'radio',
  //     keepIt: false,
  //     values: [
  //       {
  //         title: 'Check Messages',
  //         value: MessageType.PROMPT_GET_MESSAGES,
  //         messageId: msg._id,
  //       },
  //     ],
  //   };
  // }
  // if (msg.type === MessageType.PROMPT_OWN_DID) {
  //   msg.quickReplies = {
  //     type: 'radio',
  //     keepIt: true,
  //     values: [
  //       {
  //         title: 'View',
  //         value: MessageType.PROMPT_OWN_DID,
  //         messageId: msg._id,
  //       },
  //     ],
  //   };
  // }
  // if (msg.type === MessageType.PROMPT_ACCEPTED_CREDENTIAL) {
  //   msg.quickReplies = {
  //     type: 'radio',
  //     keepIt: true,
  //     values: [
  //       {
  //         title: 'View',
  //         value: MessageType.PROMPT_ACCEPTED_CREDENTIAL + 'CRED_VIEW',
  //         messageId: msg._id,
  //       },
  //     ],
  //   };
  // }
  // if (msg.type === MessageType.PROMPT_ISSUED_CREDENTIAL) {
  //   msg.quickReplies = {
  //     type: 'radio',
  //     keepIt: true,
  //     values: [
  //       {
  //         title: 'View',
  //         value: MessageType.PROMPT_ISSUED_CREDENTIAL + 'CRED_VIEW',
  //         messageId: msg._id,
  //       },
  //       {
  //         title: 'Revoke',
  //         value: MessageType.PROMPT_ISSUED_CREDENTIAL + 'CRED_REVOKE',
  //         messageId: msg._id,
  //       },
  //     ],
  //   };
  // }
  // if (msg.type === MessageType.PROMPT_OWN_CREDENTIAL) {
  //   msg.quickReplies = {
  //     type: 'radio',
  //     keepIt: true,
  //     values: [
  //       {
  //         title: 'View',
  //         value: MessageType.PROMPT_OWN_CREDENTIAL + 'CRED_VIEW',
  //         messageId: msg._id,
  //       },
  //     ],
  //   };
  // }
  // if (msg.type === MessageType.PROMPT_RETRY_PROCESS) {
  //   msg.quickReplies = {
  //     type: 'radio',
  //     keepIt: true,
  //     values: [
  //       {
  //         title: 'Retry',
  //         value: MessageType.PROMPT_RETRY_PROCESS,
  //         messageId: msg._id,
  //       },
  //     ],
  //   };
  // }
  // if (msg.type === MessageType.PROMPT_PREVIEW_ACCEPT_DENY_CREDENTIAL) {
  //   msg.quickReplies = {
  //     type: 'radio',
  //     keepIt: true,
  //     values: [
  //       {
  //         title: 'Preview',
  //         value: MessageType.PROMPT_PREVIEW_ACCEPT_DENY_CREDENTIAL + 'CRED_PREVIEW',
  //         messageId: msg._id,
  //       },
  //       {
  //         title: 'Accept',
  //         value: MessageType.PROMPT_PREVIEW_ACCEPT_DENY_CREDENTIAL + 'CRED_ACCEPT',
  //         messageId: msg._id,
  //       },
  //       {
  //         title: 'Deny',
  //         value: MessageType.PROMPT_PREVIEW_ACCEPT_DENY_CREDENTIAL + 'CRED_DENY',
  //         messageId: msg._id,
  //       },
  //     ],
  //   };
  // }
  return msg;
}
function addMessageExtensions(msg: message) {
  msg = addQuickReply(msg);
  return msg;
}

export function addMsgMetadata(
  chatId: any,
  senderId: any,
  msgText: string,
  msgType: MessageType,
  system = false,
  data: any = {},
  received = true
) {
  const msgTime = Date.now();
  const msgId = createMessageId(chatId, senderId, msgTime);
  let msg = formatMessage(msgId, msgText, msgType, msgTime, chatId, senderId, system, data);
  msg = addMessageExtensions(msg);
  return {...msg, received}
}
