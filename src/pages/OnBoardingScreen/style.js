import styled from "styled-components/native"
import C from "@/res/colors"
import F from "@/res/fonts"
import { M } from "@/res/mixin"

const OnboardImage = styled.Image`
  width: 112%;
  max-height: 100%;
`
const OnboardImageBlock = styled.View`
  height: 100%;
  width: 100%;
  max-height: 432px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: row;
  background-color: #ffffff;
`
const Container = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`
const Content = styled.View`
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 30px;
  padding-bottom: 50px;
  background: #ffffff;
`
const ContentTitle = styled(M.Title20)`
  padding-bottom: 8px;
`
const ContentText = styled(M.PlainText17)`
  text-align: center;
`

const IndicatorBlock = styled.View`
  width: 61px;
  margin-top: 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`
const IndicatorTumb = styled.View`
  height: 6px;
  width: 20px;
  border-radius: 3px;
  background-color: ${C.black};
  position: absolute;
  top: 0;
  left: ${(props) => (props.left !== undefined ? props.left + "px" : 0 + "px")};
  z-index: 200;
`
const IndicatorItem = styled.View`
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background-color: ${C.gray};
`

const ButtonsBlock = styled.View`
  height: 56px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
`
const Button = styled(M.TextBtn)``
const ButtonText = styled(M.TextBtnText)`
  color: ${(props) => (props.isSkip === true ? C.gray : C.black)};
  padding-right: ${(props) => (props.isSkip === true ? 0 + "px" : 8 + "px")};
`

const ButtonStart = styled(M.BlackBtn)``
const ButtonStartText = styled(M.BlackBtnText)``

export const style = {
  OnboardImageBlock: OnboardImageBlock,
  OnboardImage: OnboardImage,
  Container: Container,
  Content: Content,
  ContentTitle: ContentTitle,
  ContentText: ContentText,
  IndicatorBlock: IndicatorBlock,
  IndicatorTumb: IndicatorTumb,
  IndicatorItem: IndicatorItem,
  ButtonsBlock: ButtonsBlock,
  Button: Button,
  ButtonText: ButtonText,
  ButtonStart: ButtonStart,
  ButtonStartText: ButtonStartText,
}
