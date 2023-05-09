import React from "react";
import { useEffect } from "react";
import { Animated } from "react-native";
// Components
import ContactUsButton from "../ContactUsButton"
// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateOfferPreview } from "./useAnimateOfferPreview";

// Images
import IMAGES from "@/res/images"
const {
    GoBackIcon,
} = IMAGES;
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
    PopularArticleBlock,
    AccountLink,
    AccountLinkText,
    AccountLinkIcon,
} = style;

// Store
import { observer } from "mobx-react-lite";

const AllTopicsTab = observer(({ isOpenTab, setOpen, isClose, articlesData, titleName, setArticleTab, setOpenContactUs }) => {
    const { windowHeight, windowWidth } = getWindowDimension()

    const { onPress, width } = useAnimateOfferPreview()

    useEffect(() => {
        if (isOpenTab === true) {
            onPress(true)
        }
    }, [isOpenTab]);
    // Close tab
    const closeTab = () => {
        onPress(false)
        setTimeout(() => {
            setOpen({
                isOpen: false,
                allTopicsList: [],
                allTopicsTitle: "",
            })
        }, 600);
    }

    useEffect(() => {
        if (isClose === true) {
            closeTab()
        }
    }, [isClose]);

    return (
        <Animated.View style={{
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
            >
                <Header
                    style={{
                        // width: windowWidth,
                    }}
                >
                    <HeaderClose
                        onPress={() => {
                            closeTab()
                        }}
                    >
                        <GoBackIcon width={12} height={21} />
                    </HeaderClose>

                    <HeaderTitle>
                        {titleName}
                    </HeaderTitle>
                </Header>

                <PopularArticleBlock>

                    {articlesData?.length > 0 && articlesData.map((article, id) => {
                        return <AccountLink
                            onPress={() => {
                                setArticleTab({
                                    isOpen: true,
                                    articleTitle: article,
                                })
                            }}
                            key={id}
                        >
                            <AccountLinkText>
                                {article.articleTitle}
                            </AccountLinkText>
                            <AccountLinkIcon>
                                <GoBackIcon width={9} height={16} />
                            </AccountLinkIcon>
                        </AccountLink>
                    })}

                </PopularArticleBlock>
                {/* Contact us button */}
                <ContactUsButton setOpenContactUs={setOpenContactUs} />
            </FilterContainer>
        </Animated.View >
    )
})

export default AllTopicsTab;

