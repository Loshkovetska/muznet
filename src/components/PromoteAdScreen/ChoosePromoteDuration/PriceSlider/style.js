import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const RangeBlock = styled.View`
margin-bottom: 10px;
`;

const RangeBlockSlider = styled.View`
margin-top: 30px;
height: 70px;
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
const Thumb = styled.TouchableOpacity`
width:32px;
height: 32px;
border-radius: 16px;
border-width: 3px;
border-color: ${C.black};
background-color: #FEFEFE;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const ThumbDot = styled.View`
width:12px;
height: 12px;
border-radius: 6px;
background-color: ${C.black};
`;
const ThumbLabel = styled.View`
position: absolute;
top: -45px;
left: -20px;
right: 0px;
width: 60px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

`;
const ThumbLabelText = styled(M.PlainText14)`

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
border-left-color: black;
border-right-color: black;
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
    ThumbDot: ThumbDot,
    ThumbLabel: ThumbLabel,
    ThumbLabelText: ThumbLabelText,
    Rail: Rail,
    RailSelected: RailSelected,
    Label: Label,
    Notch: Notch,
    RangeBlockSlider: RangeBlockSlider,
}
