
import styled from "styled-components/native";
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const NumberInputsBlock = styled.View`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const FormInputContainer = styled.View`

`;
const FormInput = styled(M.FormInput)`
    height: 72px;
    margin: 0px 4px;
    width: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 0px;
    font-size: 32px;
    line-height: 40px;
    font-family: ${F.medium};
    text-align: center;
`;


export const style = {
    FormInputContainer: FormInputContainer,
    NumberInputsBlock: NumberInputsBlock,
    FormInput: FormInput,

}