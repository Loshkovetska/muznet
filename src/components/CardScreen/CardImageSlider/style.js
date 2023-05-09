import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const SliderContainer = styled.View`
margin-top: -2px;
display: flex;
width: 100%;
`;
const SliderScrollView = styled.ScrollView`

`;
const SliderImagePressable = styled.Pressable`

`;
const SliderImage = styled.Image`
width: 100%;
height: 50%;
`;
const SliderDots = styled.View`
width: 100%;
display: flex;
justify-content: center;
flex-direction: row;
position: absolute;
left: 0px;
bottom: 28px;
right: 0px;
`;
const SliderDotsBlock = styled.View`
height: 24px;
border-radius: 12px;
padding: 0px 8px;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
background-color: #ffffff4c;
`;
const SliderDot = styled.View`
opacity: 1;
width: 8px;
height: 8px;
border-radius: 4px;
background-color : ${props => props.isActive === true ? C.black : C.white};
margin-left : ${props => props.isFirst === true ? 0 + "px" : 8 + "px"};
`;

export const style = {
    SliderContainer: SliderContainer,
    SliderScrollView: SliderScrollView,
    SliderImagePressable: SliderImagePressable,
    SliderImage: SliderImage,
    SliderDotsBlock: SliderDotsBlock,
    SliderDot: SliderDot,
    SliderDots: SliderDots,
}
