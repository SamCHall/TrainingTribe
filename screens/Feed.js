import { View, Text } from 'react-native'
import React from 'react'
import { useApp } from '@realm/react'
import { HomeHeader, OvalButton } from '../components'
import globalStyles from '../constants/GlobalStyle'
import { StatusBar } from 'expo-status-bar'
import { FlatList } from 'react-native-gesture-handler'
import { useRealm } from '../models'

const Feed = () => {

  const realm = useRealm()
  const getUsers = () => {
    console.log(realm)
    const users = realm.objects('User')
    return users
  }
  
  return (
    <View style={globalStyles.container}>
      <StatusBar/>
      <FlatList
      data={getUsers()}
      renderItem={({ item }) => <Text style={globalStyles.text}>{item.email}</Text>}
      keyExtractor={item => item._id}
      >

      </FlatList>
      <HomeHeader />
    </View>
  )
}

export default Feed
