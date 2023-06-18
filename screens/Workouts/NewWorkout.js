import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import globalStyles from '../../constants/GlobalStyle'
import { StatusBar } from 'expo-status-bar'
import { ExerciseCard, OvalButton, TextButton } from '../../components'
import { useQuery, useRealm } from '../../models'
import { useApp, useUser } from '@realm/react'
import { FlatList } from 'react-native-gesture-handler'

import { SIZES } from '../../constants'


const NewWorkout = ({navigation}) => {
  const realm = useRealm()
  const app = useApp()
  const user = useUser()
  const workouts = useQuery('Workout')
  const exercises = useQuery('Exercise')

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
    
    
    const workoutId = Realm.BSON.ObjectId();
    
    
    realm.write(() => {
      realm.create('Workout', {
        _id: workoutId,
        name: 'New Workout',
        owner_id: user.id,
        type: 'Strength',
        date: new Date(),
        exercises: [],
      })
    })
    workouts.addListener(OnChange)

    const customDataCollection = user.mongoClient("mongodb-atlas").db("todo").collection("User");
    const filter = {_id: user.id};
    const update = {
      $push: {
        workouts: workoutId,
        }
      }
    await customDataCollection.updateOne(filter, update);
    await user.refreshCustomData();
    console.log('workoutId added to user')

  };
  

  return (

    <View style={globalStyles.container}>
      <StatusBar/>
      <View style={{
        height: 65,
        width: '100%',
        alignItems: 'flex-end'
      }}>
        <TextButton text='Add Workout' onPress={handleAddWorkoutPress}/>
      </View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={globalStyles.subTitle}>Workout Name</Text>
      </View>
      <FlatList
        data={exercises}
        renderItem={({ item }) => <ExerciseCard exercise={item}  />}
        keyExtractor={item => item._id}
      />
      <View>
        {/* need to add route to pick an exercise from a list of predefined exercises */}
        <TextButton text='Add Exercise'/> 
      </View>
    </View>
    
  )
  }

export default NewWorkout
