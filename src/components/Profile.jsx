import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import LoginForm from './LoginForm';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
const screenWidth = Dimensions.get('screen').width;
import { getLocalAccountData } from './../utils/getLocalAccountData';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { LoggedContext } from '../context/loggedContext';

function Profile({navigation}) {

  const { logged, setLogged } = useContext(LoggedContext);
  const [account, setAccount] = useState({name: '', surname: '', coins: 0, email: '', password: '', avatar: ''});

  useEffect(() => {
    getLocalAccountData()
    .then(res => {
      if (!(res === 'NOACCOUNT')) {
        setAccount(res);
        setLogged(true);
      } else {
        setLogged(false);
      }
    })
    .catch(err => {
      console.log(err);
      setLogged(false);
    });
  });

  return (
    logged
    ?
    <View style={styles.container}>
      <View style={styles.profile}>
        <Icon name='setting' size={40} color="#000" style={{position: 'absolute', top: 30, right: 50}} onPress={() => navigation.push('Settings')} />
        <Image style={styles.avatar} source={{uri: account.avatar !== '' ? account.avatar : 'https://i.ibb.co/cCgD7j3/notfounduser.png'}} />
        <View style={styles.info}>
          <Text style={styles.name}>{account.name}</Text>
          <Text style={styles.surname}>{account.surname}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.coins}>
          <Text style={styles.coins__amount}>{account.coins}</Text>
          <FontAwesomeIcon name='coins' size={30} color='#000' />
        </View>
      </View>
    </View>
    :
    <LoginForm />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F4FB',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    height: 300,
    width: screenWidth,
  },
  avatar: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  name: {
    fontSize: 35,
    fontFamily: 'TTNormsPro',
    textAlign: 'right',
  },
  surname: {
    fontSize: 25,
    fontFamily: 'TTNormsPro',
    textAlign: 'right',
  },
  info: {
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
  },
  coins: {
    flexDirection: 'row',
    gap: 20,
  },
  coins__amount: {
    fontFamily: 'TTNormsPro',
    fontSize: 25,
  },
});

export default Profile;