import styled from "styled-components/native"
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
`
const SelectItem = styled.TouchableOpacity`
  width: 47%;
  border-radius: 12px;
  border-color: ${(props) => (props.isActive === true ? C.black : C.lightGray)};
  border-width: ${(props) => (props.isActive === true ? 2 + "px" : 1 + "px")};
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const CheckBox = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-color: ${(props) =>
    props.isActive === true ? "transparent" : C.lightGray};
  border-width: 1px;
  border-style: solid;
  position: absolute;
  top: 10px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const ImageBlock = styled.View``
const SelectTextBlock = styled.View`
  position: absolute;
  left: 0px;
  bottom: 16px;
  right: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const SelectText = styled(M.MediumText17)``

export const style = {
  Container: Container,
  SelectItem: SelectItem,
  CheckBox: CheckBox,
  ImageBlock: ImageBlock,
  SelectTextBlock: SelectTextBlock,
  SelectText: SelectText,
}
