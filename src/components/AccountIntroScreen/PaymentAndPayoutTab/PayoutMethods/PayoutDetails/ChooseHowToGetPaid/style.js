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
padding: 0px 16px;
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
const SavedPaymentText = styled(M.TitleBold17)`
align-self: flex-start;
margin-bottom: 8px;
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

flex-direction: column;
padding: 17px 0px;
border-bottom-color: ${C.lightGray};
border-bottom-width: 1px;
`;
const AccountLinkText = styled(M.PlainText17)`
margin-right: 70px;
`;
const AccountLinkSubText = styled(M.MediumText15)`
color: ${C.cyanGray};
margin-top: 8px;
`;
const AccountLinkIcon = styled.View`
transform: rotate(180deg);
width: 24px;
height: 24px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
position: absolute;
top: 16px;
right: 6px;
`;
export const style = {
    FilterContainer: FilterContainer,
    Header: Header,
    HeaderClose: HeaderClose,
    HeaderTitle: HeaderTitle,
    SavedPaymentText: SavedPaymentText,
    AccountLinkList: AccountLinkList,
    AccountLink: AccountLink,
    AccountLinkText: AccountLinkText,
    AccountLinkSubText: AccountLinkSubText,
    AccountLinkIcon: AccountLinkIcon,
}
