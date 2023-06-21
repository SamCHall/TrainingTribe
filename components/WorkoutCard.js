import { View, Text } from 'react-native'
import React from 'react'
import {COLORS, FONTS, SHADOWS, SIZES} from '../constants'
import globalStyles from '../constants/GlobalStyle'


const WorkoutCard = ({ workout }) => {
    const topExercises = workout.exercises.slice(0, 3)
   
  return (
    <View style={{
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.medium,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
    }}>
        <View style={{
            width: 350,
            height: 100,
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
            <View
            style={{flex:1}}
            >
                {topExercises.map((exercise) => {
                    return (
                        <Text style={globalStyles.text}>{exercise.name}     {exercise.sets.length} sets</Text>
                    )
                })}
            </View>
        </View>
      
        
    </View>
  )
}

export default WorkoutCard
