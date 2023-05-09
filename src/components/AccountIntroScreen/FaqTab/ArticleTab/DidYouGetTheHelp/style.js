import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
width: 100%;
background-color: ${C.white};
`;
const FeedbackSubTitle = styled(M.TitleBold20)`
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
const AddPaymentRowText = styled(M.MediumText17)`
margin-left: 12px;
`;
const ArticleSubTitle = styled(M.TitleBold15)`
line-height: 24px;
margin-bottom: 24px;
`;
export const style = {
    ArticleSubTitle: ArticleSubTitle,
    FilterContainer: FilterContainer,
    FeedbackSubTitle: FeedbackSubTitle,
    ButtonsRow: ButtonsRow,
    AddPayment: AddPayment,
    AddPaymentRowText: AddPaymentRowText,
    ArticleSubTitle: ArticleSubTitle,
}
