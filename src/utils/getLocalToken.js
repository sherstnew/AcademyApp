import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocalToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@academy_token');
    if (value !== null) {
      return value;
    } else {
      return 'NOTOKEN';
    }
  } catch(e) {
    return 'NOTOKEN';
  };
};