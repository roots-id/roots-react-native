import { createAsyncThunk } from '@reduxjs/toolkit';
import { addMessage } from '../slices/chat';
import { MessageType } from '../../models/constants/chat-enums';
import { sendMessage } from '../../helpers/messages';


const BASE_CHAT = 'chat/';
const SEND_MESSAGE = `${BASE_CHAT}sendMessage`;

interface SendMessageDto {
  chatId: string;
  senderId: string;
  message: string;
  type: MessageType;
}

export const sendMessageToChat = createAsyncThunk(
    SEND_MESSAGE,
  async (messageDto: SendMessageDto, thunkAPI) => {
    thunkAPI.dispatch(
      addMessage({
        chatId: messageDto.chatId,
        message: sendMessage(
          messageDto.chatId,
          messageDto.senderId,
          messageDto.message,
          messageDto.type,
          false,
          {},
          false
        ),
      })
    );
   
  }
);

