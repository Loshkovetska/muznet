import styled from "styled-components/native"
import F from "@/res/fonts"
const VideoBlock = styled.View`
  position: relative;
  max-height: 468px;
  display: flex;
  background: rgba(0, 0, 0, 0.1);
`

const VideoContainer = styled.TouchableOpacity`
  position: relative;
  //   width: 100%;
`

const VideoPlayContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const VideoBlockPlay = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 48px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  position: absolute;
  top: ${(props) => props.topPos};
  left: ${(props) => props.leftPos};
`
const VideoVolume = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 200;
`

const VideoDuration = styled.Text`
  font-family: ${F.bold};
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
  color: #fff;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 200;
`

const styles = {
  VideoBlock,
  VideoBlockPlay,
  VideoContainer,
  VideoDuration,
  VideoVolume,
  VideoPlayContainer,
}

export default styles
