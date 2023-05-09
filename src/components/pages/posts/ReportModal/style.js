import styled from "styled-components/native"
import F from "@/res/fonts"
const SafeAreaView = styled.TouchableOpacity`
  width: 100%;
  height: ${(props) => props.height};
  flex: 1;
  display: ${(props) => (props.active == true ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
`

const Title = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  /* or 125% */

  /* 1 */

  color: #0c0c0e;
  margin-bottom: 8px;
`

const SubText = styled.Text`
  font-family: ${F.regular};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 24px */

  /* Gray 100% */

  color: #5c6574;
`

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 16px 16px 32px;
  display: flex;
  flex-direction: column;
`

const ContainerTop = styled.View`
  flex: 1;
`
const TextInput = styled.TextInput`
  margin-top: 16px;
  width: 100%;
  background: #fefefe;
  border: 1px solid
    ${(props) => (props.empty ? "rgba(185, 185, 186, 0.2)" : "#141517")};
  border-radius: 8px;
  padding: 14px 16px;

  font-family: ${F.regular};
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.333333px;
  color: #0c0c0e;
  max-height: 150px;
`

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 18px 24px;
  background:${(props) => (!props.isDisable ? "#0c0c0e" : "#B9B9BA")}
  
  border: 1px solid ${(props) => (!props.isDisable ? "#0c0c0e" : "#B9B9BA")};
border-radius: 8px;
`

const ButtonText = styled.Text`
  font-family: ${F.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.333333px;
  text-transform: capitalize;
  color: ${(props) => (props.isDisable ? "#5c6574" : "#ffffff")};
`
const ThanksContainer = styled.View`
  width: 100%;
  height: 100%;
  padding: 16px 16px 32px;
  display: flex;
  flex-direction: column;
`

const styles = {
  SafeAreaView,
  Title,
  Container,
  SubText,
  TextInput,
  ContainerTop,
  Button,
  ButtonText,
  ThanksContainer,
}

export default styles
