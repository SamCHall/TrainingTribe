import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useApp } from '@realm/react'
import { CustomStatusBar, HomeHeader, MyTribeLeaderboard, OvalButton, TotalVolume, TotalDistance, TotalWorkouts, TotalReps } from '../components'
import globalStyles from '../constants/GlobalStyle'
import { Tribe, useRealm } from '../models'
import { COLORS } from '../constants'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import ProgressBar from '../components/ProgressBar'
import { SIZES } from '../constants/theme'
import SelectDropdown from 'react-native-select-dropdown'
import { useState } from 'react'
import { User } from '../models'
import InfoIcon from '../components/Icons/InfoIcon'
import Ionicons from 'react-native-vector-icons/Ionicons'



const Feed = () => {
  const app = useApp()
  const realm = useRealm()
  const user = app.currentUser

  const tribe = realm.objects('Tribe').filtered('_id == $0', app.currentUser.customData.tribe)[0]
  const opposingTribe = tribe.war.tribes[1]

  const [leaderboard, setLeaderboard] = useState('Total Volume')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const totalCategories = 4


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

  const renderDynamicTotal = ({members}) => {
    if(leaderboard === 'Total Volume'){
      return(
        <Text style={[globalStyles.h3]}>Tribe Total Volume: {Tribe.getTribeTotalVolume(members)}kg</Text>
      )
    } else if(leaderboard === 'Total Distance'){
      return(
        <Text style={[globalStyles.h3]}>Tribe Total Distance: {Tribe.getTribeTotalDistance(members)}km</Text>
      )
    }
    else if(leaderboard === 'Total Workouts'){
      return(
        <Text style={[globalStyles.h3]}>Tribe Total Workouts: {Tribe.getTribeTotalWorkouts(members)}</Text>
      )
    }
    else if(leaderboard === 'Total Repetitions'){
      return(
        <Text style={[globalStyles.h3]}>Tribe Total Repetitions: {Tribe.getTribeTotalReps(members)}</Text>
      )
    }
  }

  const renderWinningTribe = () => {
    const percentage = getTeamPercentage()
    if(percentage > 50){
      return(
        <Text style={[globalStyles.h3, {color:COLORS.secondary}]}>Winning!</Text>
      )
    } else if(percentage < 50){
      return(
        <Text style={[globalStyles.h3, {color:'red'}]}>Losing!</Text>
      )
    } else if(percentage === 50){
      return(
        <Text style={[globalStyles.h3]}>Tied!</Text>
      )
    }
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
      } else if(leaderboard === 'Total Workouts'){
        return(
          <TotalWorkouts members={members}/>
        )
      } else if(leaderboard === 'Total Repetitions'){
        return(
          <TotalReps members={members}/>
        )
      }
  }

  const getWinningCategoryCount = () => {
    let count = 0
    const tribeMembers = getTribeMembers()
    const opposingTribeMembers = getOpposingTribeMembers()
    const totalVolume = tribeMembers.reduce((total, member) => total + User.getTotalWorkoutVolume(member), 0)
    const opposingTotalVolume = opposingTribeMembers.reduce((total, member) => total + User.getTotalWorkoutVolume(member), 0)
    if(totalVolume > opposingTotalVolume){
      count += 1
    }

    const totalDistance = tribeMembers.reduce((total, member) => total + User.getTotalCardioDistance(member), 0)
    const opposingTotalDistance = opposingTribeMembers.reduce((total, member) => total + User.getTotalCardioDistance(member), 0)
    if(totalDistance > opposingTotalDistance){
      count += 1
    }

    const totalWorkouts = tribeMembers.reduce((total, member) => total + User.getWorkoutCount(member), 0)
    const opposingTotalWorkouts = opposingTribeMembers.reduce((total, member) => total + User.getWorkoutCount(member), 0)
    if(totalWorkouts > opposingTotalWorkouts){
      count += 1
    }

    const totalReps = tribeMembers.reduce((total, member) => total + User.getTotalReps(member), 0)
    const opposingTotalReps = opposingTribeMembers.reduce((total, member) => total + User.getTotalReps(member), 0)
    if(totalReps > opposingTotalReps){
      count += 1
    }

    return count
  }


  const getTeamPercentage = () => {
    const count = getWinningCategoryCount()
    const teamPercentage = count / totalCategories * 100
    return teamPercentage
  }
  

  return (
    <View style={[globalStyles.container, {gap:15}]}>
      <CustomStatusBar />
      <View style={{alignItems:'center', paddingTop:15}}>
        <Text style={[globalStyles.subTitle, {color: COLORS.secondary}]}>{tribe.name}</Text>
        {renderDynamicTotal({members:getTribeMembers()})}
      </View>
      
      {renderLeaderboard({members:getTribeMembers()})}

      <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
        {renderWinningTribe()}
        <InfoIcon topic={'winCondition'}/>
      </View>
      
      <ProgressBar teamPercentage={getTeamPercentage()} categoryCount={getWinningCategoryCount()} totalCategories={totalCategories}/>
      <View style={{alignItems:'center', position:'relative'}}>
        <SelectDropdown
                      onFocus={() => setDropdownOpen(true)}
                      onBlur={() => setDropdownOpen(false)}
                      showsVerticalScrollIndicator={true}
                      dropdownStyle={{width: 150, height: 175, backgroundColor: COLORS.primary, borderColor: COLORS.secondary, borderWidth: 1, borderRadius: 10, position:'absolute', marginTop: -40, zIndex: 1}}
                      rowTextStyle={[globalStyles.text, {fontSize: SIZES.small}]}
                      rowStyle={{backgroundColor: COLORS.primary, height:40, borderBottomColor: COLORS.secondary, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center'}}
                      dropdownOverlayColor='transparent'
                      buttonStyle={{width: 150, height: 40, backgroundColor: COLORS.primary, borderColor: COLORS.secondary, borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}
                      buttonTextStyle={[globalStyles.text, {fontSize: SIZES.small}]}
                      defaultButtonText='Total Volume'
                      data={['Total Volume', 'Total Distance', 'Total Workouts', 'Total Repetitions']}
                      onSelect={(selectedItem) => {
                          setLeaderboard(selectedItem)
                      }}
                      renderDropdownIcon={() => {
                          if (dropdownOpen){
                            return(
                                <Ionicons name="chevron-up" size={20} color={COLORS.secondary}/>
                            )
                        }
                        return(
                          <Ionicons name="chevron-down" size={20} color={COLORS.secondary}/>
                        )
                      }}
                      buttonTextAfterSelection={(selectedItem) => {
                          return selectedItem
                      }}
                      rowTextForSelection={(item) => {
                          return item
                      }}
                  />
      </View>
      
    
      <View style={{alignItems:'center'}}>
        <Text style={[globalStyles.subTitle,{color:'red'}]}>{opposingTribe.name}</Text>
        {renderDynamicTotal({members:getOpposingTribeMembers()})}
      </View>
      {renderLeaderboard({members:getOpposingTribeMembers()})}

    </View>
  )
}

export default Feed
