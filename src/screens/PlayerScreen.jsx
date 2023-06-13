import { View, Text, ScrollView, StyleSheet } from 'react-native';

function PlayerScreen({route, navigation}) {

  const { player } = route.params;

  return (
    <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.header}>{ player.name }</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: 'TTNormsPro',
  }
});

export default PlayerScreen;