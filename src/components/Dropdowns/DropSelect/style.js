import styled from "styled-components/native"
import F from "@/res/fonts"
import C from "@/res/colors"

const DropBlock = styled.View`
  margin: 0px 16px;
  margin-bottom: 24px;
  margin-top: 22px;
  position: relative;
`
const Drop = styled.Pressable`
  width: 100%;
`
const DropHeader = styled.Pressable`
  border-radius: 6px;
  border: 1px solid ${C.lightGray};
  background-color: #ffffff;
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  z-index: 1111;
`
const ArrowBlock = styled.View`
  transform: ${(props) => (props.isOpen ? "rotate(90deg)" : "rotate(-90deg)")};
  margin-right: 7px;
`
const DropContainer = styled.ScrollView`
  width: 100%;
  background-color: #ffffff;
  position: absolute;
  top: 48px;
  border: 1px solid ${C.lightGray};
  // border-top-width: 0px;
  left: 0px;
  z-index: 1111;
  border-radius: 6px;
  
`
const OptionsList = styled.View`
  border-radius: 6px;
  height: 100%;
  width: 100%;
  padding: 6px 0px;
`
const Option = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
`
const OptionText = styled.Text`
  font-family: ${F.regular};
  color: ${(props) => (props.isHeader === true ? C.sBlack : C.black)};
  font-size: 17px;
`

const OptionActiveIcon = styled.View`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const style = {
  DropBlock: DropBlock,
  Drop: Drop,
  DropHeader: DropHeader,
  DropContainer: DropContainer,
  OptionsList: OptionsList,
  Option: Option,
  OptionText: OptionText,
  ArrowBlock: ArrowBlock,
  OptionActiveIcon: OptionActiveIcon,
}
