import React from "react";
import { useEffect } from "react";

import { Animated } from "react-native";

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
    SavedPaymentText,
    AccountLinkList,
    AccountLink,
    AccountLinkText,
    AccountLinkSubText,
    AccountLinkIcon,
} = style;

const PayoutMethods = [
    {
        payoutTitle: "Back Transfer in USD",
        payoutPaidDuration: "Get paid in 5-7 business days",
        payoutFee: "No fees",
    },
    {
        payoutTitle: "PayPal in USD",
        payoutPaidDuration: "Get paid in 3-4 hours",
        payoutFee: "May include fees",
    },
    {
        payoutTitle: "Payoneer Prepaid Debit MasterCard in USD",
        payoutPaidDuration: "Get paid in 3-4 hours",
        payoutFee: "May include fees",
    },
]

const ChooseHowToGetPaid = ({ setSelectedOption, isOpenTab, setOpenTab, setOpenNextTab, isCloseTab, selectedCountry }) => {

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
                        Choose How to Get Paid
                    </HeaderTitle>
                </Header>

                {/* Link list */}
                <AccountLinkList>
                    <SavedPaymentText>
                        Payout Methods in {selectedCountry}
                    </SavedPaymentText>
                    {/* Payment Methods */}

                    {PayoutMethods.map((payout, id) => {
                        return (
                            <AccountLink
                                key={id}
                                onPress={() => {
                                    setSelectedOption(payout.payoutTitle)
                                    setOpenNextTab(true)
                                }}>
                                <AccountLinkText>{payout.payoutTitle}</AccountLinkText>
                                <AccountLinkSubText>{payout.payoutPaidDuration}</AccountLinkSubText>
                                <AccountLinkSubText>{payout.payoutFee}</AccountLinkSubText>

                                <AccountLinkIcon>
                                    <GoBackIcon width={9} height={16} />
                                </AccountLinkIcon>
                            </AccountLink>
                        )
                    })}

                </AccountLinkList>


            </FilterContainer>
        </Animated.View >
    )
}

export default ChooseHowToGetPaid;

