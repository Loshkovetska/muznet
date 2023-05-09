import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

// Search input
const MessagesContainer = styled.View`
width: 100%;
background-color: #F2F3F9;
padding-bottom: 0px;
position: absolute;
top: 0px;
left: 0px;
bottom: 0px;
right: 0px;
`;



const CreateOfferCont = styled.View`
position: absolute;
top:115px;
z-index: 999;
left: 0%;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
background-color: #F2F3F9;
padding-bottom: 16px;
padding-top: 16px;

`

const CreateOfferButton = styled.TouchableOpacity`
border-radius: 6px;
width: 46%;
height: 40px;

display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
background-color: ${C.black};
`;

// const CreateOfferButton = styled.TouchableOpacity`
// position: absolute;
// top:132px;
// right: 27%;
// border-radius: 6px;
// left:27%;
// width: 46%;
// height: 40px;
// z-index: 999;
// display: flex;
// justify-content: center;
// align-items: center;
// flex-direction: row;
// background-color: ${C.black};
// `;
const CreateOfferButtonText = styled(M.BlackBtnText)`

`;
const MessageScrollBlock = styled.ScrollView`
width: 100%;
`;
const MessageBlock = styled.View`
position: absolute;
left: 0px;
right: 0px;
bottom: 0px;
`;
const MessageImageBlock = styled.View`
max-width: 240px;
overflow: hidden;
border-radius: 6px;
max-height: 100%;
`;
const MessageBlockInsideScroll = styled.View`
display: flex;
justify-content: flex-end;
align-items: center;
flex-direction: column;
padding-top: 230px;
padding-bottom: 126px;
height: 100%;
`;
const MessageBlockDay = styled(M.TitleBold15)`
color: ${C.cyanGray};
margin-bottom: 16px;
`;
const Message = styled.View`
display: flex;
padding: 0px 16px;
width: 100%;
flex-direction: row;
margin-bottom: 16px;
`;
const Outcome = styled(Message)`
justify-content: flex-end;
align-items: flex-end;
`;
const Income = styled(Message)`
justify-content: flex-start;
align-items: flex-end;
`;
const IncomeCol = styled.View`
margin-left: 8px;
display: flex;
align-items: flex-start;
flex-direction: column;
`;
const OutcomeCol = styled.View`
margin-right: 8px;
display: flex;
align-items: flex-end;
flex-direction: column;
`;
const IncomeMessage = styled.View`
background-color: ${C.white};
padding: 8px 9px;
max-width: 243px;
border-radius: 12px;
border-bottom-left-radius: 0px;
`;
const OutcomeMessage = styled.View`
background-color: #333333;
padding: 8px 9px;
max-width:243px;
border-radius: 12px;
border-bottom-right-radius: 0px;
`;
const OutcomeMessageFile = styled.TouchableOpacity`
display: flex;
flex-direction: row;
`;
const OutcomeMessageFileText = styled(M.MediumText14)`
color: ${C.white};
margin-left: 8px;
padding-right: 22px;
`;
const OutcomeMessageText = styled(M.MediumText14)`
color: ${C.white};
`;
const IncomeMessageText = styled(M.MediumText14)`
color: #333333;
`;
const MessageTime = styled(M.MediumText12)`
margin-top: 4px;
color: ${C.cyanGray};
`;
const UserImgBlock = styled.View`
border-radius: 16px;
width: 32px;
height: 32px;
overflow: hidden;
border-color: ${C.opacity20white};
border-width: 1px;
margin-bottom: 19px;
`;
const UserImg = styled.Image`
width: 100%;
height: 100%;
`;


export const style = {
    CreateOfferCont, 
    MessagesContainer: MessagesContainer,
    CreateOfferButton: CreateOfferButton,
    CreateOfferButtonText: CreateOfferButtonText,
    MessageBlock: MessageBlock,
    MessageImageBlock: MessageImageBlock,
    MessageScrollBlock: MessageScrollBlock,
    MessageBlockInsideScroll: MessageBlockInsideScroll,
    MessageBlockDay: MessageBlockDay,
    Outcome: Outcome,
    OutcomeCol: OutcomeCol,
    OutcomeMessage: OutcomeMessage,
    OutcomeMessageFile: OutcomeMessageFile,
    OutcomeMessageFileText: OutcomeMessageFileText,
    OutcomeMessageText: OutcomeMessageText,
    Income: Income,
    IncomeCol: IncomeCol,
    IncomeMessage: IncomeMessage,
    IncomeMessageText: IncomeMessageText,
    MessageTime: MessageTime,
    UserImgBlock: UserImgBlock,
    UserImg: UserImg,
}