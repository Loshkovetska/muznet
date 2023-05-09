import * as React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeBackScreen from "../../src/pages/Login/WelcomeBackScreen";
import LoginScreen from "../../src/pages/Login/LoginScreen";
import ForgetPasswordScreen from "../../src/pages/Login/ForgetPasswordScreen";
import ResetPasswordScreen from "../../src/pages/Login/ResetPasswordScreen";

const Stack = createNativeStackNavigator();

export default function LoginStack() {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                tabBarShowLabel: false,
                headerBackVisible: false,
                headerShown: false,
            })}
        >
            <Stack.Screen name="WelcomeBackScreen" component={WelcomeBackScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />

        </Stack.Navigator>)
}