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
  padding-top: 60px;
`
const Header = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
`

const StepBackButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  padding-left: 5px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  top: -5px;
  left: 0px;
`
const TabNumberIndication = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
`
const TabNumberText = styled(M.MediumText17)`
  color: ${(props) => (props.isActive === true ? C.black : C.gray)};
`
const ProgressBar = styled.View`
  width: 100%;
  height: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
  background-color: ${C.lightGray};
  margin-top: 18px;
  margin-bottom: 32px;
`
const ProgressBarLine = styled.View`
  width: ${(props) =>
    props.progressWidth !== undefined && props.progressWidth + "%"};
  height: 5px;
  border-radius: 5px;
  background-color: ${C.black};
`
const ContainerTitle = styled(M.Title24)``
const ContainerDescription = styled(M.MediumText17)`
  color: ${C.sBlack};
  margin-top: 8px;
`
const Content = styled.ScrollView`
  padding: 0px 20px;
`
const FormInputBlock = styled(M.FormInputBlock)``
const FormInputContainer = styled.View``
const FormInputLabel = styled(M.FormInputLabel)``
const FormInput = styled(M.FormInput)``

const CheckboxBlock = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const CheckboxBlockTitle = styled(M.TitleBold15)`
  margin-bottom: 24px;
`
const ButtonSubmit = styled(M.BlackBtn)``
const ButtonSubmitBlock = styled.View`
  width: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
`
const ButtonSubmitBlockSkip = styled.TouchableOpacity`
  margin-top: 16px;
`
const ButtonSubmitBlockSkipText = styled(M.PlainText17)``
const ButtonSubmitText = styled(M.BlackBtnText)``
const ContentBlock = styled.View`
  display: flex;
  width: 100%;

  padding-bottom: 100%;
  align-items: center;
  flex-direction: column;
  background-color: ${C.white};

  position: absolute;
  bottom: 0px;
  padding-bottom: ${(props) =>
    props.isKeyboardOpen === true ? 20 + "px" : 50 + "px"};
`
const ContentBlockRow = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
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
const UserMainInfoContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const UserAvatarBlock = styled.View`
  width: 120px;
  height: 120px;
  margin-bottom: 24px;
`
const UserAvatarContainer = styled.View`
  width: 100%;
  height: 100%;
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
const UserAvatarButton = styled.TouchableOpacity`
  background-color: ${C.backGray};
  border-radius: 6px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const UserAvatarButtonText = styled.Text`
  margin-top: 12px;
  font-size: 13px;
  font-family: ${F.semiBold};
  color: ${C.sBlack};
  line-height: 16px;
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

export const style = {
  Container: Container,
  Header: Header,
  StepBackButton: StepBackButton,
  TabNumberIndication: TabNumberIndication,
  TabNumberText: TabNumberText,
  ProgressBar: ProgressBar,
  ProgressBarLine: ProgressBarLine,
  ContainerTitle: ContainerTitle,
  ContainerDescription: ContainerDescription,
  // Form
  Content: Content,
  FormInputBlock: FormInputBlock,
  FormInputContainer: FormInputContainer,
  FormInputLabel: FormInputLabel,
  FormInput: FormInput,
  CheckboxBlock: CheckboxBlock,
  CheckboxBlockTitle: CheckboxBlockTitle,
  FormInputPricePerHourBlock: FormInputPricePerHourBlock,
  FormInputPricePerHourText: FormInputPricePerHourText,

  // Submit
  ButtonSubmit: ButtonSubmit,
  ButtonSubmitText: ButtonSubmitText,
  ButtonSubmitBlock: ButtonSubmitBlock,
  ButtonSubmitBlockSkip: ButtonSubmitBlockSkip,
  ButtonSubmitBlockSkipText: ButtonSubmitBlockSkipText,
  ContentBlock: ContentBlock,
  ContentBlockRow: ContentBlockRow,
  ContainerText: ContainerText,
  ContainerLink: ContainerLink,
  ContainerLinkText: ContainerLinkText,

  // User main info
  UserMainInfoContainer: UserMainInfoContainer,
  UserAvatarBlock: UserAvatarBlock,
  UserAvatarContainer: UserAvatarContainer,
  UserAvatar: UserAvatar,
  UserAvatarReplaceButton: UserAvatarReplaceButton,
  UserAvatarButton: UserAvatarButton,
  UserAvatarButtonText: UserAvatarButtonText,
}
