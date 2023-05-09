import styled from "styled-components/native";
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const Content = styled.View`
width: 100%;
display: flex;
flex-direction: column;
padding-top: 88px;
padding-bottom: 20px;
`;
const HeaderTitle = styled.Text`
font-size: 34px;
font-family: ${F.bold};
color: ${C.black};
margin-bottom: 32px;
padding-top: 88px;
padding-left: 16px;
`;


export const style = {
    Content: Content,
    HeaderTitle: HeaderTitle,
}

