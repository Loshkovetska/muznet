import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const RangeBlock = styled.View`
margin: 0px 16px;
margin-bottom: 10px;
`;

const RangeBlockSlider = styled.View`
height: 45px;
`;
const RangeBlockBg = styled.View`
width: 100%;
display: flex;
justify-content: center;
align-items: flex-end;
flex-direction: row;
margin-top: 23px;
margin-bottom: -32px;
`;
const OverflowBLock = styled.View`
height: 45px;
width: 0px;
background-color: ${C.white};
z-index: 700;
position: absolute;
top: 0px;
`;
const LeftOverflowBLock = styled(OverflowBLock)`
left: 0px;
`;
const RightOverflowBLock = styled(OverflowBLock)`
right: 0px;

`;
const RangeBlockHeader = styled.View`
display: flex;

justify-content: space-between;
align-items: center;
flex-direction: row;

`;
const RangeBlockHeaderTitle = styled(M.TitleBold15)`

`;
const RangeBlockHeaderText = styled(M.TitleBold15)`

`;
const Thumb = styled.View`
    width:24px;
    height: 24px;
    border-radius: 12px;
    border-width: 2px;
    border-color: ${C.black};
    background-color: #FEFEFE;
`;
const Rail = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: ${C.lightGray};
`;
const RailSelected = styled.View`
    height: 2px;
    border-radius: 2px;
    background-color: ${C.black};
`;
const Label = styled.Text`

`;
const Notch = styled.View`
    width: 8px;
    height: 8px;
    border-left-color: #000000;
    border-right-color: #000000;
    border-top-color: #4499ff;
    border-left-width: 4px;
    border-right-width: 4px;
    border-top-width: 8px;
`;

export const style = {
    RangeBlock: RangeBlock,
    RangeBlockBg: RangeBlockBg,
    RangeBlockHeader: RangeBlockHeader,
    RangeBlockHeaderTitle: RangeBlockHeaderTitle,
    RangeBlockHeaderText: RangeBlockHeaderText,
    LeftOverflowBLock: LeftOverflowBLock,
    RightOverflowBLock: RightOverflowBLock,
    Thumb: Thumb,
    Rail: Rail,
    RailSelected: RailSelected,
    Label: Label,
    Notch: Notch,
    RangeBlockSlider: RangeBlockSlider,
}
