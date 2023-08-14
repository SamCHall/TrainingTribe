import { View, Text } from 'react-native'
import React from 'react'
import {COLORS, FONTS, SHADOWS, SIZES} from '../constants'
import globalStyles from '../constants/GlobalStyle'
import { OvalButton } from './button'
import { useNavigation } from '@react-navigation/native'


const WorkoutCard = ({ workout }) => {
    const navigation = useNavigation()

    const totalVolume = (exercise) => {
        let volume = 0
        exercise.sets.forEach((set) => {
            volume += set.reps * set.weight
        })
        return volume
    }
    const totalWorkoutVolume = (workout) => {
        let volume = 0
        workout.exercises.forEach((exercise) => {
            volume += totalVolume(exercise)
        })
        return volume
    }
    const renderCardio = (workout) => {
        for(let i = 0; i < workout.exercises.length; i++){
            if (workout.exercises[i].type === 'Cardio') {
                return (
                    <Text style={globalStyles.text}>Cardio: Yes</Text>
                )
            }
        
        }
        return (
                <Text style={globalStyles.text}>Cardio: No</Text>
            )
    }

  return (
    <View style={{
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.medium,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
        padding: SIZES.base,
    }}>
        <View style={{
            width: 350,
            height: 210,
            padding: SIZES.base
        }}>
            <Text style={[globalStyles.subTitle, {alignSelf:'center', marginBottom: 5}]}>{workout.name}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Text style={globalStyles.text}>{workout.type}</Text>
                    <Text style={globalStyles.text}>{(workout.date).toDateString()}</Text>
                </View>
           
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
            }}>
                <Text style={globalStyles.text}>Exercises: {workout.exercises.length}</Text>
                <Text style={globalStyles.text}>Sets: {workout.exercises.reduce((a, b) => a + b.sets.length, 0)}</Text>
                </View>
            <View style={{
                marginTop: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                {renderCardio(workout)}
            </View>
            <View style={{flex:1}}>
                <Text style={[globalStyles.text, {alignSelf:'center', marginTop: 5}]}>Total Volume: {totalWorkoutVolume(workout)} kg</Text>
            </View>
            <OvalButton text='View Workout' onPress={() => navigation.navigate('WorkoutDetails', {
                name: workout.name,
                type: workout.type,
                date: (workout.date).toDateString(),
                exercises: workout.exercises,
                })}/>
        </View>
      
        
    </View>
  )
}

export default WorkoutCard
