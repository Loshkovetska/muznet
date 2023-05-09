import styled from "styled-components/native"
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  margin-top: 12px;
`
const SavedPaymentText = styled(M.TitleBold17)`
  align-self: flex-start;
  margin-bottom: 8px;
`
const SelectItem = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
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
const BankCardIcon = styled.View`
  width: 24px;
  height: 16px;
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
  position: absolute;
  top: 19px;
  right: 16px;
`
const SelectText = styled(M.MediumText17)``
const AddPayment = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  margin-bottom: 16px;
  border-radius: 12px;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  flex-direction: row;
`
const AddPaymentBg = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
`
const AddPaymentBgImage = styled.Image`
  width: 100%;
  height: 100%;
`
const AddPaymentRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const AddPaymentRowText = styled(M.MediumText15)`
  margin-left: 12px;
`

export const style = {
  Container: Container,
  SavedPaymentText: SavedPaymentText,
  SelectItem: SelectItem,
  CheckBox: CheckBox,
  BankCardIcon: BankCardIcon,
  SelectText: SelectText,
  AddPayment: AddPayment,
  AddPaymentBg: AddPaymentBg,
  AddPaymentBgImage: AddPaymentBgImage,
  AddPaymentRow: AddPaymentRow,
  AddPaymentRowText: AddPaymentRowText,
}
