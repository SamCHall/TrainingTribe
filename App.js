import React from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

import { RealmProvider } from "./models";

import Home from './screens/Home';
import Login from './screens/Login';
import { AppProvider, UserProvider } from '@realm/react';
;


const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  },
};

function App() {

  const [loaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
  });
  
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='Home'
      >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function AppWrapper() {

return (
  <GestureHandlerRootView style={{flex: 1}}>
  <AppProvider id="trainingtribe-fsyid">
      
    <UserProvider fallback={Login}>
      <RealmProvider sync={{
        flexible: true,
        onError: console.error,
      }}>
       
          <App />
        
      </RealmProvider>
    </UserProvider>
  </AppProvider>
  </GestureHandlerRootView>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 10,
    }
});

export default AppWrapper;
