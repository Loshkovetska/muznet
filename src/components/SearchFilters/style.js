import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"


const FilterContainer = styled.View`
width: 100%;
background-color: ${C.white};
/* margin-top: 5%; */
border-top-left-radius: 16px;
border-top-right-radius: 16px;
overflow: hidden;
`;

const Header = styled.View`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
margin-top: 24px;
padding-bottom: 12px;
border-bottom-color: ${C.lightGray};
border-bottom-width: 1px;
`;
const HeaderClose = styled.TouchableOpacity`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
width: 32px;
height: 32px;
position: absolute;
top: -3px;
right:   16px;
bottom: 0px;
`;
const HeaderTitle = styled(M.MediumText20)`
line-height: 30px;
`;
const FilterBlock = styled.ScrollView`
width: 100%;
height: 100%;
padding-bottom: 125px;
`;
const CheckboxBlock = styled.View`
width: 100%;
display: flex;
flex-direction: column;
margin-top:${props => props.isWilling === true ? 7 + "px" : 14 + "px"};
margin-bottom:${props => props.isWilling === true ? -8 + "px" : 146 + "px"};
margin-left: 16px;
`;
const CheckboxBlockTitle = styled(M.TitleBold15)`
margin-bottom: 24px;
`;
const ContentBlock = styled.View`
display: flex;
align-items: flex-start;
justify-content: space-between;
flex-direction: row;
margin-top: 16px;
margin-top: 16px;
padding: 0px 10px;
padding-top: 7px;
width: 100%;
/* height : ${props => props.isKeyboardOpen === true ? 116 + "px" : 146 + "px"}; */
height : 146px;
position: absolute;
left:0;
bottom:0;
background-color: ${C.white};
border-color: ${C.lightGray};
border-width: 1px;
`;
const ContentBlockRow = styled.View`
display: flex;
flex-direction: row;
width: 100%;
`;

const ButtonSubmit = styled(M.BlackBtn)`
width: 60%;
`;

const ButtonSubmitText = styled(M.BlackBtnText)`

`;
const ContainerLink = styled.TouchableOpacity`
width: 40%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
margin-left: -10px;
`;
const ContainerLinkText = styled(M.PlainText17)`

`;
export const style = {
    FilterContainer: FilterContainer,
    Header: Header,
    HeaderClose: HeaderClose,
    HeaderTitle: HeaderTitle,
    FilterBlock: FilterBlock,
    CheckboxBlock: CheckboxBlock,
    CheckboxBlockTitle: CheckboxBlockTitle,
    ContentBlock: ContentBlock,
    ContentBlockRow: ContentBlockRow,
    ContainerLink: ContainerLink,
    ContainerLinkText: ContainerLinkText,
    ButtonSubmit: ButtonSubmit,
    ButtonSubmitText: ButtonSubmitText,
}
