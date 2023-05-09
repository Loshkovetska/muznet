import React from "react";
import { StatusBar } from "react-native";
// Helpers
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
// Components
import MyDealsScreen from "@/components/MyDealsScreen"
// Styles
import styled from "styled-components/native";
import C from "@/res/colors"

const Container = styled.View`
height: 100%;
background-color: ${C.white};
`;

const MusicianMyDealsScreen = () => {
    const isKeyboardOpen = isKeyboardShown()
    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                hidden={false}
                backgroundColor="transparent"
                translucent={true}
            />

            <Container isKeyboardOpen={isKeyboardOpen} >

                <MyDealsScreen
                    isContractor={false}
                />

            </Container>

        </>

    )
}

export default MusicianMyDealsScreen;