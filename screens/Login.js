import { useApp } from "@realm/react";
import { Text, View } from "react-native";
import Realm from "realm";
import { OvalButton } from "../components";

const Login = ({ navigation }) => {
    const app = useApp();
    
    if (app.currentUser) {
      navigation.navigate('Home');
    }
    
    async function logInGuestUser() {
      console.log('button pressed')
      await app.logIn(Realm.Credentials.anonymous());
      navigation.navigate('Home');
    }
    return (
        <View>
          <Text>Log In</Text>
          <OvalButton text="Log In as Guest" onPress={logInGuestUser} />
        </View>
    );
  }

export default Login
