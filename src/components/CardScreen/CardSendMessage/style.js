import styled from "styled-components/native";
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const Container = styled.View`
background-color: ${C.white};
position: absolute;
top: 0px;
left: 0px;
bottom: 0px;
right: 0px;
z-index: 1010;
padding: 0px 16px 24px;
`;
const Header = styled.View`
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
margin-top: 32px;
margin-bottom: 24px;
`;
const HeaderClose = styled.TouchableOpacity`
display: flex;
padding-left: 5px;
align-items: center;
flex-direction: row;
width: 35px;
height: 40px;
background-color: ${C.opacity20white};
border-radius: 6px;
position: absolute;
top: -5px;
left: 0px;
`;
const ContentTitle = styled(M.Title24)`

`;
const FormText = styled(M.MediumText17)`
color: ${C.cyanGray};
margin-bottom: 24px;
`;
const FormBlock = styled.View`

`;
const FormInputBlock = styled(M.FormInputBlock)`

`;
const FormInputContainer = styled.View`

`;
const FormInput = styled.TextInput`
font-size: 17px;
padding: 16px;
background-color: ${C.white};
font-family: ${F.regular};
color: ${C.black};
border-width: 1px;
border-style: solid;
border-radius: 6px;
`;
const ButtonSubmit = styled(M.BlackBtn)`
position: relative;
bottom: 60px;
left: 0px;

`;
const ButtonSubmitText = styled(M.BlackBtnText)`

`;
const ErrorMessage = styled.Text`
color: ${C.red};
font-family: ${F.regular};
font-size: 13.5px;
position:absolute;
bottom: -25px ;
left:0px;
`;
const WarningBlock = styled.View`
display: flex;
flex-direction: row;
margin-bottom: 24px;
`;
const WarningBlockText = styled(M.PlainText14)`
margin-left: 10px;
margin-right: 25px;
color: ${C.cyanGray};
`;
export const style = {
    Container: Container,
    ContentTitle: ContentTitle,
    Header: Header,
    HeaderClose: HeaderClose,
    FormText: FormText,
    FormBlock: FormBlock,
    FormInputBlock: FormInputBlock,
    FormInputContainer: FormInputContainer,
    FormInput: FormInput,
    ButtonSubmit: ButtonSubmit,
    ButtonSubmitText: ButtonSubmitText,
    ErrorMessage: ErrorMessage,
    WarningBlock: WarningBlock,
    WarningBlockText: WarningBlockText,
}