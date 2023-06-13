import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalAccountData = async (account) => {
  try {
    await AsyncStorage.setItem('@account', JSON.stringify(account));
  } catch (error) {
    console.log(error);
  }
};