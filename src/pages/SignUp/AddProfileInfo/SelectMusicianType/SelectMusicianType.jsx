import React from "react";

import { useEffect } from "react";
import { useState } from "react";

// Images
import IMAGES from "@/res/images"
const {
    RoundBlackCheckIcon,

} = IMAGES;

// Styles
import { style } from "./style"
const {
    Container,
    SelectItem,
    CheckBox,
    SelectText,
} = style;

const SelectMusicianType = ({ musicianType, setMusicianType, setIsDisableButton, setMusicianFlow }) => {
    // Local state
    const [localMusicianType, setLocalMusicianType] = useState(musicianType);

    const isActiveSinger = localMusicianType === "Singer"
    const isActiveMusician = localMusicianType === "Musician"
    const isActiveBand = localMusicianType === "Band"

    useEffect(() => {

        switch (localMusicianType) {
            case "Singer":
                setMusicianType("Singer")
                setIsDisableButton(false)
                setMusicianFlow(true)
                break;
            case "Musician":
                setMusicianType("Musician")
                setIsDisableButton(false)
                setMusicianFlow(true)
                break;
            case "Band":
                setMusicianType("Band")
                setIsDisableButton(false)
                setMusicianFlow(false)
                break;

            default:
                break;
        }

    }, [musicianType, localMusicianType]);

    return (
        <>

            <Container>
                {/* Singer */}
                <SelectItem
                    onPress={() => { setLocalMusicianType("Singer") }}
                    isActive={isActiveSinger}
                >
                    <CheckBox isActive={isActiveSinger}>
                        {isActiveSinger === true && <RoundBlackCheckIcon width={20} height={20} />}
                    </CheckBox>

                    <SelectText>Singer</SelectText>

                </SelectItem>
                {/* Musician */}
                <SelectItem
                    onPress={() => { setLocalMusicianType("Musician") }}
                    isActive={isActiveMusician}
                >
                    <CheckBox isActive={isActiveMusician}>
                        {isActiveMusician === true && <RoundBlackCheckIcon width={20} height={20} />}
                    </CheckBox>

                    <SelectText>Musician</SelectText>

                </SelectItem>
                {/* Band */}
                <SelectItem
                    onPress={() => { setLocalMusicianType("Band") }}
                    isActive={isActiveBand}
                >
                    <CheckBox isActive={isActiveBand}>
                        {isActiveBand === true && <RoundBlackCheckIcon width={20} height={20} />}
                    </CheckBox>

                    <SelectText>Band</SelectText>

                </SelectItem>



            </Container>
        </>

    )
}

export default SelectMusicianType;