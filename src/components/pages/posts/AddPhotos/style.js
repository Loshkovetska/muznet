import styled from 'styled-components/native'
import F from '@/res/fonts'
const Container = styled.View`
  width: 100%;
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
`

const ImgBlock = styled.View`
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  background: #141517;
  overflow: hidden;
`

const ImgList = styled.ScrollView`
  width: 100%;
  background: #fff;
  flex-grow: 1;
`

const ImgRow = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const FuncBlock = styled.View`
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
  justify-content: space-between;
`

const Duration = styled.Text`
  font-family: ${F.semiBold};
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */

  display: flex;
  align-items: center;
  text-align: right;

  color: #ffffff;
  z-index: 20;

  position: absolute;
  bottom: 4px;
  right: 4px;
`

const Select = styled.View``

const SelectedText = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #141517;
`

const SelectTop = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ImageItem = styled.TouchableOpacity`
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  border-right-width: ${(props) => props.border};
  border-top-width: 0;
  border-left-width: 0;
  position: relative;
`

const RadioButton = styled.View`
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.23);
  border-radius: 20px;
  border: 2px solid ${(props) => (props.isActive ? '#141517' : '#ffffff')};
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  z-index: 20;
`
const RadioButtonDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: #141517;
  display: flex;
`
const Space = styled.View`
  padding-bottom: 200px;
`

const ImageBlur = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.2);
`

const Button = styled.TouchableOpacity`
  background: #141517;
  border-radius: 8px;
  padding: 11px 28px;
  width: ${(props) => props.width}px;
  position: absolute;
  bottom: 100px;
  left: 16px;
  right: 16px;
  z-index: 4;
`

const ButtonText = styled.Text`
  font-family: ${F.regular};
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
  color: #fefefe;
`

const InfoView = styled.View`
  width: ${(props) => props.width}px;
  position: absolute;
  bottom: 140px;
  left: 16px;
  right: 16px;
  z-index: 4;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 8px;
  background: #f2f3f9;
  border-radius: 8px;
`

const InfoViewText = styled.Text`
  display: flex;
  flex-wrap: wrap;
  font-family: ${F.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: rgba(92, 101, 116, 0.8);
`

const FuncItem = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  flex-direction: row;
`
const FuncItemText = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */

  /* 1 */

  color: #141517;
`
const styles = {
  Container,
  FuncItem,
  ImgBlock,
  ImgList,
  FuncBlock,
  Select,
  SelectTop,
  SelectedText,
  ImageItem,
  RadioButton,
  RadioButtonDot,
  Duration,
  ImgRow,
  Space,
  Button,
  ButtonText,
  ImageBlur,
  InfoView,
  InfoViewText,
  FuncItemText,
}

export default styles
