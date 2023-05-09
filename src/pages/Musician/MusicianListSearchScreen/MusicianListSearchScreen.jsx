import React from "react";
import { StatusBar } from "react-native";
import { useState, useEffect } from "react";

// import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// Helpers
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
// Components
import ListSearchScreen from "@/components/ListSearchScreen"
import TapbarMenu from "@/components/Buttons/TapbarMenu"
import SearchFilters from "@/components/SearchFilters";

import { Keyboard } from "react-native";

// Styles
import styled from "styled-components/native";
import C from "@/res/colors"
const Block = styled.View`
width: 100%;
`
const Container = styled.View`
height: 100%;
padding-bottom: ${props => props.isKeyboardOpen === true ? 60 + "px" : 82 + "px"};
width: 100%;
background-color: ${C.white};
`;
const Content = styled.ScrollView`
width: 100%;
`;

const MusicianListSearchScreen = () => {
    const navigation = useNavigation();

    const isKeyboardOpen = isKeyboardShown()
    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                hidden={false}
                backgroundColor="transparent"
                translucent={true}
            />

            {/* Image */}
            <Block>
                <Container
                    isKeyboardOpen={isKeyboardOpen}
                >
                    <Content>
                        <ListSearchScreen
                            stackName={"MusicianStack"}
                            screenName={"VendorCardScreen"}
                        />
                    </Content>

                    <TapbarMenu />
                </Container>
                <SearchFilters />
            </Block>
        </>
    )
}

export default MusicianListSearchScreen;
