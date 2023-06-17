import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import globalStyles from '../../constants/GlobalStyle'
import { StatusBar } from 'expo-status-bar'
import { OvalButton } from '../../components'
import { useQuery, useRealm } from '../../models'
import { FlatList } from 'react-native-gesture-handler'
import { useApp } from '@realm/react'


const ExistingWorkouts = ({ navigation }) => {
  const realm = useRealm()
  const app = useApp()
  const getWorkouts = () => {
    const workouts = useQuery('Workout')
    return workouts
  }
  const getUsers = () => {
    const users = realm.objects('User')
    return users
  }

  console.log(getWorkouts())

  const handleNewWorkoutPress = () => {
    navigation.navigate('NewWorkout')
  }
  return (
    <View style={globalStyles.container}>
      <StatusBar/>
      
      <FlatList
        data={getWorkouts()}
        renderItem={({ item }) => <Text style={globalStyles.text}>{item.name}</Text>}
        keyExtractor={item => item._id}
        style={{marginTop: 20}}
      />
      <OvalButton text='New Workout' onPress={handleNewWorkoutPress}/>

    </View>
  )

}
export default ExistingWorkouts
