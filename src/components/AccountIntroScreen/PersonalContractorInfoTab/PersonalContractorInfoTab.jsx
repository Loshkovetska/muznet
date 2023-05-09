import React from 'react'
import { useState, useEffect } from 'react'

import {
  Animated,
  View,
  KeyboardAvoidingView,
  Image,
  Platform,
  Alert,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'
// Components
import AccountsTabHeader from '../AccountsTabHeader'
import BottomConfirmPopup from '@/components/BottomConfirmPopup'

// Helpers
import MaskInput from 'react-native-mask-input'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateOfferPreview } from './useAnimateOfferPreview'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { compareTwoArrays } from '@/components/helpers/compareTwoArrays'
import { backHandler } from '../backHandler'
import SearchLocationDropSelect from '@/components/Dropdowns/SearchLocationDropSelect'

// Images
import IMAGES from '@/res/images'
const { EditIcon, ErrorIcon } = IMAGES
// Variables
import C from '@/res/colors'
import F from '@/res/fonts'
import { S } from '@/res/strings'
// Styles
import { style } from './style'
const {
  FilterContainer,
  FormScrollView,
  UserAvatarBlock,
  UserAvatarContainer,
  UserAvatar,
  UserAvatarReplaceButton,
  // Form
  FormInputBlock,
  FormInputContainer,
  FormInputLabel,
  FormInput,
  FormTextInput,

  LogOutButton,
  LogOutButtonText,
  ContentBlock,
  ContentBlockRow,
  ButtonSubmit,
  ButtonSubmitText,
} = style
// Mixins
import { M } from '@/res/mixin'
const { ErrorMessage, ShowPasswordIconButton, FormInputContainerPhone } = M
// Store
import { observer } from 'mobx-react-lite'
import { useAccountApiStore } from '@/stores/AccountApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateAccountInfo } from '@/stores/AccountStore'
import AccountStore from '@/stores/AccountStore'
import { deleteAccount } from '@/stores/AccountStore'
import { useNavigation } from '@react-navigation/native'
import { runInAction } from 'mobx'
import { UserNameState } from '../AccountIntroScreen'
import { getAccountInfo } from '../../../stores/AccountStore'
const PersonalContractorInfoTab = observer(({ isOpenTab }) => {
  const isKeyboardOpen = isKeyboardShown()
  const navigation = useNavigation()
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
      userNickName: '',
      userName: '',
      userSurName: '',
      userDescription: '',
      userEmail: '',
      userPhoneNumber: '',
      // userLocation: '',
      userAddress: '',
    },
  })

  // Store
  const { setOpenTabs } = useAccountApiStore()

  const { onPress, width } = useAnimateOfferPreview()

  useEffect(() => {
    if (!accountData) {
      getAccountInfo().then((r) => setData(r))
    }
  }, [])

  useEffect(() => {
    if (isOpenTab === true) {
      onPress(true)
    }
  }, [isOpenTab])

  // Handler for native back button
  const tabNameToClose = 'Personal Info'
  backHandler(onPress, setOpenTabs, tabNameToClose)
  const [accountData, setData] = useState(null)
  // Local user images state
  const [newUserImages, setNewUserImages] = useState([])
  const [chosenLocation, getChosenLocation] = useState('')
  const [isResetAll, setResetAll] = useState(false)

  useEffect(() => {
    if (accountData) {
      setNewUserImages(accountData?.userAvatar)
      setValue('userName', accountData?.userName)
      setValue('userSurName', accountData?.userSurName)
      setValue('userDescription', accountData?.userDescription)
      setValue('userEmail', accountData?.userEmail)
      setValue('userPhoneNumber', accountData?.userPhoneNumber)
      getChosenLocation(accountData?.userLocation)
      setValue('userAddress', accountData?.userAddress)
    }
  }, [accountData])

  //New user image handler
  const [newAvatar, setNewAvatar] = useState(null)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    const newImage = result.assets[0]

    const [first, ...rest] = newUserImages

    if (newImage.fileSize * 0.000001 > 2) {
      Alert.alert('Cannot upload files larger than 2MB')
      return
    }

    if (!result.canceled) {
      setNewAvatar(newImage)
      setNewUserImages([newImage, ...rest])
    }
  }

  const userNameWatch = watch('userName')
  const userSurNameWatch = watch('userSurName')
  const userDescriptionWatch = watch('userDescription')
  const userEmailWatch = watch('userEmail')
  const userPhoneNumberWatch = watch('userPhoneNumber')
  // const userLocationWatch = watch('userLocation')

  // Full name input
  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const [inputFocus2, setInputFocus2] = useState(C.lightGray)
  const [inputFocus8, setInputFocus8] = useState(C.lightGray)
  const [inputFocus3, setInputFocus3] = useState(C.lightGray)
  const [inputFocus4, setInputFocus4] = useState(C.lightGray)
  const [inputFocus5, setInputFocus5] = useState(C.lightGray)

  // Shift label state
  const [inputNameLabel, setInputNameLabel] = useState(false)
  const [inputSurNameLabel, setInputSurNameLabel] = useState(false)
  const [inputDescriptionLabel, setInputDescriptionLabel] = useState(false)
  const [descriptionHeight, setDescriptionHeight] = useState(48)

  const [inputEmailLabel, setInputEmailLabel] = useState(false)
  const [inputPhoneLabel, setInputPhoneLabel] = useState(false)
  // const [inputLocationLabel, setInputLocationLabel] = useState(false)

  // Phone number
  const [phone, setPhone] = useState('')
  useEffect(() => {
    if (accountData) {
      setPhone(accountData?.userPhoneNumber)
    }
  }, [accountData])
  const [isCloseAllDropdown, setCloseAllDropdown] = useState(false)

  const [isShowSubmitButton, setShowSubmitButton] = useState(false)
  const [isSomeFieldChange, setSomeFieldChange] = useState(false)
  useEffect(() => {
    function isEmpty(obj) {
      return Object.keys(obj).length === 0
    }
    if (isEmpty(errors) && isSomeFieldChange) {
      setShowSubmitButton(true)
    } else {
      setShowSubmitButton(false)
    }
  }, [errors, isSomeFieldChange])

  useEffect(() => {
    if (!accountData) return
    const isChangedUserAvatar = compareTwoArrays(
      accountData?.userAvatar,
      newUserImages,
    )
    const isChangedUserNameWatch = userNameWatch !== accountData?.userName
    const isChangedUserSurNameWatch =
      userSurNameWatch !== accountData?.userSurName
    const isChangedUserDescriptionWatch =
      userDescriptionWatch !== accountData?.userDescription
    const isChangedUserEmailWatch = userEmailWatch !== accountData?.userEmail
    const isChangedUserPhoneNumberWatch =
      userPhoneNumberWatch !== accountData?.userPhoneNumber
    const isChangedUserLocationWatch =
      chosenLocation !== accountData?.userLocation

    if (
      !isChangedUserAvatar ||
      isChangedUserNameWatch ||
      isChangedUserSurNameWatch ||
      isChangedUserDescriptionWatch ||
      isChangedUserEmailWatch ||
      isChangedUserPhoneNumberWatch ||
      isChangedUserLocationWatch
    ) {
      setSomeFieldChange(true)
    } else {
      setSomeFieldChange(false)
    }
  }, [
    newUserImages,
    userNameWatch,
    userSurNameWatch,
    userDescriptionWatch,
    userEmailWatch,
    userPhoneNumberWatch,
    chosenLocation,
  ])

  // Set shifting input label
  useEffect(() => {
    if (dirtyFields.userName === undefined || !userNameWatch) {
      setInputNameLabel(false)
    }
    if (dirtyFields.userName !== undefined || userNameWatch) {
      setInputNameLabel(true)
    }

    if (dirtyFields.userSurName === undefined || !userSurNameWatch) {
      setInputSurNameLabel(false)
    }
    if (dirtyFields.userSurName !== undefined || userSurNameWatch) {
      setInputSurNameLabel(true)
    }

    if (dirtyFields.userDescription === undefined || !userDescriptionWatch) {
      setInputDescriptionLabel(false)
    }
    if (dirtyFields.userDescription !== undefined || userDescriptionWatch) {
      setInputDescriptionLabel(true)
    }

    if (dirtyFields.userEmail === undefined || !userEmailWatch) {
      setInputEmailLabel(false)
    }
    if (dirtyFields.userEmail !== undefined || userEmailWatch) {
      setInputEmailLabel(true)
    }

    if (dirtyFields.userPhoneNumber === undefined || !userPhoneNumberWatch) {
      setInputPhoneLabel(false)
    }
    if (dirtyFields.userPhoneNumber !== undefined || userPhoneNumberWatch) {
      setInputPhoneLabel(true)
    }

    if (dirtyFields.userPhoneNumber === undefined || !userPhoneNumberWatch) {
      setInputPhoneLabel(false)
    }
    if (dirtyFields.userPhoneNumber !== undefined || userPhoneNumberWatch) {
      setInputPhoneLabel(true)
    }
  }, [
    userNameWatch,
    userSurNameWatch,
    userDescriptionWatch,
    userEmailWatch,
    userPhoneNumberWatch,
    userPhoneNumberWatch,
    // userLocationWatch,

    dirtyFields.userName,
    dirtyFields.userSurName,
    dirtyFields.userDescription,
    dirtyFields.userEmail,
    dirtyFields.userPhoneNumber,
    dirtyFields.userAddress,
  ])

  // Submit
  const onSubmit = async (data) => {
    const user = JSON.parse(await AsyncStorage.getItem('@user'))
    if (user) {
      updateAccountInfo(
        {
          email: data.userEmail,
          id: user.id,
          name: data.userName,
          surname: data.userSurName,
          description: data.userDescription,
          phone: data.userPhoneNumber,
          location: chosenLocation,
          type: 'Contractor',
        },
        [newAvatar] || null,
      ).then(() => {
        runInAction(() => {
          UserNameState.name = data.userName
        })
        setShowSubmitButton(false)
        setSomeFieldChange(false)
        setCloseAllDropdown(true)
      })
    }
    return
  }

  const delAccount = () => {
    deleteAccount(AccountStore.account.id)
      .then(() => {
        setOpenConfirmWindow(false)

        navigation.navigate('OnBoardingScreen')
      })
      .catch((c) => console.log(c))
  }

  // Confirm delete account
  const [isOpenConfirmWindow, setOpenConfirmWindow] = useState(false)
  return (
    <Animated.View
      style={{
        zIndex: 1000,
        // height: windowHeight,
      width,
      //  width: '100%',
        height: '100%',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        paddingBottom: 50,
      }}
    >
      <FilterContainer
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        {/* Header */}
        <AccountsTabHeader
          tabName={'Personal Info'}
          setOpenTabs={setOpenTabs}
          onPress={onPress}
        />
        {/* Form */}
        <KeyboardAvoidingView
          keyboardVerticalOffset={20}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} //height
          style={{ flex: 1 }}
        >
          <FormScrollView showsVerticalScrollIndicator={false}>
            {/* Avatar upload from user */}
            <UserAvatarBlock>
              <UserAvatarContainer>
                <UserAvatar>
                  {newAvatar !== null ? (
                    <Image
                      source={{ uri: newAvatar?.uri }}
                      style={{ width: 120, height: 120 }}
                      resizeMode="stretch"
                    />
                  ) : (
                    <Image
                      source={{
                        uri: newUserImages[0],
                      }}
                      style={{ width: 120, height: 120 }}
                      resizeMode="stretch"
                    />
                  )}
                </UserAvatar>

                <UserAvatarReplaceButton onPress={pickImage}>
                  <EditIcon width={16} height={16} />
                </UserAvatarReplaceButton>
              </UserAvatarContainer>
            </UserAvatarBlock>
            {/* User Name */}
            <Controller
              control={control}
              rules={{
                required: S.userNameExistError,
                pattern: S.userNamePattern,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputBlock
                  style={{
                    marginBottom:
                      errors.userName?.type === 'required'
                        ? 35
                        : errors.userName?.type === 'pattern'
                        ? 60
                        : 13,
                  }}
                >
                  <FormInputContainer>
                    <FormInput
                      inputLabel={inputNameLabel}
                      selectionColor={C.lightGray}
                      placeholder={'Enter your name'}
                      cursorColor={C.inputCursor}
                      onFocus={() => {
                        setInputFocus2(C.black)
                      }}
                      onBlur={() => {
                        onBlur
                        setInputFocus2(C.lightGray)
                      }}
                      onChangeText={onChange}
                      value={value}
                      style={{
                        borderColor: errors.userName ? C.red : inputFocus2,
                        borderWidth: errors.userName ? 2 : 1,
                        color: errors.userName ? C.red : C.black,
                      }}
                    />
                    {errors.userName && (
                      <ShowPasswordIconButton>
                        <ErrorIcon width={20} height={20} />
                      </ShowPasswordIconButton>
                    )}
                  </FormInputContainer>
                  <FormInputLabel
                    isError={errors.userName}
                    inputLabel={inputNameLabel}
                  >
                    Your name
                  </FormInputLabel>

                  {errors.userName?.type === 'pattern' && (
                    <ErrorMessage>{S.userNameSymbolExclude}</ErrorMessage>
                  )}
                  {errors.userName?.type === 'required' && (
                    <ErrorMessage>{S.inputRequired}</ErrorMessage>
                  )}
                </FormInputBlock>
              )}
              name="userName"
            />
            {/* User Surname  */}
            <Controller
              control={control}
              rules={{
                required: S.userNameExistError,
                pattern: S.userNamePattern,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputBlock
                  style={{
                    marginBottom:
                      errors.userSurName?.type === 'required'
                        ? 35
                        : errors.userSurName?.type === 'pattern'
                        ? 60
                        : 13,
                  }}
                >
                  <FormInputContainer>
                    <FormInput
                      inputLabel={inputSurNameLabel}
                      selectionColor={C.lightGray}
                      placeholder={'Enter your last name'}
                      cursorColor={C.inputCursor}
                      onFocus={() => {
                        setInputFocus8(C.black)
                      }}
                      onBlur={() => {
                        onBlur
                        setInputFocus8(C.lightGray)
                      }}
                      onChangeText={onChange}
                      value={value}
                      style={{
                        borderColor: errors.userSurName ? C.red : inputFocus8,
                        borderWidth: errors.userSurName ? 2 : 1,
                        color: errors.userSurName ? C.red : C.black,
                      }}
                    />
                    {errors.userSurName && (
                      <ShowPasswordIconButton>
                        <ErrorIcon width={20} height={20} />
                      </ShowPasswordIconButton>
                    )}
                  </FormInputContainer>
                  <FormInputLabel
                    isError={errors.userSurName}
                    inputLabel={inputSurNameLabel}
                  >
                    Last name
                  </FormInputLabel>

                  {errors.userSurName?.type === 'pattern' && (
                    <ErrorMessage>{S.userNameSymbolExclude}</ErrorMessage>
                  )}
                  {errors.userSurName?.type === 'required' && (
                    <ErrorMessage>{S.inputRequired}</ErrorMessage>
                  )}
                </FormInputBlock>
              )}
              name="userSurName"
            />
            {/* User Description  */}
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputBlock>
                  <FormInputContainer
                    style={{
                      maxHeight: 154,
                    }}
                  >
                    <FormTextInput
                      inputLabel={inputDescriptionLabel}
                      selectionColor={C.lightGray}
                      multiline={true}
                      numberOfLines={5}
                      placeholder={'Enter your description'}
                      cursorColor={C.inputCursor}
                      onContentSizeChange={(e) =>
                        setDescriptionHeight(e.nativeEvent.contentSize.height)
                      }
                      onFocus={() => {
                        setInputFocus3(C.black)
                      }}
                      onBlur={() => {
                        onBlur
                        setInputFocus3(C.lightGray)
                      }}
                      onChangeText={onChange}
                      value={value}
                      style={{
                        borderColor: inputFocus3,
                        borderWidth: 1,
                        // height: descriptionHeight,
                        textAlignVertical: 'top',
                        color: C.black,
                      }}
                    />
                  </FormInputContainer>
                  <FormInputLabel inputLabel={inputDescriptionLabel}>
                    Your description
                  </FormInputLabel>
                </FormInputBlock>
              )}
              name="userDescription"
            />
            {/* Email */}
            <Controller
              control={control}
              rules={{
                required: S.emailNotValid,
                pattern: S.emailValidationPattern,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputBlock
                  style={{
                    marginBottom: errors.userEmail ? 40 : 13,
                  }}
                >
                  <FormInputContainer>
                    <FormInput
                      inputLabel={inputEmailLabel}
                      selectionColor={C.lightGray}
                      placeholder={'Enter your email'}
                      cursorColor={C.inputCursor}
                      onFocus={() => {
                        setInputFocus4(C.black)
                      }}
                      onBlur={() => {
                        onBlur
                        setInputFocus4(C.lightGray)
                      }}
                      onChangeText={onChange}
                      value={value}
                      style={{
                        borderColor: errors.userEmail ? C.red : inputFocus4,
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
            {/* Phone number */}
            <Controller
              control={control}
              rules={{
                required: true,
                minLength:
                  accountData?.userPhoneNumber !== userPhoneNumberWatch
                    ? 11
                    : 11,
                maxLength: 20,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <FormInputBlock
                    style={{
                      marginBottom: errors.userPhoneNumber ? 32 : 13,
                    }}
                  >
                    <FormInputContainerPhone>
                      <FormInput
                        inputLabel={inputPhoneLabel}
                        selectionColor={C.lightGray}
                        placeholder={'Enter your phone'}
                        cursorColor={C.inputCursor}
                        keyboardType="phone-pad"
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
                          borderColor: errors.userPhoneNumber
                            ? C.red
                            : inputFocus1,
                          borderWidth: errors.userPhoneNumber ? 2 : 1,
                          color: errors.userPhoneNumber ? C.red : C.black,
                        }}
                      />
                      {errors.userPhoneNumber && (
                        <ShowPasswordIconButton>
                          <ErrorIcon width={20} height={20} />
                        </ShowPasswordIconButton>
                      )}
                    </FormInputContainerPhone>
                    <FormInputLabel
                      isError={errors.userPhoneNumber}
                      inputLabel={inputPhoneLabel}
                    >
                      Contact phone
                    </FormInputLabel>

                    {errors.userPhoneNumber?.type === 'required' && (
                      <ErrorMessage>{S.inputRequired}</ErrorMessage>
                    )}
                    {errors.userPhoneNumber?.type === 'minLength' && (
                      <ErrorMessage>{S.phoneNumberNotValid}</ErrorMessage>
                    )}
                  </FormInputBlock>
                </View>
              )}
              name="userPhoneNumber"
            />
            {/* User location  */}
            <SearchLocationDropSelect
              setFilterLocation={getChosenLocation}
              isResetAll={isResetAll}
              isCloseAllDropdown={isCloseAllDropdown}
              placeholderText={'Any location'}
              existedLocation={chosenLocation}
              isPersonalInfo={true}
            />
            {/* Delete Account */}
            <LogOutButton
              onPress={() => {
                setOpenConfirmWindow(true)
              }}
            >
              <LogOutButtonText>Delete Account</LogOutButtonText>
            </LogOutButton>
          </FormScrollView>
        </KeyboardAvoidingView>

        {/* Footer block */}
        {isShowSubmitButton && (
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
                <ButtonSubmitText>Save changes</ButtonSubmitText>
              </ButtonSubmit>
            </ContentBlockRow>
          </ContentBlock>
        )}
      </FilterContainer>

      {/* Confirm popup */}
      {isOpenConfirmWindow && (
        <BottomConfirmPopup
          isOpenBottomPopup={isOpenConfirmWindow}
          setOpenBottomPopup={setOpenConfirmWindow}
          setConfirm={delAccount}
          confirmBtnText={'Delete Account'}
          popupMainText={'Are you sure you want to delete your account? '}
        />
      )}
    </Animated.View>
  )
})

export default PersonalContractorInfoTab
