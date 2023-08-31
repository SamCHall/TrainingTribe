import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../constants'
import { Modal } from 'react-native'
import { useState } from 'react'
import globalStyles from '../../constants/GlobalStyle'
import { TextButton } from '../button'
import { TouchableOpacity } from 'react-native-gesture-handler'

const InfoIcon = ({topic}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const renderContent = () => {
        switch (topic) {
            case 'winCondition':
                return(
                    <View style={{alignContent:'center', justifyContent:'space-evenly', height:'100%'}}>
                        <Text style={[globalStyles.subTitle, {textAlign:'center'}]}>Win Condition</Text>
                        <Text style={[globalStyles.text, {textAlign:'center'}]}>
                            Teams compete in multiple categories such as Total Volume of weight lifted and Total Distance ran. 
                        </Text>
                        <Text style={[globalStyles.text, {textAlign:'center'}]}>
                            The team winning the most categories at the end of the experiment wins!
                        </Text>
                        <Text style={[globalStyles.text, {textAlign:'center'}]}>
                            Since the experiment is short, you have been put up against a pre-made team.
                        </Text> 
                    </View>
                )
        
            default:
                return(
                    <Text style={globalStyles.text}>
                        This is the default modal
                    </Text>
                )
        }
    }

  return (
    <View>
    <View>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{marginHorizontal:5}}>
            <Ionicons name="information-circle" size={20} color={COLORS.gray}/>
        </TouchableOpacity>
    </View>
    <Modal visible={modalVisible} transparent={true}>
        <View style={globalStyles.outerModalContainer}>
            <View style={globalStyles.innerModalContainer}>
                <View style={{flex:1}}>
                   {renderContent()}  
                </View>
                   
                <TextButton text='Close' onPress={() => setModalVisible(false)}/>
            </View>
        </View>
    </Modal>
    </View>

  )
}

export default InfoIcon
