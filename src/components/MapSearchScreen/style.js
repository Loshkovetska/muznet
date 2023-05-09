import styled from "styled-components/native";
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const Content = styled.View`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
/* padding: 0px 16px; */
/* padding-top: 60px; */

`;
const Header = styled.View`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
margin-bottom: 26px;
`;
const ContentTitle = styled(M.Title28)`

`;
const AdsContainer = styled.View`
width: 100%;

`;
const AdsContainerHeader = styled.View`
display: flex;
width: 100%;
margin-top: 16px;
justify-content: space-between;
align-items: center;
flex-direction: row;
`;
const AdsContainerHeaderTitle = styled(M.TitleBold20)`

`;

export const style = {
    Content: Content,
    Header: Header,
    ContentTitle: ContentTitle,
    // Ads
    AdsContainer: AdsContainer,
    AdsContainerHeader: AdsContainerHeader,
    AdsContainerHeaderTitle: AdsContainerHeaderTitle,
}

