import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useApp, useUser } from '@realm/react'
import { HomeHeader, OvalButton } from '../components'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Feed from './Feed'
import Workouts from './Workouts/Workouts'
import MyTribe from './MyTribe'
import Account from './Account'
import UsernameChooser from './UsernameChooser'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../constants'


const Tab = createBottomTabNavigator()


const Home = () => {
  
  useEffect(() => {
    user.refreshCustomData()
  }, [])
  
  const app = useApp()
  const user = useUser()
  const navigation = useNavigation()

  if(!user.customData.username){
    navigation.navigate('UsernameChooser')
  }
  // else if(!user.customData.tribes.length){
  //   navigation.navigate('TribeChooser')
  // }
  
  return (
    <Tab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarStyle: {
        backgroundColor: COLORS.primary,
        borderTopColor: COLORS.tertiary,
        borderTopWidth: 1,
        height:60,
        paddingBottom: 5,
        
      },
      tabBarActiveTintColor: COLORS.tertiary,
      }}
      initialRouteName={'Feed'}
      sceneContainerStyle={{ backgroundColor: COLORS.primary}}
      >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Workouts" component={Workouts} />
      <Tab.Screen name="MyTribe" component={MyTribe} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}

export default Home
