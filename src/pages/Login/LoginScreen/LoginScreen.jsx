import React from 'react'
import { StatusBar } from 'react-native'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import C from '@/res/colors'
import F from '@/res/fonts'

import { S } from '@/res/strings'

import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'

import GoBack from '@/components/Buttons/GoBack/GoBack'
import MaskInput from 'react-native-mask-input'

import { useNavigation } from '@react-navigation/native'
// Images
import IMAGES from '@/res/images'
const { ShowPassIcon, ShowPassActiveIcon, ErrorIcon } = IMAGES
// Styles
import { style } from '../style'

const {
  Container,
  ContentTitle,
  Header,
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
} = style
import { M } from '@/res/mixin'
import domain, { twilioApi } from '@/res/domain'

import { loginByPhone } from '@/stores/AccountStore'
import axios from 'axios'
import DropFlagSelect from '../../SignUp/SignUpScreen/DropFlagSelect'
const { FormInputContainerPhone } = M
const LoginScreen = () => {
  const navigation = useNavigation()
  const {
    control,
    handleSubmit,
    resetField,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: { userPhoneNumber: '', password: '' },
  })

  const isKeyboardOpen = isKeyboardShown()

  const [phone, setPhone] = useState('')

  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const [inputPhoneLabel, setInputPhoneLabel] = useState(false)

  const [inputFocus2, setInputFocus2] = useState(C.lightGray)
  const [inputPasswordLabel, setInputPasswordLabel] = useState(false)

  const [passwordShown, setPasswordShown] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (dirtyFields.userPhoneNumber === undefined) {
      setInputPhoneLabel(false)
    }
    if (dirtyFields.userPhoneNumber === true) {
      setInputPhoneLabel(true)
    }
    if (dirtyFields.userPhoneNumber === undefined) {
      setInputPhoneLabel(false)
    }
    if (dirtyFields.userPhoneNumber === true) {
      setInputPhoneLabel(true)
    }
    if (dirtyFields.password === undefined) {
      setInputPasswordLabel(false)
    }
    if (dirtyFields.password === true) {
      setInputPasswordLabel(true)
    }
  }, [dirtyFields.userPhoneNumber, dirtyFields.password])

  const [flagType, setPositionType] = useState({
    icon: '',
    phonePattern: [],
  })
  useEffect(() => {
    if (flagType) {
      setPhone('')
    }
  }, [flagType])
  const onFlagSelect = (value) => () => {
    setPositionType(value)
    setIsOpen(false)
  }
  const toggling = (state) => setIsOpen(state)

  const onSubmit = async (data) => {
    loginByPhone({
      phone: data.userPhoneNumber,
      password: data.password,
    }).then((res) => {
      if (res.data) {
        let stackTitle = 'SignUpStack',
          screenTitle = 'AddProfileInfo'
        if (res.data.type.length) {
          stackTitle = `${res.data.type}Stack`
          screenTitle = `${res.data.type}WelcomeScreen`
        }
        axios
          .get(
            `${twilioApi}?code=${res.data.code}&phone=${data.userPhoneNumber}`,
          )
          .then((r) => {
            resetField('password')
            setPhone('')
            resetField('userPhoneNumber')
            navigation.navigate('SignUpStack', {
              screen: 'VerifyScreen',
              params: {
                screenTitle: 'Verify your phone',
                screenAdvice: `Please enter the verification code we sent to ${data.userPhoneNumber}`,
                whereToSendCode: data.userPhoneNumber,
                phone: data.userPhoneNumber,
                navigateToStackAfterSubmit: stackTitle,
                navigateToScreenAfterSubmit: screenTitle,
              },
            })
          })
          .catch((c) => console.log(c))
      }

      // if (res.data) {
      //   resetField('password')
      //   setPhone('')
      //   resetField('userPhoneNumber')
      //   navigation.navigate('VerifyScreen', {
      //     screenTitle: 'Verify your phone',
      //     screenAdvice: `Please enter the verification code we sent to ${data.userPhoneNumber}`,
      //     whereToSendCode: data.userPhoneNumber,
      //     phone: data.userPhoneNumber,
      //     navigateToStackAfterSubmit: 'SignUpStack',
      //     navigateToScreenAfterSubmit: 'AddProfileInfo',
      //   })
      // } else {
      //   navigation.navigate('SignUpStack', {
      //     screen: 'FirstSignUpScreen',
      //   })
      // }
    })
  }
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />

      <Container>
        {/* Header */}
        <Header>
          <GoBack />

          <ContentTitle
            style={{
              paddingTop: 31,
            }}
          >
            Log in
          </ContentTitle>
        </Header>

        {/* Form */}
        <FormBlock>
          {/* Phone number */}
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 12,
            }}
            render={({ field: { onChange, onBlur } }) => (
              <FormInputBlock
                style={{
                  marginBottom: errors.userPhoneNumber ? 32 : 13,
                  zIndex: isOpen ? 1111 : 0,
                }}
              >
                <FormInputContainerPhone>
                  <DropFlagSelect
                    inputFocus1={inputFocus1}
                    isError={errors.userPhoneNumber}
                    selectedValue={flagType}
                    toggling={toggling}
                    isOpen={isOpen}
                    onSelect={onFlagSelect}
                  />
                  <MaskInput
                    cursorColor={C.inputCursor}
                    onFocus={() => {
                      setInputFocus1(C.black)
                    }}
                    onBlur={() => {
                      onBlur
                      setInputFocus1(C.lightGray)
                    }}
                    keyboardType="phone-pad"
                    maxLength={20}
                    style={{
                      width: '100%',
                      flex: 1,
                      height: 48,
                      paddingLeft: 16,
                      borderRadius: 6,
                      fontSize: 17,
                      fontFamily: F.regular,
                      color: C.black,
                      paddingTop: inputPhoneLabel === true ? 13 : 0,
                      borderColor: errors.userPhoneNumber ? C.red : inputFocus1,
                      borderWidth: errors.userPhoneNumber ? 2 : 1,
                      borderLeftWidth: 0,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      color: errors.userPhoneNumber ? C.red : C.black,
                    }}
                    value={phone}
                    onChangeText={(masked, unmasked) => {
                      onChange(masked)
                      setPhone(masked)
                    }}
                    placeholder={'Enter your phone number'}
                    mask={
                      flagType.phonePattern.length > 0
                        ? flagType.phonePattern[0]
                        : [
                            '+',
                            '1',
                            ' ',
                            '(',
                            /\d/,
                            /\d/,
                            /\d/,
                            ')',
                            ' ',
                            /\d/,
                            /\d/,
                            /\d/,
                            '-',
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                          ]
                    }
                    // mask={S.phoneMaskPattern}
                  />
                  {errors.userPhoneNumber && (
                    <ShowPasswordIconButton>
                      <ErrorIcon width={20} height={20} />
                    </ShowPasswordIconButton>
                  )}
                </FormInputContainerPhone>
                <FormInputLabel
                  style={{ marginLeft: 70 }}
                  isError={errors.userPhoneNumber}
                  inputLabel={inputPhoneLabel}
                >
                  Phone number
                </FormInputLabel>

                {errors.userPhoneNumber?.type === 'required' && (
                  <ErrorMessage>{S.inputRequired}</ErrorMessage>
                )}
                {errors.userPhoneNumber?.type === 'minLength' && (
                  <ErrorMessage>{S.phoneNumberNotValid}</ErrorMessage>
                )}
              </FormInputBlock>
            )}
            name="userPhoneNumber"
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
      </Container>
    </>
  )
}

export default LoginScreen
