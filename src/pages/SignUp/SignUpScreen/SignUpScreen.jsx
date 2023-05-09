import React from 'react'
import { StatusBar } from 'react-native'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'

import C from '@/res/colors'
import F from '@/res/fonts'
import { S } from '@/res/strings'

import GoBack from '@/components/Buttons/GoBack/GoBack'
import DropFlagSelect from './DropFlagSelect'

import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { useNavigation } from '@react-navigation/native'

import MaskInput from 'react-native-mask-input'
// Images
import IMAGES from '@/res/images'
const { ShowPassIcon, ShowPassActiveIcon, ErrorIcon } = IMAGES
// Styles
import { style } from '../style'
import { signUpStyle } from './signUpStyle'
import { signInByPhone } from '@/stores/AccountStore'
import axios from 'axios'
import { twilioApi } from '../../../res/domain'

const {
  Container,
  ContentTitle,
  Header,
  FormBlock,
  FormInputBlock,
  FormInputContainer,
  FormInputLabel,
  FormInput,
  ShowPasswordIconButton,
  ErrorMessage,
} = style

const {
  ButtonSubmit,
  ButtonSubmitText,
  ContentBlock,
  ContentBlockRow,
  ContainerText,
  ContainerLink,
  ContainerLinkText,
  FormInputContainerPhone,
} = signUpStyle

const SignUpScreen = () => {
  const navigation = useNavigation()
  const {
    control,
    handleSubmit,
    resetField,
    watch,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: { userPhoneNumber: '', password: '' },
  })

  const isKeyboardOpen = isKeyboardShown()

  const [phone, setPhone] = useState('')

  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const [inputPhoneLabel, setInputPhoneLabel] = useState(false)

  const [isOpen, setIsOpen] = useState(false)
  const [flagType, setPositionType] = useState({
    icon: '',
    phonePattern: [],
  })
  useEffect(() => {
    if (flagType) {
      setPhone('')
    }
  }, [flagType])
  const toggling = (state) => setIsOpen(state)
  const onFlagSelect = (value) => () => {
    setPositionType(value)
    setIsOpen(false)
  }

  const [inputFocus2, setInputFocus2] = useState(C.lightGray)
  const [inputPasswordLabel, setInputPasswordLabel] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)

  useEffect(() => {
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

  const onSubmit = async (data) => {
    // Clear input value
    signInByPhone({
      email: data.userPhoneNumber,
      phone: data.userPhoneNumber,
      password: data.password,
    })
      .then((res) => {
        if (res.data) {
          axios
            .get(`${twilioApi}?code=${res.data}&phone=${data.userPhoneNumber}`)
            .then((r) => {
              resetField('password')
              setPhone('')
              resetField('userPhoneNumber')
              navigation.navigate('VerifyScreen', {
                screenTitle: 'Verify your phone',
                screenAdvice: `Please enter the verification code we sent to ${data.userPhoneNumber}`,
                whereToSendCode: data.userPhoneNumber,
                phone: data.userPhoneNumber,
                navigateToStackAfterSubmit: 'SignUpStack',
                navigateToScreenAfterSubmit: 'AddProfileInfo',
              })
            })
            .catch((c) => console.log('twillo', c))
        }

        //
      })
      .catch((e) => console.log('sign in ', e))
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

          <ContentTitle>Sign Up</ContentTitle>
        </Header>

        {/* Form */}
        <FormBlock>
          {/* Phone number */}
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 17,
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
                    maxLength={17}
                    style={{
                      width: '100%',
                      flex: 1,
                      height: 48,
                      paddingLeft: 8,
                      borderWidth: 1,
                      borderLeftWidth: 0,
                      borderTopRightRadius: 6,
                      borderBottomRightRadius: 6,
                      borderColor: inputFocus1,
                      fontSize: 17,
                      fontFamily: F.regular,
                      color: C.black,
                      paddingTop: inputPhoneLabel === true ? 13 : 0,
                      borderColor: errors.userPhoneNumber ? C.red : inputFocus1,
                      borderWidth: errors.userPhoneNumber ? 2 : 1,
                      color: errors.userPhoneNumber ? C.red : C.black,
                    }}
                    placeholder={'Enter your phone number'}
                    value={phone}
                    onChangeText={(masked, unmasked) => {
                      onChange(masked)
                      setPhone(masked)
                    }}
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
                  />
                  {errors.userPhoneNumber && (
                    <ShowPasswordIconButton>
                      <ErrorIcon width={20} height={20} />
                    </ShowPasswordIconButton>
                  )}
                </FormInputContainerPhone>
                <FormInputLabel
                  style={{ marginLeft: 60 }}
                  isError={errors.userPhoneNumber}
                  inputLabel={inputPhoneLabel}
                >
                  Phone number
                </FormInputLabel>

                {errors.userPhoneNumber?.type === 'required' && (
                  <ErrorMessage style={{ marginLeft: 78 }}>
                    {S.inputRequired}
                  </ErrorMessage>
                )}
                {errors.userPhoneNumber?.type === 'minLength' && (
                  <ErrorMessage style={{ marginLeft: 78 }}>
                    {S.phoneNumberNotValid}
                  </ErrorMessage>
                )}
              </FormInputBlock>
            )}
            name="userPhoneNumber"
          />

          {/* Password */}
          <Controller
            control={control}
            rules={{
              required: true,
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
                  <ErrorMessage>{S.passwordMinimum}</ErrorMessage>
                )}
              </FormInputBlock>
            )}
            name="password"
          />
        </FormBlock>

        <ContentBlock isKeyboardOpen={isKeyboardOpen}>
          <ButtonSubmit onPress={handleSubmit(onSubmit)}>
            <ButtonSubmitText>Sign Up</ButtonSubmitText>
          </ButtonSubmit>

          <ContentBlockRow>
            <ContainerText>Already have an account?</ContainerText>
            <ContainerLink
              onPress={() => {
                navigation.navigate('LoginStack', { screen: 'LoginScreen' })
              }}
            >
              <ContainerLinkText>Log In</ContainerLinkText>
            </ContainerLink>
          </ContentBlockRow>
        </ContentBlock>
      </Container>
    </>
  )
}

export default SignUpScreen
