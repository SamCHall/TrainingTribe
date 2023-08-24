import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import globalStyles from '../../constants/GlobalStyle'
import { TextInput } from 'react-native-gesture-handler'
import { COLORS } from '../../constants'
import { OvalButton } from '../../components'
import { useState } from 'react'
import { useRealm } from '../../models'
import { useUser } from '@realm/react'


const CreateTribe = ({navigation}) => {

const [tribeName, setTribeName] = useState('')
const [tribeDescription, setTribeDescription] = useState('')
const [isLoading, setIsLoading] = useState(false)

const realm = useRealm()
const user = useUser()

const handleCreateTribe = async () => {

    setIsLoading(true)

    const tribeId = Realm.BSON.ObjectId();
    realm.write(() => {
        realm.create('Tribe', {
            _id: tribeId,
            name: tribeName,
            description: tribeDescription,
            members: [user.id],
            owner_id: user.id,
        })
        }
    )
        const customDataCollection = user.mongoClient("mongodb-atlas").db("todo").collection("User");
    const filter = {_id: user.id};
    const update = {
      $set: {
        tribe: tribeId,
      }
    }
      await customDataCollection.updateOne(filter, update);
      await user.refreshCustomData();
      await realm.syncSession.uploadAllLocalChanges();
      setIsLoading(false)
      navigation.replace('Home')
}


  return (
    
    <View style={globalStyles.centeredContainer}>
      <TextInput style={globalStyles.input} placeholder='Tribe Name' placeholderTextColor={COLORS.gray} onChangeText={setTribeName}/>
      <TextInput style={globalStyles.input} placeholder='Tribe Description' placeholderTextColor={COLORS.gray} onChangeText={setTribeDescription} />
      <OvalButton text='Create Tribe' onPress={() => handleCreateTribe()}/>
      <ActivityIndicator animating={isLoading} size='large' color={COLORS.secondary}/>

    </View>
  )
}

export default CreateTribe
