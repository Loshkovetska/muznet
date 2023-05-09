import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
width: 100%;
background-color: ${C.white};
padding-top: 18px;
overflow: hidden;
/* z-index: 1000; */
`;
const Header = styled.View`
width: 100%;
/* height: 150px; */
display: flex;
flex-direction: column;
justify-content: flex-end;
padding: 0px 16px;
padding-bottom: 32px;
background-color: ${C.white};
`;
const HeaderWhiteBlock = styled.View`
width: 100%;
height: 44px;
background-color: ${C.white};
`;
const HeaderRow = styled.View`
width: 100%;
/* height: 32px; */
background-color: ${C.white};
display: flex;
flex-direction: row;
`;
const HeaderClose = styled.TouchableOpacity`
display: flex;
align-items: center;
flex-direction: row;
width: 30px;
height: 30px;
background-color: ${C.opacity20white};
border-radius: 6px;
position: absolute;
top: 4px;
left:5px;
`;
const HeaderUser = styled.View`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
padding: 0px 40px;
`;
const HeaderUserImgBlock = styled.View`
border-radius: 6px;
margin-top: 15px;
margin-bottom: 16px;
width: 72px;
height: 72px;
overflow: hidden;
border-color: ${C.opacity20white};
border-width: 1px;
`;
const HeaderUserImg = styled.Image`
width: 100%;
height: 100%;
`;
const HeaderUserName = styled(M.Title24)`
`;
const HeaderUserLastLogin = styled(M.MediumText15)`
color: ${C.cyanGray};
padding-top: 5px;

`;
const HeaderOptions = styled.TouchableOpacity`
width: 24px;
height: 27px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
position: absolute;
top: 4px;
right:5px;
`;
const HeaderOptionsDots = styled.View`
width: 4px;
height: 4px;
background-color: ${C.black};
border-radius: 2px;
margin-top: 3px;
`;
const SharedTitle = styled(M.TitleBold20)`
margin-bottom: 16px;
`;
const SharedContainer = styled.View`
margin: 0px 16px;
`;
const SharedScrollView = styled.ScrollView`

`;
const SharedBlock = styled.View`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
flex-wrap: wrap;
`;
const SharedImageBlock = styled.TouchableOpacity`
margin-bottom: 7px;
border-radius: 6px;
overflow: hidden;
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
`;
const SharedImage = styled.Image`
width: 100%;
height: 100%;
`;
export const style = {
    FilterContainer: FilterContainer,
    Header: Header,
    HeaderRow: HeaderRow,
    HeaderWhiteBlock: HeaderWhiteBlock,
    HeaderClose: HeaderClose,
    HeaderUserName: HeaderUserName,
    HeaderUserLastLogin: HeaderUserLastLogin,
    HeaderUser: HeaderUser,
    HeaderUserImgBlock: HeaderUserImgBlock,
    HeaderUserImg: HeaderUserImg,
    HeaderOptions: HeaderOptions,
    HeaderOptionsDots: HeaderOptionsDots,

    SharedTitle: SharedTitle,
    SharedBlock: SharedBlock,
    SharedContainer: SharedContainer,
    SharedScrollView: SharedScrollView,
    SharedImageBlock: SharedImageBlock,
    SharedImage: SharedImage,
}