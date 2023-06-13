import { View, Image, Text, StyleSheet } from 'react-native';

function Loading() {
  return (
    <View style={styles.loader}>
      <Image style={styles.loader__image} source={require('../../assets/loading.png')} />
      <Text style={styles.loader__text}>Загрузка...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader__image: {
    width: 150,
    resizeMode: 'contain',
  },
  loader__text: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'TTNormsPro',
  }
});

export default Loading;