import { Realm, createRealmContext } from "@realm/react";

// Defining a schema for a Profile object
export class User extends Realm.Object {
    constructor({ id = new Realm.BSON.ObjectId(), name = 'John Doe', password = 'password', email = 'johndoe@outlook.com' }) {  
      this.username = name;
      this.email = email
      this.password = password;
      this._id = id;
    }

 
  static schema = {
      name: 'User',
      properties: {
        _id: 'objectId',
        username: 'string',
        email: 'string',
        password: 'string',
      },
      primaryKey: '_id',
    };
  }

  

  // Create a configuration object
export const {useRealm, useQuery, RealmProvider, useObject} = createRealmContext({
    schema: [User.schema],
  });
