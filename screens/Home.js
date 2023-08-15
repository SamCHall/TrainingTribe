import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useApp, useUser } from '@realm/react'
import { HomeHeader, OvalButton } from '../components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feed from './Feed'
import Workouts from './Workouts/Workouts'
import MyTribe from './MyTribe'
import Account from './Account'
import UsernameChooser from './UsernameChooser'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../constants'
import globalStyles from '../constants/GlobalStyle'

const Tab = createBottomTabNavigator()

const Home = () => {
  useEffect(() => {
    user.refreshCustomData()
  }, [])
  
  const app = useApp()
  const user = useUser()
  const navigation = useNavigation()

  if (!user.customData.username) {
    navigation.navigate('UsernameChooser')
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopColor: COLORS.tertiary,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabel: ({ focused }) => {
          // Hide the label if the icon is not focused
          if (!focused) {
            return null;
          }
    
          // Otherwise, provide the label text based on the route name
          if (route.name === 'Feed') {
            return <Text style={[globalStyles.text, {fontSize:12}]}>Feed</Text>;
          } else if (route.name === 'Workouts') {
            return <Text style={[globalStyles.text, {fontSize:12}]}>Workouts</Text>;
          } else if (route.name === 'MyTribe') {
            return <Text style={[globalStyles.text, {fontSize:12}]}>MyTribe</Text>;
          } else if (route.name === 'Account') {
            return <Text style={[globalStyles.text, {fontSize:12}]}>Account</Text>;
          }
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Workouts') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'MyTribe') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.tertiary,

      })}
      initialRouteName={'Feed'}
      sceneContainerStyle={{ backgroundColor: COLORS.primary }}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Workouts" component={Workouts} />
      <Tab.Screen name="MyTribe" component={MyTribe} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}

export default Home
