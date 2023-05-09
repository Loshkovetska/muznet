import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

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
  SliderContainer,
  SliderScrollView,
  SliderImagePressable,
  SliderImage,
  SliderDots,
  SliderDotsBlock,
  SliderDot,
} = style

const CardImageSlider = ({
  cardImages,
  isResetSlider,
  fullscreenImgState,
  setFullscreenImgState,
}) => {
  const route = useRoute()
  const routeParams = route.params
  const { windowHeight, windowWidth } = getWindowDimension()
  const [initialContentOffset, setInitialContentOffset] = useState()
  useEffect(() => {
    if (fullscreenImgState.initialSlide > 0) {
      const paddingLeft = windowWidth * fullscreenImgState.initialSlide
      setInitialContentOffset(paddingLeft)
    } else {
      setInitialContentOffset(0)
    }
  }, [fullscreenImgState.initialSlide])

  // Reset image state if press on similar item
  useEffect(() => {
    if (routeParams) {
      setFullscreenImgState({ isOpen: false, initialSlide: 0 })
      runInAction(() => {
        HideStatusBar.state = false
      })
    }
  }, [routeParams])

  const onSlide = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      )
      if (slide !== fullscreenImgState.initialSlide) {
        setFullscreenImgState({ isOpen: false, initialSlide: slide })
      }
    }
  }


  const dotsBlockWidth =
    cardImages?.length * 8 + (cardImages?.length - 1) * 8 + 16
  return (
    <SliderContainer>
      <SliderScrollView
        scrollEventThrottle={10}
        onScroll={({ nativeEvent }) => onSlide(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={true}
        contentOffset={{
          x: initialContentOffset !== undefined ? initialContentOffset : 0,
          y: 0,
        }}
      >
        {cardImages?.map((img, key) => {
          return (
            <SliderImagePressable
              key={key}
              onPress={() => {
                setFullscreenImgState({
                  isOpen: true,
                  initialSlide: key,
                })
                runInAction(() => {
                  HideStatusBar.state = true
                })
              }}
            >
              <SliderImage
                style={{
                  width: windowWidth,
                  height: windowHeight / 2,
                }}
                source={img}
                resizeMode={'cover'}
              />
            </SliderImagePressable>
          )
        })}
        {cardImages.length == 0 && (
          <SliderImagePressable onPress={() => {}}>
            <SliderImage
              style={{
                width: windowWidth,
                height: windowHeight / 2,
              }}
              source={IMAGES.Logo}
              resizeMode={'cover'}
            />
          </SliderImagePressable>
        )}
      </SliderScrollView>

      <SliderDots>
        <SliderDotsBlock
          style={{
            width: dotsBlockWidth,
          }}
        >
          {cardImages.map((img, key) => {
            const isActive = key === fullscreenImgState.initialSlide
            const isFirst = key === 0
            return (
              <SliderDot
                isFirst={isFirst}
                isActive={isActive}
                key={key}
              ></SliderDot>
            )
          })}
        </SliderDotsBlock>
      </SliderDots>
    </SliderContainer>
  )
}

export default CardImageSlider
