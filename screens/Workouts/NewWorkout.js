import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import globalStyles from '../../constants/GlobalStyle';
import { FlatList } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import { useQuery, useRealm } from '../../models';
import { useApp, useUser } from '@realm/react';
import { CustomStatusBar, ExerciseCard, NewWorkoutHeader, TextButton } from '../../components';

const NewWorkout = ({ navigation }) => {
  const realm = useRealm();
  const app = useApp();
  const user = useUser();
  const workouts = useQuery('Workout');
  const exercises = useQuery('Exercise');

  const [selectedExerciseList, setSelectedExerciseList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [workoutData, setWorkoutData] = useState([]);

  const handleCollapse = (category) => {
    setCollapsed((prevCollapsed) => (prevCollapsed === category ? null : category));
  };

  const handleSelectExercise = (exercise) => {
    setSelectedExerciseList((prevList) => [...prevList, exercise]);
    setModalVisible(false);
  };

  const handleAddExerciseSet = (exercise, sets) => {
    setWorkoutData((prevData) => {
      const updatedData = prevData.map((data) => {
        if (data.exercise === exercise) {
          return { ...data, sets };
        }
        return data;
      });
      return updatedData;
    });
  };

  const handleFinishWorkout = () => {
    console.log(workoutData);
  };

  const categoryHandler = (category) => {
    switch (category) {
      case 'Chest':
        return exerciseList.filter((exercise) => exercise.type === 'Chest');
      case 'Legs':
        return exerciseList.filter((exercise) => exercise.type === 'Legs');
      case 'Back':
        return exerciseList.filter((exercise) => exercise.type === 'Back');
      case 'Arms':
        return exerciseList.filter((exercise) => exercise.type === 'Arms');
      case 'Shoulders':
        return exerciseList.filter((exercise) => exercise.type === 'Shoulders');
      case 'Core':
        return exerciseList.filter((exercise) => exercise.type === 'Core');
      case 'Cardio':
        return exerciseList.filter((exercise) => exercise.type === 'Cardio');
      case 'Other':
        return exerciseList.filter((exercise) => exercise.type === 'Other');
      default:
        return exerciseList;
    }
  };

  const categoryList = [
    { name: 'Chest' },
    { name: 'Legs' },
    { name: 'Back' },
    { name: 'Arms' },
    { name: 'Shoulders' },
    { name: 'Core' },
    { name: 'Cardio' },
    { name: 'Other' },
  ];

  const exerciseList = [
    {
      name: 'Bench Press',
      type: 'Chest',
    },
    {
      name: 'Squat',
      type: 'Legs',
    },
    {
      name: 'Deadlift',
      type: 'Back',
    },
    {
      name: 'Bicep Curl',
      type: 'Arms',
    },
  ];

  return (
    <View style={globalStyles.container}>
      <CustomStatusBar />

      {/* Render the header with the finish workout button */}
      <NewWorkoutHeader onFinishWorkout={handleFinishWorkout} />

      {/* Render the exercise cards */}
      <FlatList
        data={selectedExerciseList}
        renderItem={({ item }) => (
          <ExerciseCard exercise={item} onAddExerciseSet={handleAddExerciseSet} />
        )}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={() => (
          <Text style={globalStyles.emptyListComponent}>No exercises added</Text>
        )}
      />

      <View>
        {/* Button to add a new exercise */}
        <TextButton text="Add Exercise" onPress={() => setModalVisible(true)} />
      </View>

      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={globalStyles.modalContainer}>
          <Text style={globalStyles.subTitle}>Select an Exercise</Text>
          <FlatList
            data={categoryList}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  style={globalStyles.exerciseItem}
                  onPress={() => handleCollapse(item.name)}
                >
                  <Text style={globalStyles.exerciseItemText}>{item.name}</Text>
                </TouchableOpacity>

                <Collapsible collapsed={collapsed !== item.name} align="top">
                  <FlatList
                    data={categoryHandler(item.name)}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={globalStyles.exerciseItem}
                        onPress={() => handleSelectExercise(item)}
                      >
                        <Text style={globalStyles.exerciseItemText}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </Collapsible>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>
    </View>
  );
};

export default NewWorkout;
