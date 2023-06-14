import { useApp } from "@realm/react";
import { Text, View, KeyboardAvoidingView } from "react-native";
import Realm from "realm";
import { OvalButton } from "../components";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import { Alert } from "react-native";
import globalStyles from "../constants/GlobalStyle";
import { COLORS } from "../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


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
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1, backgroundColor: COLORS.white}}>
            <View>
                <TextInput style={[globalStyles.input, {alignSelf: "center"}]}  mode="outlined" placeholder="Email" placeholderTextColor={COLORS.gray} autoComplete="email" inputMode="email" onChangeText={(text) => setEmail(text)}/>
                <TextInput style={[globalStyles.input, {alignSelf: "center"}]} placeholder="Password" placeholderTextColor={COLORS.gray} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <OvalButton text="Log In" onPress={logInUser} />
                <OvalButton text="Log In as Guest" onPress={logInGuestUser} />
            </View>

            </View>
           

            <Text style={[globalStyles.text, {marginTop: 50}]}>Don't have an account?</Text>
            <View>
                <TextInput style={globalStyles.input} placeholder="Email" placeholderTextColor={COLORS.gray} autoComplete="email" inputMode="email" onChangeText={(text) => setRegisterEmail(text)}/>
                <TextInput style={globalStyles.input} placeholder="Password" placeholderTextColor={COLORS.gray} onChangeText={(text) => setRegisterPassword(text)} secureTextEntry={true} />
                <TextInput style={globalStyles.input} placeholder="Confirm Password" placeholderTextColor={COLORS.gray} onChangeText={(text) => setRegisterConfirm(text)} secureTextEntry={true}/>

                <OvalButton text="Register" onPress={registerUser} />
            </View>
        </KeyboardAwareScrollView>
    );
  
}
export default Login
