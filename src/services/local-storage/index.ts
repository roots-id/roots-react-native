import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageService {
  persist = async (key: string, value: string): Promise<any> => {
    await AsyncStorage.setItem(key, value);
  };
  fetch = async (key: string): Promise<any> => {
    const item = await AsyncStorage.getItem(key);
    return item;
  }
  remove = async (key: string): Promise<any> => {
    await AsyncStorage.removeItem(key);
  }

  clear = async (): Promise<any> => {
    await AsyncStorage.clear();
  }
}
