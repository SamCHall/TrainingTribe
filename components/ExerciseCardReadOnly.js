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
      </View>
      

      {/* Render weight and rep inputs */}
      {renderWeightRepInputs()}
    </View>
  );
};

export default ExerciseCardReadOnly;
