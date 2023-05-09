import styled from "styled-components/native"
import F from "@/res/fonts"
const Container = styled.View`
  width: 100%;
  padding-top: 40px;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`
const ContainerTop = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
`

const Title = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: #333333;
  flex-grow: 1;
`
const TopFunc = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const TopFuncItem = styled.View`
  margin-right: 16px;
`

const Tabs = styled.View`
  display: flex;
  flex-direction: row;
  margin: 8px auto 0px;
  width: ${(props) => props.width};
`

const TabsContainer = styled.View`
  display: flex;
  flex-direction: row;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  padding: 4px;
`

const TabItem = styled.TouchableOpacity.attrs((props) => {
  active: props.active ? "#141517" : "transparent"
})`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-radius: 6px;
  padding: 8px 12px;
  background-color: ${(props) =>
    props.active === true ? "#141517" : "transparent"};
`

const TabItemText = styled.Text`
  font-family: ${F.bold};
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: ${(props) => (props && props.active ? "#ffffff" : "#141517")};
`

const LoadingBlock = styled.View`
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 21px;
`

const LoadingBlockText = styled.Text`
  font-family: ${F.regular};
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  /* identical to box height, or 124% */

  color: #000000;
`
const LoadingCount = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */

  color: #000000;
  margin-right: 8px;
`
const LoadingBlockRight = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const style = {
  LoadingCount,
  LoadingBlockRight,
  LoadingBlock,
  LoadingBlockText,
  Container: Container,
  ContainerTop: ContainerTop,
  Title,
  TopFunc,
  TopFuncItem,
  Tabs,
  TabsContainer,
  TabItem,
  TabItemText,
}

export default style
