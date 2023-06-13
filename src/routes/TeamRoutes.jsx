import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TeamScreen from '../screens/TeamScreen';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createStackNavigator();

function TeamRoutes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerTitleStyle: {fontFamily: 'TTNormsPro', marginLeft: 20}}}>
        <Stack.Screen name="Team" options={{title: 'Команда'}} component={ TeamScreen } />
        <Stack.Screen name="Player" options={{title: 'Игрок'}} component={ PlayerScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TeamRoutes;