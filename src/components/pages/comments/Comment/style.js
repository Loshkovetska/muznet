import styled from "styled-components/native"
import F from "@/res/fonts"

const BlockView = styled.View``

const Author = styled.View`
  width: 100%;
  padding: 16px 0;
  border: 1px solid rgba(92, 101, 116, 0.2);
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
`

const AuthorTop = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
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
  flex: 1;
  flex-wrap: wrap;
`

const PostInfoDateText = styled.Text`
  font-family: ${F.medium};
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: rgba(92, 101, 116, 0.8);
  margin-top: 8px;
`

const PostInfoLikeText = styled.Text`
  font-family: ${F.medium};
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
  margin-top: 8px;
`

const PostInfoBottom = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`

const PostInfoFunc = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
`

const ReplayBlock = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px;
  padding-right: 0;
`
const styles = {
  PostInfoBottom,
  BlockView,
  Author,
  AuthorAvatar,
  AuthorAvatarImage,
  AuthorBlock,
  AuthorTop,
  AuthorTitle,
  AuthorText,
  PostInfo,
  PostInfoTitle,
  PostInfoText,
  PostInfoDateText,
  PostInfoFunc,
  PostInfoLikeText,
  ReplayBlock,
}

export default styles
