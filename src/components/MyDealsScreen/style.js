import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
width: 100%;
background-color: ${C.white};
overflow: hidden;
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
padding-right: 15px;
position: absolute;
top: 0px;
left: 16px;
bottom: 0px;
`;
const HeaderTitle = styled(M.Title24)`
line-height: 30px;
`;
const AdsListContainer = styled.ScrollView`
width: 100%;
padding-top: 68px;

`;
const SwitchBlock = styled.View`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
padding: 0px 16px;
margin-bottom: 24px;
`;
const SwitchBlockBtn = styled.TouchableOpacity`
width: 50%;
height:37px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
border-bottom-color: ${props => props.isActive === true ? C.black : C.lightGray};
border-bottom-width: 2px;
`;
const SwitchBlockBtnText = styled(M.PlainText17)`
font-family: ${props => props.isActive === true ? F.bold : F.regular};
`;

const DealBlock = styled.TouchableOpacity`
display: flex;
flex-direction: column;
margin: 0px 16px;
margin-bottom: 16px;
border-color: ${C.lightGray};
border-width: 1px;
border-radius: 12px;
padding: 12px;
`;
const DealBlockItem = styled.View`
display: flex;
flex-direction: row;
align-items: center;
margin-top: 8px;
`;
const DealStatusLabel = styled(M.TitleBold17)`
position: absolute;
top: 12px;
right: 12px;
color : ${props => props.isActive === true ? "#27AE60" : C.sBlack};
`;


export const style = {
    FilterContainer: FilterContainer,
    AdsListContainer: AdsListContainer,
    SwitchBlock: SwitchBlock,
    SwitchBlockBtn: SwitchBlockBtn,
    SwitchBlockBtnText: SwitchBlockBtnText,
    Header: Header,
    HeaderClose: HeaderClose,
    HeaderTitle: HeaderTitle,
    DealBlock: DealBlock,
    DealStatusLabel: DealStatusLabel,
    DealBlockItem: DealBlockItem,
}