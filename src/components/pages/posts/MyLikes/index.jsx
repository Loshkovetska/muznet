import { observer } from 'mobx-react-lite'
import images from '@/pages/Community/images'
import React, { useEffect, useState } from 'react'
import styles from './style'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import UserModel from '@/stores/UserModel'
import PostGallery from '../PostGallery'
import HidePost from '../HidePost'
import PostModel, { getLikes } from '../../../../stores/PostModel'
import AccountStore from '../../../../stores/AccountStore'

const { PlayIcon, SlidesIcon, Plus } = images
const {
  AreaScroll,
  AuthorTop,
  BlockTop,
  AuthorAvatar,
  AuthorTitle,
  AuthorAvatarImage,
  PostCount,
  Space,
} = styles

const MyLikes = ({ show }) => {
  const [liked, setLiked] = useState([])
  useEffect(() => {
    if (show) {
      HidePost.id = -1
    }
  }, [show])

  const getLikesPosts = async (id_client) => {
    const { posts } = PostModel
    if (!posts?.length) return []
    const likes = await getLikes()
    const userLikes = likes?.filter((l) => l.idclient == id_client && l.id_post)
    const result = []

    userLikes?.forEach((u) => {
      const post = posts?.find(
        (p) => p.id == u.id_post, // && p.idClient != id_client
      )
      if (post) {
        result.push(post)
      }
    })

    return result
  }

  useEffect(() => {
    if (!show) return
    getLikesPosts(AccountStore.account.id).then((r) => {
      setLiked(r)
    })
  }, [AccountStore.account, PostModel.posts, show])

  return (
    <AreaScroll display={show}>
      <BlockTop>
        <AuthorTop>
          <AuthorAvatar>
            {AccountStore.account.userAvatar ? (
              <AuthorAvatarImage
                source={{
                  uri: AccountStore.account.userAvatar[0],
                }}
                resizeMode="cover"
                resizeMethod="resize"
              />
            ) : (
              <></>
            )}
          </AuthorAvatar>
          <AuthorTitle>My Likes</AuthorTitle>
        </AuthorTop>
        <PostCount>
          {liked?.length || 0}{' '}
          {!liked?.length || liked?.length > 1 ? ' posts' : ' post'}
        </PostCount>
      </BlockTop>
      <PostGallery data={liked} mode="like" />
      <Space />
    </AreaScroll>
  )
}

export default observer(MyLikes)
