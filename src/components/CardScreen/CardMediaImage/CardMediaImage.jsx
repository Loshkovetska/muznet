import React from 'react'
import { useState, useCallback, useEffect } from 'react'

import { View, Text } from 'react-native'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
// Variables
import C from '@/res/colors'
// Images
import IMAGES from '@/res/images'
const { PriceRangeBgIcon } = IMAGES
// Styles
import { style } from './style'
import { runInAction } from 'mobx'
import { HideStatusBar } from '../CardFullscreenImageSlider/CardFullscreenImageSlider'

const {
  MediaContainer,
  MediaBlock,
  MediaImg,
  MediaImgTwoItem,
  MediaImgLeft,
  MediaImgCol,
  MediaImgRight,
  MediaContainerTitle,
  MediaViewAllBtn,
  MediaViewAllBtnText,
  CardBorder,
} = style

const CardMediaImage = ({ cardImages, setFullscreenImgState }) => {
  if (cardImages?.length < 2) return null

  const isTwoImageBlock = cardImages?.length === 2 && (
    <MediaBlock>
      <MediaImgTwoItem
        onPress={() => {
          setFullscreenImgState({ isOpen: true, initialSlide: 0 })
          runInAction(() => {
            HideStatusBar.state = true
          })
        }}
      >
        <MediaImg
          source={{
            uri: cardImages[0].trim(),
          }}
          resizeMode={'cover'}
        />
      </MediaImgTwoItem>

      <MediaImgTwoItem
        onPress={() => {
          setFullscreenImgState({ isOpen: true, initialSlide: 1 })
          runInAction(() => {
            HideStatusBar.state = true
          })
        }}
      >
        <MediaImg
          source={{
            uri: cardImages[1].trim(),
          }}
          resizeMode={'cover'}
        />
      </MediaImgTwoItem>
    </MediaBlock>
  )

  const isThreeImageBlock = cardImages?.length >= 3 && (
    <MediaBlock>
      <MediaImgLeft
        onPress={() => {
          setFullscreenImgState({ isOpen: true, initialSlide: 0 })
          runInAction(() => {
            HideStatusBar.state = true
          })
        }}
      >
        <MediaImg
          source={{
            uri: cardImages[0].trim(),
          }}
          resizeMode={'cover'}
        />
      </MediaImgLeft>
      <MediaImgCol>
        <MediaImgRight
          onPress={() => {
            setFullscreenImgState({ isOpen: true, initialSlide: 1 })
            runInAction(() => {
              HideStatusBar.state = true
            })
          }}
        >
          <MediaImg
            source={{
              uri: cardImages[1].trim(),
            }}
            resizeMode={'cover'}
          />
        </MediaImgRight>
        <MediaImgRight
          onPress={() => {
            setFullscreenImgState({ isOpen: true, initialSlide: 2 })
            runInAction(() => {
              HideStatusBar.state = true
            })
          }}
        >
          <MediaImg
            source={{
              uri: cardImages[2].trim(),
            }}
            resizeMode={'cover'}
          />
        </MediaImgRight>
      </MediaImgCol>
    </MediaBlock>
  )

  return (
    <MediaContainer>
      <MediaContainerTitle>Media</MediaContainerTitle>

      {isTwoImageBlock}
      {isThreeImageBlock}

      <MediaViewAllBtn
        onPress={() => {
          setFullscreenImgState({ isOpen: true, initialSlide: 0 })
          runInAction(() => {
            HideStatusBar.state = true
          })
        }}
      >
        <MediaViewAllBtnText>View All</MediaViewAllBtnText>
      </MediaViewAllBtn>
      {/* Border */}
      <CardBorder></CardBorder>
    </MediaContainer>
  )
}

export default CardMediaImage
