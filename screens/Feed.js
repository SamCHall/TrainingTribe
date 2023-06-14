import { View, Text } from 'react-native'
import React from 'react'
import { useApp } from '@realm/react'
import { HomeHeader, OvalButton } from '../components'
import globalStyles from '../constants/GlobalStyle'
const Feed = () => {
    
  
  return (
    <View style={globalStyles.container}>
    
      <HomeHeader />
    </View>
  )
}

export default Feed
