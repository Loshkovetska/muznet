import styles from './styles'
import React, { useEffect, useRef, useState } from 'react'
import PostCard from '../PostCard'
import { observer } from 'mobx-react-lite'
import { observable } from 'mobx'
import images from '@/pages/Community/images'
import HidePost from '../HidePost'

export const SlideIndex = observable({
  id: 0,
  mode: 'post',
})

export const HideState = observable({
  id: 0,
})

const { Container, Space } = styles
const { CheckIcon, DelIcon } = images
const PostsList = ({ posts, isUserMode, show = true }) => {
  const [data, setData] = useState([])
  const [selectedId, setSelected] = useState(SlideIndex.id)

  const ref = useRef(null)

  useEffect(() => {
    if (isUserMode && show && data && data.length) {
      setSelected(SlideIndex.id)
      ref.current &&
        ref.current.scrollToIndex({
          index: SlideIndex.id,
          visualViewport: 1,
          animated: false,
          viewOffset: 21,
        })
    }
  }, [isUserMode, SlideIndex, data])

  useEffect(() => {
    if (posts) {
      setData([...posts])
    }
  }, [HideState.id, posts])

  if (!data || !data.length) return <></>

  return (
    <Container
      display={show}
      initialScrollIndex={selectedId}
      ref={ref}
      contentContainerStyle={{
        paddingTop: 21,
        paddingBottom: isUserMode ? 100 : 100,
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => {
        if (item.id == HideState.id && !isUserMode) {
          return <HidePost />
        }
        return <PostCard post={item} isUserMode={isUserMode} />
      }}
      keyExtractor={(item, id) => id}
      onScrollToIndexFailed={(info) => {
        const wait = new Promise((resolve) => setTimeout(resolve, 100))
        wait.then(() => {
          ref.current?.scrollToIndex({
            index: info.index,
            visualViewport: 1,
            animated: false,
            viewOffset: 21,
          })
        })
      }}
    />
  )
}

export default observer(PostsList)
