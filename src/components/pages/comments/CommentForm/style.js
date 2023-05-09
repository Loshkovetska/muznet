import styled from "styled-components/native"
import F from "@/res/fonts"

const View = styled.SafeAreaView`
  width: 100%;
`
const ViewContainer = styled.View`
  width: 100%;
  padding: 8px 16px 8px;
  background: #fff;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  border: 1px solid rgba(185, 185, 186, 0.2);
  border-bottom-width: 0px;
  max-height: 150px;
`
const AuthorAvatar = styled.View`
  width: 32px;
  height: 32px;
  border: 1px solid #141517;
  border-radius: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  overflow: hidden;
  margin-bottom: 5px;
`

const AuthorAvatarImage = styled.Image`
  width: 100%;
  height: 100%;
  display: flex;
`

const InputView = styled.View`
  flex: 1;
  padding: 8px 16px 11px 11px;
  background: #ffffff;
  border: 1px solid rgba(92, 101, 116, 0.2);
  border-radius: ${(props) => props.borderRadius};
  display: flex;
  align-items: flex-end;
  flex-direction: row;
`

const Input = styled.TextInput`
    flex: 1;
    margin-right: 18px;
    width: 100%;
    font-family:${F.medium}
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    display:flex;
    padding-bottonm:8px;
`
const SendText = styled.Text`
    font-family:${F.bold}
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: #141517;
    padding-bottom: 1px;
`

const styles = {
  ViewContainer,
  View,
  AuthorAvatar,
  AuthorAvatarImage,
  InputView,
  Input,
  SendText,
}
export default styles
