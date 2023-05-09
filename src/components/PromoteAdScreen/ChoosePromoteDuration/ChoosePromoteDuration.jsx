import React from "react";
import { useEffect, useState } from "react";

import { Animated } from "react-native";
import PriceSlider from "./PriceSlider";
// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateCreateOffer } from "./useAnimateCreateOffer";
// Images
import IMAGES from "@/res/images"
const {
    GoBackIcon,
} = IMAGES;
// Variables
import C from "@/res/colors"
// Styles
import { style } from "./style"
const {
    FilterContainer,
    Header,
    HeaderClose,
    HeaderTitle,
    AccountLinkList,
    PreviewBlock,
    PreviewBlockPrice,
    PreviewBlockViewPerDay,
    ContentBlock,
} = style;
// Mixins
import { M } from "@/res/mixin"
const {
    MediumText17,
    BlackBtn,
    BlackBtnText,
} = M;

const ChoosePromoteDuration = ({ selectedPromoteType, setSelectedOption, isOpenTab, setOpenTab, setOpenNextTab, isCloseTab }) => {

    const { windowHeight, windowWidth } = getWindowDimension()
    const { onPress, width } = useAnimateCreateOffer()

    useEffect(() => {
        if (isOpenTab === true) {
            onPress(true)
        }
    }, [isOpenTab]);

    // Close tab
    const closeTab = () => {
        onPress(false)
        setTimeout(() => {
            setOpenTab(false)
        }, 600);
    }
    useEffect(() => {
        if (isCloseTab === true) {
            closeTab()
        }
    }, [isCloseTab]);

    const promoteType = selectedPromoteType === "VipPromotion" ? 5 : 3
    const [daysDuration, getDuration] = useState(0);

    const promotePrice = daysDuration * promoteType

    return (
        <Animated.View style={{
            zIndex: 1010,
            height: windowHeight,
            // width: windowWidth,
            width,
            backgroundColor: C.white,
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
                {/* Header */}
                <Header >
                    <HeaderClose
                        onPress={() => {
                            closeTab()
                        }}
                    >
                        <GoBackIcon width={12} height={21} />
                    </HeaderClose>

                    <HeaderTitle>
                        Promote Your Ad
                    </HeaderTitle>
                </Header>

                <AccountLinkList>

                    <MediumText17 style={{ color: C.cyanGray, marginBottom: 16 }}>Please, choose the duration of the promotion:</MediumText17>

                    <PreviewBlock>

                        <PreviewBlockPrice>
                            ${promotePrice} per {daysDuration} days
                        </PreviewBlockPrice>

                        <PreviewBlockViewPerDay>
                            ≈ 20 displays per day
                        </PreviewBlockViewPerDay>

                    </PreviewBlock>

                    <PriceSlider getDuration={getDuration} />
                </AccountLinkList>

                {/* Footer block */}
                <ContentBlock>

                    <BlackBtn
                        style={{
                            width: "100%",
                            backgroundColor: C.black,
                        }}
                        onPress={() => {
                            setSelectedOption({
                                promotePrice: promotePrice,
                                promoteDuration: daysDuration,
                            })
                            setOpenNextTab(true)
                        }}
                    >
                        <BlackBtnText style={{ color: C.white }}>
                            Next
                        </BlackBtnText>
                    </BlackBtn>


                </ContentBlock>
            </FilterContainer>
        </Animated.View >
    )
}

export default ChoosePromoteDuration;

