import styled from "styled-components/native"
import F from "@/res/fonts"
const Block = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 20px 8px 16px;
`

const BlockImg = styled.View`
  width: 48px;
  height: 48px;
  border: 1px solid rgba(92, 101, 116, 0.2);
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`

const BlockCol = styled.View`
  flex: 1;
  margin-right: 12px;
`
const BlockTitle = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */

  display: flex;
  align-items: center;

  color: #000000;
`
const BlockText = styled.Text`
  font-family: ${F.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */

  display: flex;
  align-items: center;

  /* Gray 60% */

  color: rgba(92, 101, 116, 0.6);
  margin-top: 4px;
`
const styles = {
  Block,
  BlockImg,
  BlockCol,
  BlockTitle,
  BlockText,
}

export default styles
