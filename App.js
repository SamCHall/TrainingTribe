import React, { useEffect } from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, StyleSheet, View} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

import globalStyles from './constants/GlobalStyle';
import { RealmProvider } from "./models";
import { useRealm } from "./models";
import Home from './screens/Home';
import Login from './screens/Login';
import UsernameChooser from './screens/UsernameChooser';
import { AppProvider, UserProvider } from '@realm/react';
import 'react-native-get-random-values'
import { COLORS } from './constants';
import { CustomStatusBar } from './components';
import TribeChooser from './screens/TribeChooser';
import CreateTribe from './screens/Tribes/CreateTribe';
import JoinTribe from './screens/Tribes/JoinTribe';
import Profile from './screens/Profile';
import WorkoutDetails from './screens/Workouts/WorkoutDetails';



const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  },
};

function App() {

  const realm = useRealm()

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      mutableSubs.add(realm.objects('Exercise'))
      mutableSubs.add(realm.objects('Workout'))
      mutableSubs.add(realm.objects('User'))
      mutableSubs.add(realm.objects('Set'))
      mutableSubs.add(realm.objects('CardioTracking'))
      mutableSubs.add(realm.objects('Tribe'))
      mutableSubs.add(realm.objects('War'))
    })

    realm.syncSession.downloadAllServerChanges()
    realm.syncSession.uploadAllLocalChanges()
  }, [])


  const [loaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
    'Ionicons': require('./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf')
  });
  
  if (!loaded) {
    
    return <View style={globalStyles.centeredContainer}>
      <CustomStatusBar />
      <ActivityIndicator size='large' animating={true} color={COLORS.tertiary}/>
    </View>;
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // disable animation
          animationEnabled: false,
        }}
        initialRouteName='Home'
      >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UsernameChooser" component={UsernameChooser} />
          <Stack.Screen name="TribeChooser" component={TribeChooser} />
          <Stack.Screen name="CreateTribe" component={CreateTribe}  />
          <Stack.Screen name="JoinTribe" component={JoinTribe}  />
          <Stack.Screen name="Profile"  component={Profile} />
          <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} />
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

export default AppWrapper;
