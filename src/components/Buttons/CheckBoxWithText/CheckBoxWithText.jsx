import React from "react";

// Styles
import styled from "styled-components";
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

import IMAGES from "@/res/images"
const { CheckBlackIcon, CheckBlackFilledIcon } = IMAGES;

const CheckboxBlock = styled.View`
display: flex;
align-items: center;
flex-direction: row;
width: 100%;
margin-bottom: 20px;
`;
const Checkbox = styled.TouchableOpacity`
width: 24px;
height: 24px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
border-radius: 6px;
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
`;
const CheckboxIcon = styled(Checkbox)`
background-color: ${C.white};
`;
const CheckboxBlackIcon = styled(Checkbox)`
background-color: ${C.black};
background-color: ${props => props.isActive === true ? C.black : C.white};
`;
const CheckboxText = styled(M.MediumText15)`
color: ${C.sBlack};
margin-left: 8px;
`;

const CheckBoxWithText = ({ checkboxState, setCheckboxState, checkboxTitle }) => {

    return (
        <CheckboxBlock >
            <CheckboxIcon onPress={() => setCheckboxState(checkboxState === false ? true : false)}>
                {checkboxState === true ? < CheckBlackIcon width={19} height={12} /> : null}
            </CheckboxIcon>

            <CheckboxText>{checkboxTitle}</CheckboxText>
        </CheckboxBlock>

    )
}
export default CheckBoxWithText; 