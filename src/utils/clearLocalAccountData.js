import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearLocalAccountData = async () => {
  try {
    await AsyncStorage.clear();
  }
  catch (err) {
    console.log(err);
  }
};