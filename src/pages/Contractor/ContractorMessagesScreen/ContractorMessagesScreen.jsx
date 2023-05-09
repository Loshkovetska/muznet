import React from "react";
import { StatusBar } from "react-native";

// Components
import MessagesScreen from "@/components/MessagesScreen"
import TapbarMenu from "@/components/Buttons/TapbarMenu"

// Styles
import styled from "styled-components/native";
import C from "@/res/colors"

const Container = styled.View`
height: 100%;
width: 100%;
background-color: ${C.white};
padding-bottom: 82px;
`;
const Content = styled.ScrollView`
padding: 0px 16px;
width: 100%;
`;

const ContractorMessagesScreen = () => {

    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                hidden={false}
                backgroundColor="transparent"
                translucent={true}
            />

            <Container>
                <Content>
                    <MessagesScreen
                        stackName={"ContractorStack"}
                        chatScreenName={"ContractorChatScreen"}
                    />
                </Content>

                <TapbarMenu />
            </Container>
        </>

    )
}

export default ContractorMessagesScreen;