import React from "react"

// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
// Images
import IMAGES from "@/res/images"
const { DealTimeIcon, DealLocationIcon, DealUserIcon } = IMAGES
// Styles
import { style } from "./style"
const { DealBlock, DealBlockItem, HeaderImageBlock, HeaderImage } = style
// Mixins
import { M } from "@/res/mixin"
const { PlainText17, TitleBold20 } = M

const EventItem = ({ eventData, id }) => {
  const { windowHeight, windowWidth } = getWindowDimension()

  const {
    adTitle,
    adDate,
    eventStart,
    eventEnd,
    adLocation,
    dealUserName,
  } = eventData

  const dealDate = adDate.string.split(",")
  const dealDateWithoutSpace = dealDate[1].trim()

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  const isFirstBg = id % 2 == 0
  return (
    <DealBlock>
      <HeaderImageBlock
        style={{
          width: windowWidth - 34,
        }}
      >
        <HeaderImage
          source={isFirstBg ? IMAGES.CalendarBg1 : IMAGES.CalendarBg2}
          resizeMode={"cover"}
        />
      </HeaderImageBlock>

      <TitleBold20>{adTitle}</TitleBold20>

      <DealBlockItem>
        <DealTimeIcon width={14} height={14} />
        <PlainText17 style={{ marginLeft: 8 }}>
          {`${dealDateWithoutSpace}, ${eventStart.string} to ${eventEnd.string}`}
        </PlainText17>
      </DealBlockItem>

      <DealBlockItem>
        <DealLocationIcon width={13} height={17} />
        <PlainText17
          ellipsizeMode={"tail"}
          numberOfLines={1}
          style={{ marginLeft: 8, marginRight: 1 }}
        >
          {adLocation}
        </PlainText17>
      </DealBlockItem>

      <DealBlockItem>
        <DealUserIcon width={12} height={14} />
        <PlainText17 style={{ marginLeft: 8 }}>{dealUserName}</PlainText17>
      </DealBlockItem>
    </DealBlock>
  )
}

export default EventItem
