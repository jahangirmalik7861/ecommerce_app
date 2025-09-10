import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Provider } from "react-redux";
import ForgotPassword from "./src/components/Screens/Auth/ForgotPassword";
import LogIn from "./src/components/Screens/Auth/LogIn";
import SignUp from "./src/components/Screens/Auth/signUp";
import store from "./src/redux/Store";

const Stack = createNativeStackNavigator();

const option = { headerShown: false };
export default function App() {
  return (
    <>
    <Provider store={store}>
       
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignUp" component={SignUp} options={option} />
        <Stack.Screen name="login" component={LogIn} options={option} />
        <Stack.Screen
          name="forgot-password"
          component={ForgotPassword}
          options={option}
          />
      </Stack.Navigator>
    </NavigationContainer>
          </Provider>
          </>
  );
}
