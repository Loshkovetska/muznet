import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

// Search input
const SearchInputContainer = styled.View`
width: 100%;
position: absolute;
left: 0px;
bottom: 0px;
right: 0px;
background-color: ${C.white};
padding: 0px 16px;
padding-top: 16px;
padding-bottom: ${props => props.isKeyboardOpen === true ? 16 + "px" : 40 + "px"};
z-index: 999;
`;
const SearchInputBlock = styled.View`
min-height: 48px;
max-height: 200px;
border-radius: 6px;
overflow: hidden;
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
`;
const SearchInput = styled.TextInput`
width: 100%;
padding-top: 0px;
font-size: 15px;
font-family: ${F.medium};
color: ${C.black};
`;
const AttachIconBlock = styled.TouchableOpacity`
width: 40px;
height: 48px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const SendMessageButton = styled.TouchableOpacity`
width: 40px;
height: 48px;
margin-right: 8px;
z-index: 999;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const SendMessageIconBlock = styled.View`
width: 32px;
height: 32px;
border-radius: 6px;
background-color: ${C.black};
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;

export const style = {
    // Search input
    SearchInputBlock: SearchInputBlock,
    SearchInputContainer: SearchInputContainer,
    SearchInput: SearchInput,
    AttachIconBlock: AttachIconBlock,
    SendMessageButton: SendMessageButton,
    SendMessageIconBlock: SendMessageIconBlock,
}