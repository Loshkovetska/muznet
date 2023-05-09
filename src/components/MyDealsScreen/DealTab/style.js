import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.ScrollView`
width: 100%;
background-color: ${C.white};
padding-top: 54px;
`;
const Header = styled.View`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;
padding-top:5px;
padding-bottom: 27px;
`;
const HeaderClose = styled.TouchableOpacity`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
width: 32px;
height: 32px;
position: absolute;
top: 0px;
left: 8px;
`;
const HeaderTitle = styled(M.Title24)`
width: 100%;
text-align: center;
line-height: 30px;
padding-bottom: 24px;
`;
const ArticleContainer = styled.View`
padding: 0px 16px;
`;
const DealRow = styled.View`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
padding: 17px 0px;
border-bottom-color: ${C.lightGray};
border-bottom-width: 1px;
`;
const DealPaymentBlock = styled.View`
padding: 8px 0px;
`;
const DealPaymentRow = styled.View`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
padding: 8px 0px;
`;
const DealRowTitle = styled(M.MediumText16)`
width: 38%;

`;
const DealRowValue = styled(M.MediumText16)`
color: ${C.cyanGray};
width: 60%;
text-align: right;
`;
const DealStatusLabel = styled(M.TitleBold17)`
color : ${props => props.isActive === true ? "#27AE60" : C.sBlack};
`;
const AccountLink = styled.TouchableOpacity`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;

padding: 17px 0px;
border-top-color: ${C.lightGray};
border-top-width: 1px;
border-bottom-color: ${C.lightGray};
border-bottom-width: 1px;
`;
const AccountLinkText = styled(M.PlainText17)`
margin-left: 4px;
`;
const AccountLinkIcon = styled.View`
transform:  rotate(${props => props.isOpen === true ? -90 + "deg" : 90 + "deg"});
width: 24px;
height: 24px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const SecurePaymentMessage = styled.Pressable`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
/* margin-bottom: 200px; */
margin-bottom: ${props => props.dealStatus === false ? 150 + "px" : 200 + "px"};
padding: 8px 0px;
`;
const SecurePaymentMessageText = styled(M.MediumText15)`
color: ${C.sBlack};
`;
const SecurePaymentMessageReadMoreText = styled(M.TitleBold15)`
text-decoration: underline;
margin-left: 5px;
`;
const ContentBlock = styled.View`
display: flex;
align-items: flex-start;
justify-content: center;
flex-direction: row;
margin-top: 16px;
padding: 0px 16px;
padding-top: 7px;
height : 126px;
position: absolute;
left:0;
bottom:0;
background-color: ${C.white};
border-top-color: ${C.lightGray};
border-top-width: 1px;
`;
export const style = {
    FilterContainer: FilterContainer,
    Header: Header,
    HeaderClose: HeaderClose,
    HeaderTitle: HeaderTitle,
    ArticleContainer: ArticleContainer,
    DealRow: DealRow,
    DealPaymentBlock: DealPaymentBlock,
    DealPaymentRow: DealPaymentRow,
    DealRowTitle: DealRowTitle,
    DealRowValue: DealRowValue,
    DealStatusLabel: DealStatusLabel,
    AccountLink: AccountLink,
    AccountLinkText: AccountLinkText,
    AccountLinkIcon: AccountLinkIcon,
    SecurePaymentMessage: SecurePaymentMessage,
    SecurePaymentMessageText: SecurePaymentMessageText,
    SecurePaymentMessageReadMoreText: SecurePaymentMessageReadMoreText,
    ContentBlock: ContentBlock,
}
