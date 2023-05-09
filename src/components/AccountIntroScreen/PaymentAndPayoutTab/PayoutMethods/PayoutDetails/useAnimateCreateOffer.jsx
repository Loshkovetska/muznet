import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";

// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"

export const useAnimateCreateOffer = () => {
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
            duration: 700,
            easing: Easing.exp
        }).start()
        setIsOpen(boolean)
    }

    const inputRange = Object.values(animate_state)
    const width = value.interpolate({ inputRange, outputRange: ["0%", "100%"] })

    return { width, onPress }
}
