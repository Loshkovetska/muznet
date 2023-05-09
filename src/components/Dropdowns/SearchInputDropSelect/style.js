import styled from "styled-components/native"
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const Container = styled.View`
display: flex;
flex-direction: column;
align-items: center;
/* background-color: ${C.white}; */
margin: 0px 16px;
margin-bottom: 24px;
position:relative;
`
const SearchInputBlock = styled.View`
  width: 100%;
  margin-bottom: 0px;
`
const SearchIconBlock = styled.View`
  position: absolute;
  top: 15px;
  left: 19px;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 100;
  opacity: 0.7;
`
const SearchRemoveIconBlock = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 5px;
  width: 36px;
  height: 36px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const SearchInput = styled(M.FormInput)`
  padding-left: 48px;
`
const ChoosenScrollView = styled.View`
  width: 100%;
  position: absolute;
  top: 48px;
  left: 0px;
  right: 0px;
  z-index: 1111;
  background-color: ${C.white}; //
  border-radius: 6px;
  border-width: 1px;
  border-color: ${C.lightGray};
  border-top-width: 0;
  //   border-top-left-radius: 0px;
  //   border-top-right-radius: 0px;
`
const ChosenBlock = styled.View`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: ${(props) =>
    props.isSearchResult === true ? 7 + "px" : 13 + "px"};
  margin-bottom: ${(props) =>
    props.isSearchResult === true ? 10 + "px" : 0 + "px"};
  padding: 0px 11px;
`
const ChosenBlockBorderBottom = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${C.lightGray};
  position: absolute;
  left: 0px;
  bottom: 0px;
  right: 0px;
`

const ChosenItem = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-left: 16px;
  padding-right: 10px;
  height: 32px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 100px;
  background-color: ${C.black};
`
const Item = styled.TouchableOpacity`
  border-color: ${C.lightGray};
  border-width: 1px;
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-left: 16px;
  padding-right: 16px;
  height: 32px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 6px;
`
const ItemText = styled(M.MediumText13)`
  margin-right: ${(props) => (props.isChosen === true ? 8 + "px" : 0 + "px")};
  color: ${(props) => (props.isChosen === true ? C.white : C.black)};
`
const RemoveChosenItem = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: #3c3c3e;
`

export const style = {
  Container: Container,
  SearchInputBlock: SearchInputBlock,
  SearchInput: SearchInput,
  SearchIconBlock: SearchIconBlock,
  SearchRemoveIconBlock: SearchRemoveIconBlock,
  ChoosenScrollView: ChoosenScrollView,
  ChosenBlock: ChosenBlock,
  ChosenBlockBorderBottom: ChosenBlockBorderBottom,
  Item: Item,
  ChosenItem: ChosenItem,
  ItemText: ItemText,
  RemoveChosenItem: RemoveChosenItem,
}
