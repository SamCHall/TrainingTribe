import { View, Text, TextInput } from 'react-native'
import React from 'react'
import {COLORS, FONTS, SHADOWS, SIZES} from '../constants'
import globalStyles from '../constants/GlobalStyle'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
      <Text style={[globalStyles.text]}>{number}.</Text>
      
        <Ionicons name="barbell-outline" size={20} color={COLORS.tertiary} style={{position:'relative', left:20}}/>
        <TextInput style={globalStyles.smallInput} onFocus={onFocus} onChangeText={handleWeightChange} placeholder="Weight" placeholderTextColor={COLORS.gray} inputmode="Numeric" keyboardType="decimal-pad"/><Text style={[globalStyles.text, {position:'relative', right:25}]}>kg</Text>

      
      
        <Ionicons name="repeat-outline" size={20} color={COLORS.tertiary} style={{position:'relative', left:20}}/>
        <TextInput style={globalStyles.smallInput} onFocus={onFocus} onChangeText={handleRepChange} placeholder="Reps" inputmode="Numeric" keyboardType="decimal-pad" placeholderTextColor={COLORS.gray} />
      
    </View>
  )
}

export default WeightRepInput
