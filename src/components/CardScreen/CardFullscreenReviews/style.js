import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const ReviewsContainer = styled.ScrollView`
margin-top: -2px;
background-color: ${C.white};
position: absolute;
top: 0px;
left: 0px;
bottom: 0px;
right: 0px;
z-index: 1010;
`;
const Header = styled.View`
width: 100%;
display: flex;
flex-direction: column;
margin-top: 24px;
z-index: 1010;
padding: 0px 16px;
`;
const HeaderClose = styled.TouchableOpacity`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
width: 24px;
height: 24px;
background-color: ${C.opacity20white};
border-radius: 6px;
margin-bottom: 24px;
`;
const ReviewsList = styled.View`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
padding-top: 10px;
padding-bottom: 80px;
`;
const ReviewListItem = styled.View`
width: 100%;
padding: 0px 16px;
`;


export const style = {
    ReviewsContainer: ReviewsContainer,
    Header: Header,
    HeaderClose: HeaderClose,
    ReviewsList: ReviewsList,
    ReviewListItem: ReviewListItem,

}
