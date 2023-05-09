import React from "react";
import { useState, useEffect } from "react";

import { StatusBar, Image } from "react-native";

// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
// Components
import ChatScreen from "@/components/ChatScreen"

// Styles
import styled from "styled-components/native";
import C from "@/res/colors"
const Container = styled.View`
height: 100%;
width: 100%;
background-color: ${C.white};
`;

// Store
import { observer } from "mobx-react-lite";

const MusicianChatScreen = observer(() => {
    const { windowHeight, windowWidth } = getWindowDimension()

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
                <ChatScreen isContractor={false} />

            </Container>

        </>

    )
})

export default MusicianChatScreen;