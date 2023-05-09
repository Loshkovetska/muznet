import React from "react"
import { useState, useEffect } from "react"
import { Animated, BackHandler, Keyboard } from "react-native"
// Components

// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateAttachment } from "./useAnimateAttachment"
// Images
import IMAGES from "@/res/images"
const { CrossBlackIcon } = IMAGES
// Variables
import C from "@/res/colors"
// Styles
import { style } from "./style"
const {
  CloseButton,
  OpacityBg,
  ButtonsBlock,
  Button,
  ButtonText,
  ButtonCancel,
  ButtonCancelText,
  AttachContainerText,
} = style

const BottomConfirmPopup = ({
  isOpenBottomPopup,
  setOpenBottomPopup,
  setConfirm,
  confirmBtnText,
  popupMainText,
}) => {
  const { windowHeight, windowWidth } = getWindowDimension()

  // Animate attachment
  const { onPress, height } = useAnimateAttachment()

  useEffect(() => {
    if (isOpenBottomPopup === true) {
      Keyboard.dismiss()
      onPress(true)
    }
  }, [isOpenBottomPopup])

  const [isHideAnimationTab, setHideAnimationTab] = useState(false)

  useEffect(() => {
    if (isHideAnimationTab === true) {
      onPress(false)
    }
  }, [isHideAnimationTab])

  const closePopup = (bool) => {
    setConfirm(bool)
    setHideAnimationTab(true)
    setTimeout(() => {
      setOpenBottomPopup(false)
    }, 500)
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        closePopup()
        return true
      },
    )
    return () => {
      backHandler.remove()
    }
  }, [])

  return (
    <>
      {isOpenBottomPopup && (
        <OpacityBg
          style={{
            height: windowHeight,
            width: windowWidth,
            zIndex: 2000,
          }}
          onPress={() => {
            closePopup()
          }}
        ></OpacityBg>
      )}
      <Animated.View
        style={{
          height,
          width: windowWidth,
          zIndex: 2000,
          justifyContent: "center",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          position: "absolute",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: C.white,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          overflow: "hidden",
          paddingHorizontal: 16,
          left: 0,
          bottom: 50,
          right: 0,
        }}
      >
        {/* Attach container */}
        <CloseButton
          onPress={() => {
            closePopup(false)
          }}
        >
          <CrossBlackIcon width={14} height={14} />
        </CloseButton>

        <AttachContainerText>{popupMainText}</AttachContainerText>

        {/* Buttons */}
        <ButtonsBlock>
          <ButtonCancel
            onPress={() => {
              closePopup(false)
            }}
          >
            <ButtonCancelText>Cancel</ButtonCancelText>
          </ButtonCancel>
          <Button
            onPress={() => {
              closePopup(true)
            }}
          >
            <ButtonText>{confirmBtnText}</ButtonText>
          </Button>
        </ButtonsBlock>
      </Animated.View>
    </>
  )
}

export default BottomConfirmPopup
