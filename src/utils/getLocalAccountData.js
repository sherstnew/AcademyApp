import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocalAccountData = async () => {
  try {
    const value = await AsyncStorage.getItem('@account');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return 'NOACCOUNT';
    }
  } catch(e) {
    return 'NOACCOUNT';
  };
};