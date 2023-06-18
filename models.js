import { Realm, createRealmContext } from "@realm/react";

// Defining a schema for a Profile object
export class User extends Realm.Object {
    constructor({ id = new Realm.BSON.ObjectId(), name = 'John Doe', email = 'johndoe@outlook.com' }) {  
      this.username = name;
      this.email = email
      this._id = id;
    }

 
  static schema = {
      name: 'User',
      properties: {
        _id: 'string',
        username: 'string',
        email: 'string',
        workouts: 'Workout[]',
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
      sets: 'Set[]',
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


  // Create a configuration object
export const {useRealm, useQuery, RealmProvider, useObject} = createRealmContext({
    schema: [User.schema, Workout.schema, Exercise.schema, Set.schema],
    schemaVersion: 1,
  });
