import styled from "styled-components/native"
import F from "@/res/fonts"
const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 24px;
`

const ContainerTop = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 12px;
`

const Author = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  background-color: #fff;
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

const AuthorAvatarImage = styled.Image`
  width: 100%;
  height: 100%;
  display: flex;
`

const AuthorBlock = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
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

const AuthorText = styled.Text`
font-family:${F.medium}
  width: 100%;
  display: flex;
  background-color: #fff;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #000000;
`

const FuncBlock = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  padding: 12px 16px;
`

const FuncBlockLeft = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
`

const FuncBlockItem = styled.TouchableOpacity`
  margin-right: 16px;
`

const FuncBlockLikes = styled.Text`
  font-family: ${F.bold};
  background-color: #fff;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
  color: #000000;
`

const PostInfo = styled.View`
  font-family: ${F.bold};
  background-color: #fff;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
  color: #000000;
  padding: 0 16px;
  margin-top: 12px;
`

const PostInfoTitle = styled.Text`
  font-family: ${F.bold};
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
  margin-bottom: 4px;
`

const PostInfoText = styled.Text`
  font-family: ${F.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  color: #000000;
  max-height: ${(props) => (props.show == true ? "10000000000px" : "28px")};
  overflow: hidden;
`

const PostInfoTextBlock = styled.View``

const PostInfoComments = styled.TouchableOpacity`
  padding: 4px 0;
  margin-top: 12px;
`
const PostInfoCommentsText = styled.Text`
  font-family: ${F.bold};
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: rgba(92, 101, 116, 0.8);
`

const PostInfoDateText = styled.Text`
  font-family: ${F.medium};
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: rgba(92, 101, 116, 0.8);
  margin-top: 8px;
`

const PostInfoMoreText = styled.Text`
  font-family: ${F.medium};
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-decoration-line: underline;
  color: rgba(92, 101, 116, 0.8);
`

const PostInfoTags = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`

const PostInfoTag = styled.Text`
  padding: 8px 16px;
  background: #fefefe;
  border: 1px solid rgba(185, 185, 186, 0.3);
  border-radius: 6px;
  margin-top: 8px;
  margin-right: 10px;
`
const PostInfoTagText = styled.Text`
  font-family: ${F.medium};
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.333333px;
  color: #0c0c0e;
`

const styles = {
  Container,
  ContainerTop,
  Author,
  AuthorAvatar,
  AuthorAvatarImage,
  AuthorTitle,
  AuthorText,
  AuthorBlock,
  FuncBlock,
  FuncBlockItem,
  FuncBlockLeft,
  FuncBlockLikes,
  PostInfo,
  PostInfoTitle,
  PostInfoText,
  PostInfoComments,
  PostInfoCommentsText,
  PostInfoDateText,
  PostInfoTextBlock,
  PostInfoMoreText,
  PostInfoTags,
  PostInfoTag,
  PostInfoTagText,
}

export default styles
