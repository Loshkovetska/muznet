import React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, KeyboardAvoidingView, BackHandler } from "react-native";
import { useForm, Controller } from "react-hook-form";
// Components
// import AccountsTabHeader from "../AccountsTabHeader"
import YesReviewTab from "./YesReviewTab"
import ContactUsTab from "./ContactUsTab"


// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
// Images
import IMAGES from "@/res/images"
const {
    MapPointIcon,
    EditBlackIcon
} = IMAGES;
// Variables
import { S } from "@/res/strings"
// Styles
import { style } from "./style"
const {
    FilterContainer,
    FeedbackTitle,
    FeedbackSubTitle,
    ButtonsRow,
    AddPayment,
    AddPaymentRowText,
    SecurePaymentMessage,
    SecurePaymentMessageText,
    SecurePaymentMessageReadMoreText,
} = style;
// Mixins
import { M } from "@/res/mixin"
const {
    BlackBtn,
    BlackBtnText,
} = M;

const LeaveFeedbackScreen = () => {
    const navigation = useNavigation();
    const { windowHeight, windowWidth } = getWindowDimension()

    // Yes tab state
    const [isOpenYesReview, setOpenYes] = useState(false);
    const [isCloseYesReview, setCloseYes] = useState(false);

    // Contact us tab state
    const [isOpenContactUs, setOpenContactUs] = useState(false);
    const [isCloseContactUs, setCloseContactUs] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (!isOpenYesReview && !isOpenContactUs) {
                return true
            }
            // If back on payment tab
            if (isOpenYesReview && !isOpenContactUs) {
                setCloseYes(true)
                setTimeout(() => {
                    setOpenYes(false)
                    setCloseYes(false)
                }, 400);
            }
            if (!isOpenYesReview && isOpenContactUs) {
                setCloseContactUs(true)
                setTimeout(() => {
                    setOpenContactUs(false)
                    setCloseContactUs(false)
                }, 400);
            }

            return true
        })
        return () => {
            backHandler.remove()
        }
    }, [isOpenYesReview, isOpenContactUs])


    return (
        <View
            style={{
                height: windowHeight,
                width: windowWidth,
            }}
        >
            <FilterContainer
                style={{
                    height: windowHeight,
                    width: windowWidth,
                }}
            >
                {/* Header */}
                <FeedbackTitle>
                    Leave feedback
                </FeedbackTitle>
                <FeedbackSubTitle>
                    Did your performance take place?
                </FeedbackSubTitle>
                {/* Yes or no */}
                <ButtonsRow>
                    <BlackBtn
                        style={{ height: 56, width: "48.5%", }}
                        onPress={() => { setOpenYes(true) }}
                    >
                        <BlackBtnText>Yes</BlackBtnText>
                    </BlackBtn>

                    <AddPayment onPress={() => { navigation.navigate("ContractorStack", { screen: "ContractorWelcomeScreen" }) }}    >
                        <AddPaymentRowText>No</AddPaymentRowText>
                    </AddPayment>
                </ButtonsRow>

                <SecurePaymentMessage
                    onPress={() => { setOpenContactUs(true) }}
                >
                    <SecurePaymentMessageText>
                        Have a problem with perfomance? <SecurePaymentMessageReadMoreText>Contact us</SecurePaymentMessageReadMoreText>
                    </SecurePaymentMessageText>
                </SecurePaymentMessage>

            </FilterContainer >

            {/* If press yes */}
            {isOpenYesReview && <YesReviewTab
                isOpen={isOpenYesReview}
                isClose={isCloseYesReview}
                setOpen={setOpenYes}
            />}

            {/* Contact us link */}
            {isOpenContactUs && <ContactUsTab
                isOpen={isOpenContactUs}
                isClose={isCloseContactUs}
                setOpen={setOpenContactUs}
            />}
        </View>

    )
}

export default LeaveFeedbackScreen;

