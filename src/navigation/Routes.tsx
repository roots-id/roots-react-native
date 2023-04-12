import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LocalStorageService } from '../services';
import { USER_AUTH } from '../common/constants';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletExists } from '../store/selectors/wallet';
import { MessageType } from '../models/constants';
import { addMsgMetadata } from './../helpers/messages';
import { addContact } from '../store/slices/contact';
import { initiateChat, addMessage } from '../store/slices/chat';
import { veramoagent } from '../../setup'
import { sendMessageToChat } from '../store/thunks/chat';

import { createMediateRequestMessage , pickup} from '../utils/didcomm-mediation';
import { createTrustPingMessage } from '@veramo/did-comm/src/protocols/trust-ping-message-handler';
import { IDIDCommMessage } from '@veramo/did-comm/';
import { STATUS_REQUEST_MESSAGE_TYPE, DELIVERY_REQUEST_MESSAGE_TYPE } from '@veramo/did-comm/src/protocols/messagepickup-message-handler';
import { QUEUE_MESSAGE_TYPE } from '@veramo/did-comm/src/protocols/routing-message-handler'
const localStorageService = new LocalStorageService();

export const AuthContext = React.createContext({});

export default function Routes() {
  console.log('Routes - navigation/Routes');
  const [isLoggedIn, setLoggedIn] = useState(true);
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
    // const FakeConnection = async () => {
    //   const RootsIDClient = await dispatch(addContact({
    //     _id : 'RootsIDClient',
    //     displayName: 'Activity Log',
    //     displayPictureUrl: 'https://source.unsplash.com/500x500/?soccer,logo'
    //   })).payload;
    //   console.log('RootsIDClient', RootsIDClient);

    //     const contact = await dispatch(addContact({
    //       _id : 'rootUser',
    //       displayName: 'Activity Log',
    //       displayPictureUrl: 'https://source.unsplash.com/500x500/?logo,soccer'
    //     })).payload;
    //     console.log('contact', contact);

    //     const chat = await dispatch(initiateChat({
    //       chatId : contact._id//is the id from above eg: rootUser}
    //     }
    //     )).payload;
    //     console.log('chat', chat);

    //     const message = await dispatch(sendMessageToChat({
    //       chatId: contact._id,
    //       message: 'Welcome to the Activity Log',
    //       senderId: RootsIDClient._id,
    //       type: MessageType.TEXT
    //     })).payload;


    //     dispatch(
    //   addMessage({
    //     chatId: contact._id,
    //     message: addMsgMetadata(
    //       contact._id,
    //       'RootsIDClient',
    //       `You have been issued a verifiable credential!`,
    //       MessageType.CREDENTIAL_OFFER,
    //       false,
    //       { credential: {
    //         is_offer: 'offered',
    //         image_url: 'https://source.unsplash.com/500x500/?soccer,logo',
    //         id: '435hk-34jkh5-n3l4kt-hn4w5ltu',
    //         type: ['VerifiableCredential', 'UniversityDegreeCredential'],
    //         issuer: 'https://example.edu/issuers/14',
    //         issuanceDate: '2020-03-10T04:24:12.164Z',
    //         credentialSubject: {
    //           id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    //           degree: {
    //             type: 'BachelorDegree',
    //             name: 'Bachelor of Science and Arts',
    //           },
    //         }
    //       } }
    //     ),
    //   })
    // );
    //   setLoggedIn(true);
    // };
    // FakeConnection();

    const createIdentifier = async () => {
      const holder_local_did_peer = await veramoagent.didManagerCreate({
        provider: 'did:peer',
        options: {
          num_algo: 2,
          service: {
            id: "#didcomm-0",
            type: "DIDCommMessaging",
            serviceEndpoint: "https://47b5-2a01-11-9210-5210-d860-93a4-fdd6-90aa.eu.ngrok.io/messaging",
            description: "a DIDCOMM V2 endpoint in veramo that supports did:peer "
          }
        }
      })
      // console.log('ChatScreen - created identifier for ed25519 key', did_key_local_id);
      console.log('ChatScreen - created did', holder_local_did_peer.did);


      const holder_local_did_key = await veramoagent.didManagerCreate({
        provider: 'did:key'
      })

      const mediator = await veramoagent.resolveDid({ didUrl: 'did:web:dev-didcomm-mediator.herokuapp.com' })
      const mediator_peer = await veramoagent.resolveDid({ didUrl: 'did:peer:2.Ez6LSmbbJFxvsueDc6o9zEnHgkZi4ps9cPh523P2WcwgWsJvC.Vz6MkjfvhjYpoBJoyeLJBk4nHCQh6QxH1NS37iNkupoTTMuji.SeyJpZCI6IndoYXRldmVyMSIsInQiOiJkbSIsInMiOiJodHRwczovL2Rldi1kaWRjb21tLW1lZGlhdG9yLmhlcm9rdWFwcC5jb20vbWVzc2FnaW5nIn0' })
      console.log('mediator endpoint', mediator_peer.didDocument.service[0].serviceEndpoint)

      // const mediator = await veramoagent.resolveDid({ didUrl: 'did:peer:2.Ez6LScNquUG6jLxNvB1E5jAhBGXnDCVx3hXS7HoA751En5F3W.Vz6MkmtkfnmeFECEQ73sv6RPpsrUrR7DsMuDSwVYwceHCgSon.SeyJpZCI6IiNkaWRjb21tLTAiLCJ0IjoiZG0iLCJzIjoiaHR0cHM6Ly80N2I1LTJhMDEtMTEtOTIxMC01MjEwLWQ4NjAtOTNhNC1mZGQ2LTkwYWEuZXUubmdyb2suaW8vbWVzc2FnaW5nIiwiZGVzY3JpcHRpb24iOiJhIERJRENPTU0gVjIgZW5kcG9pbnQgaW4gdmVyYW1vIHRoYXQgc3VwcG9ydHMgZGlkOnBlZXIgIn0' })
      // console.log('ChatScreen - resolved did mediato identifier', JSON.stringify(mediator_peer, null, 2));

      // console.log('ChatScreen - resolved did peer identifier', JSON.stringify(peer_did, null, 2));

      // const message = {
      //   type: 'https://didcomm.org/basicmessage/2.0/message',
      //   to: mediator.didDocument.id,
      //   from: did_key_local_id.did,
      //   id: '123',
      //   body: { content: 'Hello veramo from roots' },
      // }
      // console.log('ChatScreen - message', message);
      // const packedMessage = await veramoagent.packDIDCommMessage({
      //   packing: 'authcrypt',
      //   message
      // })
      // console.log('ChatScreen - packed message', packedMessage);

      const trustPingMessage = createMediateRequestMessage(holder_local_did_peer.did, mediator_peer.didDocument.id)
      // console.log('ChatScreen - trustPingMessage', trustPingMessage);
      const packedTrustPingMessage = await veramoagent.packDIDCommMessage({
        packing: 'authcrypt',
        message: trustPingMessage,
      })
      // console.log('ChatScreen - packedTrustPingMessage', packedTrustPingMessage.message);
      let res = await veramoagent.sendDIDCommMessage({
        packedMessage: packedTrustPingMessage,
        messageId: trustPingMessage.id,
        recipientDidUrl: mediator_peer.didDocument.id,
      })

      console.log('ChatScreen - createMediateRequestMessage response', res);
      //wait 5 seconds
      pickup(veramoagent, holder_local_did_peer.did, 'did:peer:2.Ez6LSmbbJFxvsueDc6o9zEnHgkZi4ps9cPh523P2WcwgWsJvC.Vz6MkjfvhjYpoBJoyeLJBk4nHCQh6QxH1NS37iNkupoTTMuji.SeyJpZCI6IndoYXRldmVyMSIsInQiOiJkbSIsInMiOiJodHRwczovL2Rldi1kaWRjb21tLW1lZGlhdG9yLmhlcm9rdWFwcC5jb20vbWVzc2FnaW5nIn0')



      //// https://github.com/uport-project/veramo/blob/next/packages/did-comm/src/__tests__/messagepickup-message-handler.test.ts
      // const mediateRequestMessage = createMediateRequestMessage(recipient.did, mediator.did)
      // const packedmediateRequestMessage = await veramoagent.packDIDCommMessage({
      //   packing: 'authcrypt',
      //   message: mediateRequestMessage,
      // })
      // await veramoagent.sendDIDCommMessage({
      //   messageId: mediateRequestMessage.id,
      //   packedmediateRequestMessage,
      //   recipientDidUrl: mediator.did,
      // })

      // // Send StatusRequest
      // const statusRequestMessage: IDIDCommMessage = {
      //   id: '1234',
      //   type: STATUS_REQUEST_MESSAGE_TYPE,
      //   to: mediator.did,
      //   from: recipient.did,
      //   return_route: 'all',
      //   body: {},
      // }
      // const packedstatusRequestMessag = await veramoagent.packDIDCommMessage({
      //   packing: 'authcrypt',
      //   message: statusRequestMessage,
      // })
      // let packedResponse = await veramoagent.sendDIDCommMessage({
      //   messageId: statusRequestMessage.id,
      //   packedstatusRequestMessag,
      //   recipientDidUrl: mediator.did,
      // })
      // let unpackedResponse = await veramoagent.unpackDIDCommMessage({
      //   packedMessage: packedResponse,
      // })
      // console.log('ChatScreen - unpacked response', unpackedResponse.message);

      // // Send DeliveryRequest
      // const deliveryRequestMessage: IDIDCommMessage = {
      //   id: '1235',
      //   type: DELIVERY_REQUEST_MESSAGE_TYPE,
      //   to: mediator.did,
      //   from: recipient.did,
      //   return_route: 'all',
      //   body: { limit: 1 },
      // }
      // const packedDeliveryRequestMessage = await veramoagent.packDIDCommMessage({
      //   packing: 'authcrypt',
      //   message: deliveryRequestMessage,
      // })
      // const packedDeliveryResponse = await veramoagent.sendDIDCommMessage({
      //   messageId: packedDeliveryRequestMessage.id,
      //   packedMessage,
      //   recipientDidUrl: mediator.did,
      // })
      // const unpackedDeliveryResponse = await veramoagent.unpackDIDCommMessage({
      //   packedMessage: packedDeliveryResponse,
      // })
      // console.log('ChatScreen - unpacked delivery response', unpackedDeliveryResponse.message);


    }
    createIdentifier();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isLoggedIn ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
