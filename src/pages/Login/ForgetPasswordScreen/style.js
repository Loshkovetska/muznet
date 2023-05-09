
import styled from "styled-components/native";
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

// Button
const ButtonsBlock = styled.View`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
width: 100%;
`;
const Button = styled.TouchableOpacity`
width: 48.5%;
height: 40px;
background-color: ${props => props.isActive === true ? "rgba(92, 101, 116, 0.2)" : C.white};
border-color: ${props => props.isActive === true ? "rgba(92, 101, 116, 0.2)" : C.lightGray};
margin-bottom: 16px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
border-width: 1px;
border-style: solid;
border-radius: 6px;
`;
const ButtonText = styled(M.MediumText17)`
color: ${props => props.isSkip === true ? C.gray : C.black};
padding-right: ${props => props.isSkip === true ? 0 + "px" : 8 + "px"};
padding-left: 8px;
`;

export const forgotPasswordStyle = {
    // Buttons
    ButtonsBlock: ButtonsBlock,
    Button: Button,
    ButtonText: ButtonText,
}