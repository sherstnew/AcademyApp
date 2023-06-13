import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

function NewsScreen({route, navigation}) {

  const { header, image, text } = route.params;

  return (
    <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
      <Image style={styles.image} source={image ? {uri: image} : require('../../assets/errorsmile.png')} />
      <Text style={styles.header}>{ header }</Text>
      <Text style={styles.text}>
        {
          text
        }
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: 'TTNormsPro',
    fontSize: 25,
    padding: 20,
    textAlign: 'center'
  },
  image: {
    margin: 20,
    width: 350,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  text: {
    fontFamily: 'TTNormsProRegular',
    color: '#393646',
    padding: 30,
    fontSize: 18,
    textAlign: 'justify'
  }
});

export default NewsScreen;