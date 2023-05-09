import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import UserModel from '@/stores/UserModel'
import styles from './style'
import images from '@/pages/Community/images'
import { useNavigation, useRoute } from '@react-navigation/native'
import PostGallery from '../PostGallery'
import HidePost from '../HidePost'
import PostModel, { getMyPosts } from '../../../../stores/PostModel'
import AccountStore from '../../../../stores/AccountStore'

const { Plus } = images
const {
  AreaScroll,
  AuthorTop,
  BlockTop,
  AuthorAvatar,
  AuthorTitle,
  AuthorAvatarImage,
  PostCount,
  GalleryText,
  GalleryButton,
  GalleryButtonText,
  Space,
} = styles

const MyPosts = ({ show, myposts }) => {
  const route = useRoute()
  const navigate = useNavigation()

  useEffect(() => {
    if (show) {
      HidePost.id = -1
    }
  }, [show])

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
          <AuthorTitle>{AccountStore.account.userName}</AuthorTitle>
        </AuthorTop>
        <PostCount>
          {myposts?.length || 0}{' '}
          {!myposts?.length || myposts?.length > 1 ? ' posts' : ' post'}
        </PostCount>
      </BlockTop>
      <PostGallery data={myposts} mode="post" />
      <GalleryText>
        {myposts?.length || 0}{' '}
        {!myposts?.length || myposts?.length > 1 ? ' posts' : ' post'}
      </GalleryText>
      <GalleryButton
        activeOpacity={0.5}
        onPress={() => {
          navigate.navigate('CommunityStack', {
            screen: `CommunityAddScreen`,
          })
        }}
      >
        <Plus
          width={24}
          height={24}
          style={{
            marginRight: 12,
          }}
        />
        <GalleryButtonText>Add New Post</GalleryButtonText>
      </GalleryButton>
      <Space />
    </AreaScroll>
  )
}

export default observer(MyPosts)
