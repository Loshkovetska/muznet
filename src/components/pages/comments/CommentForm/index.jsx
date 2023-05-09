import React, { useEffect, useState } from 'react'
import styles from './style'
import { TextInput } from 'react-native'
import images from '@/pages/Community/images'
import { sendComment } from '@/stores/CommentsState'
import { runInAction } from 'mobx'
import CommentsState from '@/stores/CommentsState'
import { observer } from 'mobx-react-lite'
import AccountStore from '../../../../stores/AccountStore'
import { sednReplay } from '../../../../stores/CommentsState'
import { getPostComments } from '../../../../stores/PostModel'
const {
  View,
  AuthorAvatar,
  AuthorAvatarImage,
  Input,
  SendText,
  InputView,
  ViewContainer,
} = styles

const CommentForm = ({ accountId, idpost }) => {
  const [radius, setRadius] = useState(90)
  const [text, onChangeText] = useState('')

  const send = () => {
    if (CommentsState.replay) {
      sednReplay(
        {
          idclient: CommentsState.replay.author.id,
          text: text.replaceAll(`@${CommentsState.replay.author.username}`, ''),
          idcomments: CommentsState.replay.idcomment,
        },
        idpost,
      ).then(() => {
        onChangeText('')
        runInAction(() => {
          CommentsState.replay = null
        })
        getPostComments(idpost).then((r) => {
          runInAction(() => {
            CommentsState.list = r
          })
        })
      })
    } else {
      sendComment({
        idclient: accountId,
        text: text,
        idpost: idpost,
      }).then(() => {
        onChangeText('')
        runInAction(() => {
          CommentsState.replay = null
        })
        getPostComments(idpost).then((r) => {
          runInAction(() => {
            CommentsState.list = r
          })
        })
      })
    }
  }

  useEffect(() => {
    if (CommentsState.replay) {
      onChangeText(`@${CommentsState.replay.author.username} `)
    }
  }, [CommentsState.replay])

  return (
    <View>
      <ViewContainer>
        <AuthorAvatar>
          <AuthorAvatarImage
            source={{
              uri: AccountStore.account.userAvatar[0],
            }}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </AuthorAvatar>
        <InputView borderRadius={radius + 'px'}>
          <Input
            onChangeText={onChangeText}
            value={text}
            placeholder="Add a comment"
            multiline
            // numberOfLines={5}
            textAlignVertical="top"
            scrollEnabled
            onContentSizeChange={({ nativeEvent }) => {
              if (nativeEvent) {
                const height = nativeEvent.contentSize.height
                const r = 90 - 18 * (height / 18) - 18
                if (r > 0) {
                  setRadius(r)
                }
              }
            }}
          />
          <SendText onPress={send}>Post</SendText>
        </InputView>
      </ViewContainer>
    </View>
  )
}

export default observer(CommentForm)
