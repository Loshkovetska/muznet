import React from "react"

import IMAGES from "@/res/images"
import {
  useNavigation,
  // , useRoute
} from "@react-navigation/native"
// Styles
import styled from "styled-components"
import Constants from "expo-constants"

const { GoBackIcon } = IMAGES

const GoBackButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  padding-left: 5px;
  padding-right: 10px;
  padding-top: ${Constants.statusBarHeight}px;
//   padding-bottom: 10px;
  top: 0px;
  left: -10px;
  z-index: 1000;
  bottom: 0px;
`

const GoBack = ({ stackName, screenName }) => {
  const navigation = useNavigation()

  const isNavigationGoback = () => {
    if (stackName === undefined) {
      navigation.goBack()
    } else {
      navigation.navigate(stackName, {
        screen: screenName,
      })
    }
  }

  return (
    <GoBackButton onPress={isNavigationGoback}>
      <GoBackIcon width={12} height={20} />
    </GoBackButton>
  )
}
export default GoBack
