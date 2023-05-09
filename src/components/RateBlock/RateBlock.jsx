import React from "react"
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"
// Helpers
import { rateAverageCount } from "@/components/helpers/rateAverageCount"
// Images
import IMAGES from "@/res/images"
const { RateStarIcon } = IMAGES

// Styles
import styled from "styled-components"
const ListRate = styled.View`
  position: absolute;
  top: 6px;
  right: 8px;
  display: flex;
  align-items: center;
  flex-direction: row;
`
const ListRateAverage = styled(M.PlainText14)`
  color: ${C.black};
  margin-left: 4px;
`
const ListRateFullCountOfReview = styled(M.PlainText14)`
  color: ${C.cyanGray};
  margin-left: 4px;
`
// Card rate
const CardRate = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
`
const CardRateAverage = styled(M.PlainText17)`
  color: ${C.black};
  margin-left: 4px;
`
const CardRateFullCountOfReview = styled(M.PlainText17)`
  color: ${C.cyanGray};
  margin-left: 4px;
`
// Card list
const CardListRateAverage = styled(M.MediumText20)`
  color: ${C.black};
  margin-left: 6px;
`
const CardListRateFullCountOfReview = styled(M.MediumText20)`
  color: ${C.cyanGray};
  margin-left: 6px;
`
// Card fullscreen
const CardFullscreenRateAverage = styled(M.Title24)`
  color: ${C.black};
  margin-left: 6px;
`
const CardFullscreenRateFullCountOfReview = styled(M.Title24)`
  color: ${C.black};
  margin-left: 6px;
`

const RateBlock = ({ reviewData, screenType }) => {
  const rateAverage = rateAverageCount(reviewData)

  const isRateAverageNan = isNaN(rateAverage) ? 0 : rateAverage
  if (!reviewData) return <></>
  switch (screenType) {
    case "list":
      return (
        <ListRate>
          <RateStarIcon width={10} height={9} />
          <ListRateAverage>{isRateAverageNan}</ListRateAverage>
          <ListRateFullCountOfReview>
            ({reviewData.length})
          </ListRateFullCountOfReview>
        </ListRate>
      )

    case "card":
      return (
        <CardRate>
          <RateStarIcon width={20} height={19} />
          <CardRateAverage>{isRateAverageNan}</CardRateAverage>
          <CardRateFullCountOfReview>
            ({reviewData.length})
          </CardRateFullCountOfReview>
        </CardRate>
      )

    case "cardList":
      return (
        <CardRate>
          <RateStarIcon width={20} height={19} />
          <CardListRateAverage>{isRateAverageNan}</CardListRateAverage>
          <CardListRateFullCountOfReview>
            ({reviewData.length} reviews)
          </CardListRateFullCountOfReview>
        </CardRate>
      )

    case "fullscreenCard":
      return (
        <CardRate>
          <RateStarIcon width={20} height={19} />
          <CardFullscreenRateAverage>
            {isRateAverageNan}
          </CardFullscreenRateAverage>
          <CardFullscreenRateFullCountOfReview>
            ({reviewData.length} reviews)
          </CardFullscreenRateFullCountOfReview>
        </CardRate>
      )
    default:
      return
  }
}
export default RateBlock
