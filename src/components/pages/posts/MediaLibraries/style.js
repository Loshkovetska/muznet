import styled from "styled-components/native"
import F from "@/res/fonts"
const Container = styled.View`
  width: 100%;
  height: ${(props) => props.height};
  padding-top: 40px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 1);
`

const ContainerTop = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px 16px;
  border: 1px solid #ffffff;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`
const ContainerText = styled.Text`
  font-family: ${F.bold};
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
`

const Title = styled.Text`
  flex: 1;
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height, or 125% */
  color: #ffffff;
  text-align: center;
`

const ScrollBlock = styled.ScrollView`
  width: 100%;
  padding: 21px 16px;
`

const ImageView = styled.View`
  width: 100px;
  height: 100px;
  display: flex;
  background: #ffffff;
  margin-right: 14px;
  border-radius: 7px;
`

const ImageItem = styled.TouchableOpacity`
display;flex;
flex-direction:row;
align-items:center;
margin-bottom: 24px;`

const ImageText = styled.Text`
  font-family: ${F.bold};
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
`
const styles = {
  Container,
  ContainerTop,
  ContainerText,
  Title,
  ScrollBlock,
  ImageView,
  ImageItem,
  ImageText,
}
export default styles
