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
padding: 0px 16px;
`;
const SelectItem = styled.TouchableOpacity`
width: 100%;
border-radius: 12px;
border-color: ${props => props.isActive === true ? C.black : C.lightGray};
border-width: ${props => props.isActive === true ? 2 + "px" : 1 + "px"};
display: flex;
flex-direction: row;
padding:  18px;
margin-bottom: 8px;
`;
const SelectItemCol = styled.View`
display: flex;
flex-direction: column;
padding-right: 40px;
`;
const CheckBox = styled.View`
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
margin-right: 12px;
`;
const SelectText = styled(M.TitleBold17)`
margin-bottom: 17px;
`;
const PremiumLabel = styled.View`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
padding: 5px 8px;
background-color: ${C.black};
position: absolute;
top: 16px;
right: 16px;
border-radius: 4px;
`;
const PremiumLabelText = styled(M.TitleBold15)`
font-size: 12px;
color: ${C.white};
`;
const SelectItemColPrice = styled.Text`
display: flex;
flex-direction: row;
align-items: flex-end;
margin-top: 8px;
`;
const ContentBlock = styled.View`
display: flex;
align-items: flex-start;
justify-content: center;
flex-direction: row;
margin-top: 16px;
padding: 0px 16px;
padding-top: 7px;
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
    PremiumLabel: PremiumLabel,
    PremiumLabelText: PremiumLabelText,
    SelectItemCol: SelectItemCol,
    SelectText: SelectText,
    SelectItemColPrice: SelectItemColPrice,
    CheckBox: CheckBox,
    ContentBlock: ContentBlock,

}
