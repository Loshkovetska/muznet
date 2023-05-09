import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

// Search input
const SearchInputBlock = styled.View`
width: 100%;

`;
const SearchIconBlock = styled.View`
position: absolute;
top: 13px;
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
right: 0px;
width: 40px;
height: 40px;
z-index: 999;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const SearchRemoveIcon = styled.View`
width: 28px;
height: 28px;
border-radius: 6px;
background-color: ${C.black};
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const SearchInput = styled.TextInput`
width: 100%;
height: 40px;
background-color: ${C.backGray};
border-radius: 6px;
padding-left: 32px;
padding-right: 42px;
font-size: 15px;
font-family: ${F.medium};
color: ${C.black};

`;


export const style = {
    // Search input
    SearchInputBlock: SearchInputBlock,
    SearchInput: SearchInput,
    SearchIconBlock: SearchIconBlock,
    SearchRemoveIcon: SearchRemoveIcon,
    SearchRemoveIconBlock: SearchRemoveIconBlock,
}