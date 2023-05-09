import styled from "styled-components/native"
import F from "@/res/fonts"

const View = styled.View`
  padding: 24px 16px;
  width: 100%;
  background: #fefefe;
  /* Gray 20% */

  border: 1px solid rgba(92, 101, 116, 0.2);
  border-left-width: 0;
  border-right-width: 0;
  margin: 32px 0;
`

const CloseView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

const ImageContainer = styled.View`
  width: 32px;
  height: 32px;
  display: flex;
`

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.Text`
  font-family: ${F.regular};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* or 24px */

  text-align: center;

  /* Gray 100% */

  color: #5c6574;
  margin: 8px 0 16px;
`
const FuncItem = styled.TouchableOpacity`
  padding: 4px 8px;
`
const FuncItemText = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => (props.error ? "#FC4529" : "#141517")};
`

const styles = {
  View,
  Container,
  Title,
  FuncItem,
  FuncItemText,
  ImageContainer,
  CloseView,
}

export default styles
