import { View, Text, StyleSheet, TextInput, Image, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { clearLocalAccountData } from './../utils/clearLocalAccountData';
import { LoggedContext } from '../context/loggedContext';
import { useContext, useEffect, useState } from 'react';
import { getLocalAccountData } from '../utils/getLocalAccountData';
import Loading from '../components/Loading';
import Error from './../components/Error';
import { setLocalAccountData } from '../utils/setLocalAccountData';
import * as DocumentPicker from 'expo-document-picker';
import { getLocalToken } from './../utils/getLocalToken';
import { ACADEMYCONFIG } from './../../ACADEMYCONFIG';
let repeats = 0;

function SettingsScreen({navigation}) {

  const { logged, setLogged } = useContext(LoggedContext);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [status, setStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const exitAccount = () => {
    clearLocalAccountData()
    .then(() => {
      setLogged(false);
      navigation.goBack();
    });
  };

  const updateAccount = () => {

    const data = {};

    data._id = id;
    data.name = name;
    data.surname = surname;
    data.email = email;
    data.password = password;
    data.avatar = avatar;

    fetch(`${ACADEMYCONFIG.HOST}/api/updateAccount`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'ok') {
        setLocalAccountData(data)
        .then(() => {
          setStatus('success');
          navigation.goBack();
        });
      } else {
        setStatus('error');
      };
    })
    .catch(err => {
      console.log(err);
      if (repeats < 5) {
        repeats++;
        setTimeout(updateAccount, 2000);
      } else {
        repeats = 0;
        setStatus('error');
      }
    })
  };

  const getAvatar = () => {
    DocumentPicker.getDocumentAsync({type: 'image/*'})
    .then(result => {
      const uploadedAvatar = {
        uri: result.uri,
        name: result.name,
        type: result.mimeType
      }
      const formData = new FormData();
      formData.append('file', uploadedAvatar);
      getLocalToken()
      .then(token => {
        if (token !== 'NOTOKEN') {
          setStatus('loading');
          fetch(`${ACADEMYCONFIG.HOST}/api/uploadAvatar`, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'academy_token': token,
            },
          })
          .then(res => res.json())
          .then(data => {
            if (data.status === 'ok') {
              getLocalAccountData()
              .then(account => {
                if (account !== 'NOACCOUNT') {
                  account.avatar = data.data.avatar;
                  setLocalAccountData(account)
                  .then(() => {
                    setAvatar(data.data.avatar);
                    setStatus('success');
                  })
                } else {
                  console.log('NOACCOUNT');
                  setStatus('error');
                  setLogged(false);
                }
              })
            } else {
              console.log('SERVER RETURNED ERROR', data);
              setStatus('error');
            }
          })
          .catch(err => {
            console.log(err);
            setStatus('error');
          });
        } else {
          setLogged(false);
          setStatus('error');
        };
      })
    })
  };

  useEffect(() => {
    getLocalAccountData()
    .then(res => {
      if (res !== 'NOACCOUNT') {
        setName(res.name);
        setSurname(res.surname);
        setEmail(res.email);
        setPassword(res.password);
        setAvatar(res.avatar);
        setId(res._id);
      } else {
        setLogged(false);
      }
    })
    .catch(err => {
      console.log(err);
      setLogged(false);
    })
  }, []);

  return (
    status === 'loading'
    ?
    <Loading />
    :
    status === 'error'
    ?
    <Error text={'Произошла ошибка при сохранении, попробуйте снова.'} callback={updateAccount} navigation={navigation} />
    :
    <View style={styles.container}>
      <ScrollView style={styles.settings}>
        <View style={styles.avatar_setting}>
          <Image style={styles.avatar} source={{uri: avatar !== '' ? avatar : 'https://i.ibb.co/cCgD7j3/notfounduser.png'}} onPress={getAvatar} />
          <Icon style={styles.edit} name="edit" size={30} color="#000" onPress={getAvatar} />
        </View>
        <View style={styles.setting}>
          <Text style={styles.label}>Имя</Text>
          <TextInput style={styles.input} cursorColor={'#000000'} placeholder='Ваше имя' onChangeText={setName} defaultValue={name} />
        </View>
        <View style={styles.setting}>
          <Text style={styles.label}>Фамилия</Text>
          <TextInput style={styles.input} cursorColor={'#000000'} placeholder='Ваша фамилия' onChangeText={setSurname} defaultValue={surname} />
        </View>
        <View style={styles.setting}>
          <Text style={styles.label}>E-Mail:</Text>
          <TextInput style={styles.input} cursorColor={'#000000'} placeholder='Ваш E-Mail' onChangeText={setEmail} defaultValue={email} />
        </View>
        <View style={styles.setting}>
          <Text style={styles.label}>Пароль:</Text>
          <TextInput style={styles.input} cursorColor={'#000000'} placeholder='Ваш новый пароль' onChangeText={setPassword} defaultValue={password} secureTextEntry={!showPassword} />
          <Pressable style={styles.eye} onPress={() => setShowPassword(!showPassword)}>
            {
              showPassword
              ?
              <Text style={styles.eye__text}>Скрыть пароль</Text>
              :
              <Text style={styles.eye__text}>Показать пароль</Text>
            }
            <Icon name={showPassword ? "eyeo" : "eye"} size={40} color="#000" />
          </Pressable>
        </View>
        <Pressable style={styles.save} onPress={updateAccount}>
          <Text style={styles.btn__text}>Сохранить</Text>
        </Pressable>
        <Pressable style={styles.exit} onPress={exitAccount}>
          <Text style={styles.btn__text}>Выйти</Text>
          <IonIcon name="exit" size={30} color="#ffffff" />
        </Pressable>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    gap: 30,
  },
  label: {
    fontFamily: 'TTNormsPro',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 75,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingLeft: 30,
    fontFamily: 'TTNormsPro',
    fontSize: 18
  },
  avatar: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 15,
    alignSelf: 'center',
  },
  avatar_setting: {
    marginBottom: 50,
  },
  edit: {
    position: 'absolute',
    top: 150,
    right: 50,
  },
  save: {
    margin: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9456ff',
    borderRadius: 15,
  },
  btn__text: {
    color: '#ffffff',
    fontFamily: 'TTNormsPro',
    fontSize: 18,
  },
  settings: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
  },
  setting: {
    minHeight: 150,
  },
  exit: {
    flexDirection: 'row',
    margin: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F15A59',
    borderRadius: 15,
    gap: 20,
  },
  eye: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 20,
    gap: 30,
  },
  eye__text: {
    fontSize: 18,
    fontFamily: 'TTNormsPro',
    width: 150,
  },
});

export default SettingsScreen;