import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const ItemContainer = styled.View`
border-radius: 6px;
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
padding: 16px;
display: flex;
flex-direction: column;
width: 100%;
/* height: 100%; */
max-height: 183px;
`;
const ItemInfo = styled.View`
display: flex;
flex-direction: row;

`;
const ItemImageBlock = styled.View`
border-radius: 6px;
width: 40px;
height: 40px;
overflow: hidden;
`;
const ItemImage = styled.Image`
width: 100%;
height: 100%;
`;

const ItemInfoBlock = styled.View`
display: flex;
flex-direction: column;
margin-left: 12px;
`;
const ItemInfoName = styled(M.TitleBold17)`
padding-bottom: 2px;
`;
const ItemInfoDate = styled(M.PlainText13)`
color: ${C.sBlack};
`;
const ItemReviewBlock = styled.View`
padding-top: 10px;
height: 100%;
`;
const ItemReviewText = styled(M.PlainText14)`
padding-top: 4px;
padding-bottom: 7px;
`;
const ItemReviewReadMoreTextDots = styled(M.TitleBold15)`

`;
const ItemReviewReadMoreText = styled(M.TitleBold15)`
text-decoration: underline;
`;
const ItemInfoRate = styled.View`
display: flex;
align-items: center;
flex-direction: row;
position: absolute;
top: 0px;
right: 0px;
`;
const ItemInfoRateText = styled(M.PlainText15)`
margin-left: 6px;
`;

export const style = {
    ItemContainer: ItemContainer,
    ItemImageBlock: ItemImageBlock,
    ItemImage: ItemImage,
    // Inf:// Info
    ItemInfo: ItemInfo,
    ItemInfoBlock: ItemInfoBlock,
    ItemInfoName: ItemInfoName,
    ItemInfoDate: ItemInfoDate,
    ItemReviewBlock: ItemReviewBlock,
    ItemReviewText: ItemReviewText,
    ItemReviewReadMoreTextDots: ItemReviewReadMoreTextDots,
    ItemReviewReadMoreText: ItemReviewReadMoreText,
    ItemInfoRate: ItemInfoRate,
    ItemInfoRateText: ItemInfoRateText,
}