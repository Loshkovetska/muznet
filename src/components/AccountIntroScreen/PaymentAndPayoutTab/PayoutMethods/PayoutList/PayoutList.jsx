import React from 'react'

import { useEffect } from 'react'
import { useState } from 'react'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
// Images
import IMAGES from '@/res/images'
const { RoundBlackCheckIcon } = IMAGES

// Styles
import { style } from './style'
import F from '@/res/fonts'

const { Container, SelectItem, CheckBox, SavedPaymentText, SelectText } = style
import { M } from '@/res/mixin'
const { BlackBtn, BlackBtnText } = M
// Store
import { observer } from 'mobx-react-lite'
import { usePaymentAndPayoutApiStore } from '@/stores/PaymentAndPayoutApi'
import AccountStore from '@/stores/AccountStore'
import { updatePayoutMethod } from '@/stores/AccountStore'
import { getPayouts } from '../../../../../stores/AccountStore'

const PayoutList = observer(({ setShowSubmitButton }) => {
  // if account we disable choose option
  const {
    isOpenPaymentDetails,
    setOpenPayoutDetails,
    isOpenPayoutDetails,
  } = usePaymentAndPayoutApiStore()
  const [payments, setPayments] = useState([])
  const [localPayoutMethods, setLocalPayoutMethods] = useState([])

  const [localPaymentMethodActiveId, setLocalPaymentMethodActiveId] = useState(
    -1,
  )
  useEffect(() => {
    getPayouts().then((res) => {
      setPayments(res)
    })
  }, [isOpenPaymentDetails, isOpenPayoutDetails])

  useEffect(() => {
    if (payments.length) {
      setLocalPayoutMethods([...payments])
      let id = -1

      payments.forEach((fi, idx) => {
        if (fi.isActive == 'true' || fi.isActive == true) {
          id = idx
          return
        }
      })

      if (id != -1) {
        setLocalPaymentMethodActiveId(id)
      }
    }
  }, [payments])

  return (
    <Container>
      {localPayoutMethods?.length > 0 && (
        <SavedPaymentText>Saved payout methods</SavedPaymentText>
      )}
      {localPayoutMethods?.length === 0 && (
        <SavedPaymentText
          style={{
            fontFamily: F.regular,
          }}
        >
          No payout method
        </SavedPaymentText>
      )}
      {localPayoutMethods?.length > 0 &&
        localPayoutMethods.map((payout, id) => {
          //   const isFirst = id === 0

          const isActive = id === localPaymentMethodActiveId
          const lastFourDigitOfNumber = payout[
            'accountInfo_accountNumber'
          ].slice(-4, payout['accountInfo_accountNumber'].length)
          return (
            <SelectItem
              key={id}
              onPress={() => {
                setLocalPaymentMethodActiveId(id)
                updatePayoutMethod({
                  idClient: AccountStore.account.id,
                  idCard: payout.id,
                })
              }}
              isActive={isActive}
            >
              <SelectText>Account ending in {lastFourDigitOfNumber}</SelectText>

              <CheckBox isActive={isActive}>
                {isActive && <RoundBlackCheckIcon width={24} height={24} />}
              </CheckBox>
            </SelectItem>
          )
        })}

      {/* Add payment method */}

      <BlackBtn
        style={{
          marginTop: 16,
        }}
        onPress={() => {
          setOpenPayoutDetails(true)
        }}
      >
        <BlackBtnText>Add Payout Method</BlackBtnText>
      </BlackBtn>
    </Container>
  )
})

export default PayoutList
