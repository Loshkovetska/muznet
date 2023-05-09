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
// Link list
const AccountLinkList = styled.View`
margin-bottom: 26px;
padding: 0px 16px;
width: 100%;
`;
const PreviewBlock = styled.View`
width: 100%;
height: 104px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: ${C.backGray};
border-radius: 12px;
margin-bottom: 32px;
`;
const PreviewBlockPrice = styled(M.Title24)`
margin-bottom: 8px;
`;
const PreviewBlockViewPerDay = styled(M.PlainText14)`
color: ${C.cyanGray};
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
    AccountLinkList: AccountLinkList,
    PreviewBlock: PreviewBlock,
    PreviewBlockPrice: PreviewBlockPrice,
    PreviewBlockViewPerDay: PreviewBlockViewPerDay,
    ContentBlock: ContentBlock,

}
