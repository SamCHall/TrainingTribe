import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import globalStyles from '../../constants/GlobalStyle';
import Collapsible from 'react-native-collapsible';
import { useQuery, useRealm } from '../../models';
import { useApp, useUser } from '@realm/react';
import { CustomStatusBar, ExerciseCard, NewWorkoutHeader, TextButton } from '../../components';
import { exerciseList } from '../../constants/exerciseList';
import 'react-native-get-random-values';
import { Alert } from 'react-native';
import { OvalButton } from '../../components';

const NewWorkout = ({ navigation }) => {
  const realm = useRealm();
  const user = useUser();
  const sortedExerciseList = exerciseList.sort((a, b) => a.name.localeCompare(b.name));

  const [isLoading, setIsLoading] = useState(false);
  const [loadingCollapsed, setLoadingCollapsed] = useState(false);
  const [selectedExerciseList, setSelectedExerciseList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [workoutData, setWorkoutData] = useState([]);
  const [exercisesToDelete, setExercisesToDelete] = useState([]);

  const handleCollapse = (category) => {
    setCollapsed((prevCollapsed) => (prevCollapsed === category ? null : category));
  };

  const handleSelectExercise = (exercise) => {
    if (exercisesToDelete.includes(exercise)) { // If the exercise is in the exercisesToDelete list, remove it from the list
      setExercisesToDelete(prevList =>
        prevList.filter(item => item !== exercise)
      );
    } 
    else if (selectedExerciseList.includes(exercise)) {
      Alert.alert('Exercise already added', 'Please select a different exercise');
      return;
    }
    else {
      setSelectedExerciseList(prevList => [...prevList, exercise]);
    }
    setModalVisible(false);
  };
  

  const handleAdjustedExercise = (index, adjustedExerciseData) => {
    setWorkoutData((prevData) => {
      const newData = [...prevData];
      newData[index] = adjustedExerciseData;
      return newData;
    });
  };

  const handleDeleteExercise = (exercise) => {
    Alert.alert('Delete exercise', 'Are you sure you want to delete this exercise?', [
      {
        text: 'Yes',
        onPress: () => {
          setWorkoutData((prevData) => prevData.filter((item) => item.exercise !== exercise));
          setExercisesToDelete((prevList) => [...prevList, exercise]);
        }
      },
      {
        text: 'No',
        onPress: () => console.log('No pressed')
      }
    ]);
  };
  
  
  const saveWorkoutData  = async ({workoutName, workoutType}) => {
    const workoutId = Realm.BSON.ObjectId();
    const workoutExercises = [];
    setIsLoading(true);
    setLoadingCollapsed(false);
    try{
      realm.write(() => {
      workoutData.forEach((exerciseData) => {
          const exercise = realm.create('Exercise', {
            _id: Realm.BSON.ObjectId(),
            name: exerciseData.exercise.name,
            type: exerciseData.exercise.type,
          });
          
          if (exerciseData.exercise.type !== 'Cardio') {
          const sets = exerciseData.sets.map((set) =>{
          
            return realm.create('Set', {
              _id: Realm.BSON.ObjectId(),
              weight: set.weight,
              reps: set.reps,
            });
          }
          )

          exercise.sets = sets;
        }
        else {
          const cardioTracking = realm.create('CardioTracking', {
            _id: Realm.BSON.ObjectId(),
            distance: exerciseData.distance,
            time: exerciseData.time,
            speed: exerciseData.speed,
            elevation: exerciseData.elevation,
          });
          exercise.cardioTracking = [cardioTracking];
        }
        workoutExercises.push(exercise);
      }),
      realm.create('Workout', {
        _id: workoutId,
        owner_id: user.id,
        name: workoutName,
        date: new Date(),
        type: workoutType,
        exercises: workoutExercises,
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
      
      setIsLoading(false);
      setLoadingCollapsed(true);
      navigation.replace('ExistingWorkouts')
    }
    catch(err) {
      console.error(err);
      setLoadingCollapsed(true);
      setIsLoading(false);
    }
  };
  
  

  const handleFinishWorkout = (workoutName, workoutType) => {
    if (workoutData.length === 0) {
      Alert.alert('No exercises added', 'Please add at least one exercise to continue');
      return;
    }
    saveWorkoutData({workoutName, workoutType});
  };

  const categoryHandler = (category) => {
    switch (category) {
      case 'Chest':
        return sortedExerciseList.filter((exercise) => exercise.type === 'Chest');
      case 'Legs':
        return sortedExerciseList.filter((exercise) => exercise.type === 'Legs');
      case 'Back':
        return sortedExerciseList.filter((exercise) => exercise.type === 'Back');
      case 'Arms':
        return sortedExerciseList.filter((exercise) => exercise.type === 'Arms');
      case 'Shoulders':
        return sortedExerciseList.filter((exercise) => exercise.type === 'Shoulders');
      case 'Core':
        return sortedExerciseList.filter((exercise) => exercise.type === 'Core');
      case 'Cardio':
        return sortedExerciseList.filter((exercise) => exercise.type === 'Cardio');
      case 'Other':
        return sortedExerciseList.filter((exercise) => exercise.type === 'Other');
      default:
        return sortedExerciseList;
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

  const renderExerciseCard = ({ item, index }) => {
    if (exercisesToDelete.includes(item)) {
      return null; // Don't render the exercise card if it is in the exercisesToDelete list
    }
    else {
    return(
    <ExerciseCard onFocus={() => scrollToInput(index)} index={index} exercise={item} handleDeleteExercise={()=> handleDeleteExercise(item)} onAdjustedExercise={(adjustedExerciseData) => handleAdjustedExercise(index, adjustedExerciseData)}/>
    )}
  }
  ;
  

  return (
    <View style={globalStyles.container}>
      <CustomStatusBar />
      {/* Render the header with the finish workout button */}
      {/* <NewWorkoutHeader onFinishWorkout={handleFinishWorkout} isLoading={isLoading}/> */}

      <KeyboardAvoidingView
      
        keyboardVerticalOffset={60}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
        ref={flatListRef}
        data={selectedExerciseList}
        renderItem={renderExerciseCard}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        ListEmptyComponent={() => <Text style={globalStyles.emptyListComponent}>No exercises added</Text>}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={() => <NewWorkoutHeader onFinishWorkout={handleFinishWorkout} isLoading={isLoading}/>}
        ListHeaderComponentStyle={{position:'relative', top:0, left:0, right:0}}
        />
        
      </KeyboardAvoidingView>
      {/* Render the exercise cards */}
      

      {/* Button to add a new exercise */}
      <View style={globalStyles.bottomButtonContainer}>
        <OvalButton text="Add Exercise" onPress={() => setModalVisible(true)} />
      </View>
        
      
      <Collapsible collapsed={loadingCollapsed}>
        <ActivityIndicator animating={isLoading} size="large" color={COLORS.secondary} />
      </Collapsible>
      

      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={globalStyles.outerModalContainer}>
          <View style={[globalStyles.innerModalContainer, {height: 500}]}>
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
        </View>
      </Modal>
    </View>
  );
};

export default NewWorkout;
