import React, { useEffect, useState } from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, StyleSheet, View} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Roboto_100Thin, Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';

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
import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';



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
  // const PERSISTENCE_KEY = 'NAVIGATION_STATE'
  // const [initialState, setInitialState] = useState();
  const [isReady, setIsReady] = useState(true); //Change back to false when using persistence

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

  //   const restoreState = async () => {
  //     try {
  //       const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
  //       const state = JSON.parse(savedStateString);
  //       setInitialState(state);
  //     } finally {
  //       setIsReady(true);
  //     }
  //   };

  //   if (!isReady) {
  //     restoreState();
  //   }
  }, [])


  const [loaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    // Roboto_900Black
  });
  
  if (!loaded || !isReady) {
    
    return <View style={globalStyles.centeredContainer}>
      <CustomStatusBar />
      <ActivityIndicator size='large' animating={true} color={COLORS.tertiary}/>
    </View>;
  }

  return (
    <NavigationContainer 
    theme={theme}
    // initialState={initialState}
    // onStateChange={(state) =>
    //   AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
    // }
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
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
      </SafeAreaView>
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
