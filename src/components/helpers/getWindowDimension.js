import React from "react";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";


export const getWindowDimension = () => {
    const screen = Dimensions.get("screen");
    const [dimensions, setDimensions] = useState({ screen });

    const windowHeight = Math.round(dimensions.screen.height)
    const windowWidth = Math.round(dimensions.screen.width)

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            "change",
            ({ screen }) => {
                setDimensions({ screen });
            }
        );
        return () => subscription?.remove();
    });

    return {
        windowHeight: windowHeight,
        windowWidth: windowWidth
    }
}