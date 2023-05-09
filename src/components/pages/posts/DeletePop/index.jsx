import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import React, { useEffect, useState } from "react"
import ModalState from "@/stores/CommunityState"
import styles from "./style"
import { runInAction } from "mobx"
import { Modal } from "react-native"
import { observer } from "mobx-react-lite"
import { deletePost } from "@/stores/PostModel"
import { InfoPopState } from "@/pages/EditScreen"

const {
  TouchArea,
  Container,
  ContainerTitle,
  Text,
  Button,
  ButtonText,
} = styles

const DeletePop = () => {
  const { windowHeight, windowWidth } = getWindowDimension()
  const [previous, setPrevious] = useState(0)

  const [state, setState] = useState(ModalState.delopen)

  const del = () => {
    deletePost(ModalState.idpost).then(() => {
      runInAction(() => {
        InfoPopState.isshow = true
        InfoPopState.isdel = true
      })
      setState(false)
    })
  }

  useEffect(() => {
    if (!state) {
      runInAction(() => {
        ModalState.delopen = state
      })
    }
  }, [state])

  useEffect(() => {
    setState(ModalState.delopen)
  }, [ModalState.delopen])

  return (
    <TouchArea
      active={state}
      height={windowHeight + "px"}
      onPress={({ nativeEvent }) => {
        if (nativeEvent) {
          if (nativeEvent.locationY > previous) {
            setState(false)
          } else setPrevious(nativeEvent.locationY)
        }
      }}
    >
      <Container width={windowWidth - 32}>
        <ContainerTitle>Delete post?</ContainerTitle>
        <Text>
          This post will be removed from your feed, are you sure you want it
          removed?
        </Text>
        <Button BorderColor={"#FC4529"} background="#ffffff" onPress={del}>
          <ButtonText color="#FC4529">Delete</ButtonText>
        </Button>
        <Button
          BorderColor={"#0C0C0E"}
          background="#0C0C0E"
          style={{
            marginTop: 12,
          }}
          onPress={() => {
            setState(false)
          }}
        >
          <ButtonText color="#ffffff">Cancel</ButtonText>
        </Button>
      </Container>
    </TouchArea>
  )
}

export default observer(DeletePop)
