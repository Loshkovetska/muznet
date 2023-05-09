import React from "react";
import { useState, useEffect } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getWindowDimension } from "@/components/helpers/getWindowDimension"

// Images
import IMAGES from "@/res/images"
import C from "@/res/colors"
const {
    CrossBlackIcon,
} = IMAGES;
// Styles
import { style } from "./style"

const {
    ModalWindowBlock,
    OfferDetails,
    OfferDetailsTitle,
    OfferDetailsBlock,
    MyDealLink,
    MyDealLinkText,
} = style;

const OfferLinkToMyDeals = () => {
    const { windowHeight, windowWidth } = getWindowDimension()
    const navigation = useNavigation();

    return (
        <ModalWindowBlock
            style={{
                width: windowWidth - 32,
            }}
        >
            {/* Offer details */}
            <OfferDetails>
                <OfferDetailsBlock
                    style={{
                        width: windowWidth - 32,
                    }}>
                    <OfferDetailsTitle>
                        To make it easier for you to track and manage your transactions, you can go to your profile and see all deals
                    </OfferDetailsTitle>

                    <MyDealLink
                        onPress={() => {
                            // TODO тут сделать напигации в аккаунт к моим сделкам
                            // navigation.navigate("ContractorStack", {
                            //     screen: "ContractorAccMyDealsScreen"
                            // });
                        }}
                    >
                        <MyDealLinkText>
                            My Deals
                        </MyDealLinkText>
                    </MyDealLink>

                </OfferDetailsBlock>

            </OfferDetails>


        </ModalWindowBlock>

    );
}

export default OfferLinkToMyDeals;