import React from "react";

// Icon
import IMAGES from "@/res/images"
const { GoBackIcon } = IMAGES;

// Styles
import styled from "styled-components";
const Arrow = styled.View`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
padding-left: 5px;
padding-right: 10px;
z-index: 1000;
`;
const CalendarArrowButtonLeft = styled(Arrow)`
left: 0px;
`;
const CalendarArrowButtonRight = styled(Arrow)`
transform: rotate(180deg);
`;

const CalendarArrow = ({ direction }) => {

    return (direction === "left" ?
        <CalendarArrowButtonLeft>
            <GoBackIcon width={12} height={20} />
        </CalendarArrowButtonLeft>
        :
        <CalendarArrowButtonRight>
            <GoBackIcon width={12} height={20} />
        </CalendarArrowButtonRight>
    )
}
export default CalendarArrow; 