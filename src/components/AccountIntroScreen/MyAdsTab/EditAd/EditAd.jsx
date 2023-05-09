import React from 'react'
import { useState, useEffect, useRef } from 'react'
import {
  Animated,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
// Components
import AccountsTabHeader from '../../AccountsTabHeader'
import SearchInputDropSelect from '@/components/Dropdowns/SearchInputDropSelect'
import SearchLocationDropSelect from '@/components/Dropdowns/SearchLocationDropSelect'
import MediaImagePicker from '@/components/MediaImagePicker'
import DropSelectCalendar from '@/components/Dropdowns/DropSelectCalendar'
import TimePeriodPicker from '@/components/TimePeriodPicker'
import DropSelect from '@/components/Dropdowns/DropSelect'
import CheckBoxWithText from '@/components/Buttons/CheckBoxWithText'
import BottomConfirmPopup from '@/components/BottomConfirmPopup'

// Helpers
import MaskInput from 'react-native-mask-input'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateOfferPreview } from './useAnimateOfferPreview'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { addDotForNumber } from '@/components/helpers/addDotForNumber'
import { compareTwoArrays } from '@/components/helpers/compareTwoArrays'
import { backHandler } from '../../backHandler'

// Images
import IMAGES from '@/res/images'
const { ErrorIcon } = IMAGES
// Variables
import C from '@/res/colors'
import F from '@/res/fonts'
import { S } from '@/res/strings'
// Styles
import { style } from './style'
const {
  FilterContainer,
  FormScrollView,
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
import { useMapSearchApiStore } from '@/stores/MapSearchApi'
import AccountStore, {
  getMyAds,
  updateAd,
} from '../../../../stores/AccountStore'

const EditAd = observer(({ isOpenTab }) => {
  const [contractorAccountData, setData] = useState(null)
  const isKeyboardOpen = isKeyboardShown()

  const { windowHeight, windowWidth } = getWindowDimension()

  // Form
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { dirtyFields, errors, isSubmitting },
  } = useForm({
    defaultValues: {
      adTitle: '',
      adDescription: '',
      adLocation: '',
      userPricePerHour: '',
    },
  })

  // Store
  const {
    contractorAccountDataApi,
    setOpenTabs,
    adIdForEdit,
    setAdIdForEdit,
    setEditedAd,
  } = useAccountApiStore()
  const { userCoordsFromSearch, setCoordsFromSearch } = useMapSearchApiStore()
  const { onPress, width } = useAnimateOfferPreview()

  useEffect(() => {
    if (!contractorAccountData) {
      getMyAds().then((r) => {
        const ads = r
        const current = ads.find((a) => a.id == adIdForEdit)
        setData(current)
      })
    }
  }, [adIdForEdit, contractorAccountData])

  useEffect(() => {
    if (isOpenTab === true) {
      onPress(true)
    }
  }, [isOpenTab])

  // Handler for native back button
  const tabNameToClose = 'Edit ad'
  backHandler(onPress, setOpenTabs, tabNameToClose)

  const userImagesFromStore = contractorAccountData?.adImage

  const adTitleFromStore = contractorAccountData?.adTitle
  const userDescriptionFromStore = contractorAccountData?.adDescription

  const adLocationFromStore = contractorAccountData?.adLocation
  const adDateFromStore = contractorAccountData?.adDate

  const eventStartFromStore = contractorAccountData?.eventStart
  const eventEndFromStore = contractorAccountData?.eventEnd
  const adPricePerHourFromStore = contractorAccountData?.userPricePerHour
  const adMusicianTypeFromStore = contractorAccountData?.adTypeOfMusician

  const adGenresFromStore = contractorAccountData?.adGenres
  const adInstrumentsFromStore = contractorAccountData?.adMusicalInstrument
  // Checkboxes
  const userSingByEarFromStore = contractorAccountData?.adSkills.singByEar
  const userPlayByEarFromStore = contractorAccountData?.adSkills.playByEar
  const userReadSheetMusicFromStore =
    contractorAccountData?.adSkills.readSheetMusic
  // Ad location
  const [chosenLocation, getChosenLocation] = useState('')
  const [isOpenLocationDropList, setOpenLocationDropList] = useState(false)
  // Get coords from string location
  useEffect(() => {
    if (chosenLocation?.length > 0) {
      setCoordsFromSearch(chosenLocation)
    }
  }, [chosenLocation])

  // Calendar
  const [isCalendarOpen, setCalendarOpen] = useState(false)
  const [chosenDate, getChosenDate] = useState({
    milliseconds: '',
    string: '',
  })
  //Time range
  const [timeRange, setTimeRange] = useState({
    startTime: {
      milliseconds: '',
      string: '',
    },
    endTime: {
      milliseconds: '',
      string: '',
    },
    duration: 0,
  })
  // Musician type
  const [isOpen, setIsOpen] = useState(false)
  const [musicianType, setMusicianType] = useState(null)
  const toggling = (state) => setIsOpen(state)
  const onMusicianTypeSelect = (value) => () => {
    setMusicianType(value)
    setIsOpen(false)
  }
  // Price per hour input
  const [pricePerHourInput, setPricePerHourInput] = useState('')
  // Genres Search
  const [chosenGenres, getChosenGenres] = useState([])
  // Instruments Search
  const [chosenInstrument, getChosenInstrument] = useState([])
  // Local user images state
  const [newUserImages, setNewUserImages] = useState([])

  // Skills
  const [isSingByEar, setSingByEar] = useState(false)
  const [isPlayByEar, setPlayByEar] = useState(false)
  const [isReadSheetMusic, setReadSheetMusic] = useState(false)
  const [isWillingToTravel, setWillingToTravel] = useState(false)

  // Set data to fields from store
  useEffect(() => {
    if (contractorAccountData && contractorAccountData !== undefined) {
      setValue('adTitle', adTitleFromStore)
      setValue('adDescription', userDescriptionFromStore)
      getChosenGenres(adGenresFromStore.split(','))
      getChosenInstrument(adInstrumentsFromStore.split(','))
      setValue('userPricePerHour', `${adPricePerHourFromStore}`)
      setPricePerHourInput(`${adPricePerHourFromStore}`)
      setMusicianType(adMusicianTypeFromStore)
      setNewUserImages(userImagesFromStore)
      setSingByEar(userSingByEarFromStore == 'true')
      setPlayByEar(userPlayByEarFromStore == 'true')
      setReadSheetMusic(userReadSheetMusicFromStore == 'true')
      setWillingToTravel(contractorAccountData.willingToTravel == 'true')
    }
  }, [contractorAccountData])

  const adTitleWatch = watch('adTitle')
  const userDescriptionWatch = watch('adDescription')
  const userPricePerHourWatch = watch('userPricePerHour')

  // Full name input
  const [inputFocus2, setInputFocus2] = useState(C.lightGray)
  const [inputFocus3, setInputFocus3] = useState(C.lightGray)
  const [inputFocus7, setInputFocus7] = useState(C.lightGray)

  // Shift label state
  const [inputNameLabel, setInputNameLabel] = useState(false)
  const [inputDescriptionLabel, setInputDescriptionLabel] = useState(false)
  const [descriptionHeight, setDescriptionHeight] = useState(48)

  const [pricePerHourLabel, setPricePerHourLabel] = useState(false)

  // Is show submit button
  const [isShowSubmitButton, setShowSubmitButton] = useState(false)
  const [isSomeFieldChange, setSomeFieldChange] = useState(false)

  const [isCheckError, setCheckError] = useState(false)
  const [isCanSubmit, setCanSubmit] = useState(false)

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

  // Is changed data
  useEffect(() => {
    if (!contractorAccountData) return
    const isChangedUserNameWatch = adTitleWatch !== adTitleFromStore
    const isChangedUserDescriptionWatch =
      userDescriptionWatch !== userDescriptionFromStore

    const isChangedDate =
      chosenDate.milliseconds !== adDateFromStore?.milliseconds
    const isChangedStartTime =
      timeRange.startTime.milliseconds != eventStartFromStore.milliseconds
    const isChangedEndTime =
      timeRange.endTime.milliseconds != eventEndFromStore.milliseconds
    const isChangedLocation = chosenLocation !== adLocationFromStore

    const isChangedUserPricePerHourWatch =
      userPricePerHourWatch !== `${adPricePerHourFromStore}`
    const isChangedMusicianType = adMusicianTypeFromStore !== musicianType

    const isSameUserGenres = compareTwoArrays(chosenGenres, adGenresFromStore)
    const isSameUserInstruments = compareTwoArrays(
      chosenInstrument,
      adInstrumentsFromStore,
    )
    const isSameUserImages = compareTwoArrays(
      newUserImages,
      userImagesFromStore,
    )

    const isChangedUserSingByEar = isSingByEar !== userSingByEarFromStore
    const isChangedUserPlayByEar = isPlayByEar !== userPlayByEarFromStore
    const isChangedUserReadSheetMusic =
      isReadSheetMusic !== userReadSheetMusicFromStore

    if (
      isChangedUserNameWatch ||
      isChangedUserDescriptionWatch ||
      isChangedUserPricePerHourWatch ||
      isChangedMusicianType ||
      !isSameUserGenres ||
      !isSameUserInstruments ||
      !isSameUserImages ||
      isChangedUserSingByEar ||
      isChangedUserPlayByEar ||
      isChangedUserReadSheetMusic ||
      isChangedDate ||
      isChangedStartTime ||
      isChangedEndTime ||
      isChangedLocation
    ) {
      setSomeFieldChange(true)
    } else {
      setSomeFieldChange(false)
    }
  }, [
    adTitleFromStore,
    userDescriptionFromStore,
    adLocationFromStore,
    adPricePerHourFromStore,
    adTitleWatch,
    userDescriptionWatch,
    chosenLocation,
    userPricePerHourWatch,
    //
    chosenGenres,
    adGenresFromStore,
    chosenInstrument,
    adInstrumentsFromStore,
    newUserImages,
    userImagesFromStore,
    isSingByEar,
    userSingByEarFromStore,
    isPlayByEar,
    userPlayByEarFromStore,
    isReadSheetMusic,
    userReadSheetMusicFromStore,

    chosenDate?.milliseconds,
    adDateFromStore?.milliseconds,
    timeRange?.startTime?.milliseconds,
    eventStartFromStore?.milliseconds,
    timeRange?.endTime?.milliseconds,
    eventEndFromStore?.milliseconds,
    adMusicianTypeFromStore,
    musicianType,
  ])

  // Is show error in unhandled hook form field
  const [isShowLocationError, setShowLocationError] = useState(false)
  const [isShowDateError, setShowDateError] = useState(false)
  const [isShowStartTimeError, setShowStartTimeError] = useState(false)
  const [isShowEndTimeError, setShowEndTimeError] = useState(false)
  const [isShowMusicianTypeError, setShowMusicianTypeError] = useState(false)
  const [isShowImagesError, setShowImagesError] = useState(false)

  useEffect(() => {
    if (isSubmitting === true && !isCanSubmit) {
      setCheckError(true)
    }

    const isEmptyLocation = chosenLocation.length < 5
    const isEmptyDate = typeof chosenDate.milliseconds === 'string'
    const isEmptyStartTime =
      typeof timeRange.startTime.milliseconds === 'string'
    const isEmptyEndTime = typeof timeRange.endTime.milliseconds === 'string'
    const isEmptyMusicianType = musicianType === null
    const isEmptyImages = newUserImages.length === 0

    // Location check
    if (isEmptyLocation && isCheckError === true) {
      setShowLocationError(true)
    }
    if (!isEmptyLocation && isCheckError === true) {
      setShowLocationError(false)
    }

    // Date check
    if (isEmptyDate && isCheckError === true) {
      setShowDateError(true)
    }
    if (!isEmptyDate && isCheckError === true) {
      setShowDateError(false)
    }

    // Start time check
    if (isEmptyStartTime && isCheckError === true) {
      setShowStartTimeError(true)
    }
    if (!isEmptyStartTime && isCheckError === true) {
      setShowStartTimeError(false)
    }

    // End time check
    if (isEmptyEndTime && isCheckError === true) {
      setShowEndTimeError(true)
    }
    if (!isEmptyEndTime && isCheckError === true) {
      setShowEndTimeError(false)
    }

    // Musician type check
    if (isEmptyMusicianType && isCheckError === true) {
      setShowMusicianTypeError(true)
    }
    if (!isEmptyMusicianType && isCheckError === true) {
      setShowMusicianTypeError(false)
    }

    // Images check
    if (isEmptyImages && isCheckError === true) {
      setShowImagesError(true)
    }
    if (!isEmptyImages && isCheckError === true) {
      setShowImagesError(false)
    }

    if (
      !isEmptyLocation &&
      !isEmptyDate &&
      !isEmptyStartTime &&
      !isEmptyEndTime &&
      !isEmptyMusicianType &&
      !isEmptyImages
    ) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }, [
    isSubmitting,
    chosenLocation.length,
    chosenDate.milliseconds,
    isCheckError,
    timeRange.startTime,
    timeRange.endTime,
    musicianType,
    isCanSubmit,
    newUserImages.length,
  ])

  // Set shifting input label
  useEffect(() => {
    if (dirtyFields.adTitle === undefined || !adTitleWatch) {
      setInputNameLabel(false)
    }
    if (dirtyFields.adTitle !== undefined || adTitleWatch) {
      setInputNameLabel(true)
    }

    if (dirtyFields.adDescription === undefined || !userDescriptionWatch) {
      setInputDescriptionLabel(false)
    }
    if (dirtyFields.adDescription !== undefined || userDescriptionWatch) {
      setInputDescriptionLabel(true)
    }

    if (dirtyFields.userPricePerHour === undefined || !userPricePerHourWatch) {
      setPricePerHourLabel(false)
    }
    if (dirtyFields.userPricePerHour !== undefined || userPricePerHourWatch) {
      setPricePerHourLabel(true)
    }
  }, [
    adTitleWatch,
    userDescriptionWatch,
    userPricePerHourWatch,
    dirtyFields.adTitle,
    dirtyFields.adDescription,
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
  const onSubmit = (data) => {
    if (isCanSubmit === true) {
      scrollTop()
      setShowSubmitButton(false)
      setSomeFieldChange(false)
      const editedAd = {
        id: adIdForEdit,
        idClient: AccountStore.account.id,
        adTitle: data.adTitle,
        adLocation: chosenLocation,
        adImage: newUserImages,
        userPricePerHour: data.userPricePerHour,
        userCurrencyType: '$',
        adDescription: data.adDescription,
        adDate_string: chosenDate.string,
        adDate_milliseconds: chosenDate.milliseconds,
        eventStart_milliseconds: timeRange.startTime.milliseconds,
        eventEnd_milliseconds: timeRange.endTime.milliseconds,
        eventStart_string: timeRange.startTime.string,
        eventEnd_string: timeRange.endTime.string,
        eventEnd: timeRange.endTime,
        adTypeOfMusician: musicianType,
        adReview: ' ',
        adSkills_singByEar: isSingByEar.toString(),
        adSkills_playByEar: isPlayByEar.toString(),
        adSkills_readSheetMusic: isReadSheetMusic.toString(),
        adGenres: chosenGenres.join(','),
        adMusicalInstrument: chosenInstrument.join(','),
        coordinate_latitude: userCoordsFromSearch.region.latitude,
        coordinate_longitude: userCoordsFromSearch.region.latitude,
        coordinate_latitudeDelta: 0.04864195044303443,
        coordinate_longitudeDelta: 0.040142817690068,
        willingToTravel: isWillingToTravel.toString(),
      }

      updateAd(editedAd).then(() => {
        setEditedAd(editedAd)
        onPress(false)
        setTimeout(() => {
          setOpenTabs({
            tabName: 'Edit ad',
            isOpen: false,
          })
        }, 600)
      })

      return
    } else {
      return setCheckError(true)
    }
  }
  // Confirm delete account
  const [isOpenConfirmWindow, setOpenConfirmWindow] = useState(false)
  const [isConfirmDeleteAccount, setConfirmDeleteAccount] = useState(false)
  useEffect(() => {
    if (isConfirmDeleteAccount === true) {
      const withoutDeleted = contractorAccountDataApi[0].contractorAds.filter(
        (item) => item.id !== adIdForEdit,
      )
      onPress(false)
      setTimeout(() => {
        setOpenTabs({
          tabName: 'Edit ad',
          isOpen: false,
        })
        return runInAction(() => {
          set(contractorAccountDataApi[0], 'contractorAds', withoutDeleted)
          setAdIdForEdit(0)
        })
      }, 700)
    }
  }, [isConfirmDeleteAccount])
  const [isCloseAllDropdown, setCloseAllDropdown] = useState(false)
  useEffect(() => {
    if (isCloseAllDropdown === true) {
      toggling(false)
      // Set reset to default
      setTimeout(() => {
        setCloseAllDropdown(false)
      }, 0)
    }
  }, [isCloseAllDropdown])

  return (
    <Animated.View
      style={{
        zIndex: 1000,
        height: windowHeight,
        // width: windowWidth,
        width,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        paddingBottom: 50,
      }}
    >
      <FilterContainer style={{ height: windowHeight, width: windowWidth }}>
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
            {/* Header */}
            <AccountsTabHeader
              tabName={'Edit Ad'}
              setOpenTabs={setOpenTabs}
              onPress={onPress}
            />
            <View style={{ paddingHorizontal: 16 }}>
              {/* Ad title */}
              <Controller
                control={control}
                rules={{
                  required: S.inputRequired,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInputBlock
                    style={{
                      marginBottom:
                        errors.adTitle?.type === 'required'
                          ? 35
                          : errors.adTitle?.type === 'pattern'
                          ? 60
                          : 13,
                    }}
                  >
                    <FormInputContainer>
                      <FormInput
                        inputLabel={inputNameLabel}
                        selectionColor={C.lightGray}
                        placeholder={'Enter event title'}
                        placeholderTextColor={C.placeholder}
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
                          borderColor: errors.adTitle ? C.red : inputFocus2,
                          borderWidth: errors.adTitle ? 2 : 1,
                          color: errors.adTitle ? C.red : C.black,
                        }}
                      />
                      {errors.adTitle && (
                        <ShowPasswordIconButton>
                          <ErrorIcon width={20} height={20} />
                        </ShowPasswordIconButton>
                      )}
                    </FormInputContainer>
                    <FormInputLabel
                      isError={errors.adTitle}
                      inputLabel={inputNameLabel}
                    >
                      Event title
                    </FormInputLabel>

                    {errors.adTitle?.type === 'required' && (
                      <ErrorMessage>{S.inputRequired}</ErrorMessage>
                    )}
                  </FormInputBlock>
                )}
                name="adTitle"
              />

              {/* Ad Description  */}
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInputBlock
                    style={{
                      minHeight: 60,
                      maxHeight: 153,
                    }}
                  >
                    <FormInputContainer>
                      <FormTextInput
                        inputLabel={inputDescriptionLabel}
                        selectionColor={C.lightGray}
                        multiline={true}
                        numberOfLines={5}
                        placeholder={'Add description (optional)'}
                        placeholderTextColor={C.placeholder}
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
                          minHeight:
                            descriptionHeight >= 153 ? 153 : descriptionHeight,
                          maxHeight: 153,
                          textAlignVertical: 'top',
                          color: C.black,
                        }}
                      />
                    </FormInputContainer>
                    <FormInputLabel inputLabel={inputDescriptionLabel}>
                      Event description
                    </FormInputLabel>
                  </FormInputBlock>
                )}
                name="adDescription"
              />
            </View>

            {/* Search location */}
            <SearchLocationDropSelect
              setParentShowOpenDrop={setOpenLocationDropList}
              setFilterLocation={getChosenLocation}
              isCloseAllDropdown={isCloseAllDropdown}
              placeholderText={'Location'}
              existedLocation={adLocationFromStore}
              isRequiredShowError={isShowLocationError}
            />

            {/* Set date */}

            <DropSelectCalendar
              setFilterDate={getChosenDate}
              setCalendarOpen={setCalendarOpen}
              isCloseAllDropdown={isCloseAllDropdown}
              placeholderText={'Date'}
              isExistedDate={adDateFromStore}
              isRequiredShowError={isShowDateError}
            />

            {/* Set time */}
            <TimePeriodPicker
              setTimeRange={setTimeRange}
              existedStartTimePlaceholder={eventStartFromStore}
              existedEndTimePlaceholder={eventEndFromStore}
              existedDuration={1}
              isRequiredShowStartError={isShowStartTimeError}
              isRequiredShowEndError={isShowEndTimeError}
            />

            {/* Opacity bg that show if calendar or location open and close it on press */}
            {(isCalendarOpen === true || isOpenLocationDropList === true) && (
              <Pressable
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: C.opacity20white,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  zIndex: 999,
                }}
                onPress={() => {
                  Keyboard.dismiss()
                  setCloseAllDropdown(true)
                }}
              ></Pressable>
            )}

            {/* Price per hour */}
            <View style={{ paddingHorizontal: 16 }}>
              <Controller
                control={control}
                rules={{
                  required: S.inputRequired,
                  minLength: 2,
                }}
                render={({ field: { onChange, onBlur } }) => (
                  <FormInputBlock
                    style={{
                      marginBottom:
                        errors.userPricePerHour?.type === 'required' ||
                        errors.userPricePerHour?.type === 'minLength'
                          ? 35
                          : 13,
                    }}
                  >
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
                          borderRadius: 6,
                          borderColor: inputFocus7,
                          fontSize: 17,
                          fontFamily: F.regular,
                          paddingTop: pricePerHourLabel === true ? 13 : 0,
                          borderColor: errors.userPricePerHour
                            ? C.red
                            : inputFocus2,
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
                            opacity: pricePerHourInput.length > 0 ? 1 : 0.7,
                            top: pricePerHourInput.length > 0 ? 1 : -7,
                            color: C.black,
                          }}
                        >
                          {pricePerHourInput.length > 0
                            ? `$ ${addDotForNumber(pricePerHourInput)}/hour`
                            : 'Enter your price per hour'}
                        </FormInputPricePerHourText>
                      </FormInputPricePerHourBlock>
                      {errors.userPricePerHour && (
                        <ShowPasswordIconButton>
                          <ErrorIcon width={20} height={20} />
                        </ShowPasswordIconButton>
                      )}
                    </FormInputContainerPhone>
                    <FormInputLabel inputLabel={pricePerHourLabel}>
                      Price
                    </FormInputLabel>

                    {errors.userPricePerHour?.type === 'required' && (
                      <ErrorMessage>{S.inputRequired}</ErrorMessage>
                    )}
                    {errors.userPricePerHour?.type === 'minLength' && (
                      <ErrorMessage>Minimum 2 digit</ErrorMessage>
                    )}
                  </FormInputBlock>
                )}
                name="userPricePerHour"
              />
            </View>

            {/* Musician type */}
            <DropSelect
              selectedValue={musicianType}
              toggling={toggling}
              isOpen={isOpen}
              onSelect={onMusicianTypeSelect}
              dropHeader={'Type of musician'}
              dropOptions={['Anyone', 'Singer', 'Musician', 'Band']}
              isRequiredShowError={isShowMusicianTypeError}
            />
            {/* Search music genre */}
            <SearchInputDropSelect
              dataForChoose={S.Genres}
              alreadyChosenInstrument={chosenGenres}
              searchPlaceholder={'Music genres'}
              getChosenData={getChosenGenres}
              isCloseAllDropdown={isCloseAllDropdown}
            />

            {/* Search instruments */}
            <SearchInputDropSelect
              dataForChoose={S.Instruments}
              alreadyChosenInstrument={chosenInstrument}
              searchPlaceholder={'Preference instrument'}
              getChosenData={getChosenInstrument}
              isCloseAllDropdown={isCloseAllDropdown}
            />

            {/* Skills */}
            <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
              <CheckboxBlock>
                <CheckboxBlockTitle>Musician skills:</CheckboxBlockTitle>

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
                <CheckBoxWithText
                  checkboxState={isWillingToTravel}
                  setCheckboxState={setWillingToTravel}
                  checkboxTitle={'Willing to travel'}
                />
              </CheckboxBlock>
            </View>

            {/* Media */}
            <MediaImagePicker
              isAdCreateOrEdit={true}
              setNewUserImages={setNewUserImages}
              userImages={newUserImages}
              isRequiredShowError={isShowImagesError}
            />

            {/* Delete Add */}
            <View
              style={{
                paddingHorizontal: 16,
                marginBottom: isShowSubmitButton === true ? 70 : 0,
              }}
            >
              <LogOutButton
                onPress={() => {
                  setOpenConfirmWindow(true)
                }}
              >
                <LogOutButtonText>Delete Ad</LogOutButtonText>
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
          setConfirm={setConfirmDeleteAccount}
          confirmBtnText={'Delete Add'}
          popupMainText={'Are you sure you want to delete this event?'}
        />
      )}
    </Animated.View>
  )
})

export default EditAd
