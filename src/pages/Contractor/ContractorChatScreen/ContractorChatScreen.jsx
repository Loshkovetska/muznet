import React from "react";
import { useState, useEffect } from "react";

import { StatusBar, Image } from "react-native";

// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
// Components
import ModalWindow from "@/components/ModalWindow"
import ChatScreen from "@/components/ChatScreen"
import CreateOffer from "@/components/ChatScreen/ChatMessagesContractor/CreateOffer"
import OfferPreview from "@/components/ChatScreen/ChatMessagesContractor/OfferPreview"
// Images
import IMAGES from "@/res/images"
const {
    ModalWrongIcon
} = IMAGES;
// Styles
import styled from "styled-components/native";
import C from "@/res/colors"
const Block = styled.View`
width: 100%;
`
const Container = styled.View`
height: 100%;
width: 100%;
background-color: ${C.white};
`;

// Store
import { observer } from "mobx-react-lite";
import { useOfferToMusicianApiStore } from "@/stores/OfferToMusicianApi";

const ContractorChatScreen = observer(() => {
    const { windowHeight, windowWidth } = getWindowDimension()

    const { isPaySuccesful, isOpenOfferPreview, isOpenCreateOffer, setOpenPaySuccesfulModal, isOpenPaySuccesfulModal } = useOfferToMusicianApiStore();

    const [isWrongModalOpen, setWrongModalOpen] = useState(false);
    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                hidden={false}
                backgroundColor="transparent"
                translucent={true}
            />

            <Container
                style={{
                    width: windowWidth,
                    height: windowHeight,
                }}  >
                <ChatScreen isContractor={true} />

                {isOpenCreateOffer === true && <CreateOffer isOpenCreateOffer={isOpenCreateOffer} />}

                {/* Offer preview */}
                {isOpenOfferPreview === true && <OfferPreview isOpen={isOpenOfferPreview} />}

                {isOpenPaySuccesfulModal === true && <ModalWindow
                    modalPic={<Image source={IMAGES.GifSuccessCheck}
                        style={{
                            width: "120%",
                            height: "120%",
                        }}
                        resizeMode={"cover"} width={"100%"} height={"100%"} />
                    }
                    title={"Your payment was successful"}
                    advice={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                    setOpen={setOpenPaySuccesfulModal}
                    btnText={"Great!"}
                />}

                {isWrongModalOpen === true && <ModalWindow
                    modalPic={<ModalWrongIcon width={80} height={80} />}
                    title={"Something went wrong"}
                    advice={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                    setOpen={setWrongModalOpen}
                    btnText={"Try Again!"}
                />}
            </Container>

        </>

    )
})

export default ContractorChatScreen;