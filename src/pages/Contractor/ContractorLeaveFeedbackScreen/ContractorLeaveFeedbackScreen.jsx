import React from "react";
import { StatusBar, SafeAreaView } from "react-native";

// Components
import LeaveFeedbackScreen from "@/components/LeaveFeedbackScreen"

const ContractorLeaveFeedbackScreen = () => {

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <StatusBar
                barStyle={"light-content"}
                hidden={false}
                backgroundColor="transparent"
                translucent={true}
            />
            <LeaveFeedbackScreen />
        </SafeAreaView>
    )
}

export default ContractorLeaveFeedbackScreen;