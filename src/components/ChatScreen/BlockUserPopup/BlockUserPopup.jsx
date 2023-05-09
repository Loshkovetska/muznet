import React from "react";
import { useState, useEffect } from "react";
import { Animated, BackHandler, Keyboard } from "react-native";
// Components
import CameraCustom from "@/components/CameraCustom"
// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateAttachment } from "./useAnimateAttachment";
// Images
import IMAGES from "@/res/images"
const {
    CrossBlackIcon,
} = IMAGES;
// Variables
import C from "@/res/colors"
// Styles
import { style } from "./style"
const {
    AttachContainer,
    CloseButton,
    OpacityBg,
    ButtonsBlock,
    Button,
    ButtonText,
    ButtonCancelText,
    AttachContainerText,
} = style;

const BlockUserPopup = ({ isOpenBottomPopup, setOpenBottomPopup, setConfirm, isUserBlocked }) => {
    const { windowHeight, windowWidth } = getWindowDimension()

    // Animate attachment
    const { onPress, height } = useAnimateAttachment()
    const [isShowOpacityBgMargin, setShowOpacityBgMargin] = useState(false);

    useEffect(() => {
        if (isOpenBottomPopup === true) {
            Keyboard.dismiss()
            onPress(true)
            setShowOpacityBgMargin(true)
        }

    }, [isOpenBottomPopup]);

    return (
        <>
            {isOpenBottomPopup && <OpacityBg
                style={{
                    height: windowHeight,
                    width: windowWidth,
                    zIndex: 2900,
                }}
                onPress={() => {
                    onPress(false)
                    setOpenBottomPopup(false)
                    setConfirm(false)
                    setShowOpacityBgMargin(false)
                }}
            >
            </OpacityBg>}

            <Animated.View style={{
                width: windowWidth,
                // height: windowHeight,
                height,
                zIndex: 3000,
                justifyContent: "center",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                position: "absolute",
                flex: 1,
                flexDirection: "column",
                backgroundColor: C.white,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                paddingHorizontal: 16,
                overflow: "hidden",
                left: 0,
                bottom: 0,
                right: 0,
            }} >


                {/* Attach container */}

                {/* Buttons */}
                <ButtonsBlock>

                    <Button
                        onPress={() => {
                            setConfirm(true)
                            onPress(false)
                            setOpenBottomPopup(false)
                            setShowOpacityBgMargin(false)
                        }}
                    >
                        <ButtonText>{!isUserBlocked?'Block':'Unblock'} User</ButtonText>
                    </Button>

                    <Button
                        onPress={() => {
                            onPress(false)
                            setOpenBottomPopup(false)
                            setConfirm(false)
                            setShowOpacityBgMargin(false)
                        }}
                    >
                        <ButtonCancelText>Cancel</ButtonCancelText>
                    </Button>
                </ButtonsBlock>



            </Animated.View >
        </>
    )
}

export default BlockUserPopup;
