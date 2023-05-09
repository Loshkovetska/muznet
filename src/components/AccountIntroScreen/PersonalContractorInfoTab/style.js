import styled from "styled-components/native"
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
  width: 100%;
  background-color: ${C.white};
  padding-top: 68px;
  overflow: hidden;
`
const FormScrollView = styled.ScrollView`
  padding: 0px 16px;
  padding-bottom: 80px;
`

const UserAvatarBlock = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 24px;
`
const UserAvatarContainer = styled.View`
  width: 120px;
  height: 120px;
  margin-bottom: 24px;
`
const UserAvatar = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  background-color: ${C.white};
  border: 1px solid rgba(185, 185, 186, 0.142);
`
const UserAvatarReplaceButton = styled.TouchableOpacity`
  position: absolute;
  bottom: -18px;
  right: -18px;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 23px;
  border-color: ${C.white};
  border-width: 4px;
  background-color: ${C.black};
`
// Form
const FormInputBlock = styled(M.FormInputBlock)``
const FormInputContainer = styled.View``
const FormInputLabel = styled(M.FormInputLabel)``
const FormInput = styled(M.FormInput)``
const FormTextInput = styled.TextInput`
  width: 100%;
  font-size: 17px;
  padding: 12px 16px;
  padding-top: ${(props) =>
    props.inputLabel === true ? 20 + "px" : 12 + "px"};

  font-family: ${F.regular};
  color: ${C.black};
  border-radius: 6px;
`
const CheckboxBlock = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const CheckboxBlockTitle = styled(M.TitleBold15)`
  margin-bottom: 24px;
`
const FormInputPricePerHourBlock = styled.View`
  width: 100%;
  z-index: 0;
  border-style: solid;
  border-radius: 6px;
  height: 48px;
  padding-left: 16px;
  padding-top: ${(props) => (props.inputLabel === true ? 17 + "px" : 0 + "px")};
  padding-right: ${(props) =>
    props.isPassword === true ? 50 + "px" : 16 + "px"};
  z-index: -1;
  position: absolute;
  left: 0px;
  bottom: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  flex-direction: row;
`
const FormInputPricePerHourText = styled.Text`
  margin-top: 12px;
  font-size: 13px;
  font-family: ${F.regular};
  font-size: 17px;
`

const LogOutButton = styled.TouchableOpacity`
  margin-top: 12px;
  margin-bottom: 160px;
`
const LogOutButtonText = styled(M.PlainText17)`
  color: ${C.cyanGray};
  text-decoration: underline;
`

// Footer
const ContentBlock = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  margin-top: 16px;
  padding-top: 7px;
  height: 126px;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: ${C.white};
  border-top-color: ${C.lightGray};
  border-top-width: 1px;
`
const ContentBlockRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0px 16px;
`
const ButtonSubmit = styled(M.BlackBtn)``
const ButtonSubmitText = styled(M.BlackBtnText)``

export const style = {
  FilterContainer: FilterContainer,
  FormScrollView: FormScrollView,

  UserAvatarBlock: UserAvatarBlock,
  UserAvatarContainer: UserAvatarContainer,
  UserAvatar: UserAvatar,
  UserAvatarReplaceButton: UserAvatarReplaceButton,
  // Form
  FormInputBlock: FormInputBlock,
  FormInputContainer: FormInputContainer,
  FormInputLabel: FormInputLabel,
  FormInput: FormInput,
  FormTextInput: FormTextInput,
  CheckboxBlock: CheckboxBlock,
  CheckboxBlockTitle: CheckboxBlockTitle,
  FormInputPricePerHourBlock: FormInputPricePerHourBlock,
  FormInputPricePerHourText: FormInputPricePerHourText,

  LogOutButton: LogOutButton,
  LogOutButtonText: LogOutButtonText,

  ContentBlock: ContentBlock,
  ContentBlockRow: ContentBlockRow,
  ButtonSubmit: ButtonSubmit,
  ButtonSubmitText: ButtonSubmitText,
}
