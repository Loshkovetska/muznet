import React from "react"
import { useEffect } from "react"
import { Animated } from "react-native"
// Components
import ContactUsButton from "../ContactUsButton"
import DidYouGetTheHelp from "./DidYouGetTheHelp"
// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateOfferPreview } from "./useAnimateOfferPreview"
// Images
import IMAGES from "@/res/images"
const { GoBackIcon, WarningGrayIcon } = IMAGES
// Variables
import C from "@/res/colors"
import F from "@/res/fonts"
import { S } from "@/res/strings"
// Styles
import { style } from "./style"
const {
  FilterContainer,
  Header,
  HeaderClose,
  HeaderTitle,
  ArticleContainer,
  ArticleParagraph,
  ArticleText,
  ArticleLiText,
  BoldText,
  ArticleSubTitle,
  WarningBlock,
  WarningBlockText,
  PopularArticleBlock,
  AccountLink,
  AccountLinkText,
  AccountLinkIcon,
} = style
// Mixins
import { M } from "@/res/mixin"
const { Title20 } = M
// Store
import { observer } from "mobx-react-lite"
import { useAccountApiStore } from "@/stores/AccountApi"
import { useRoute, useScrollToTop } from "@react-navigation/native"

const ArticleTab = observer(
  ({
    isOpenTab,
    setOpen,
    isClose,
    titleName,
    setOpenContactUs,
    setArticleTab,
  }) => {
    const { windowHeight, windowWidth } = getWindowDimension()
    const {
      faqVendorAllArticles,
      faqMusicianAllArticles,
    } = useAccountApiStore()
    const { onPress, width } = useAnimateOfferPreview()
    const route = useRoute()
    const isContractor = route.name.includes("Contractor")
    useEffect(() => {
      if (isOpenTab === true) {
        onPress(true)
      }
    }, [isOpenTab])

    // Close tab
    const closeTab = () => {
      onPress(false)
      setTimeout(() => {
        setOpen({
          isOpen: false,
          allTopicsList: [],
          allTopicsTitle: "",
        })
      }, 600)
    }

    useEffect(() => {
      if (isClose === true) {
        closeTab()
      }
    }, [isClose])

    const ref = React.useRef(null)

    useEffect(() => {
      if (!ref.current) return

      ref.current.scrollTo({
        offset: 0,
      })
    }, [titleName])

    const relatedArticles = isContractor
      ? faqVendorAllArticles.filter(
          (f) => f.topicName == titleName.topicName && f.id != titleName.id,
        )
      : faqMusicianAllArticles.filter(
          (f) => f.topicName == titleName.topicName && f.id != titleName.id,
        )

    return (
      <Animated.View
        style={{
          zIndex: 1000,
          height: windowHeight,
          backgroundColor: "white",
          // width: windowWidth,
          width,
          justifyContent: "center",
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <FilterContainer
          style={{
            height: windowHeight,
            width: windowWidth,
          }}
          ref={ref}
        >
          <Header>
            <HeaderClose
              onPress={() => {
                closeTab()
              }}
            >
              <GoBackIcon width={12} height={21} />
            </HeaderClose>
          </Header>
          <ArticleContainer>
            <HeaderTitle>{titleName.articleTitle}</HeaderTitle>
            <ArticleParagraph>
              <ArticleText>{titleName.articleContent}</ArticleText>
            </ArticleParagraph>
            {/* <ArticleParagraph>
              <ArticleText>
                You can quickly narrow your search by using travel dates and
                filters to find an available listing with the amenities you
                want. You can read the listings for more details and pinpoint
                them on the map to check if they’d be a good fit for your trip.
              </ArticleText>
            </ArticleParagraph>

            <ArticleParagraph>
              <ArticleText>To search for a place to stay:</ArticleText>
            </ArticleParagraph>

            <ArticleParagraph>
              <ArticleLiText>
                1. Enter your destination, travel dates, and number of guests,
                then click <BoldText>Search.</BoldText>
              </ArticleLiText>

              <ArticleLiText>
                2. If you want, use the filters (for example, price range) to
                narrow your options. Click <BoldText>More filters </BoldText>to
                see all available filters.
              </ArticleLiText>

              <ArticleLiText>
                3. Scroll through the listings or use the map to find listings
                in the location you want.
              </ArticleLiText>

              <ArticleLiText>
                4. Click on a listing to open it. To learn more about it, read
                the description, check the available amenities, review the house
                rules, and read reviews that other guests have left for the
                host.
              </ArticleLiText>

              <ArticleLiText>
                6. If you have any questions, send the host a message. Or if
                you’re ready to book, click<BoldText> Reserve</BoldText> and
                request to book the listing (or use Instant Book if the host has
                it turned on).
              </ArticleLiText>
            </ArticleParagraph>

            <ArticleParagraph>
              <ArticleText>
                You can also save your favourite places in{" "}
                <BoldText>Save</BoldText> to keep them handy for later or to
                share with your friends.
              </ArticleText>
            </ArticleParagraph>

            <ArticleSubTitle>Using the map</ArticleSubTitle>

            <ArticleParagraph>
              <ArticleText>
                The map is a quick way to review the listings in relation to
                areas of interest. You can zoom in or move around the map to
                find additional listings that don’t appear at the initial zoom
                level.
              </ArticleText>
            </ArticleParagraph> */}
            {/*  */}
            <WarningBlock>
              <WarningGrayIcon width={27} height={27} />
              <WarningBlockText>
                <BoldText style={{ color: C.sBlack }}>Note:</BoldText> When you
                look at a listing, we might indicate that it’s “Good Value”.
                This means that the price is a lower price compared to other
                homes for the dates you"ve chosen that are similar in location,
                ratings, and amenities. Keep in mind that many places to stay
                are unique, and different attributes may be important to
                different guests.
              </WarningBlockText>
            </WarningBlock>

            {/* Feedback form */}
            <DidYouGetTheHelp />

            {/* Related articles */}
            {relatedArticles?.length > 0 && (
              <PopularArticleBlock>
                <Title20
                  style={{
                    marginBottom: 14,
                  }}
                >
                  Related articles
                </Title20>

                {relatedArticles.length > 0 &&
                  relatedArticles.map((article, id) => {
                    if (id < 3) {
                      return (
                        <AccountLink
                          key={id}
                          onPress={() => {
                            setArticleTab({
                              isOpen: true,
                              articleTitle: article,
                            })
                          }}
                        >
                          <AccountLinkText>
                            {article.articleTitle}
                          </AccountLinkText>
                          <AccountLinkIcon>
                            <GoBackIcon width={9} height={16} />
                          </AccountLinkIcon>
                        </AccountLink>
                      )
                    } else {
                      return
                    }
                  })}
              </PopularArticleBlock>
            )}
          </ArticleContainer>
          {/* Contact us button */}
          <ContactUsButton setOpenContactUs={setOpenContactUs} />
        </FilterContainer>
      </Animated.View>
    )
  },
)

export default ArticleTab
