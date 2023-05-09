import styled from "styled-components/native"
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: ; */
  background-color: #ffffff;
`
const SelectItem = styled.TouchableOpacity`
  width: 100%;
  height: 80px;
  margin-bottom: 8px;
  border-radius: 12px;
  border-color: ${(props) => (props.isActive === true ? C.black : C.lightGray)};
  border-width: ${(props) => (props.isActive === true ? 2 + "px" : 1 + "px")};
  padding-left: ${(props) => (props.isActive === true ? 19 + "px" : 20 + "px")};
  border-style: solid;
  display: flex;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const SelectText = styled(M.MediumText17)`
  margin-left: 12px;
`

export const style = {
  Container: Container,
  SelectItem: SelectItem,
  CheckBox: CheckBox,
  SelectText: SelectText,
}
