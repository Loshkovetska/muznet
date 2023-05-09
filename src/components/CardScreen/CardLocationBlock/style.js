import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const MediaContainer = styled.View`
width: 100%;
`;
const MediaContainerTitle = styled(M.TitleBold20)`
margin-bottom: 16px;
`;
const MediaContainerBlock = styled.TouchableOpacity`
overflow: hidden;
border-radius: 12px;
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
`;
const MediaAddress = styled.View`
padding: 16px;
`;
const MediaAddressText = styled(M.PlainText14)`

`;

const CardBorder = styled.View`
margin: 24px 0px;
height: 1px;
border-radius: 2px;
background-color: ${C.gray};
opacity: 0.2;
`;
export const style = {
    MediaContainer: MediaContainer,
    MediaContainerTitle: MediaContainerTitle,
    MediaContainerBlock: MediaContainerBlock,
    MediaAddress: MediaAddress,
    MediaAddressText: MediaAddressText,
    CardBorder: CardBorder,
}
