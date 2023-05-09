import React from "react";
import { useState, useCallback, useEffect } from "react";
import Slider from "rn-range-slider";
// Styles
import { style } from "./style"
const {
    RangeBlock,
    RangeBlockHeader,
    RangeBlockHeaderTitle,
    Thumb,
    ThumbDot,
    ThumbLabel,
    ThumbLabelText,
    Rail,
    RailSelected,
    Label,
    RangeBlockSlider,
} = style;

const PriceSlider = ({ isResetAll, getDuration }) => {

    const [low, setLow] = useState("0");

    const renderThumb = useCallback(() =>
        <Thumb>
            <ThumbLabel>
                <ThumbLabelText>{low}</ThumbLabelText>
                <ThumbLabelText>days</ThumbLabelText>
            </ThumbLabel>
            <ThumbDot></ThumbDot>
        </Thumb>,
        [low]);
    const renderRail = useCallback(() => <Rail></Rail>, []);
    const renderRailSelected = useCallback(() => <RailSelected></RailSelected>, []);
    const renderLabel = useCallback(value => <Label text={value} ></Label>, []);
    // const renderNotch = useCallback(() => <Notch></Notch>, []);

    const handleValueChange = useCallback((low, high) => {
        getDuration(low)
        // Set value
        setLow(low);
    }, []);

    // If resetAll
    useEffect(() => {
        if (isResetAll === true) {
            setLow("1")
        }
    }, [isResetAll]);
    return (
        <RangeBlock>
            <RangeBlockHeader>
                <RangeBlockHeaderTitle>
                    Duration of the promotion:
                </RangeBlockHeaderTitle>
            </RangeBlockHeader>

            <RangeBlockSlider>

                <Slider
                    min={1}
                    max={30}
                    disableRange={true}
                    step={1}
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    renderLabel={renderLabel}
                    onValueChanged={handleValueChange}

                />

            </RangeBlockSlider>
        </RangeBlock>
    );

}

export default PriceSlider;