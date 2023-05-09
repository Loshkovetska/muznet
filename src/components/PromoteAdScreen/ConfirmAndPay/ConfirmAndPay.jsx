import React from 'react'
import { useEffect } from 'react'
import { Animated, View, Platform } from 'react-native'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateCreateOffer } from './useAnimateCreateOffer'
// Images
import IMAGES from '@/res/images'
const { GoBackIcon, DashedBorder, AppleIcon } = IMAGES
// Variables
import C from '@/res/colors'
// Styles
import { style } from './style'

// import { ApplePayButton, GooglePayButton } from '@stripe/stripe-react-native'

const {
  FilterContainer,
  Header,
  HeaderClose,
  HeaderTitle,
  FilterBlock,
  PreviewBlock,
  PreviewBlockRow,
  ContentBlock,
} = style
// Mixins
import { M } from '@/res/mixin'
import axios from 'axios'
const {
  PlainText17,
  MediumText20,
  MediumText17,
  TitleBold20,
  TitleBold17,
  BlackBtn,
  BlackBtnText,
} = M

const ConfirmAndPay = ({
  selectedPromoteDuration,
  isOpenTab,
  setOpenTab,
  onSubmitPromoteAd,
  onSubmitBySupportedFunc,
  isCloseTab,
}) => {
  const { windowHeight, windowWidth } = getWindowDimension()
  const { onPress, width } = useAnimateCreateOffer()
  useEffect(() => {
    if (isOpenTab === true) {
      onPress(true)
    }
  }, [isOpenTab])
  // Close tab
  const closeTab = () => {
    onPress(false)
    setTimeout(() => {
      setOpenTab(false)
    }, 600)
  }
  useEffect(() => {
    if (isCloseTab === true) {
      closeTab()
    }
  }, [isCloseTab])

  return (
    <Animated.View
      style={{
        zIndex: 1100,
        height: windowHeight,
        // width: windowWidth,
        width,
        backgroundColor: 'white',
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
              closeTab()
            }}
          >
            <GoBackIcon width={12} height={21} />
          </HeaderClose>

          <HeaderTitle>Confirm and pay</HeaderTitle>
        </Header>

        <FilterBlock>
          <MediumText17 style={{ color: C.cyanGray, marginBottom: 16 }}>
            Please, check your promotion details:
          </MediumText17>

          <TitleBold20 style={{ marginBottom: 8 }}>
            Promotion details:
          </TitleBold20>

          <PreviewBlock>
            <MediumText20 style={{ marginBottom: 8 }}>
              General promotion
            </MediumText20>

            <PlainText17>
              A profile will be shown at the top of the list are all ads.
            </PlainText17>

            <View style={{ marginLeft: -16, paddingVertical: 16 }}>
              <DashedBorder width={windowWidth - 32} height={2} />
            </View>

            <PreviewBlockRow>
              <TitleBold17>Price: </TitleBold17>
              <PlainText17>
                ${selectedPromoteDuration.promotePrice}{' '}
              </PlainText17>
              <PlainText17 style={{ color: C.cyanGray, paddingBottom: 8 }}>
                ($
                {selectedPromoteDuration.promotePrice /
                  selectedPromoteDuration.promoteDuration}{' '}
                per day)
              </PlainText17>
            </PreviewBlockRow>

            <PreviewBlockRow>
              <TitleBold17>Duration: </TitleBold17>
              <PlainText17>
                {selectedPromoteDuration.promoteDuration} days{' '}
              </PlainText17>
              <PlainText17 style={{ color: C.cyanGray }}>
                (≈ 20 displays per day)
              </PlainText17>
            </PreviewBlockRow>
            <PreviewBlockRow
              style={{
                marginTop: 9,
              }}
            >
              <TitleBold17>Fees MuzNet: </TitleBold17>
              <PlainText17>5%</PlainText17>
            </PreviewBlockRow>
          </PreviewBlock>
        </FilterBlock>

        {/* Footer block */}
        <ContentBlock
          style={{
            width: windowWidth,
          }}
        >
          <BlackBtn
            onPress={() => {
            Platform.OS=='ios'?  onSubmitBySupportedFunc():onSubmitPromoteAd()
            }}
          >
            <BlackBtnText>Purchase</BlackBtnText>
          </BlackBtn>
          {/* <BlackBtn
            style={{
              marginTop: 8,
            }}
            onPress={() => {
              onSubmitBySupportedFunc()
            }}
          >
            <BlackBtnText>
              Pay with{' '}
              {Platform.OS === 'ios' ? (
                <AppleIcon width={16} height={16} />
              ) : (
                'Google'
              )}{' '}
              Pay
            </BlackBtnText>
          </BlackBtn> */}
        </ContentBlock>
      </FilterContainer>
    </Animated.View>
  )
}

export default ConfirmAndPay
