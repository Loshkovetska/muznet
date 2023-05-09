import styled from 'styled-components/native'
import F from '@/res/fonts'
import C from '@/res/colors'
import { M } from '@/res/mixin'

const Header = styled.View`
  width: 100%;
  display: flex;
  justify-content: space-between; //center
  align-items: center;
  flex-direction: row;
  padding-bottom: 31px;
  padding-left: 16px;
  padding-right: 16px;
`
const HeaderClose = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 32px;
  height: 32px;
  padding-right: 15px;
  // position: absolute;
  // top: 0px;
  // left: 16px;
  // bottom: 0px;
`
const HeaderSpace = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 32px;
  height: 32px;
`
const HeaderTitle = styled(M.Title24)`
  line-height: 30px;
  // padding-top: 28px;
`

export const style = {
  Header: Header,
  HeaderClose: HeaderClose,
  HeaderTitle: HeaderTitle,
  HeaderSpace,
}
