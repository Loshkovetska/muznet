import * as React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MainScreen from "../../src/pages/Community"
import CommentsScreen from "../../src/pages/Comments"
import PhotoTape from "@/pages/PhotoTape"
import EditScreen from "@/pages/EditScreen"
import AddScreen from "@/pages/AddScreen"
import SearchScreen from "@/pages/SearchScreen"
import ResultScreen from "@/pages/ResultScreen"
import ResultTapeScreen from "@/pages/ResultTapeScreen"

const Stack = createNativeStackNavigator()

export default function CommunityStack() {
  return (
    <Stack.Navigator
      initialRouteName="CommunityScreen"
      screenOptions={() => ({
        tabBarShowLabel: false,
        headerBackVisible: false,
        headerShown: false,
      })}
    >
      <Stack.Screen name="CommunityScreen" component={MainScreen} />
      <Stack.Screen name="CommunityTapeScreen" component={PhotoTape} />
      <Stack.Screen name="CommunityCommentsScreen" component={CommentsScreen} />
      <Stack.Screen name="CommunityEditScreen" component={EditScreen} />
      <Stack.Screen name="CommunityAddScreen" component={AddScreen} />
      <Stack.Screen name="CommunitySearchScreen" component={SearchScreen} />
      <Stack.Screen name="CommunityResultScreen" component={ResultScreen} />
      <Stack.Screen
        name="CommunityResultTapeScreen"
        component={ResultTapeScreen}
      />
    </Stack.Navigator>
  )
}
