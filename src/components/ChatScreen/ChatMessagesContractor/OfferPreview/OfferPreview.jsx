import React from 'react'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Animated, View } from 'react-native'
// Components
import ChoosePaymentMethod from '@/components/ChoosePaymentMethod'
import OfferAddPaymentDetails from './OfferAddPaymentDetails'

// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateOfferPreview } from './useAnimateOfferPreview'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
// Images
import IMAGES from '@/res/images'
const { GoBackIcon, LockGrayIcon } = IMAGES
// Variables
import C from '@/res/colors'
import * as Linking from 'expo-linking'
// Styles
import { style } from './style'
const {
  FilterContainer,
  Header,
  HeaderClose,
  HeaderTitle,
  FilterBlock,

  OfferDetails,
  OfferDetailsTitle,
  OfferDetailsBlock,
  OfferLi,
  OfferLiKeys,
  OfferLiValue,
  OfferPayment,

  ContentBlock,
  ContentBlockRow,
  ContainerLink,
  ContainerPrice,
  ContainerHour,
  ButtonSubmit,
  ButtonSubmitText,
  SecurePaymentMessage,
  SecurePaymentMessageText,
  SecurePaymentMessageReadMoreText,
} = style

// Store
import { observer } from 'mobx-react-lite'
import { useOfferToMusicianApiStore } from '@/stores/OfferToMusicianApi'
import AccountStore, { addNewDeal } from '../../../../stores/AccountStore'
import { OfferDetailsState } from './OfferAddPaymentDetails/OfferAddPaymentDetails'
const OfferPreview = observer(({ isOpen }) => {
  const route = useRoute()

  const {
    offerDetails,
    setOpenOfferPreview,
    setOpenCreateOffer,
    setPaySucessful,
    setSendOffer,
    setOpenPaySuccesfulModal,
  } = useOfferToMusicianApiStore()

  const {
    offerAdditionalInfo,
    offerDate,
    offerDuration,
    offerStartTime,
    offerEndTime,
    offerLocation,
    offerPricePerHour,
    offerTotalMoney,
    offerPhoneNumber,
  } = offerDetails

  const isKeyboardOpen = isKeyboardShown()

  const { windowHeight, windowWidth } = getWindowDimension()
  const { onPress, width } = useAnimateOfferPreview()

  useEffect(() => {
    if (isOpen === true) {
      onPress(true)
    }
  }, [isOpen])

  const [isHideAnimationTab, setHideAnimationTab] = useState(false)

  useEffect(() => {
    if (isHideAnimationTab === true) {
      onPress(false)
    }
  }, [isHideAnimationTab])

  const closePopup = () => {
    setHideAnimationTab(true)
    setOpenOfferPreview(false)
  }

  const onSubmit = () => {
    setOpenCreateOffer(false)
    const sendData = {
      idClient: AccountStore.account.id,
      idReceiver: route.params.chatUserId,
      dealNumber: 1,
      dealStatus: 'true',
      isActive: 'false',
      adTitle: OfferDetailsState.data.offerTitle,
      adLocation: OfferDetailsState.data.offerLocation||" ",
      moreDetails: OfferDetailsState.data.offerAdditionalInfo||"... ",
      userCurrencyType: AccountStore.account.userCurrencyType.split('-')[1],
      adDate_milliseconds: OfferDetailsState.data.offerDate.milliseconds,
      adDate_string: OfferDetailsState.data.offerDate.string,
      eventStart_milliseconds:
        OfferDetailsState.data.offerStartTime.milliseconds,
      eventStart_string: OfferDetailsState.data.offerStartTime.string,
      eventEnd_milliseconds: OfferDetailsState.data.offerEndTime.milliseconds,
      eventEnd_string: OfferDetailsState.data.offerEndTime.string,
      dealPhoneNumber: OfferDetailsState.data.offerPhoneNumber,
      paymentMethod: OfferDetailsState.payments.id,
      perfomanceCost: OfferDetailsState.data.offerTotalMoney,
      muznetFee: '5',
      userPricePerHour: OfferDetailsState.data.offerPricePerHour,
      totalPrice: OfferDetailsState.data.offerTotalMoney,
    }
    addNewDeal(
      {
        ...sendData,
      },
      AccountStore.account.userEmail,
      AccountStore.account.userName + ' ' + AccountStore.account.userSurName,
      AccountStore.account.userCurrencyType.toLowerCase().split('-')[0]
    ).then((r) => {
      console.log(r)
      Linking.openURL(r)
      setPaySucessful(true)
      setOpenPaySuccesfulModal(true)
      setSendOffer(true)
      closePopup()
    })
  }
  // Is show submit button
  const [isShowSubmitButton, setShowSubmitButton] = useState(false)

  const isDateString = offerDate.string !== undefined && offerDate.string

  const isTimeStartString =
    offerStartTime.string !== undefined && offerStartTime.string
  const isTimeEndString =
    offerEndTime.string !== undefined && offerEndTime.string
  const isDurationString = offerDuration !== undefined && offerDuration
  const timeString = `${isTimeStartString}-${isTimeEndString} (${isDurationString} hours)`

  const isLocationString = offerLocation !== undefined && offerLocation

  const isTotalPriceString = offerTotalMoney !== undefined && offerTotalMoney
  const isPricePerHourString =
    offerPricePerHour !== undefined && offerPricePerHour

  const isPhoneNumberString = offerPhoneNumber !== undefined && offerPhoneNumber

  return (
    <Animated.View
      style={{
        zIndex: 1000,
        height: windowHeight,
        width,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <FilterContainer
        style={{
          height: windowHeight,
          width: windowWidth,
        }}
      >
        {/* Header */}
        <Header>
          <HeaderClose
            onPress={() => {
              closePopup()
            }}
          >
            <GoBackIcon width={9} height={16} />
          </HeaderClose>

          <HeaderTitle>Offer Preview</HeaderTitle>
        </Header>
        {/* Secure message */}
        <FilterBlock keyboardShouldPersistTaps={'handled'}>
          {/* Offer details */}
          <OfferDetails>
            <OfferDetailsTitle>Offer details:</OfferDetailsTitle>

            <OfferDetailsBlock>
              <OfferLi>
                <OfferLiKeys>Date:</OfferLiKeys>
                <OfferLiValue>{isDateString}</OfferLiValue>
              </OfferLi>

              <OfferLi>
                <OfferLiKeys>Time:</OfferLiKeys>
                <OfferLiValue>{timeString}</OfferLiValue>
              </OfferLi>

              <OfferLi>
                <OfferLiKeys>Location:</OfferLiKeys>
                <OfferLiValue
                  style={{
                    paddingRight: 70,
                  }}
                >
                  {isLocationString}
                </OfferLiValue>
              </OfferLi>

              <OfferLi>
                <OfferLiKeys>Price:</OfferLiKeys>
                <OfferLiValue>{`$${isTotalPriceString}`}</OfferLiValue>
                <OfferLiValue
                  style={{
                    color: C.cyanGray,
                  }}
                >{` ($${isPricePerHourString} per hour)`}</OfferLiValue>
              </OfferLi>

              <OfferLi
                style={{
                  marginBottom: 0,
                }}
              >
                <OfferLiKeys>Contact phone:</OfferLiKeys>
                <OfferLiValue>{isPhoneNumberString}</OfferLiValue>
              </OfferLi>
            </OfferDetailsBlock>
          </OfferDetails>

          {/* Сhoose payment method */}
          <OfferPayment>
            <OfferDetailsTitle>Choose payment method:</OfferDetailsTitle>

            <ChoosePaymentMethod setShowSubmitButton={setShowSubmitButton} />
          </OfferPayment>

          <SecurePaymentMessage>
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
            <ContainerLink>
              <ContainerPrice>${isTotalPriceString}</ContainerPrice>
              <ContainerHour>for {isDurationString} hours</ContainerHour>
            </ContainerLink>

            <ButtonSubmit
              activeOpacity={isShowSubmitButton ? 0.2 : 1}
              style={{
                width: '60%',
                backgroundColor: isShowSubmitButton ? C.black : C.gray,
              }}
              onPress={() => {
                if (isShowSubmitButton === true) {
                  onSubmit()
                }
              }}
            >
              <ButtonSubmitText
                style={{
                  color: isShowSubmitButton ? C.white : C.sBlack,
                }}
              >
                Pay
              </ButtonSubmitText>
            </ButtonSubmit>
          </ContentBlockRow>
        </ContentBlock>
      </FilterContainer>

      {/* Payment details  */}
      <OfferAddPaymentDetails />
    </Animated.View>
  )
})

export default OfferPreview
