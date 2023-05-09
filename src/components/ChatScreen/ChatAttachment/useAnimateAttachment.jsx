import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";

// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"

export const useAnimateAttachment = () => {
    const [isOpen, setIsOpen] = useState(false)

    const animate_state = {
        start: 0,
        end: 100
    }
    const value = useRef(new Animated.Value(animate_state.start)).current

    const onPress = (boolean) => {
        Animated.timing(value, {
            toValue: isOpen ? animate_state.start : animate_state.end,
            useNativeDriver: false,
            duration: 400,
            easing: Easing.exp
        }).start()
        setIsOpen(boolean)
    }

    const inputRange = Object.values(animate_state)
    const height = value.interpolate({ inputRange, outputRange: ["0%", "100%"] })

    return { height, onPress }
}
