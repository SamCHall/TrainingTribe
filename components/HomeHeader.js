import { View, Text } from 'react-native'
import React from 'react'
import { useApp } from '@realm/react';

const HomeHeader = () => {
    const app = useApp();

    if (app.currentUser.identities[0].providerType === 'Anonymous Login') {
        return (
          <View>
            <Text>Welcome Guest</Text>
          </View>
        )
      }
      else {
      return (
        <View>
          <Text>Welcome {app.currentUser.profile.email}</Text>
        </View>
      )
}
}

export default HomeHeader
