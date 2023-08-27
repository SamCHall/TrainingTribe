import React, { useState, useEffect } from 'react';
import { View, Animated, Text } from 'react-native'; // Assuming you're using React Native
import { COLORS } from '../constants';
import globalStyles from '../constants/GlobalStyle';

const ProgressBar = ({teamPercentage, categoryCount}) => {
  const [progress] = useState(new Animated.Value(0)); // Initialize animated value

  useEffect(() => {
    // Animate the width of the progress bar on component mount
    Animated.timing(progress, {
      toValue: teamPercentage, // fill depending on the teamPercentage prop
      duration: 0, // Animation duration in milliseconds
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View
      style={{
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative',
        borderRadius: 10,
        margin: 10,
        backgroundColor: 'red', // Using 'red' to represent the background color (opposing tribe)
      }}
    >
      <Text style={[globalStyles.text, {marginHorizontal:5}]}>
        {categoryCount}
      </Text>
      <Animated.View
        style={{
          width: progress.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'], // Mapping the animated value to width
          }),
          position: 'relative',
            borderRadius: 10,
          backgroundColor: COLORS.secondary, // Using COLORS.secondary as the fill color
            height: 15,
        }}
      />
      <Text style={[globalStyles.text, {marginHorizontal:5}]}> 
        {2 - categoryCount}
      </Text>
    </View>
  );
};

export default ProgressBar;
