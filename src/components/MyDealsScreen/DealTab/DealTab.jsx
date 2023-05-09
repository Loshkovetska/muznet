import React from 'react'
import { useEffect, useState } from 'react'
import { Animated, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
// Components
import Collapsible from 'react-native-collapsible'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateOfferPreview } from './useAnimateOfferPreview'
// Images
import IMAGES from '@/res/images'
const { GoBackIcon } = IMAGES
// Variables
import C from '@/res/colors'
import F from '@/res/fonts'
// Styles
import { style } from './style'
const {
  FilterContainer,
  Header,
  HeaderClose,
  HeaderTitle,
  ArticleContainer,
  DealRow,
  DealPaymentRow,
  DealPaymentBlock,
  DealRowTitle,
  DealRowValue,
  DealStatusLabel,
  AccountLink,
  AccountLinkText,
  AccountLinkIcon,
  SecurePaymentMessage,
  SecurePaymentMessageText,
  SecurePaymentMessageReadMoreText,
  ContentBlock,
} = style
// Mixins
import { M } from '@/res/mixin'
const {
  BlackBtn,
  BlackBtnText,
  BorderBtn,
  BorderBtnText,
  TitleBold17,
  MediumText16,
  Title20,
} = M
// Store
import { observer } from 'mobx-react-lite'

const DealTab = observer(
  ({
    isOpenTab,
    dealData,
    setOpen,
    isClose,
    setOpenContactUs,
    isContractor,
    setOpenAfterSubmitMessage,
  }) => {
    const navigation = useNavigation()

    const {
      dealUserName,
      dealNumber,
      dealStatus,
      userPricePerHour,
      userCurrencyType,
      adDate,
      eventStart,
      eventEnd,
      adTitle,
      adLocation,
      dealPhoneNumber,
      paymentMethod,
      perfomanceCost,
      muznetFee,
      totalPrice,
      moreDetails,
      isActive,
      id,
      dealPerson,
    } = dealData

    const statusText = isActive == 'true' ? 'Active' : 'Closed'
    const firstName = dealPerson.userName

    const { windowHeight, windowWidth } = getWindowDimension()

    const { onPress, width } = useAnimateOfferPreview()

    useEffect(() => {
      if (isOpenTab === true) {
        onPress(true)
      }
    }, [isOpenTab])
    // Close tab
    const closeTab = () => {
      onPress(false)
      setTimeout(() => {
        setOpen({
          isOpen: false,
          dealData: {},
        })
      }, 600)
    }

    useEffect(() => {
      if (isClose === true) {
        closeTab()
      }
    }, [isClose])
    // More details state
    const [isEnabled1, setIsEnabled1] = useState(false)
    const [collapsed1, setCollapsed1] = useState(true)
    const combine1 = function () {
      setCollapsed1(!collapsed1)
      setIsEnabled1((previousState) => !previousState)
    }

    const isContractorStack = isContractor ? 'ContractorStack' : 'MusicianStack'
    const isContractorMessageScreen = isContractor
      ? 'ContractorChatScreen'
      : 'MusicianChatScreen'
    return (
      <Animated.View
        style={{
          zIndex: 1000,
          height: windowHeight,
          backgroundColor: 'white',
          // width: windowWidth,
          width,
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <FilterContainer
          showsVerticalScrollIndicator={false}
          style={{
            width: windowWidth,
          }}
        >
          <Header>
            <HeaderClose
              onPress={() => {
                closeTab()
              }}
            >
              <GoBackIcon width={12} height={21} />
            </HeaderClose>

            <TitleBold17>Deal № {id}</TitleBold17>
          </Header>
          <ArticleContainer>
            <HeaderTitle>{adTitle}</HeaderTitle>

            <DealRow>
              <DealRowTitle>Status</DealRowTitle>

              <DealRowValue>
                <DealStatusLabel isActive={isActive == 'true'}>
                  {statusText}
                </DealStatusLabel>
              </DealRowValue>
            </DealRow>

            <DealRow>
              <DealRowTitle>Date</DealRowTitle>

              <DealRowValue>{dealData['adDate_string']}</DealRowValue>
            </DealRow>

            <DealRow>
              <DealRowTitle>Time</DealRowTitle>

              <DealRowValue>
                {dealData['eventStart_string'] +
                  ' to ' +
                  dealData['eventEnd_string']}
              </DealRowValue>
            </DealRow>

            <DealRow>
              <DealRowTitle>Location</DealRowTitle>

              <DealRowValue ellipsizeMode={'tail'} numberOfLines={1}>
                {adLocation}
              </DealRowValue>
            </DealRow>

            <DealRow>
              <DealRowTitle>Price</DealRowTitle>

              <DealRowValue ellipsizeMode={'tail'} numberOfLines={1}>
                {userCurrencyType}
                {userPricePerHour} per hour
              </DealRowValue>
            </DealRow>

            <DealRow>
              <DealRowTitle>Contact phone</DealRowTitle>

              <DealRowValue ellipsizeMode={'tail'} numberOfLines={1}>
                {dealPhoneNumber}
              </DealRowValue>
            </DealRow>

            {/* Payment block */}
            <DealPaymentBlock>
              <DealPaymentRow>
                <DealRowTitle>Payment method</DealRowTitle>

                <DealRowValue ellipsizeMode={'tail'} numberOfLines={1}>
                  {paymentMethod}
                </DealRowValue>
              </DealPaymentRow>
              <DealPaymentRow>
                <DealRowTitle>Perfomance cost</DealRowTitle>

                <DealRowValue ellipsizeMode={'tail'} numberOfLines={1}>
                  {userCurrencyType}
                  {perfomanceCost}
                </DealRowValue>
              </DealPaymentRow>
              <DealPaymentRow>
                <DealRowTitle>Muznet fee</DealRowTitle>

                <DealRowValue ellipsizeMosde={'tail'} numberOfLines={1}>
                  {userCurrencyType}
                  {muznetFee}
                </DealRowValue>
              </DealPaymentRow>
              <DealPaymentRow>
                <DealRowTitle
                  style={{
                    color: C.black,
                    fontFamily: F.bold,
                  }}
                >
                  Total
                </DealRowTitle>

                <DealRowValue
                  style={{
                    color: C.black,
                    fontFamily: F.bold,
                  }}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}
                >
                  {userCurrencyType}
                  {totalPrice}
                </DealRowValue>
              </DealPaymentRow>
            </DealPaymentBlock>

            {/* More details */}
            <AccountLink onPress={combine1}>
              <AccountLinkText>More details</AccountLinkText>
              <AccountLinkIcon isOpen={isEnabled1}>
                <GoBackIcon width={9} height={16} />
              </AccountLinkIcon>
            </AccountLink>
            {/* Collapsible block */}
            <ScrollView>
              {/*Content of Single Collapsible*/}
              <Collapsible collapsed={collapsed1} align="center">
                <MediumText16
                  style={{
                    marginTop: 16,
                    paddingBottom: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: C.lightGray,
                  }}
                >
                  {moreDetails}
                </MediumText16>
              </Collapsible>
            </ScrollView>
            {/* Contact with user */}
            <BorderBtn
              onPress={() => {
                navigation.navigate(isContractorStack, {
                  screen: isContractorMessageScreen,
                  params: {
                    chatUserId: dealPerson.id,
                  },
                })
              }}
              style={{
                marginTop: 32,
                marginBottom: 24,
              }}
            >
              <BorderBtnText>Contact {firstName}</BorderBtnText>
            </BorderBtn>

            {/* Contact us */}
            <SecurePaymentMessage
              dealStatus={dealStatus}
              onPress={() => {
                setOpenContactUs(true)
              }}
            >
              <SecurePaymentMessageText>
                Have a problem with perfomance?{' '}
                <SecurePaymentMessageReadMoreText>
                  Contact us
                </SecurePaymentMessageReadMoreText>
              </SecurePaymentMessageText>
            </SecurePaymentMessage>
          </ArticleContainer>
        </FilterContainer>
        {/* Footer block */}
        {dealStatus && (
          <ContentBlock>
            <BlackBtn
              onPress={() => {
                setOpenAfterSubmitMessage(dealData)
              }}
            >
              <BlackBtnText style={{ color: C.white }}>
                Submit Perfomance
              </BlackBtnText>
            </BlackBtn>
          </ContentBlock>
        )}
      </Animated.View>
    )
  },
)

export default DealTab
