import React from "react";
import { useState, useCallback, useEffect } from "react";

import { View, Text } from "react-native";
import CheckBoxWithText from "@/components/Buttons/CheckBoxWithText"

import { addDotForNumber } from "@/components/helpers/addDotForNumber";
import Slider from "rn-range-slider";

// Variables
import C from "@/res/colors"
// Images
import IMAGES from "@/res/images"
const {
    PriceRangeBgIcon
} = IMAGES;
// Styles
import { style } from "./style"

const {
    RangeBlock,
    RangeBlockBg,
    RangeBlockHeader,
    RangeBlockHeaderTitle,
    RangeBlockHeaderText,
    LeftOverflowBLock,
    RightOverflowBLock,
    Thumb,
    Rail,
    RailSelected,
    Label,
    RangeBlockSlider,
} = style;

const PriceRangeSlider = ({ isResetAll, getPriceRange }) => {

    const [low, setLow] = useState("0");
    const [high, setHigh] = useState("1,000,000");

    const [leftOverflowWidth, setLeftOverflowWidth] = useState(0);
    const [rightOverflowWidth, setRightOverflowWidth] = useState(0);

    const renderThumb = useCallback(() => <Thumb></Thumb>, []);
    const renderRail = useCallback(() => <Rail></Rail>, []);
    const renderRailSelected = useCallback(() => <RailSelected></RailSelected>, []);
    const renderLabel = useCallback(value => <Label text={value} ></Label>, []);
    // const renderNotch = useCallback(() => <Notch></Notch>, []);

    const handleValueChange = useCallback((low, high) => {
        getPriceRange({
            minPrice: low,
            maxPrice: high,
        })
        const dottedLow = addDotForNumber(low)
        const dottedHigh = addDotForNumber(high)
        // Set value
        setLow(dottedLow);
        setHigh(dottedHigh);

        // Set width for overflow block
        const leftWidth = (1000000 - low) / 100
        setLeftOverflowWidth((100 - leftWidth) + 0.5)
        const rightWidth = (1000000 - high) / 100
        setRightOverflowWidth(rightWidth)
    }, []);

    // If resetAll
    useEffect(() => {

        if (isResetAll === true) {
            setLow("0")
            setHigh("1,000,000")
            setLeftOverflowWidth(0)
            setRightOverflowWidth(0)

        }
    }, [isResetAll]);
    return (
        <RangeBlock>
            <RangeBlockHeader>
                <RangeBlockHeaderTitle>
                    Price Range:
                </RangeBlockHeaderTitle>

                <RangeBlockHeaderText>
                    ${low} - ${high}
                </RangeBlockHeaderText>

            </RangeBlockHeader>

            <RangeBlockBg>
                <LeftOverflowBLock
                    style={{
                        width: leftOverflowWidth < 0 ? 0 : `${leftOverflowWidth}%`,
                    }}
                ></LeftOverflowBLock>
                <PriceRangeBgIcon width={"100%"} height={43} />
                <RightOverflowBLock
                    style={{
                        width: rightOverflowWidth < 0 ? 0 : `${rightOverflowWidth}%`,
                    }}
                ></RightOverflowBLock>
            </RangeBlockBg>
            <RangeBlockSlider>

                {isResetAll === false && <Slider
                    style={{
                        zIndex: 710
                    }}
                    min={0}
                    max={1000000}
                    step={50}
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    renderLabel={renderLabel}
                    onValueChanged={handleValueChange}
                // disableRange={rangeDisabled}
                // floatingLabel={floatingLabel}
                // renderNotch={renderNotch}
                />
                }
            </RangeBlockSlider>
        </RangeBlock>
    );

}

export default PriceRangeSlider;