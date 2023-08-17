import { View, Text } from 'react-native'
import React from 'react'
import globalStyles from '../constants/GlobalStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { User } from '../models'

const MyTribeLeaderboard = ({user}) => {
  return (
    <View style={globalStyles.leaderboardEntry}>
      <TouchableOpacity>
        <Text style={globalStyles.clickableText}>{user.username}</Text>
    </TouchableOpacity>
    <Text style={globalStyles.text}> Workouts: {User.getWorkoutCount(user)}</Text>
    </View>
  )
}

export default MyTribeLeaderboard
