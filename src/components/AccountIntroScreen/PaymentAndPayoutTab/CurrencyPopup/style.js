import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"


const AttachContainerText = styled(M.TitleBold18)`
text-align: center;
`;
const OpacityBg = styled.Pressable`
 position: absolute;
 left: 0px;
 bottom: 0px;
 right: 0px;
background-color: ${C.black};
opacity: 0.5;
`;
const PopupHeader = styled.View`
width: 100%;
display: flex;
align-items: center;
flex-direction: row;
justify-content: space-between;
padding: 16px 16px;
`;

const CloseButton = styled.TouchableOpacity`
width: 24px;
height: 24px;
/* padding-right: 16px; */
padding-top: 5px;
padding-bottom: 5px;
padding-top: 16px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
// Link list
const AccountLinkList = styled.ScrollView`
padding: 0px 16px;
width: 100%;
`;
const AccountLink = styled.TouchableOpacity`
width: 100%;
height: 48px;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
/* padding: 13px 0px; */
border-bottom-color: ${C.lightGray};
border-bottom-width: 1px;
`;
const AccountLinkText = styled(M.PlainText17)`
margin-left: 4px;
`;
const AccountLinkIcon = styled.View`
width: 24px;
height: 24px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
export const style = {
    PopupHeader: PopupHeader,
    CloseButton: CloseButton,
    OpacityBg: OpacityBg,
    AccountLinkList: AccountLinkList,
    AccountLink: AccountLink,
    AccountLinkText: AccountLinkText,
    AccountLinkIcon: AccountLinkIcon,
    AttachContainerText: AttachContainerText,
}
