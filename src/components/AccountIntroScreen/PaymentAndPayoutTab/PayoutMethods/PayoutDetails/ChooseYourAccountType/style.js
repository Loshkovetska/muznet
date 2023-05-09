import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
background-color: ${C.white};
padding-top: 68px;
position: absolute;
top: 0px;
left: 0px;
bottom: 0px;
right: 0px;
z-index: 1000;

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
const CountriesList = styled.ScrollView`
padding: 0px 6px;
`;
const SelectItem = styled.TouchableOpacity`
width: 100%;
height: 56px;
border-radius: 12px;
border-bottom-color: ${C.lightGray};
border-bottom-width: 1px;
display: flex;
align-items: center;
flex-direction: row;
`; const CheckBox = styled.View`
width: 20px;
height: 20px;
border-radius: 10px;
border-color: ${props => props.isActive === true ? "transparent" : C.lightGray};
border-width: 1px;
border-style: solid;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
position: absolute;
top: 19px;
right: 21px;
`;
const SelectText = styled(M.MediumText17)`
margin-left: 12px;
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
    CountriesList: CountriesList,
    SelectItem: SelectItem,
    SelectText: SelectText,
    CheckBox: CheckBox,
    ContentBlock: ContentBlock,

}
