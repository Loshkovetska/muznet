import React from 'react'
import { useState, useEffect } from 'react'
import { Animated, BackHandler, Keyboard } from 'react-native'
// Components

// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateAttachment } from './useAnimateAttachment'
// Images
import IMAGES from '@/res/images'
const { CrossBlackIcon, CheckRoundBlackIcon } = IMAGES
// Variables
import C from '@/res/colors'
import { S } from '@/res/strings'
// Styles
import { style } from './style'
import AccountStore, { updateCurrency } from '../../../../stores/AccountStore'
const {
  PopupHeader,
  CloseButton,
  OpacityBg,
  AccountLinkList,
  AccountLink,
  AccountLinkText,
  AccountLinkIcon,
  AttachContainerText,
} = style

const CurrencyPopup = ({
  isOpenBottomPopup,
  setOpenBottomPopup,
  currencyTypes,
  setCurrencyType,
  selectedCurrencyType,
}) => {
  const { windowHeight, windowWidth } = getWindowDimension()

  // Animate attachment
  const { onPress, height } = useAnimateAttachment()

  useEffect(() => {
    if (isOpenBottomPopup === true) {
      Keyboard.dismiss()
      onPress(true)
    }
  }, [isOpenBottomPopup])

  const [isHideAnimationTab, setHideAnimationTab] = useState(false)

  useEffect(() => {
    if (isHideAnimationTab === true) {
      onPress(false)
    }
  }, [isHideAnimationTab])

  const closePopup = () => {
    setHideAnimationTab(true)
    setTimeout(() => {
      setOpenBottomPopup(false)
    }, 600)
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        closePopup()
        return true
      },
    )
    return () => {
      backHandler.remove()
    }
  }, [])

  return (
    <>
      {isOpenBottomPopup && (
        <OpacityBg
          style={{
            height: windowHeight,
            width: windowWidth,
            zIndex: 2000,
          }}
          onPress={() => {
            closePopup()
          }}
        ></OpacityBg>
      )}
      <Animated.View
        style={{
          height,
          // height: 370,
          width: windowWidth,
          zIndex: 2000,
          justifyContent: 'center',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          position: 'absolute',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: C.white,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          overflow: 'hidden',
          left: 0,
          bottom: 50,
          right: 0,
        }}
      >
        <PopupHeader>
          <AttachContainerText>Choose your currency</AttachContainerText>

          {/* Attach container */}
          <CloseButton
            onPress={() => {
              closePopup()
            }}
          >
            <CrossBlackIcon width={14} height={14} />
          </CloseButton>
        </PopupHeader>

        {/* Currency list */}
        <AccountLinkList showsVerticalScrollIndicator={false}>
          {currencyTypes.map((currency, id) => {
            const isLastWithoutBorderBottom = id === S.currencyTypes.length - 1

            const isActive =
              currency.shortCurrencyValue === selectedCurrencyType

            return (
              <AccountLink
                style={{
                  borderBottomWidth: isLastWithoutBorderBottom === true ? 0 : 1,
                  marginBottom: isLastWithoutBorderBottom === true ? 70 : 0,
                }}
                onPress={() => {
                  closePopup()
                  updateCurrency({
                    id: AccountStore.account.id,
                    currency: currency.id,
                  })
                  setCurrencyType(currency.shortCurrencyValue)
                }}
                key={id}
              >
                <AccountLinkText>{currency.fullCurrencyValue}</AccountLinkText>

                {isActive === true && (
                  <AccountLinkIcon>
                    <CheckRoundBlackIcon width={20} height={20} />
                  </AccountLinkIcon>
                )}
              </AccountLink>
            )
          })}
        </AccountLinkList>
      </Animated.View>
    </>
  )
}

export default CurrencyPopup
