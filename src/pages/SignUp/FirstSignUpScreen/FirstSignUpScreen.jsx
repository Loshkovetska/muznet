import React from 'react'
import { StatusBar, Dimensions, Text, Platform } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
// import { useState } from "react";
import {
  useNavigation,
  // , useRoute
} from '@react-navigation/native'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { ResponseType } from 'expo-auth-session'

import C from '@/res/colors'
import { S } from '@/res/strings'

// Images
import IMAGES from '@/res/images'

import { AsyncStorage } from '@react-native-async-storage/async-storage'
import * as WebBrowser from 'expo-web-browser'
import * as AppleAuthentication from 'expo-apple-authentication'

const {
  PlainLogo,
  ShowPassIcon,
  ShowPassActiveIcon,
  ErrorIcon,
  FacebookIcon,
  GoogleIcon,
  PhoneIcon,
} = IMAGES
// Styles
import { style } from './style'
import domain from '@/res/domain'
import {
  FaceBookLogin,
  GoogleLogin,
  UserNameState,
} from '../../Login/WelcomeBackScreen/WelcomeBackScreen'
import { UserData } from '../VerifyScreen/VerifyScreen'
import { observable, runInAction } from 'mobx'
import PrivacyPop from '../../../components/PrivacyPop'
import { observer } from 'mobx-react-lite'
const {
  Container,
  Content,
  ContentTitle,
  // Form
  FormBlock,
  FormInputBlock,
  FormInputContainer,
  FormInputLabel,
  FormInput,
  ButtonSubmit,
  ButtonSubmitText,
  ShowPasswordIconButton,
  Link,
  LinkText,
  ErrorMessage,
  OrBlock,
  OrBorder,
  OrText,
  // Buttons
  ButtonsBlock,
  Button,
  ButtonIconBlock,
  ButtonText,
  ContentBlock,
  ContentBlockRow,
  ContainerText,
  ContainerLink,
  ContainerLinkText,
  AgreementText,
  AgreementBlock,
} = style

WebBrowser.maybeCompleteAuthSession()

export const ConfirmPrivacy = observable({
  isRead: false,
})

export async function getUsers(email, password) {
  return await axios
    .post(`${domain}signin`, {
      email,
      password,
    })
    .catch((e) => console.log(e))
  // if (user.data == 1) {
  //   await AsyncStorage.setItem(
  //     "@user",
  //     JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   )
  // }
}

const WelcomeBackScreen = () => {
  const navigation = useNavigation()
  const [isOpen, setOpen] = useState(false)

  // useEffect(() => {
  //   setOpen(!ConfirmPrivacy.isRead)
  // }, [ConfirmPrivacy.isRead])

  const {
    control,
    handleSubmit,
    resetField,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: { userEmail: '', password: '' },
  })

  const isKeyboardOpen = isKeyboardShown()
  const { windowHeight, windowWidth } = getWindowDimension()

  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const [inputEmailLabel, setInputEmailLabel] = useState(false)

  const [inputFocus2, setInputFocus2] = useState(C.lightGray)
  const [inputPasswordLabel, setInputPasswordLabel] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)

  useEffect(() => {
    if (dirtyFields.userEmail === undefined) {
      setInputEmailLabel(false)
    }
    if (dirtyFields.userEmail === true) {
      setInputEmailLabel(true)
    }
    if (dirtyFields.password === undefined) {
      setInputPasswordLabel(false)
    }
    if (dirtyFields.password === true) {
      setInputPasswordLabel(true)
    }
  }, [dirtyFields.userEmail, dirtyFields.password])

  const onSubmit = (data) => {
    if (!ConfirmPrivacy.isRead) {
      setOpen(true)
      return
    }
    getUsers(data.userEmail, data.password).then((res) => {
      if (res.data == 1) {
        resetField('userEmail')
        resetField('password')
        navigation.navigate('VerifyScreen', {
          screenTitle: 'Verify your email',
          screenAdvice: `Please enter the verification code we sent to ${data.userEmail}`,
          whereToSendCode: data,
          navigateToStackAfterSubmit: 'SignUpStack',
          navigateToScreenAfterSubmit: 'AddProfileInfo',
        })
      } else {
        resetField('userEmail')
        resetField('password')
        navigation.navigate('LoginStack', {
          screen: 'WelcomeBackScreen',
        })
      }
    })
  }

  const [userInfo, setInfo] = useState(null)

  useEffect(() => {
    if (userInfo) {
      const login = async (userInfo) => {
        await axios
          .post(`${domain}signin`, {
            email: userInfo.email,
            password: '1',
          })
          .then(async (res) => {
            const { data } = res
            if (data) {
              if (data.type?.length) {
                await AsyncStorage.setItem('@user', JSON.stringify(res.data))
                resetField('userEmail')
                resetField('password')
                navigation.navigate(`${data.type}Stack`, {
                  screen: `${data.type}WelcomeScreen`,
                })
              } else {
                navigation.navigate('SignUpStack', {
                  screen: 'AddProfileInfo',
                  // params: {
                  //   screenTitle: 'Verify your email',
                  //   screenAdvice: `Please enter the verification code we sent to ${userInfo.email}`,
                  //   whereToSendCode: {
                  //     userEmail: userInfo.email,
                  //   },
                  //   navigateToStackAfterSubmit: 'SignUpStack',
                  //   navigateToScreenAfterSubmit: 'AddProfileInfo',
                  // },
                })

                runInAction(() => {
                  UserData.email = userInfo.email
                  UserData.password = ' '
                })
              }
            } else {
              navigation.navigate('SignUpStack', {
                screen: 'AddProfileInfo',
                // params: {
                //   screenTitle: 'Verify your email',
                //   screenAdvice: `Please enter the verification code we sent to ${userInfo.email}`,
                //   whereToSendCode: {
                //     userEmail: userInfo.email,
                //   },
                //   navigateToStackAfterSubmit: 'SignUpStack',
                //   navigateToScreenAfterSubmit: 'AddProfileInfo',
                // },
              })

              runInAction(() => {
                UserData.email = userInfo.email
                UserData.password = ' '
              })
            }
          })
          .catch((e) => {
            console.log('login error', e)
          })
      }
      login(userInfo)
    }
  }, [userInfo])

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />

      {/* Image */}
      <Container
        style={{
          height: windowHeight,
        }}
      >
        <Content
          style={{
           // height: windowHeight - 60,
          }}
        >
          <PlainLogo width={101} height={35} resizeMode="cover" />

          <ContentTitle>Join MuzNet!</ContentTitle>

          {/* Form */}
          <FormBlock>
            {/* Email or Name */}
            <Controller
              control={control}
              rules={{
                required: S.emailNotValid,
                pattern: S.emailValidationPattern,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputBlock
                  style={{
                    marginBottom: errors.userEmail ? 32 : 13,
                  }}
                >
                  <FormInputContainer>
                    <FormInput
                      inputLabel={inputEmailLabel}
                      selectionColor={C.lightGray}
                      placeholder={'Enter your email'}
                      cursorColor={C.inputCursor}
                      onFocus={() => {
                        setInputFocus1(C.black)
                      }}
                      onBlur={() => {
                        onBlur
                        setInputFocus1(C.lightGray)
                      }}
                      onChangeText={onChange}
                      value={value}
                      style={{
                        borderColor: errors.userEmail ? C.red : inputFocus1,
                        borderWidth: errors.userEmail ? 2 : 1,
                        color: errors.userEmail ? C.red : C.black,
                      }}
                    />
                    {errors.userEmail && (
                      <ShowPasswordIconButton>
                        <ErrorIcon width={20} height={20} />
                      </ShowPasswordIconButton>
                    )}
                  </FormInputContainer>

                  <FormInputLabel
                    isError={errors.userEmail}
                    inputLabel={inputEmailLabel}
                  >
                    Your email
                  </FormInputLabel>

                  {errors.userEmail?.type === 'minLength' && (
                    <ErrorMessage>{S.emailNotValid}</ErrorMessage>
                  )}
                  {errors.userEmail?.type === 'pattern' && (
                    <ErrorMessage>{S.emailNotValid}</ErrorMessage>
                  )}
                  {errors.userEmail && (
                    <ErrorMessage>{errors.userEmail.message}</ErrorMessage>
                  )}
                </FormInputBlock>
              )}
              name="userEmail"
            />

            {/* Password */}
            <Controller
              control={control}
              rules={{
                required: S.passwordNotValid,
                minLength: 8,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputBlock
                  style={{
                    marginBottom: errors.password ? 32 : 13,
                  }}
                >
                  <FormInputContainer>
                    <FormInput
                      isPassword={true}
                      inputLabel={inputPasswordLabel}
                      secureTextEntry={!passwordShown ? true : false}
                      selectionColor={C.lightGray}
                      placeholder={'Enter your password'}
                      cursorColor={C.inputCursor}
                      onFocus={() => setInputFocus2(C.black)}
                      onBlur={() => {
                        onBlur
                        setInputFocus2(C.lightGray)
                      }}
                      onChangeText={onChange}
                      value={value}
                      style={{
                        borderColor: errors.password ? C.red : inputFocus2,
                        borderWidth: errors.password ? 2 : 1,
                        color: errors.password ? C.red : C.black,
                      }}
                    />
                    <ShowPasswordIconButton
                      onPress={() => setPasswordShown(!passwordShown)}
                    >
                      {!passwordShown ? (
                        <ShowPassIcon width={18} height={18} />
                      ) : (
                        <ShowPassActiveIcon width={18} height={18} />
                      )}
                    </ShowPasswordIconButton>
                  </FormInputContainer>
                  <FormInputLabel
                    isError={errors.password}
                    inputLabel={inputPasswordLabel}
                  >
                    Password
                  </FormInputLabel>

                  {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <ErrorMessage>{S.passwordMinimum}</ErrorMessage>
                  )}
                </FormInputBlock>
              )}
              name="password"
            />
          </FormBlock>

          <ButtonSubmit
            isKeyboardOpen={isKeyboardOpen}
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonSubmitText>Sign Up</ButtonSubmitText>
          </ButtonSubmit>

          <OrBlock>
            <OrBorder></OrBorder>
            <OrText>OR</OrText>
            <OrBorder></OrBorder>
          </OrBlock>

          <ButtonsBlock>
            <GoogleLogin setInfo={setInfo} />
            <FaceBookLogin setInfo={setInfo} />
            {Platform.OS == 'ios' && (
              <Button>
                <ButtonIconBlock>
                  <AppleAuthentication.AppleAuthenticationButton
                    buttonType={
                      AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
                    }
                    buttonStyle={
                      AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                    }
                    cornerRadius={5}
                    style={{
                      width: 60,
                      height: 60,
                    }}
                    onPress={async () => {
                      try {
                        const credential = await AppleAuthentication.signInAsync(
                          {
                            requestedScopes: [
                              AppleAuthentication.AppleAuthenticationScope
                                .FULL_NAME,
                              AppleAuthentication.AppleAuthenticationScope
                                .EMAIL,
                            ],
                          },
                        )
                        if (credential) {
                          runInAction(() => {
                            UserNameState.lname =
                              credential?.fullName?.familyName
                            UserNameState.fname =
                              credential?.fullName?.givenName

                            UserNameState.username =
                              credential?.fullName?.givenName
                            UserNameState.loginByApple = true
                          })
                          setInfo({
                            email: credential.email,
                            password: ' ',
                          })
                        }

                        // signed in
                      } catch (e) {
                        if (e.code === 'ERR_REQUEST_CANCELED') {
                          // handle that the user canceled the sign-in flow
                        } else {
                          // handle other errors
                        }
                      }
                    }}
                  />
                </ButtonIconBlock>
                <ButtonText>Apple</ButtonText>
              </Button>
            )}
            <Button
              onPress={() => {
                navigation.navigate('SignUpScreen')
              }}
            >
              <ButtonIconBlock>
                <PhoneIcon width={20} height={20} />
              </ButtonIconBlock>

              <ButtonText>Phone</ButtonText>
            </Button>
          </ButtonsBlock>

          <ContentBlock>
            <ContentBlockRow>
              <ContainerText>Already have an account?</ContainerText>
              <ContainerLink
                onPress={() => {
                  navigation.navigate('LoginStack', {
                    screen: 'WelcomeBackScreen',
                  })
                }}
              >
                <ContainerLinkText>Log In</ContainerLinkText>
              </ContainerLink>
            </ContentBlockRow>

            <AgreementBlock>
              <AgreementText>
                By signing up, you agree to our Terms of Service and acknowledge
                that our Privacy Policy applies to you
              </AgreementText>
            </AgreementBlock>
          </ContentBlock>
        </Content>
      </Container>
      <PrivacyPop isOpen={isOpen} setOpen={setOpen} />
    </>
  )
}

export default observer(WelcomeBackScreen)
