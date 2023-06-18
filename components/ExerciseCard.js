import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, SIZES, SHADOWS } from '../constants'
import globalStyles from '../constants/GlobalStyle'

const ExerciseCard = ({exercise}) => {
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
        <Text style={globalStyles.h3}>{exercise.name}</Text>
        <Text style={globalStyles.text}>{exercise.sets} x {exercise.reps} @ {exercise.weight}kg</Text>
    </View>
  )
}

export default ExerciseCard
