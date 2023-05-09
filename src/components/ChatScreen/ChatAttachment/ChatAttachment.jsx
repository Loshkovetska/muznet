import React from "react"
import { useState, useEffect } from "react"
import { Animated, BackHandler } from "react-native"
// Components
import CameraCustom from "@/components/CameraCustom"
// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateAttachment } from "./useAnimateAttachment"
// Images
import IMAGES from "@/res/images"
const { CameraGrayIcon, GaleryBlackIcon, CloudBlackIcon } = IMAGES
// Variables
import C from "@/res/colors"
// Styles
import { style } from "./style"
const {
  AttachContainer,
  ClosePanBlock,
  ClosePan,
  OpacityBg,
  ButtonsBlock,
  Button,
  ButtonText,
} = style

// Store
import { observer } from "mobx-react-lite"
import { useChatAttachmentStore } from "@/stores/ChatAttachmentStore"
import { useCameraStore } from "@/stores/CameraStore"
import { sendMessage } from "@/stores/MessangesStore"
import AccountStore from "@/stores/AccountStore"
import { useRoute } from "@react-navigation/native"
const ChatAttachment = observer(() => {
  const { windowHeight, windowWidth } = getWindowDimension()
  // Store
  const {
    isOpenChatAttachment,
    setOpenChatAttachment,
    setAttachedFile,
    isSendAttached,
    pickImageFromGalery,
    file,resetFile
  } = useChatAttachmentStore()
  // Camera store
  const { hasPermission, getPermissionAsync } = useCameraStore()
  const [isOpenCamera, setOpenCamera] = useState(false)
  const route = useRoute()
  useEffect(() => {
    if (hasPermission === true) {
      setOpenCamera(true)
    } else {
      setOpenCamera(false)
    }
  }, [hasPermission])

  // Animate attachment
  const { onPress, height } = useAnimateAttachment()
  const [isShowOpacityBgMargin, setShowOpacityBgMargin] = useState(false)

  useEffect(() => {
    if (isOpenChatAttachment === true && isSendAttached === false) {
      onPress(true)
      setTimeout(() => {
        setShowOpacityBgMargin(true)
      }, 400)
    }
    if (isSendAttached === true && isOpenChatAttachment === false) {
      onPress(false)
      setShowOpacityBgMargin(false)
    }
  }, [isOpenChatAttachment, isSendAttached])

  useEffect(() => {
    if (isOpenCamera === true) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          setOpenCamera(false)
          return true
        },
      )
      return () => {
        backHandler.remove()
      }
    }
  }, [isOpenCamera])

  useEffect(() => {
    if (file && file.fileName) {
      const now = new Date()
      const date = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now
        .getDate()
        .toString()
        .padStart(2, "0")} ${now
        .getHours()
        .toString()
        .padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`

      sendMessage({
        from: AccountStore.account.id,
        to: route.params.chatUserId,
        files: [file],
        text: "",
        datetime: date,
        isOffer: false,
        isNew: true,
      })
      resetFile()
    }
  }, [file])
  return (
    <Animated.View
      style={{
        width: windowWidth,
        height,
        zIndex: 2000,
        justifyContent: "center",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        position: "absolute",
        marginTop: -50,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      {/* Opacity bg */}
      <OpacityBg
        style={{
          height: windowHeight,
          width: windowWidth,
          top: isShowOpacityBgMargin ? -50 : 0,
        }}
        onPress={() => {
          onPress(false)
          setOpenChatAttachment(false)
          setShowOpacityBgMargin(false)
        }}
      ></OpacityBg>

      {/* Camera */}
      {isOpenCamera === true && (
        <CameraCustom
          isOpenCamera={isOpenCamera}
          setShowOpacityBgMargin={setShowOpacityBgMargin}
          setOpenCamera={setOpenCamera}
        />
      )}

      {/* Attach container */}
      <AttachContainer>
        <ClosePanBlock
          onPress={() => {
            onPress(false)
            setShowOpacityBgMargin(false)
            setOpenChatAttachment(false)
          }}
        >
          <ClosePan></ClosePan>
        </ClosePanBlock>

        {/* Switch buttons */}
        <ButtonsBlock>
          <Button
            onPress={() => {
              if (hasPermission) {
                setOpenCamera(true)
              }
              getPermissionAsync()
            }}
          >
            <CameraGrayIcon width={20} height={18} />
            <ButtonText>Camera</ButtonText>
          </Button>

          <Button
            onPress={() => {
              pickImageFromGalery()
            }}
          >
            <GaleryBlackIcon width={17} height={17} />
            <ButtonText>Gallery</ButtonText>
          </Button>

          <Button
            onPress={() => {
              setAttachedFile()
            }}
          >
            <CloudBlackIcon width={19} height={19} />

            <ButtonText>Files</ButtonText>
          </Button>
        </ButtonsBlock>
      </AttachContainer>
    </Animated.View>
  )
})

export default ChatAttachment
