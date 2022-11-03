import { ID_SEPARATOR, ModelType, message, DID_PUBLISH_TX, getStorageKey } from '../models';
import { MessageType } from '../models/constants/chat-enums';

export function createMessageId(chatAlias: string, relId: string, msgNum: number): string {
    let msgId = getStorageKey(chatAlias, ModelType.MESSAGE) + ID_SEPARATOR + relId + ID_SEPARATOR + String(msgNum);
    return msgId;
}

export function createMessage(
  idText: string,
  bodyText: string,
  statusText: string,
  timeInMillis: number,
  relId: string,
  system = false,
  data: any
): any {
  const msg = {
    body: bodyText,
    createdTime: timeInMillis,
    data: data,
    id: idText,
    rel: relId,
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
          messageId: msg.id,
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
          messageId: msg.id,
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
          messageId: msg.id,
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
          messageId: msg.id,
        },
        {
          title: 'Revoke',
          value: MessageType.PROMPT_ISSUED_CREDENTIAL + 'CRED_REVOKE',
          messageId: msg.id,
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
          messageId: msg.id,
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
          messageId: msg.id,
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

export async function sendMessage(
  chat: any,
  msgText: string,
  msgType: MessageType,
  contactAlias: string,
  system = false,
  data: any = {}
) {
  const msgTime = Date.now();
  const msgId = createMessageId(chat.id, '123', msgTime);
  let msg = createMessage(msgId, msgText, msgType, msgTime, '1', system, data);
  msg = addMessageExtensions(msg);
  return {...msg, received: true}
}
