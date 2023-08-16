import { View, Text } from 'react-native'
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

const realm = useRealm()
const user = useUser()

const handleCreateTribe = () => {
    console.log(tribeName)
    console.log(tribeDescription)
    realm.write(() => {
        realm.create('Tribe', {
            _id: Realm.BSON.ObjectId(),
            name: tribeName,
            description: tribeDescription,
            members: [user.id],
            owner_id: user.id,
        })
    }
    )
    navigation.replace('MyTribe')
}


  return (
    <View style={globalStyles.centeredContainer}>
      <TextInput style={globalStyles.input} placeholder='Tribe Name' placeholderTextColor={COLORS.gray} onChangeText={setTribeName}/>
      <TextInput style={globalStyles.input} placeholder='Tribe Description' placeholderTextColor={COLORS.gray} onChangeText={setTribeDescription} />
      <OvalButton text='Create Tribe' onPress={() => handleCreateTribe()}/>


    </View>
  )
}

export default CreateTribe
