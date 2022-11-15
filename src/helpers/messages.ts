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
  senderId: number,
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
  if (msg.type === MessageType.PROMPT_PUBLISH) {
    msg.quickReplies = {
      type: 'checkbox',
      keepIt: true,
      values: [
        {
          title: 'Add to Prism',
          value: MessageType.PROMPT_PUBLISH + DID_PUBLISH_TX,
          messageId: msg._id,
        },
      ],
    };
  }
  if (msg.type === MessageType.PROMPT_OWN_DID) {
    msg.quickReplies = {
      type: 'checkbox',
      keepIt: true,
      values: [
        {
          title: 'View',
          value: MessageType.PROMPT_OWN_DID,
          messageId: msg._id,
        },
      ],
    };
  }
  if (msg.type === MessageType.PROMPT_ACCEPT_CREDENTIAL) {
    msg.quickReplies = {
      type: 'checkbox',
      keepIt: true,
      values: [
        {
          title: 'Accept',
          value: MessageType.PROMPT_ACCEPT_CREDENTIAL + 'CRED_ACCEPTED',
          messageId: msg._id,
        },
      ],
    };
  }
  if (msg.type === MessageType.PROMPT_ISSUED_CREDENTIAL) {
    msg.quickReplies = {
      type: 'checkbox',
      keepIt: true,
      values: [
        {
          title: 'View',
          value: MessageType.PROMPT_ISSUED_CREDENTIAL + 'CRED_VIEW',
          messageId: msg._id,
        },
        {
          title: 'Revoke',
          value: MessageType.PROMPT_ISSUED_CREDENTIAL + 'CRED_REVOKE',
          messageId: msg._id,
        },
      ],
    };
  }
  if (msg.type === MessageType.PROMPT_OWN_CREDENTIAL) {
    msg.quickReplies = {
      type: 'checkbox',
      keepIt: true,
      values: [
        {
          title: 'View',
          value: MessageType.PROMPT_OWN_CREDENTIAL + 'CRED_VIEW',
          messageId: msg._id,
        },
      ],
    };
  }
  if (msg.type === MessageType.PROMPT_RETRY_PROCESS) {
    msg.quickReplies = {
      type: 'checkbox',
      keepIt: true,
      values: [
        {
          title: 'Retry(Coming Soon)',
          value: MessageType.PROMPT_RETRY_PROCESS,
          messageId: msg._id,
        },
      ],
    };
  }
  return msg;
}
function addMessageExtensions(msg: message) {
  msg = addQuickReply(msg);
  return msg;
}

export function sendMessage(
  chatId: any,
  senderId: number,
  msgText: string,
  msgType: MessageType,
  system = false,
  data: any = {}
) {
  const msgTime = Date.now();
  const msgId = createMessageId(chatId, String(senderId), msgTime);
  let msg = formatMessage(msgId, msgText, msgType, msgTime, chatId, senderId, system, data);
  msg = addMessageExtensions(msg);
  return {...msg, received: true}
}
