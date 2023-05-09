import styled from "styled-components/native"
import F from "../../res/fonts"
import C from "../../res/colors"
import { M } from "../../res/mixin"

const SliderContainer = styled.View`
  margin-top: -2px;
  display: flex;
  width: 100%;
`
const SliderScrollView = styled.ScrollView``
const SliderImagePressable = styled.View`
  // width: 100%;
  // height: 100%;
`
const SliderImageContainer = styled.View`
  position: relative;
  display: flex;
  padding: 16px;
  justify-content: flex-end;
`

const SliderImageCountBlock = styled.View`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 20;
  padding: 4px 12px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 60px;
`
const SliderImageCount = styled.Text`
  font-family: ${F.semiBold};
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  color: #f2f3f9;
`
const SliderImage = styled.Image`
  width: 100%;
  height: center;
`
const SliderDots = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  left: 0px;
  bottom: 28px;
  right: 0px;
`
const SliderDotsBlock = styled.View`
  height: 24px;
  border-radius: 12px;
  padding: 0px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: #ffffff4c;
`
const SliderDot = styled.View`
  opacity: 1;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => (props.isActive === true ? C.black : C.white)};
  margin-left: ${(props) => (props.isFirst === true ? 0 + "px" : 8 + "px")};
`

const SliderExpand = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  z-index: 20;
  right: 10px;
  bottom: 10px;
  background: rgba(20, 21, 23, 0.4);
  border: 1px solid #f2f3f9;
  border-radius: 4px;
`

export const style = {
  SliderContainer: SliderContainer,
  SliderScrollView: SliderScrollView,
  SliderImagePressable: SliderImagePressable,
  SliderImage: SliderImage,
  SliderDotsBlock: SliderDotsBlock,
  SliderDot: SliderDot,
  SliderDots: SliderDots,
  SliderImageContainer,
  SliderImageCount,
  SliderImageCountBlock,
  SliderExpand,
}
