import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Collapsible from 'react-native-collapsible'
// Components
import RateBlock from '@/components/RateBlock'
import CardImageSlider from './CardImageSlider'
import CardFullscreenImageSlider from './CardFullscreenImageSlider'
import CardFullscreenReviews from './CardFullscreenReviews'
import CardMediaImage from './CardMediaImage'
import CardLocationBlock from './CardLocationBlock'
import CardReviewsList from './CardReviewsList'
import CardSimilarList from './CardSimilarList'
import CardSendMessage from './CardSendMessage'

// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { skillGenerator } from './scripts/skillGenerator'
import { eventDateString } from './scripts/eventDateString'
// Images
import IMAGES from '@/res/images'
import { Share, Text, View } from 'react-native'

const {
  ShareWhiteIcon,
  GoBackWhiteIcon,
  MapPointIcon,
  WarningGrayIcon,
  ClockGrayIcon,
} = IMAGES
// Variables
import C from '@/res/colors'
import { S } from '@/res/strings'
// Styles
import { style } from './style'
import { runInAction } from 'mobx'
import * as Clipboard from 'expo-clipboard'

import { HideStatusBar } from './CardFullscreenImageSlider/CardFullscreenImageSlider'
import { observer } from 'mobx-react-lite'
const {
  CardContainer,
  CardContainerScrollView,
  Header,
  HeaderClose,
  // Card info
  CardInfo,
  CardMainInfo,
  CardInfoRow,
  CardLocation,
  CardLocationText,
  CardTitle,
  CardInfoDate,
  CardInfoDateText,
  GenreBlock,
  Genre,
  GenreText,
  DescriptionContainer,
  DescriptionContainerTitle,
  DescriptionContainerText,
  ShowDescriptionButton,
  ShowDescriptionButtonText,
  CardBorder,
  CardList,
  CardListBlock,
  CardListHeader,
  CardListText,
  CardListItem,
  CardListDot,
  WarningBlock,
  WarningBlockText,
  // Bottom buttons
  ContentBlock,
  ContentBlockRow,
  ContainerPerHour,
  PricePerHourValue,
  PricePerHourText,
  ButtonSubmit,
  ButtonSubmitText,
} = style

const CardScreen = observer(
  ({ isMusician, data, routeId, isForContractorFromAccountView }) => {
    const navigation = useNavigation()

    const { windowHeight, windowWidth } = getWindowDimension()
    // Define musician or ad
    const isMusicianTrue = isMusician === true

    let cardImages = []

    if (isMusicianTrue) {
      if (typeof data.userAvatar == 'string') {
        cardImages = data.userAvatar.length
          ? data.userAvatar
              ?.trim()
              .split(', ')
              .filter((c) => c.length)
          : []
      } else {
        cardImages = data.userAvatar?.length ? data.userAvatar : [IMAGES.Logo]
      }
    } else {
      cardImages = data.adImage?.length
        ? data.adImage
            ?.trim()
            ?.split(', ')
            .filter((c) => c.length)
        : []
    }

    const cardLocation = isMusicianTrue ? data.userLocation : data.adLocation
    const cardReviews = isMusicianTrue ? data.userReviews : data.adReview
    const cardTitle = isMusicianTrue
      ? `${data.userName} ${data.userSurName}`
      : data.adTitle
    const cardGenres = isMusicianTrue
      ? data.userGenres
      : data.adGenres
      ? data.adGenres.split(',')
      : []

    const cardDescription = isMusicianTrue
      ? data.userDescription
      : data.adDescription
    const cardBandMembers =
      isMusicianTrue && data.userMusicianType === 'Band' && data.userBandMembers
    const cardSkills = isMusicianTrue ? data.userSkills : data.adSkills
    const converterSkills = skillGenerator(cardSkills)
    const cardMusicalInstrument = isMusicianTrue
      ? data.userMusicalInstrument
      : data.adMusicalInstrument.split(',')
    const cardMusicianType = data.adTypeOfMusician
    const cardCoords = !isMusicianTrue && data.coordinate
    const willingToTravel =
      data.willingToTravel == '1' || data.willingToTravel == 'true'
        ? true
        : false
    const adEventDate = !isMusicianTrue && data.adDate.string
    const adEventStartTime = !isMusicianTrue && data.eventStart.string
    const adEventEndTime = !isMusicianTrue && data.eventEnd.string
    const userPricePerHour = data.userPricePerHour
    const userCurrencyType = data.userCurrencyType

    // Fullscreen image
    const [fullscreenImgState, setFullscreenImgState] = useState({
      isOpen: false,
      initialSlide: 0,
    })

    // Description
    const isDescriptionWithHiddenText = cardDescription.length > 201
    const descriptionFirstPart = cardDescription.slice(0, 200)
    const descriptionSecondPart = cardDescription.slice(
      201,
      cardDescription.length,
    )
    const [showMoreDescription, setShowMoreDescription] = useState(true)

    // Review block
    const [fullscreenReviewState, setFullscreenReviewState] = useState({
      isOpen: false,
      initialReview: 0,
      isViewAll: false,
    })

    // Send message state
    const [isOpenSendMessage, setOpenSendMessage] = useState(false)

    // Reset state on focus
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setShowMoreDescription(true)
        setFullscreenImgState({ isOpen: false, initialSlide: 0 })
        runInAction(() => {
          HideStatusBar.state = false
        })
      })
      return unsubscribe
    }, [navigation])

    // Scroll top when press on similar
    const scrollViewRef = useRef(null)
    const [isScrollToTop, setScrollToTop] = useState(false)
    const scrollTop = () => {
      if (scrollViewRef.current) {
        setTimeout(() => {
          scrollViewRef.current.scrollTo({ y: 0, animated: false })
        }, 20)
      }
    }
    useEffect(() => {
      if (isScrollToTop === true) {
        scrollTop()
        setTimeout(() => {
          setScrollToTop(false)
        }, 20)
      }
    }, [isScrollToTop])

    const more = async () => {
      try {
        const result = await Share.share({
          message: `Muznet | ${
            isMusicianTrue ? 'Musician' : 'Contractor'
          }: ${cardTitle}, ${cardLocation} muznet/`,
          url: cardImages?.length ? cardImages[0] : '',
          title: `Muznet | ${isMusicianTrue ? 'Musicians' : 'Contractors'}`,
        })

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            if (result.activityType.toLocaleLowerCase().includes('copy')) {
            }
          } else {
          }
        } else if (result.action === Share.dismissedAction) {
        }
      } catch (error) {
        alert(error.message)
      }
    }

    // Components
    const locationComponent =
      cardLocation !== undefined ? (
        <CardLocation
          style={{
            marginTop: isMusicianTrue ? 0 : 11,
          }}
        >
          <MapPointIcon width={12} height={17} />
          <CardLocationText>{cardLocation}</CardLocationText>
        </CardLocation>
      ) : (
        <CardLocation></CardLocation>
      )

    const rateComponent = (
      <RateBlock reviewData={cardReviews} screenType={'card'} />
    )
    const titleComponent = cardTitle !== undefined && (
      <CardTitle>{cardTitle}</CardTitle>
    )

    const eventDateText = `${adEventDate}, ${adEventStartTime} to ${adEventEndTime}`
    return (
      <CardContainer
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
      >
        {/* Fullscreen  image slider */}
        {fullscreenImgState.isOpen === true && (
          <CardFullscreenImageSlider
            cardImages={
              cardImages?.length
                ? cardImages.map((c) => {
                    return {
                      uri: c,
                    }
                  })
                : []
            }
            fullscreenImgState={fullscreenImgState}
            setFullscreenImgState={setFullscreenImgState}
          />
        )}
        {/* Fullscreen review */}
        {fullscreenReviewState.isOpen === true && (
          <CardFullscreenReviews
            cardReviews={cardReviews}
            fullscreenReviewState={fullscreenReviewState}
            setFullscreenReviewState={setFullscreenReviewState}
          />
        )}
        {/* Send message */}
        {isOpenSendMessage === true && (
          <CardSendMessage
            receiverId={!isMusicianTrue ? data.id_client : data.id}
            receiverName={cardTitle}
            isMusician={isMusicianTrue}
            setOpenSendMessage={setOpenSendMessage}
          />
        )}

        <CardContainerScrollView
          showsVerticalScrollIndicator={false}
          horizontal={false}
          ref={scrollViewRef}
        >
          {/* Header */}
          <Header>
            <HeaderClose
              onPress={() => {
                navigation.goBack()
              }}
            >
              <GoBackWhiteIcon width={11} height={22} />
            </HeaderClose>

            <HeaderClose
              style={{
                backgroundBlendMode: 'luminosity',
              }}
              onPress={() => {
                setFullscreenImgState({
                  isOpen: false,
                  initialSlide: fullscreenImgState.initialSlide,
                })
                more()
              }}
            >
              <ShareWhiteIcon width={25} height={23} />
            </HeaderClose>
          </Header>

          {/* Image slider */}
          <CardImageSlider
            cardImages={
              cardImages?.length
                ? cardImages.map((c) => {
                    return {
                      uri: c.trim(),
                    }
                  })
                : []
            }
            fullscreenImgState={fullscreenImgState}
            setFullscreenImgState={setFullscreenImgState}
          />

          <CardInfo>
            {/* Main info for musician */}
            {isMusicianTrue && (
              <CardMainInfo>
                <CardInfoRow>
                  <Text
                    style={{
                      flex: 1,
                      marginRight: 16,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {locationComponent}
                  </Text>
                  {rateComponent}
                </CardInfoRow>
                <Text
                  style={{
                    flex: 1,
                    marginRight: 80,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {titleComponent}
                </Text>
                {cardGenres !== undefined && (
                  <GenreBlock>
                    {cardGenres?.map((genre, key) => {
                      const lowerGenre = genre.toLowerCase()
                      return (
                        genre !== undefined && (
                          <Genre key={key}>
                            <GenreText>{lowerGenre}</GenreText>
                          </Genre>
                        )
                      )
                    })}
                  </GenreBlock>
                )}
              </CardMainInfo>
            )}
            {/* Main info for ads */}
            {!isMusicianTrue && (
              <CardMainInfo>
                <CardInfoRow>
                  {titleComponent}
                  {rateComponent}
                </CardInfoRow>
                {locationComponent}
                <CardInfoDate>
                  <ClockGrayIcon width={14} height={14} />
                  <CardInfoDateText>{eventDateText}</CardInfoDateText>
                </CardInfoDate>

                <CardBorder></CardBorder>
              </CardMainInfo>
            )}

            {/* Description */}
            {cardDescription?.length > 0 ? (
              isDescriptionWithHiddenText === true ? (
                <DescriptionContainer>
                  {!isMusicianTrue && (
                    <DescriptionContainerTitle>
                      We are looking for:
                    </DescriptionContainerTitle>
                  )}
                  <DescriptionContainerText>
                    {descriptionFirstPart}
                    {showMoreDescription === true && ' ...'}
                  </DescriptionContainerText>
                  <Collapsible collapsed={showMoreDescription} align="center">
                    <DescriptionContainerText>
                      {descriptionSecondPart}
                    </DescriptionContainerText>
                  </Collapsible>
                  <ShowDescriptionButton
                    onPress={() => {
                      setShowMoreDescription(!showMoreDescription)
                    }}
                  >
                    <ShowDescriptionButtonText>
                      {showMoreDescription === true ? 'Show more' : 'Show less'}
                    </ShowDescriptionButtonText>
                  </ShowDescriptionButton>

                  <CardBorder></CardBorder>
                </DescriptionContainer>
              ) : (
                <DescriptionContainer>
                  <DescriptionContainerText>
                    {cardDescription}
                  </DescriptionContainerText>

                  <CardBorder></CardBorder>
                </DescriptionContainer>
              )
            ) : null}

            {/* Band members list */}
            {isMusicianTrue && cardBandMembers && (
              <CardList>
                <CardListHeader>Band members:</CardListHeader>
                <CardListBlock>
                  {cardBandMembers.map((bandMember, key) => {
                    return (
                      <CardListItem key={key}>
                        <CardListDot></CardListDot>
                        <CardListText>{bandMember}</CardListText>
                      </CardListItem>
                    )
                  })}
                </CardListBlock>

                <CardBorder></CardBorder>
              </CardList>
            )}

            {/* Musician types list */}
            {!isMusicianTrue && cardMusicianType !== undefined && (
              <CardList>
                <CardListHeader>Type of musician:</CardListHeader>
                <CardListBlock>
                  <CardListItem>
                    <CardListDot></CardListDot>

                    <CardListText>{cardMusicianType}</CardListText>
                  </CardListItem>
                </CardListBlock>

                <CardBorder></CardBorder>
              </CardList>
            )}

            {/* Instruments */}
            {cardMusicalInstrument?.length > 0 && (
              <CardList>
                <CardListHeader>Instruments:</CardListHeader>
                <CardListBlock>
                  {cardMusicalInstrument.map((skill, key) => {
                    return (
                      <CardListItem key={key}>
                        <CardListDot></CardListDot>
                        <CardListText>{skill}</CardListText>
                      </CardListItem>
                    )
                  })}
                </CardListBlock>

                <CardBorder></CardBorder>
              </CardList>
            )}

            {/* Ad genres */}
            {!isMusicianTrue && cardGenres?.length > 0 && (
              <CardList>
                <CardListHeader>Music genres:</CardListHeader>
                <CardListBlock>
                  {cardGenres.map((genre, key) => {
                    return (
                      <CardListItem key={key}>
                        <CardListDot></CardListDot>
                        <CardListText>{genre}</CardListText>
                      </CardListItem>
                    )
                  })}
                </CardListBlock>
                <CardBorder></CardBorder>
              </CardList>
            )}

            {/* Skills list */}
            {converterSkills?.length > 0 && (
              <CardList>
                <CardListHeader>Musician skills:</CardListHeader>
                <CardListBlock>
                  {converterSkills.map((skill, key) => {
                    return (
                      <CardListItem key={key}>
                        <CardListDot></CardListDot>
                        <CardListText>{skill}</CardListText>
                      </CardListItem>
                    )
                  })}
                </CardListBlock>

                <CardBorder></CardBorder>
              </CardList>
            )}

            {/* Other willing to travel */}
            {isMusicianTrue && willingToTravel === true && (
              <CardList>
                <CardListHeader>Other:</CardListHeader>
                <CardListBlock>
                  <CardListItem>
                    <CardListDot></CardListDot>
                    <CardListText>
                      Willing to travel interstate for gigs
                    </CardListText>
                  </CardListItem>
                </CardListBlock>

                <CardBorder></CardBorder>
              </CardList>
            )}

            {/* Media block */}
            {isMusicianTrue && (
              <CardMediaImage
                cardImages={cardImages}
                fullscreenImgState={fullscreenImgState}
                setFullscreenImgState={setFullscreenImgState}
              />
            )}

            {/* Ad location block */}
            {!isMusicianTrue && (
              <CardLocationBlock
                cardAddress={cardLocation}
                cardCoords={cardCoords}
              />
            )}

            <View
              style={{
                height: 24,
              }}
            ></View>

            {/* Review block */}
            {/* {cardReviews && cardReviews?.length > 0 && (
              <>
                <CardBorder></CardBorder>
                <CardReviewsList
                  cardReviews={cardReviews}
                  fullscreenReviewState={fullscreenReviewState}
                  setFullscreenReviewState={setFullscreenReviewState}
                />
              </>
            )} */}

            {/* {!isForContractorFromAccountView && <CardBorder></CardBorder>} */}
            {/* Warning */}
            {/* {isMusician && (
              <WarningBlock>
                <WarningGrayIcon width={27} height={27} />
                <WarningBlockText>
                  To protect your payment, never transfer money or communicate
                  outside of the MuzNet app
                </WarningBlockText>
              </WarningBlock>
            )} */}
            {/* Similar */}
            {!isForContractorFromAccountView && (
              <CardSimilarList
                userId={routeId}
                setScrollToTop={setScrollToTop}
                isMusician={isMusicianTrue}
              />
            )}
          </CardInfo>
        </CardContainerScrollView>

        {/* Bottom block */}
        <ContentBlock>
          <ContentBlockRow>
            <ContainerPerHour>
              <PricePerHourValue>
                {userCurrencyType.split('-')[1]}
                {userPricePerHour}
              </PricePerHourValue>
              <PricePerHourText> / hour</PricePerHourText>
            </ContainerPerHour>
            {!isForContractorFromAccountView && !data.blocksCurrent && (
              <ButtonSubmit
                onPress={() => {
                  setOpenSendMessage(true)
                }}
              >
                <ButtonSubmitText>
                  {isMusician ? `Contact ${data.userName}` : 'Send Message'}
                </ButtonSubmitText>
              </ButtonSubmit>
            )}
          </ContentBlockRow>
        </ContentBlock>
      </CardContainer>
    )
  },
)

export default CardScreen
