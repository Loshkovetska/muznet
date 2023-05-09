import React from "react";
import { useState, useEffect } from "react";
import { Animated } from "react-native";
// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateCreateOffer } from "./useAnimateCreateOffer";
// Images
import IMAGES from "@/res/images"
const {
    RoundBlackCheckIcon,
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
    CountriesList,
    SelectItem,
    SelectText,
    CheckBox,
    ContentBlock,
} = style;
// Mixins
import { M } from "@/res/mixin"
const {
    BlackBtn,
    BlackBtnText,
} = M;

const ChooseYourAccountType = ({ setSelectedOption, isOpenTab, setOpenTab, setOpenNextTab, isCloseTab }) => {

    const { windowHeight, windowWidth } = getWindowDimension()

    const [localPaymentMethodActiveId, setLocalPaymentMethodActiveId] = useState();

    const [isShowSubmitButton, setShowSubmitButton] = useState(false);

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
    const isActiveChecking = localPaymentMethodActiveId === "Checking"
    const isActiveSaving = localPaymentMethodActiveId === "Saving"

    useEffect(() => {
        if (localPaymentMethodActiveId !== undefined) {
            setShowSubmitButton(true)
        }
    }, [localPaymentMethodActiveId]);

    return (
        <Animated.View style={{
            zIndex: 1015,
            height: windowHeight - 50,
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
                    height: "100%",
                    width: "100%",
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
                        Choose Your Account Type
                    </HeaderTitle>
                </Header>

                <CountriesList>

                    <SelectItem
                        onPress={() => {
                            setLocalPaymentMethodActiveId("Checking")
                            setSelectedOption("Checking")
                        }}
                    >
                        <SelectText>Checking</SelectText>

                        <CheckBox isActive={isActiveChecking}>
                            {(isActiveChecking) && <RoundBlackCheckIcon width={24} height={24} />}
                        </CheckBox>
                    </SelectItem>

                    <SelectItem
                        style={{
                            borderBottomWidth: 0,
                        }}
                        onPress={() => {
                            setLocalPaymentMethodActiveId("Saving")
                            setSelectedOption("Saving")
                        }}
                    >
                        <SelectText>Saving</SelectText>

                        <CheckBox isActive={isActiveSaving}>
                            {(isActiveSaving) && <RoundBlackCheckIcon width={24} height={24} />}
                        </CheckBox>
                    </SelectItem>

                </CountriesList>

                {/* Footer block */}
                <ContentBlock>

                    {isShowSubmitButton ? <BlackBtn
                        style={{
                            width: "100%",
                            backgroundColor: C.black,
                        }}
                        onPress={() => {
                            setOpenNextTab(true)
                        }}
                    >
                        <BlackBtnText style={{ color: C.white }}>
                            Next
                        </BlackBtnText>
                    </BlackBtn>
                        :
                        <BlackBtn
                            activeOpacity={0.2}
                            style={{
                                width: "100%",
                                backgroundColor: C.gray,
                            }}
                        >
                            <BlackBtnText
                                style={{
                                    color: C.sBlack,
                                }}
                            >
                                Next
                            </BlackBtnText>
                        </BlackBtn>
                    }

                </ContentBlock>

            </FilterContainer>
        </Animated.View>
    )
}

export default ChooseYourAccountType;

