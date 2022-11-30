import { createAsyncThunk } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import { BOTS_MSGS, BOTS_NAMES } from '../../common/constants';
import { WALLET_CREATED_SUCCESS } from '../action-types/wallet';
import { addProfile, addWallet, changeProfileInfo } from '../slices/wallet';
import { createContact } from './contact';
import { addMessage, initiateChat } from '../slices/chat';
import { MessageType } from '../../models/constants/chat-enums';
import { sendMessage } from '../../helpers/messages';
import {
  addCredentialToList,
  createAndAddCredential,
  createCredential,
} from './credential';
import {
  getCurrentUserContact,
  getRootsHelperContact,
} from '../selectors/contact';
import { updateContact } from '../slices/contact';

const WALLET_NAME_STORAGE_KEY = 'primaryRootsWalletStorageNameKey';

const BASE_WALLET = 'wallet/';
const CREATE_WALLET = `${BASE_WALLET}create`;
const INITIATE_ACCOUNT = `${BASE_WALLET}initiateAccount`;
const INITIATE_CONTACT = `${BASE_WALLET}initiateContact`;
const CREATE_NEW_CREDENTIAL = `${BASE_WALLET}createNewCredential`;
const ADD_CREDENTIAL_AND_NOTIFY = `${BASE_WALLET}addCredentialAndNotify`;
const DENY_CREDENTIAL_AND_NOTIFY = `${BASE_WALLET}denyCredentialAndNotify`;
const UPDATE_PROFILE_AND_NOTIFY = `${BASE_WALLET}updateProfileAndNotify`;


interface CreateWalletDto {
  name: string;
  mnemonic: string;
  password: string;
}

export const createWallet = createAsyncThunk(
  CREATE_WALLET,
  async (wallet: CreateWalletDto, thunkAPI) => {
    const createdWallet = { ...wallet, key: WALLET_NAME_STORAGE_KEY };
    thunkAPI.dispatch(addWallet(createdWallet));
  }
);

export const initiateWalletCreation = createAsyncThunk(
  INITIATE_ACCOUNT,
  async (wallet: CreateWalletDto, thunkAPI) => {
    await thunkAPI.dispatch(createWallet(wallet));
    const rootsHelperId = (
      await thunkAPI.dispatch(
        createContact({
          displayPictureUrl:
            'https://avatars.githubusercontent.com/u/95590918?s=200&v=4',
          displayName: BOTS_NAMES.ROOTS_HELPER,
        })
      )
    ).payload;

    const prismBotId = (
      await thunkAPI.dispatch(
        createContact({
          displayPictureUrl:
            'https://avatars.githubusercontent.com/u/11140484?s=200&v=4',
          displayName: BOTS_NAMES.PRISM_BOT,
        })
      )
    ).payload;

    const userId = (
      await thunkAPI.dispatch(
        createContact({
          displayPictureUrl: 'https://avatars.githubusercontent.com/u/95590918?s=200&v=4',
          displayName: '',
          isCurrentUser: true,
        })
      )
    ).payload;
    thunkAPI.dispatch(addProfile({ _id: userId, displayPictureUrl: 'https://avatars.githubusercontent.com/u/95590918?s=200&v=4', displayName: '' }))
    thunkAPI.dispatch(initiateChat({ chatId: userId }));
    thunkAPI.dispatch(
      addMessage({
        chatId: userId,
        message: sendMessage(
          userId,
          rootsHelperId,
          BOTS_MSGS[0],
          MessageType.TEXT
        ),
      })
    );
    thunkAPI.dispatch(
      addMessage({
        chatId: userId,
        message: sendMessage(
          userId,
          rootsHelperId,
          BOTS_MSGS[1],
          MessageType.TEXT
        ),
      })
    );
    thunkAPI.dispatch(
      addMessage({
        chatId: userId,
        message: sendMessage(
          userId,
          rootsHelperId,
          BOTS_MSGS[2],
          MessageType.TEXT
        ),
      })
    );
    // thunkAPI.dispatch(
    //   addMessage({
    //     chatId: userId,
    //     message: sendMessage(
    //       userId,
    //       prismBotId,
    //       BOTS_MSGS[3],
    //       MessageType.TEXT
    //     ),
    //   })
    // );
    // thunkAPI.dispatch(
    //   addMessage({
    //     chatId: userId,
    //     message: sendMessage(
    //       userId,
    //       prismBotId,
    //       BOTS_MSGS[4],
    //       MessageType.PROMPT_OWN_DID,
    //       false,
    //       '1234567890'
    //     ),
    //   })
    // );
    // thunkAPI.dispatch(
    //   addMessage({
    //     chatId: userId,
    //     message: sendMessage(
    //       userId,
    //       prismBotId,
    //       BOTS_MSGS[5],
    //       MessageType.BLOCKCHAIN_URL,
    //       false,
    //       'randomhash123413132'
    //     ),
    //   })
    // );
    // thunkAPI.dispatch(
    //   addMessage({
    //     chatId: userId,
    //     message: sendMessage(
    //       userId,
    //       prismBotId,
    //       BOTS_MSGS[6],
    //       MessageType.TEXT
    //     ),
    //   })
    // );

    const discordSocialIssuerId = (
      await thunkAPI.dispatch(
        createContact({
          displayPictureUrl:
            'https://avatars.githubusercontent.com/u/1965106?s=200&v=4', //https://cdn.logojoy.com/wp-content/uploads/20210422095037/discord-mascot.png
          displayName: BOTS_NAMES.DISCORD_SOCIAL_ISSUER,
        })
      )
    ).payload;
        console.log('discordSocialIssuerId', discordSocialIssuerId);
    thunkAPI.dispatch(initiateChat({ chatId: discordSocialIssuerId }));
    const today = new Date(Date.now());
    const discordCreds = {
      alias: 'DISCORD HANDLE',
      issuerId: discordSocialIssuerId,
      credSub: {
        HANDLE: `@${faker.internet.userName()}`,
        'MEMBER SINCE': new Date(faker.date.past(2)).toLocaleString(),
        EMAIL: faker.internet.email(),
        'MESSAGE ID': discordSocialIssuerId,
        'CHANNEL ID': discordSocialIssuerId,
        'SERVER ID': discordSocialIssuerId,
        'ISSUED AT': today.toLocaleString(),
      },
      revoked: false,
    };
    console.log('discordCreds', discordCreds);
    const cred = (await thunkAPI.dispatch(createCredential(discordCreds)))
      .payload;
    thunkAPI.dispatch(
      addMessage({
        chatId: discordSocialIssuerId,
        message: sendMessage(
          discordSocialIssuerId,
          rootsHelperId,
          `A Discord Social credential has been created for you`,
          MessageType.PROMPT_PREVIEW_ACCEPT_DENY_CREDENTIAL,
          false,
          { credential: cred }
        ),
      })
    );
    return WALLET_CREATED_SUCCESS;
  }
);

export const initiateNewContact = createAsyncThunk(
  INITIATE_CONTACT,
  async (contact, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const rootsHelper = getRootsHelperContact(getState());
    const currentUser = getCurrentUserContact(getState());
    const newContactId = (
      await dispatch(
        createContact({
          displayPictureUrl: faker.internet.avatar(),
          displayName: faker.internet.userName(),
        })
      )
    ).payload;

    dispatch(initiateChat({ chatId: newContactId }));

    dispatch(
      addMessage({
        chatId: newContactId,
        message: sendMessage(
          newContactId,
          rootsHelper?._id,
          'To celebrate your new contact, you are issuing a verifiable credential',
          MessageType.TEXT
        ),
      })
    );
    const today = new Date(Date.now());
    const credsObject = {
      alias: `${faker.word.adjective()} Credential`,
      issuerId: currentUser?._id,
      credSub: {
        NAME: `${faker.word.adverb()} Credential`,
        achievement: 'Created fake cred',
        'ISSUED AT': today.toISOString(),
        id: currentUser?._id,
      },
      revoked: false,
    };
    const cred = (await dispatch(createAndAddCredential(credsObject))).payload;
    dispatch(
      addMessage({
        chatId: newContactId,
        message: sendMessage(
          newContactId,
          rootsHelper?._id,
          `You have issued a verifiable credential ${cred?.alias}!`,
          MessageType.PROMPT_ISSUED_CREDENTIAL,
          false,
          { credential: cred }
        ),
      })
    );
  }
);

export const createNewCredential = createAsyncThunk(
  CREATE_NEW_CREDENTIAL,
  async (contact, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const rootsHelper = getRootsHelperContact(getState());
    const currentUser = getCurrentUserContact(getState());
    const today = new Date(Date.now());
    const credsObject = {
      alias: `${faker.word.adjective()} Credential`,
      issuerId: currentUser?._id,
      credSub: {
        NAME: `${faker.word.adverb()} Credential`,
        achievement: 'Created fake cred',
        'ISSUED AT': today.toISOString(),
        id: currentUser?._id,
      },
      revoked: false,
    };
    const cred = (
      await dispatch(
        createAndAddCredential(credsObject)
      )
    ).payload;
    dispatch(
      addMessage({
        chatId: currentUser._id,
        message: sendMessage(
          currentUser._id,
          rootsHelper?._id,
          `You created a demo credential ${cred.alias}!`,
          MessageType.PROMPT_ISSUED_CREDENTIAL,
          false,
          { credential: cred }
        ),
      })
    );
  }
);

export const addCredentialAndNotify = createAsyncThunk(
  ADD_CREDENTIAL_AND_NOTIFY,
  async (credential: any, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const rootsHelper = getRootsHelperContact(getState());
    const cred = (await dispatch(addCredentialToList(credential))).payload;
    dispatch(
      addMessage({
        chatId: credential.issuerId,
        message: sendMessage(
          credential.issuerId,
          rootsHelper?._id,
          `Discord Social credential accepted ${cred.alias}!`,
          MessageType.PROMPT_ACCEPTED_CREDENTIAL,
          false,
          { credential: cred }
        ),
      })
    );
  }
);

export const denyCredentialAndNotify = createAsyncThunk(
  DENY_CREDENTIAL_AND_NOTIFY,
  async (credential: any, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const rootsHelper = getRootsHelperContact(getState());
    dispatch(
      addMessage({
        chatId: credential.issuerId,
        message: sendMessage(
          credential.issuerId,
          rootsHelper?._id,
          `Discord social credential denied!`,
          MessageType.TEXT,
          false
        ),
      })
    );
  }
);

export const updateProfileInfo = createAsyncThunk(
  UPDATE_PROFILE_AND_NOTIFY,
  async (profile: any, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const rootsHelper = getRootsHelperContact(getState());
    const currentUser = getCurrentUserContact(getState());
    dispatch(changeProfileInfo({...profile.data}));
    dispatch(updateContact({ _id: currentUser?._id, ...profile.data}));
    dispatch(
      addMessage({
        chatId: currentUser?._id,
        message: sendMessage(
          currentUser?._id,
          rootsHelper?._id,
          profile.message,
          MessageType.TEXT
        ),
      })
    );
  }
);