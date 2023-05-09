import styled from "styled-components/native"
import F from "@/res/fonts"

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 40px;
  background: #fff;
`
const ContainerTop = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border: 1px solid rgba(92, 101, 116, 0.2);
  border-top-width: 0px;
  border-right-width: 0px;
  border-left-width: 0px;
`

const FuncItem = styled.Text`
font-family: ${F.bold}
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #141517;
`

const Title = styled.Text`
font-family: ${F.bold}

  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #333333;
  flex: 1;
`

const styles = {
  Container,
  ContainerTop,
  FuncItem,
  Title,
}

export default styles
