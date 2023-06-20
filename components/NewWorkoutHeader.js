import { View, Text } from 'react-native'
import React from 'react'
import { TextButton } from './button'
import { useApp, useUser } from '@realm/react'
import { useQuery, useRealm } from '../models'
import { useEffect } from 'react'
import globalStyles from '../constants/GlobalStyle'
import { COLORS } from '../constants'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const NewWorkoutHeader = () => {
    const realm = useRealm()
    const app = useApp()
    const user = useUser()
    const workouts = useQuery('Workout')
    const exercises = useQuery('Exercise')
    const navigation = useNavigation()
  
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
      await realm.syncSession.uploadAllLocalChanges();
      navigation.replace('ExistingWorkouts')
  
    };

  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.secondary,
    }}>
        <View style={{
           
            alignItems: 'flex-start'
        }}>
            <TextButton text='Cancel' onPress={() => Alert.alert('Cancel', 'Are you sure? Your workout will be lost',
            [
                {
                    text: 'Yes',
                    onPress: () => navigation.replace('Home')
                },
                {
                    text: 'No',
                    onPress: () => console.log('No pressed')
                }
            ]
            )}/>
        </View>
        <View style={{
            alignItems: 'center',
        }}>
            <Text style={globalStyles.subTitle}>Workout log</Text>
        </View>
        <View style={{
            alignItems: 'flex-end'
        }}>
            <TextButton text='Finish' onPress={handleAddWorkoutPress}/>
        </View>
        
    </View>
  )
}

export default NewWorkoutHeader
