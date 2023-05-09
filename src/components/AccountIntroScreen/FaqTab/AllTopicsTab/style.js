import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.ScrollView`
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
padding: 0px 30px;
padding-bottom: 31px;
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
text-align: center;
`;
const PopularArticleBlock = styled.View`
padding: 0px 16px;

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
padding-right: 50px;
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
export const style = {
    FilterContainer: FilterContainer,
    Header: Header,
    HeaderClose: HeaderClose,
    HeaderTitle: HeaderTitle,
    PopularArticleBlock: PopularArticleBlock,
    AccountLink: AccountLink,
    AccountLinkText: AccountLinkText,
    AccountLinkIcon: AccountLinkIcon,
}
