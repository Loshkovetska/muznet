import React from "react";
import { StatusBar } from "react-native";
// Helpers
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
// Components
import PromoteAdScreen from "@/components/PromoteAdScreen"
// Styles
import styled from "styled-components/native";
import C from "@/res/colors"

const Container = styled.View`
height: 100%;
background-color: ${C.white};
`;

const MusicianPromoteAdScreen = () => {
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

                <PromoteAdScreen
                    stackName={"MusicianStack"}
                    welcomeScreenName={"MusicianWelcomeScreen"}
                />

            </Container>

        </>

    )
}

export default MusicianPromoteAdScreen;