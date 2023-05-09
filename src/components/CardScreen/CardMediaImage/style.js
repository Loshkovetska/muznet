import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const MediaContainer = styled.View`
width: 100%;
`;
const MediaContainerTitle = styled(M.TitleBold20)`
margin-bottom: 16px;
`;
const MediaBlock = styled.View`
width: 100%;
max-height: 278px;
display: flex;
justify-content: space-between;
border-radius: 12px;
overflow: hidden;
flex-direction: row;
margin-bottom: 16px;
`;
const MediaImg = styled.Image`
width: 100%;
height: 100%;
`;
const MediaImgTwoItem = styled.TouchableOpacity`
width: 48.5%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;
// Three image
const MediaImgLeft = styled.TouchableOpacity`
width: 63%;
`;
const MediaImgCol = styled.View`
width: 34%;
height: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
`;

const MediaImgRight = styled.TouchableOpacity`
height: 48%;
width: 100%;
`;
const MediaViewAllBtn = styled(M.BorderBtn)`

`;
const MediaViewAllBtnText = styled(M.BorderBtnText)`

`;
const CardBorder = styled.View`
margin: 24px 0px;
height: 1px;
border-radius: 2px;
background-color: ${C.gray};
opacity: 0.2;
`;
export const style = {
    MediaContainer: MediaContainer,
    MediaBlock: MediaBlock,
    MediaImg: MediaImg,
    MediaImgTwoItem: MediaImgTwoItem,
    MediaImgLeft: MediaImgLeft,
    MediaImgCol: MediaImgCol,
    MediaImgRight: MediaImgRight,
    MediaContainerTitle: MediaContainerTitle,
    MediaViewAllBtn: MediaViewAllBtn,
    MediaViewAllBtnText: MediaViewAllBtnText,
    CardBorder: CardBorder,
}
