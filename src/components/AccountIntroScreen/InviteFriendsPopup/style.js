import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const AttachContainer = styled.View`
width: 100%;
height: 400px;
padding: 0px 16px;
padding-top: 45px;
padding-bottom: 55px;
background-color: ${C.white};
border-top-left-radius: 16px;
border-top-right-radius: 16px;
overflow: hidden;
display: flex;
align-items: center;
flex-direction: column;
z-index: 1100;
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
z-index: 1900;
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
margin-bottom: 85px;
`;
const CloseButton = styled.TouchableOpacity`
width: 42px;
height: 42px;
position: absolute;
top: 5px;
right: 0px;
padding-right: 16px;
padding-top:16px;
padding-bottom: 5px;
padding-top: 16px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const Button = styled.TouchableOpacity`
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
border-radius: 6px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const ButtonCancel = styled(M.BlackBtn)`

`;
const ButtonCancelText = styled(M.BlackBtnText)`

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
const AttachContainerTitle = styled(M.Title20)`
font-family: ${F.extraBlack};
font-size: 21px;
padding-top: 65px;
padding-bottom: 12px;
`;
const AttachCameraOpenBtnText = styled(M.MediumText14)`
`;
const CopyBlock = styled.TouchableOpacity`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
width: 100%;
height: 48px;
border-radius: 6px;
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
padding: 0px 18px;
margin-top: 10px;
`;
const CopyBlockText = styled(M.PlainText17)`

`;
const CopyBlockIcon = styled.View`

`;
const AttachOrText = styled(M.MediumText15)`
color: ${C.cyanGray};
padding: 16px 0px;
`;
export const style = {
    AttachContainer: AttachContainer,
    AttachContainerText: AttachContainerText,
    Header: Header,
    OpacityBg: OpacityBg,
    ButtonsBlock: ButtonsBlock,
    CloseButton: CloseButton,
    Button: Button,
    ButtonCancel: ButtonCancel,
    ButtonCancelText: ButtonCancelText,
    AttachCameraRollBlock: AttachCameraRollBlock,
    AttachFileBlock: AttachFileBlock,
    AttachCameraOpenBtn: AttachCameraOpenBtn,
    AttachContainerTitle: AttachContainerTitle,
    AttachCameraOpenBtnText: AttachCameraOpenBtnText,
    CopyBlock: CopyBlock,
    CopyBlockText: CopyBlockText,
    CopyBlockIcon: CopyBlockIcon,
    AttachOrText: AttachOrText,
}
