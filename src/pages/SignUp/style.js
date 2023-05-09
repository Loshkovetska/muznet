import styled from "styled-components/native"
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const Container = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 0px 20px;
  padding-top: 40px;
`
const Header = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 31px;
`

const ContentTitle = styled(M.Title28)``
const FormText = styled(M.MediumText17)`
  color: ${C.cyanGray};
  margin-bottom: 24px;
`
const FormBlock = styled.View`
  width: 100%;
`
const FormInputBlock = styled(M.FormInputBlock)``
const FormInputContainer = styled.View``
const FormInputLabel = styled(M.FormInputLabel)``
const FormInput = styled(M.FormInput)``
const ShowPasswordIconButton = styled(M.ShowPasswordIconButton)``
const Link = styled.TouchableOpacity`
  width: 100%;
  padding-top: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`
const LinkText = styled(M.PlainText17)`
  color: ${C.sBlack};
`
const ButtonSubmit = styled(M.BlackBtn)`
  position: absolute;
  bottom: ${(props) => (props.isKeyboardOpen === true ? 20 + "px" : 50 + "px")};
`
const ButtonSubmitDisable = styled(M.DisableBtn)`
  position: absolute;
  bottom: ${(props) => (props.isKeyboardOpen === true ? 20 + "px" : 50 + "px")};
`
const ButtonSubmitText = styled(M.BlackBtnText)``
const ButtonSubmitTextDisable = styled(M.BlackBtnTextDisable)``
const ErrorMessage = styled(M.ErrorMessage)``
const ContentBlock = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 16px;
`
const ContainerText = styled(M.PlainText17)`
  color: ${C.sBlack};
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-right: 5px;
`
const ContainerLink = styled.TouchableOpacity``
const ContainerLinkText = styled(M.BorderBtnText)`
  font-family: ${F.bold};
`
export const style = {
  Container: Container,
  ContentTitle: ContentTitle,
  Header: Header,
  FormText: FormText,
  FormBlock: FormBlock,
  FormInputBlock: FormInputBlock,
  FormInputContainer: FormInputContainer,
  FormInputLabel: FormInputLabel,
  FormInput: FormInput,
  ButtonSubmit: ButtonSubmit,
  ButtonSubmitDisable: ButtonSubmitDisable,
  ButtonSubmitTextDisable: ButtonSubmitTextDisable,
  ButtonSubmitText: ButtonSubmitText,
  ShowPasswordIconButton: ShowPasswordIconButton,
  Link: Link,
  LinkText: LinkText,
  ErrorMessage: ErrorMessage,
  ContentBlock: ContentBlock,
  ContainerText: ContainerText,
  ContainerLink: ContainerLink,
  ContainerLinkText: ContainerLinkText,
}
