import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const ModalWindowContainer = styled.View`
display: flex;
background-color: ${C.white};
align-items: center;
flex-direction: column;
padding: 8px;
`;
const ModalWindowBlock = styled.View`
width: 100%;
background-color: ${C.white};
border-radius: 12px;
display: flex;
align-items: center;
flex-direction: column;
margin: 16px 16px;
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
const OfferLi = styled.View`
display: flex;
flex-direction: row;
margin-bottom: 12px;
`;
const OfferLiKeys = styled(M.TitleBold15)`
margin-right: 4px;
color: #333333;
`;
const OfferLiValue = styled(M.MediumText15)`
color: #333333;
flex-shrink:1;
`;
const OfferStatus = styled.View`
width: 100%;
height: 40px;
margin-top: 20px;
border-radius: 6px;
background-color: ${C.backGray};
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const OfferStatusText = styled(M.MediumText15)`

`;
const OfferButtons = styled.View`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
margin-top: 20px;
`;
const OfferAccept = styled(M.BlackBtn)`
width: 48.5%;
height: 40px;
`;
const OfferAcceptText = styled(M.BlackBtnText)`
font-size: 15px;
line-height: 18px;
`;
const OfferDecline = styled(M.BorderBtn)`
width: 48.5%;
height:40px;
`;
const OfferDeclineText = styled(M.BorderBtnText)`
font-size: 15px;
line-height: 18px;

`;

export const style = {
    ModalWindowContainer: ModalWindowContainer,
    ModalWindowBlock: ModalWindowBlock,
    OfferDetails: OfferDetails,
    OfferDetailsTitle: OfferDetailsTitle,
    OfferDetailsBlock: OfferDetailsBlock,
    OfferLi: OfferLi,
    OfferLiKeys: OfferLiKeys,
    OfferLiValue: OfferLiValue,
    OfferStatus: OfferStatus,
    OfferStatusText: OfferStatusText,

    OfferButtons: OfferButtons,
    OfferAccept: OfferAccept,
    OfferAcceptText: OfferAcceptText,
    OfferDecline: OfferDecline,
    OfferDeclineText: OfferDeclineText,
}