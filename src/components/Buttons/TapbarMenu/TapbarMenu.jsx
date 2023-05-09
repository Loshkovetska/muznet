import React from "react"

import { useRoute, useNavigation } from "@react-navigation/native"
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
// Icons
import IMAGES from "@/res/images"
const {
  HomeTapbarIcon,
  MessagesTapbarIcon,
  CalendarTapbarIcon,
  CommunityTapbarIcon,
  ProfileTapbarIcon,
} = IMAGES
// Content
const TapbarMenuContent = [
  {
    screenName: "WelcomeScreen",
    icon: <HomeTapbarIcon width={20} height={20} />,
  },
  {
    screenName: "MessagesScreen",
    icon: <MessagesTapbarIcon width={20} height={20} />,
  },
  {
    screenName: "CalendarScreen",
    icon: <CalendarTapbarIcon width={20} height={20} />,
  },
  {
    screenName: "CommunityScreen",
    icon: <CommunityTapbarIcon height={20} />,
  },
  {
    screenName: "AccountScreen",
    icon: <ProfileTapbarIcon width={20} height={20} />,
  },
]

// Style
import styled from "styled-components/native"
import C from "@/res/colors"
import { runInAction } from "mobx"

const TapbarBlock = styled.View`
border-top-color: ${C.lightGray};
border-top-width: 1px;
display: flex;
justify-content: space-between;
flex-direction: row;
position: absolute;
left: 0px;
bottom: 0px;
width: 100%;
height : 82px;
/* height : ${(props) =>
  props.isKeyboardOpen === true ? 60 + "px" : 82 + "px"}; */
z-index:999;
background-color: ${C.white};
padding: 0px 10px;
`
const TapbarItem = styled.TouchableOpacity`
  padding-top: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 20%;
  opacity: 0.2;
`
const TapbarItemActive = styled.View`
  padding-top: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 20%;
`
const ActiveDot = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 6px;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: ${C.black};
`

const TapbarMenu = ({ isShowKeyboard }) => {
  const navigation = useNavigation()

  const route = useRoute()
  const routeName = route.name
  const isKeyboardOpen = isKeyboardShown()


  return (
    <TapbarBlock
      
      isKeyboardOpen={
        isShowKeyboard !== undefined ? isShowKeyboard : isKeyboardOpen
      }
    >
      {TapbarMenuContent.map((item, id) => {
        const isContractor = routeName.slice(0, 10) === "Contractor"
        const navigationPrefix =
          isContractor === true ? "Contractor" : "Musician"

        const isContractorSlice = isContractor ? 10 : 8
        const cleanRoute = routeName.slice(isContractorSlice, routeName.length)
        const isSearch =
          cleanRoute === "ListSearchScreen" ? "WelcomeScreen" : cleanRoute
        let isActive = isSearch === item.screenName

        if (routeName.includes("Community")) {
          isActive = routeName.includes(item.screenName.replace("Screen", ""))
        }

        return isActive === true ? (
          <TapbarItemActive key={id}>
            {/* Icon */}
            {item.icon}
            <ActiveDot></ActiveDot>
          </TapbarItemActive>
        ) : (
          <TapbarItem
            onPress={() => {
              let isOneTap = 0
              if (isOneTap === 0 && !isActive) {
                isOneTap = 1
                navigation.push(`${navigationPrefix}Stack`, {
                  screen: `${navigationPrefix}${item.screenName}`,
                })
              }
            }}
            isActive={isActive}
            key={id}
          >
            {/* Icon */}
            {item.icon}
          </TapbarItem>
        )
      })}
    </TapbarBlock>
  )
}
export default TapbarMenu
