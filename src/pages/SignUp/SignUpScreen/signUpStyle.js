
import styled from "styled-components/native";
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const FormInputContainerPhone = styled.View`
width: 100%;
height: 48px;
display: flex;
align-items: center;
flex-direction: row;
`;
const ButtonSubmit = styled(M.BlackBtn)`

`;

const ButtonSubmitText = styled(M.BlackBtnText)`

`;
const ContentBlock = styled.View`
display: flex;
width: 100%;
align-items: center;
flex-direction: column;
position: absolute;
bottom : ${props => props.isKeyboardOpen === true ? 20 + "px" : 50 + "px"};
`;
const ContentBlockRow = styled.View`
display: flex;
width: 100%;
align-items: center;
justify-content: center;
flex-direction: row;
margin-top: 16px;

`;
const ContainerText = styled(M.PlainText17)`
color: ${C.sBlack};
display: flex;
align-items: center;
flex-direction: row;
padding-right: 5px;
`;
const ContainerLink = styled.TouchableOpacity`

`;
const ContainerLinkText = styled(M.BorderBtnText)`
    font-family: ${F.bold};

`;
export const signUpStyle = {
    FormInputContainerPhone: FormInputContainerPhone,
    ButtonSubmit: ButtonSubmit,
    ButtonSubmitText: ButtonSubmitText,
    ContentBlock: ContentBlock,
    ContentBlockRow: ContentBlockRow,
    ContainerText: ContainerText,
    ContainerLink: ContainerLink,
    ContainerLinkText: ContainerLinkText,
}