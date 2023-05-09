import React, { Component, Fragment, useEffect, useState } from 'react'
import { TouchableOpacity, Text, Modal } from 'react-native'
import styles from './styles'
import images from '../../../../pages/Community/images'
import Carousel from '../../../../components/Carousel'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import ModalState from '../../../../stores/CommunityState'
import { useNavigation, useRoute } from '@react-navigation/native'
import CommentsState, { updateLike } from '../../../../stores/CommentsState'
import getPostDate from '@/components/helpers/getPostDate'
import { ShareModalState } from '../ShareModal'
import AccountStore from '../../../../stores/AccountStore'
import { getPosts } from '../../../../stores/PostModel'

const {
  Container,
  ContainerTop,
  Author,
  AuthorAvatarImage,
  AuthorBlock,
  AuthorAvatar,
  AuthorTitle,
  AuthorText,
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
} = styles

const { MoreIcon, EmptyHeart, ShareIcon, CommentsIcon, FillHeart } = images

const PostCard = observer(({ post, isUserMode }) => {
  const endLikes = post.likes?.length > 1 || !post.likes ? 'likes' : 'like'
  const endComments =
    post.comments?.length > 1 || !post.comments?.length ? 'comments' : 'comment'
  const navigate = useNavigation()
  const [isLike, setLike] = useState(false)
  const [showMore, setMore] = useState(false)

  const likePost = () => {
    updateLike({
      id_post: post.id,
      id_comment: 0,
      id_replay: 0,
      id_client: AccountStore.account.id,
    })
      .then((r) => {
        getPosts()
      })
      .catch((e) => console.log(e))
  }

  const share = () => {
    ModalState.ref1 && ModalState.ref1.close()
    ModalState.ref2 && ModalState.ref2.close()
    //  ShareModalState.ref && ShareModalState.ref.expand()
    runInAction(() => {
      ModalState.idpost = post.id
      ShareModalState.isopen = true
    })
  }

  useEffect(() => {
    if (!post.likes) {
      setLike(false)
      return
    }
    const isLike = post.likes?.find(
      (l) => l.idclient == AccountStore.account.id,
    )

    if (isLike) {
      setLike(true)
    } else setLike(false)
  }, [post.likes, AccountStore.account.id])

  return (
    <Container>
      <ContainerTop>
        <Author>
          <AuthorAvatar>
            {post.author?.src ? (
              <AuthorAvatarImage
                source={{
                  uri: post.author?.src,
                }}
                resizeMode="cover"
                resizeMethod="resize"
              />
            ) : (
              <></>
            )}
          </AuthorAvatar>
          <AuthorBlock>
            <AuthorTitle>{post.author.name}</AuthorTitle>
            <AuthorText>{post.location?.place} </AuthorText>
          </AuthorBlock>
        </Author>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            runInAction(() => {
              if (post.idClient != AccountStore.account.id) {
                ModalState.isopen = true
              } else ModalState.isopen2 = true

              ModalState.idpost = post.id
              CommentsState.post = post
            })
            if (post.idClient == AccountStore.account.id) {
              ModalState.ref2 && ModalState.ref2.expand()
            } else {
              ModalState.ref1 && ModalState.ref1.expand()
            }
          }}
        >
          <MoreIcon />
        </TouchableOpacity>
      </ContainerTop>
      <Carousel
        cardImages={post.media.map((c) => {
          return {
            uri: c,
          }
        })}
      />
      <FuncBlock>
        <FuncBlockLeft>
          <FuncBlockItem activeOpacity={0.8} onPress={likePost}>
            {!isLike ? <EmptyHeart /> : <FillHeart />}
          </FuncBlockItem>
          <FuncBlockItem
            activeOpacity={0.8}
            onPress={() => {
              if (!['true', '1', true].includes(post.commentsOff)) {
                runInAction(() => {
                  CommentsState.post = post
                })
                navigate.navigate('CommunityStack', {
                  screen: `CommunityCommentsScreen`,
                })
              }
            }}
          >
            <CommentsIcon />
          </FuncBlockItem>
          <FuncBlockItem activeOpacity={0.8} onPress={share}>
            <ShareIcon />
          </FuncBlockItem>
        </FuncBlockLeft>
        <FuncBlockLikes>
          {post.likes?.length} {endLikes}
        </FuncBlockLikes>
      </FuncBlock>
      <PostInfo>
        <PostInfoTitle>{post.title}</PostInfoTitle>
        <PostInfoTextBlock>
          <Text>
            <PostInfoText show={showMore}>
              {post.description?.length > 75
                ? `${post.description?.slice(
                    0,
                    !showMore ? 48 : post.description?.length,
                  )}${!showMore ? '...' : ''}`
                : post.description}{' '}
            </PostInfoText>
            {(post.description?.length > 75 || post.tags?.length) &&
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
        {post.tags?.length && showMore ? (
          <PostInfoTags>
            {post.tags?.map((p, i) => (
              <PostInfoTag key={i}>
                <PostInfoTagText>{p}</PostInfoTagText>
              </PostInfoTag>
            ))}
          </PostInfoTags>
        ) : (
          <></>
        )}

        <PostInfoComments
          activeOpacity={1}
          onPress={() => {
            runInAction(() => {
              CommentsState.post = post
            })
            navigate.navigate('CommunityStack', {
              screen: `CommunityCommentsScreen`,
            })
          }}
        >
          {post.comments?.length ? (
            <PostInfoCommentsText>
              View all {post.comments?.length} {endComments}
            </PostInfoCommentsText>
          ) : (
            <PostInfoCommentsText>Add a comment</PostInfoCommentsText>
          )}
        </PostInfoComments>
        <PostInfoDateText>{getPostDate(post.datetime)}</PostInfoDateText>
      </PostInfo>
    </Container>
  )
})

export default PostCard
