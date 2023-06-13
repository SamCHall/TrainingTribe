import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import { RealmProvider } from "./models";

import Home from './screens/Home';
import Login from './screens/Login';
import { AppProvider, UserProvider, useApp } from '@realm/react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OvalButton } from './components';


const Stack = createStackNavigator();
function AppWrapper() {
  if(!RealmProvider) {
    return null;
  }


return (
  <AppProvider id="trainingtribe-fsyid">
    <UserProvider fallback={Login}>
      <RealmProvider sync={{
        flexible: true,
        onError: console.error,
        initialSubscriptions:{
          update(subs, realm) {
            subs.add(realm.objects('User'));
          },
        }
      }}>
        <NavigationContainer>
          
            <Stack.Navigator screenOptions={{
              headerShown: false
            }}
            initialRouteName='Login'
            
            >
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          
        </NavigationContainer>
      </RealmProvider>
    </UserProvider>
  </AppProvider>
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
