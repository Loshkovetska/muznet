import React from 'react'
import { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
// Images
import IMAGES from '@/res/images'
const { MapPointIcon } = IMAGES
// Styles
import { style } from '../ItemMusician/style'
import RateBlock from '@/components/RateBlock'

const {
  ItemContainer,
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
} = style

const ItemVendor = ({ data, isDisableBottomMargin, setScrollToTop }) => {
  if (data === undefined) return null
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
    //   const { height } = event.nativeEvent.layout
    //   if (height > 106) {
    //     setInfoBiggerThanImage(true)
    //   } else {
    //     setInfoBiggerThanImage(false)
    //   }
    //   return
  }

  return (
    <ItemContainer
      activeOpacity={1}
      style={{
        marginBottom: isDisableBottomMargin === true ? 0 : 8,
      }}
      onPress={() => {
        setScrollToTop !== undefined && setScrollToTop(true)
        navigation.navigate('MusicianStack', {
          screen: 'ContractorAdsCardScreen',
          params: {
            adsId: id,
            adsData: data,
          },
        })
      }}
    >
      {/* Rate */}
      <RateBlock reviewData={adReview} screenType={'list'} />

      {/* Image */}
      <ItemImageBlock>
        <ItemImage
          source={
            adImage.length
              ? {
                  uri: adImage.split(', ')[0],
                }
              : IMAGES.Logo
          }
          resizeMode={'cover'}
        />
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

          <ItemInfoLocationText ellipsizeMode={'tail'} numberOfLines={1}>
            {adLocation}
          </ItemInfoLocationText>
        </ItemInfoLocation>

        {/* Name */}
        <ItemInfoName numberOfLines={2} ellipsizeMode={'tail'}>
          {adTitle}
        </ItemInfoName>
        {/* Description */}
        <ItemInfoDescription ellipsizeMode={'tail'} numberOfLines={1}>
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
    </ItemContainer>
  )
}

export default ItemVendor
