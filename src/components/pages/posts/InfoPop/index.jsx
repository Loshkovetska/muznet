import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { runInAction } from "mobx"
import { observer } from "mobx-react-lite"
import { InfoPopState } from "@/pages/EditScreen"
import React, { useEffect, useState } from "react"
import { Modal } from "react-native"
import styles from "./style"

const { Container, Text } = styles
const InfoPop = ({ icon, text, color, bg }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setVisible(false)

      runInAction(() => {
        InfoPopState.isshow = false
      })
    }, 3000)
  }, [])

  const { windowWidth } = getWindowDimension()

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false)
      }}
    >
      <Container color={bg} width={windowWidth - 32}>
        {icon()}
        <Text color={color}>{text}</Text>
      </Container>
    </Modal>
  )
}

export default observer(InfoPop)
