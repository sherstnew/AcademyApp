import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import NewsItem from './../components/NewsItem';
import Loading from '../components/Loading';
import { getNews } from './../utils/getNews';
import Error from '../components/Error';
import Icon from 'react-native-vector-icons/AntDesign';

export default function HomeScreen({navigation}) {

  const [status, setStatus] = useState(null);
  const [news, setNews] = useState([]);

  async function fetchNews() {
    setStatus('loading');
    const newsData = await getNews();
    if (newsData) {
      setNews(newsData);
      setStatus('success');
    } else {
      setStatus('error');
    };
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.academy}>
          <Image style={styles.academy__logo} source={require('../../assets/academylogo.png')} />
          <Text style={styles.academy__text}>Академия</Text>
        </View>
        <Icon name='reload1' size={30} color='#000000' onPress={() => fetchNews()}/>
      </View>
      {
        status === 'loading'
        ?
        <Loading />
        :
        status === 'error'
        ?
        <Error text={'Не удалось получить новости, попробуйте снова.'} callback={getNews} />
        :
        <ScrollView style={styles.news}>
          {
            news.map(newsItem => <NewsItem key={newsItem._id} newsItem={newsItem} navigation={navigation} />)
          }
        </ScrollView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F4FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    gap: 80,
  },
  academy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  academy__logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  academy__text: {
    fontFamily: 'TTNormsPro',
    fontSize: 25,
  },
  news: {
    marginTop: 50
  }
});