import React from "react"
import { useState } from "react"

import { useNavigation } from "@react-navigation/native"
// Images
import IMAGES from "@/res/images"
const { MapPointIcon, EditBlackIcon } = IMAGES
// Styles
import { style } from "./style"
import RateBlock from "@/components/RateBlock"

const {
  ItemContainer,
  ItemRow,
  ItemImageBlock,
  ItemImage,
  // Info
  ItemInfo,
  ItemInfoLocation,
  ItemInfoLocationText,
  ItemInfoDescription,
  ItemInfoName,
  ItemInfoCost,
  ItemInfoCostValue,
  ItemInfoCostValuePostfix,
  ButtonsRow,
  AddPayment,
  AddPaymentRowText,
} = style
// Mixins
import { M } from "@/res/mixin"
const { BlackBtn, BlackBtnText } = M

import { observer } from "mobx-react-lite"
import { runInAction, set } from "mobx"
import { useAccountApiStore } from "@/stores/AccountApi"

const AdsItem = observer(({ data, isDisableBottomMargin, setScrollToTop }) => {
  if (data === undefined) return null

  const {
    contractorAccountDataApi,
    setOpenTabs,
    setAdIdForEdit,
  } = useAccountApiStore()

  const navigation = useNavigation()

  const {
    id,
    adImage,
    userPricePerHour,
    userCurrencyType,
    adDescription,
    adTitle,
    adLocation,
    adReview,
  } = data

  const [isInfoBiggerThanImage, setInfoBiggerThanImage] = useState(false)

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout
    if (height > 106) {
      setInfoBiggerThanImage(true)
    } else {
      setInfoBiggerThanImage(false)
    }
    return
  }

  const isAdReview = adReview === undefined ? [] : adReview

  return (
    <ItemContainer
      style={{
        marginBottom: isDisableBottomMargin === true ? 0 : 8,
      }}
      onPress={() => {
        setScrollToTop !== undefined && setScrollToTop(true)
        navigation.navigate("ContractorStack", {
          screen: "ContractorCardScreen",
          params: {
            adsId: id,
          },
        })
      }}
    >
      {/* Rate */}
      <RateBlock reviewData={isAdReview} screenType={"list"} />

      <ItemRow>
        {/* Image */}
        <ItemImageBlock>
          {adImage && (
            <ItemImage
              source={{
                uri: adImage[0],
              }}
              resizeMode={"cover"}
            />
          )}
        </ItemImageBlock>

        {/* Main data */}
        <ItemInfo
          isInfoBiggerThanImage={isInfoBiggerThanImage}
          onLayout={onLayout}
          isForMap={isDisableBottomMargin}
        >
          {/* Location */}
          <ItemInfoLocation>
            <MapPointIcon width={8} height={12} />

            <ItemInfoLocationText ellipsizeMode={"tail"} numberOfLines={1}>
              {adLocation}
            </ItemInfoLocationText>
          </ItemInfoLocation>

          {/* Name */}
          <ItemInfoName numberOfLines={2} ellipsizeMode={"tail"}>
            {adTitle}
          </ItemInfoName>
          {/* Description */}
          <ItemInfoDescription ellipsizeMode={"tail"} numberOfLines={1}>
            {adDescription}
          </ItemInfoDescription>

          {/* Cost */}
          <ItemInfoCost>
            <ItemInfoCostValue>
              {userCurrencyType}
              {userPricePerHour}
            </ItemInfoCostValue>
            <ItemInfoCostValuePostfix>/ hour</ItemInfoCostValuePostfix>
          </ItemInfoCost>
        </ItemInfo>
      </ItemRow>

      <ButtonsRow>
        <BlackBtn
          style={{
            height: 48,
            borderRadius: 8,
            width: "48.5%",
          }}
          onPress={() => {
            navigation.navigate("ContractorStack", {
              screen: "ContractorPromoteAdScreen",
            })
          }}
        >
          <BlackBtnText>Promote</BlackBtnText>
        </BlackBtn>

        <AddPayment
          onPress={() => {
            setAdIdForEdit(id)
            setOpenTabs({
              tabName: "Edit ad",
              isOpen: true,
            })
          }}
        >
          <EditBlackIcon width={16} height={16} />
          <AddPaymentRowText>Edit</AddPaymentRowText>
        </AddPayment>
      </ButtonsRow>
    </ItemContainer>
  )
})

export default AdsItem
