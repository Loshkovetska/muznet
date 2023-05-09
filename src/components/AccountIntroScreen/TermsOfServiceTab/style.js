import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
width: 100%;
background-color: ${C.white};
padding-top: 68px;
overflow: hidden;
`;
const FormScrollView = styled.ScrollView`
padding: 0px 16px;
padding-bottom: 80px;
`;

const ContentTitle = styled(M.TitleBold18)`
margin-top: 24px;
margin-bottom: 16px;
`;

// Form
const FormInputBlock = styled(M.FormInputBlock)`

`;
const FormInputContainer = styled.View`

`;
const FormInputLabel = styled(M.FormInputLabel)`

`;
const FormInput = styled(M.FormInput)`

`;
const FormTextInput = styled.TextInput`
width: 100%;
font-size: 17px;
padding: 12px 16px;
padding-top: ${props => props.inputLabel === true ? 20 + "px" : 12 + "px"};

font-family: ${F.regular};
color: ${C.black};
border-radius: 6px;
`;
const CheckboxBlock = styled.View`
width: 100%;
display: flex;
flex-direction: column;
`;
const CheckboxBlockTitle = styled(M.TitleBold15)`
margin-bottom: 24px;
`;
const FormInputPricePerHourBlock = styled.View`
width: 100%;
z-index: 0;
border-style: solid;
border-radius: 6px;
height:48px;
padding-left: 16px;
padding-top: ${props => props.inputLabel === true ? 17 + "px" : 0 + "px"};
padding-right: ${props => props.isPassword === true ? 50 + "px" : 16 + "px"};
z-index: -1;
position: absolute;
left: 0px;
bottom: 0px;
right: 0px;
display: flex;
align-items: center;
flex-direction: row;
`;
const FormInputPricePerHourText = styled.Text`
margin-top: 12px;
font-size: 13px;
font-family: ${F.regular};
font-size: 17px;
`;

// Footer
const ContentBlock = styled.View`
display: flex;
align-items: flex-start;
justify-content: center;
flex-direction: row;
padding-top: 7px;
bottom : ${props => props.isKeyboardOpen === true ? 10 + "px" : 60 + "px"};
position: absolute;
left:0;
background-color: ${C.white};
`;
const ContentBlockRow = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
padding: 0px 16px;
`;
const ButtonSubmit = styled(M.BlackBtn)`

`;
const ButtonSubmitText = styled(M.BlackBtnText)`

`;

export const style = {
    FilterContainer: FilterContainer,
    FormScrollView: FormScrollView,
    ContentTitle: ContentTitle,

    // Form
    FormInputBlock: FormInputBlock,
    FormInputContainer: FormInputContainer,
    FormInputLabel: FormInputLabel,
    FormInput: FormInput,
    FormTextInput: FormTextInput,
    CheckboxBlock: CheckboxBlock,
    CheckboxBlockTitle: CheckboxBlockTitle,
    FormInputPricePerHourBlock: FormInputPricePerHourBlock,
    FormInputPricePerHourText: FormInputPricePerHourText,

    ContentBlock: ContentBlock,
    ContentBlockRow: ContentBlockRow,
    ButtonSubmit: ButtonSubmit,
    ButtonSubmitText: ButtonSubmitText,


}
