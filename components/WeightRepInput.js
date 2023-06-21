import { View, Text, TextInput } from 'react-native'
import React from 'react'
import {COLORS, FONTS, SHADOWS, SIZES} from '../constants'
import globalStyles from '../constants/GlobalStyle'

const WeightRepInput = ({number, onWeightChange, onRepChange, onFocus}) => {
  const handleWeightChange = (weight) => {
    const weightDouble = parseFloat(weight)
    onWeightChange(weightDouble)
  }

  const handleRepChange = (reps) => {
    const repsNumber = parseInt(reps)
    onRepChange(repsNumber)
  }

  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
      <Text style={[globalStyles.text, {marginRight:30}]}>{number}</Text>  
      <TextInput style={globalStyles.smallInput} onFocus={onFocus} onChangeText={handleWeightChange} placeholder="Weight" placeholderTextColor={COLORS.gray} inputmode="Numeric" keyboardType="decimal-pad"/><Text style={[globalStyles.text, {position:'absolute', right:150}]}>kg</Text>
      <TextInput style={globalStyles.smallInput} onFocus={onFocus} onChangeText={handleRepChange} placeholder="Reps" inputmode="Numeric" keyboardType="decimal-pad" placeholderTextColor={COLORS.gray} />
    </View>
  )
}

export default WeightRepInput