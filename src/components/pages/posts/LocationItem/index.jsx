import { observer } from "mobx-react-lite"
import images from "@/pages/Community/images"
import React from "react"
import styles from "./style"
import { useNavigation } from "@react-navigation/native"

const { LocIcon, ArrowRight } = images
const { Block, BlockImg, BlockCol, BlockTitle, BlockText } = styles
const LocationItem = ({ item }) => {
  const navigate = useNavigation()
  return (
    <Block
      onPress={() => {
        navigate.navigate("CommunityStack", {
          screen: `CommunityResultScreen`,
          params: {
            title: item.city,
            subtitle: item.place,
            iscat: false,
          },
        })
      }}
    >
      <BlockImg>
        <LocIcon />
      </BlockImg>
      <BlockCol>
        <BlockTitle>
          {item.city}
          {item.country.length ? ", " : ""}
          {item.country}
        </BlockTitle>
        {item.place.length ? <BlockText>{item.place}</BlockText> : <></>}
      </BlockCol>
      <ArrowRight />
    </Block>
  )
}

export default observer(LocationItem)
