import { Realm, createRealmContext } from "@realm/react";

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

    static getTotalWorkoutVolume(user) {
      let volume = 0;
      user.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          exercise.sets.forEach((set) => {
            volume += set.weight * set.reps;
          });
        });

      }
      );

      return +volume.toFixed(2);
    }

    static getMaxWeight(user) {
      let maxWeight = 0;
      user.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          if (exercise.type !== 'Cardio') {
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
    
    static getCardioExercisesCompleted(user) {
      let cardioExercises = 0;
      user.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          if (exercise.type === 'Cardio') {
            cardioExercises += 1;
          }
        });
      }
      );
      return cardioExercises;
    }

    static getTotalCardioDistance(user) {
      let distance = 0;
      user.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          exercise.cardioTracking.forEach((cardioTracking) => {
            distance += cardioTracking.distance;
          });
        });
      }
      );
      return +distance.toFixed(2);
    }
  
    static getFavouriteExercise(user) {
      let exercises = {};
      user.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          if (exercises[exercise.name]) {
            exercises[exercise.name] += 1;
          } else {
            exercises[exercise.name] = 1;
          }
        });
      }
      );
      let max = 0;
      let maxExercise = '';
      Object.keys(exercises).forEach((exercise) => {
        if (exercises[exercise] > max) {
          max = exercises[exercise];
          maxExercise = exercise;
        }
      });
      return maxExercise;
    }

    static getTotalReps(user) {
      let reps = 0;
      user.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          exercise.sets.forEach((set) => {
            reps += set.reps;
          });
        });
      }
      );
      return reps;
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
      war: 'War?',
    },
    primaryKey: '_id',
  };

  static getTribeTotalVolume(members) {
    let volume = 0;
    members.forEach((member) => {
      member.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          exercise.sets.forEach((set) => {
            volume += set.weight * set.reps;
          });
        });
      });
    });
    return +volume.toFixed(2);
  }

  static getTotalTribeMaxWeight(tribe, exerciseId) {
    let maxWeight = 0;
    tribe.members.forEach((member) => {
      member.workouts.forEach((workout) => {
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
    });
    return maxWeight;
  }
  
  static getTribeTotalReps(members) {
    let reps = 0;
    members.forEach((member) => {
      member.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          exercise.sets.forEach((set) => {
            reps += set.reps;
          });
        });
      });
    });
    return reps;
  }

  static getTribeTotalDistance(members) {
    let distance = 0;
    members.forEach((member) => {
      member.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          exercise.cardioTracking.forEach((cardioTracking) => {
            distance += cardioTracking.distance;
          });
        });
      });
    });
    return distance;
  }

  static getTribeAverageSpeed(members) {
    let speed = 0;
    let exercises = 0;
    members.forEach((member) => {
      member.workouts.forEach((workout) => {
        for (let i = 0; i < workout.exercises.length; i++) {
          if (workout.exercises[i].type === 'Cardio') {
            exercises += 1;
            workout.exercises[i].cardioTracking.forEach((cardioTracking) => {
              speed += cardioTracking.speed;
            });
          }
        };;
      });
    });
    return speed / exercises;
  }

  static getTribeAverageElevation(members) {
    let elevation = 0;
    let exercises = 0;
    members.forEach((member) => {
      member.workouts.forEach((workout) => {
        for (let i = 0; i < workout.exercises.length; i++) {
          if (workout.exercises[i].type === 'Cardio') {
            exercises += 1;
            workout.exercises[i].cardioTracking.forEach((cardioTracking) => {
              elevation += cardioTracking.elevation;
            });
          }
        };;
      });
    });
    return elevation / exercises;
  }

  static getTribeTotalWorkouts(members) {
    let workouts = 0;
    members.forEach((member) => {
      workouts += member.workouts.length;
    });
    return workouts;
  }
}

const firstDay = new Date();
const nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
export class War extends Realm.Object {
  static schema = {
    name: 'War',
    properties: {
      _id: 'objectId',
      tribes: 'Tribe[]',
      startDate: {type: 'date', default: firstDay},
      endDate: {type: 'date', default: nextWeek},
      active: {type: 'bool', default: true},
      winner: 'Tribe?',
    },
    primaryKey: '_id',
  };
}

  // Create a configuration object
export const {useRealm, useQuery, RealmProvider, useObject} = createRealmContext({
    schema: [User.schema, Workout.schema, Exercise.schema, Set.schema, Tribe.schema, CardioTracking.schema, War.schema],
    schemaVersion: 1,
  });
  
