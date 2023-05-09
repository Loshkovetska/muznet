import React from 'react'
import { StatusBar } from 'react-native'

import { useState, useEffect } from 'react'

import GoBack from '@/components/Buttons/GoBack/GoBack'
import ModalWindow from '@/components/ModalWindow'
import VerifyCodeInputs from '@/components/VerifyCodeInputs'

import { useNavigation, useRoute } from '@react-navigation/native'
// Images
import IMAGES from '@/res/images'
const { ModalWrongIcon } = IMAGES
// Styles
import { style } from './style'
import { getUsers } from '../FirstSignUpScreen/FirstSignUpScreen'
import { observable, runInAction } from 'mobx'

export const UserData = observable({
  email: '',
  password: '',
})

const {
  Container,
  ContentTitle,
  Header,
  FormBlock,
  FormText,
  ContainerText,
  ContentBlock,
  ContainerLink,
  ContainerLinkText,
} = style

const VerifyScreen = () => {
  const navigation = useNavigation()
  const verifyCode = '0000'

  const route = useRoute()
  const screenTitle = route !== undefined && route.params.screenTitle
  const screenAdvice = route !== undefined && route.params.screenAdvice
  const whereToSendCode = route !== undefined && route.params.whereToSendCode
  const navigateToStackAfterSubmit =
    route !== undefined && route.params.navigateToStackAfterSubmit
  const navigateToScreenAfterSubmit =
    route !== undefined && route.params.navigateToScreenAfterSubmit

  //
  const [isModalOpen, setModalOpen] = useState(false)
  // If wrong
  const [isVerifySuccess, setVerifySuccess] = useState()

  useEffect(() => {
    if (isVerifySuccess === true) {
      navigation.navigate(navigateToStackAfterSubmit, {
        screen: navigateToScreenAfterSubmit,
      })
      runInAction(() => {
        UserData.email = route.params.whereToSendCode.userEmail
        UserData.password = route.params.whereToSendCode.password
      })
      setVerifySuccess(false)
    }
  }, [isVerifySuccess])

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <Container>
        {isModalOpen === true && (
          <ModalWindow
            modalPic={<ModalWrongIcon width={80} height={80} />}
            title={'Oops!'}
            advice={'It looks like you put in the wrong code, try again'}
            setOpen={setModalOpen}
            btnText={'Try Again!'}
          />
        )}
        {/* Header */}
        <Header>
          <GoBack />

          <ContentTitle
            style={{
              paddingTop: 45,
            }}
          >
            {screenTitle}
          </ContentTitle>
        </Header>

        {/* Form */}
        <FormBlock>
          <FormText>{screenAdvice}</FormText>

          {/* Inputs validation */}
          <VerifyCodeInputs
            verifyCode={verifyCode}
            setVerifySuccess={setVerifySuccess}
            setModalOpen={setModalOpen}
          />
        </FormBlock>

        <ContentBlock>
          <ContainerText>Didn’t recieve the code?</ContainerText>
          <ContainerLink
            onPress={() => {
              getUsers(
                route.params.whereToSendCode.userEmail,
                route.params.whereToSendCode.password,
              )
            }}
          >
            <ContainerLinkText>Request again</ContainerLinkText>
          </ContainerLink>
          {/* <ContainerText>
                        Correct code 0000
                    </ContainerText> */}
        </ContentBlock>
      </Container>
    </>
  )
}

export default VerifyScreen
