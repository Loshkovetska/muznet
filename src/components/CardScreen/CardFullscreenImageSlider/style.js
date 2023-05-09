import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const SliderContainer = styled.View`
margin-top: -2px;
background-color: ${C.black};
position: absolute;
top: 0px;
left: 0px;
bottom: 0px;
right: 0px;
z-index: 1010;
`;
const Header = styled.View`
width: 100%;
padding: 0px 16px;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
position: absolute;
top: 60px;
left: 0px;
right: 0px;
z-index: 1010;
`;
const HeaderClose = styled.TouchableOpacity`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
width: 48px;
height: 48px;
background-color: ${C.opacity20white};
border-radius: 6px;
`;
const HeaderTitle = styled.View`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
min-width: 48px;
padding: 0px 10px;
height: 48px;
background-color: ${C.opacity20white};
border-radius: 6px;
`;
const HeaderTitleText = styled(M.MediumText20)`
color: ${C.white};
`;
const SliderScrollView = styled.ScrollView`
/* width: 100%; */
min-height: 200px;
height: 100%;

`;
const SliderImageBlock = styled.View`
/* width: 100%; */
height: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const SliderImage = styled.Image`

`;


export const style = {
    SliderContainer: SliderContainer,
    Header: Header,
    HeaderClose: HeaderClose,
    HeaderTitle: HeaderTitle,
    HeaderTitleText: HeaderTitleText,

    SliderScrollView: SliderScrollView,
    SliderImageBlock: SliderImageBlock,
    SliderImage: SliderImage,

}
