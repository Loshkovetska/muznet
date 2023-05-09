import React, { useEffect } from "react"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OnBoardingScreen from "../src/pages/OnBoardingScreen"
import LoginStack from "./LoginStack/LoginStack"
import SignUpStack from "./SignUpStack/SignUpStack"
import CommunityStack from "./CommunityStack"
import ContractorStack from "./ContractorStack/ContractorStack"
import MusicianStack from "./MusicianStack/MusicianStack"
const Stack = createNativeStackNavigator()
export default function UserStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        itemStyle: { padding: 0 },
        tabBarShowLabel: false,
        headerBackVisible: false,
        // Header
        headerBackVisible: false,
        headerShown: false,
        tabBarStyle: { display: "none" },
      })}
    >
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <Stack.Screen name="LoginStack" component={LoginStack} />
      <Stack.Screen name="SignUpStack" component={SignUpStack} />
      <Stack.Screen name="ContractorStack" component={ContractorStack} />
      <Stack.Screen name="MusicianStack" component={MusicianStack} />
      <Stack.Screen name="CommunityStack" component={CommunityStack} />
    </Stack.Navigator>
  )
}
