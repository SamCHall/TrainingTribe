import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { RealmProvider } from "./models";

import Home from './screens/Home';
import Login from './screens/Login';
import { AppProvider, UserProvider, useApp } from '@realm/react';
;


const Stack = createStackNavigator();

function App() {
  const app = useApp();
  return (
    <NavigationContainer>
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
