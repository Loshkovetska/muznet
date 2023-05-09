import * as React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import MusicianWelcomeScreen from "../../src/pages/Musician/MusicianWelcomeScreen"
import MusicianListSearchScreen from "../../src/pages/Musician/MusicianListSearchScreen"
import MusicianMapSearchScreen from "../../src/pages/Musician/MusicianMapSearchScreen"
import ContractorAdsCardScreen from "../../src/pages/Musician/ContractorAdsCardScreen"
import MusicianMessagesScreen from "../../src/pages/Musician/MusicianMessagesScreen"
import MusicianChatScreen from "../../src/pages/Musician/MusicianChatScreen"
import MusicianAccountScreen from "../../src/pages/Musician/MusicianAccountScreen"
import MusicianPromoteAdScreen from "../../src/pages/Musician/MusicianPromoteAdScreen"
import MusicianMyDealsScreen from "../../src/pages/Musician/MusicianMyDealsScreen"
import MusicianCalendarScreen from "../../src/pages/Musician/MusicianCalendarScreen"
import Community from "../../src/pages/Community"
import Comments from "../../src/pages/Comments"

const Stack = createNativeStackNavigator()

export default function MusicianStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        headerBackVisible: false,
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="MusicianWelcomeScreen"
        component={MusicianWelcomeScreen}
      />
      <Stack.Screen
        name="MusicianListSearchScreen"
        component={MusicianListSearchScreen}
      />
      <Stack.Screen
        name="MusicianMapSearchScreen"
        component={MusicianMapSearchScreen}
      />
      <Stack.Screen
        name="ContractorAdsCardScreen"
        component={ContractorAdsCardScreen}
      />
      <Stack.Screen
        name="MusicianMessagesScreen"
        component={MusicianMessagesScreen}
      />
      <Stack.Screen name="MusicianChatScreen" component={MusicianChatScreen} />
      <Stack.Screen
        name="MusicianAccountScreen"
        component={MusicianAccountScreen}
      />
      <Stack.Screen
        name="MusicianPromoteAdScreen"
        component={MusicianPromoteAdScreen}
      />
      <Stack.Screen
        name="MusicianMyDealsScreen"
        component={MusicianMyDealsScreen}
      />
      <Stack.Screen
        name="MusicianCalendarScreen"
        component={MusicianCalendarScreen}
      />
      <Stack.Screen name="MusicianCommunityScreen" component={Community} />
      {/* <Stack.Screen name="MusicianCommentsScreen" component={Comments} /> */}
    </Stack.Navigator>
  )
}
