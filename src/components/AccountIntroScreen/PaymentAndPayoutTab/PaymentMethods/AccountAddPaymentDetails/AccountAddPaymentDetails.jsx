import React from "react"
import { useState, useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import {
  Animated,
  Keyboard,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useForm, Controller } from "react-hook-form"
// Components
import AddPaymentDetails from "@/components/AddPaymentDetails"
// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateCreateOffer } from "./useAnimateCreateOffer"
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
// Images
import IMAGES from "@/res/images"
const { CrossBlackIcon, GoBackIcon } = IMAGES
// Variables
import C from "@/res/colors"
import F from "@/res/fonts"
import { S } from "@/res/strings"
// Styles
import { style } from "./style"
const { FilterContainer, Header, HeaderClose, HeaderTitle } = style
// Store
import { observer } from "mobx-react-lite"
import { usePaymentAndPayoutApiStore } from "@/stores/PaymentAndPayoutApi"
import AccountStore, { addPaymentCard } from "@/stores/AccountStore"

const AccountAddPaymentDetails = observer(() => {
  const navigation = useNavigation()
  const route = useRoute()
  const {
    isOpenPaymentDetails,
    setOpenPaymentDetails,
    isClosePaymentDetails,
    setClosePaymentDetails,
  } = usePaymentAndPayoutApiStore()

  const isKeyboardOpen = isKeyboardShown()

  const { windowHeight, windowWidth } = getWindowDimension()
  const { onPress, width } = useAnimateCreateOffer()
  useEffect(() => {
    if (isOpenPaymentDetails === true) {
      onPress(true)
    }
  }, [isOpenPaymentDetails])
  // Close tab
  const closeTab = () => {
    onPress(false)
    setTimeout(() => {
      setClosePaymentDetails(false)
    }, 600)
  }

  useEffect(() => {
    if (isClosePaymentDetails === true) {
      closeTab()
    }
  }, [isClosePaymentDetails])

  const onSubmitPaymentDetails = (data) => {
    addPaymentCard({
      id: AccountStore.account.id,
      ...data,
    }).then(() => {
      setOpenPaymentDetails(false)
      onPress(false)
      Keyboard.dismiss()
    })

    return
  }

  return (
    <Animated.View
      style={{
        zIndex: 1000,
        height: windowHeight, 
        width,
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        paddingBottom: 0,
        paddingTop:24
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
              setOpenPaymentDetails(false)
              onPress(false)
            }}
          >
            <GoBackIcon width={12} height={21} />
          </HeaderClose>

          <HeaderTitle>Add Card Details</HeaderTitle>
        </Header>

        <AddPaymentDetails onSubmitPaymentDetails={onSubmitPaymentDetails} />
      </FilterContainer>
    </Animated.View>
  )
})

export default AccountAddPaymentDetails
