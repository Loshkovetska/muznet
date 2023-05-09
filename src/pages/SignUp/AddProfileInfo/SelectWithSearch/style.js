
import styled from "styled-components/native";
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const Container = styled.ScrollView`
width: 100%;

background-color: ${C.white};
`;
const SearchInputBlock = styled.View`
width: 100%;
margin-bottom: 8px;
`;
const SearchIconBlock = styled.View`
position: absolute;
top: 11px;
left: 10px;
width: 14px;
height: 14px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
z-index: 999;
`;
const SearchRemoveIconBlock = styled.TouchableOpacity`
position: absolute;
top: 0px;
bottom: 0px;
right: 5px;
width: 36px;
height: 36px;
z-index: 999;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;

`;
const SearchInput = styled.TextInput`
width: 100%;
height: 36px;
background-color: ${C.backGray};
border-radius: 6px;
padding-left: 32px;
font-size: 15px;
font-family: ${F.medium};
color: ${C.black};
`;
const ChoosenScrollView = styled.ScrollView`
width: 100%;
`;
const ChosenBlock = styled.View`
width: 100%;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
flex-direction: row;
margin-top: ${props => props.isChosen === true ? 8 + "px" : 16 + "px"};
`;
const ChosenBlockBorderBottom = styled.View`
width: 100%;
height: 1px;
background-color: ${C.lightGray};
position: absolute;
left: 0px;
bottom: 0px;
right: 0px;
`;

const ChosenItem = styled.View`
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
padding-left: 16px;
padding-right: 5px;
height: 32px;
margin-bottom: 11px;
margin-left:5px;
margin-right:5px;
border-radius: 6px;
`;
const Item = styled.TouchableOpacity`
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
padding-left: 16px;
padding-right: 16px;
height: 32px;
margin-bottom: 11px;
margin-left:5px;
margin-right:5px;
border-radius: 6px;
`;
const ItemText = styled(M.MediumText13)`
margin-right: ${props => props.isChosen === true ? 8 + "px" : 0 + "px"};

`;
const RemoveChosenItem = styled.TouchableOpacity`
width: 24px;
height: 24px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;


export const style = {
    Container: Container,
    SearchInputBlock: SearchInputBlock,
    SearchInput: SearchInput,
    SearchIconBlock: SearchIconBlock,
    SearchRemoveIconBlock: SearchRemoveIconBlock,
    ChoosenScrollView: ChoosenScrollView,
    ChosenBlock: ChosenBlock,
    ChosenBlockBorderBottom: ChosenBlockBorderBottom,
    Item: Item,
    ChosenItem: ChosenItem,
    ItemText: ItemText,
    RemoveChosenItem: RemoveChosenItem,
}