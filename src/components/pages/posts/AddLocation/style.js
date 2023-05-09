import styled from "styled-components/native"
import F from "@/res/fonts"
const Container = styled.View`
  width: 100%;
  padding: 16px;
  position: absolute;
  height: 80%;
  z-index: 20;
  bottom: 0;
  left: 0;
  border-radius: 16px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  background: #fff;
`

const ContainerTop = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const Title = styled.Text`
  font-family: ${F.bold};
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #333333;
`

const ScrollArea = styled.ScrollView`
  width: 100%;
`

const SearchBlock = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 24px;
`

const SearchInput = styled.TextInput`
  border: none;
  background: transparent;
  font-family: ${F.regular};
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.333333px;
  color: #141517;
  flex: 1;
  min-width: 50px;
  margin-right: 8px;
  width: 100%;
`

const SearchTitle = styled.Text`
  font-family: ${F.regular};

  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #b9b9ba;
`

const ClearText = styled.Text`
  font-family: ${F.bold};
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #141517;
  margin-left: 6px;
`

const LocationItem = styled.TouchableOpacity`
  border: ${(props) => (props.isLast ? "0" : "1px")} solid #e9ecf2;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  padding: 8px 0;
  margin-top: 20px;
`

const LocationItemTitle = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;
  margin-bottom: 4px;
  color: rgba(92, 101, 116, 0.6);
`

const Finder = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;
  margin-bottom: 4px;
  color: #141517;
`
const LocationItemText = styled.Text`
  font-family: ${F.medium};
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: rgba(92, 101, 116, 0.6);
`

const styles = {
  Container,
  ContainerTop,
  Title,
  ScrollArea,
  SearchBlock,
  SearchInput,
  ClearText,
  SearchTitle,
  LocationItem,
  LocationItemTitle,
  LocationItemText,
  Finder,
}

export default styles
