import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import globalStyles from '../constants/GlobalStyle'
import { CustomStatusBar, TextButton, WorkoutCard } from '../components'
import { User } from '../models'
import { COLORS } from '../constants/theme'
import { FlatList } from 'react-native-gesture-handler'

const Profile = ({route, navigation}) => {

  const user = route.params
  return (
    <View style={globalStyles.container}>
      <CustomStatusBar />
      <View style={{alignItems:'flex-start'}}>
        <TextButton text='Back' onPress={() => navigation.goBack()}/>
      </View>
      
      <View style={{alignItems:'center', marginVertical:15}}>
        <Text style={[globalStyles.subTitle]}>{user.username}</Text>
        <Text style={[globalStyles.text, {}]}>{user.tribe.name}</Text>
      </View>
      <View style={{margin:10, gap:10}}>

        <View style={{borderBottomWidth:1, borderBottomColor:COLORS.tertiary, alignItems:'center', marginBottom:5}}>
          <Text style={[globalStyles.h3, {paddingBottom:5}]}>Statistics:</Text>
        </View>
      
        <View style={{alignItems:'center'}}>
          <Text style={globalStyles.text}>Total workouts: {User.getWorkoutCount(user)}</Text>
          <Text style={globalStyles.text}>Favourite exercise: {User.getFavouriteExercise(user)}</Text>
          <Text style={globalStyles.text}>Cardio exercises finished: {User.getCardioExercisesCompleted(user)}</Text>
        </View>
        <View style={{flexDirection:'row', gap:5}}>
          <View style={{alignItems:'flex-start'}}>
          <Text style={globalStyles.text}>Total volume: {User.getTotalWorkoutVolume(user)} kg</Text>
          <Text style={globalStyles.text}>Total reps: {User.getTotalReps(user)}</Text>
          
        </View>
        <View style={{flex:1, alignItems:'flex-end', gap:5}}>
          <Text style={globalStyles.text}>Max weight lifted: {User.getMaxWeight(user)} kg</Text>
          
          <Text style={globalStyles.text}>Distance travelled: {User.getTotalCardioDistance(user)} km</Text>
        </View>
        </View>
      </View>
      <View style={{borderBottomColor:COLORS.tertiary, borderBottomWidth:1, margin:10}}>
        <Text style={[globalStyles.h3, {marginTop:10,paddingBottom:5, paddingLeft:10, alignSelf:'center'}]}>Workouts:</Text>
      </View>
      <FlatList
        data={user.workouts}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
            <WorkoutCard workout={item}/>
        )}
        />
    </View>
  )
}

export default Profile
