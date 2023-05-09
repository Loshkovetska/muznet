import styled from "styled-components/native"
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const Container = styled.View`
  position: absolute;
  top: 60px;
  left: 16px;
  right: 16px;
  z-index: 1000;
`
// Search input
const SearchInputBlock = styled.View`
  width: 100%;
  background-color: ${C.white};
  border-radius: 6px;
  overflow: hidden;
`
// Input
const FormInputBlock = styled.View`
  display: flex;
  flex-direction: column;
`
const FormInputContainer = styled.View`
  position: relative;
  z-index: 10000;
`

const GoBackButton = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 36px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 1010;
`
const SearchRemoveIconBlock = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  width: 40px;
  height: 40px;
  z-index: 1010;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const SearchRemoveIcon = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: ${C.black};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const DropContainer = styled.View`
  border-radius: 6px;
  background-color: #ffffff;
  position: absolute;
  top: 40px;
  border: 1px solid ${C.black};
  border-top-width: 0px;
  left: 0px;
  z-index: 999;
  border-radius: 6px;
`
const ChosenBlock = styled.View`
  width: 100%;
  /* padding-top: 8px; */
  padding-bottom: 8px;
  overflow: hidden;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border-top-color: ${C.lightGray};
  border-top-width: 1px;
`
const Item = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  z-index: 1100;
`
const ItemText = styled(M.PlainText15)`
  width: 100%;
`
const FormInput = styled.TextInput`
  width: 100%;
  height: 40px;
  background-color: #f8f8f8;
  border-radius: 6px;
  padding-left: 40px;
  padding-right: 42px;
  font-size: 17px;
  font-family: ${F.medium};
  color: ${C.black};
`

const OpacityBg = styled.Pressable`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: ${C.black};
  z-index: 990;
  opacity: 0.5;
`
export const style = {
  // Search input
  OpacityBg: OpacityBg,
  SearchInputBlock: SearchInputBlock,
  GoBackButton: GoBackButton,
  SearchRemoveIcon: SearchRemoveIcon,
  SearchRemoveIconBlock: SearchRemoveIconBlock,
  Container: Container,
  ChosenBlock: ChosenBlock,
  DropContainer: DropContainer,
  Item: Item,
  ItemText: ItemText,
  FormInputBlock: FormInputBlock,
  FormInputContainer: FormInputContainer,
  FormInput: FormInput,
}
