import { View, Text } from 'react-native'
import React from 'react'
import { useApp } from '@realm/react'
import { HomeHeader, OvalButton } from '../components'

const Home = ({ navigation }) => {
  const app = useApp();
 
  const logOutUser = () => {
    app.currentUser.logOut();
  }

  return (
    <View>
      <HomeHeader />
      <OvalButton text="Log Out" onPress={logOutUser} />
    </View>
  )
}

export default Home
