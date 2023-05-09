import React from 'react'
import { useState, useEffect } from 'react'
import { Animated, Keyboard, BackHandler } from 'react-native'
// Components
import ChooseYourCountry from './ChooseYourCountry'
import ChooseHowToGetPaid from './ChooseHowToGetPaid'
import ChooseYourAccountType from './ChooseYourAccountType'
import AddAccountInfo from './AddAccountInfo'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateCreateOffer } from './useAnimateCreateOffer'

// Store
import { observer } from 'mobx-react-lite'

import { usePaymentAndPayoutApiStore } from '@/stores/PaymentAndPayoutApi'
import AccountStore, { addPayoutMethod } from '@/stores/AccountStore'

const PayoutDetails = observer(() => {
  const {
    isOpenPayoutDetails,
    setOpenPayoutDetails,
    setPayoutDetails,
    isClosePayoutDetails,
  } = usePaymentAndPayoutApiStore()

  const { windowHeight, windowWidth } = getWindowDimension()
  // Steps shown state
  const [isOpenChooseHowToGetPaid, setOpenChooseHowToGetPaid] = useState(false)
  const [isCloseChooseHowToGetPaid, setCloseChooseHowToGetPaid] = useState(
    false,
  )

  const [isOpenChooseAccountType, setOpenChooseAccountType] = useState(false)
  const [isCloseChooseAccountType, setCloseChooseAccountType] = useState(false)

  const [isOpenAddAccountInfo, setOpenAddAccountInfo] = useState(false)
  const [isCloseAddAccountInfo, setCloseAddAccountInfo] = useState(false)

  const [selectedCountry, setSelectedCountry] = useState()
  const [selectedHowToGetPaid, setSelectedHowToGetPaid] = useState()
  const [selectedAccountType, setSelectedAccountType] = useState()

  const { onPress, width } = useAnimateCreateOffer()
  useEffect(() => {
    if (isOpenPayoutDetails === true) {
      onPress(true)
    }
  }, [isOpenPayoutDetails])
  // Close tab
  const closeTab = () => {
    onPress(false)
    setTimeout(() => {
      if (isOpenAddAccountInfo === true) {
        setOpenAddAccountInfo(false)
      }
      setOpenPayoutDetails(false)
    }, 600)
  }
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
        if (
          isOpenPayoutDetails === true &&
          !isOpenChooseHowToGetPaid &&
          !isOpenChooseAccountType &&
          !isOpenAddAccountInfo
        ) {
          setHideAnimationTab(true)
          setTimeout(() => {
            setOpenPayoutDetails(false)
          }, 600)
        }
        if (
          isOpenPayoutDetails === true &&
          isOpenChooseHowToGetPaid === true &&
          !isOpenChooseAccountType &&
          !isOpenAddAccountInfo
        ) {
          setCloseChooseHowToGetPaid(true)
          setTimeout(() => {
            setCloseChooseHowToGetPaid(false)
          }, 590)
        }
        if (
          isOpenPayoutDetails === true &&
          isOpenChooseHowToGetPaid === true &&
          isOpenChooseAccountType === true &&
          !isOpenAddAccountInfo
        ) {
          setCloseChooseAccountType(true)
          setTimeout(() => {
            setCloseChooseAccountType(false)
          }, 590)
        }
        if (
          isOpenPayoutDetails === true &&
          isOpenChooseHowToGetPaid === true &&
          isOpenChooseAccountType === true &&
          isOpenAddAccountInfo === true
        ) {
          setCloseAddAccountInfo(true)
          setTimeout(() => {
            setCloseAddAccountInfo(false)
          }, 590)
        }

        return true
      },
    )
    return () => {
      backHandler.remove()
    }
  }, [
    isOpenPayoutDetails,
    isOpenChooseHowToGetPaid,
    isOpenChooseAccountType,
    isOpenAddAccountInfo,
  ])

  useEffect(() => {
    if (isClosePayoutDetails === true) {
      closeTab()
    }
  }, [isClosePayoutDetails])

  const onSubmitPayoutDetails = (data) => {
    const newPayout = {
      country: selectedCountry,
      howToGetPaid: selectedHowToGetPaid,
      accountType: selectedAccountType,
      accountInfo_cardHolderName: data.nameOnCard,
      accountInfo_routingNumber: data.routingNumber,
      accountInfo_accountNumber: data.accountNumber,
      accountInfo_confirmAccountNumber: data.confirmAccountNumber,
    }

    setPayoutDetails(newPayout)

    addPayoutMethod({
      id: AccountStore.account.id,
      ...newPayout,
    }).then(() => {
      setOpenChooseHowToGetPaid(false)
      setOpenChooseAccountType(false)
      setSelectedCountry(undefined)
      setSelectedHowToGetPaid(undefined)
      setSelectedAccountType(undefined)
      // Clear input value
      Keyboard.dismiss()
      closeTab()
    })

    return
  }

  return (
    <Animated.View
      style={{
        zIndex: 1015,
        height: windowHeight - 50, //+ 50,
        // width: windowWidth,
        width,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
      }}
    >
      {/* Initial tab always show */}
      {isOpenPayoutDetails === true && (
        <ChooseYourCountry
          selectedCountry={selectedCountry}
          setSelectedOption={setSelectedCountry}
          setOpenNextTab={setOpenChooseHowToGetPaid}
          closeTab={closeTab}
        />
      )}
      {isOpenChooseHowToGetPaid === true && (
        <ChooseHowToGetPaid
          selectedCountry={selectedCountry}
          selectedHowToGetPaid={selectedHowToGetPaid}
          setSelectedOption={setSelectedHowToGetPaid}
          isOpenTab={isOpenChooseHowToGetPaid}
          setOpenTab={setOpenChooseHowToGetPaid}
          setOpenNextTab={setOpenChooseAccountType}
          isCloseTab={isCloseChooseHowToGetPaid}
        />
      )}

      {isOpenChooseAccountType === true && (
        <ChooseYourAccountType
          selectedAccountType={selectedAccountType}
          setSelectedOption={setSelectedAccountType}
          isOpenTab={isOpenChooseAccountType}
          setOpenTab={setOpenChooseAccountType}
          setOpenNextTab={setOpenAddAccountInfo}
          isCloseTab={isCloseChooseAccountType}
        />
      )}

      {isOpenAddAccountInfo === true && (
        <AddAccountInfo
          isOpenTab={isOpenAddAccountInfo}
          setOpenTab={setOpenAddAccountInfo}
          onSubmitPayoutDetails={onSubmitPayoutDetails}
          isCloseTab={isCloseAddAccountInfo}
        />
      )}
    </Animated.View>
  )
})

export default PayoutDetails
