import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const MediaContainer = styled.View`
width: 100%;
padding: 0px 10px;
`;
const MediaContainerTitle = styled(M.TitleBold18)`
margin-bottom: 8px;
margin-left: 6px;
`;
const MediaContainerSubTitle = styled(M.PlainText17)`
margin-bottom: 16px;
color: ${C.cyanGray};
margin-left: 6px;
`;
const MediaBlock = styled.View`
width: 100%;
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-wrap: wrap;
margin-bottom: 16px;
`;
const MediaImgBlock = styled.View`
margin: 0px 6px;
margin-bottom: 12px;

`;
const MediaImg = styled.Image`
width: 100%;
height: 100%;
border-radius: 6px;
overflow: hidden;
`;

const MediaDeleteButton = styled.TouchableOpacity`
width: 28px;
height: 28px;
background-color: ${C.opacity20white};
border-radius: 6px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
position: absolute;
top: 6px;
right: 6px;
`;
const MediaImgAddButton = styled.TouchableOpacity`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: ${C.backGray};
border-radius: 6px;
margin: 0px 6px;
`;
const MediaImgAddButtonText = styled(M.MediumText15)`
margin-top: 8px;
`;

export const style = {
    MediaContainer: MediaContainer,
    MediaBlock: MediaBlock,
    MediaImg: MediaImg,
    MediaImgBlock: MediaImgBlock,
    MediaContainerTitle: MediaContainerTitle,
    MediaContainerSubTitle: MediaContainerSubTitle,
    MediaDeleteButton: MediaDeleteButton,
    MediaImgAddButton: MediaImgAddButton,
    MediaImgAddButtonText: MediaImgAddButtonText,
}
