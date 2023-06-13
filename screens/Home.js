import { View, Text } from 'react-native'
import React from 'react'
import app from '../App'
import { useApp } from '@realm/react'

const Home = () => {
  const app = useApp();
  if (!app.currentUser) {
    return null;
  }
  if (app.currentUser.identities[0].providerType === 'anon-user') {
    return (
      <View>
        <Text>Welcome Guest</Text>
      </View>
    )
  }
  else {
  return (
    <View>
      <Text>Welcome {app.currentUser.profile.name}</Text>
    </View>
  )
  }
}

export default Home
