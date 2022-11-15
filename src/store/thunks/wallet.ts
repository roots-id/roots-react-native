import { createAsyncThunk } from '@reduxjs/toolkit'
import { WALLET_CREATED_SUCCESS } from '../action-types/wallet';
import { addWallet } from '../slices/wallet';

const WALLET_NAME_STORAGE_KEY = "primaryRootsWalletStorageNameKey"

const BASE_WALLET = 'wallet/';
const CREATE_WALLET = `${BASE_WALLET}create`;

interface CreateWalletDto {
    name: string,
    mnemonic: string,
    password: string
}

export const createWallet = createAsyncThunk(
    CREATE_WALLET,
  async (wallet: CreateWalletDto, thunkAPI) => {
    // TODO-Dummy: Dummy Wallet created, will replace this with original wallet creation
    const createdWallet = {...wallet, key: WALLET_NAME_STORAGE_KEY };
    thunkAPI.dispatch(addWallet(createdWallet));
    return WALLET_CREATED_SUCCESS
  }
)