import styled from "styled-components/native"
import F from "@/res/fonts"
const Container = styled.View`
  width: 100%;
  height: 100%;
  background: #fff;
  padding-top: 40px;
`

const Top = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
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
  flex-direction: row;
  justify-content: center;
  padding: 10px 16px;
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

const Count = styled.Text`
  font-family: ${F.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */

  display: flex;
  align-items: center;

  /* Gray 60% */

  color: rgba(92, 101, 116, 0.6);
  margin-left: 12px;
`
const TabItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 50%;
`
const TabItemText = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: ${(props) => (props.active ? "#141517" : "rgba(92, 101, 116, 0.6)")};
`
const TabItemLine = styled.View`
  width: 100%;
  height: 2px;
  background: #17191d;
  border-radius: 4px 4px 0px 0px;
  position: absolute;
  bottom: -12px;
  left: 4px;
`

const Tabs = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  border: 1px solid rgba(92, 101, 116, 0.2);
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  padding: 12px 16px;
`

const styles = {
  Container,
  Top,
  Title,
  Count,
  TitleView,
  Tabs,
  TabItem,
  TabItemText,
  TabItemLine,
}

export default styles
