import React from 'react'
import { StatusBar } from 'react-native'
import { useState, useEffect } from 'react'

// import { useState } from "react";
import { useNavigation } from '@react-navigation/native'
// Helpers
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
// Components
import AccountIntroScreen from '@/components/AccountIntroScreen'
import TapbarMenu from '@/components/Buttons/TapbarMenu'

// Styles
import styled from 'styled-components/native'
import C from '@/res/colors'

const Container = styled.View`
  height: 100%;
  /* width: 100%; */
  background-color: ${C.white};
`
const Content = styled.ScrollView`
  /* padding: 0px 20px; */
  width: 100%;
`

const MusicianAccountScreen = () => {
  const navigation = useNavigation()
  const isKeyboardOpen = isKeyboardShown()

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />

      {/* Image */}
      <Container isKeyboardOpen={isKeyboardOpen}>
        <AccountIntroScreen
          myDealsScreenName={'MusicianMyDealsScreen'}
          stackName={'MusicianStack'}
          isContractor={false}
        />
        <TapbarMenu />
      </Container>
    </>
  )
}

export default MusicianAccountScreen
