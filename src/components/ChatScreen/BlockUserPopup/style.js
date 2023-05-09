import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const AttachContainer = styled.View`
width: 100%;
height: 200px;
padding: 12px 16px;
background-color: ${C.white};
border-top-left-radius: 16px;
border-top-right-radius: 16px;
overflow: hidden;
display: flex;
align-items: center;
flex-direction: column;
position: absolute;
 left: 0px;
 bottom: 0px;
 right: 0px;
`;
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
const Header = styled.View`
width: 100%;
display: flex;
align-items: center;
flex-direction: row;
padding: 16px;
`;
const ButtonsBlock = styled.View`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
margin-bottom: 40px;
padding-top: 8px;
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
border-width: 0px;
background-color: ${C.backGray};
`;
const ButtonText = styled(M.PlainText20)`
color: #FF2E2E;
`;
const ButtonCancelText = styled(M.PlainText20)`

`;

const AttachCameraRollBlock = styled.ScrollView`
width: 100%;
height: 100%;
`;
const AttachFileBlock = styled.View`
width: 100%;
`;
const AttachCameraOpenBtn = styled.TouchableOpacity`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: ${C.backGray};
`;
const AttachCameraOpenBtnText = styled(M.MediumText12)`
margin-top: 4px;
`;
export const style = {
    AttachContainer: AttachContainer,
    AttachContainerText: AttachContainerText,
    Header: Header,
    OpacityBg: OpacityBg,
    ButtonsBlock: ButtonsBlock,
    CloseButton: CloseButton,
    Button: Button,
    ButtonText: ButtonText,
    ButtonCancelText: ButtonCancelText,
    AttachCameraRollBlock: AttachCameraRollBlock,
    AttachFileBlock: AttachFileBlock,
    AttachCameraOpenBtn: AttachCameraOpenBtn,
    AttachCameraOpenBtnText: AttachCameraOpenBtnText,
}
