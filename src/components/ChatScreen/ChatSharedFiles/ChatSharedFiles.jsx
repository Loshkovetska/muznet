import React from 'react'
import { useState, useEffect } from 'react'
import { Animated, BackHandler } from 'react-native'
// Components
import ChoosePaymentMethod from '@/components/ChoosePaymentMethod'

// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateOfferPreview } from './useAnimateOfferPreview'
// Images
import IMAGES from '@/res/images'
const { GoBackIcon } = IMAGES

// Styles
import { style } from './style'
const {
  FilterContainer,
  Header,
  HeaderRow,
  HeaderWhiteBlock,
  HeaderClose,
  HeaderUserName,
  HeaderUserLastLogin,
  HeaderUser,
  HeaderUserImgBlock,
  HeaderUserImg,
  HeaderOptions,
  HeaderOptionsDots,

  SharedTitle,
  SharedBlock,
  SharedContainer,
  SharedScrollView,
  SharedImageBlock,
  SharedImage,
} = style

// Store
import { observer } from 'mobx-react-lite'

const ChatSharedFiles = observer(
  ({
    chatUserName,
    chatUserImg,
    isOpenSharedScreen,
    setOpenSharedScreen,
    setOpenBlockUserPopup,
  }) => {
    const { windowHeight, windowWidth } = getWindowDimension()
    const { onPress, width } = useAnimateOfferPreview()

    useEffect(() => {
      if (isOpenSharedScreen === true) {
        onPress(true)
      }
    }, [isOpenSharedScreen])

    useEffect(() => {
      if (isOpenSharedScreen === true) {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          () => {
            setOpenSharedScreen(false)
            setOpenBlockUserPopup(false)
            return true
          },
        )
        return () => {
          backHandler.remove()
        }
      }
    }, [])

    const imageBlockSize = (windowWidth - 53) / 4

    return (
      <Animated.View
        style={{
          zIndex: 2000,
          height: windowHeight,
          width,
          // width: windowWidth,
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <FilterContainer
          style={{
            height: windowHeight,
            width: windowWidth,
          }}
        >
          {/* Header */}
          <Header>
            <HeaderWhiteBlock></HeaderWhiteBlock>
            <HeaderRow>
              <HeaderClose
                onPress={() => {
                  setOpenSharedScreen(false)
                  onPress(false)
                }}
              >
                <GoBackIcon width={14} height={22} />
              </HeaderClose>

              <HeaderUser>
                <HeaderUserImgBlock>
                  <HeaderUserImg
                    source={{
                      uri: chatUserImg,
                    }}
                    resizeMode={'cover'}
                  />
                </HeaderUserImgBlock>
                <HeaderUserName
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {chatUserName}
                </HeaderUserName>
                {/* <HeaderUserLastLogin>Active 19m ago</HeaderUserLastLogin> */}
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

          <SharedContainer>
            <SharedTitle>Shared files</SharedTitle>
            <SharedScrollView showsVerticalScrollIndicator={false}>
              <SharedBlock>
                {IMAGES.sharedImages.map((image, id) => {
                  return (
                    <SharedImageBlock
                      style={{
                        height: imageBlockSize,
                        width: imageBlockSize,
                      }}
                      key={id}
                    >
                      <SharedImage source={image} resizeMode={'cover'} />
                    </SharedImageBlock>
                  )
                })}
              </SharedBlock>
            </SharedScrollView>
          </SharedContainer>
        </FilterContainer>
      </Animated.View>
    )
  },
)

export default ChatSharedFiles
