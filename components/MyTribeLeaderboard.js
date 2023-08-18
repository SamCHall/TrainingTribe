import { View, Text } from 'react-native'
import React from 'react'
import globalStyles from '../constants/GlobalStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { User } from '../models'

const MyTribeLeaderboard = ({user, index}) => {

  const renderMedal = (index) => {
    if(index === 0){
      return(
        <Text style={[globalStyles.text]}>🥇</Text>
      )
    } else if(index === 1){
      return(
        <Text style={[globalStyles.text]}>🥈</Text>
      )
    } else if(index === 2){
      return(
        <Text style={[globalStyles.text]}>🥉</Text>
      )
    }}
  return (
    <View style={globalStyles.leaderboardEntry}>
      <View>
        <Text style={globalStyles.h3}>{index+1}.</Text>
      </View>
      <View style={{flex:1, marginLeft:15}}>
        <TouchableOpacity>
          <Text style={globalStyles.clickableText}>{user.username} {renderMedal(index)}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={globalStyles.text}>{User.getWorkoutVolume(user)}kg</Text>
      </View>
    </View>
  )
}

export default MyTribeLeaderboard
