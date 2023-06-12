import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useApp, UserProvider, AppProvider, RealmProvider} from '@realm/react';
import {Button} from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  if (!RealmProvider) {
    return null;
  }
return (
  <RealmProvider>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    <UserProvider fallback={LogIn}>
      {/* Components with access to the user.
          These components only mount
          if there's an authenticated user.*/}
    </UserProvider>
</RealmProvider>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function LogIn() {
  const app = useApp();
  // This example uses anonymous authentication.
  // However, you can use any authentication provider
  // to log a user in with this pattern.
  async function logInUser() {
    await app.logIn(Realm.Credentials.anonymous());
  }
  return (
    <Button
      title='Log In'
      onPress={logInUser}
    />
  );
}
