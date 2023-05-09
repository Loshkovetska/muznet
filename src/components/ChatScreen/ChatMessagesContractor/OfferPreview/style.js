import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
width: 100%;
background-color: ${C.white};
padding-top: 68px;
overflow: hidden;
/* z-index: 1000; */
`;
const Header = styled.View`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
padding-bottom: 24px;
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
left: 16px;
bottom: 0px;
`;
const HeaderTitle = styled(M.Title24)`
line-height: 30px;
`;
const FilterBlock = styled.ScrollView`
width: 100%;
height: 100%;
`;
const OfferDetails = styled.View`
margin: 0px 16px;
`;
const OfferDetailsTitle = styled(M.Title20)`

`;
const OfferDetailsBlock = styled.View`
margin-top: 12px;
margin-bottom: 24px;
padding: 16px;
border-radius: 6px;
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
`;
const OfferLi = styled.View`
display: flex;
flex-direction: row;
margin-bottom: 12px;
`;
const OfferLiKeys = styled(M.TitleBold17)`
margin-right: 4px;
color: #333333;
`;
const OfferLiValue = styled(M.PlainText17)`
color: #333333;
display: flex;
flex-direction: row;
flex-wrap: wrap;
`;
const OfferPayment = styled.View`
margin: 0px 16px;
`;

const ContentBlock = styled.View`
display: flex;
align-items: flex-start;
justify-content: center;
flex-direction: row;
margin-top: 16px;
padding-top: 7px;
height : 126px;
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
const SecurePaymentMessage = styled.Pressable`
background-color: ${C.backGray};
border-radius: 6px;
margin: 0px 16px;
margin-bottom: 150px;
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
    Header: Header,
    HeaderClose: HeaderClose,
    HeaderTitle: HeaderTitle,
    FilterBlock: FilterBlock,

    OfferDetails: OfferDetails,
    OfferDetailsTitle: OfferDetailsTitle,
    OfferDetailsBlock: OfferDetailsBlock,
    OfferLi: OfferLi,
    OfferLiKeys: OfferLiKeys,
    OfferLiValue: OfferLiValue,

    OfferPayment: OfferPayment,

    ContentBlock: ContentBlock,
    ContentBlockRow: ContentBlockRow,
    ContainerLink: ContainerLink,
    ContainerPrice: ContainerPrice,
    ContainerHour: ContainerHour,
    ButtonSubmit: ButtonSubmit,
    ButtonSubmitText: ButtonSubmitText,
    SecurePaymentMessage: SecurePaymentMessage,
    SecurePaymentMessageText: SecurePaymentMessageText,
    SecurePaymentMessageReadMoreText: SecurePaymentMessageReadMoreText,
}
