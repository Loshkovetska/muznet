import { observer } from "mobx-react-lite"
import React, { useEffect, useState, useRef } from "react"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { observable, runInAction } from "mobx"
import styles from "./style"
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { Image, KeyboardAvoidingView, Platform, View } from "react-native"
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
import { Keyboard } from "react-native"
import { reportPost } from "@/stores/PostModel"
import ModalState from "@/stores/CommunityState"
import images from "@/pages/Community/images"
import IMAGES from "@/res/images"

export const ReportStateModal = observable({
  isopen: false,
})

const { GifSuccessCheck } = IMAGES

const {
  SafeAreaView,
  Title,
  Container,
  SubText,
  TextInput,
  ContainerTop,
  Button,
  ButtonText,
} = styles

const ReportModal = () => {
  const [previous, setPrevious] = useState(0)
  const [showThanks, setThanks] = useState(false)
  const [state, setState] = useState(ReportStateModal.isopen)
  const { windowHeight } = getWindowDimension()

  const [isDisabled, setDisabled] = useState(true)
  const sheetRef = useRef(null)
  const [value, setValue] = useState("")
  useEffect(() => {
    setState(ReportStateModal.isopen)
  }, [ReportStateModal.isopen])

  useEffect(() => {
    if (!state) {
      runInAction(() => {
        ReportStateModal.isopen = state
      })
      setValue("")
      setPrevious(0)
    }
  }, [state])

  useEffect(() => {
    if (value.length) {
      setDisabled(false)
    } else setDisabled(true)
  }, [value])

  const report = () => {
    reportPost(ModalState.idpost, value).then(() => {
      setThanks(true)
      // sheetRef.current && sheetRef.current.close()
    })
  }

  return (
    <SafeAreaView
      activeOpacity={1}
      active={state}
      height={windowHeight + "px"}
      onPress={() => Keyboard.dismiss()}
    >
      <BottomSheet
        ref={sheetRef}
        snapPoints={
          isKeyboardShown() ? ["80%", "10%", "80%"] : ["50%", "10%", "50%"]
        }
        enablePanDownToClose
        onClose={() => {
          if (state) {
            setState(false)
            setThanks(false)
            setValue("")
          }
        }}
      >
        <BottomSheetView>
          {!showThanks ? (
            <Container>
              <ContainerTop>
                <Title>
                  Please indicate the reason why you reporting this post
                </Title>
                <SubText>This report is anonymous.</SubText>
                <TextInput
                  empty={!value.length}
                  multiline
                  placeholder="Write the reason here"
                  placeholderTextColor="#636364"
                  value={value}
                  onChangeText={setValue}
                />
              </ContainerTop>
              <Button
                isDisable={isDisabled}
                activeOpacity={isDisabled ? 1 : 0.6}
                onPress={report}
              >
                <ButtonText isDisable={isDisabled}>Submit</ButtonText>
              </Button>
            </Container>
          ) : (
            <Container>
              <ContainerTop>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    marginBottom: 16,
                  }}
                >
                  <Image
                    resizeMode="cover"
                    source={GifSuccessCheck}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View>

                <Title>Thanks for letting us know</Title>
                <SubText>Your feedback is important to us</SubText>
              </ContainerTop>
              <Button
                isDisable={false}
                activeOpacity={0.6}
                onPress={() => {
                  sheetRef.current && sheetRef.current.close()
                }}
              >
                <ButtonText isDisable={false}>Perfect!</ButtonText>
              </Button>
            </Container>
          )}
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default observer(ReportModal)
