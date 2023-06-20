import { View, Text, TextInput } from 'react-native'
import React from 'react'
import {COLORS, FONTS, SHADOWS, SIZES} from '../constants'
import globalStyles from '../constants/GlobalStyle'

const WeightRepInput = ({number}) => {
  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
      <Text style={[globalStyles.text, {marginRight:30}]}>{number}</Text>  
      <TextInput style={globalStyles.smallInput} placeholder="Weight" placeholderTextColor={COLORS.gray} />
      <TextInput style={globalStyles.smallInput} placeholder="Reps" placeholderTextColor={COLORS.gray} />
    </View>
  )
}

export default WeightRepInput
