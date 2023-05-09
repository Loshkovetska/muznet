import React from 'react'
import { StatusBar } from 'react-native'

// Helpers
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
// Components
import MainScreen from '@/components/MainScreen'
import TapbarMenu from '@/components/Buttons/TapbarMenu'

// Styles
import styled from 'styled-components/native'
import C from '@/res/colors'

const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${C.white};
  padding-bottom: ${(props) =>
    props.isKeyboardOpen === true ? 60 + 'px' : 82 + 'px'};
`
const Content = styled.View`
  padding: 0px 20px;
  width: 100%;
  height: 100%;
`

const MusicianWelcomeScreen = () => {
  const isKeyboardOpen = isKeyboardShown()

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />

      {/* Image */}
      <Container isKeyboardOpen={isKeyboardOpen}>
        <Content>
          <MainScreen
            stackName={'MusicianStack'}
            screenListName={'MusicianListSearchScreen'}
            screenMapName={'MusicianMapSearchScreen'}
            screenTitle={'Popular vendors'}
          />
        </Content>
        <TapbarMenu />
      </Container>
    </>
  )
}

export default MusicianWelcomeScreen
