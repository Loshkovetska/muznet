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
const FilterBlock = styled.ScrollView`
width: 100%;
height: 94%;
padding: 0px 16px;
`;
const PreviewBlock = styled.View`
width: 100%;
padding: 16px;
display: flex;
flex-direction: column;
background-color: ${C.backGray};
border-radius: 12px;
margin-bottom: 32px;
`;
const PreviewBlockRow = styled.View`
display: flex;
flex-direction: row;
`;
const PreviewBlockPrice = styled(M.Title24)`
margin-bottom: 8px;
`;
const PreviewBlockViewPerDay = styled(M.PlainText14)`
color: ${C.cyanGray};
`;
const ContentBlock = styled.View`
display: flex;
flex-direction:column;
align-items: flex-start;
justify-content: center;

margin-top: 16px;
padding: 0px 16px;
padding-top: 7px;
//height : 126px;
position: absolute;
padding-bottom:16px;
left:0;
bottom:0;
background-color: ${C.white};
`;
export const style = {
    FilterContainer: FilterContainer,
    Header: Header,
    HeaderClose: HeaderClose,
    HeaderTitle: HeaderTitle,
    FilterBlock: FilterBlock,
    PreviewBlock: PreviewBlock,
    PreviewBlockRow: PreviewBlockRow,
    PreviewBlockPrice: PreviewBlockPrice,
    PreviewBlockViewPerDay: PreviewBlockViewPerDay,
    ContentBlock: ContentBlock,
}
