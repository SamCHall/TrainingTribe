import React, { useState, useEffect } from 'react';
import { View, Animated, Text } from 'react-native';
import { COLORS } from '../constants';
import globalStyles from '../constants/GlobalStyle';

const ProgressBar = ({ teamPercentage, categoryCount, totalCategories }) => {
  const [progress] = useState(new Animated.Value(0)); // Initialize animated value
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Animate the width of the progress bar on component mount
    Animated.timing(progress, {
      toValue: teamPercentage,
      duration: 0,
      useNativeDriver: false,
    }).start();

    // Update the initial animation value after a short delay
    const timer = setTimeout(() => {
      Animated.timing(progress, {
        toValue: teamPercentage,
        duration: 0,
        useNativeDriver: false,
      }).start();
      setInitialized(true);
    }, .01);

    return () => clearTimeout(timer);
  }, [teamPercentage]);

  return (
    <View
      style={{
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative',
        borderRadius: 10,
        margin: 10,
        backgroundColor: 'red',
      }}
    >
      <Text style={[globalStyles.text, { marginHorizontal: 5, zIndex: 1, color: 'black' }]}>
        {categoryCount}
      </Text>
      {initialized && (
        <Animated.View
          style={{
            width: progress.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            position: 'absolute',
            borderRadius: 10,
            backgroundColor: COLORS.secondary,
            height: '100%',
          }}
        />
      )}
      <Text style={[globalStyles.text, { marginHorizontal: 5, zIndex: 1, color: 'black' }]}>
        {totalCategories - categoryCount}
      </Text>
    </View>
  );
};

export default ProgressBar;
