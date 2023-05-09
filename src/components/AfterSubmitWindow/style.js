import styled from "styled-components/native"
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const ModalWindowContainer = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  background: ${C.white};
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  z-index: 2000;
  padding: 0px 16px;
  position: relative;
`
const ModalWindowBlock = styled.View`
  z-index: 2001;
  background-color: ${C.white};
  width: 100%;
  border-radius: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-bottom: 24px;
`
const CloseButton = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  position: absolute;
  top: 0px;
  right: 0px;
  padding-right: 16px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const ModalIcon = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const ModalImage = styled.View`
  width: 300px;
  height: 100%;
  max-height: 400px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const ModalTitle = styled(M.Title24)`
  text-align: center;
`
const ModalAdvice = styled(M.MediumText17)`
  text-align: center;
  color: ${C.cyanGray};
  margin-top: 8px;
`

const ButtonBlock = styled.View`
  //   position: absolute;
  //   bottom: 70px;
  //   right: 0px;
  //   left: 0px;
  width: 100%;
  //   padding: 0px 20px;
`

const ContentBlockRow = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 16px;
`

const ContainerText = styled(M.PlainText17)`
  color: ${C.sBlack};
  // display: flex;
  // align-items: center;
  // flex-direction: row;
  padding-right: 5px;
  text-align: center;
`
const ContainerLink = styled.TouchableOpacity`
  padding-left: 6px;
  display: flex;
  margin-bottom: -2px;
`

//styled(M.BorderBtnText)
const ContainerLinkText = styled.Text`
    // font-family: ${F.bold};
    // top: 5px;
text-decoration: underline;
font-size: 17px;
font-family: ${F.medium};
color: ${C.black};
line-height: 22px;
`
export const style = {
  ModalWindowContainer: ModalWindowContainer,
  ModalWindowBlock: ModalWindowBlock,
  CloseButton: CloseButton,
  ModalIcon: ModalIcon,
  ModalImage: ModalImage,
  ModalTitle: ModalTitle,
  ModalAdvice: ModalAdvice,
  ButtonBlock: ButtonBlock,

  ContentBlockRow: ContentBlockRow,
  ContainerText: ContainerText,
  ContainerLink: ContainerLink,
  ContainerLinkText: ContainerLinkText,
}
