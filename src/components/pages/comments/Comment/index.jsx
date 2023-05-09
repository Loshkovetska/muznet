import React, { useEffect, useState } from 'react'
import styles from './style'
import { Text, TouchableOpacity, View } from 'react-native'
import getPostDate from '@/components/helpers/getPostDate'
import images from '@/pages/Community/images'
import { runInAction } from 'mobx'
import CommentsState from '@/stores/CommentsState'
import AccountStore from '../../../../stores/AccountStore'
import { updateLike } from '../../../../stores/CommentsState'
import { getPostComments } from '../../../../stores/PostModel'
const {
  BlockView,
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
  PostInfoDateText,
  PostInfoBottom,
  PostInfoFunc,
  PostInfoLikeText,
  ReplayBlock,
} = styles

const { EmptyHeart, FillHeart } = images

const Comment = ({ comment, isLast, postid }) => {
  if (!comment) return <></>

  return (
    <BlockView>
      <AuthorComponent
        comment={comment}
        withReplay
        isLast={isLast}
        postid={postid}
      />
      {comment.replays.length ? (
        <ReplayBlock>
          <View
            style={{
              width: '95%',
            }}
          >
            {comment.replays.map((com, i) => (
              <AuthorComponent
                comment={com}
                key={i}
                withReplay={false}
                isLast={i + 1 == comment.replays.length}
                postid={postid}
              />
            ))}
          </View>
        </ReplayBlock>
      ) : (
        <></>
      )}
    </BlockView>
  )
}

export default Comment

const AuthorComponent = ({ comment, withReplay, isLast, postid }) => {
  const [isLike, setLike] = useState(false)

  const updateLikes = () => {
    updateLike({
      id_client: AccountStore.account.id,
      id_comment: withReplay ? comment.id : 0,
      id_replay: !withReplay ? comment.id : 0,
      id_post: 0,
    }).then((r) => {
      getPostComments(postid).then((r) => {
        runInAction(() => {
          CommentsState.list = r
        })
      })
      setLike(!isLike)
    })
  }

  const replay = (author) => {
    runInAction(() => {
      CommentsState.replay = {
        author: author,
        idcomment: comment.id,
      }
    })
  }

  useEffect(() => {
    const isLike = comment.likes.find(
      (l) => l.idclient == AccountStore.account.id,
    )

    if (isLike) {
      setLike(true)
    } else setLike(false)
  }, [comment.likes, AccountStore.account.id])

  if (!comment) return <></>

  return (
    <Author
      style={{
        borderBottomWidth: isLast ? 0 : 1,
      }}
    >
      <AuthorTop>
        <AuthorAvatar>
          {comment.author.src ? (
            <AuthorAvatarImage
              source={{
                uri: comment.author.src,
              }}
              resizeMode="cover"
              resizeMethod="resize"
            />
          ) : (
            <></>
          )}
        </AuthorAvatar>
        <Text style={{ width: '92%' }}>
          <AuthorTitle>{comment.author.name}</AuthorTitle>
          <PostInfoText> {comment.text}</PostInfoText>
        </Text>
      </AuthorTop>
      <PostInfoBottom>
        <PostInfoFunc>
          <PostInfoDateText style={{ marginRight: 12 }}>
            {getPostDate(comment.datetime, 'short')}
          </PostInfoDateText>
          {comment.likes ? (
            <PostInfoDateText style={{ marginRight: withReplay ? 12 : 0 }}>
              <PostInfoLikeText>{comment.likes?.length}</PostInfoLikeText>{' '}
              {comment.likes?.length == 1 ? 'like' : 'likes'}
            </PostInfoDateText>
          ) : (
            <></>
          )}
          {withReplay ? (
            <PostInfoDateText onPress={() => replay(comment.author)}>
              Replay
            </PostInfoDateText>
          ) : (
            <></>
          )}
        </PostInfoFunc>
        <TouchableOpacity activeOpacity={1} onPress={updateLikes}>
          {isLike ? (
            <FillHeart width={16} height={16} />
          ) : (
            <EmptyHeart width={16} height={16} />
          )}
        </TouchableOpacity>
      </PostInfoBottom>
    </Author>
  )
}
