import styled from "styled-components/native"
import F from "@/res/fonts"
const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`
const ContainerTop = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 16px;
  border-width: 1px;
  border-color: rgba(92, 101, 116, 0.2);
  border-top-width: 0px;
`

const FuncItem = styled.TouchableOpacity``

const Title = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: #333333;
`

const ScrollBlock = styled.ScrollView`
  padding: 16px;
  width: 100%;
  padding-bottom: 100px;
`

const Author = styled.View`
  width: 100%;
  padding-bottom: 16px;
`
const AuthorTop = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
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
  background-color: #ffffff;
`

const AuthorTitle = styled.Text`
  font-family: ${F.bold};
  width: 100%;
  display: flex;
  background-color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
`

const AuthorText = styled.Text`
font-family:${F.medium}
  width: 100%;
  display: flex;
  background-color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #000000;
`

const PostInfo = styled.View`
  font-family: ${F.bold};
  background-color: #ffffff;
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
  margin-top: 12px;
`

const PostInfoText = styled.Text`
  font-family: ${F.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  color: #000000;
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
  display: inline;
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

const Space = styled.View`
  padding-bottom: 50px;
  width: 100%;
`

const styles = {
  Container,
  ContainerTop,
  Title,
  FuncItem,
  Author,
  AuthorTop,
  AuthorAvatar,
  AuthorAvatarImage,
  AuthorTitle,
  AuthorText,
  AuthorBlock,
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
  ScrollBlock,
  Space,
}

export default styles
