import { Realm, createRealmContext } from "@realm/react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// Defining a schema for a Profile object
export class User extends Realm.Object {
  static schema = {
      name: 'User',
      properties: {
        _id: 'string',
        username: 'string',
        email: 'string',
        workouts: 'Workout[]',
        tribe: 'Tribe?',
      },
      primaryKey: '_id',
    };

    static getWorkoutCount(user) {
      return user.workouts.length;
    }

    static getWorkoutVolume(user) {
      let volume = 0;
      user.workouts.forEach((workout) => {
        if (workout.type !== 'Cardio') {
        workout.exercises.forEach((exercise) => {
          exercise.sets.forEach((set) => {
            volume += set.weight * set.reps;
          });
        });
      }
      });
      return volume;
    }
    static getMaxWeightForExercise(user, exerciseId) {  
      let maxWeight = 0;
      user.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          if (exercise._id === exerciseId && exercise.type !== 'Cardio') {
            exercise.sets.forEach((set) => {
              if (set.weight > maxWeight) {
                maxWeight = set.weight;
              }
            });
          }
        });
      });
      return maxWeight;
    }
    
  }

export class Workout extends Realm.Object {
  static schema = {
    name: 'Workout',
    properties: {
      _id: 'objectId',
      owner_id: 'string',
      name: 'string',
      date: {type: 'date', default: new Date()},
      type: {type: 'string', default: 'undefined'},
      exercises: 'Exercise[]',
    },
    primaryKey: '_id',
  };
}

export class Exercise extends Realm.Object {
  static schema = {
    name: 'Exercise',
    properties: {
      _id: 'objectId',
      name: 'string',
      type: 'string',
      sets: 'Set[]',
      cardioTracking: 'CardioTracking[]',
    },
    primaryKey: '_id',
  };
}

export class CardioTracking extends Realm.Object {
  static schema = {
    name: 'CardioTracking',
    properties: {
      _id: 'objectId',
      distance: {type: 'double', default: 0},
      time: {type: 'double', default: 0},
      speed: {type: 'double', default: 0},
      elevation: {type: 'double', default: 0},
    },
    primaryKey: '_id',
  };
}

export class Set extends Realm.Object {
  static schema = {
    name: 'Set',
    properties: {
      _id: 'objectId',
      weight: 'double',
      reps: 'int',
    },
    primaryKey: '_id',
  };
}

export class Tribe extends Realm.Object {
  static schema = {
    name: 'Tribe',
    properties: {
      _id: 'objectId',
      name: 'string',
      description: 'string',
      members: 'string[]',
      level: {type: 'int', default: 1},
      owner_id: 'string',
      // currentWar: {
      //   _id: 'objectId',
      //   opponent: 'Tribe[]',
      //   startDate: {type: 'date', default: new Date()},
      //   endDate: {type: 'date', default: new Date()},

      // }
    },
    primaryKey: '_id',
  };

  static getTribeTotalVolume(tribe) {
    let volume = 0;
    tribe.members.forEach((member) => {
      member.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          exercise.sets.forEach((set) => {
            volume += set.weight * set.reps;
          });
        });
      });
    });
    return volume;
  }
  
  static getTribeTotalWorkouts(members) {
    let workouts = 0;
    members.forEach((member) => {
      workouts += member.workouts.length;
    });
    return workouts;
  }
}

  // Create a configuration object
export const {useRealm, useQuery, RealmProvider, useObject} = createRealmContext({
    schema: [User.schema, Workout.schema, Exercise.schema, Set.schema, Tribe.schema, CardioTracking.schema],
    schemaVersion: 1,
  });
  
