import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
width: 100%;
background-color: ${C.white};
padding-top: 68px;
`;
const Header = styled.View`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
padding-bottom: 24px;
`;
const HeaderClose = styled.TouchableOpacity`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
width: 32px;
height: 32px;
position: absolute;
top: 0px;
left: 7px;
bottom: 0px;
`;
const HeaderTitle = styled(M.Title24)`
line-height: 30px;
`;
const FilterBlock = styled.ScrollView`
width: 100%;
height: 94%;
padding: 0px 16px;
`;
const ContentBlock = styled.View`
display: flex;
align-items: flex-start;
justify-content: center;
flex-direction: row;
margin-top: 16px;
padding: 0px 16px;
padding-top: 7px;
/* width: 100%; */
/* height : ${props => props.isKeyboardOpen === true ? 116 + "px" : 146 + "px"}; */
height : 126px;
position: absolute;
left:0;
bottom:0;
background-color: ${C.white};
border-top-color: ${C.lightGray};
border-top-width: 1px;
`;
export const style = {
    FilterContainer: FilterContainer,
    Header: Header,
    HeaderClose: HeaderClose,
    HeaderTitle: HeaderTitle,
    FilterBlock: FilterBlock,
    ContentBlock: ContentBlock,

}
