import React from "react";
import { useEffect } from "react";
import { Image, BackHandler } from "react-native";

import { getWindowDimension } from "@/components/helpers/getWindowDimension"

// Images
import IMAGES from "@/res/images"
const {
    CrossBlackIcon,
} = IMAGES;
// Styles
import { style } from "./style"

const {
    ModalWindowContainer,
    ModalWindowBlock,
    CloseButton,
    ModalIcon,
    ModalTitle,
    ModalAdvice,
} = style;
import { M } from "@/res/mixin"
const {
    BlackBtn,
    BlackBtnText
} = M;
const ModalWindow = ({ isOpen, setOpen, modalPic, title, advice, btnText }) => {
    const { windowHeight, windowWidth } = getWindowDimension()

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (isOpen === true) {
                console.log("ну шо привет");
                // closePopup()
            }
            return true
        })
        return () => {
            backHandler.remove()
        }
    }, [isOpen])

    return (
        <ModalWindowContainer
            style={{
                width: windowWidth,
                height: windowHeight,
            }}
        >
            <ModalWindowBlock>
                <CloseButton
                    onPress={() => { setOpen(false) }}  >
                    <CrossBlackIcon width={14} height={14} />
                </CloseButton>

                {modalPic !== undefined && <ModalIcon>
                    {modalPic}
                </ModalIcon>}

                <ModalTitle
                    style={{
                        marginTop: modalPic === undefined ? 20 : 0,
                    }}
                >
                    {title}
                </ModalTitle>
                <ModalAdvice>
                    {advice}
                </ModalAdvice>

                <BlackBtn
                    style={{
                        width: "90%",
                        marginTop: modalPic === undefined ? 33 : 20,
                    }}
                    onPress={() => setOpen(false)}
                >
                    <BlackBtnText>
                        {btnText}
                    </BlackBtnText>
                </BlackBtn>
            </ModalWindowBlock>

        </ModalWindowContainer>

    );
}

export default ModalWindow;