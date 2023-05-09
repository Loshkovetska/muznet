import React from "react";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useRoute } from "@react-navigation/native";

export const isKeyboardShown = () => {
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const route = useRoute();

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();

        };
    }, []);


    useEffect(() => {
        if (route !== undefined) {
            if (route.name === "MusicianListSearchScreen" || route.name === "ContractorListSearchScreen") {
                setKeyboardStatus(true);
            }
        }
    }, [Keyboard]);
    return keyboardStatus
}