import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const AttachContainer = styled.View`
width: 100%;
background-color: ${C.white};
border-top-left-radius: 16px;
border-top-right-radius: 16px;
overflow: hidden;
display: flex;
align-items: flex-end;
flex-direction: row;
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
flex-direction: row;
width: 100%;
height: 200px;
margin-bottom: 30px;
padding: 0px 20px;
`;
const ClosePanBlock = styled.TouchableOpacity`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
width: 100%;
height: 20px;
position: absolute;
padding-top: 12px;
padding-bottom: 12px;
top: 0px;
left: 0px;
right: 0px;
`;
const ClosePan = styled.View`
width: 72px;
height: 5px;
border-radius: 4px;
background-color: ${C.backGray};
`;
const Button = styled.TouchableOpacity`
width: 28%;
height: 62px;
background-color: ${C.backGray};
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
border-radius: 6px;
border-color: #e6e6e6;
border-width: 1px;
border-style: solid;
`;
const ButtonText = styled(M.MediumText14)`
font-family: ${F.bold};
color: ${C.black};
margin-top: 4px;
`;
const AttachCameraRollBlock = styled.ScrollView`
width: 100%;
height: 100%;
`;
const AttachFileBlock = styled.ScrollView`
width: 100%;
height: 100%;
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
    Header: Header,
    OpacityBg: OpacityBg,
    ButtonsBlock: ButtonsBlock,
    ClosePanBlock: ClosePanBlock,
    ClosePan: ClosePan,
    Button: Button,
    ButtonText: ButtonText,
    AttachCameraRollBlock: AttachCameraRollBlock,
    AttachFileBlock: AttachFileBlock,
    AttachCameraOpenBtn: AttachCameraOpenBtn,
    AttachCameraOpenBtnText: AttachCameraOpenBtnText,
}
