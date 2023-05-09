import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const ModalWindowContainer = styled.View`
position: absolute;
top: 0px;
left: 0px;
display: flex;
background: rgba(12, 12, 14, 0.4);
justify-content: center;
align-items: center;
flex-direction: column;
z-index: 2000;
padding: 0px 16px;

`;
const ModalWindowBlock = styled.View`
z-index: 2001;
background-color: ${C.white};
width: 100%;
border-radius: 12px;
display: flex;
justify-content: flex-end;
align-items: center;
flex-direction: column;
padding-top: 30px;
padding-bottom: 5%;
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
const ModalIcon = styled.View`
margin-bottom: 21px;
width: 120px;
height: 120px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const ModalTitle = styled.Text`
font-size: 20px;
line-height: 25px;
font-family: ${F.extraBlack};
color: ${C.black};
margin-bottom: 4px;
`;
const ModalAdvice = styled(M.MediumText15)`
padding: 0px 20px;
text-align: center;
color: ${C.cyanGray};
`;

export const style = {
    ModalWindowContainer: ModalWindowContainer,
    ModalWindowBlock: ModalWindowBlock,
    CloseButton: CloseButton,
    ModalIcon: ModalIcon,
    ModalTitle: ModalTitle,
    ModalAdvice: ModalAdvice,
}