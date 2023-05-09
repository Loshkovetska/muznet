import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"


const FilterContainer = styled.View`
width: 100%;
background-color: ${C.white};
`;

const FilterBlock = styled.ScrollView`
width: 100%;
height: 94%;
padding: 0px 16px;
`;
const FilterBlockRow = styled.View`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
`;
const BankIconsRow = styled.View`
display: flex;
flex-direction: row;
position: absolute;
top: 0px;
right:16px;
height: 48px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const BankIconsRowItem = styled.View`
margin-left: 4px;
`;
const CheckboxBlock = styled.View`
width: 100%;
display: flex;
flex-direction: column;
margin-top:${props => props.isWilling === true ? 7 + "px" : 14 + "px"};
margin-bottom:${props => props.isWilling === true ? -8 + "px" : 146 + "px"};
margin-left: 16px;
`;
const CheckboxBlockTitle = styled(M.TitleBold15)`
margin-bottom: 24px;
`;
const ContentBlock = styled.View`
display: flex;
align-items: flex-start;
justify-content: center;
flex-direction: row;
margin-top: 16px;
padding-top: 7px;
/* width: 100%; */
/* height : ${props => props.isKeyboardOpen === true ? 116 + "px" : 146 + "px"}; */
height : 166px;
position: absolute;
left:0;
bottom:0;
background-color: ${C.white};
border-top-color: ${C.lightGray};
border-top-width: 1px;
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
const ContainerLink = styled.View`
width: 40%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-left: -5px;
`;
const ContainerPrice = styled(M.Title24)`

`;
const ContainerHour = styled(M.PlainText17)`

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
const AddInfoBlock = styled.View`
width: 100%;
`;
const AddInfoContainer = styled.View`
border-radius: 6px;
overflow: hidden;
display: flex;
justify-content: space-between;
align-items: flex-end;
flex-direction: row;
`;
const AddInfoInput = styled.TextInput`
width: 100%;
font-size: 17px;
padding: 16px 16px;
font-family: ${F.regular};
color: ${C.black};
border-radius: 6px;
`;
const SecurePaymentMessage = styled.Pressable`
background-color: ${C.backGray};
border-radius: 6px;
margin-bottom: 200px;
padding: 16px 16px;
padding-right: 30px;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
`;
const SecurePaymentMessageText = styled(M.MediumText13)`
color: ${C.sBlack};
margin-left: 10px;
`;
const SecurePaymentMessageReadMoreText = styled(M.TitleBold15)`
text-decoration: underline;
font-size: 13px;
margin-left: 5px;
`;

export const style = {
    FilterContainer: FilterContainer,
    FilterBlock: FilterBlock,
    FilterBlockRow: FilterBlockRow,
    BankIconsRow: BankIconsRow,
    BankIconsRowItem: BankIconsRowItem,
    CheckboxBlock: CheckboxBlock,
    CheckboxBlockTitle: CheckboxBlockTitle,
    ContentBlock: ContentBlock,
    ContentBlockRow: ContentBlockRow,
    ContainerLink: ContainerLink,
    ContainerPrice: ContainerPrice,
    ContainerHour: ContainerHour,
    ButtonSubmit: ButtonSubmit,
    ButtonSubmitText: ButtonSubmitText,
    FormInputPricePerHourBlock: FormInputPricePerHourBlock,
    FormInputPricePerHourText: FormInputPricePerHourText,

    AddInfoBlock: AddInfoBlock,
    AddInfoContainer: AddInfoContainer,
    AddInfoInput: AddInfoInput,

    SecurePaymentMessage: SecurePaymentMessage,
    SecurePaymentMessageText: SecurePaymentMessageText,
    SecurePaymentMessageReadMoreText: SecurePaymentMessageReadMoreText,
}
