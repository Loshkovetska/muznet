import React from 'react'
import { Image, Keyboard, Text } from 'react-native'
import { useEffect } from 'react'

import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useNavigation } from '@react-navigation/native'

// Images
import IMAGES from '@/res/images'
const { CrossBlackIcon } = IMAGES
// Styles
import { style } from '../../components/AfterSubmitWindow/style'
const {
  ModalWindowContainer,
  ModalWindowBlock,
  ModalIcon,
  ModalImage,
  ModalTitle,
  ModalAdvice,
  ButtonBlock,
  ContentBlockRow,
  ContainerText,
  ContainerLink,
  ContainerLinkText,
} = style

import { M } from '@/res/mixin'
import { runInAction } from 'mobx'
import { ConfirmPrivacy } from '../../pages/SignUp/FirstSignUpScreen/FirstSignUpScreen'
const { BlackBtn, BlackBtnText } = M
const PrivacyPop = ({
  isOpen,
  setOpen,
  windowImage,
  isPromoteBigImage,
  title,
}) => {
  const navigation = useNavigation()
  const { windowHeight, windowWidth } = getWindowDimension()

  const BlackButton = () => {
    return (
      <BlackBtn
        style={{
          marginTop: 32,
        }}
        onPress={() => {
          runInAction(() => {
            ConfirmPrivacy.isRead = true
          })
          setOpen(false)
        }}
      >
        <BlackBtnText>Confirm</BlackBtnText>
      </BlackBtn>
    )
  }

  return (
    isOpen === true && (
      <ModalWindowContainer
        style={{
          zIndex: 2000,
          width: windowWidth,
          height: windowHeight,
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <ModalWindowBlock
          style={{
            width: '100%',
            padding: 24,
            minHeight: 200,
            display: 'flex',
          }}
        >
          <ContentBlockRow
            style={{
              marginTop: 0,
            }}
          >
            <ContainerText>
              <Text>
                By signing up, you agree to our
                <ContainerLink
                  onPress={() => {
                    navigation.navigate('SignUpStack', {
                      screen: 'TermsScreen',
                    })
                    runInAction(() => {
                      ConfirmPrivacy.isRead = true
                    })
                    setOpen(false)
                  }}
                >
                  <ContainerLinkText>Terms of Service</ContainerLinkText>
                </ContainerLink>{' '}
                and acknowledge that our
                <ContainerLink
                  onPress={() => {
                    navigation.navigate('SignUpStack', {
                      screen: 'PrivacyScreen',
                    })
                    runInAction(() => {
                      ConfirmPrivacy.isRead = true
                    })
                    setOpen(false)
                  }}
                >
                  <ContainerLinkText>Privacy Policy</ContainerLinkText>
                </ContainerLink>{' '}
                applies to you
              </Text>
            </ContainerText>
          </ContentBlockRow>
          <ButtonBlock>
            <BlackButton />
          </ButtonBlock>
        </ModalWindowBlock>

        {/* Button */}
      </ModalWindowContainer>
    )
  )
}

export default PrivacyPop
