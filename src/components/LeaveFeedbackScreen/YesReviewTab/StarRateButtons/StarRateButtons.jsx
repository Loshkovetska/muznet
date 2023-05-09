import React from "react";
import IMAGES from "@/res/images"
const {
    RateStarIcon,
    RateEmptyStarIcon,
} = IMAGES;
// Styles
import styled from "styled-components";
const StarRow = styled.View`
display: flex;
align-items: center;
flex-direction: row;
width: 100%;
`;
const StarButton = styled.TouchableOpacity`
display: flex;
align-items: center;
flex-direction: row;
margin-right: 15px;
`;

const StarRateButtons = ({ rateCount, setRentCount }) => {
    const activeIcon = <RateStarIcon width={26} height={26} />
    const emptyIcon = <RateEmptyStarIcon width={26} height={26} />

    return (
        <StarRow>
            <StarButton onPress={() => { setRentCount(1) }} >
                {rateCount >= 1 && rateCount !== 0 ? activeIcon : emptyIcon}
            </StarButton>
            <StarButton onPress={() => { setRentCount(2) }} >
                {rateCount >= 2 && rateCount !== 0 ? activeIcon : emptyIcon}
            </StarButton>
            <StarButton onPress={() => { setRentCount(3) }} >
                {rateCount >= 3 && rateCount !== 0 ? activeIcon : emptyIcon}
            </StarButton>
            <StarButton onPress={() => { setRentCount(4) }} >
                {rateCount >= 4 && rateCount !== 0 ? activeIcon : emptyIcon}
            </StarButton>
            <StarButton onPress={() => { setRentCount(5) }} >
                {rateCount === 5 && rateCount !== 0 ? activeIcon : emptyIcon}
            </StarButton>
        </StarRow>
    )
}
export default StarRateButtons; 