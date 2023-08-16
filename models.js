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
}

  // Create a configuration object
export const {useRealm, useQuery, RealmProvider, useObject} = createRealmContext({
    schema: [User.schema, Workout.schema, Exercise.schema, Set.schema, Tribe.schema, CardioTracking.schema],
    schemaVersion: 1,
  });
  
