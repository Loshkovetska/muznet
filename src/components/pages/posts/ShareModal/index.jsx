import { observable, runInAction } from "mobx"
import { observer } from "mobx-react-lite"
import React, { useEffect, useRef, useState } from "react"
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet"
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import styles from "./style"
import PostModel from "@/stores/PostModel"
import ModalState from "@/stores/CommunityState"
import { InfoPopState } from "@/pages/EditScreen"
import { Share } from "react-native"
import * as Clipboard from "expo-clipboard"
import { useNavigation } from "@react-navigation/native"
import { UserType } from "@/stores/UserModel"
import AccountStore from "../../../../stores/AccountStore"

export const ShareModalState = observable({
  isopen: false,
  ref: null,
})

const {
  Container,
  SafeAreaView,
  ContainerTop,
  ContainerRow,
  ContainerFunc,
  ContainerFuncItem,
  ContainerFuncText,
} = styles

const ShareModal = () => {
  const navigation = useNavigation()
  const sheetRef = useRef(null)
  const [previous, setPrevious] = useState(0)
  const [state, setState] = useState(ShareModalState.isopen)
  const { windowHeight } = getWindowDimension()

  useEffect(() => {
    if (!state) {
      runInAction(() => {
        ShareModalState.isopen = state
      })
      setPrevious(0)
    } else {
      sheetRef.current && sheetRef.current.expand()
    }
  }, [state])

  useEffect(() => {
    setState(ShareModalState.isopen)
  }, [ShareModalState.isopen])

  useEffect(() => {
    runInAction(() => {
      ShareModalState.ref = sheetRef.current
    })
  }, [])

  const sendMessage = () => {
    const post = PostModel.posts.find((p) => p.id == ModalState.idpost)
    if (!post) return
    sheetRef.current && sheetRef.current.close()

    navigation.navigate(`${AccountStore.account.userType}Stack`, {
      screen: `${AccountStore.account.userType}ChatScreen`,
      params: {
        chatUserId: post.author.id,
      },
    })
  }

  const copyLink = async () => {

    const post = PostModel.posts.find((p) => p.id == ModalState.idpost)
    if (!post) return
    sheetRef.current && sheetRef.current.close()

    await Clipboard.setStringAsync(`muznet/id?=${post.id}`).then(() => {
      setTimeout(() => {
        runInAction(() => {
          InfoPopState.iscopy = true
          InfoPopState.isshow = true
        })
      }, 1000)
    })
  }

  const more = async () => {
    const post = PostModel.posts.find((p) => p.id == ModalState.idpost)
    if (!post) return
    try {
      sheetRef.current && sheetRef.current.close()

      const result = await Share.share({
        message: `Muznet | Community:Post ${post.title} muznet/id?=${post.id}`,
        url: post.media.length ? post.media[0] : imgPost2,
        title: "Muznet | Community",
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          if (result.activityType.toLocaleLowerCase().includes("copy")) {
            runInAction(() => {
              InfoPopState.iscopy = true
              InfoPopState.isshow = true
            })
          }
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const tabs = [
    {
      title: "Send Direct Message",
      action: sendMessage,
      color: "#141517",
    },
    {
      title: "Copy Link",
      action: copyLink,
      color: "#141517",
    },
    {
      title: "More",
      action: more,
      color: "#141517",
    },
  ]

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
        snapPoints={["28%", "15%", "28%"]}
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
                {tabs.map((t, i) => (
                  <ContainerFuncItem
                    activeOpacity={0.6}
                    key={i}
                    onPress={t.action}
                    border={i + 1 == tabs.length ? "0px" : "1px"}
                  >
                    <ContainerFuncText color={t.color}>
                      {t.title}
                    </ContainerFuncText>
                  </ContainerFuncItem>
                ))}
              </ContainerFunc>
            </ContainerRow>
          </Container>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default observer(ShareModal)
