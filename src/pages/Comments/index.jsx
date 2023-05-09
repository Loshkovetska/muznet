import {
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import { observer } from 'mobx-react-lite'
import images from '../../pages/Community/images'
import { useNavigation, useRoute } from '@react-navigation/native'
import CommentsState from '@/stores/CommentsState'
import getPostDate from '@/components/helpers/getPostDate'
import CommentForm from '@/components/pages/comments/CommentForm'
import Comment from '@/components/pages/comments/Comment'
import { runInAction } from 'mobx'
import { ShareModalState } from '@/components/pages/posts/ShareModal'
import ShareModal from '@/components/pages/posts/ShareModal'
import { InfoPopState } from '@/pages/EditScreen'
import ModalState from '@/stores/CommunityState'
import InfoPop from '@/components/pages/posts/InfoPop'
import AccountStore from '../../stores/AccountStore'
import { getPostComments } from '../../stores/PostModel'

const {
  Container,
  ContainerTop,
  Title,
  FuncItem,
  Author,
  AuthorAvatarImage,
  AuthorTop,
  AuthorBlock,
  AuthorAvatar,
  AuthorTitle,
  AuthorText,
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
} = styles
const { ShareIcon, BackArrow, CheckIcon } = images

const CommentsScreen = () => {
  const navigate = useNavigation()
  const route = useRoute()
  const [showMore, setMore] = useState(false)
  const routeName = route.name.includes('Musician') ? 'Musician' : 'Contractor'
  const post = CommentsState.post

  useEffect(() => {
    runInAction(() => {
      ModalState.isopen = false
      ModalState.isopan2 = false
      ShareModalState.isopen = false
    })
    ShareModalState.ref && ShareModalState.ref.close()
  }, [])

  useEffect(() => {
    getPostComments(post.id).then((r) => {
      runInAction(() => {
        CommentsState.list = r
      })
    })
  }, [post.id])

  if (!post) return <></>
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        hidden={false}
        backgroundColor="#ffffff"
        translucent={true}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
        }}
      >
        <Container>
          <ContainerTop style={{}}>
            <FuncItem
              onPress={() => {
                navigate.goBack()
              }}
            >
              <BackArrow />
            </FuncItem>
            <Title>Comments</Title>
            <FuncItem
              onPress={() => {
                ShareModalState.ref && ShareModalState.ref.expand()
                runInAction(() => {
                  ShareModalState.isopen = true
                  ModalState.idpost = post.id
                })
              }}
            >
              <ShareIcon />
            </FuncItem>
          </ContainerTop>
          <ScrollBlock
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Author>
              <AuthorTop>
                <AuthorAvatar>
                  {post.author.src ? (
                    <AuthorAvatarImage
                      source={{
                        uri: post.author.src,
                      }}
                      resizeMode="cover"
                      resizeMethod="resize"
                    />
                  ) : (
                    <></>
                  )}
                </AuthorAvatar>
                <AuthorTitle>{post.author.name}</AuthorTitle>
              </AuthorTop>
              <PostInfoTitle>{post.title}</PostInfoTitle>
              <PostInfoTextBlock>
                <Text>
                  <PostInfoText show={showMore}>
                    {post.description.length > 75
                      ? `${post.description.slice(
                          0,
                          !showMore ? 48 : post.description.length,
                        )}${!showMore ? '...' : ''}`
                      : post.description}{' '}
                  </PostInfoText>
                  {(post.description.length > 75 || post.tags.length) &&
                  !showMore ? (
                    <PostInfoMoreText
                      onPress={() => {
                        setMore(!showMore)
                      }}
                    >
                      {!showMore ? 'more' : 'less'}
                    </PostInfoMoreText>
                  ) : (
                    <></>
                  )}
                </Text>
              </PostInfoTextBlock>
              {post.tags.length && showMore ? (
                <PostInfoTags>
                  {post.tags.map((p, i) => (
                    <PostInfoTag key={i}>
                      <PostInfoTagText>{p}</PostInfoTagText>
                    </PostInfoTag>
                  ))}
                </PostInfoTags>
              ) : (
                <></>
              )}
              <PostInfoDateText>{getPostDate(post.datetime)}</PostInfoDateText>
            </Author>

            {CommentsState.list?.map((p, i) => (
              <Comment
                comment={p}
                key={i}
                isLast={i + 1 == CommentsState.list?.length}
                postid={post.id }
              />
            ))}
            <Space />
          </ScrollBlock>
          <CommentForm accountId={AccountStore.account.id} idpost={post?.id} />
        </Container>
      </KeyboardAvoidingView>
      <ShareModal />
      {InfoPopState.isshow && InfoPopState.iscopy && (
        <InfoPop
          text="Link successfully copied!"
          icon={() => (
            <CheckIcon
              style={{
                marginRight: 4,
              }}
            />
          )}
          bg="#DEF9E9"
          color="#38c976"
        />
      )}
    </>
  )
}

export default observer(CommentsScreen)
