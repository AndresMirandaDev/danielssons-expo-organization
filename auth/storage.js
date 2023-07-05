import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const key = 'authToken';
const language = 'languageSettings';

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log('Error storing the auth token.', error);
  }
};

const getToken = async () => {
  try {
    const authToken = await SecureStore.getItemAsync(key);
    return authToken;
  } catch (error) {
    console.log('Error getting the auth token. ', error);
  }
};

const getUser = async () => {
  const token = await getToken();
  if (token) return jwtDecode(token);
  return;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('Error removing the auth token.', error);
  }
};

const saveLanguage = async (option) => {
  try {
    await SecureStore.setItemAsync(language, option);
  } catch (error) {
    console.log('Error storing the language setting', error);
  }
};

const getLanguage = async () => {
  try {
    const languageSetting = await SecureStore.getItemAsync(language);
    return languageSetting;
  } catch (error) {
    console.log('Error getting the language settings', error);
  }
};

export default {
  storeToken,
  getUser,
  removeToken,
  getToken,
  saveLanguage,
  getLanguage,
};
