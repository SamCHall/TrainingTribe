import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import globalStyles from '../../constants/GlobalStyle'
import { CustomStatusBar, OvalButton, TextButton } from '../../components'
import { useApp, useUser } from '@realm/react'
import { useObject, useQuery, useRealm } from '../../models'
import { FlatList } from 'react-native-gesture-handler'
import Collapsible from 'react-native-collapsible'
import { useState } from 'react'
import { MyTribeLeaderboard } from '../../components'

const MyTribe = ({navigation}) => {
  const app = useApp()
  const realm = useRealm()
  const user = useUser()
  
  
  const [collapsed, setCollapsed] = useState(true);

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
      
        const getTribeMembers = () => {
          const memberObjects = tribe.members.map(memberId => realm.objectForPrimaryKey('User', memberId));
          console.log(memberObjects);
          const validMembers = memberObjects.filter(member => member !== null); // Filtering out nulls
        
          console.log(validMembers);
          return validMembers;
        };
      
      
      return(
        <View style={[globalStyles.container, {width:'100%'}]}>
          <View style={[globalStyles.container,{alignItems:'center'}]}>
            <Text style={globalStyles.subTitle}>{tribe.name}</Text>
            <Text style={globalStyles.h3}>Leader: {leader.username}</Text> 
            <Text style={globalStyles.text}>Members: {tribe.members.length}</Text>
            <TextButton text='View Description' onPress={() => setCollapsed(!collapsed)}/>
            <Collapsible collapsed={collapsed}>
              <Text style={globalStyles.text}>{tribe.description}</Text>
            </Collapsible>
            
            
          </View>
        <View style={[globalStyles.container, {justifyContent:'flex-start'}]}>
          <FlatList
          data={getTribeMembers()}
          renderItem={({ item }) => <MyTribeLeaderboard user={item} />}
          keyExtractor={item => item._id}
        />
        </View>
         
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
