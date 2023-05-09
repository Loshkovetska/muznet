
import styled from "styled-components/native";
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const NumberInputsBlock = styled.View`
/* width: 100%; */
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
margin: 0px 16px;
margin-bottom: 12px;
`;
const FormInputContainer = styled.View`
width: 44%;
margin-bottom: 12px;
`;
const TimePickerButton = styled.TouchableOpacity`
width: 44%;
border-style: solid;
border-width: 1px;
border-color: ${C.lightGray};
border-radius: 6px;
height:48px;
padding-left: 16px;
padding-right: 16px;
display: flex;
align-items: center;
flex-direction: row;
`;
const TimePickerButtonLabel = styled(M.FormInputLabel)`

`;
const TimePickerButtonText = styled.Text`
padding-top: ${props => props.isShiftPlaceholder === true ? 17 + "px" : 0 + "px"};
font-size: 17px;
font-family: ${F.regular};
color: ${C.black};
`;
const FormInput = styled(M.FormInput)`

`;
const SeparatorBlock = styled.View`
width: 8%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const SeparatorDash = styled.View`
width: 70%;
height: 1.5px;
border-radius: 2px;
background-color: ${C.black};
`;
const ErrorMessage = styled(M.ErrorMessage)`

`;
export const style = {
    FormInputContainer: FormInputContainer,
    NumberInputsBlock: NumberInputsBlock,
    FormInput: FormInput,
    TimePickerButton: TimePickerButton,
    TimePickerButtonLabel: TimePickerButtonLabel,
    TimePickerButtonText: TimePickerButtonText,
    SeparatorBlock: SeparatorBlock,
    SeparatorDash: SeparatorDash,
    ErrorMessage: ErrorMessage,

}