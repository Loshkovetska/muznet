import React from 'react'
import { useState, useEffect } from 'react'

import { Animated, KeyboardAvoidingView, BackHandler } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
// Components
import AccountsTabHeader from '../AccountsTabHeader'
import PaymentMethods from './PaymentMethods'
import PayoutMethods from './PayoutMethods'
import CurrencyPopup from './CurrencyPopup'

// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateOfferPreview } from './useAnimateOfferPreview'
// Images
import IMAGES from '@/res/images'
const { GoBackIcon } = IMAGES
// Variables
import { S } from '@/res/strings'
// Styles
import { style } from './style'
const {
  FilterContainer,
  AccountLinkList,
  AccountLink,
  AccountLinkText,
  AccountLinkIcon,
  AccountLinkCurrencyValue,
} = style
// Mixins
import { M } from '@/res/mixin'
const { ErrorMessage, ShowPasswordIconButton } = M
// Store
import { observer } from 'mobx-react-lite'
import { runInAction, set } from 'mobx'
import { useAccountApiStore } from '@/stores/AccountApi'
import { usePaymentAndPayoutApiStore } from '@/stores/PaymentAndPayoutApi'
import AccountStore, { getCurrencies } from '../../../stores/AccountStore'

const PaymentAndPayoutTab = observer(({ isOpenTab, isContractor }) => {
  const { windowHeight, windowWidth } = getWindowDimension()
  const [currencyTypes, setTypes] = useState([])
  // Animation
  const { onPress, width } = useAnimateOfferPreview()

  // Initial show tab
  useEffect(() => {
    if (isOpenTab === true) {
      onPress(true)
    }
  }, [isOpenTab])

  useEffect(() => {
    getCurrencies().then((r) => setTypes(r.data))
  }, [])

  // Store
  const {
    contractorAccountDataApi,
    musicianAccountDataApi,
    setOpenTabs,
  } = useAccountApiStore()
  const {
    isOpenPaymentDetails,
    setClosePaymentDetails,
  } = usePaymentAndPayoutApiStore()

  // Payments state
  const [isOpenPayments, setOpenPayments] = useState(false)
  const [isClosePayments, setClosePayments] = useState(false)

  // Payouts state
  const [isOpenPayouts, setOpenPayouts] = useState(false)

  // Handler for native back button
  const tabNameToClose = 'Payments and Payouts'
  const [isHideAnimationTab, setHideAnimationTab] = useState(false)

  useEffect(() => {
    if (isHideAnimationTab === true) {
      onPress(false)
    }
  }, [isHideAnimationTab])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isOpenTab && !isOpenPayments && !isOpenPayouts) {
          setHideAnimationTab(true)
          setTimeout(() => {
            setOpenTabs({
              tabName: tabNameToClose,
              isOpen: false,
            })
          }, 400)
        }
        // If back on payment tab
        if (isOpenTab && isOpenPayments && !isOpenPaymentDetails) {
          setClosePayments(true)
          setTimeout(() => {
            setOpenPayments(false)
            setClosePayments(false)
          }, 400)
        }
        // If back on payment tab
        if (isOpenTab && isOpenPayouts) {
          return false
        }
        if (isOpenTab && isOpenPayments && isOpenPaymentDetails) {
          setClosePaymentDetails(true)
        }

        return true
      },
    )
    return () => {
      backHandler.remove()
    }
  }, [isOpenPayments, isOpenTab, isOpenPaymentDetails, isOpenPayouts])

  // Currency state
  const [isOpenCurrency, setOpenCurrency] = useState(false)
  const [selectedCurrencyType, setCurrencyValue] = useState('USD - $')

  // User currency types
  const userCurrencyType = AccountStore.account?.userCurrencyType

  // Set user currency type
  useEffect(() => {
    if (userCurrencyType !== undefined || userCurrencyType !== null) {
      setCurrencyValue(userCurrencyType)
    }
  }, [userCurrencyType])

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
      }}
    >
      <FilterContainer
        style={{
          height: windowHeight,
          width: windowWidth,
        }}
      >
        {/* Header */}
        <AccountsTabHeader
          tabName={'Payments and Payouts'}
          setOpenTabs={setOpenTabs}
          onPress={onPress}
        />

        {/* Link list */}
        <AccountLinkList>
          {/* Payment Methods */}
          <AccountLink
            onPress={() => {
              setOpenPayments(true)
            }}
          >
            <AccountLinkText>Payment Methods</AccountLinkText>

            <AccountLinkIcon>
              <GoBackIcon width={9} height={16} />
            </AccountLinkIcon>
          </AccountLink>

          {/* Payout Methods */}
          <AccountLink
            onPress={() => {
              setOpenPayouts(true)
            }}
          >
            <AccountLinkText>Payout Methods</AccountLinkText>

            <AccountLinkIcon>
              <GoBackIcon width={9} height={16} />
            </AccountLinkIcon>
          </AccountLink>

          {/* Currency */}
          <AccountLink
            style={{
              borderBottomWidth: 0,
            }}
            onPress={() => {
              setOpenCurrency(true)
            }}
          >
            <AccountLinkText>Currency</AccountLinkText>

            <AccountLinkCurrencyValue>
              {selectedCurrencyType}
            </AccountLinkCurrencyValue>
          </AccountLink>
        </AccountLinkList>
      </FilterContainer>

      {/* Payment Methods */}
      {isOpenPayments && (
        <PaymentMethods
          isOpen={isOpenPayments}
          isClose={isClosePayments}
          setOpen={setOpenPayments}
        />
      )}

      {/* Payout Methods */}
      {isOpenPayouts && (
        <PayoutMethods isOpen={isOpenPayouts} setOpen={setOpenPayouts} />
      )}

      {/* Currency popup */}
      {isOpenCurrency && (
        <CurrencyPopup
          currencyTypes={currencyTypes}
          isOpenBottomPopup={isOpenCurrency}
          setOpenBottomPopup={setOpenCurrency}
          setCurrencyType={setCurrencyValue}
          selectedCurrencyType={selectedCurrencyType}
        />
      )}
    </Animated.View>
  )
})

export default PaymentAndPayoutTab
