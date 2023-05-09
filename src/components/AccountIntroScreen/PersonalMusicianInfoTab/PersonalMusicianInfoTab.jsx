import React from 'react'
import { useState, useEffect, useRef } from 'react'
import {
  Animated,
  View,
  Pressable,
  KeyboardAvoidingView,
  Image,
  Platform,
  Alert,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'
// Components
import AccountsTabHeader from '../AccountsTabHeader'
import SearchInputDropSelect from '@/components/Dropdowns/SearchInputDropSelect'
import MediaImagePicker from '@/components/MediaImagePicker'
import CheckBoxWithText from '@/components/Buttons/CheckBoxWithText'
import BottomConfirmPopup from '@/components/BottomConfirmPopup'

// Helpers
import MaskInput from 'react-native-mask-input'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateOfferPreview } from './useAnimateOfferPreview'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { addDotForNumber } from '@/components/helpers/addDotForNumber'
import { compareTwoArrays } from '@/components/helpers/compareTwoArrays'
import { backHandler } from '../backHandler'

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
  FormInputPricePerHourBlock,
  FormInputPricePerHourText,
  CheckboxBlock,
  CheckboxBlockTitle,
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
import { runInAction, set } from 'mobx'

import { useAccountApiStore } from '@/stores/AccountApi'
import AccountStore from '@/stores/AccountStore'
import { updateAccountInfo } from '@/stores/AccountStore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserNameState } from '../AccountIntroScreen'
import { deleteAccount, getAccountInfo } from '../../../stores/AccountStore'
import SearchLocationDropSelect from '../../Dropdowns/SearchLocationDropSelect/SearchLocationDropSelect'
import { useNavigation } from '@react-navigation/native'

const PersonalMusicianInfoTab = observer(({ isOpenTab }) => {
  const [contractorAccountData, setData] = useState(null)
  const isKeyboardOpen = isKeyboardShown()
  const navigate = useNavigation()
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
      userPricePerHour: '',
    },
  })

  // Store
  const { setOpenTabs, setCloseAllTabs } = useAccountApiStore()

  const { onPress, width } = useAnimateOfferPreview()

  useEffect(() => {
    if (isOpenTab === true) {
      onPress(true)
    }
  }, [isOpenTab])

  useEffect(() => {
    getAccountInfo().then((r) => {
      setData({ ...contractorAccountData, ...r })
    })
    setCloseAllTabs()
  }, [])

  // Handler for native back button
  const tabNameToClose = 'Personal Info'
  backHandler(onPress, setOpenTabs, tabNameToClose)

  // Local user images state
  const [newUserImages, setNewUserImages] = useState([])
  // Genres Search
  const [chosenGenres, getChosenGenres] = useState([])
  // Instruments Search
  const [chosenInstrument, getChosenInstrument] = useState([])
  // Price per hour input
  const [pricePerHourInput, setPricePerHourInput] = useState('')

  // Willing to travel interstate for gigs
  const [isWillingToTravel, setWillingToTravel] = useState(false)
  // Skills
  const [isSingByEar, setSingByEar] = useState(false)
  const [isPlayByEar, setPlayByEar] = useState(false)
  const [isReadSheetMusic, setReadSheetMusic] = useState(false)
  // Set data to fields from store
  const [chosenLocation, getChosenLocation] = useState('')
  const [isResetAll, setResetAll] = useState(false)
  useEffect(() => {
    if (contractorAccountData) {
      setValue('userName', contractorAccountData?.userName)
      setValue('userSurName', contractorAccountData?.userSurName)
      setValue('userDescription', contractorAccountData?.userDescription)
      setValue('userEmail', contractorAccountData?.userEmail)
      setValue('userPhoneNumber', contractorAccountData?.userPhoneNumber)
      getChosenLocation(contractorAccountData?.userLocation)
      getChosenGenres(contractorAccountData?.userGenres)
      getChosenInstrument(contractorAccountData?.userMusicalInstrument)
      setValue('userPricePerHour', `${contractorAccountData?.userPricePerHour}`)
      setPricePerHourInput(`${contractorAccountData?.userPricePerHour}`)
      setNewUserImages(
        contractorAccountData?.userAvatar.map((c) => {
          return {
            uri: c,
          }
        }),
      )
      setWillingToTravel(contractorAccountData?.willingToTravel)
      setSingByEar(contractorAccountData?.userSkills?.singByEar)
      setPlayByEar(contractorAccountData?.userSkills?.playByEar)
      setReadSheetMusic(contractorAccountData?.userSkills?.readSheetMusic)
    }
  }, [contractorAccountData])

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
  const userLocationWatch = watch('userLocation')
  const userPricePerHourWatch = watch('userPricePerHour')

  // Full name input
  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const [inputFocus2, setInputFocus2] = useState(C.lightGray)
  const [inputFocus8, setInputFocus8] = useState(C.lightGray)
  const [inputFocus3, setInputFocus3] = useState(C.lightGray)
  const [inputFocus4, setInputFocus4] = useState(C.lightGray)
  const [inputFocus5, setInputFocus5] = useState(C.lightGray)
  const [inputFocus6, setInputFocus6] = useState(C.lightGray)
  const [inputFocus7, setInputFocus7] = useState(C.lightGray)

  // Shift label state
  const [inputNameLabel, setInputNameLabel] = useState(false)
  const [inputSurNameLabel, setInputSurNameLabel] = useState(false)
  const [inputDescriptionLabel, setInputDescriptionLabel] = useState(false)
  const [descriptionHeight, setDescriptionHeight] = useState(48)

  const [inputEmailLabel, setInputEmailLabel] = useState(false)
  const [inputPhoneLabel, setInputPhoneLabel] = useState(false)
  const [inputLocationLabel, setInputLocationLabel] = useState(false)
  const [pricePerHourLabel, setPricePerHourLabel] = useState(false)

  // Phone number

  // Is show submit button
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

  useEffect(() => {}, [])

  // Is changed data

  useEffect(() => {
    if (!contractorAccountData) return

    const isChangedUserNameWatch =
      userNameWatch !== contractorAccountData?.userName
    const isChangedUserSurNameWatch =
      userSurNameWatch !== contractorAccountData?.userSurName
    const isChangedUserDescriptionWatch =
      userDescriptionWatch !== contractorAccountData?.userDescription
    const isChangedUserEmailWatch =
      userEmailWatch !== contractorAccountData?.userEmail
    const isChangedUserPhoneNumberWatch =
      userPhoneNumberWatch !== contractorAccountData?.userPhoneNumber
    const isChangedUserLocationWatch =
      chosenLocation !== contractorAccountData?.userLocation
    const isChangedUserPricePerHourWatch =
      userPricePerHourWatch !== `${contractorAccountData?.userPricePerHour}`

    const isSameUserGenres = compareTwoArrays(
      chosenGenres,
      contractorAccountData?.userGenres,
    )
    const isSameUserInstruments = compareTwoArrays(
      chosenInstrument,
      contractorAccountData?.userMusicalInstrument,
    )

    const isSameUserImages = compareTwoArrays(
      newUserImages,
      contractorAccountData?.userAvatar,
    )

    const isChangedUserWillingToTravel =
      isWillingToTravel !== contractorAccountData?.willingToTravel
    const isChangedUserSingByEar =
      isSingByEar !== contractorAccountData?.userSkills.singByEar
    const isChangedUserPlayByEar =
      isPlayByEar !== contractorAccountData?.userSkills.playByEar
    const isChangedUserReadSheetMusic =
      isReadSheetMusic !== contractorAccountData?.userSkills.readSheetMusic

    if (
      isChangedUserNameWatch ||
      isChangedUserSurNameWatch ||
      isChangedUserDescriptionWatch ||
      isChangedUserEmailWatch ||
      isChangedUserPhoneNumberWatch ||
      isChangedUserLocationWatch ||
      isChangedUserPricePerHourWatch ||
      !isSameUserGenres ||
      !isSameUserInstruments ||
      !isSameUserImages ||
      isChangedUserWillingToTravel ||
      isChangedUserSingByEar ||
      isChangedUserPlayByEar ||
      isChangedUserReadSheetMusic
    ) {
      setSomeFieldChange(true)
    } else {
      setSomeFieldChange(false)
    }
  }, [
    userNameWatch,
    userSurNameWatch,
    userDescriptionWatch,
    userEmailWatch,
    userPhoneNumberWatch,
    chosenLocation,
    userPricePerHourWatch,
    chosenGenres,
    chosenInstrument,
    newUserImages,
    isWillingToTravel,
    isSingByEar,
    isPlayByEar,
    isReadSheetMusic,
  ])

  //Set shifting input label

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

    // if (dirtyFields.userLocation === undefined || !userLocationWatch) {
    //   setInputLocationLabel(false)
    // }
    // if (dirtyFields.userLocation !== undefined || userLocationWatch) {
    //   setInputLocationLabel(true)
    // }

    if (dirtyFields.userPricePerHour === undefined || !userPricePerHourWatch) {
      setPricePerHourLabel(false)
    }
    if (dirtyFields.userPricePerHour !== undefined || userPricePerHourWatch) {
      setPricePerHourLabel(true)
    }
  }, [
    userNameWatch,
    userSurNameWatch,
    userDescriptionWatch,
    userEmailWatch,
    userPhoneNumberWatch,
    userLocationWatch,
    userPricePerHourWatch,
    dirtyFields.userName,
    dirtyFields.userSurName,
    dirtyFields.userDescription,
    dirtyFields.userEmail,
    dirtyFields.userAddress,
    dirtyFields.userPricePerHour,
  ])

  // Scroll To top after submit
  const scrollViewRef = useRef(null)
  const scrollTop = () => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
      }, 20)
    }
  }

  // Submit
  const onSubmit = async (data) => {
    scrollTop()
    setShowSubmitButton(false)
    setSomeFieldChange(false)
    const user = JSON.parse(await AsyncStorage.getItem('@user'))
    if (user) {
      updateAccountInfo(
        {
          type: 'Musician',
          id: user.id,
          description: data.userDescription,
          email: data.userEmail,
          surname: data.userSurName,
          name: data.userName,
          phone: data.userPhoneNumber,
          pricePerHour: data.userPricePerHour,
          location: chosenLocation,
          genres: chosenGenres.join(','),
          chosenInstrument: chosenInstrument.join(','),
          willingToTravel: isWillingToTravel,
          skills: [
            isSingByEar ? 'singByEar' : '',
            isPlayByEar ? 'playByEar' : '',
            isReadSheetMusic ? 'readSheetMusic' : '',
          ]
            .filter((f) => f.length)
            .join(','),
        },
        newUserImages,
      ).then(() => {
        runInAction(() => {
          UserNameState.name = data.userName
        })
      })
    }
    return
  }
  // Confirm delete account
  const [isOpenConfirmWindow, setOpenConfirmWindow] = useState(false)
  const [isConfirmDeleteAccount, setConfirmDeleteAccount] = useState(false)
  const delAccount = () => {
    deleteAccount(AccountStore.account.id).then(() => {
      setOpenConfirmWindow(false)
      navigate.navigate('OnBoardingScreen')
    })
  }
  const [isCloseAllDropdown, setCloseAllDropdown] = useState(false)
  useEffect(() => {
    if (isCloseAllDropdown === true) {
      toggling(false)
      setTimeout(() => {
        setCloseAllDropdown(false)
      }, 0)
    }
  }, [isCloseAllDropdown])
  return (
    <Animated.View
      style={{
        zIndex: 1000,
        // height: windowHeight,
         width,
        //width: '100%',
        height: '100%',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: isOpenTab ? 0 : '100%',
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
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <FormScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
          >
            {/* Avatar upload from user */}
            <UserAvatarBlock>
              <UserAvatarContainer>
                <UserAvatar>
                  {newAvatar !== null ? (
                    <Image
                      source={{ uri: newAvatar.uri }}
                      style={{ width: 120, height: 120 }}
                      resizeMode="stretch"
                    />
                  ) : (
                    <Image
                      source={{
                        uri: newUserImages[0]?.uri,
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
            <View style={{ paddingHorizontal: 16 }}>
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
                    contractorAccountData?.userPhoneNumber !==
                    userPhoneNumberWatch
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
              {/* <Controller
                control={control}
                rules={{
                  required: false,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInputBlock>
                    <FormInputContainer>
                      <FormInput
                        inputLabel={inputLocationLabel}
                        selectionColor={C.lightGray}
                        placeholder={'Enter your location'}
                        cursorColor={C.inputCursor}
                        onFocus={() => {
                          setInputFocus5(C.black)
                        }}
                        onBlur={() => {
                          onBlur
                          setInputFocus5(C.lightGray)
                        }}
                        onChangeText={onChange}
                        value={value}
                        style={{
                          borderColor: inputFocus5,
                          borderWidth: 1,
                          color: C.black,
                        }}
                      />
                    </FormInputContainer>
                    <FormInputLabel inputLabel={inputLocationLabel}>
                      Your location
                    </FormInputLabel>
                  </FormInputBlock>
                )}
                name="userLocation"
              /> */}

              {/* Price per hour */}
              <Controller
                control={control}
                render={({ field: { onChange, onBlur } }) => (
                  <FormInputBlock>
                    <FormInputContainerPhone>
                      <MaskInput
                        maxLength={5}
                        cursorColor={C.inputCursor}
                        onFocus={() => {
                          setInputFocus7(C.black)
                        }}
                        onBlur={() => {
                          onBlur
                          setInputFocus7(C.lightGray)
                        }}
                        keyboardType="numeric"
                        style={{
                          width: '100%',
                          flex: 1,
                          height: 48,
                          paddingLeft: pricePerHourInput.length > 0 ? 30 : 16,
                          // opacity: 0,
                          borderRadius: 6,
                          borderColor: inputFocus7,
                          fontSize: 17,
                          fontFamily: F.regular,
                          paddingTop: pricePerHourLabel === true ? 13 : 0,
                          borderWidth: errors.userPricePerHour ? 2 : 1,
                          color: 'transparent',
                        }}
                        placeholderTextColor={'transparent'}
                        value={pricePerHourInput}
                        onChangeText={(masked) => {
                          onChange(masked)
                          setPricePerHourInput(masked)
                        }}
                        placeholder={'Enter your price per hour'}
                        mask={S.perHourMaskPattern}
                      />
                      <FormInputPricePerHourBlock>
                        <FormInputPricePerHourText
                          style={{
                            opacity: pricePerHourInput.length > 0 ? 1 : 0.4,
                            top: pricePerHourInput.length > 0 ? 1 : -7,
                            color: C.black,
                          }}
                        >
                          {pricePerHourInput.length > 0
                            ? `$ ${addDotForNumber(pricePerHourInput)}/hour`
                            : 'Enter your price per hour'}
                        </FormInputPricePerHourText>
                      </FormInputPricePerHourBlock>
                    </FormInputContainerPhone>
                    <FormInputLabel inputLabel={pricePerHourLabel}>
                      Price
                    </FormInputLabel>
                  </FormInputBlock>
                )}
                name="userPricePerHour"
              />
            </View>

            {/* Search music genre */}
            <SearchInputDropSelect
              dataForChoose={S.Genres}
              alreadyChosenInstrument={chosenGenres}
              searchPlaceholder={'Choose music genres'}
              getChosenData={getChosenGenres}
              isCloseAllDropdown={isCloseAllDropdown}
            />
            {/* Search instruments */}

            <SearchInputDropSelect
              dataForChoose={S.Instruments}
              alreadyChosenInstrument={chosenInstrument}
              searchPlaceholder={'Choose instruments'}
              getChosenData={getChosenInstrument}
              isCloseAllDropdown={isCloseAllDropdown}
            />
            {/* Media */}
            <MediaImagePicker
              isAdCreateOrEdit={true}
              setNewUserImages={setNewUserImages}
              userImages={newUserImages}
            />

            {/* Willing to travel */}
            <View style={{ paddingHorizontal: 16 }}>
              <CheckBoxWithText
                checkboxState={isWillingToTravel}
                setCheckboxState={setWillingToTravel}
                checkboxTitle={'Willing to travel interstate for gigs'}
              />

              {/* Skills */}
              <CheckboxBlock>
                <CheckboxBlockTitle>Skills:</CheckboxBlockTitle>

                {/* Sing by ear */}
                <CheckBoxWithText
                  checkboxState={isSingByEar}
                  setCheckboxState={setSingByEar}
                  checkboxTitle={'Sing by ear'}
                />

                {/* Play By ear */}
                <CheckBoxWithText
                  checkboxState={isPlayByEar}
                  setCheckboxState={setPlayByEar}
                  checkboxTitle={'Play By ear'}
                />

                {/* Read sheet music */}
                <CheckBoxWithText
                  checkboxState={isReadSheetMusic}
                  setCheckboxState={setReadSheetMusic}
                  checkboxTitle={'Read sheet music'}
                />
              </CheckboxBlock>
            </View>

            <View style={{ paddingHorizontal: 16 }}>
              {/* Delete Account */}
              <LogOutButton
                onPress={() => {
                  setOpenConfirmWindow(true)
                }}
              >
                <LogOutButtonText>Delete Account</LogOutButtonText>
              </LogOutButton>
            </View>
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

export default PersonalMusicianInfoTab
