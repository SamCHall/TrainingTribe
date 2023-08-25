import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useApp } from '@realm/react'
import { CustomStatusBar, HomeHeader, MyTribeLeaderboard, OvalButton, TotalVolume, TotalDistance } from '../components'
import globalStyles from '../constants/GlobalStyle'
import { useRealm } from '../models'
import { COLORS } from '../constants'
import { FlatList } from 'react-native-gesture-handler'
import ProgressBar from '../components/ProgressBar'
import { SIZES } from '../constants/theme'
import SelectDropdown from 'react-native-select-dropdown'
import { useState } from 'react'
import {Ionicons} from 'react-native-vector-icons/Ionicons'


const Feed = () => {
  const app = useApp()
  const realm = useRealm()
  const user = app.currentUser

  const tribe = realm.objects('Tribe').filtered('_id == $0', app.currentUser.customData.tribe)[0]
  const opposingTribe = tribe.war.tribes[1]

  const [leaderboard, setLeaderboard] = useState('Total Volume')

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

  const renderLeaderboard = ({members}) => {
    if(leaderboard === 'Total Volume'){
      return(
        <TotalVolume members={members}/>
      )
    } else if(leaderboard === 'Total Distance'){
      return(
        <TotalDistance members={members}/>
      )
    }
  }
  
  

  return (
    <View style={[globalStyles.container, {gap:15}]}>
      <CustomStatusBar />
      
      <View style={{alignItems:'center', paddingTop:15}}>
        <Text style={[globalStyles.subTitle, {color: COLORS.secondary}]}>{tribe.name}</Text>
      </View>
      
      {renderLeaderboard({members:getTribeMembers()})}

      <ProgressBar teamPercentage={50}/>
      <View style={{alignItems:'center', position:'relative'}}>
        <SelectDropdown
                      showsVerticalScrollIndicator={true}
                      dropdownStyle={{width: 150, height: 175, backgroundColor: COLORS.primary, borderColor: COLORS.secondary, borderWidth: 1, borderRadius: 10, position:'absolute', marginTop: -79, zIndex: 1}}
                      rowTextStyle={[globalStyles.text, {fontSize: SIZES.small}]}
                      rowStyle={{backgroundColor: COLORS.primary, height:40, borderBottomColor: COLORS.secondary, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center'}}
                      dropdownOverlayColor='transparent'
                      buttonStyle={{width: 150, height: 40, backgroundColor: COLORS.primary, borderColor: COLORS.secondary, borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}
                      buttonTextStyle={[globalStyles.text, {fontSize: SIZES.small}]}
                      defaultButtonText='Total Volume'
                      data={['Total Volume', 'Total Distance']}
                      onSelect={(selectedItem, index) => {
                          setLeaderboard(selectedItem)
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem
                      }}
                      rowTextForSelection={(item, index) => {
                          return item
                      }}
                  />
      </View>
      
    
      <View style={{alignItems:'center'}}>
        <Text style={[globalStyles.subTitle,{color:'red'}]}>{opposingTribe.name}</Text>
      </View>
      {renderLeaderboard({members:getOpposingTribeMembers()})}

    </View>
  )
}

export default Feed
