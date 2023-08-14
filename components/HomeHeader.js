import { View, Text } from 'react-native'
import React from 'react'
import { useApp } from '@realm/react';
import globalStyles from '../constants/GlobalStyle';

const HomeHeader = () => {
    const app = useApp();

    if (app.currentUser.identities[0].providerType === 'anon-user') {
        return (
          <View>
            <Text style={globalStyles.text}>Welcome Guest</Text>
          </View>
        )
      }
      else {
      return (
        <View>
          <Text style={globalStyles.text}>Welcome {app.currentUser.customData.username}</Text>
        </View>
      )
}
}

export default HomeHeader
