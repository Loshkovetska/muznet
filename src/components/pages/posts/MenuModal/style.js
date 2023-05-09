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
`

const Container = styled.View`
  height: 173px;
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`

const ContainerTop = styled.View`
  margin: 12px auto 12px;
  width: 72px;
  height: 5px;
  background: #e0e0e0;
  border-radius: 5px;
`

const ContainerRow = styled.View`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 24px 16px;
`
const ContainerFunc = styled.View`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`

const ContainerFuncItem = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  border: ${(props) => props.border} solid rgba(92, 101, 116, 0.2);
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  background: #f5f5f5;
`
const ContainerFuncText = styled.Text`
  font-family: ${F.bold};
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: ${(props) => props.color};
`

const style = {
  Container: Container,
  SafeAreaView,
  ContainerTop,
  ContainerRow,
  ContainerFunc,
  ContainerFuncItem,
  ContainerFuncText,
}

export default style
