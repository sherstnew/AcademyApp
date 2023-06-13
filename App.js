import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoggedContext } from './src/context/loggedContext';
import Icon from 'react-native-vector-icons/AntDesign';
import { setCustomText } from 'react-native-global-props';

import HomeRoutes from './src/routes/HomeRoutes';
import ProfileRoutes from './src/routes/ProfileRoutes';
import TeamRoutes from './src/routes/TeamRoutes';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 1000);
const Tab = createBottomTabNavigator();

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      "TTNormsPro": require("./assets/fonts/TTNormsPro-Medium.ttf"),
      "TTNormsProRegular": require("./assets/fonts/TTNormsPro-Regular.ttf")
    })
    .then(() => {
     setFontLoaded(true);
      const customTextProps = {
        style: {
          fontFamily: 'TTNormsPro',
        }
      };
      setCustomText(customTextProps);
    });
  }, []);

  if (!fontLoaded) return null;

  return (
    <LoggedContext.Provider value={{logged: logged, setLogged: setLogged}}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home' screenOptions={{tabBarStyle: { paddingBottom: 10, height: 75 }, tabBarLabelStyle: { fontSize: 16, fontFamily: 'TTNormsPro' }}}>
          <Tab.Screen name="User" component={ ProfileRoutes } options={{ title: 'Профиль', tabBarLabel: 'Профиль', tabBarActiveTintColor: '#9456ff', tabBarIcon: () => <Icon name="user" size={30} color="#000" />, headerShown: false }} />
          <Tab.Screen name="Home" component={ HomeRoutes } options={{ title: 'Главная', tabBarLabel: 'Главная', tabBarActiveTintColor: '#9456ff', tabBarIcon: () => <Icon name="home" size={30} color="#000" />, headerShown: false }} />
          <Tab.Screen name="Team" component={ TeamRoutes } options={{ title: 'Команда', tabBarLabel: 'Команда', tabBarActiveTintColor: '#9456ff', tabBarIcon: () => <Icon name="team" size={30} color="#000" />, headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </LoggedContext.Provider>
  );
};