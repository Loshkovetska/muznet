import React from 'react'
import { StatusBar, Dimensions, Platform } from 'react-native'
import { useState, useEffect } from 'react'

import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants'

import {
  useNavigation,
  // , useRoute
} from '@react-navigation/native'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'

import C from '@/res/colors'
import { S } from '@/res/strings'

// Images
import IMAGES from '@/res/images'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'

import * as Facebook from 'expo-auth-session/providers/facebook'
import * as WebBrowser from 'expo-web-browser'
import * as AppleAuthentication from 'expo-apple-authentication'

export const UserNameState = observable({
  username: '',
  loginByApple: false,
})

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
import axios from 'axios'
import domain from '@/res/domain'
import { getUsers } from '@/pages/SignUp/FirstSignUpScreen/FirstSignUpScreen'
import { ResponseType } from 'expo-auth-session'
import { Alert } from 'react-native'
import { observable, runInAction } from 'mobx'
import { UserData } from '../../SignUp/VerifyScreen/VerifyScreen'

WebBrowser.maybeCompleteAuthSession()

export const IOSId =
    '535704397355-c02gk3ip42ogq1op1avfvdt1r54npl0o.apps.googleusercontent.com',
  AndroidId =
    '535704397355-h5opmj8tvgs5na86v2ipjv91jb75c53a.apps.googleusercontent.com',
  EXPOId =
    '535704397355-g5ngonhnkdb5ui0nrkhb8ce93knrhs73.apps.googleusercontent.com'

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
  ContainerText,
  ContainerLink,
  ContainerLinkText,
} = style

const WelcomeBackScreen = () => {
  const navigation = useNavigation()

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

  const onSubmit = async (data) => {
    await axios
      .post(`${domain}login`, {
        email: data.userEmail,
        password: data.password,
      })
      .then(async (res) => {
        if (res.data) {
          await AsyncStorage.setItem('@user', JSON.stringify(res.data))
          resetField('userEmail')
          resetField('password')
          if (res.data.type.length) {
            navigation.navigate(`${res.data.type}Stack`, {
              screen: `${res.data.type}WelcomeScreen`,
            })
          } else {
            navigation.navigate('SignUpStack', {
              screen: 'VerifyScreen',
              params: {
                screenTitle: 'Verify your email',
                screenAdvice: `Please enter the verification code we sent to ${data.userEmail}`,
                whereToSendCode: {
                  userEmail: data.userEmail,
                },
                navigateToStackAfterSubmit: 'SignUpStack',
                navigateToScreenAfterSubmit: 'AddProfileInfo',
              },
            })
          }
        } else {
          Alert.alert('Something goes wrong', 'Password or email is incorrect.')
        }
      })
    return
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
                })

                runInAction(() => {
                  UserData.email = userInfo.email
                  UserData.password = ' '
                })
              }
            } else {
              navigation.navigate('SignUpStack', {
                screen: 'AddProfileInfo',
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
          style={
            {
              //  height: windowHeight - 60,
            }
          }
        >
          <PlainLogo width={101} height={35} resizeMode="cover" />

          <ContentTitle>Welcome Back!</ContentTitle>

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
                <FormInputBlock>
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
            <Link
              onPress={() =>
                navigation.navigate('LoginStack', {
                  screen: 'ForgetPasswordScreen',
                })
              }
              style={{
                marginTop: errors.password === undefined ? -12 : 5,
              }}
            >
              <LinkText>Forgot password?</LinkText>
            </Link>
          </FormBlock>

          <ButtonSubmit
            isKeyboardOpen={isKeyboardOpen}
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonSubmitText>Log in</ButtonSubmitText>
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
                navigation.navigate('LoginScreen')
              }}
            >
              <ButtonIconBlock>
                <PhoneIcon width={20} height={20} />
              </ButtonIconBlock>

              <ButtonText>Phone</ButtonText>
            </Button>
          </ButtonsBlock>

          <ContentBlock>
            <ContainerText>Don’t have an account?</ContainerText>
            <ContainerLink
              onPress={() => {
                navigation.navigate('SignUpStack', {
                  screen: 'FirstSignUpScreen',
                })
              }}
            >
              <ContainerLinkText>Sign Up</ContainerLinkText>
            </ContainerLink>
          </ContentBlock>
        </Content>
      </Container>
    </>
  )
}

export default WelcomeBackScreen

export const GoogleLogin = ({ setInfo }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: EXPOId,
    iosClientId: IOSId,
    androidClientId:
      '535704397355-r6gsu6l9a70qdqg159crc0q0ckq0dk35.apps.googleusercontent.com',
  })
  const getUserData = async (accessToken) => {
    try {
      await axios
        .get(
          `https://www.googleapis.com/userinfo/v2/me?access_token=${accessToken}`,
        )
        .then((res) => {
          setInfo(res?.data)
        })
        .catch((e) => console.log(e))
    } catch (e) {
      console.log('google data error', e)
    }
  }
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response
      if (authentication?.accessToken) {
        getUserData(authentication?.accessToken)
      }
    }
  }, [response])

  return (
    <>
      <Button
        onPress={() =>
          promptAsync({
            showInRecents: true,
            useProxy: true,
          })
        }
      >
        <ButtonIconBlock>
          <GoogleIcon width={20} height={20} />
        </ButtonIconBlock>
        <ButtonText>Google</ButtonText>
      </Button>
    </>
  )
}

export const FaceBookLogin = ({ setInfo }) => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '889533882178143',
    expoClientId: '889533882178143',
    androidClientId: '889533882178143',
    scopes: ['public_profile'],
    display: 'popup',
    redirectUri: 'https://auth.expo.io/@ana2611/muzNet',
    // redirectUri: AuthSession.makeRedirectUri({
    //   native: 'fb889533882178143://authorize',
    //   useProxy: true,
    // }),
    useProxy: true,
  })

  const getUserFBData = async (token) => {
    await axios
      .get(
        `https://graph.facebook.com/me?fields=first_name,last_name,email,picture.type(large)&access_token=${token}`,
      )
      .then((data) => {
        setInfo(data?.data)
      })
      .catch((e) => Alert.alert(e))
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { accessToken } = response?.authentication
      if (accessToken) {
        getUserFBData(accessToken)
      }
    }
  }, [response])

  if (Platform.OS == 'android') {
    return <></>
  }

  return (
    <>
      <Button onPress={() => promptAsync({ useProxy: false })}>
        <ButtonIconBlock>
          <FacebookIcon width={10} height={20} />
        </ButtonIconBlock>

        <ButtonText>Facebook</ButtonText>
      </Button>
    </>
  )
}
