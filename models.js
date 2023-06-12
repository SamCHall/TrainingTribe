import { Realm, createRealmContext } from "@realm/react";

// Defining a schema for a Profile object
export class Profile extends Realm.Object {
    constructor({ id = new Realm.BSON.ObjectId(), name = 'John Doe' }) {  
      this.name = name;
      this._id = id;
    }

 
  static schema = {
      name: 'Profile',
      properties: {
        _id: 'objectId',
        name: 'string',
      },
      primaryKey: '_id',
    };
  }

  

  // Create a configuration object
export const {useRealm, useQuery, RealmProvider, useObject} = createRealmContext({
    schema: [Profile.schema],
    deleteRealmIfMigrationNeeded: true,
  });
