import styled from "styled-components/native"

import C from "@/res/colors"
import F from "@/res/fonts"

const MainContainer = styled.ScrollView`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 0px 20px;
`
// Buttons
const BlackBtn = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  background-color: ${C.black};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const DisableBtn = styled.View`
  width: 100%;
  height: 56px;
  background-color: ${C.gray};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const BlackBtnText = styled.Text`
  font-size: 16px;
  font-family: ${F.medium};
  color: ${C.white};
  line-height: 22px;
`
const BlackBtnTextDisable = styled.Text`
  font-size: 17px;
  font-family: ${F.medium};
  color: #5c6574;
  line-height: 22px;
`
const BorderBtn = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  background-color: ${C.white};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border: 1px solid ${C.black};
`
const BorderBtnText = styled.Text`
  font-size: 17px;
  font-family: ${F.medium};
  color: ${C.black};
  line-height: 22px;
`
const TextBtn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  flex-direction: row;
`
const TextBtnText = styled.Text`
  font-size: 20px;
  font-family: ${F.medium};
  color: ${C.black};
  line-height: 25px;
`
// Text
const Title28 = styled.Text`
  font-size: 28px;
  font-family: ${F.extraBlack};
  color: ${C.black};
  line-height: 35px;
`
const Title24 = styled.Text`
  font-size: 24px;
  font-family: ${F.bold};
  color: ${C.black};
  line-height: 30px;
`
const Title20 = styled.Text`
  font-size: 20px;
  font-family: ${F.bold};
  color: ${C.black};
  line-height: 25px;
`
const TitleBold20 = styled.Text`
  font-size: 20px;
  font-family: ${F.bold};
  color: ${C.black};
  line-height: 25px;
`
const TitleBold18 = styled.Text`
  font-size: 18px;
  font-family: ${F.bold};
  color: ${C.black};
  line-height: 23px;
`
const TitleBold17 = styled.Text`
  font-size: 17px;
  font-family: ${F.bold};
  color: ${C.black};
  line-height: 21px;
`
const TitleBold16 = styled.Text`
  font-size: 16px;
  font-family: ${F.bold};
  color: ${C.black};
  line-height: 20px;
`
const TitleBold15 = styled.Text`
  font-size: 15px;
  font-family: ${F.bold};
  color: ${C.black};
  line-height: 19px;
`
const TitleBold10 = styled.Text`
  font-size: 10px;
  font-family: ${F.bold};
  color: ${C.black};
  line-height: 13px;
`
const PlainText20 = styled.Text`
  font-size: 20px;
  font-family: ${F.regular};
  color: ${C.black};
  line-height: 25px;
`
const PlainText18 = styled.Text`
  font-size: 18px;
  font-family: ${F.regular};
  color: ${C.black};
  line-height: 23px;
`
const PlainText17 = styled.Text`
  font-size: 17px;
  font-family: ${F.regular};
  color: ${C.black};
  line-height: 22px;
`
const PlainText15 = styled.Text`
  font-size: 15px;
  font-family: ${F.regular};
  color: ${C.black};
  line-height: 19px;
`
const PlainText14 = styled.Text`
  font-size: 14px;
  font-family: ${F.regular};
  color: ${C.black};
  line-height: 18px;
`
const PlainText13 = styled.Text`
  font-size: 13px;
  font-family: ${F.regular};
  color: ${C.black};
  line-height: 16px;
`
const PlainText12 = styled.Text`
  font-size: 12px;
  font-family: ${F.regular};
  color: ${C.black};
  line-height: 15px;
`
const MediumText20 = styled.Text`
  font-size: 20px;
  font-family: ${F.medium};
  color: ${C.black};
  line-height: 25px;
`
const MediumText17 = styled.Text`
  font-size: 17px;
  font-family: ${F.medium};
  color: ${C.black};
  line-height: 23px;
`
const MediumText16 = styled.Text`
  font-size: 16px;
  font-family: ${F.medium};
  color: ${C.black};
  line-height: 22px;
`
const MediumText15 = styled.Text`
  font-size: 15px;
  font-family: ${F.medium};
  color: ${C.black};
  line-height: 19px;
`
const MediumText14 = styled.Text`
  font-size: 14px;
  font-family: ${F.medium};
  color: ${C.black};
  line-height: 18px;
`
const MediumText13 = styled.Text`
  font-size: 13px;
  font-family: ${F.medium};
  color: ${C.black};
  line-height: 16px;
`
const MediumText12 = styled.Text`
  font-size: 12px;
  font-family: ${F.medium};
  color: ${C.black};
  line-height: 16px;
`
const ErrorMessage = styled.Text`
  color: ${C.red};
  font-family: ${F.regular};
  font-size: 13.5px;
  position: absolute;
  top: 53px;
  left: 0px;
`
// Input
const FormInputBlock = styled.View`
  display: flex;
  flex-direction: column;
  margin-bottom: 13px;
  width: 100%;
`
const FormInputContainer = styled.View``
const FormInputContainerPhone = styled.View`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  flex-direction: row;
`
const FormInput = styled.TextInput`
  width: 100%;
  font-family: ${F.regular};
  color: ${C.black};
  z-index: 0;
  border-style: solid;
  border-radius: 6px;
  height: 48px;
  font-size: 17px;
  padding-left: 16px;
  padding-top: ${(props) => (props.inputLabel === true ? 17 + "px" : 0 + "px")};
  padding-right: ${(props) =>
    props.isPassword === true ? 50 + "px" : 16 + "px"};
`
const FormInputLabel = styled.Text`
  font-family: ${F.regular};
  margin-bottom: 5px;
  color: ${(props) => (props.isError ? C.red : C.sBlack)};
  font-size: 12px;
  position: absolute;
  top: 5px;
  left: 16px;
  opacity: ${(props) => (props.inputLabel === true ? 1 : 0)};
`
const ShowPasswordIconButton = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 55px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
export const M = {
  MainContainer: MainContainer,
  // Buttons
  BlackBtn: BlackBtn,
  DisableBtn: DisableBtn,
  BlackBtnText: BlackBtnText,
  BlackBtnTextDisable: BlackBtnTextDisable,

  BorderBtn: BorderBtn,
  BorderBtnText: BorderBtnText,
  TextBtn: TextBtn,
  TextBtnText: TextBtnText,
  // Text
  Title28: Title28,
  Title24: Title24,
  Title20: Title20,
  TitleBold20: TitleBold20,
  TitleBold18: TitleBold18,
  TitleBold17: TitleBold17,
  TitleBold16: TitleBold16,
  TitleBold15: TitleBold15,
  TitleBold10: TitleBold10,
  PlainText20: PlainText20,
  PlainText18: PlainText18,
  PlainText17: PlainText17,
  PlainText15: PlainText15,
  PlainText14: PlainText14,
  PlainText13: PlainText13,
  PlainText12: PlainText12,
  MediumText20: MediumText20,
  MediumText17: MediumText17,
  MediumText16: MediumText16,
  MediumText15: MediumText15,
  MediumText14: MediumText14,
  MediumText13: MediumText13,
  MediumText12: MediumText12,
  ErrorMessage: ErrorMessage,
  // Input
  FormInputBlock: FormInputBlock,
  FormInputContainer: FormInputContainer,
  FormInputContainerPhone: FormInputContainerPhone,
  FormInput: FormInput,
  FormInputLabel: FormInputLabel,
  ShowPasswordIconButton: ShowPasswordIconButton,
}
