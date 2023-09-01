import { View, Text, Alert } from 'react-native'
import React, { useEffect } from 'react'
import globalStyles from '../../constants/GlobalStyle'
import { CustomStatusBar, OvalButton, TextButton, TotalVolume } from '../../components'
import { useApp, useUser } from '@realm/react'
import { useObject, useQuery, useRealm } from '../../models'
import Collapsible from 'react-native-collapsible'
import { useState } from 'react'
import { User, Tribe } from '../../models'


const MyTribe = ({navigation}) => {
  const app = useApp()
  const realm = useRealm()
  const user = useUser()
  
  const [collapsed, setCollapsed] = useState(true);

  const renderTribe = () => {
    
    if(!user.customData.tribe){
      return(
        <View>
        <OvalButton text='Create a Tribe' onPress={() => navigation.navigate('CreateTribe')}/>
        <OvalButton text='Join a Tribe' onPress={() => navigation.navigate('JoinTribe')}/>
      </View>
      )
      
    } else {
      const tribe = realm.objects('Tribe').filtered('_id == $0', user.customData.tribe)[0]
      const leader = realm.objects('User').filtered('_id == $0', tribe.owner_id)[0]
      
        const getTribeMembers = () => {
          const memberObjects = tribe.members.map(memberId => realm.objectForPrimaryKey('User', memberId)); // Getting all members from their IDs
          const validMembers = memberObjects.filter(member => member !== null); // Filtering out nulls

          return validMembers;
        };

        const getTribeVolume = () => {
          const members = getTribeMembers();
          const totalVolume = members.reduce((total, member) => total + User.getTotalWorkoutVolume(member), 0);
          return totalVolume;
        };
        

        const deleteTribe = async () => {
          await realm.write(() => {
            realm.delete(tribe);
          })
          navigation.navigate('TribeChooser')
        }

        const leaveTribe = async () => {
          await realm.write(() => {
            tribe.members.splice(tribe.members.indexOf(user._id), 1);
          })
          
          const customDataCollection = user.mongoClient("mongodb-atlas").db("todo").collection("User");
          const filter = {_id: user.id};
          const update = {
            $set: {
              "tribe": undefined
            }
          }
           await customDataCollection.updateOne(filter, update);
           await user.refreshCustomData();

          navigation.navigate('TribeChooser')
        }

        const handleLeaveTribe = () => {
          members = getTribeMembers();
          if(members.length === 1){
            Alert.alert('Leave Tribe', 'Are you sure you want to leave your tribe? This will delete the tribe and you will lose all your tribe data.',
            [
              {
                text: 'Yes',
                onPress: () => deleteTribe()
              },
              {
                text: 'No',
                onPress: () => console.log('No pressed')
              }
            ])
          } else {
            Alert.alert('Leave Tribe', 'Are you sure you want to leave your tribe? You will lose all your tribe data.',
            [
              {
                text: 'Yes',
                onPress: () => leaveTribe()
              },
              {
                text: 'No',
                onPress: () => console.log('No pressed')
              }
            ])
        }
      }

      return(
        <View style={[globalStyles.container, {width:'100%'}]}>
          <View style={{alignItems:'center'}}>
            <Text style={globalStyles.subTitle}>{tribe.name}</Text>
            <Text style={globalStyles.h3}>Leader: {leader.username}</Text> 
            <Text style={globalStyles.text}>Members: {tribe.members.length}</Text>
            <TextButton text='View Description' onPress={() => setCollapsed(!collapsed)}/>
            <Collapsible collapsed={collapsed}>
              <Text style={globalStyles.text}>{tribe.description}</Text>
            </Collapsible>
          </View>
          <TotalVolume members={getTribeMembers()}/>
          <View style={{alignItems:'center'}}>
            <Text style={globalStyles.text}>Total volume lifted: {getTribeVolume()}kg</Text>
            <Text style={globalStyles.text}>Total workouts completed: {Tribe.getTribeTotalWorkouts(members = getTribeMembers())}</Text>
            <Text style={globalStyles.text}>Total distance travelled: {Tribe.getTribeTotalDistance(members=getTribeMembers())}km</Text>
          </View>
        <OvalButton text='Leave Tribe' onPress={() => handleLeaveTribe()}/>
      </View>
      )
    }
    }

  return (
    <View style={globalStyles.centeredContainer}>
      <CustomStatusBar />
      {renderTribe()}
    </View>
  )
}


export default MyTribe
