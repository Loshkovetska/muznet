import React, { useEffect, useRef, useState } from "react"
import images from "./images"
import styles from "./styles"
import { observer } from "mobx-react-lite"
import { runInAction } from "mobx"
import ModalState from "../../../../stores/CommunityState"
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
const {
  Container,
  SafeAreaView,
  ContainerTop,
  ContainerRow,
  ContainerFunc,
  ContainerFuncItem,
  ContainerFuncText,
} = styles

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"

import { ReportStateModal } from "../ReportModal"
import { HideState } from "../PostsList"
import { useNavigation } from "@react-navigation/native"
import { ShareModalState } from "../ShareModal"

const { ShareIcon, EyeIcon, Report, imgPost2 } = images
const MoreModal = () => {
  const navigator = useNavigation()
  const sheetRef = useRef(null)
  const [previous, setPrevious] = useState(0)
  const [state, setState] = useState(ModalState.isopen)
  const { windowHeight } = getWindowDimension()
  const report = () => {
    const id = ModalState.idpost

    runInAction(() => {
      ReportStateModal.isopen = true
      ModalState.isopen = false
    })
  }

  const hide = () => {
    const id = ModalState.idpost

    runInAction(() => {
      HideState.id = id
    })
    sheetRef.current && sheetRef.current.close()
  }

  const share = () => {
    // ShareModalState.ref && ShareModalState.ref.expand()
    runInAction(() => {
      ShareModalState.isopen = true
    })
    sheetRef.current && sheetRef.current.close()
  }

  useEffect(() => {
    if (!state) {
      runInAction(() => {
        ModalState.isopen = state
      })
      setPrevious(0)
    }
  }, [state])

  useEffect(() => {
    setState(ModalState.isopen)
  }, [ModalState.isopen])

  useEffect(() => {
    runInAction(() => {
      ModalState.ref1 = sheetRef.current
    })
  }, [])

  return (
    <SafeAreaView
      activeOpacity={1}
      active={state}
      height={windowHeight + "px"}
      onPress={({ nativeEvent }) => {
        if (nativeEvent) {
          if (nativeEvent.locationY > previous) {
            if (state) {
              sheetRef.current && sheetRef.current.close()
            }
          } else {
            if (state) {
              setPrevious(nativeEvent.locationY)
            }
          }
        }
      }}
    >
      <BottomSheet
        ref={sheetRef}
        snapPoints={["20%", "10%", "20%"]}
        enablePanDownToClose
        onClose={() => {
          if (state) {
            setState(false)
          }
        }}
      >
        <BottomSheetView>
          <Container>
            <ContainerRow>
              <ContainerFunc>
                <ContainerFuncItem
                  activeOpacity={0.8}
                  onPress={report}
                  margin={"17px"}
                >
                  <Report />
                  <ContainerFuncText color={"#FC4529"}>
                    Report
                  </ContainerFuncText>
                </ContainerFuncItem>
                <ContainerFuncItem
                  activeOpacity={0.8}
                  onPress={hide}
                  margin={"17px"}
                >
                  <EyeIcon />
                  <ContainerFuncText color={"#141517"}>Hide</ContainerFuncText>
                </ContainerFuncItem>
                <ContainerFuncItem
                  activeOpacity={0.8}
                  onPress={share}
                  margin={"0px"}
                >
                  <ShareIcon />
                  <ContainerFuncText color={"#141517"}>Share</ContainerFuncText>
                </ContainerFuncItem>
              </ContainerFunc>
            </ContainerRow>
          </Container>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default observer(MoreModal)
