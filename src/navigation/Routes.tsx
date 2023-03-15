import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LocalStorageService } from '../services';
import { USER_AUTH } from '../common/constants';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletExists } from '../store/selectors/wallet';
import { MessageType } from '../models/constants';
import {addMsgMetadata } from './../helpers/messages';
import { addContact } from '../store/slices/contact';
import {initiateChat, addMessage} from '../store/slices/chat';

import { sendMessageToChat } from '../store/thunks/chat';
const localStorageService = new LocalStorageService();

export const AuthContext = React.createContext({});

export default function Routes() {
  console.log('Routes - navigation/Routes');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const walletExists = useSelector(getWalletExists);
  const dispatch = useDispatch();

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // await localStorageService.persist(
        //   USER_AUTH,
        //   JSON.stringify({ id: 'user_5', token: 'jwttoken' })
        // );
        // setLoggedIn(true);
      },
    }),
    []
  );

  useEffect(() => {
       // localStorageService.clear();

    // should check for messaes from mediator 
    const FakeConnection = async () => {
      const RootsIDClient = await dispatch(addContact({
        _id : 'RootsIDClient',
        displayName: 'Activity Log',
        displayPictureUrl: 'https://source.unsplash.com/500x500/?soccer,logo'
      })).payload;
      console.log('RootsIDClient', RootsIDClient);

        const contact = await dispatch(addContact({
          _id : 'rootUser',
          displayName: 'Activity Log',
          displayPictureUrl: 'https://source.unsplash.com/500x500/?logo,soccer'
        })).payload;
        console.log('contact', contact);

        const chat = await dispatch(initiateChat({
          chatId : contact._id//is the id from above eg: rootUser}
        }
        )).payload;
        console.log('chat', chat);

        const message = await dispatch(sendMessageToChat({
          chatId: contact._id,
          message: 'Welcome to the Activity Log',
          senderId: RootsIDClient._id,
          type: MessageType.TEXT
        })).payload;


        dispatch(
      addMessage({
        chatId: contact._id,
        message: addMsgMetadata(
          contact._id,
          'RootsIDClient',
          `You have issued a verifiable credential!`,
          MessageType.CREDENTIAL_OFFER,
          false,
          { credential: {
            is_offer: 'offered',
            image_url: 'https://source.unsplash.com/500x500/?soccer,logo',
            id: '435hk-34jkh5-n3l4kt-hn4w5ltu',
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
          } }
        ),
      })
    );
      setLoggedIn(true);
    };
    FakeConnection();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isLoggedIn ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
