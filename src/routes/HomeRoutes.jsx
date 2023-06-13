import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';

const Stack = createStackNavigator();

function StartScreen() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerTitleStyle: {fontFamily: 'TTNormsPro', marginLeft: 20}}}>
        <Stack.Screen name="Home" options={{title: 'Главная'}} component={ HomeScreen } />
        <Stack.Screen name="News" options={{title: 'Новости'}} component={ NewsScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StartScreen;