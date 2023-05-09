import React from "react";
import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";
// Camera
import { Camera } from "expo-camera";
// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
// Images
import IMAGES from "@/res/images"
const {
    CrossWhiteIcon,
    ChangeCameraTypeIcon,
    GaleryWhiteIcon,
} = IMAGES;
// Styles
import { style } from "./style"
const {
    CameraContainer,
    CameraButtons,
    CloseButton,
    SecondaryButton,
    TakePictureButton,
    TakePictureButtonRound,
    SendPhoto,
    SendPhotoText,
} = style;

// Store
import { observer } from "mobx-react-lite";
import { useChatAttachmentStore } from "@/stores/ChatAttachmentStore";
import { useCameraStore } from "@/stores/CameraStore";
const CameraCustom = observer(({ isOpenCamera, setOpenCamera, setShowOpacityBgMargin }) => {
    const { windowHeight, windowWidth } = getWindowDimension()

    const cameraRef = useRef();
    // Store
    const { setCameraImage, pickImageFromGalery, setSendAttached, isSendAttached, setOpenChatAttachment } = useChatAttachmentStore()
    // Camera store
    const {
        cameraImage,
        cameraType,
        isPreview,
        cancelPreview,
        handleCameraType,
        takePicture,
    } = useCameraStore();

    useEffect(() => {
        if (isSendAttached === true) {
            setOpenCamera(false)
        }
    }, [isSendAttached]);

    return (
        <CameraContainer
            style={{
                height: windowHeight + 50,
                width: windowWidth
            }}
        >
            <CameraButtons>
                {/* Gallery button */}
                <CloseButton
                    onPress={() => {
                        if (!isPreview) {
                            setShowOpacityBgMargin(false)
                            setOpenCamera(false)
                        } else {
                            cancelPreview(cameraRef)
                        }
                    }
                    }>
                    <CrossWhiteIcon width={14} height={14} />
                </CloseButton>
            </CameraButtons>
            <Camera
                ref={cameraRef}
                type={cameraType}
                style={{
                    width: windowWidth,
                    height: windowWidth + windowWidth / 3
                }}
            >
            </Camera>

            {/* Camera control */}
            {!isPreview && <CameraButtons>
                {/* Gallery button */}
                <SecondaryButton onPress={() => pickImageFromGalery()}>
                    <GaleryWhiteIcon width={18} height={18} />
                </SecondaryButton>

                {/* Take picture */}
                <TakePictureButton onPress={() => takePicture(cameraRef)}>
                    <TakePictureButtonRound></TakePictureButtonRound>
                </TakePictureButton>

                {/* Change camera type */}
                <SecondaryButton onPress={() => handleCameraType()}>
                    <ChangeCameraTypeIcon width={20} height={20} />
                </SecondaryButton>
            </CameraButtons>}

            {/* Preview control */}
            {isPreview && <CameraButtons>

                <SendPhoto
                    onPress={() => {
                        setCameraImage(cameraImage)
                        cancelPreview(cameraRef)
                        setOpenCamera(false)
                        setSendAttached(true)
                        setOpenChatAttachment(false)
                        setShowOpacityBgMargin(false)
                    }}
                >
                    <SendPhotoText>
                        Send photo
                    </SendPhotoText>
                </SendPhoto>

            </CameraButtons>
            }
        </CameraContainer>
    )
})

export default CameraCustom;
