import React from 'react'
import { useState, useEffect } from 'react'
import { Animated, Keyboard } from 'react-native'
// Components
import AddPaymentDetails from '@/components/AddPaymentDetails'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateCreateOffer } from './useAnimateCreateOffer'
// Images
import IMAGES from '@/res/images'
const { CrossBlackIcon } = IMAGES

// Styles
import { style } from './style'
const { FilterContainer, Header, HeaderClose, HeaderTitle } = style
// Store
import { observer } from 'mobx-react-lite'
import { useOfferToMusicianApiStore } from '@/stores/OfferToMusicianApi'
import { usePaymentAndPayoutApiStore } from '@/stores/PaymentAndPayoutApi'
import AccountStore, {
  addPaymentCard,
} from '../../../../../stores/AccountStore'
import { observable, runInAction } from 'mobx'

export const OfferDetailsState = observable({
  data: null,
  payments: null,
})

const OfferAddPaymentDetails = observer(() => {
  const { isOpenOfferPreview } = useOfferToMusicianApiStore()
  const {
    isOpenPaymentDetails,
    setOpenPaymentDetails,
    setPaymentDetails,
  } = usePaymentAndPayoutApiStore()

  const { windowHeight, windowWidth } = getWindowDimension()
  const { onPress, height } = useAnimateCreateOffer()
  useEffect(() => {
    if (isOpenPaymentDetails === true) {
      onPress(true)
    }
  }, [isOpenPaymentDetails])

  const [isShowingPaymentDetails, setShowingPaymentDetails] = useState(false)

  useEffect(() => {
    if (isOpenPaymentDetails === true && isOpenOfferPreview === true) {
      setShowingPaymentDetails(true)
    }
  }, [isOpenPaymentDetails, isOpenOfferPreview])

  useEffect(() => {
    if (isShowingPaymentDetails === true && isOpenPaymentDetails === false) {
      onPress(false)
    }
  }, [isShowingPaymentDetails, isOpenPaymentDetails])

  const onSubmitPaymentDetails = (data) => {

    addPaymentCard({
      id: AccountStore.account.id,
      ...data,
    }).then(() => {
      setOpenPaymentDetails(false)
      setShowingPaymentDetails(false)
      onPress(false)
      Keyboard.dismiss()
    })
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
        <Header>
          <HeaderClose
            onPress={() => {
              setOpenPaymentDetails(false)
              setShowingPaymentDetails(false)
              onPress(false)
            }}
          >
            <CrossBlackIcon width={16} height={16} />
          </HeaderClose>

          <HeaderTitle>Add Payment Details</HeaderTitle>
        </Header>

        <AddPaymentDetails onSubmitPaymentDetails={onSubmitPaymentDetails} />
      </FilterContainer>
    </Animated.View>
  )
})

export default OfferAddPaymentDetails
