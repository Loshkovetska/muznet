import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const ItemContainer = styled.TouchableOpacity`
width: 100%;
border-radius: 6px;
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
padding: 8px;
display: flex;
flex-direction: column;
background-color: ${C.white};
`;
const ItemRow = styled.View`
width: 100%;
display: flex;
flex-direction: row;
margin-bottom: 8px;
`;
const ItemImageBlock = styled.View`
border-radius: 6px;
width: 105px;
height: 105px;
overflow: hidden;
`;
const ItemImage = styled.Image`
width: 100%;
height: 100%;
`;
const ItemInfo = styled.View`
margin-left: 12px;
display: flex;
flex-direction: column;
justify-content : ${props => props.isInfoBiggerThanImage === true ? "flex-start" : "space-between"};
min-height: 100px;
width : ${props => props.isForMap === true ? 61 + "%" : 65 + "%"};
`;
const ItemInfoLocation = styled.View`
display: flex;
flex-direction: row;
align-items: center;
padding-right: 75px;
`;
const ItemInfoLocationText = styled(M.PlainText14)`
margin-left: 5px;
color: ${C.sBlack};
`;
const ItemInfoName = styled(M.TitleBold17)`
padding-top: 4px;
padding-bottom: 7px;
`;
const ItemInfoGenres = styled.View`
display: flex;
align-items: center;
flex-direction: row;
width: 100%;
flex-wrap: wrap;
max-height: 33px;
overflow: hidden;
`;
const ItemInfoGenre = styled.View`
padding: 0px 8px;
padding-bottom: 3px;
border-color: ${C.black};
border-width: 1px;
border-style: solid;
border-radius: 20px;
margin-right: 8px;
margin-bottom: 6px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const ItemInfoGenreText = styled.Text`

`;
const ItemInfoCost = styled.View`
display: flex;
align-items: flex-end;
flex-direction: row;
`;
const ItemInfoCostValue = styled(M.TitleBold18)`
margin-right: 5px;
`;
const ItemInfoCostValuePostfix = styled(M.PlainText14)`
margin-bottom: 2px;
`;
const ItemInfoDescription = styled(M.MediumText15)`
margin-top: -4px;
margin-bottom: 4px;
color: ${C.cyanGray};
`;
const ButtonsRow = styled.View`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
`;
const AddPayment = styled.TouchableOpacity`
width: 48.5%;
height: 48px;
border-radius: 8px;
padding: 0px 20px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;
border-color: ${C.lightGray};
border-width: 1px;
border-style: solid;
`;
const AddPaymentRowText = styled(M.MediumText15)`
margin-left: 12px;
`;
export const style = {
    ItemContainer: ItemContainer,
    ItemRow: ItemRow,
    ItemImageBlock: ItemImageBlock,
    ItemImage: ItemImage,
    // Info
    ItemInfo: ItemInfo,
    ItemInfoLocation: ItemInfoLocation,
    ItemInfoLocationText: ItemInfoLocationText,
    ItemInfoName: ItemInfoName,
    ItemInfoGenres: ItemInfoGenres,
    ItemInfoGenre: ItemInfoGenre,
    ItemInfoGenreText: ItemInfoGenreText,
    ItemInfoCost: ItemInfoCost,
    ItemInfoCostValue: ItemInfoCostValue,
    ItemInfoCostValuePostfix: ItemInfoCostValuePostfix,
    ItemInfoDescription: ItemInfoDescription,
    ButtonsRow: ButtonsRow,
    AddPayment: AddPayment,
    AddPaymentRowText: AddPaymentRowText,

}