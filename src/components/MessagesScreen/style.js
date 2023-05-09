import styled from "styled-components/native";
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const Content = styled.View`
width: 100%;
display: flex;
flex-direction: column;
padding-top: 88px;
padding-bottom: 20px;
`;
const HeaderTitle = styled(M.Title28)`
margin-bottom: 32px;
`;
const AdsContainer = styled.View`
width: 100%;
`;
const MessagesContainer = styled.View`
margin-top: 16px;
`;
const MessagesTitle = styled(M.TitleBold20)`
margin-bottom: 16px;

`;
const MessagesBlock = styled.View`

`;
const MessagesItem = styled.TouchableOpacity`
width: 100%;
border-radius: 6px;
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
padding: 8px;
display: flex;
flex-direction: row;
background-color: ${C.white};
margin-bottom: 8px;
`;
const MessagesItemImage = styled.View`
border-radius: 6px;
width: 48px;
height: 48px;
overflow: hidden;
border-color: ${C.opacity20white};
border-width: 1px;
`;
const MessageUserImage = styled.Image`
width: 100%;
height: 100%;
`;
const MessagesItemInfo = styled.View`
margin-left: 12px;
display: flex;
flex-direction: column;
justify-content: center;
padding-right: 50px;
`;
const MessagesItemInfoRow = styled.View`
display: flex;
align-items: center;
flex-direction: row;
`;
const ItemInfoName = styled(M.TitleBold15)`
margin-bottom: 3px;
`;
const ItemInfoNewMessageIndicator = styled.View`
margin-left: 6px;
width: 16px;
height: 16px;
background-color: ${C.black};
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
border-radius: 8px;
`;
const ItemInfoNewMessageIndicatorText = styled(M.TitleBold10)`
color: ${C.white};
`;
const MessagesItemMessageText = styled(M.PlainText15)`
color: ${C.cyanGray};
`;
const MessagesItemDate = styled(M.PlainText12)`
position: absolute;
top: 11px;
right: 8px;
color: ${C.gray};
`;



export const style = {
    Content: Content,
    AdsContainer: AdsContainer,
    HeaderTitle: HeaderTitle,

    MessagesContainer: MessagesContainer,
    MessagesTitle: MessagesTitle,
    MessagesBlock: MessagesBlock,
    MessagesItem: MessagesItem,
    MessagesItemImage: MessagesItemImage,
    MessageUserImage: MessageUserImage,
    MessagesItemInfo: MessagesItemInfo,
    MessagesItemInfoRow: MessagesItemInfoRow,
    ItemInfoName: ItemInfoName,
    ItemInfoNewMessageIndicator: ItemInfoNewMessageIndicator,
    ItemInfoNewMessageIndicatorText: ItemInfoNewMessageIndicatorText,
    MessagesItemMessageText: MessagesItemMessageText,
    MessagesItemDate: MessagesItemDate,
}

