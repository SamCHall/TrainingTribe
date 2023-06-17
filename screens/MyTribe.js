import { View, Text } from 'react-native'
import React from 'react'
import globalStyles from '../constants/GlobalStyle'
import { StatusBar } from 'expo-status-bar'

const MyTribe = () => {
  return (

    <View style={globalStyles.container}>
      <StatusBar/>
      <Text style={globalStyles.text}>MyTribe</Text>
    </View>
  )
}

export default MyTribe
