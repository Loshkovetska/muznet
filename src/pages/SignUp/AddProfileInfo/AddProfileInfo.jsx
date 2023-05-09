import React, { useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react'
import {
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
// Components
import ModalWindow from '@/components/ModalWindow'
import SelectProfileType from './SelectProfileType'
import SelectMusicianType from './SelectMusicianType'
import SelectWithSearch from './SelectWithSearch'
import DropSelect from '@/components/Dropdowns/DropSelect'
import CheckBoxWithText from '@/components/Buttons/CheckBoxWithText'

// Variables
import C from '@/res/colors'
import { S } from '@/res/strings'
import F from '@/res/fonts'

// Helpers
import MaskInput from 'react-native-mask-input'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { useNavigation, useRoute } from '@react-navigation/native'

import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { addDotForNumber } from '@/components/helpers/addDotForNumber'
// Mixins
import { M } from '@/res/mixin'
import domain from '@/res/domain'
import axios from 'axios'

const {
  ErrorMessage,
  ShowPasswordIconButton,
  DisableBtn,
  BlackBtnTextDisable,
  FormInputContainerPhone,
} = M

// Images
import IMAGES from '@/res/images'
const {
  GoBackIcon,
  RoundGreenCheckIcon,
  ErrorIcon,
  UploadPhotoIcon,
  EditIcon,
  CheckBlackIcon,
} = IMAGES

// Styles
import { style } from './style'
import { observer } from 'mobx-react-lite'
import { UserData } from '../VerifyScreen/VerifyScreen'
import SearchLocationDropSelect from '../../../components/Dropdowns/SearchLocationDropSelect/SearchLocationDropSelect'
import { UserNameState } from '../../Login/WelcomeBackScreen/WelcomeBackScreen'

const {
  Container,
  Header,
  StepBackButton,
  TabNumberIndication,
  TabNumberText,
  ProgressBar,
  ProgressBarLine,
  ContainerTitle,
  ContainerDescription,
  // Form
  Content,
  FormInputBlock,
  FormInputContainer,
  FormInputLabel,
  FormInput,
  FormInputPricePerHourBlock,
  FormInputPricePerHourText,
  CheckboxBlock,
  CheckboxBlockTitle,
  // Submit
  ButtonSubmitBlock,
  // ButtonSubmitBlockSkip,
  // ButtonSubmitBlockSkipText,
  ButtonSubmit,
  ButtonSubmitText,
  ContentBlock,

  // Main Info
  UserMainInfoContainer,
  UserAvatarBlock,
  UserAvatarContainer,
  UserAvatar,
  UserAvatarReplaceButton,
  UserAvatarButton,
  UserAvatarButtonText,
} = style

// Sign up flow content
const SignUpContentContractor = S.SignUpContentContractor
const SignUpContentMusician = S.SignUpContentMusician
const SignUpContentBand = S.SignUpContentBand

const AddProfileInfo = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const isKeyboardOpen = isKeyboardShown()
  const { windowHeight, windowWidth } = getWindowDimension()

  // Tab logic
  const [screenNumber, setScreenNumber] = useState(0)
  // const [screenNumberFull, setScreenNumberFull] = useState(4);

  // Flow type
  const [isContractor, setContractorFlow] = useState(true)
  // Check is musician or band flow
  const [isMusician, setMusicianFlow] = useState(true)
  // Set musician or band data
  const [isMusicianData, setMusicianData] = useState(true)
  useEffect(() => {
    if (isMusician === false) {
      setMusicianData(SignUpContentBand)
    } else {
      setMusicianData(SignUpContentMusician)
    }
  }, [isMusician])

  // Flow data
  const isContractorData =
    isContractor === true ? SignUpContentContractor : isMusicianData
  // Tab number / Header
  const tabNumber = isContractorData[screenNumber].tabNumber
  const tabFullNumber = isContractorData[screenNumber].fullNumber
  const title = isContractorData[screenNumber].title
  const text = isContractorData[screenNumber].text
  const progressWidth = isContractorData[screenNumber].progressWidth
  // Is disable button
  const [isDisableButton, setIsDisableButton] = useState(false)
  // Form
  const [isCloseAllDropdown, setCloseAllDropdown] = useState(false)

  const {
    control,
    handleSubmit,
    resetField,
    setError,
    watch,
    clearErrors,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: {
      userNickName: UserNameState.loginByApple
        ? UserNameState.username || 'Anonym'
        : '',
      userName: UserNameState.loginByApple
        ? UserNameState.fname || 'Anonym'
        : '',
      userSurName: UserNameState.loginByApple
        ? UserNameState.lname || 'Anonym'
        : '',
      userDescription: '',
      userEmail: '',
      willingToTravel: '',

      singByEar: '',
      playByEar: '',
      readSheetMusic: '',
      userPricePerHour: '',
    },
  })
  const [chosenLocation, getChosenLocation] = useState('')
  const [isResetAll, setResetAll] = useState(false)
  // Tab 1 Name
  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const watchUserName = watch('userNickName')

  const [isNameExist, setIsNameExist] = useState()
  const [isListenNameInput, setIsListenNameInput] = useState(false)

  const usersBase = ['Us', 'User1234']
  const isExist = usersBase.find((item) => item === watchUserName)

  useEffect(() => {
    if (watchUserName.length > 1) {
      if (isExist === undefined) {
        clearErrors('userNickName')
        setIsNameExist(false)
        setInputFocus1(C.green)
        setIsDisableButton(false)
      }
      if (isExist !== undefined) {
        setError('userNickName', {
          type: 'value',
          message: S.userNameExistError,
        })
        setIsNameExist(true)
        setIsDisableButton(true)
      }
    }
    if (watchUserName.length > 0) {
      setIsListenNameInput(true)
    }
    if (watchUserName.length <= 1 && isListenNameInput) {
      setError('userNickName', {
        type: 'value',
        message: 'Minimum 2 characters',
      })
      setIsNameExist(true)
      setIsDisableButton(true)
    }
  }, [watchUserName, isListenNameInput])

  // Tab 2 Contractor/Musician
  const [userType, setUserType] = useState()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (UserNameState.loginByApple) {
        setScreenNumber(1)
      } else setScreenNumber(0)
    })
    return unsubscribe
  }, [navigation, UserNameState.loginByApple])

  const [isOpen, setIsOpen] = useState(false)
  const [positionType, setPositionType] = useState(null)
  const toggling = (state) => setIsOpen(state)
  const onPositionSelect = (value) => () => {
    setPositionType(value)
    setIsOpen(false)
  }

  // Tab 3 For musician
  const [musicianType, setMusicianType] = useState()

  // Tab Choose band members
  const [chosenBandMembers, getChosenBandMembers] = useState([])

  // Tab Choose musical instrument
  const [chosenInstrument, getChosenInstrument] = useState([])

  // Tab Choose genres
  const [chosenGenres, getChosenGenres] = useState([])

  // Tab Last with main user info
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
    const image = result.assets[0]
    if (image.fileSize * 0.000001 > 4) {
      Alert.alert('Cannot upload files larger than 4MB')
      return
    }

    if (!result.canceled) {
      setNewAvatar(image)
    }
  }
  // Full name input
  const [inputFocus2, setInputFocus2] = useState(C.lightGray)
  const [inputFocus8, setInputFocus8] = useState(C.lightGray)
  const [inputFocus3, setInputFocus3] = useState(C.lightGray)
  const [inputFocus4, setInputFocus4] = useState(C.lightGray)
  const [inputFocus5, setInputFocus5] = useState(C.lightGray)
  const [inputFocus7, setInputFocus7] = useState(C.lightGray)

  const [inputNameLabel, setInputNameLabel] = useState(false)
  const [inputSurNameLabel, setInputSurNameLabel] = useState(false)
  const [inputDescriptionLabel, setInputDescriptionLabel] = useState(false)
  const [inputEmailLabel, setInputEmailLabel] = useState(false)
  const [inputLocationLabel, setInputLocationLabel] = useState(false)
  const [pricePerHourLabel, setPricePerHourLabel] = useState(false)

  const [pricePerHourInput, setPricePerHourInput] = useState('')

  // Willing to travel interstate for gigs
  const [isWillingToTravel, setWillingToTravel] = useState(false)

  const [isSingByEar, setSingByEar] = useState(false)
  const [isPlayByEar, setPlayByEar] = useState(false)
  const [isReadSheetMusic, setReadSheetMusic] = useState(false)
  // Set shifting input label
  useEffect(() => {
    if (dirtyFields.userName === undefined) {
      setInputNameLabel(false)
    }
    if (dirtyFields.userName !== undefined) {
      setInputNameLabel(true)
    }
    if (dirtyFields.userSurName === undefined) {
      setInputSurNameLabel(false)
    }
    if (dirtyFields.userSurName !== undefined) {
      setInputSurNameLabel(true)
    }

    if (dirtyFields.userDescription === undefined) {
      setInputDescriptionLabel(false)
    }
    if (dirtyFields.userDescription !== undefined) {
      setInputDescriptionLabel(true)
    }

    if (dirtyFields.userEmail === undefined) {
      setInputEmailLabel(false)
    }
    if (dirtyFields.userEmail !== undefined) {
      setInputEmailLabel(true)
    }

    if (dirtyFields.userLocation === undefined) {
      setInputLocationLabel(false)
    }

    if (dirtyFields.userPricePerHour === undefined) {
      setPricePerHourLabel(false)
    }
    if (dirtyFields.userPricePerHour === true) {
      setPricePerHourLabel(true)
    }
  }, [
    dirtyFields.userName,
    dirtyFields.userSurName,
    dirtyFields.userDescription,
    dirtyFields.userEmail,
    dirtyFields.userPricePerHour,
  ])
  // Open modal window
  const [isModalOpen, setModalOpen] = useState(false)

  const AfterSubmitButtonAction = () => {
    setModalOpen(false)
    if (isContractor === true) {
      return navigation.navigate('ContractorStack', {
        screen: 'ContractorWelcomeScreen',
      })
    } else {
      return navigation.navigate('MusicianStack', {
        screen: 'MusicianWelcomeScreen',
      })
    }
  }

  // Submit
  const onSubmit = async (data) => {
    const userAvatar = newAvatar !== undefined ? newAvatar : null
    const userContractorPosition =
      positionType !== undefined ? positionType : null
    const userBandMember =
      chosenBandMembers !== undefined ? chosenBandMembers : null
    const userMusicalInstrument =
      chosenInstrument !== undefined ? chosenInstrument : null
    const userGenres = chosenGenres !== undefined ? chosenGenres : null

    if (data.willingToTravel !== undefined)
      data.willingToTravel = isWillingToTravel === 'true' ? true : false

    if (data.singByEar !== undefined) data.singByEar = isSingByEar
    if (data.playByEar !== undefined) data.playByEar = isPlayByEar
    if (data.readSheetMusic !== undefined)
      data.readSheetMusic = isReadSheetMusic

    const fd = new FormData()
    fd.append('email', UserData.email)
    fd.append('username', data.userNickName)
    fd.append('name', data.userName)
    fd.append('type', userType)
    fd.append('position', userContractorPosition || 'null')
    fd.append('surname', data.userSurName)
    fd.append(
      'description',
      data.userDescription?.length ? data.userDescription : '.',
    )
    fd.append('location', chosenLocation.length ? chosenLocation : '.')
    fd.append('phone', data.userEmail)
    fd.append('file', {
      name: userAvatar.fileName || 'photo',
      uri: userAvatar.uri,
      type: 'photo',
    })
    if (userType == 'Contractor') {
      fd.append('musiciantype', '0')
      fd.append('userPricePerHour', '0')
    } else {
      fd.append('musiciantype', musicianType)
      fd.append('chosenInstrument', chosenInstrument.join(','))
      fd.append('userGenres', userGenres.join(','))
      fd.append('willingToTravel', isWillingToTravel.toString())
      fd.append('userPricePerHour', pricePerHourInput || '0')
      fd.append(
        'skills',
        [
          data.singByEar ? 'singByEar' : '',
          data.playByEar ? 'playByEar' : '',
          data.readSheetMusic ? 'readSheetMusic' : '',
        ]
          .filter((f) => f.length)
          .join(','),
      )
      fd.append('membersGroup', userBandMember.join(','))
    }

    await axios
      .post(`${domain}updateuser`, fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      .then(async (res) => {
        if (res.data) {
          await AsyncStorage.setItem('@user', JSON.stringify(res.data))
          setUserType(null)
          setPositionType(null)
          setMusicianType(null)
          setModalOpen(true)
          resetField('userNickName')
          setNewAvatar(null)
          resetField('userName')
          resetField('userSurName')
          resetField('userDescription')
          resetField('userEmail')
          resetField('userLocation')
          resetField('userPricePerHour')
          resetField('singByEar')
          resetField('playByEar')
          resetField('readSheetMusic')
          setWillingToTravel(false)
          setInputLocationLabel(false)
          // setInputAddressLabel(false)
          setPricePerHourLabel(false)
          setCloseAllDropdown(true)
        }
      })
      .catch((e) => console.log('add user', e))

    return
  }
  // Check data and set next tab

  const formCheck = () => {
    switch (tabNumber) {
      case 1:
        if (isExist === undefined && watchUserName.length > 1) {
          setScreenNumber(1)
          setIsListenNameInput(true)
        }
        if (watchUserName.length < 1) {
          setError('userNickName', {
            type: 'value',
            message: 'Minimum 2 characters',
          })
        }
        break
      case 2:
        setScreenNumber(2)
        break
      case 3:
        setScreenNumber(3)
        break
      case 4:
        if (musicianType !== S.Band && userType !== S.Contractor) {
          setScreenNumber(4)
        }
        if (musicianType === S.Band) {
          setScreenNumber(4)
        }
        break
      case 5:
        if (musicianType !== S.Band && userType !== S.Contractor) {
          setScreenNumber(5)
        }
        if (musicianType === S.Band) {
          setScreenNumber(5)
        }
        break
      case 6:
        if (musicianType === S.Band) {
          setScreenNumber(6)
        }
        break
      default:
        break
    }
    return
  }

  // Musician and singer condition
  const isMusicianOrSinger =
    musicianType === S.Singer || musicianType === S.Musician
  const isBand = musicianType === S.Band
  // Is musician and singer choose instrument and genres
  const isInstrumentsSearchSelect = tabNumber === 4 && isMusicianOrSinger
  const isGenresSearchSelect = tabNumber === 5 && isMusicianOrSinger

  const isBandMembersSearchSelect = tabNumber === 4 && isBand
  const isBandInstrumentsSearchSelect = tabNumber === 5 && isBand
  const isBandGenresSearchSelect = tabNumber === 6 && isBand

  // Define when show last tab with main user info inputs
  const isContractorMainForm = tabNumber === 4 && userType === S.Contractor
  const isMusicianOrSingerMainForm = tabNumber === 6 && isMusicianOrSinger
  const isBandMainForm = tabNumber === 7 && isBand

  const typeOfForm =
    isContractorMainForm || isMusicianOrSingerMainForm || isBandMainForm

  // Button Disable/Active
  useEffect(() => {
    if (tabNumber === 1) {
      setIsDisableButton(true)
      // Active button if return from second tab
      if (watchUserName.length > 1) setIsDisableButton(false)
    }
    if (tabNumber === 2) {
      setIsDisableButton(true)
      if (userType !== undefined) setIsDisableButton(false)
    }
    if (tabNumber === 3 && userType === S.Contractor) {
      setIsDisableButton(true)
      if (positionType !== null) setIsDisableButton(false)
    }
    if (tabNumber === 3 && userType === S.Musician) {
      setIsDisableButton(true)
      if (musicianType !== undefined) setIsDisableButton(false)
    }
    // if (isInstrumentsSearchSelect) {
    //     if (chosenInstrument.length === 0) { setIsDisableButton(true) }
    //     else { setIsDisableButton(false) }
    // }
    // if (isGenresSearchSelect) {
    //     if (chosenGenres.length === 0) {
    //     }
    //     else { setIsDisableButton(false) }
    // }
  }, [
    tabNumber,
    positionType,
    userType,
    musicianType,
    chosenInstrument,
    chosenGenres,
  ])

  const isDisableScroll =
    !isInstrumentsSearchSelect ||
    !isGenresSearchSelect ||
    !isBandMembersSearchSelect ||
    isBandInstrumentsSearchSelect ||
    isBandGenresSearchSelect
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
            modalPic={
              <Image
                source={IMAGES.GifSuccessCheck}
                style={{
                  width: '120%',
                  height: '120%',
                }}
                resizeMode={'cover'}
                width={'100%'}
                height={'100%'}
              />
            }
            title={'Great!'}
            advice={'Your account has been successfully created'}
            setOpen={AfterSubmitButtonAction}
            btnText={'Get Started'}
          />
        )}
        {/* Header */}
        <Header>
          {tabNumber > 1 && (
            <StepBackButton
              onPress={() => {
                setScreenNumber(screenNumber - 1)
              }}
            >
              <GoBackIcon width={10} height={16} />
            </StepBackButton>
          )}
          <TabNumberIndication>
            <TabNumberText isActive={true}>{tabNumber}</TabNumberText>
            <TabNumberText> of {tabFullNumber}</TabNumberText>
          </TabNumberIndication>

          {/* Pregress bar */}
          <ProgressBar>
            <ProgressBarLine progressWidth={progressWidth}></ProgressBarLine>
          </ProgressBar>

          {/* Title */}
          <ContainerTitle>{title}</ContainerTitle>
          <ContainerDescription>{text}</ContainerDescription>
        </Header>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
            // height: '0%',
          }}
        >
          <Content
            style={{
              width: windowWidth,
              paddingBottom: isKeyboardOpen !== true ? 100 : '100%',
              marginBottom: isKeyboardOpen === true ? 90 : 120,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* =========== Tab 1 =========== */}
            {tabNumber === 1 && (
              <Controller
                control={control}
                rules={{
                  required: S.userNameExistError,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInputBlock
                    style={{
                      marginBottom: errors.userNickName ? 40 : 13,
                    }}
                  >
                    <FormInputContainer>
                      <FormInput
                        selectionColor={C.lightGray}
                        placeholder={'Username'}
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
                          borderColor: errors.userNickName
                            ? C.red
                            : inputFocus1,
                          borderWidth: errors.userNickName ? 2 : 1,
                          color: errors.userNickName ? C.red : C.black,
                        }}
                      />
                      {errors.userNickName && (
                        <ShowPasswordIconButton>
                          <ErrorIcon width={20} height={20} />
                        </ShowPasswordIconButton>
                      )}
                      {isNameExist === false && (
                        <ShowPasswordIconButton>
                          <RoundGreenCheckIcon width={24} height={24} />
                        </ShowPasswordIconButton>
                      )}
                    </FormInputContainer>

                    {errors.userNickName && (
                      <ErrorMessage>{errors.userNickName.message}</ErrorMessage>
                    )}
                  </FormInputBlock>
                )}
                name="userNickName"
              />
            )}

            {/* =========== Tab 2 =========== */}
            {tabNumber === 2 && (
              <SelectProfileType
                userType={userType}
                setUserType={setUserType}
                setIsDisableButton={setIsDisableButton}
                setContractorFlow={setContractorFlow}
              />
            )}

            {/* =========== Tab 3 Contractor =========== */}
            {tabNumber === 3 && userType === S.Contractor && (
              <View
                style={{
                  width: windowWidth - 5,
                  marginTop: -20,
                  marginLeft: -26,
                  paddingLeft: 16,
                  // marginRight: -20,
                  paddingBottom: '100%',
                }}
              >
                <DropSelect
                  selectedValue={positionType}
                  toggling={toggling}
                  isOpen={isOpen}
                  onSelect={onPositionSelect}
                  dropHeader={S.PositionOptions.dropHeader}
                  dropOptions={S.PositionOptions.dropOptions}
                />
              </View>
            )}

            {/* =========== Tab 3 Musician =========== */}
            {tabNumber === 3 && userType === S.Musician && (
              <SelectMusicianType
                musicianType={musicianType}
                setMusicianType={setMusicianType}
                setIsDisableButton={setIsDisableButton}
                setMusicianFlow={setMusicianFlow}
              />
            )}

            {/* =========== Tab Choose Band members =========== */}
            {isBandMembersSearchSelect && userType !== S.Contractor && (
              <SelectWithSearch
                dataForChoose={S.bandMembers}
                alreadyChosenInstrument={chosenInstrument}
                searchPlaceholder={'Search members type'}
                getChosenData={getChosenBandMembers}
              />
            )}

            {/* =========== Tab Choose instrument =========== */}
            {((isMusicianOrSinger && tabNumber === 4) ||
              isBandInstrumentsSearchSelect) &&
              userType !== S.Contractor && (
                <SelectWithSearch
                  dataForChoose={S.Instruments}
                  alreadyChosenInstrument={chosenInstrument}
                  searchPlaceholder={'Search instruments'}
                  getChosenData={getChosenInstrument}
                />
              )}

            {/* =========== Tab Choose Genres =========== */}
            {((isMusicianOrSinger && tabNumber === 5) ||
              isBandGenresSearchSelect) && (
              <SelectWithSearch
                dataForChoose={S.Genres}
                searchPlaceholder={'Search music genres'}
                getChosenData={getChosenGenres}
              />
            )}

            {/* =========== Last tab with inputs  =========== */}
            {typeOfForm && (
              <UserMainInfoContainer>
                {/* User Avatar */}
                <UserAvatarBlock>
                  {/* Avatar upload from user */}
                  {newAvatar !== null ? (
                    <UserAvatarContainer>
                      <UserAvatar>
                        <Image
                          source={{ uri: newAvatar.uri }}
                          style={{ width: 120, height: 120 }}
                          resizeMode="stretch"
                        />
                      </UserAvatar>

                      <UserAvatarReplaceButton onPress={pickImage}>
                        <EditIcon width={16} height={16} />
                      </UserAvatarReplaceButton>
                    </UserAvatarContainer>
                  ) : (
                    <UserAvatarButton onPress={pickImage}>
                      <UploadPhotoIcon width={35} height={35} />
                      <UserAvatarButtonText>Upload photo</UserAvatarButtonText>
                    </UserAvatarButton>
                  )}
                </UserAvatarBlock>

                {/* User Name */}
                {!UserNameState.loginByApple && (
                  <>
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
                                borderColor: errors.userName
                                  ? C.red
                                  : inputFocus2,
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
                            Name
                          </FormInputLabel>

                          {errors.userName?.type === 'pattern' && (
                            <ErrorMessage>
                              {S.userNameSymbolExclude}
                            </ErrorMessage>
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
                                borderColor: errors.userSurName
                                  ? C.red
                                  : inputFocus8,
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
                            <ErrorMessage>
                              {S.userNameSymbolExclude}
                            </ErrorMessage>
                          )}
                          {errors.userSurName?.type === 'required' && (
                            <ErrorMessage>{S.inputRequired}</ErrorMessage>
                          )}
                        </FormInputBlock>
                      )}
                      name="userSurName"
                    />
                  </>
                )}
                {/* Phone */}
                <Controller
                  control={control}
                  rules={{
                    required: S.phoneNumberNotValid,
                    pattern: S.phoneMaskPattern,
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
                          placeholder={'Enter your phone'}
                          cursorColor={C.inputCursor}
                          keyboardType="phone-pad"
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
                        Phone
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
                {/* User Description  */}
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInputBlock>
                      <FormInputContainer>
                        <FormInput
                          inputLabel={inputDescriptionLabel}
                          selectionColor={C.lightGray}
                          placeholder={'Description (optional)'}
                          cursorColor={C.inputCursor}
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
                            color: C.black,
                          }}
                        />
                      </FormInputContainer>
                      <FormInputLabel inputLabel={inputDescriptionLabel}>
                        Description
                      </FormInputLabel>
                    </FormInputBlock>
                  )}
                  name="userDescription"
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

                {/* Willing to travel  */}
                {userType !== S.Contractor && (
                  <CheckBoxWithText
                    checkboxState={isWillingToTravel}
                    setCheckboxState={setWillingToTravel}
                    checkboxTitle={'Willing to travel interstate for gigs'}
                  />
                )}

                {/* Price per hour */}
                {userType !== S.Contractor && (
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur } }) => (
                      <FormInputBlock>
                        <FormInputContainerPhone>
                          <MaskInput
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
                              paddingLeft:
                                pricePerHourInput.length > 0 ? 30 : 16,
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
                )}

                {/* Skills checkbox */}
                {userType !== S.Contractor && (
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
                )}
              </UserMainInfoContainer>
            )}
            <View
              style={{
                height: 200,
              }}
            ></View>
          </Content>
        </KeyboardAvoidingView>

        {/* Buttons */}
        <ContentBlock isKeyboardOpen={isKeyboardOpen}>
          {/* Buttom for undefined user2 */}
          {tabNumber < 3 ? (
            isDisableButton === false ? (
              <ButtonSubmit onPress={formCheck}>
                <ButtonSubmitText>Next Step</ButtonSubmitText>
              </ButtonSubmit>
            ) : (
              <DisableBtn>
                <BlackBtnTextDisable>Next Step</BlackBtnTextDisable>
              </DisableBtn>
            )
          ) : null}
          {/* Next button for contractor */}
          {tabNumber > 2 && tabNumber < 4 && userType === S.Contractor ? (
            isDisableButton === false ? (
              <ButtonSubmit onPress={formCheck}>
                <ButtonSubmitText>Next Step</ButtonSubmitText>
              </ButtonSubmit>
            ) : (
              <DisableBtn>
                <BlackBtnTextDisable>Next Step</BlackBtnTextDisable>
              </DisableBtn>
            )
          ) : null}
          {/* Next button for singer or musician */}
          {userType === S.Musician && tabNumber > 2 && tabNumber < 6 ? (
            isDisableButton === false ? (
              <ButtonSubmit onPress={formCheck}>
                <ButtonSubmitText>Next Step</ButtonSubmitText>
              </ButtonSubmit>
            ) : (
              <DisableBtn>
                <BlackBtnTextDisable>Next Step</BlackBtnTextDisable>
              </DisableBtn>
            )
          ) : null}
          {isBandGenresSearchSelect && tabNumber === 6 ? (
            isDisableButton === false ? (
              <ButtonSubmit onPress={formCheck}>
                <ButtonSubmitText>Next Step</ButtonSubmitText>
              </ButtonSubmit>
            ) : (
              <DisableBtn>
                <BlackBtnTextDisable>Next Step</BlackBtnTextDisable>
              </DisableBtn>
            )
          ) : null}

          {/* Submit buttons in last tab */}
          {tabNumber === 4 && userType === S.Contractor && (
            <ButtonSubmitBlock>
              <ButtonSubmit onPress={handleSubmit(onSubmit)}>
                <ButtonSubmitText>Create an Account</ButtonSubmitText>
              </ButtonSubmit>
            </ButtonSubmitBlock>
          )}
          {tabNumber === 6 && isMusicianOrSinger && (
            <ButtonSubmitBlock>
              <ButtonSubmit ButtonSubmit onPress={handleSubmit(onSubmit)}>
                <ButtonSubmitText>Create an Account</ButtonSubmitText>
              </ButtonSubmit>
            </ButtonSubmitBlock>
          )}
          {tabNumber === 7 && isBand && (
            <ButtonSubmitBlock>
              <ButtonSubmit ButtonSubmit onPress={handleSubmit(onSubmit)}>
                <ButtonSubmitText>Create an Account</ButtonSubmitText>
              </ButtonSubmit>
            </ButtonSubmitBlock>
          )}

          {/* TODO set skip redirection with sending filled field  */}
          {/* <ButtonSubmitBlockSkip>

                        <ButtonSubmitBlockSkipText>
                            Skip this step
                        </ButtonSubmitBlockSkipText>
                    </ButtonSubmitBlockSkip> */}
          {/* <ContentBlockRow>

                        <ContainerText>
                            Already have an account?
                        </ContainerText>
                        <ContainerLink
                            onPress={() => {
                                navigation.navigate("LoginStack",
                                    { screen: "LoginScreen" }
                                )
                            }}
                        > 
                        onPress={handleSubmit(onSubmit)}
                            <ContainerLinkText>Sign In</ContainerLinkText>
                        </ContainerLink>
                    </ContentBlockRow> */}
        </ContentBlock>
      </Container>
    </>
  )
}

export default observer(AddProfileInfo)
