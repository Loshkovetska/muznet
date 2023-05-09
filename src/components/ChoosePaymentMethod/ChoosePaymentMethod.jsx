import React from 'react'

import { useEffect } from 'react'
import { useState } from 'react'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
// Images
import IMAGES from '@/res/images'
const {
  AmericanExpressBankIcon,
  PayPalBankIcon,
  VisaBankIcon,
  MasterCardBankIcon,
  AddCrossIcon,
  RoundBlackCheckIcon,
} = IMAGES

// Styles
import { style } from './style'
const {
  Container,
  SavedPaymentText,
  SelectItem,
  CheckBox,
  BankCardIcon,
  SelectText,
  AddPayment,
  AddPaymentBg,
  AddPaymentBgImage,
  AddPaymentRow,
  AddPaymentRowText,
} = style
import { M } from '@/res/mixin'
const { BlackBtn, BlackBtnText } = M
// Store
import { observer } from 'mobx-react-lite'
import { usePaymentAndPayoutApiStore } from '@/stores/PaymentAndPayoutApi'
import AccountStore from '@/stores/AccountStore'
import { updateActiveCard } from '@/stores/AccountStore'
import { getPayments } from '../../stores/AccountStore'
import { runInAction } from 'mobx'
import { OfferDetailsState } from '../ChatScreen/ChatMessagesContractor/OfferPreview/OfferAddPaymentDetails/OfferAddPaymentDetails'

const ChoosePaymentMethod = observer(
  ({ setShowSubmitButton, isAccountScreen }) => {
    // if account we disable choose option
    const { windowHeight, windowWidth } = getWindowDimension()
    const {
      isOpenPaymentDetails,
      setOpenPaymentDetails,
    } = usePaymentAndPayoutApiStore()

    // Local state
    const [localPaymentMethods, setLocalPaymentMethods] = useState([])
    const [
      localPaymentMethodActiveId,
      setLocalPaymentMethodActiveId,
    ] = useState(-1)

    const [payments, setPayments] = useState([])

    useEffect(() => {
      getPayments().then((res) => {
        setPayments(res)
      })
    }, [isOpenPaymentDetails])

    useEffect(() => {
      if (payments?.length) {
        setLocalPaymentMethods([
          // ...localPaymentMethods,
          ...payments,
        ])

        let id = -1
        payments?.forEach((f, idx) => {
          if (f.isActive == 'true' || f.isActive == true) {
            id = idx
            return
          }
        })
        if (id != -1) {
          setLocalPaymentMethodActiveId(id)
        }
      }
    }, [payments])

    const updateActive = (id) => {
      updateActiveCard({
        idClient: AccountStore.account.id,
        idCard: id,
      }).then((r) => {
      })
    }

    return (
      <Container>
        {localPaymentMethods?.length > 0 && isAccountScreen && (
          <SavedPaymentText>Saved payment methods</SavedPaymentText>
        )}
        {localPaymentMethods?.length > 0 &&
          localPaymentMethods.map((payment, id) => {
            // const isFirst = id === 0
            const isActive = id === localPaymentMethodActiveId
            const lastFourDigitOfNumber = payment.cardNumber.slice(
              -4,
              payment.cardNumber.length,
            )
            return (
              <SelectItem
                key={id}
                onPress={() => {
                  setLocalPaymentMethodActiveId(id)
                  updateActive(payment.id)
                  if (!isAccountScreen) {
                    setShowSubmitButton(true)
                    runInAction(() => {
                      OfferDetailsState.payments = payment
                    })
                  }
                }}
                isActive={isActive}
              >
                <BankCardIcon>
                  <MasterCardBankIcon width={24} height={17} />
                </BankCardIcon>

                <SelectText>Card ending in {lastFourDigitOfNumber}</SelectText>

                <CheckBox isActive={isActive}>
                  {/* {isFirst && localPaymentMethodActiveId === undefined && (
                    <RoundBlackCheckIcon width={24} height={24} />
                  )} */}
                  {isActive && <RoundBlackCheckIcon width={24} height={24} />}
                </CheckBox>
              </SelectItem>
            )
          })}

        {/* Add payment method */}
        {!isAccountScreen ? (
          <AddPayment
            onPress={() => {
              setOpenPaymentDetails(true)
            }}
          >
            <AddPaymentBg>
              <AddPaymentBgImage
                style={{
                  width: windowWidth - 32,
                }}
                source={IMAGES.AddPaymentMethodBg}
                resizeMode={'stretch'}
              />
            </AddPaymentBg>

            <AddPaymentRow>
              <AddCrossIcon width={16} height={16} />
              <AddPaymentRowText>Add payment details</AddPaymentRowText>
            </AddPaymentRow>
          </AddPayment>
        ) : (
          <BlackBtn
            style={{
              marginTop: 16,
            }}
            onPress={() => {
              setOpenPaymentDetails(true)
            }}
          >
            <BlackBtnText>
              Add{localPaymentMethods.length > 0 && ' New '}Payment Method
            </BlackBtnText>
          </BlackBtn>
        )}
      </Container>
    )
  },
)

export default ChoosePaymentMethod
