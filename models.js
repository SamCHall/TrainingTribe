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
        _id: 'objectId',
        username: 'string',
        email: 'string',
      },
      primaryKey: '_id',
    };
  }

  

  // Create a configuration object
export const {useRealm, useQuery, RealmProvider, useObject} = createRealmContext({
    schema: [User.schema],
  });
