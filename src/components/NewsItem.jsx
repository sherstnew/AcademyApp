import { View, StyleSheet, Image, Text, Pressable } from 'react-native';

function NewsItem({newsItem, navigation}) {

  return (
    <Pressable style={styles.newsItem} onPress={() => navigation.navigate('News', { header: newsItem.header, image: newsItem.image, text: newsItem.text})}>
      <Image style={styles.image} source={newsItem.image ? {uri: newsItem.image} : require('../../assets/errorsmile.png')} />
      <Text style={styles.header}>{ newsItem.header }</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  newsItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 15,
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 15,
  },
  header: {
    width: 300,
    minHeight: 75,
    fontSize: 23,
    fontFamily: 'TTNormsPro',
    borderRadius: 15,
    padding: 20,
  },
  image: {
    width: 300,
    minHeight: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  }
});

export default NewsItem;