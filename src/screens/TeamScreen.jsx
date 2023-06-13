import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Player from '../components/Player';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { ACADEMYCONFIG } from './../../ACADEMYCONFIG';
let repeats = 0;

export default function TeamScreen({navigation}) {

  const [status, setStatus] = useState(null);
  const [team, setTeam] = useState({});
  const [currentPosition, setCurrentPosition] = useState('Все');
  const [players, setPlayers] = useState([]);
  const [repeatCounter, setRepeatCounter] = useState(0);

  useEffect(() => {
    getTeam();
  }, []);

  function getTeam() {
    setStatus('loading');
    fetch(`${ACADEMYCONFIG.HOST}/api/teams?id=6432fad356488b9f52061643`)
    .then(data => data.json())
    .then(res => {
      if (res.status === 'ok') {
        setTeam(res.data);
        setPlayers(res.data.players);
        setStatus('success');
      } else {
        setStatus('error');
      }
    })
    .catch(err => {
      console.log(err);
      if (repeats < 5) {
        repeats++;
        setTimeout(getTeam, 2000);
      } else {
        repeats = 0;
        setStatus('error');
      }
    });
  };

  function filterPlayers(position) {
    if (status === 'success') {
      setCurrentPosition(position);
      if (position === 'Все') {
        setPlayers(team.players);
      } else {
        setPlayers(team.players.filter(player => player.position === position));
      }
    };
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu} horizontal={true} contentContainerStyle={{paddingRight: 20}}>
        <Text style={currentPosition === 'Все' ? styles.menu__item_selected : styles.menu__item} onPress={() => filterPlayers('Все')}>
          Все
        </Text>
        <Text style={currentPosition === 'Доигровщик' ? styles.menu__item_selected : styles.menu__item} onPress={() => filterPlayers('Доигровщик')}>
          Доигровщики
        </Text>
        <Text style={currentPosition === 'Центральный блокирующий' ? styles.menu__item_selected : styles.menu__item} onPress={() => filterPlayers('Центральный блокирующий')}>
          Блокирующие
        </Text>
        <Text style={currentPosition === 'Связующий' ? styles.menu__item_selected : styles.menu__item} onPress={() => filterPlayers('Связующий')}>
          Связующие
        </Text>
        <Text style={currentPosition === 'Диагональный' ? styles.menu__item_selected : styles.menu__item} onPress={() => filterPlayers('Диагональный')}>
          Диагональные
        </Text>
        <Text style={currentPosition === 'Либеро' ? styles.menu__item_selected : styles.menu__item} onPress={() => filterPlayers('Либеро')}>
          Либеро
        </Text>
      </ScrollView>
      <ScrollView>
        {
          status === 'success'
          ?
          players.map(player => <Player key={player._id} player={player} navigation={navigation} />)
          :
          status === 'error'
          ?
          <Error text={'Не удалось получить данные о команде, попробуйте снова.'} callback={getTeam} navigation={navigation} />
          :
          <Loading />
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F4FB',
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    minHeight: 90,
    maxHeight: 90,
  },
  menu__item: {
    borderRadius: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    marginRight: 20,
    width: 200,
    height: 45,
    padding: 10,
    backgroundColor: '#F7F4FB',
    fontFamily: 'TTNormsPro',
  },
  menu__item_selected: {
    borderRadius: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    marginRight: 20,
    width: 200,
    height: 45,
    padding: 10,
    backgroundColor: '#9456ff',
    color: '#ffffff',
    fontFamily: 'TTNormsPro',
  },
});