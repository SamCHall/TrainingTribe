import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@realm/react'
import { CustomStatusBar, OvalButton } from '../components'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../constants/GlobalStyle'


const TribeChooser = () => {
    const user = useUser()
    const navigation = useNavigation()
    
    if(!user.customData.tribe){
        return(

          <View style={globalStyles.centeredContainer}>
          <CustomStatusBar />
          <OvalButton text='Create a Tribe' onPress={() => navigation.navigate('CreateTribe')}/>
          <OvalButton text='Join a Tribe' onPress={() => navigation.navigate('JoinTribe')}/>
        </View>
        )
    }
  return (
    <View>
      <Text>TribeChooser</Text>
    </View>
  )
}

export default TribeChooser
