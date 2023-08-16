import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import globalStyles from '../../constants/GlobalStyle'
import { CustomStatusBar, OvalButton } from '../../components'
import { useApp, useUser } from '@realm/react'
import { useObject, useQuery, useRealm } from '../../models'
import { FlatList } from 'react-native-gesture-handler'

const MyTribe = ({navigation}) => {
  const app = useApp()
  const realm = useRealm()
  const user = useUser()
  
  getTribeMembers = () => {
    const members = tribe.members.map((member) => {
      const user = realm.objects('User').filtered('_id == $0', member)[0]
      return user
    })
    return members
  }

  const renderTribe = () => {
    
    if(!user.customData.tribe){
      return(
        <View>
        <OvalButton text='Create a Tribe' onPress={() => navigation.navigate('CreateTribe')}/>
        <OvalButton text='Join a Tribe' onPress={() => navigation.navigate('JoinTribe')}/>
      </View>
      )
      
    } else {
      const tribe = realm.objects('Tribe').filtered('_id == $0', user.customData.tribe)[0]
      const leader = realm.objects('User').filtered('_id == $0', tribe.owner_id)[0]
      return(
        <View style={globalStyles.container}>
        <Text style={globalStyles.subTitle}>{tribe.name}</Text>
        <Text style={globalStyles.text}>{tribe.description}</Text>
        {/* <Text style={globalStyles.h3}>Leader: {leader.username}</Text> */}
        {/* <FlatList
          data={getTribeMembers()}
          renderItem={({ item }) => <Text style={globalStyles.text}>{item.username}</Text>}
          keyExtractor={item => item._id}
        /> */}
        <OvalButton text='Leave Tribe' onPress={() => navigation.navigate('LeaveTribe')}/>
      </View>
      )
    }
    }


  return (

    <View style={globalStyles.centeredContainer}>
      <CustomStatusBar />
      {renderTribe()}
    </View>
  )
}


export default MyTribe
