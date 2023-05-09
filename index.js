import { registerRootComponent } from 'expo'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import App from './App'
registerRootComponent(gestureHandlerRootHOC(App))
