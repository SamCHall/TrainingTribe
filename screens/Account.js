import { View, Text } from 'react-native'
import React from 'react'
import { useApp } from '@realm/react'
import { OvalButton } from '../components'
import globalStyles from '../constants/GlobalStyle'

const Account = () => {

    const app = useApp();
 
    const logOutUser = () => {
      app.currentUser.logOut();
    }

  return (
    <View style={globalStyles.container}>
      <OvalButton text="Log Out" onPress={logOutUser} />
    </View>
  )
}

export default Account
