import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

function Player({player, navigation}) {
  return (
    <Pressable style={styles.player} onPress={() => navigation.navigate('Player', {player: player})}>
      <View style={styles.image_wrapper}>
        <Image source={player.image ? {uri: player.image} : require('../../assets/notfounduser.png')} style={styles.image} />
      </View>
      <View style={styles.info}>
          <Text style={styles.surname}>{player.name.split(' ')[1]}</Text>
          <Text style={styles.name}>{player.name.split(' ')[0]}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  player: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    margin: 30,
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    flexDirection: 'row'
  },
  info: {
    textAlign: 'right',
  },
  image: {
    width: 75,
    height: 100,
    borderRadius: 20,
  },
  image_wrapper: {
    width: 75,
  },
  surname: {
    fontSize: 25,
    textAlign: 'right',
    fontFamily: 'TTNormsPro',
  },
  name: {
    fontSize: 16,
    textAlign: 'right',
    fontFamily: 'TTNormsPro',
  },
});

export default Player;