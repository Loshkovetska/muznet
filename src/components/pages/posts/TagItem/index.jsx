import images from '@/pages/Community/images'
import { observer } from 'mobx-react-lite'
import React from 'react'
import PostModel from '@/stores/PostModel'
import styles from './style'
import { useNavigation } from '@react-navigation/native'
const { CatIcon, ArrowRight } = images
const { Block, BlockImg, BlockCol, BlockTitle, BlockText } = styles

const TagItem = ({ item }) => {
  const navigate = useNavigation()
  const getCount = (title) => {
    const posts = PostModel.posts
    if (!posts) return

    const count = posts.filter((p) => p.tags.includes(title))
    return count.length
  }
  if (!PostModel.posts) return <></>
  return (
    <Block
      onPress={() => {
        navigate.navigate('CommunityStack', {
          screen: `CommunityResultScreen`,
          params: {
            title: item.name,
            subtitle: '',
            iscat: true,
          },
        })
      }}
    >
      <BlockImg>
        <CatIcon />
      </BlockImg>
      <BlockCol>
        <BlockTitle>{item.name}</BlockTitle>
        <BlockText>
          {getCount(item.name)}{' '}
          {!getCount(item.name) || getCount(item.name) > 1 ? 'posts' : 'post'}
        </BlockText>
      </BlockCol>
      <ArrowRight />
    </Block>
  )
}

export default observer(TagItem)
