import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants';
import globalStyles from '../constants/GlobalStyle';

const ExerciseCardReadOnly = ({exercise}) => {
  const renderWeightRepInputs = () => {
    return exercise.sets.map((set, index) => (
      <View key={index} style={{flexDirection:'row', width:'100%', justifyContent:'space-around', alignItems:'center', paddingVertical: 20}}>
        <Text style={globalStyles.text}>{index + 1}</Text>
        <Text style={globalStyles.text}>Weight: {set.weight}kg</Text>
        <Text style={globalStyles.text}>Reps: {set.reps}</Text>
      </View>
    ));
  };

  const renderCardioInputs = () => {
    return exercise.cardioTracking.map((set, index) => (
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around', alignItems:'center'}}>
        <View style={{flexDirection:'column', paddingVertical: 20}}>
          <Text style={[globalStyles.text, {paddingVertical:10}]}>Distance: {set.distance}km</Text>
          <Text style={globalStyles.text}>Time: {set.time}min</Text>
        </View>
        <View style={{flexDirection:'column',paddingVertical: 20}}>
          <Text style={[globalStyles.text, {paddingVertical:10}]}>Speed: {set.speed}km/h</Text>
          <Text style={globalStyles.text}>Elevation: {set.elevation}%</Text>
        </View>
      </View>
    )
    )
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.medium,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
      }}
    >
      <View style={{borderBottomWidth: 1, borderBottomColor: COLORS.tertiary, width: '100%', paddingVertical: 10}}>
        <Text style={[globalStyles.subTitle]}>{exercise.name}</Text>
        <Text style={[globalStyles.h3, {alignSelf:'center'}]}>{exercise.type}</Text>
      </View>
      

      {/* Render weight and rep inputs */}
      {exercise.type !== 'Cardio' && renderWeightRepInputs()}
      {exercise.type === 'Cardio' && renderCardioInputs()}
    </View>
  );
};

export default ExerciseCardReadOnly;
