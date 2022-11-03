import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { chatReducer } from './chat';
import { contactReducer } from './contact';
import { credentialReducer } from './credential';
import { walletReducer } from './wallet';

const rootReducer = combineReducers({
  chat: chatReducer,
  contact: contactReducer,
  credential: credentialReducer,
  wallet: walletReducer,
});

const persistConfig = {
  key: 'root',
  blacklist: ["credential", "contact", "wallet"], // for now keeping these blacklisted to simulate experience each time app is opened
  version: 1,
  storage: AsyncStorage,
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export default persistedRootReducer;
