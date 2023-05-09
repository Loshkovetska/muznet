import styled from "styled-components/native"
import F from "@/res/fonts"

const Container = styled.View`
  width: 100%;
  padding-top: 40px;
  background: #ffffff;
  height: 100%;
`
const ContainerTop = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 16px;
  border-width: 1px;
  border-color: rgba(92, 101, 116, 0.2);
  border-top-width: 0px;
  position: relative;
`

const FuncItem = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  left: 16px;
`

const Title = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: #333333;
`

const styles = {
  Container,
  ContainerTop,
  FuncItem,
  Title,
}

export default styles
