import { View, Text } from 'react-native'
import React from 'react'
import globalStyles from '../../constants/GlobalStyle'
import { useRoute } from '@react-navigation/native';
import { ExerciseCardReadOnly } from '../../components';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

// Inside the 'WorkoutDetails' component



const WorkoutDetails = () => {
  const route = useRoute()
  const { name, type, date, exercises} = route.params

  return (
    <View style={globalStyles.fullPageContainer}>
      <Text style={[globalStyles.title, {alignSelf:'center', paddingVertical:20}]}>{name}</Text>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>
        <Text style={globalStyles.h3}>{type}</Text>
        <Text style={globalStyles.h3}>{date}</Text>
      </View>
      <FlatList
      data={exercises}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
            <ExerciseCardReadOnly exercise={item}/>
        )}
      />
      
        

    </View>
  )
}

export default WorkoutDetails
