import styled from 'styled-components/native'
import F from '@/res/fonts'
const Container = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
`

const ImgBlock = styled.View`
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  background: #141517;
  overflow: hidden;
`

const styles = {
  Container,
  ImgBlock,
}

export default styles
