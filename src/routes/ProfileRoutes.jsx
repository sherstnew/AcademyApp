import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../components/Profile';
import Settings from '../screens/SettingsScreen';

const Stack = createStackNavigator();

function ProfileRoutes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerTitleStyle: {fontFamily: 'TTNormsPro', marginLeft: 20}}}>
        <Stack.Screen name="Profile" options={{title: 'Профиль'}} component={Profile} />
        <Stack.Screen name="Settings" options={{title: 'Настройки'}} component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProfileRoutes;