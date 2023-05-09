import React from "react"
import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Animated, BackHandler } from "react-native"
// Components
import AccountsTabHeader from "../AccountsTabHeader"
import FaqSearchInput from "./FaqSearchInput"
import ContactUsButton from "./ContactUsButton"
import AllTopicsTab from "./AllTopicsTab"
import ContactUsTab from "../../LeaveFeedbackScreen/ContactUsTab"
import ArticleTab from "./ArticleTab"
// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateOfferPreview } from "./useAnimateOfferPreview"
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
import { backHandler } from "../backHandler"
// Images
import IMAGES from "@/res/images"
const {
  GoBackIcon,
  SearchBlackIcon,
  ReservationIcon,
  PaymentIcon,
  ProfileTapbarIcon,
  ShieldIcon,
} = IMAGES
// Styles
import { style } from "./style"
const {
  // Search input
  FilterContainer,
  AdsListContainer,
  SwitchBlock,
  SwitchBlockBtn,
  SwitchBlockBtnText,
  FaqSubTitle,
  PopularArticleBlock,
  AccountLink,
  AccountLinkText,
  AccountLinkTopicsIcon,
  AccountLinkIcon,
} = style

// Store
import { observer } from "mobx-react-lite"
import { runInAction, set, toJS } from "mobx"

import { useAccountApiStore } from "@/stores/AccountApi"

const FaqTab = observer(({ isOpenTab }) => {
  const navigation = useNavigation()

  const { windowHeight, windowWidth } = getWindowDimension()

  // Store
  const {
    setOpenTabs,
    setFaqArticles,
    popularFaqVendorArticle,
    faqVendorArticle,
    faqMusicianArticle,
    popularFaqMusicianArticle,
    faqVendorAllArticles,
    faqMusicianAllArticles,
  } = useAccountApiStore()

  useEffect(() => {
    if (
      isOpenTab === true &&
      (popularFaqVendorArticle?.length === 0 || faqVendorArticle?.length === 0)
    ) {
      setFaqArticles()
    }
  }, [isOpenTab])

  // Animation
  const { onPress, width } = useAnimateOfferPreview()
  useEffect(() => {
    if (isOpenTab === true) {
      onPress(true)
    }
  }, [isOpenTab])

  const [isHideAnimationTab, setHideAnimationTab] = useState(false)
  useEffect(() => {
    if (isHideAnimationTab === true) {
      onPress(false)
    }
  }, [isHideAnimationTab])

  // Tab state
  const [isVendorFaq, setVendorFaq] = useState(true)

  // Serch input state
  const [searchText, onChangeSearchText] = useState("")
  const isSearch = searchText?.length > 0
  const [searchArticles, setSearchArticles] = useState([])

  useEffect(() => {
    if (searchText?.length > 0) {
      const compareLetterNumber = searchText?.length
      const isContractorAllArticles = isVendorFaq
        ? faqVendorAllArticles
        : faqMusicianAllArticles
      const newLocalData = isContractorAllArticles.filter((item, id) => {
        const slicedItem = item.articleTitle
          .slice(0, compareLetterNumber)
          .toLowerCase()

        if (slicedItem.includes(searchText.toLowerCase())) {
          return item
        } else {
          return
        }
      })

      const removeAllUndefined = newLocalData.filter((el) => el !== undefined)
      const isEmpty = removeAllUndefined.length !== 0 ? removeAllUndefined : []
      setSearchArticles(isEmpty)
    }
  }, [searchText])

  // All topics list state
  const [isAllTopicsTab, setAllTopicsTab] = useState({
    isOpen: false,
    allTopicsList: [],
    allTopicsTitle: "",
  })
  const [isCloseAllTopicsTab, setCloseAllTopicsTab] = useState(false)

  // Atricle state
  const [isArticleTab, setArticleTab] = useState({
    isOpen: false,
    articleTitle: "",
  })
  const [isCloseArticleTab, setCloseArticleTab] = useState(false)

  // Contact us tab state
  const [isOpenContactUs, setOpenContactUs] = useState(false)
  const [isCloseContactUs, setCloseContactUs] = useState(false)

  // Native back button handler
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Close current tab
        if (
          !isAllTopicsTab.isOpen &&
          !isArticleTab.isOpen &&
          !isOpenContactUs
        ) {
          setHideAnimationTab(true)
          setTimeout(() => {
            setOpenTabs({
              tabName: "FAQ",
              isOpen: false,
            })
          }, 600)
        }
        if (isAllTopicsTab.isOpen && !isArticleTab.isOpen && !isOpenContactUs) {
          setCloseAllTopicsTab(true)
          setTimeout(() => {
            setCloseAllTopicsTab(false)
          }, 600)
        }
        if (isArticleTab.isOpen && !isAllTopicsTab.isOpen && !isOpenContactUs) {
          setCloseArticleTab(true)
          setTimeout(() => {
            setCloseArticleTab(false)
          }, 600)
        }
        if (isArticleTab.isOpen && isAllTopicsTab.isOpen && !isOpenContactUs) {
          setCloseArticleTab(true)
          setTimeout(() => {
            setCloseArticleTab(false)
          }, 600)
        }
        const isMainOpenContact =
          !isAllTopicsTab.isOpen && !isArticleTab.isOpen && isOpenContactUs
        const isArticleOpenContact =
          !isAllTopicsTab.isOpen && isArticleTab.isOpen && isOpenContactUs
        const isTopicsOpenContact =
          isAllTopicsTab.isOpen && !isArticleTab.isOpen && isOpenContactUs
        const isTopicsAndArticleOpenContact =
          isAllTopicsTab.isOpen && isArticleTab.isOpen && isOpenContactUs

        if (
          isMainOpenContact ||
          isArticleOpenContact ||
          isTopicsOpenContact ||
          isTopicsAndArticleOpenContact
        ) {
          setCloseContactUs(true)
          setTimeout(() => {
            setOpenContactUs(false)
            setCloseContactUs(false)
          }, 600)
        }
        return true
      },
    )
    return () => {
      backHandler.remove()
    }
  }, [isAllTopicsTab.isOpen, isArticleTab.isOpen, isOpenContactUs])

  const AllTopicsIcon = ({ themeName }) => {
    switch (themeName) {
      case "Searching and booking":
        return <SearchBlackIcon width={18} height={18} />
      case "Your reservation":
        return <ReservationIcon width={18} height={18} />
      case "Payments, pricing and refunds":
        return <PaymentIcon width={18} height={18} />
      case "Your account":
        return <ProfileTapbarIcon width={18} height={18} />
      case "Safety and accessibility":
        return <ShieldIcon width={18} height={18} />
      default:
        return null
    }
  }

  const faqPopularArticle = isVendorFaq
    ? popularFaqVendorArticle
    : popularFaqMusicianArticle
  let faqArticleTopics = isVendorFaq ? faqVendorArticle : faqMusicianArticle

  faqArticleTopics = faqArticleTopics || []

  return (
    <Animated.View
      style={{
        zIndex: 1000,
        height: windowHeight,
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
      >
        {/* Form */}
        <AdsListContainer>
          {/* Header */}
          <AccountsTabHeader
            tabName={"FAQ"}
            setOpenTabs={setOpenTabs}
            onPress={onPress}
          />

          {/* Search input */}
          <FaqSearchInput
            searchText={searchText}
            onChangeSearchText={onChangeSearchText}
          />

          {/* Switch buttons */}
          <SwitchBlock>
            <SwitchBlockBtn
              onPress={() => {
                setVendorFaq(true)
              }}
              isActive={isVendorFaq}
            >
              <SwitchBlockBtnText isActive={isVendorFaq}>
                Vendor
              </SwitchBlockBtnText>
            </SwitchBlockBtn>
            <SwitchBlockBtn
              onPress={() => {
                setVendorFaq(false)
              }}
              isActive={!isVendorFaq}
            >
              <SwitchBlockBtnText isActive={!isVendorFaq}>
                Performer
              </SwitchBlockBtnText>
            </SwitchBlockBtn>
          </SwitchBlock>

          {!isSearch && (
            <PopularArticleBlock>
              {/* Popular article */}
              <FaqSubTitle>Popular articles</FaqSubTitle>
              {faqPopularArticle.map((article, id) => {
                return (
                  <AccountLink
                    onPress={() => {
                      setArticleTab({
                        isOpen: true,
                        articleTitle: article,
                      })
                    }}
                    key={id}
                  >
                    <AccountLinkText>{article.articleTitle}</AccountLinkText>
                    <AccountLinkIcon>
                      <GoBackIcon width={9} height={16} />
                    </AccountLinkIcon>
                  </AccountLink>
                )
              })}

              {/* Browse all topic */}
              <FaqSubTitle style={{ marginTop: 34 }}>
                Browse all topics
              </FaqSubTitle>

              {faqArticleTopics.map((topics, id) => {
                return (
                  <AccountLink
                    onPress={() => {
                      setAllTopicsTab({
                        isOpen: true,
                        allTopicsList: topics.topicsArticles,
                        isClose: false,
                        allTopicsTitle: topics.topicsName,
                      })
                    }}
                    key={id}
                  >
                    <AccountLinkTopicsIcon>
                      <AllTopicsIcon themeName={topics.topicsName} />

                      <AccountLinkText style={{ paddingLeft: 11 }}>
                        {topics.topicsName}
                      </AccountLinkText>
                    </AccountLinkTopicsIcon>

                    <AccountLinkIcon>
                      <GoBackIcon width={9} height={16} />
                    </AccountLinkIcon>
                  </AccountLink>
                )
              })}
            </PopularArticleBlock>
          )}

          {isSearch && (
            <PopularArticleBlock>
              <FaqSubTitle>
                {searchArticles?.length === 0
                  ? "Nothing found"
                  : "Search results"}
              </FaqSubTitle>

              {searchArticles?.length > 0 &&
                searchArticles.map((article, id) => {
                  return (
                    <AccountLink
                      onPress={() => {
                        setArticleTab({
                          isOpen: true,
                          articleTitle: article,
                        })
                      }}
                      key={id}
                    >
                      <AccountLinkText>{article.articleTitle}</AccountLinkText>
                      <AccountLinkIcon>
                        <GoBackIcon width={9} height={16} />
                      </AccountLinkIcon>
                    </AccountLink>
                  )
                })}
            </PopularArticleBlock>
          )}
          {/* Contact us button */}
          <ContactUsButton setOpenContactUs={setOpenContactUs} />
        </AdsListContainer>
      </FilterContainer>

      {/* All topics list */}
      {isAllTopicsTab.isOpen === true && (
        <AllTopicsTab
          isOpenTab={isAllTopicsTab.isOpen}
          isClose={isCloseAllTopicsTab}
          articlesData={isAllTopicsTab.allTopicsList}
          setOpen={setAllTopicsTab}
          titleName={isAllTopicsTab.allTopicsTitle}
          setArticleTab={setArticleTab}
          setOpenContactUs={setOpenContactUs}
        />
      )}

      {/* Article */}
      {isArticleTab.isOpen === true && (
        <ArticleTab
          isOpenTab={isArticleTab.isOpen}
          isClose={isCloseArticleTab}
          setOpen={setArticleTab}
          titleName={isArticleTab.articleTitle}
          setOpenContactUs={setOpenContactUs}
          setArticleTab={setArticleTab}
        />
      )}

      {/* Contact us link */}
      {isOpenContactUs && (
        <ContactUsTab
          isOpen={isOpenContactUs}
          isClose={isCloseContactUs}
          setOpen={setOpenContactUs}
        />
      )}
    </Animated.View>
  )
})

export default FaqTab
