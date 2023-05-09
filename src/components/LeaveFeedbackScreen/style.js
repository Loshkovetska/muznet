import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
width: 100%;
background-color: ${C.white};
padding: 0px 16px;
padding-top: 88px;
overflow: hidden;
`;

const FeedbackTitle = styled(M.Title28)`
font-size: 34px;
line-height: 41px;
`;
const FeedbackSubTitle = styled(M.MediumText20)`
padding-top: 16px;
padding-bottom: 24px;
`;
const ButtonsRow = styled.View`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
`;
const AddPayment = styled.TouchableOpacity`
width: 48.5%;
height: 56px;
border-radius: 12px;
padding: 0px 20px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;
border-color: ${C.black};
border-width: 1px;
border-style: solid;
`;
const AddPaymentRowText = styled(M.MediumText15)`
margin-left: 12px;
`;
const SecurePaymentMessage = styled.Pressable`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
margin-top: 8px;
padding: 8px 0px;
`;
const SecurePaymentMessageText = styled(M.MediumText15)`
color: ${C.sBlack};
`;
const SecurePaymentMessageReadMoreText = styled(M.TitleBold15)`
text-decoration: underline;
margin-left: 5px;
`;
export const style = {
    FilterContainer: FilterContainer,
    FeedbackTitle: FeedbackTitle,
    FeedbackSubTitle: FeedbackSubTitle,
    ButtonsRow: ButtonsRow,
    AddPayment: AddPayment,
    AddPaymentRowText: AddPaymentRowText,
    SecurePaymentMessage: SecurePaymentMessage,
    SecurePaymentMessageText: SecurePaymentMessageText,
    SecurePaymentMessageReadMoreText: SecurePaymentMessageReadMoreText,
}
