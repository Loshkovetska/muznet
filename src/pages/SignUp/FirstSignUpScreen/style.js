import styled from 'styled-components/native'
import C from '@/res/colors'
import F from '@/res/fonts'
import { M } from '@/res/mixin'

const Container = styled.ScrollView`
  width: 100%;
  background-color: #ffffff;
  padding: 0px 20px;
`
const Content = styled.View`
  padding-top: 20%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`
const ContentTitle = styled(M.Title28)`
  margin-top: 17%;
  margin-bottom: 32px;
  width: 100%;
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
  margin-top: 16px;
`
const ButtonSubmitText = styled(M.BlackBtnText)``
const ErrorMessage = styled(M.ErrorMessage)``
const OrBlock = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 10%;
  margin-bottom: 9%;
`
const OrBorder = styled.View`
  width: 50%;
  height: 1px;
  background-color: ${C.lightGray};
`
const OrText = styled(M.MediumText20)`
  width: 53px;
  text-align: center;
`

// Button
const ButtonsBlock = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
`
const Button = styled.TouchableOpacity`
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0px 3%;
`
const ButtonIconBlock = styled.View`
  width: 60px;
  height: 60px;
  border-color: ${C.lightGray};
  border-width: 1px;
  border-style: solid;
  border-radius: 12px;
  margin-bottom: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const ButtonText = styled(M.MediumText17)`
  color: ${(props) => (props.isSkip === true ? C.gray : C.black)};
  padding-right: ${(props) => (props.isSkip === true ? 0 + 'px' : 8 + 'px')};
  padding-left: 8px;
`
const ContentBlock = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 100px;
  width: 100%;
  flex-grow: 1;
  padding-bottom: 20px;
`
const ContentBlockRow = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 16px;
  width: 100%;
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
const AgreementBlock = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
`

const AgreementText = styled(M.PlainText13)`
  color: ${C.sBlack};
  opacity: 0.6;

  text-align: center;
`
export const style = {
  Container: Container,
  Content: Content,
  ContentTitle: ContentTitle,
  FormBlock: FormBlock,
  FormInputBlock: FormInputBlock,
  FormInputContainer: FormInputContainer,
  FormInputLabel: FormInputLabel,
  FormInput: FormInput,
  ButtonSubmit: ButtonSubmit,
  ButtonSubmitText: ButtonSubmitText,
  ShowPasswordIconButton: ShowPasswordIconButton,
  Link: Link,
  LinkText: LinkText,
  ErrorMessage: ErrorMessage,
  OrBlock: OrBlock,
  OrBorder: OrBorder,
  OrText: OrText,
  // Buttons
  ButtonsBlock: ButtonsBlock,
  Button: Button,
  ButtonIconBlock: ButtonIconBlock,
  ButtonText: ButtonText,
  ContentBlock: ContentBlock,
  ContentBlockRow: ContentBlockRow,
  ContainerText: ContainerText,
  ContainerLink: ContainerLink,
  ContainerLinkText: ContainerLinkText,

  AgreementText: AgreementText,
  AgreementBlock: AgreementBlock,
}
