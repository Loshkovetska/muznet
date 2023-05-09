import React from "react";
import { useEffect, useState } from "react";
import { Animated, BackHandler } from "react-native";
// Components
import PayoutList from "./PayoutList"
import PayoutDetails from "./PayoutDetails"
// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateOfferPreview } from "./useAnimateOfferPreview";
// Images
import IMAGES from "@/res/images"
const {
    GoBackIcon,
} = IMAGES;

// Styles
import { style } from "./style"
const {
    FilterContainer,
    Header,
    HeaderClose,
    HeaderTitle,
    FilterBlock,
    OfferPayment,
} = style;

import { observer } from "mobx-react-lite";
import { usePaymentAndPayoutApiStore } from "@/stores/PaymentAndPayoutApi";

const PayoutMethods = observer(({ isOpen, setOpen }) => {
    const { isOpenPayoutDetails } = usePaymentAndPayoutApiStore();

    const { windowHeight, windowWidth } = getWindowDimension()

    const { onPress, width } = useAnimateOfferPreview()

    useEffect(() => {
        if (isOpen === true) { onPress(true) }
    }, [isOpen]);
    // Close tab
    const closeTab = () => {
        onPress(false)
        setTimeout(() => {
            setOpen(false)
        }, 600);
        return
    }

    const [isHideAnimationTab, setHideAnimationTab] = useState(false);

    useEffect(() => {
        if (isHideAnimationTab === true) {
            onPress(false)
        }
    }, [isHideAnimationTab])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (isOpen === true && !isOpenPayoutDetails) {
                setHideAnimationTab(true)

                setTimeout(() => {
                    setOpen(false)
                }, 600);
            }
            if (isOpen === true && isOpenPayoutDetails === true) {
                return false
            }
            return true
        })
        return () => {
            backHandler.remove()
        }
    }, [isOpen, isOpenPayoutDetails])
    return (
        <Animated.View style={{
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
                        Add a Payout Method
                    </HeaderTitle>
                </Header>
                {/* Secure message */}
                <FilterBlock keyboardShouldPersistTaps={"handled"}>


                    {/* Сhoose payout method */}
                    <OfferPayment>
                        <PayoutList />
                    </OfferPayment>

                </FilterBlock>

            </FilterContainer>

            {/* Payout details */}
            <PayoutDetails />

        </Animated.View >
    )
})

export default PayoutMethods;

