import styled from "styled-components/native"

const Container = styled.FlatList`
  height: 100%;
  width: 100%;
  display: ${(props) => (props.display == true ? "flex" : "none")};
  flex-direction: column;
  background-color: #fff;
  // padding-top: 21px;
  flex: 1;
  // padding-bottom: 0px;
`
const Space = styled.View`
  padding-bottom: 100px;
`

const styles = {
  Container,
  Space,
}

export default styles
