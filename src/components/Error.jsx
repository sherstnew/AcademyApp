import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

function Error({text, callback, navigation}) {
  return (
      <View style={styles.error}>
        <Image source={require('../../assets/errorsmile.png')} style={styles.error__image} />
        {
          text
          ?
          <Text style={styles.error__text}>{text}</Text>
          :
          <Text style={styles.error__text}>Произошла неизвестная ошибка, попробуйте еще раз.</Text>
        }
        <View style={styles.choose}>
          {
            callback
            ?
            <Pressable title='Повторить' onPress={() => callback()} style={styles.choose__btn}>
              <Text style={styles.btn__text}>Повторить</Text>
            </Pressable>
            :
            <View />
          }
          {
            navigation
            ?
            <Pressable title='Домой' onPress={() => navigation.goBack()} style={styles.choose__btn}>
              <Text style={styles.btn__text}>Обратно</Text>
            </Pressable>
            :
            <View />
          }
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  error: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  error__image: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
  error__text: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'TTNormsPro',
    width: 300,
  },
  choose: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 20,
  },
  choose__btn: {
    width: 200,
    backgroundColor: '#9456ff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  btn__text: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'TTNormsPro',
  }
});

export default Error;