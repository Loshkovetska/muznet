import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"


const AttachContainerText = styled(M.PlainText20)`
margin-bottom: 15px;
text-align: center;
`;
const OpacityBg = styled.Pressable`
 position: absolute;
 left: 0px;
 bottom: 0px;
 right: 0px;
background-color: ${C.black};
opacity: 0.5;
`;
const ButtonsBlock = styled.View`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
margin-bottom: 60px;
`;
const CloseButton = styled.TouchableOpacity`
width: 42px;
height: 42px;
position: absolute;
top: 0px;
right: 0px;
padding-right: 16px;
padding-top: 5px;
padding-bottom: 5px;
padding-top: 16px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const Button = styled(M.BorderBtn)`
margin-top: 8px;
`;
const ButtonText = styled(M.BorderBtnText)`

`;
const ButtonCancel = styled(M.BlackBtn)`

`;
const ButtonCancelText = styled(M.BlackBtnText)`

`;

export const style = {
    CloseButton: CloseButton,
    OpacityBg: OpacityBg,
    ButtonsBlock: ButtonsBlock,
    Button: Button,
    ButtonText: ButtonText,
    ButtonCancel: ButtonCancel,
    ButtonCancelText: ButtonCancelText,
    AttachContainerText: AttachContainerText,
}
