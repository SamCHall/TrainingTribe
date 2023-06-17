import { View, Text } from 'react-native'
import React from 'react'
import globalStyles from '../../constants/GlobalStyle'
import { StatusBar } from 'expo-status-bar'
import { OvalButton } from '../../components'
import { createStackNavigator } from '@react-navigation/stack'
import ExistingWorkouts from './ExistingWorkouts'
import NewWorkout from './NewWorkout'



const Stack = createStackNavigator()

const Workouts = () => {

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="ExistingWorkouts" component={ExistingWorkouts} />
      <Stack.Screen name="NewWorkout" component={NewWorkout} />
    </Stack.Navigator>
  )
}

export default Workouts
