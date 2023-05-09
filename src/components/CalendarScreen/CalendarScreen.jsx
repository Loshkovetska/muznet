import React from "react";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

// Components
import CalendarBlock from "./CalendarBlock";
import { getWindowDimension } from "@/components/helpers/getWindowDimension"

// Store
import { observer } from "mobx-react-lite";
import { useSearchApiStore } from "@/stores/SearchApi";
import C from "@/res/colors"

// Images
import IMAGES from "@/res/images"
const {
    MapShape
} = IMAGES;
// Styles
import { style } from "./style"
const {
    Content,
    HeaderTitle,
} = style;

const CalendarScreen = observer(({ isContractor }) => {

    return (
        <SafeAreaView style={{ flex: 1, height: "100%" }}>
            <HeaderTitle
                style={{
                    textShadowColor: C.gray,
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 1
                }}
            >
                Calendar
            </HeaderTitle>

            <CalendarBlock
                isContractor={isContractor}
            />
        </SafeAreaView>

    )
})

export default CalendarScreen;

// const styles = StyleSheet.create({
//     itemContainer: {
//         backgroundColor: "red",
//         margin: 5,
//         borderRadius: 15,
//         justifyContent: "center",
//         alignItems: "center",
//         flex: 1,
//     },
// });