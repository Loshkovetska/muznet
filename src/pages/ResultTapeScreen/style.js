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
  position: relative;
  border: 1px solid rgba(92, 101, 116, 0.2);
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`

const TitleView = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 6px 16px;
`

const Title = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height, or 125% */

  text-align: center;

  color: #333333;
`

const Text = styled.Text`
  font-family: ${F.semiBold};
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */

  text-align: center;

  color: #333333;
  margin-bottom: 2px;
`
const styles = {
  Container,
  ContainerTop,
  Text,
  Title,
  TitleView,
}

export default styles
