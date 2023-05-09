import React from "react";
import { Dimensions, BackHandler } from "react-native";
import { useEffect, useState } from "react";


export const backHandler = (onPress, setOpenTabs, tabNameToClose) => {
    // console.log("🚀 ~ file: backHandler.js ~ line 7 ~ backHandler ~ tabNameToClose", tabNameToClose)

    const [isHideAnimationTab, setHideAnimationTab] = useState(false);

    useEffect(() => {
        if (isHideAnimationTab === true) {
            onPress(false)
        }
    }, [isHideAnimationTab])
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            setHideAnimationTab(true)
            setTimeout(() => {
                setOpenTabs({
                    tabName: tabNameToClose,
                    isOpen: false
                })
            }, 600);
            return true
        })
        return () => {
            backHandler.remove()
        }
    }, [])
}