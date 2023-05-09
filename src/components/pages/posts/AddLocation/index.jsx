import images from "@/pages/Community/images"
import { observable, runInAction } from "mobx"
import { observer } from "mobx-react-lite"
import React, { useEffect, useRef, useState } from "react"
import { KeyboardAvoidingView, Modal, Platform, Text } from "react-native"
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
import styles from "./style"
import GlobalState from "@/stores/GlobalState"
import { EditInfoData } from "../EditForm"

const { CloseIcon, Search } = images

const {
  Container,
  ContainerTop,
  Title,
  ScrollArea,
  SearchBlock,
  SearchInput,
  ClearText,
  SearchTitle,
  LocationItem,
  LocationItemTitle,
  LocationItemText,
  Finder,
} = styles

export const LocationPop = observable({
  isshow: false,
})

const AddLocation = () => {
  const [locations, setLocations] = useState(null)
  const [search, setSearch] = useState("")
  const sheetRef = useRef(null)

  const FinderText = ({ text, input }) => {
    const smallText = text.toLocaleLowerCase()
    let startIndex = smallText.indexOf(input.toLowerCase())
    let endIndex = input.length + startIndex
    if (startIndex != -1 && input.length) {
      const subText = text.slice(startIndex, endIndex)
      if (startIndex) {
        let txBefore = text.slice(0, startIndex)
        let txAfter = text.slice(endIndex)

        return (
          <>
            {txBefore}
            <Finder>{subText}</Finder>
            {txAfter}
          </>
        )
      } else {
        let txAfter = text.slice(endIndex)
        return (
          <>
            <Finder>{subText}</Finder>
            {txAfter}
          </>
        )
      }
    }
    return <>{text}</>
  }

  useEffect(() => {
    if (!search.length) {
      setLocations(GlobalState.locations)
    } else {
      const res = GlobalState.locations.filter((l) =>
        l.place
          .toLocaleLowerCase()
          .trim()
          .includes(search.toLocaleLowerCase().trim()),
      )
      setLocations(res)
    }
  }, [search, GlobalState.locations])

  if (!GlobalState.locations) return <></>

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <Modal
        animationType="slide"
        ref={sheetRef}
        visible={LocationPop.isshow}
        transparent={true}
        onRequestClose={() => {
          runInAction(() => {
            LocationPop.isshow = false
          })
        }}
      >
        <Container>
          <ContainerTop>
            <Title>Add Location</Title>
            <CloseIcon
              width={24}
              height={24}
              onPress={() => {
                runInAction(() => {
                  LocationPop.isshow = false
                })
              }}
            />
          </ContainerTop>
          <SearchBlock>
            <Search
              style={{
                marginRight: 6,
              }}
            />
            <SearchInput value={search} onChangeText={setSearch} autoFocus />
            {search.length ? (
              <ClearText
                onPress={() => {
                  setSearch("")
                }}
              >
                Clear
              </ClearText>
            ) : (
              <></>
            )}
          </SearchBlock>
          <ScrollArea
            containerStyle={{
              paddingBottom: 28,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <SearchTitle>Searching results</SearchTitle>
            {locations &&
              locations?.map((lo, i) => (
                <LocationItem
                  isLast={locations.length == i + 1}
                  key={i}
                  activeOpacity={0.8}
                  onPress={() => {
                    runInAction(() => {
                      EditInfoData.dt.location = lo
                      LocationPop.isshow = false
                    })
                  }}
                >
                  <LocationItemTitle>
                    <FinderText text={lo.place} input={search} />
                  </LocationItemTitle>
                  <LocationItemText>
                    {lo.city}
                    {lo.city.length ? ", " : ""}
                    {lo.country}
                  </LocationItemText>
                </LocationItem>
              ))}
          </ScrollArea>
        </Container>
      </Modal>
    </KeyboardAvoidingView>
  )
}

export default observer(AddLocation)
