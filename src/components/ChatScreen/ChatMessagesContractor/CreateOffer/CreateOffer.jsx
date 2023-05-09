import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Animated,
  Keyboard,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
// Components
import DropSelectCalendar from '@/components/Dropdowns/DropSelectCalendar'
import TimePeriodPicker from '@/components/TimePeriodPicker'
import SearchLocationDropSelect from '@/components/Dropdowns/SearchLocationDropSelect'
import DropFlagSelect from '@/pages/SignUp/SignUpScreen/DropFlagSelect'

// Helpers
import MaskInput from 'react-native-mask-input'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateCreateOffer } from './useAnimateCreateOffer'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { addDotForNumber } from '@/components/helpers/addDotForNumber'
// Images
import IMAGES from '@/res/images'
const { CrossBlackIcon, LockGrayIcon } = IMAGES
// Variables
import C from '@/res/colors'
import F from '@/res/fonts'
import { S } from '@/res/strings'
// Styles
import { style } from './style'
const {
  FilterContainer,
  Header,
  HeaderClose,
  HeaderTitle,
  FilterBlock,
  ContentBlock,
  ContentBlockRow,
  ContainerLink,
  ContainerPrice,
  ContainerHour,
  ButtonSubmit,
  ButtonSubmitText,
  FormInputPricePerHourBlock,
  FormInputPricePerHourText,
  AddInfoBlock,
  AddInfoContainer,
  AddInfoInput,
  SecurePaymentMessage,
  SecurePaymentMessageText,
  SecurePaymentMessageReadMoreText,
} = style
// Mixins
import { M } from '@/res/mixin'
const {
  FormInput,
  ErrorMessage,
  FormInputBlock,
  FormInputLabel,
  FormInputContainer,
  FormInputContainerPhone,
} = M
// Store
import { observer } from 'mobx-react-lite'
import { useOfferToMusicianApiStore } from '@/stores/OfferToMusicianApi'
import { usePaymentAndPayoutApiStore } from '@/stores/PaymentAndPayoutApi'
import { runInAction } from 'mobx'
import { OfferDetailsState } from '../OfferPreview/OfferAddPaymentDetails/OfferAddPaymentDetails'

const CreateOffer = observer(({ isOpenCreateOffer }) => {
  const navigation = useNavigation()

  // Form
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
      offerTitle: '',
      offerDate: '',
      offerStartTime: '',
      offerEndTime: '',
      offerLocation: '',
      offerPricePerHour: '',
      offerPhoneNumber: '',
      offerAdditionalInfo: '',
    },
  })

  const route = useRoute()

  const {
    offerDetails,
    isOpenOfferPreview,
    setOpenCreateOffer,
    setOpenOfferPreview,
    setOfferDetails,
    isPaySuccesful,
    isOpenPaySuccesfulModal,
    setOpenPaySuccesfulModal,
    setFirstCreatedOffer,
  } = useOfferToMusicianApiStore()
  const {
    isOpenPaymentDetails,
    setOpenPaymentDetails,
  } = usePaymentAndPayoutApiStore()

  const isKeyboardOpen = isKeyboardShown()

  const { windowHeight, windowWidth } = getWindowDimension()
  const { onPress, height } = useAnimateCreateOffer()
  useEffect(() => {
    if (isOpenCreateOffer === true) {
      onPress(true)
    }
  }, [isOpenCreateOffer])

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
  // Get location
  const [chosenLocation, getChosenLocation] = useState('')
  const [isOpenLocationDropList, setOpenLocationDropList] = useState(false)
  // Price per hour
  const [inputFocus7, setInputFocus7] = useState(C.lightGray)
  const [pricePerHourLabel, setPricePerHourLabel] = useState(false)
  const [pricePerHourInput, setPricePerHourInput] = useState('')
  // Phone number
  const [phone, setPhone] = useState('')
  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const [inputPhoneLabel, setInputPhoneLabel] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [flagType, setPositionType] = useState({ icon: '', phonePattern: [] })
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

  const [inputFocus3, setInputFocus3] = useState(C.lightGray)

  // Add additional info
  const [inputFocus2, setInputFocus2] = useState(C.lightGray)
  const [additionalHeight, setAdditionalHeight] = useState(60)
  const additionalMessageWatch = watch('offerAdditionalInfo')
  const titleWatch = watch('offerTitle')

  // Set shifting input label
  useEffect(() => {
    if (dirtyFields.offerPhoneNumber === undefined) {
      setInputPhoneLabel(false)
    }
    if (dirtyFields.offerPhoneNumber === true) {
      setInputPhoneLabel(true)
    }
    if (dirtyFields.offerPricePerHour === undefined) {
      setPricePerHourLabel(false)
    }
    if (dirtyFields.offerPricePerHour === true) {
      setPricePerHourLabel(true)
    }
  }, [dirtyFields.offerPricePerHour, dirtyFields.offerPhoneNumber])

  const [isCloseAllDropdown, setCloseAllDropdown] = useState(false)
  useEffect(() => {
    if (isCloseAllDropdown === true) {
      // Set reset to default

      setCloseAllDropdown(false)
    }
  }, [isCloseAllDropdown])

  const [isHideAnimationTab, setHideAnimationTab] = useState(false)

  useEffect(() => {
    if (isHideAnimationTab === true) {
      onPress(false)
    }
  }, [isHideAnimationTab])

  const closePopup = () => {
    setHideAnimationTab(true)
    setTimeout(() => {
      setCloseAllDropdown(true)
      setOpenCreateOffer(false)
    }, 600)
  }
  const [previousOfferDetails, setPreviousOfferDetails] = useState({})

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isOpenCreateOffer === true && isOpenOfferPreview === false) {
          closePopup()
        }
        if (
          isOpenCreateOffer === false &&
          isOpenOfferPreview === false &&
          isOpenPaySuccesfulModal === false &&
          isOpenPaymentDetails === false
        ) {
          navigation.goBack()
        }

        if (
          isOpenCreateOffer === true &&
          isOpenOfferPreview === true &&
          isOpenPaymentDetails === false
        ) {
          setOfferDetails(previousOfferDetails)

          setOpenOfferPreview(false)
        }
        if (
          isOpenCreateOffer === true &&
          isOpenOfferPreview === true &&
          isOpenPaymentDetails === true
        ) {
          setOpenPaymentDetails(false)
        }
        if (isOpenPaySuccesfulModal === true) {
          setOpenPaySuccesfulModal(false)
        }
        return true
      },
    )
    return () => {
      backHandler.remove()
    }
  }, [
    isOpenCreateOffer,
    isOpenOfferPreview,
    isOpenPaySuccesfulModal,
    isOpenPaymentDetails,
    previousOfferDetails,
  ])

  // Is show price in footer
  const [isPriceInFooter, setPriceInFooter] = useState(false)
  useEffect(() => {
    const isTimeSelected = timeRange.endTime.milliseconds > 0
    const isPricePerHour = pricePerHourInput.length > 0

    if (isTimeSelected && isPricePerHour) {
      setPriceInFooter(true)
    } else {
      setPriceInFooter(false)
    }
  }, [timeRange, pricePerHourInput])
  // Is show submit button
  const [isShowSubmitButton, setShowSubmitButton] = useState(false)
  useEffect(() => {
    const isDateSelected = chosenDate.milliseconds > 0
    const isTimeSelected = timeRange.endTime.milliseconds > 0
    const isLocationSelected = chosenLocation !== undefined
    const isPricePerHour = pricePerHourInput?.length > 0
    const isPhoneNumber = phone?.length === 17 && !errors.offerPhoneNumber
    const isAdditionalMessage =
      additionalMessageWatch?.length > 0 && !errors.offerAdditionalInfo
    const isTitle = titleWatch?.length > 0 && !errors.offerTitle

    if (
      isTitle &&
      isDateSelected &&
      isTimeSelected &&
      isLocationSelected &&
      isPricePerHour &&
      isPhoneNumber    ) {
      setShowSubmitButton(true)
    } else {
      setShowSubmitButton(false)
    }
  }, [
    chosenDate,
    timeRange,
    chosenLocation,
    pricePerHourInput,
    phone,
    additionalMessageWatch,
    titleWatch,
  ])

  const [isResetAll, setResetAll] = useState(false)
  const clearAllFilters = () => {
    // For components set reset
    setResetAll(true)
    Keyboard.dismiss()
    // Components reset
    resetField('offerTitle')
    resetField('offerDate')
    resetField('offerStartTime')
    resetField('offerEndTime')
    resetField('offerLocation')
    resetField('offerPricePerHour')
    resetField('offerPhoneNumber')
    resetField('offerAdditionalInfo')
    getChosenLocation('')
    setPricePerHourInput('')
    setPhone('')
    getChosenDate({
      milliseconds: '',
      string: '',
    })
    setTimeRange({
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
    // Set reset to default
    setResetAll(false)
  }
  // Clear all if payment successful
  useEffect(() => {
    if (isPaySuccesful === true && isOpenCreateOffer === true) {
      clearAllFilters()
      closePopup()
      setFirstCreatedOffer(true)
    }
  }, [isPaySuccesful, isOpenCreateOffer])

  const onSubmit = (data) => {
    const newOffer = {
      offerTitle: titleWatch,
      offerDate: chosenDate,
      offerStartTime: timeRange.startTime,
      offerEndTime: timeRange.endTime,
      offerDuration: timeRange.duration,
      offerTotalMoney: timeRange.duration * pricePerHourInput,
      offerLocation: chosenLocation,
      offerPricePerHour: pricePerHourInput,
      offerPhoneNumber: phone,
      offerAdditionalInfo: additionalMessageWatch,
    }
    setPreviousOfferDetails(offerDetails)

    setOfferDetails(newOffer)

    runInAction(() => {
      OfferDetailsState.data = newOffer
    })

    setOpenOfferPreview(true)
    Keyboard.dismiss()
    return
  }

  return (
    <Animated.View
      style={{
        zIndex: 1000,
        height,
        // height: "90%",
        width: windowWidth,
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <FilterContainer style={{ elevation: 100 }}>
        {/* Header */}
        <Header Header>
          <HeaderClose
            onPress={() => {
              closePopup()
            }}
          >
            <CrossBlackIcon width={16} height={16} />
          </HeaderClose>

          <HeaderTitle>Create offer</HeaderTitle>
        </Header>

        <FilterBlock keyboardShouldPersistTaps={'handled'}>
          {/* Set date */}
          <View style={{ marginTop: 16 }}></View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AddInfoBlock>
                <AddInfoContainer
                  style={{
                    marginBottom: errors.info ? 32 : 0,
                    marginHorizontal: 16,
                  }}
                >
                  <AddInfoInput
                    selectionColor={C.lightGray}
                    placeholder={'Add title'}
                    placeholderTextColor={C.placeholder}
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
                      borderColor: errors.offerTitle ? C.red : inputFocus3,
                      borderWidth: errors.offerTitle ? 2 : 1,
                      color: errors.offerTitle ? C.red : C.black,
                      textAlignVertical: 'top',
                    }}
                  />
                  {errors.offerTitle?.type === 'required' && (
                    <ErrorMessage>Required field</ErrorMessage>
                  )}
                </AddInfoContainer>
              </AddInfoBlock>
            )}
            name="offerTitle"
          />
          <DropSelectCalendar
            setFilterDate={getChosenDate}
            setCalendarOpen={setCalendarOpen}
            isResetAll={isResetAll}
            isCloseAllDropdown={isCloseAllDropdown}
            placeholderText={'Date'}
          />
          {/* Set time */}
          <TimePeriodPicker
            isResetAll={isResetAll}
            setTimeRange={setTimeRange}
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
                setCloseAllDropdown(true)
              }}
            ></Pressable>
          )}

          {/* Set location */}
          <SearchLocationDropSelect
            setParentShowOpenDrop={setOpenLocationDropList}
            setFilterLocation={getChosenLocation}
            isResetAll={isResetAll}
            isCloseAllDropdown={isCloseAllDropdown}
            placeholderText={'Location'}
          />

          {/* Price per hour */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur } }) => (
              <View style={{ marginHorizontal: 16 }}>
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
                        borderRadius: 6,
                        borderColor: inputFocus7,
                        fontSize: 17,
                        fontFamily: F.regular,
                        paddingTop: pricePerHourLabel === true ? 13 : 0,
                        borderWidth: errors.offerPricePerHour ? 2 : 1,
                        color: 'transparent',
                      }}
                      placeholderTextColor={'transparent'}
                      value={pricePerHourInput}
                      onChangeText={(masked) => {
                        onChange(masked)
                        setPricePerHourInput(masked)
                      }}
                      placeholder={'Price'}
                      mask={S.perHourMaskPattern}
                    />
                    <FormInputPricePerHourBlock>
                      <FormInputPricePerHourText
                        style={{
                          top: pricePerHourInput.length > 0 ? 1 : -7,
                          color:
                            pricePerHourInput.length > 0
                              ? C.black
                              : C.placeholder,
                        }}
                      >
                        {pricePerHourInput.length > 0
                          ? `$ ${addDotForNumber(pricePerHourInput)}/hour`
                          : 'Price'}
                      </FormInputPricePerHourText>
                    </FormInputPricePerHourBlock>
                  </FormInputContainerPhone>
                  <FormInputLabel inputLabel={pricePerHourLabel}>
                    Price
                  </FormInputLabel>
                </FormInputBlock>
              </View>
            )}
            name="offerPricePerHour"
          />

          {/* Phone number */}
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 17,
            }}
            render={({ field: { onChange, onBlur } }) => (
              <View
                style={{
                  marginHorizontal: 16,
                  zIndex: isOpen ? 1111 : 0,
                }}
              >
                <FormInputBlock
                  style={{ marginBottom: errors.offerPhoneNumber ? 32 : 13 }}
                >
                  <FormInputContainerPhone>
                    <DropFlagSelect
                      inputFocus1={inputFocus1}
                      isError={errors.offerPhoneNumber}
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
                        borderColor: errors.offerPhoneNumber
                          ? C.red
                          : inputFocus1,
                        borderWidth: errors.offerPhoneNumber ? 2 : 1,
                        color: errors.offerPhoneNumber ? C.red : C.black,
                      }}
                      placeholder={'Phone number'}
                      placeholderTextColor={C.placeholder}
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
                    {errors.offerPhoneNumber && (
                      <ShowPasswordIconButton>
                        <ErrorIcon width={20} height={20} />
                      </ShowPasswordIconButton>
                    )}
                  </FormInputContainerPhone>
                  <FormInputLabel
                    style={{ marginLeft: 60 }}
                    isError={errors.offerPhoneNumber}
                    inputLabel={inputPhoneLabel}
                  >
                    Phone number
                  </FormInputLabel>

                  {errors.offerPhoneNumber?.type === 'required' && (
                    <ErrorMessage style={{ marginLeft: 78 }}>
                      {S.inputRequired}
                    </ErrorMessage>
                  )}
                  {errors.offerPhoneNumber?.type === 'minLength' && (
                    <ErrorMessage style={{ marginLeft: 78 }}>
                      {S.phoneNumberNotValid}
                    </ErrorMessage>
                  )}
                </FormInputBlock>
              </View>
            )}
            name="offerPhoneNumber"
          />

          {/*Add additional information*/}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <Controller
              control={control}
              rules={{
               // required: S.emailNotValid,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <AddInfoBlock>
                  <AddInfoContainer
                    style={{
                      marginBottom: errors.offerAdditionalInfo ? 32 : 13,
                      marginHorizontal: 16,
                    }}
                  >
                    <AddInfoInput
                      selectionColor={C.lightGray}
                      multiline={true}
                      //   numberOfLines={5}
                      placeholder={'Add additional information'}
                      placeholderTextColor={C.placeholder}
                      cursorColor={C.inputCursor}
                      onFocus={() => {
                        setInputFocus2(C.black)
                      }}
                      onBlur={() => {
                        onBlur
                        setInputFocus2(C.lightGray)
                      }}
                      onContentSizeChange={(e) =>
                        setAdditionalHeight(e.nativeEvent.contentSize.height)
                      }
                      onChangeText={onChange}
                      value={value}
                      style={{
                        borderColor: errors.offerAdditionalInfo
                          ? C.red
                          : inputFocus2,
                        borderWidth: errors.offerAdditionalInfo ? 2 : 1,
                        color: errors.offerAdditionalInfo ? C.red : C.black,
                        minHeight: 48,
                        height: additionalHeight,
                        textAlignVertical: 'top',
                        maxHeight: 150,
                      }}
                    />
                    {errors.offerAdditionalInfo?.type === 'required' && (
                      <ErrorMessage>Required field</ErrorMessage>
                    )}
                  </AddInfoContainer>
                </AddInfoBlock>
              )}
              name="offerAdditionalInfo"
            />
          </KeyboardAvoidingView>

          {/* Secure message */}
          <SecurePaymentMessage onPress={() => Keyboard.dismiss()}>
            <LockGrayIcon width={22} height={27} />
            <SecurePaymentMessageText>
              We use a secure payment system that holds funds in a secured
              intermediary trust account until the performance take place{' '}
              <SecurePaymentMessageReadMoreText>
                Learn more
              </SecurePaymentMessageReadMoreText>
            </SecurePaymentMessageText>
          </SecurePaymentMessage>

          {/* Empty block if open keyboard */}
          <View
            style={{
              marginBottom: isKeyboardOpen === true ? 200 : 0,
            }}
          ></View>
        </FilterBlock>

        {/* Footer block */}
        <ContentBlock
          style={{
            width: windowWidth,
          }}
          isKeyboardOpen={isKeyboardOpen}
        >
          <ContentBlockRow>
            {isPriceInFooter && (
              <ContainerLink>
                <ContainerPrice>
                  ${pricePerHourInput * timeRange.duration}
                </ContainerPrice>
                <ContainerHour>for {timeRange.duration} hours</ContainerHour>
              </ContainerLink>
            )}
            {isShowSubmitButton ? (
              <ButtonSubmit
                style={{
                  width: isPriceInFooter ? '60%' : '100%',
                  backgroundColor: C.black,
                }}
                onPress={handleSubmit(onSubmit)}
              >
                <ButtonSubmitText style={{ color: C.white }}>
                  Pay
                </ButtonSubmitText>
              </ButtonSubmit>
            ) : (
              <ButtonSubmit
                activeOpacity={0.2}
                style={{
                  width: isPriceInFooter ? '60%' : '100%',
                  backgroundColor: C.gray,
                }}
              >
                <ButtonSubmitText
                  style={{
                    color: C.sBlack,
                  }}
                >
                  Pay
                </ButtonSubmitText>
              </ButtonSubmit>
            )}
          </ContentBlockRow>
        </ContentBlock>
      </FilterContainer>
    </Animated.View>
  )
})

export default CreateOffer
