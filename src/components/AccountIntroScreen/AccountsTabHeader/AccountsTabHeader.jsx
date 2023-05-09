import React from 'react'
// Images
import IMAGES from '@/res/images'
const { GoBackIcon } = IMAGES
// Styles
import { style } from './style'
const { Header, HeaderClose, HeaderTitle, HeaderSpace } = style

import Constants from 'expo-constants'
const AccountsTabHeader = ({ tabName, setOpenTabs, onPress }) => {
  const isNotification =
    tabName === 'Notification Settings' ? 'Notification' : tabName
  return (
    <Header
    // style={{
    //   paddingTop: Constants.statusBarHeight,
    // }}
    >
      <HeaderClose
        onPress={() => {
          onPress(false)
          setTimeout(() => {
            setOpenTabs({
              tabName: isNotification,
              isOpen: false,
            })
          }, 600)
        }}
      >
        <GoBackIcon width={12} height={21} />
      </HeaderClose>

      <HeaderTitle>{tabName}</HeaderTitle>
      <HeaderSpace />
    </Header>
  )
}

export default AccountsTabHeader
