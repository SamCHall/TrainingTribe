import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import globalStyles from '../../constants/GlobalStyle'
import { StatusBar } from 'expo-status-bar'
import { OvalButton } from '../../components'
import { useQuery, useRealm } from '../../models'
import { useApp } from '@realm/react'


const NewWorkout = () => {
  const realm = useRealm()
  const app = useApp()
  const workouts = useQuery('Workout')
  
  function OnChange(workouts, changes) {
    changes.insertions.forEach(index => {
      console.log(`Inserted at position ${index}`)
      const newWorkout = workouts[index]
    })
  }

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const workouts = realm.objects('Workout')
      mutableSubs.add(workouts)
    })
  }, [])

  const handleAddWorkoutPress = async () => {
    realm.write(() => {
      realm.create('Workout', {
        _id: Realm.BSON.ObjectId(),
        owner_id: Realm.BSON.ObjectId(app.currentUser.id),
        name: 'New Workout',
        date: new Date(),
        exercises: [],
      })
    })
    workouts.addListener(OnChange)
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar/>
      <OvalButton text='Add Workout' onPress={handleAddWorkoutPress}/>
    </View>
  )
}

export default NewWorkout
