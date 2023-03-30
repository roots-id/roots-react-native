//adds credential to the ui list on the second page
import { addCredentialToList
 } from "../store/thunks/credential";
//create a contact, add it to the ui list on the first page and add it to the store
import { addContact } from '../store/slices/contact';
// Create a chat for the ChatScreen witch a contact id. you will need the chatid to add messages to the chat interface
import {initiateChat, addMessage, updateMessage, } from '../store/slices/chat';
//redux util
import { useDispatch, useSelector } from 'react-redux';
//helper to add metadata to a message 
import {addMsgMetadata } from './../helpers/messages';
import { MessageType } from '../models/constants';

import { getChatById } from '../store/selectors/chat';

//get called when the app is loaded for the first time and when the app is loaded from the background
export const loadAgent = async (dispatch: any) => {
    const RootsIDClient = await dispatch(addContact({
      _id: 'RootsIDClient',
      displayName: 'Activity',
      displayPictureUrl: 'https://source.unsplash.com/500x500/?soccer,logo'
    })).payload;
    console.log('RootsIDClient', RootsIDClient);

    const contact = await dispatch(addContact({
      _id: 'rootUser',
      displayName: 'Activity Log',
      displayPictureUrl: 'https://source.unsplash.com/500x500/?logo,soccer'
    })).payload;
    console.log('contact', contact);

    const chat = await dispatch(initiateChat({
      chatId: contact._id//is the id from above eg: rootUser}
    }
    )).payload;
    console.log('chat', chat);

    dispatch(
      addMessage({
        chatId: contact._id,
        message: addMsgMetadata(
          contact._id,
          RootsIDClient._id,
          `Welcome to the Activity Log`,
          MessageType.TEXT,
          false,
          {}
        ),
      })
    )
    let credential_offer = {
      credential: {
        is_offer: 'offered', //if you comment it out you don't get the accept or decline workflow
        image_url: 'https://source.unsplash.com/500x500/?soccer,logo',
        id: 'offer-34jkh5-n3l4kt-hn4w5ltu',
        type: ['VerifiableCredential', 'UniversityDegreeCredential'],
        issuer: 'https://example.edu/issuers/14',
        issuanceDate: '2020-03-10T04:24:12.164Z',
        credentialSubject: {
          id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
          degree: {
            type: 'BachelorDegree',
            name: 'Bachelor of Science and Arts',
          },
        }
      }
    }
    dispatch(
      addMessage({
        chatId: contact._id,
        message: addMsgMetadata(
          contact._id,
          'RootsIDClient',
          `You have been offered a verifiable credential!`,
          MessageType.CREDENTIAL_OFFER,
          false,
          credential_offer
        ),
      })
    );
    let credential = {
      credential: {
        // is_offer: 'offered', //if you comment it out you don't get the accept or decline workflow
        image_url: 'https://source.unsplash.com/500x500/?soccer,logo',
        id: 'cred-34jkh5-n3l4kt-hn4w5ltu',
        type: ['VerifiableCredential', 'UniversityDegreeCredential'],
        issuer: 'https://example.edu/issuers/14',
        issuanceDate: '2020-03-10T04:24:12.164Z',
        credentialSubject: {
          id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
          degree: {
            type: 'BachelorDegree',
            name: 'Bachelor of Science and Arts',
          },
        }
      }
    }
    dispatch(addCredentialToList(credential.credential));

    dispatch(
      addMessage({
        chatId: contact._id,
        message: addMsgMetadata(
          contact._id,
          'RootsIDClient',
          `You have been issued a verifiable credential!`,
          MessageType.CREDENTIAL_VIEW,
          false,
          credential
        ),
      })
    );
  }

// get called when scanning a qr code 
export const handleQrCode = async (qrCode: string) => {
    console.log('qrCode', qrCode);
}

// gets called every 1 second in the background and starts 3 seconds after the app is loaded 
export const handleBackgroundTick = async () => {
  console.log('background tick');
}

export const handleUserInput = async (message: any, dispatch: any, chat: any) => {

    dispatch(
      addMessage({
        chatId: chat._id,
        message: addMsgMetadata(
          chat._id,
          message.user._id,
          message.text,
          MessageType.TEXT,
          false,
          {}
        ),
      })
    )
}


