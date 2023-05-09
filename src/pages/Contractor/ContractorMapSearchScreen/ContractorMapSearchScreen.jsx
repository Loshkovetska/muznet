import React from "react";
import { StatusBar, Image } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// Helpers
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
// Components
import MapSearchScreen from "@/components/MapSearchScreen"
import SearchFilters from "@/components/SearchFilters";
import ModalWindow from "@/components/ModalWindow"

// Images
import IMAGES from "@/res/images"
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

const ContractorMapSearchScreen = () => {
    const navigation = useNavigation();

    const { windowHeight, windowWidth } = getWindowDimension()

    const isKeyboardOpen = isKeyboardShown()

    const [isModalOpen, setModalOpen] = useState(true);
    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                hidden={false}
                backgroundColor="#f0f0f0ad"
                translucent={true}
            />
            {isModalOpen === true &&
                <ModalWindow
                    modalPic={
                        <Image source={IMAGES.GifMapSearch}
                            style={{
                                width: "120%",
                                height: "120%",
                            }}
                            resizeMode={"cover"} width={"100%"} height={"100%"}
                        />
                    }
                    title={"Perfomer finder"}
                    advice={"This is an approximate location of the performer. Contact directly to find out more"}
                    setOpen={setModalOpen}
                    btnText={"Accept"}
                />
            }

            <Block
                style={{
                    width: windowWidth,
                    height: windowHeight,
                }}
            >
                <Container
                    isKeyboardOpen={isKeyboardOpen}
                >
                    <MapSearchScreen
                        stackName={"ContractorStack"}
                        screenName={"MusicianCardScreen"}
                    />
                </Container>
                <SearchFilters
                    isContractor={true}
                    isForMap={true}
                />
            </Block>
        </>
    )
}

export default ContractorMapSearchScreen;
