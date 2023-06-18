import React from 'react'
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
