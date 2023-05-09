import React from "react";
import { StatusBar } from "react-native";
import { useState, useEffect } from "react";

// import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// Helpers
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
// Components
import MapSearchScreen from "@/components/MapSearchScreen"

import SearchFilters from "@/components/SearchFilters";

import { Keyboard } from "react-native";
import { getWindowDimension } from "@/components/helpers/getWindowDimension"

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


const MusicianMapSearchScreen = () => {
    const navigation = useNavigation();

    const { windowHeight, windowWidth } = getWindowDimension()

    const isKeyboardOpen = isKeyboardShown()
    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                hidden={false}
                backgroundColor="#f0f0f0ad"
                translucent={true}
            />

            <Block
                style={{
                    width: windowWidth,
                    height: windowHeight,
                }}>
                <Container
                    isKeyboardOpen={isKeyboardOpen}
                >
                    <MapSearchScreen
                        stackName={"MusicianStack"}
                        screenName={"VendorCardScreen"}
                    />
                </Container>
                <SearchFilters isForMap={true} />
            </Block>
        </>
    )
}

export default MusicianMapSearchScreen;
