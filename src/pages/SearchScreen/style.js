import styled from "styled-components/native"
import F from "@/res/fonts"

const SearchBox = styled.View`
  flex: 1;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  flex-direction: row;
  background: #f8f8f8;
  border-radius: 6px;
`

const Top = styled.View`
  width: 100%;
  padding: 8px 16px 10px;
  border: 1px solid rgba(92, 101, 116, 0.2);
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`

const SubTop = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`

const Input = styled.TextInput`
  flex: 1;
  font-family: ${F.regular};
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #141517;
  border: none;
`

const TabItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 4px;
`
const TabItemText = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => (props.active ? "#141517" : "rgba(92, 101, 116, 0.6)")};
`
const TabItemLine = styled.View`
  width: 100%;
  height: 2px;
  background: #17191d;
  border-radius: 4px 4px 0px 0px;
  position: absolute;
  bottom: -10.5px;
  left: 4px;
`

const Content = styled.ScrollView``

const styles = {
  SearchBox,
  Top,
  Input,
  SubTop,
  TabItem,
  TabItemText,
  TabItemLine,
  Content,
}

export default styles
