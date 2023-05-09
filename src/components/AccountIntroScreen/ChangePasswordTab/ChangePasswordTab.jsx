import React from 'react'
import { useState, useEffect } from 'react'

import { Animated, KeyboardAvoidingView, Platform, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
// Components
import AccountsTabHeader from '../AccountsTabHeader'
import AfterSubmitWindow from '@/components/AfterSubmitWindow'

// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateOfferPreview } from './useAnimateOfferPreview'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { backHandler } from '../backHandler'

// Images
import IMAGES from '@/res/images'
const { ShowPassIcon, ShowPassActiveIcon } = IMAGES
// Variables
import C from '@/res/colors'
import F from '@/res/fonts'
import { S } from '@/res/strings'
// Styles
import { style } from './style'
const {
  FilterContainer,
  ContentTitle,
  // Form
  FormInputBlock,
  FormInputContainer,
  FormInputLabel,
  FormInput,
  ContentBlock,
  ContentBlockRow,
  ButtonSubmit,
  ButtonSubmitText,
} = style
// Mixins
import { M } from '@/res/mixin'
const { ErrorMessage, ShowPasswordIconButton } = M
// Store
import { observer } from 'mobx-react-lite'
import { runInAction, set } from 'mobx'

import { useAccountApiStore } from '@/stores/AccountApi'
import AccountStore, {
  updateAccountInfo,
  updatePassword,
} from '@/stores/AccountStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ChangePasswordTab = observer(() => {
  const isKeyboardOpen = isKeyboardShown()
  // Store
  const { isOpenChangePasswordTab, setOpenTabs } = useAccountApiStore()
  // Animation
  const { onPress, width } = useAnimateOfferPreview()
  useEffect(() => {
    if (isOpenChangePasswordTab === true) {
      onPress(true)
    }
  }, [isOpenChangePasswordTab])

  // Handler for native back button
  const tabNameToClose = 'Change Password'
  backHandler(onPress, setOpenTabs, tabNameToClose)

  const { windowHeight, windowWidth } = getWindowDimension()

  // Form
  const {
    control,
    handleSubmit,
    resetField,
    setError,
    watch,
    clearErrors,
    setValue,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
    },
  })

  const [inputFocus, setInputFocus] = useState(C.lightGray)
  const [inputPasswordLabel, setInputPasswordLabel] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)

  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const [inputNewPasswordLabel, setInputNewPasswordLabel] = useState(false)
  const [newPasswordShown, setNewPasswordShown] = useState(false)

  const [inputFocus2, setInputFocus2] = useState(C.lightGray)
  const [inputPasswordRepeatLabel, setInputPasswordRepeatLabel] = useState(
    false,
  )
  const [passwordRepeatShown, setPasswordRepeatShown] = useState(false)

  const [isOpenAfterSubmitMessage, setOpenAfterSubmitMessage] = useState(false)

  // const userCurrentPassWatch = watch(" currentPassword")
  // const userNewPassWatch = watch(" newPassword")
  // const userNewPassRepeatWatch = watch(" newPasswordRepeat")

  // // Set shifting input label
  useEffect(() => {
    if (dirtyFields.currentPassword === undefined) {
      setInputPasswordLabel(false)
    }
    if (dirtyFields.currentPassword === true) {
      setInputPasswordLabel(true)
    }

    if (dirtyFields.newPassword === undefined) {
      setInputNewPasswordLabel(false)
    }
    if (dirtyFields.newPassword === true) {
      setInputNewPasswordLabel(true)
    }

    if (dirtyFields.newPasswordRepeat === undefined) {
      setInputPasswordRepeatLabel(false)
    }
    if (dirtyFields.newPasswordRepeat === true) {
      setInputPasswordRepeatLabel(true)
    }
  }, [
    dirtyFields.currentPassword,
    dirtyFields.newPassword,
    dirtyFields.newPasswordRepeat,
  ])

  // Submit
  const onSubmit = async (data) => {
    const userId = AccountStore.account.id
    if (data.newPassword !== data.newPasswordRepeat) {
      setError('newPasswordRepeat', {
        type: 'value',
        message: "Passwords don't match",
      })
    } else {
      // Clear input value
      updatePassword({
        id: userId,
        oldpassword: data.currentPassword,
        newpassword: data.newPassword,
      }).then((res) => {
        resetField('currentPassword')
        resetField('newPassword')
        resetField('newPasswordRepeat')
        setOpenAfterSubmitMessage(true)
      })
    }

    return
  }

  const AfterSubmitButtonAction = () => {
    setOpenAfterSubmitMessage(false)
    onPress(false)

    setOpenTabs({
      tabName: 'Change Password',
      isOpen: false,
    })
    return
  }

  return (
    <Animated.View
      style={{
        zIndex: 1000,
        height: windowHeight - 50,
        // width: windowWidth,
        width,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          paddingHorizontal: 16,
        }}
      >
        <FilterContainer
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          <AfterSubmitWindow
            title={'New password confirmed succesful'}
            message={'You have succesfully confirm your new password'}
            windowImage={IMAGES.GifNewPassword}
            isOpen={isOpenAfterSubmitMessage}
            afterSubmitButton={AfterSubmitButtonAction}
            buttonText={'Great!'}
          />
          {/* Header */}
          <View
            style={{
              marginHorizontal: -16,
            }}
          >
            <AccountsTabHeader
              tabName={'Change Password'}
              setOpenTabs={setOpenTabs}
              onPress={onPress}
            />
          </View>
          {/* Form */}

          {/* Current password */}
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
                    placeholder={'Enter current password'}
                    placeholderTextColor={C.placeholder}
                    cursorColor={C.inputCursor}
                    onFocus={() => setInputFocus(C.black)}
                    onBlur={() => {
                      onBlur
                      setInputFocus(C.lightGray)
                    }}
                    onChangeText={onChange}
                    value={value}
                    style={{
                      borderColor: errors.currentPassword ? C.red : inputFocus,
                      borderWidth: errors.currentPassword ? 2 : 1,
                      color: errors.currentPassword ? C.red : C.black,
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
                  isError={errors.currentPassword}
                  inputLabel={inputPasswordLabel}
                >
                  Enter current password
                </FormInputLabel>

                {errors.currentPassword && (
                  <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>
                )}
                {errors.currentPassword?.type === 'minLength' && (
                  <ErrorMessage>{S.passwordMinimum}</ErrorMessage>
                )}
              </FormInputBlock>
            )}
            name="currentPassword"
          />

          <ContentTitle>New Password</ContentTitle>

          {/* New password */}
          <Controller
            control={control}
            rules={{
              required: S.passwordNotValid,
              minLength: 8,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInputBlock
                style={{
                  marginBottom: errors.newPassword ? 32 : 8,
                }}
              >
                <FormInputContainer>
                  <FormInput
                    isPassword={true}
                    inputLabel={inputNewPasswordLabel}
                    secureTextEntry={!newPasswordShown ? true : false}
                    selectionColor={C.lightGray}
                    placeholder={'Enter new password'}
                    placeholderTextColor={C.placeholder}
                    cursorColor={C.inputCursor}
                    onFocus={() => setInputFocus1(C.black)}
                    onBlur={() => {
                      onBlur
                      setInputFocus1(C.lightGray)
                    }}
                    onChangeText={onChange}
                    value={value}
                    style={{
                      borderColor: errors.newPassword ? C.red : inputFocus1,
                      borderWidth: errors.newPassword ? 2 : 1,
                      color: errors.newPassword ? C.red : C.black,
                    }}
                  />
                  <ShowPasswordIconButton
                    onPress={() => setNewPasswordShown(!newPasswordShown)}
                  >
                    {!newPasswordShown ? (
                      <ShowPassIcon width={18} height={18} />
                    ) : (
                      <ShowPassActiveIcon width={18} height={18} />
                    )}
                  </ShowPasswordIconButton>
                </FormInputContainer>
                <FormInputLabel
                  isError={errors.newPassword}
                  inputLabel={inputNewPasswordLabel}
                >
                  Enter new password
                </FormInputLabel>

                {errors.newPassword && (
                  <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
                )}
                {errors.newPassword?.type === 'minLength' && (
                  <ErrorMessage>{S.passwordMinimum}</ErrorMessage>
                )}
              </FormInputBlock>
            )}
            name="newPassword"
          />

          {/* Repeat New password */}
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
                    inputLabel={inputPasswordRepeatLabel}
                    secureTextEntry={!passwordRepeatShown ? true : false}
                    selectionColor={C.lightGray}
                    placeholder={'Repeat new password'}
                    placeholderTextColor={C.placeholder}
                    cursorColor={C.inputCursor}
                    onFocus={() => setInputFocus2(C.black)}
                    onBlur={() => {
                      onBlur
                      setInputFocus2(C.lightGray)
                    }}
                    onChangeText={onChange}
                    value={value}
                    style={{
                      borderColor: errors.newPasswordRepeat
                        ? C.red
                        : inputFocus2,
                      borderWidth: errors.newPasswordRepeat ? 2 : 1,
                      color: errors.newPasswordRepeat ? C.red : C.black,
                    }}
                  />
                  <ShowPasswordIconButton
                    onPress={() => setPasswordRepeatShown(!passwordRepeatShown)}
                  >
                    {!passwordRepeatShown ? (
                      <ShowPassIcon width={18} height={18} />
                    ) : (
                      <ShowPassActiveIcon width={18} height={18} />
                    )}
                  </ShowPasswordIconButton>
                </FormInputContainer>
                <FormInputLabel
                  isError={errors.newPasswordRepeat}
                  inputLabel={inputPasswordRepeatLabel}
                >
                  Repeat new password
                </FormInputLabel>

                {errors.newPasswordRepeat && (
                  <ErrorMessage>
                    {errors.newPasswordRepeat.message}
                  </ErrorMessage>
                )}
                {errors.newPasswordRepeat?.type === 'minLength' && (
                  <ErrorMessage>{S.passwordMinimum}</ErrorMessage>
                )}
              </FormInputBlock>
            )}
            name="newPasswordRepeat"
          />

          {/* Footer block */}
          <ContentBlock
            style={{
              width: windowWidth,
            }}
            isKeyboardOpen={isKeyboardOpen}
          >
            <ContentBlockRow>
              <ButtonSubmit
                activeOpacity={0.2}
                style={{
                  width: '100%',
                  backgroundColor: C.black,
                }}
                onPress={handleSubmit(onSubmit)}
              >
                <ButtonSubmitText>Save new password</ButtonSubmitText>
              </ButtonSubmit>
            </ContentBlockRow>
          </ContentBlock>
        </FilterContainer>
      </KeyboardAvoidingView>
    </Animated.View>
  )
})

export default ChangePasswordTab
