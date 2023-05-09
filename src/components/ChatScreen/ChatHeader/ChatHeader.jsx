import React from 'react'
// Components
import GoBack from '@/components/Buttons/GoBack/GoBack'
// Variables
import C from '@/res/colors'
import IMAGES from '@/res/images'

// Styles
import { style } from './style'
const { GoBackIcon } = IMAGES

const {
  Header,
  HeaderRow,
  HeaderWhiteBlock,
  HeaderClose,
  HeaderUserName,
  HeaderUser,
  HeaderUserImgBlock,
  HeaderUserImg,
  HeaderOptions,
  HeaderOptionsDots,
} = style
// Store
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'

const ChatHeader = observer(
  ({
    chatUserName,
    chatUserImg,
    setOpenBlockUserPopup,
    setOpenSharedScreen,
  }) => {
    const navigation = useNavigation()

    return (
      <Header>
        <HeaderWhiteBlock></HeaderWhiteBlock>
        <HeaderRow>
          <HeaderClose onPress={() => navigation.goBack()}>
            <GoBackIcon width={12} height={20} />

            {/* <GoBack /> */}
          </HeaderClose>

          <HeaderUser
            onPress={() => {
              setOpenSharedScreen(true)
            }}
          >
            <HeaderUserImgBlock>
              <HeaderUserImg
                source={{
                  uri: chatUserImg,
                }}
                resizeMode={'cover'}
              />
            </HeaderUserImgBlock>
            <HeaderUserName numberOfLines={1} ellipsizeMode="tail">
              {chatUserName}
            </HeaderUserName>
          </HeaderUser>

          <HeaderOptions
            onPress={() => {
              setOpenBlockUserPopup(true)
            }}
          >
            <HeaderOptionsDots></HeaderOptionsDots>
            <HeaderOptionsDots></HeaderOptionsDots>
            <HeaderOptionsDots></HeaderOptionsDots>
          </HeaderOptions>
        </HeaderRow>
      </Header>
    )
  },
)

export default ChatHeader
