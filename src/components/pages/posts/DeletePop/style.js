import styled from "styled-components/native"
import F from "@/res/fonts"
const TouchArea = styled.TouchableOpacity`
  width: 100%;
  height: ${(props) => props.height};
  flex: 1;
  display: ${(props) => (props.active == true ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`

const Container = styled.View`
  background: #fefefe;
  border-radius: 12px;
  padding: 24px 16px;
  width: ${(props) => props.width}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
` 

const ContainerTitle = styled.Text`
  font-family: ${F.regular};
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #0c0c0e;
  margin-bottom: 4px;
`
const Text = styled.Text`
  font-family: ${F.regular};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #5c6574;
  margin-bottom: 16px;
`

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 18px 24px;
  border: 1px solid ${(props) => props.BorderColor};
  background: ${(props) => props.background};
  border-radius: 12px;
`

const ButtonText = styled.Text`
  width: 100%;
  font-family: ${F.regular};
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.333333px;
  color: ${(props) => props.color};
`

const styles = {
  TouchArea,
  Container,
  ContainerTitle,
  Text,
  Button,
  ButtonText,
}

export default styles
