import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { LoggedContext } from '../context/loggedContext';
import { setLocalToken } from './../utils/setLocalToken';
import { setLocalAccountData } from './../utils/setLocalAccountData';
import Icon from 'react-native-vector-icons/AntDesign';
import Loading from './Loading';
import { ACADEMYCONFIG } from './../../ACADEMYCONFIG';

function LoginForm() {

  const [loginRegister, setLoginRegister] = useState('login');
  const [status, setStatus] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const { logged, setLogged } = useContext(LoggedContext);

  // user data
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [avatar, setAvatar] = useState('abcde');
  const [showPassword, setShowPassword] = useState(false);
  // user data

  const registerAccount = () => {
    if (name !== '' && surname !== '' && email !== '' && password !== '' && avatar !== '') {
      if (password === secondPassword) {
        setPasswordError(false);
        const data = {};
        data.name = name;
        data.surname = surname;
        data.email = email;
        data.password = password;
        data.avatar = avatar;
        fetch(`${ACADEMYCONFIG.HOST}/api/register`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        })
        .then(data => data.json())
        .then(res => {
          if (res.status === 'ok') {
            setLocalToken(res.data.token)
            .then(() => {
              setLocalAccountData(res.data.account)
              .then(() => {
                setStatus('success');
                setLogged(true);
              });
            })
          } else {
            setStatus('error');
          }
        })
        .catch(err => {
          console.log(err);
          setStatus('error');
        })
      } else {
        setPasswordError(true);
        setStatus('error');
      }
    } else {
      setStatus('error');
    }
  };

  const loginAccount = () => {
    const data = {};
    data.email = email;
    data.password = password;
    if (email !== '' && password !== '') {
      setStatus('loading');
      fetch(`${ACADEMYCONFIG.HOST}/api/authAccount`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      })
      .then(data => data.json())
      .then(res => {
        if (res.status === 'ok') {
          setLocalToken(res.data.token)
          .then(() => {
            setLocalAccountData(res.data.account)
            .then(() => {
              setStatus('success');
              setLogged(true);
            });
          });
        } else {
          setStatus('error');
        }
      })
      .catch(err => {
        console.log(err);
        setStatus('error');
      })
    } else {
      setStatus('error');
    }
  }

  useEffect(() => {
    setStatus(null);
  }, [loginRegister]);

  return (
    status === 'loading'
    ?
    <Loading />
    :
    loginRegister === 'register'
    ?
    <View style={styles.container}>
      <ScrollView style={styles.form} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', gap: 30, paddingVertical: 60 }}>
        <Text style={styles.header}>Зарегистрироваться</Text>
        <View>
          <Text style={styles.label}>Выберите аватарку</Text>
          <Pressable style={styles.secondary_btn}>
            <Text style={styles.secondary_btn__text}>Выбрать файл</Text>
          </Pressable>
        </View>
        <View>
          <Text style={styles.label}>Введите имя:</Text>
          <TextInput style={styles.input} placeholder='Введите имя' value={name} onChangeText={setName} />
        </View>
        <View>
          <Text style={styles.label}>Введите свою фамилию:</Text>
          <TextInput style={styles.input} placeholder='Введите фамилию' value={surname} onChangeText={setSurname} />
        </View>
        <View>
          <Text style={styles.label}>Введите свой E-Mail:</Text>
          <TextInput style={styles.input} placeholder='Введите E-Mail' inputMode='email' value={email} onChangeText={setEmail} />
        </View>
        <View>
          <Text style={styles.label}>Введите пароль:</Text>
          <TextInput style={styles.input} secureTextEntry={!showPassword} placeholder='Введите пароль' value={password} onChangeText={setPassword} />
        </View>
        <View>
          <Text style={styles.label}>Введите пароль еще раз:</Text>
          <TextInput style={styles.input} secureTextEntry={!showPassword} placeholder='Введите пароль' value={secondPassword} onChangeText={setSecondPassword} />
        </View>
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
          {
            passwordError
            ?
            <Text style={styles.error}>Пароли не совпадают.</Text>
            :
            ''
          }
        <Pressable style={styles.primary_btn} onPress={() => registerAccount()}>
          <Text style={styles.primary_btn__text}>Регистрация</Text>
        </Pressable>
        <Pressable style={styles.secondary_btn} onPress={() => setLoginRegister('login')}>
          <Text style={styles.secondary_btn__text}>Войти</Text>
        </Pressable>
        <View>
          {
            status === 'error'
            ?
            <Text style={styles.error}>Произошла ошибка, попробуйте снова.</Text>
            :
            ''
          }
        </View>
      </ScrollView>
    </View>
    :
    <View style={styles.container}>
      <ScrollView style={styles.form} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', gap: 30, paddingVertical: 60 }}>
        <Text style={styles.header}>Войти в аккаунт</Text>
        <View>
          <Text style={styles.label}>Введите свой E-Mail:</Text>
          <TextInput style={styles.input} placeholder='Введите E-Mail' inputMode='email' value={email} onChangeText={setEmail} />
        </View>
        <View>
          <Text style={styles.label}>Введите свой пароль:</Text>
          <TextInput style={styles.input} secureTextEntry={!showPassword} placeholder='Введите пароль' value={password} onChangeText={setPassword} />
        </View>
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
        <Pressable style={styles.primary_btn} onPress={() => loginAccount()}>
          <Text style={styles.primary_btn__text}>Войти</Text>
        </Pressable>
        <Pressable style={styles.secondary_btn} onPress={() => setLoginRegister('register')}>
          <Text style={styles.secondary_btn__text}>Регистрация</Text>
        </Pressable>
        <View>
          {
            status === 'error'
            ?
            <Text style={styles.error}>Произошла ошибка, попробуйте снова.</Text>
            :
            ''
          }
        </View>
      </ScrollView>
    </View>
  );
};

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
  primary_btn: {
    minWidth: 200,
    margin: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9456ff',
    borderRadius: 15,
  },
  primary_btn__text: {
    color: '#ffffff',
    fontFamily: 'TTNormsPro',
    fontSize: 18,
  },
  secondary_btn: {
    minWidth: 200,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  secondary_btn__text: {
    color: '#000000',
    fontFamily: 'TTNormsPro',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  header: {
    width: 300,
    fontFamily: 'TTNormsPro',
    fontSize: 30,
    marginBottom: 20,
  },
  form: {
    flex: 1,
    padding: 20,
    // marginTop: 100,
  },
  error: {
    fontFamily: 'TTNormsPro',
    fontSize: 16,
    color: '#E32EFF',
  },
  eye: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 30,
  },
  eye__text: {
    fontSize: 18,
    fontFamily: 'TTNormsPro',
    width: 150,
  },
});

export default LoginForm;