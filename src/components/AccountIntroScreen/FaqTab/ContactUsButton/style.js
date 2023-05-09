import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const ContentBlock = styled.View`
display: flex;
align-items: flex-start;
justify-content: center;
flex-direction: row;
margin-top: 40px;
margin-bottom: 130px;
width: 100%;
height: 100px;
padding-top: 7px;
`;
const ContentBlockRow = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 0px 16px;
`;
const ButtonSubmit = styled(M.BlackBtn)`
width: 50%;
`;
const ButtonSubmitText = styled(M.BlackBtnText)`

`;
const ContainerLink = styled.View`
width: 50%;
display: flex;
justify-content: center;
flex-direction: column;
margin-left: -5px;
`;
const ContainerPrice = styled(M.TitleBold17)`

`;
const ContainerHour = styled(M.PlainText17)`

`;
export const style = {
    ContentBlock: ContentBlock,
    ContentBlockRow: ContentBlockRow,
    ContainerLink: ContainerLink,
    ContainerPrice: ContainerPrice,
    ContainerHour: ContainerHour,
    ButtonSubmit: ButtonSubmit,
    ButtonSubmitText: ButtonSubmitText,

}