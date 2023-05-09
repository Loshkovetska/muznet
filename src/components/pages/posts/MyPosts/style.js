import styled from "styled-components/native"
import F from "@/res/fonts"

const AreaScroll = styled.ScrollView`
  width: 100%;
  padding-top: 24px;
  display: ${(props) => (props.display == true ? "flex" : "none")};
`

const BlockTop = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 16px;
`

const AuthorTop = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`

const AuthorAvatar = styled.View`
  width: 32px;
  height: 32px;
  border: 1px solid #141517;
  border-radius: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  overflow: hidden;
`

const AuthorTitle = styled.Text`
  font-family: ${F.bold};
  width: 100%;
  display: flex;
  background-color: #fff;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
`

const AuthorAvatarImage = styled.Image`
  width: 100%;
  height: 100%;
  display: flex;
`

const PostCount = styled.Text`
  font-family: ${F.bold};
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: right;
  color: #000000;
`

const Gallery = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const GalleryPost = styled.TouchableOpacity`
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  border: 2px solid #fff;
  border-right-width: ${(props) => props.border};
  border-top-width: 0;
  border-left-width: 0;
  position: relative;
  justify-content: center;
  align-items: center;
`
const GalleryPostImage = styled.Image`
  display: flex;
  width: 100%;
  height: 100%;
`

const GalleryPostIcon = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 20;
`

const GalleryText = styled.Text`
  font-family: ${F.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: rgba(92, 101, 116, 0.6);
  margin: 16px 0;
`

const GalleryButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 16px;
  padding: 18px 24px;
  border: 1px solid #000000;
  border-radius: 8px;
`

const GalleryButtonText = styled.Text`
  font-family: ${F.medium};
  font-weight: 500;
  font-size: 17px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.333333px;
  text-transform: capitalize;
  color: #0c0c0e;
`

const Space = styled.View`
  padding-bottom: 200px;
`

const styles = {
  AreaScroll,
  BlockTop,
  AuthorAvatar,
  AuthorTop,
  AuthorAvatarImage,
  AuthorTitle,
  PostCount,
  Gallery,
  GalleryPost,
  GalleryPostImage,
  GalleryPostIcon,
  GalleryText,
  GalleryButton,
  GalleryButtonText,
  Space,
}

export default styles
