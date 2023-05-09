import styled from "styled-components/native"
import F from "@/res/fonts"

const Container = styled.View`
  width: ${(props) => props.width}px;
  background: ${(props) => props.color};
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.color};
  position: absolute;
  bottom: 100px;
  border-radius: 8px;
  left: 16px;
  right: 16px;
`
const Text = styled.Text`
  font-family: ${F.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => props.color};
`

const styles = {
  Container,
  Text,
}

export default styles
