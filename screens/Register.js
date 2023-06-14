import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'

import { OvalButton } from '../components'
import { useApp } from '@realm/react';

const Register = () => {
    const app = useApp();

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmRegisterPassword, setRegisterConfirm] = useState('');

    

    async function registerUser() {
        if(registerPassword != confirmRegisterPassword) 
        return(Alert.alert("Passwords do not match"))
        else {
          try {
            await app.emailPasswordAuth.registerUser({email: registerEmail, password: registerPassword});
            Alert.alert("User registered successfully");
          } catch (error) {
            if(error.message == "name already in use"){
              Alert.alert("Email already in use. Please try again.")
            }
            else{
              Alert.alert("Error registering user. Please try again.");
            }
          }
            
        }
    }

  return (
    <View>
        <TextInput placeholder="Email" autoComplete="email" inputMode="email" onChangeText={(text) => setEmail(text)}/>
        <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        <TextInput placeholder="Confirm Password" onChangeText={(text) => setConfirm(text)} secureTextEntry={true}/>

        <OvalButton text="Register" onPress={registerUser} />
    </View>
  )
}

export default Register
