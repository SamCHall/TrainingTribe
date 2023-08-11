import { View, Text } from 'react-native'
import React from 'react'
import globalStyles from '../constants/GlobalStyle'
import { CustomStatusBar, OvalButton } from '../components'
import { useApp, useUser } from '@realm/react'

const MyTribe = () => {
  const app = useApp()
  const user = useUser()
  const renderTribe = () => {
    if(app.currentUser.customData.tribes.length == 0){
      <View>
        <OvalButton text='Create a Tribe' onPress={() => navigation.navigate('CreateTribe')}/>
        <OvalButton text='Join a Tribe' onPress={() => navigation.navigate('JoinTribe')}/>
      </View>
    } else {
      <View>
        <Text>Tribe Name</Text>
        <Text>Tribe Members</Text>
        <Text>Tribe Leader</Text>
        <Text>Tribe Description</Text>
        <OvalButton text='Leave Tribe' onPress={() => navigation.navigate('LeaveTribe')}/>
      </View>
    }
  return (

    <View style={globalStyles.centeredContainer}>
      <CustomStatusBar />
      {renderTribe()}
    </View>
  )
}
}

export default MyTribe
