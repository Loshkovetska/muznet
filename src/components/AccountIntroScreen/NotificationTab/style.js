import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
background-color: ${C.white};
padding-top: 68px;
overflow: hidden;
`;
const NotificationRow = styled.View`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
margin: 0px 16px;
margin-bottom: 18px;
`;
const NotificationRowText = styled(M.PlainText18)`
margin-right: 50px;
`;


export const style = {
    FilterContainer: FilterContainer,
    NotificationRow: NotificationRow,
    NotificationRowText: NotificationRowText,


}
