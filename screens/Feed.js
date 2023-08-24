import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useApp } from '@realm/react'
import { CustomStatusBar, HomeHeader, MyTribeLeaderboard, OvalButton } from '../components'
import globalStyles from '../constants/GlobalStyle'
import { useRealm } from '../models'
import { COLORS } from '../constants'
import { FlatList } from 'react-native-gesture-handler'
import ProgressBar from '../components/ProgressBar'


const Feed = () => {
  const app = useApp()
  const realm = useRealm()
  const user = app.currentUser

  const tribe = realm.objects('Tribe').filtered('_id == $0', app.currentUser.customData.tribe)[0]
  const opposingTribe = tribe.war.tribes[1]

  if(!user.customData.tribe){
    return(
      <View>
        <OvalButton text='Create a Tribe' onPress={() => navigation.navigate('CreateTribe')}/>
        <OvalButton text='Join a Tribe' onPress={() => navigation.navigate('JoinTribe')}/>
      </View>
    )
  }
 

  const getTribeMembers = () => {
    const memberObjects = tribe.members.map(memberId => realm.objectForPrimaryKey('User', memberId)); // Getting all members from their IDs
    const validMembers = memberObjects.filter(member => member !== null); // Filtering out nulls
    return validMembers;
  }

  const getOpposingTribeMembers = () => {
    const memberObjects = opposingTribe.members.map(memberId => realm.objectForPrimaryKey('User', memberId)); // Getting all members from their IDs
    const validMembers = memberObjects.filter(member => member !== null); // Filtering out nulls
    return validMembers;
  }

  

  return (
    <View style={[globalStyles.container, {gap:15}]}>
      <CustomStatusBar />
      
      <View style={{alignItems:'center', paddingTop:15}}>
        <Text style={globalStyles.subTitle}>{tribe.name}</Text>
      </View>
      
      <FlatList
        data={getTribeMembers()}
        renderItem={({ item, index }) => <MyTribeLeaderboard user={item} index={index} />}
        keyExtractor={item => item._id}
      />
      

        <ProgressBar teamPercentage={50}/>

    
        <View style={{alignItems:'center'}}>
          <Text style={globalStyles.subTitle}>{opposingTribe.name}</Text>
        </View>
        <FlatList
          data={getOpposingTribeMembers()}
          renderItem={({ item, index }) => <MyTribeLeaderboard user={item} index={index} />}
          keyExtractor={item => item._id}
        />



    </View>
  )
}

export default Feed
