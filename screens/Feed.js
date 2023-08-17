import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useApp } from '@realm/react'
import { CustomStatusBar, HomeHeader, OvalButton } from '../components'
import globalStyles from '../constants/GlobalStyle'
import { useRealm } from '../models'


const Feed = () => {
  
  return (
    <View style={globalStyles.centeredContainer}>
      <CustomStatusBar />
      <HomeHeader />
      
    </View>
  )
}

export default Feed
