import styled from "styled-components/native"
import F from "@/res/fonts"
const CameraView = styled.View`
  width: 100%;
  height: ${(props) => props.height};
  background: #141517;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2000;
`

const CameraTop = styled.View`
  width: 100%;
  padding: 32px 16px;
`

const FuncItem = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background: ${(props) =>
    props.isFlash ? "#ffffff" : "rgba(242, 243, 249, 0.2)"};
  border-radius: 6px;
  width: 32px;
  height: 32px;
`

const CameraBottom = styled.View`
  width: 100%;
  padding: 61px 16px 16px;
  display: flex;
`

const Preview = styled.View`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: ${(props) => props.height};
  z-index: 200;
  background: #141517;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Scroll = styled.View`
  width: 97px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ScrollItem = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const ScrollItemText = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${(props) => (props.active ? "#ffffff" : "#5C6574")};
`

const FuncBottom = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 11px;
`

const CircleFunc = styled.TouchableOpacity`
  background: rgba(242, 243, 249, 0.2);
  width: 32px;
  height: 32px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 124px;
`

const Timer = styled.View`
  background: rgba(0, 0, 0, 0.5);
  border-radius: 58px;
  padding: 5px 9px;
  position: absolute;
  top: 16px;
  text-align: center;
  display: flex;
`

const TimerText = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;
  /* identical to box height, or 124% */

  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
`
const styles = {
  CameraView,
  CameraTop,
  FuncItem,
  Preview,
  CameraBottom,
  Scroll,
  ScrollItem,
  ScrollItemText,
  FuncBottom,
  CircleFunc,
  Timer,
  TimerText,
}

export default styles
