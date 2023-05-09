import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { style } from './style'
import VideoComponent from '@/components/VideoComponent'
import images from '@/pages/Community/images'
import { AddInfoState } from '@/components/pages/posts/AddPhotos'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'

const {
  SliderContainer,
  SliderScrollView,
  SliderImagePressable,
  SliderImage,
  SliderDots,
  SliderDotsBlock,
  SliderDot,
  SliderImageContainer,
  SliderImageCount,
  SliderImageCountBlock,
  SliderExpand,
} = style

const { Expand, DeleteIcon, video } = images

const Carousel = ({ cardImages, mode = 'carousel' }) => {
  const route = useRoute()
  const [currentSlide, setSlide] = useState(0)
  const routeParams = route.params
  const { windowHeight, windowWidth } = getWindowDimension()
  const [initialContentOffset, setInitialContentOffset] = useState(0)
  const [sizes, setSizes] = useState([])

  useEffect(() => {
    if (mode == 'add-imgs' && AddInfoState.media) {
      setSizes([...AddInfoState.media.map((p) => p.size)])
    }
    if (mode == 'edit-imgs' && AddInfoState.media) {
      setSizes([...AddInfoState.media.map((p) => p.size)])
    }
  }, [AddInfoState.media])

  if (!cardImages?.length) return <></>
  const dotsBlockWidth =
    cardImages?.length * 8 + (cardImages?.length - 1) * 8 + 16

  let isMovie = false
  if (cardImages[currentSlide] && cardImages[currentSlide]?.uri) {
    isMovie = cardImages[currentSlide]?.uri?.includes('mov')
  }
  return (
    <SliderContainer>
      {cardImages?.length > 1 ? (
        <SliderImageCountBlock>
          <SliderImageCount>
            {currentSlide + 1}/{cardImages?.length}
          </SliderImageCount>
        </SliderImageCountBlock>
      ) : (
        <></>
      )}
      {mode == 'add-imgs' && !isMovie ? (
        <SliderExpand
          onPress={() => {
            const exp = JSON.parse(JSON.stringify(sizes))
            if (exp.length) {
              exp[currentSlide] =
                exp[currentSlide] == 'contain' ? 'cover' : 'contain'
            }
            runInAction(() => {
              AddInfoState.media[currentSlide].size = exp[currentSlide]
            })

            setSizes([...exp])
          }}
        >
          <Expand />
        </SliderExpand>
      ) : (
        <></>
      )}
      {mode == 'edit-imgs' && AddInfoState.media.length > 1 ? (
        <SliderExpand
          style={{
            borderWidth: 0,
            backgroundColor: 'rgba(242, 243, 249, 0.2)',
            width: 32,
            height: 32,
          }}
          onPress={() => {
            runInAction(() => {
              AddInfoState.media = AddInfoState.media.filter(
                (p, i) => i != currentSlide,
              )
            })
            setSizes([...AddInfoState.media.map((p) => p.size)])
          }}
        >
          <DeleteIcon />
        </SliderExpand>
      ) : (
        <></>
      )}

      <SliderScrollView
        scrollEventThrottle={16}
        onScroll={({ nativeEvent }) => {
          if (nativeEvent) {
            if (cardImages?.length == 1) return
            let slide = Math.ceil(
              nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
            )
            if (slide < 0) {
              slide *= -1
            }

            if (slide >= cardImages?.length) {
            } else setSlide(slide)
          }
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={true}
        contentOffset={{
          x: initialContentOffset !== undefined ? initialContentOffset : 0,
          y: 0,
        }}
      >
        {cardImages.map((img, key) => {
          let type =
            typeof img == 'object'
              ? String(img.uri).includes('mov')
                ? 'video'
                : 'image'
              : 'image'
          let rezmode = 'cover'

          if (sizes.length) {
            rezmode = mode == 'carousel' ? 'cover' : sizes[key]
          }

          if (type == 'video') {
           // console.log(img)
          }

          return (
            <Fragment key={key}>
              {type == 'image' ? (
                <SliderImagePressable>
                  <SliderImage
                    style={{
                      width: windowWidth,
                      height: windowHeight / 2,
                    }}
                    source={img}
                    resizeMode={rezmode}
                  />
                </SliderImagePressable>
              ) : (
                <VideoComponent video={img.uri} poster={img} />
              )}
            </Fragment>
          )
        })}
      </SliderScrollView>

      {cardImages?.length > 1 ? (
        <SliderDots>
          <SliderDotsBlock
            style={{
              width: dotsBlockWidth,
            }}
          >
            {cardImages?.map((img, key) => {
              const isActive = key === currentSlide
              const isFirst = key === 0
              return (
                <SliderDot
                  isFirst={isFirst}
                  isActive={isActive}
                  key={key}
                ></SliderDot>
              )
            })}
          </SliderDotsBlock>
        </SliderDots>
      ) : (
        <></>
      )}
    </SliderContainer>
  )
}

export default observer(Carousel)
