import React from "react"
import { useState, useEffect } from "react"
import { BackHandler } from "react-native"

// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
// Variables
import C from "@/res/colors"
// Images
import IMAGES from "@/res/images"
const { GoBackWhiteIcon } = IMAGES
// Styles
import { style } from "./style"
import { observable, runInAction } from "mobx"
const {
  SliderContainer,
  Header,
  HeaderClose,
  HeaderTitle,
  HeaderTitleText,
  SliderScrollView,
  SliderImageBlock,
  SliderImage,
} = style

export const HideStatusBar = observable({
  state: false,
})

const CardFullscreenImageSlider = ({
  cardImages,
  fullscreenImgState,
  setFullscreenImgState,
}) => {
  if (cardImages === undefined || cardImages.lenght === 0) return
  const { windowHeight, windowWidth } = getWindowDimension()

  const [initialContentOffset, setInitialContentOffset] = useState()

  useEffect(() => {
    if (
      fullscreenImgState.isOpen === true &&
      fullscreenImgState.initialSlide > 0
    ) {
      const paddingLeft = windowWidth * fullscreenImgState.initialSlide
      setInitialContentOffset(paddingLeft)
    }
  }, [fullscreenImgState.isOpen])

  useEffect(() => {
    if (fullscreenImgState.isOpen === true) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          setFullscreenImgState({
            isOpen: false,
            initialSlide: fullscreenImgState.initialSlide,
          })
          return true
        },
      )
      return () => {
        backHandler.remove()
      }
    }
  }, [])

  const onSlide = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      )
      if (slide !== fullscreenImgState.initialSlide) {
        setFullscreenImgState({ isOpen: true, initialSlide: slide })
      }
    }
  }

  const counterText = `${fullscreenImgState.initialSlide + 1}/${
    cardImages?.length
  }`
  return (
    <SliderContainer
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
    >
      {/* Header */}
      <Header>
        <HeaderClose
          onPress={() => {
            setFullscreenImgState({
              isOpen: false,
              initialSlide: fullscreenImgState.initialSlide,
            })
            runInAction(() => {
              HideStatusBar.state = false
            })
          }}
        >
          <GoBackWhiteIcon width={11} height={22} />
        </HeaderClose>

        <HeaderTitle>
          <HeaderTitleText numberOfLines={1}>{counterText}</HeaderTitleText>
        </HeaderTitle>
      </Header>
      <SliderScrollView
        onScroll={({ nativeEvent }) => onSlide(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={true}
        contentOffset={{
          x: initialContentOffset !== undefined ? initialContentOffset : 0,
          y: 0,
        }}
      >
        {cardImages.map((img, key) => {
          return (
            <SliderImageBlock
              onPress={() => {
                setInitialContentOffset(undefined)
              }}
              key={key}
            >
              <SliderImage
                style={{
                  width: windowWidth,
                  height: "100%",
                }}
                source={img}
                resizeMode={"contain"}
              />
            </SliderImageBlock>
          )
        })}
      </SliderScrollView>
    </SliderContainer>
  )
}

export default CardFullscreenImageSlider
