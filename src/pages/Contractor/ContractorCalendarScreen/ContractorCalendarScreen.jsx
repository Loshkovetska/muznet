import React from "react";
import { StatusBar } from "react-native";

// Components
import CalendarScreen from "@/components/CalendarScreen"
import TapbarMenu from "@/components/Buttons/TapbarMenu"

// Styles
import styled from "styled-components/native";
import C from "@/res/colors"

const Container = styled.View`
height: 100%;
width: 100%;
background-color: ${C.white};
/* padding-bottom: 82px; */
`;
const Content = styled.ScrollView`
width: 100%;
`;

const ContractorCalendarScreen = () => {

    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                hidden={false}
                backgroundColor="transparent"
                translucent={true}
            />

            <Container>
                <CalendarScreen
                    stackName={"ContractorStack"}
                    chatScreenName={"ContractorChatScreen"}
                    isContractor={true}
                />

                <TapbarMenu />
            </Container>
        </>

    )
}

export default ContractorCalendarScreen;