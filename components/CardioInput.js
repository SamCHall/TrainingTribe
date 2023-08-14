import { View, Text, TextInput} from 'react-native'
import React from 'react'
import globalStyles from '../constants/GlobalStyle'
import { COLORS } from '../constants/theme'

const CardioInput = () => {
    const onFocus = () => {
    }
    const handleWeightChange = () => {
    }
    const handleRepChange = () => {
    }
    return (
        <View style={{
            paddingBottom:20,
        }
        }>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '80%',   
        }}> 
          <TextInput style={globalStyles.smallInput} onFocus={onFocus} onChangeText={handleWeightChange} placeholder="Distance" placeholderTextColor={COLORS.gray} inputmode="Numeric" keyboardType="decimal-pad"/><Text style={[globalStyles.text, {position:'relative', right:25}]}>km</Text>
          <TextInput style={globalStyles.smallInput} onFocus={onFocus} onChangeText={handleRepChange} placeholder="Avg. Speed" inputmode="Numeric" keyboardType="decimal-pad" placeholderTextColor={COLORS.gray}/><Text style={[globalStyles.text, {position:'relative', right:25}]}>km/h</Text>
        </View>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '80%'
        }}>
            <TextInput style={globalStyles.smallInput} onFocus={onFocus} onChangeText={handleWeightChange} placeholder="Time" placeholderTextColor={COLORS.gray} inputmode="Numeric" keyboardType="decimal-pad"/><Text style={[globalStyles.text, {position:'relative', right:25}]}>min</Text>
            <TextInput style={globalStyles.smallInput} onFocus={onFocus} onChangeText={handleRepChange} placeholder="Elevation" inputmode="Numeric" keyboardType="decimal-pad" placeholderTextColor={COLORS.gray}/><Text style={[globalStyles.text, {position:'relative', right:25}]}>%</Text>
        </View>
        </View>
      )
    }

export default CardioInput
