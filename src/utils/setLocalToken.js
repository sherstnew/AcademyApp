import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalToken = async (token) => {
  try {
    await AsyncStorage.setItem('@academy_token', token);
  } catch (error) {
    console.log(error);
  }
};