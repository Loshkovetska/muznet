import React from "react"
import { useState, useEffect } from "react"
import { useRoute } from "@react-navigation/native"
// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
// Images
import IMAGES from "@/res/images"
const { RoundBlackCheckIcon, GoBackIcon } = IMAGES
// Variables
import C from "@/res/colors"
import { S } from "@/res/strings"
// Styles
import { style } from "./style"
const {
  FilterContainer,
  Header,
  HeaderClose,
  HeaderTitle,
  CountriesList,
  SelectItem,
  SelectText,
  CheckBox,
  ContentBlock,
} = style
// Mixins
import { M } from "@/res/mixin"
const { BlackBtn, BlackBtnText } = M
// Store
import { observer } from "mobx-react-lite"
import { usePaymentAndPayoutApiStore } from "@/stores/PaymentAndPayoutApi"

const ChooseYourCountry = observer(
  ({ closeTab, setSelectedOption, setOpenNextTab }) => {
    const route = useRoute()

    const {
      isClosePayoutDetails,
      setClosePayoutDetails,
    } = usePaymentAndPayoutApiStore()

    const { windowHeight, windowWidth } = getWindowDimension()

    const [
      localPaymentMethodActiveId,
      setLocalPaymentMethodActiveId,
    ] = useState()

    const [isShowSubmitButton, setShowSubmitButton] = useState(false)

    useEffect(() => {
      if (isClosePayoutDetails === false) {
        setShowSubmitButton(false)
      }
    }, [isClosePayoutDetails])

    return (
      <FilterContainer
        style={{
          height: "100%", //windowHeight,
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

          <HeaderTitle>Choose Your Country</HeaderTitle>
        </Header>

        <CountriesList>
          {S.ListOfWorldCountries.map((country, id) => {
            const isActive = id === localPaymentMethodActiveId
            const isLast = id === S.ListOfWorldCountries.length - 1

            return (
              <SelectItem
                style={{
                  marginBottom: isLast === true ? 170 : 0,
                  borderBottomWidth: isLast === true ? 0 : 1,
                }}
                key={id}
                onPress={() => {
                  setLocalPaymentMethodActiveId(id)
                  setSelectedOption(country)
                  setShowSubmitButton(true)
                }}
              >
                <SelectText>{country}</SelectText>

                <CheckBox isActive={isActive}>
                  {isActive && <RoundBlackCheckIcon width={24} height={24} />}
                </CheckBox>
              </SelectItem>
            )
          })}
        </CountriesList>

        {/* Footer block */}
        <ContentBlock>
          {isShowSubmitButton ? (
            <BlackBtn
              style={{
                width: "100%",
                backgroundColor: C.black,
              }}
              onPress={() => {
                setOpenNextTab(true)
              }}
            >
              <BlackBtnText style={{ color: C.white }}>Next</BlackBtnText>
            </BlackBtn>
          ) : (
            <BlackBtn
              activeOpacity={0.2}
              style={{
                width: "100%",
                backgroundColor: C.gray,
              }}
            >
              <BlackBtnText
                style={{
                  color: C.sBlack,
                }}
              >
                Next
              </BlackBtnText>
            </BlackBtn>
          )}
        </ContentBlock>
      </FilterContainer>
    )
  },
)

export default ChooseYourCountry
