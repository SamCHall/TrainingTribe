import { useApp } from "@realm/react";
import { Text, View } from "react-native";
import Realm from "realm";
import { OvalButton } from "../components";
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import { Alert } from "react-native";


const Login = ({ navigation }) => {
    const app = useApp();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmRegisterPassword, setRegisterConfirm] = useState('');

    

    async function registerUser() {
        if(registerPassword != confirmRegisterPassword) 
        return(Alert.alert("Passwords do not match"))
        else {
          try {
            await app.emailPasswordAuth.registerUser({email: registerEmail, password: registerPassword});
              Alert.alert("User registered successfully. Please log in.");
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

    async function logInGuestUser() {
        try {
            await app.logIn(Realm.Credentials.anonymous());
            navigation.replace("Home");
        } catch (error) {
            // error needs to be handled
        }

    }

    async function logInUser() {
        try {
            await app.logIn(Realm.Credentials.emailPassword(email, password));
            navigation.replace("Home");
        } catch (error) {
            if(error.message == "invalid username/password"){
                Alert.alert("Incorrect email and/or password. Please try again.");
            }
            
        }
        
    }

   
    
    return (
        <View>
           <TextInput placeholder="Email" autoComplete="email" inputMode="email" onChangeText={(text) => setEmail(text)}/>
           <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} secureTextEntry={true} />

          <OvalButton text="Log In" onPress={logInUser} />
          <OvalButton text="Log In as Guest" onPress={logInGuestUser} />

            <Text>Don't have an account?</Text>
            <View>
                <TextInput placeholder="Email" autoComplete="email" inputMode="email" onChangeText={(text) => setRegisterEmail(text)}/>
                <TextInput placeholder="Password" onChangeText={(text) => setRegisterPassword(text)} secureTextEntry={true} />
                <TextInput placeholder="Confirm Password" onChangeText={(text) => setRegisterConfirm(text)} secureTextEntry={true}/>

                <OvalButton text="Register" onPress={registerUser} />
            </View>
        </View>
    );
  
}
export default Login
