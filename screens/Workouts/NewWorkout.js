import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import globalStyles from '../../constants/GlobalStyle';
import Collapsible from 'react-native-collapsible';
import { useQuery, useRealm } from '../../models';
import { useApp, useUser } from '@realm/react';
import { CustomStatusBar, ExerciseCard, NewWorkoutHeader, TextButton } from '../../components';
import { exerciseList } from '../../constants/exerciseList';

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

  const handleAdjustedExercise = (index, adjustedExerciseData) => {
    setWorkoutData((prevData) => {
      const newData = [...prevData];
      newData[index] = adjustedExerciseData;
      return newData;
    });
  };

  const workoutId = Realm.BSON.ObjectId();
  const saveWorkoutData  = async () => {
    console.log(user.id)
    realm.write(() => {
      const workout = realm.create('Workout', {
        _id: workoutId,
        owner_id: user.id,
        name: 'Workout Name',
        date: new Date(),
        type: 'Workout Type',
        exercises: workoutData.map((exerciseData) => {
          const exercise = realm.create('Exercise', {
            _id: Realm.BSON.ObjectId(),
            name: exerciseData.exercise.name,
            type: exerciseData.exercise.type,
          });
  
          const sets = exerciseData.sets.map((set) =>
            realm.create('Set', {
              _id: Realm.BSON.ObjectId(),
              weight: set.weight,
              reps: set.reps,
            })
          );
  
          exercise.sets = sets;
  
          return exercise;
        }),
      });
  
     
      
  
    });
    const customDataCollection = user.mongoClient("mongodb-atlas").db("todo").collection("User");
    const filter = {_id: user.id};
    const update = {
      $push: {
        workouts: workoutId,
        }
      }
      await customDataCollection.updateOne(filter, update);
      await user.refreshCustomData();
      await realm.syncSession.uploadAllLocalChanges();
      navigation.replace('ExistingWorkouts')
  };
  
  

  const handleFinishWorkout = () => {
    saveWorkoutData();
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
  

  // Handling the scroll to input

  const flatListRef = useRef(null);

  const scrollToInput = (index) => {
    if (flatListRef.current && index !== undefined) {
      flatListRef.current.scrollToIndex({ index });
    }
  };

  const renderExerciseCard = ({ item, index }) => (
    <ExerciseCard onFocus={() => scrollToInput(index)} exercise={item} onAdjustedExercise={(adjustedExerciseData) => handleAdjustedExercise(index, adjustedExerciseData)}/>
  );
  

  return (
    <View style={globalStyles.container}>
      <CustomStatusBar />
      {/* Render the header with the finish workout button */}
      <NewWorkoutHeader onFinishWorkout={handleFinishWorkout} />

      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <FlatList
        ref={flatListRef}
        data={selectedExerciseList}
        renderItem={renderExerciseCard}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        ListEmptyComponent={() => <Text style={globalStyles.emptyListComponent}>No exercises added</Text>}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: 100 }}
        />
      </KeyboardAvoidingView>
      {/* Render the exercise cards */}
      

      {/* Button to add a new exercise */}
      <View>
        <TextButton text="Add Exercise" onPress={() => setModalVisible(true)} />
      </View>

      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={globalStyles.modalContainer}>
          
          <Text style={[globalStyles.subTitle, { marginBottom: 10 }]}>Select an Exercise</Text>
          <FlatList
            data={categoryList}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity style={globalStyles.categoryItem} onPress={() => handleCollapse(item.name)}>
                  <Text style={globalStyles.exerciseItemText}>{item.name}</Text>
                </TouchableOpacity>

                <Collapsible collapsed={collapsed !== item.name} align="top">
                  <View style={globalStyles.collapsibleContainer}>
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
                  </View>
                </Collapsible>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TextButton text="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default NewWorkout;
