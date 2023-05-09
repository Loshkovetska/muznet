import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
// Images
import IMAGES from "@/res/images"
const {
    MapPointIcon,
    EditBlackIcon
} = IMAGES;
// Styles
import { style } from "./style"
import RateBlock from "@/components/RateBlock";

const {
    ContentBlock,
    ContentBlockRow,
    ContainerLink,
    ContainerPrice,
    ContainerHour,
    ButtonSubmit,
    ButtonSubmitText,
} = style;
// Mixins
import { M } from "@/res/mixin"
const {
    BlackBtn,
    BlackBtnText,
} = M;

import { observer } from "mobx-react-lite";
import { runInAction, set } from "mobx";
import { useAccountApiStore } from "@/stores/AccountApi";

const ContactUsButton = observer(({ setOpenContactUs }) => {
    const { windowHeight, windowWidth } = getWindowDimension()
    const isKeyboardOpen = isKeyboardShown()

    return (
        <ContentBlock
            style={{
                width: windowWidth,
            }}
            isKeyboardOpen={isKeyboardOpen}>
            <ContentBlockRow>

                <ContainerLink>
                    <ContainerPrice>Still need help?</ContainerPrice>
                </ContainerLink>

                <ButtonSubmit
                    onPress={() => {
                        setOpenContactUs(true)
                    }}
                >
                    <ButtonSubmitText>
                        Contact us
                    </ButtonSubmitText>
                </ButtonSubmit>
            </ContentBlockRow>
        </ContentBlock>

    );
})

export default ContactUsButton;