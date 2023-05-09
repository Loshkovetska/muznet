import styled from 'styled-components/native'
import F from '@/res/fonts'
import C from '@/res/colors'

const DropBlock = styled.View`
  width: 68px;
`
const Drop = styled.TouchableOpacity`
  width: 100%;
`
const DropHeader = styled.TouchableOpacity`
  border-top-left-radius: 6px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 6px;
  border: 1px solid ${C.lightGray};
  border-right-width: 0px;
  background-color: #ffffff;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 14px;
`
const ArrowBlock = styled.View`
  transform: ${(props) => (props.isOpen ? 'rotate(90deg)' : 'rotate(-90deg)')};
`
const BorderRight = styled.View`
  position: absolute;
  top: 10px;
  right: 0px;
  width: 1px;
  height: 28px;
  background-color: ${C.lightGray};
`
const DropContainer = styled.View`
  width: 100%;
  margin-top: 4px;
  top: 43px;
  background-color: #ffffff;
  position: absolute;
  left: 0px;
  z-index: 1000;
  border-color: ${C.lightGray};
  border-width: 1px;
  border-radius: 6px;
`
const OptionsList = styled.ScrollView`
  z-index: 1000;
  border-radius: 6px;
  height: 100%;
  width: 100%;
  padding: 6px 0px;
  max-height: 180px;
`
const Option = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
`
const OptionText = styled.View`
/* background-color: ${C.lightGray}; */

`

export const style = {
  DropBlock: DropBlock,
  Drop: Drop,
  DropHeader: DropHeader,
  BorderRight: BorderRight,
  DropContainer: DropContainer,
  OptionsList: OptionsList,
  Option: Option,
  OptionText: OptionText,
  ArrowBlock: ArrowBlock,
}
