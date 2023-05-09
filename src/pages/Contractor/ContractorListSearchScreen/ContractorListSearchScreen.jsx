import React from "react"
import { StatusBar } from "react-native"
import { useState, useEffect } from "react"

// import { useState } from "react";
import { useNavigation } from "@react-navigation/native"
// Helpers
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
// Components
import ListSearchScreen from "@/components/ListSearchScreen"
import TapbarMenu from "@/components/Buttons/TapbarMenu"
import SearchFilters from "@/components/SearchFilters"

// Styles
import styled from "styled-components/native"
import C from "@/res/colors"
const Block = styled.View`
  width: 100%;
`
const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${C.white};
  padding-bottom: ${(props) =>
    props.isKeyboardOpen === true ? 60 + "px" : 82 + "px"};
`
const Content = styled.ScrollView`
  width: 100%;
`

const ContractorListSearchScreen = () => {
  const navigation = useNavigation()
  const isKeyboardOpen = isKeyboardShown()


  return (
    <>
      <StatusBar
        barStyle={"dark-content"}
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <Block>
        {/* Image */}
        <Container isKeyboardOpen={isKeyboardOpen}>
          <Content>
            <ListSearchScreen
              stackName={"ContractorStack"}
              screenName={"MusicianCardScreen"}
            />
          </Content>

          <TapbarMenu />
        </Container>
        <SearchFilters isContractor={true} />
      </Block>
    </>
  )
}

export default ContractorListSearchScreen
