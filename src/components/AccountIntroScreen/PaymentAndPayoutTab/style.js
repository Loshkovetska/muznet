import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
width: 100%;
background-color: ${C.white};
padding-top: 68px;
overflow: hidden;
`;

// Link list
const AccountLinkList = styled.View`
margin-bottom: 26px;
padding: 0px 16px;
width: 100%;
`;
const AccountLink = styled.TouchableOpacity`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
padding: 17px 0px;
border-bottom-color: ${C.lightGray};
border-bottom-width: 1px;
`;
const AccountLinkText = styled(M.PlainText17)`
margin-left: 4px;
`;
const AccountLinkIcon = styled.View`
transform: rotate(180deg);
width: 24px;
height: 24px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const AccountLinkCurrencyValue = styled(M.PlainText17)`
margin-right: 4px;
color: ${C.cyanGray};
`;

export const style = {
    FilterContainer: FilterContainer,
    AccountLinkList: AccountLinkList,
    AccountLink: AccountLink,
    AccountLinkText: AccountLinkText,
    AccountLinkIcon: AccountLinkIcon,
    AccountLinkCurrencyValue: AccountLinkCurrencyValue,
}
