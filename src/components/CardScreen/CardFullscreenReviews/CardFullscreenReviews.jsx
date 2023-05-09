import React, { useRef } from "react"
import { useState, useEffect } from "react"
import { BackHandler } from "react-native"

// Components
import RateBlock from "@/components/RateBlock"
import CardFullscreenReviewItem from "./CardFullscreenReviewItem"

// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
// Variables
import C from "@/res/colors"
// Images
import IMAGES from "@/res/images"
const { GoBackIcon } = IMAGES
// Styles
import { style } from "./style"
const {
  ReviewsContainer,
  Header,
  HeaderClose,
  ReviewsList,
  ReviewListItem,
} = style

const CardFullscreenReviews = ({
  cardReviews,
  fullscreenReviewState,
  setFullscreenReviewState,
}) => {
  if (cardReviews === undefined || cardReviews.lenght === 0) return
  const { windowHeight, windowWidth } = getWindowDimension()

  const [scrollToIndex, setScrollToIndex] = useState(0)
  const [dataSourceCords, setDataSourceCords] = useState([])
  const ref = useRef(null)

  const [activeReview, setActiveReview] = useState(false)

  const scrollHandler = () => {
    if (!ref.current) return
    if (dataSourceCords?.length > scrollToIndex) {
      ref.current.scrollTo({
        x: 0,
        y: dataSourceCords[scrollToIndex - 1],
        animated: true,
      })
    }
  }

  useEffect(() => {
    if (
      fullscreenReviewState.isOpen === true &&
      fullscreenReviewState.isViewAll === false
    ) {
      setTimeout(() => {
        setScrollToIndex(fullscreenReviewState.initialReview)
        scrollHandler()
        // setActiveReview(true)
        // setTimeout(() => {
        //     setActiveReview(false)
        // }, 2000);
      }, 50)
    }
  }, [fullscreenReviewState.isOpen, scrollToIndex])

  useEffect(() => {
    if (fullscreenReviewState.isOpen === true) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          setFullscreenReviewState({
            isOpen: false,
            initialSlide: fullscreenReviewState.initialReview,
          })
          return true
        },
      )
      return () => {
        backHandler.remove()
      }
    }
  }, [])

  return (
    <ReviewsContainer
      ref={ref}
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
    >
      {/* Header */}
      <Header>
        <HeaderClose
          onPress={() => {
            setFullscreenReviewState({
              isOpen: false,
              initialReview: fullscreenReviewState.initialReview,
            })
          }}
        >
          <GoBackIcon width={9} height={16} />
        </HeaderClose>
        <RateBlock reviewData={cardReviews} screenType={"fullscreenCard"} />
      </Header>

      {/* Reviews block */}
      <ReviewsList>
        {cardReviews.map((review, key) => {
          return (
            <ReviewListItem
              style={{
                backgroundColor:
                  activeReview === true &&
                  fullscreenReviewState.initialReview === key
                    ? C.lightGray
                    : "white",
              }}
              onLayout={(event) => {
                const layout = event.nativeEvent.layout
                dataSourceCords[key] = layout.y
                setDataSourceCords(dataSourceCords)
              }}
              key={key}
            >
              <CardFullscreenReviewItem
                reviewData={review}
                isFullScreen={true}
              />
            </ReviewListItem>
          )
        })}
      </ReviewsList>
    </ReviewsContainer>
  )
}

export default CardFullscreenReviews
