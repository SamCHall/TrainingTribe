import { View, Text } from 'react-native'
import React from 'react'
import globalStyles from '../constants/GlobalStyle'
import { CustomStatusBar } from '../components'

const MyTribe = () => {
  return (

    <View style={globalStyles.centeredContainer}>
      <CustomStatusBar />
      <Text style={globalStyles.text}>MyTribe</Text>
    </View>
  )
}

export default MyTribe
