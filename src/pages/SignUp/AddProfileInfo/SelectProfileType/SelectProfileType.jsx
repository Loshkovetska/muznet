import React from "react";
import { Image } from "react-native";

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
    ImageBlock,
    SelectTextBlock,
    SelectText,
} = style;

const SelectProfileType = ({ userType, setUserType, setIsDisableButton, setContractorFlow }) => {
    // Local state
    const [isContractor, setIsContractor] = useState(false);
    const [isMusician, setIsMusician] = useState(false);

    useEffect(() => {
        if (userType !== undefined) {
            if (userType === "Contractor") {
                setIsContractor(true)
                setIsMusician(false)
            } else {
                setIsContractor(false)
                setIsMusician(true)
            }
        }
    }, [userType]);

    const handler = (isContractor) => {
        if (isContractor) {
            setIsContractor(true)
            setIsMusician(false)
            // To form
            setUserType("Contractor")
            setIsDisableButton(false)
            setContractorFlow(true)

        } else {
            setIsContractor(false)
            setIsMusician(true)
            // To form
            setUserType("Musician")
            setIsDisableButton(false)

            setContractorFlow(false)
        }
    }

    return (
        <>

            <Container>
                {/* Contractor */}
                <SelectItem
                    onPress={() => { handler(true) }}
                    isActive={isContractor}
                >
                    <CheckBox isActive={isContractor}>
                        {isContractor === true && <RoundBlackCheckIcon width={20} height={20} />}
                    </CheckBox>

                    <ImageBlock>
                        <Image source={IMAGES.SelectContractor} resizeMode={"contain"} />
                    </ImageBlock>

                    <SelectTextBlock>
                        <SelectText>Contractor</SelectText>
                    </SelectTextBlock>

                </SelectItem>

                {/* Musician */}
                <SelectItem
                    onPress={() => { handler(false) }}
                    isActive={isMusician}
                >
                    <CheckBox isActive={isMusician}>
                        {isMusician === true && <RoundBlackCheckIcon width={20} height={20} />}
                    </CheckBox>

                    <ImageBlock>
                        <Image source={IMAGES.SelectMusician} resizeMode={"contain"} />
                    </ImageBlock>

                    <SelectTextBlock>
                        <SelectText>Musician</SelectText>
                    </SelectTextBlock>

                </SelectItem>

            </Container>
        </>

    )
}

export default SelectProfileType;