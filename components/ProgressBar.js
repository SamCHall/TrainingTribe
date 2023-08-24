import React, { useState, useEffect } from 'react';
import { View, Animated } from 'react-native'; // Assuming you're using React Native
import { COLORS } from '../constants';

const ProgressBar = ({teamPercentage}) => {
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
        position: 'relative',
        borderRadius: 10,
        margin: 10,
        backgroundColor: 'red', // Using 'red' to represent the background color (opposing tribe)
      }}
    >
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
    </View>
  );
};

export default ProgressBar;
