import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const ModalWindowBlock = styled.View`
width: 100%;
background-color: ${C.white};
border-radius: 12px;
display: flex;
align-items: center;
flex-direction: column;
margin: 16px 16px;
margin-top: 0px;
`;
const OfferDetails = styled.View`
`;
const OfferDetailsTitle = styled(M.MediumText15)`
color: #333333;
margin-bottom: 8px;

`;
const OfferDetailsBlock = styled.View`
border-radius: 6px;
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
padding: 8px;
`;
const MyDealLink = styled(M.BlackBtn)`
height:40px;
border-radius: 6px;
margin-top: 10px;
`;
const MyDealLinkText = styled(M.PlainText15)`
color: ${C.white};
`;


export const style = {
    ModalWindowBlock: ModalWindowBlock,
    OfferDetails: OfferDetails,
    OfferDetailsTitle: OfferDetailsTitle,
    OfferDetailsBlock: OfferDetailsBlock,
    MyDealLink: MyDealLink,
    MyDealLinkText: MyDealLinkText,
}