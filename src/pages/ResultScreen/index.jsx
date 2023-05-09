import images from '@/pages/Community/images'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, TouchableOpacity, View } from 'react-native'
import { getPosts } from '@/stores/PostModel'
import styles from './style'
import PostModel from '@/stores/PostModel'
import { useNavigation, useRoute } from '@react-navigation/native'
import PostGallery from '@/components/pages/posts/PostGallery'
import { observer } from 'mobx-react-lite'
import TapbarMenu from '@/components/Buttons/TapbarMenu'
import { observable, runInAction } from 'mobx'

export const ResultTapeState = observable({
  posts: [],
  section: '',
  title: '',
})

const { BackArrow } = images
const {
  Container,
  Top,
  Title,
  Count,
  TitleView,
  Tabs,
  TabItem,
  TabItemText,
  TabItemLine,
} = styles

const ResultScreen = () => {
  const [tab, setTab] = useState(0)
  const route = useRoute()
  const navigate = useNavigation()
  const { title, subtitle, iscat } = route.params

  const [posts, setPosts] = useState([])
  const getCount = (title, subtitle) => {
    const posts = JSON.parse(JSON.stringify(PostModel.posts))
    if (!posts) return
    if (iscat) {
      const count = posts.filter((p) => p.tags.includes(title))
      return count.length
    }
    let count = []
    if (subtitle) {
      count = posts.filter(
        (p) => p.location.city == title && p.location.place == subtitle,
      )
    } else {
      count = posts.filter((p) => p.location.city == title)
    }
    return count.length
  }

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    if (!PostModel.posts) return
    if (!tab) {
      if (iscat) {
        const p = JSON.parse(JSON.stringify(PostModel.posts)).sort(
          (a, b) => b.likes.length - a.likes.length,
        )
        if (!p) return
        const arr = p.filter((p) => p.tags.includes(title))
        setPosts(arr)
        runInAction(() => {
          ResultTapeState.posts = arr
          ResultTapeState.title = title
          ResultTapeState.section = 'Top'
        })
      } else {
        const p = JSON.parse(JSON.stringify(PostModel.posts)).sort(
          (a, b) => b.likes.length - a.likes.length,
        )
        if (!p) return
        let arr = []

        if (subtitle && subtitle.length) {
          arr = p.filter(
            (p) => p.location.city == title && p.location.place == subtitle,
          )
        } else {
          arr = p.filter((p) => p.location.city == title)
        }
        setPosts(arr)
        runInAction(() => {
          ResultTapeState.posts = arr
          ResultTapeState.title =
            subtitle + (subtitle.length ? ', ' : '') + title
          ResultTapeState.section = 'Top'
        })
      }
    } else {
      if (iscat) {
        const p = JSON.parse(JSON.stringify(PostModel.posts)).sort(
          (a, b) =>
            new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
        )
        if (!p) return
        const arr = p.filter((p) => p.tags.includes(title))
        setPosts(arr)
        runInAction(() => {
          ResultTapeState.posts = arr
          ResultTapeState.title = title
          ResultTapeState.section = 'Recent'
        })
      } else {
        const p = JSON.parse(JSON.stringify(PostModel.posts)).sort(
          (a, b) =>
            new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
        )
        if (!p) return
        let arr = []
        if (subtitle && subtitle.length) {
          arr = p.filter(
            (p) => p.location.city == title && p.location.place == subtitle,
          )
        } else {
          arr = p.filter((p) => p.location.place == title)
        }

        setPosts(arr)
        runInAction(() => {
          ResultTapeState.posts = arr
          ResultTapeState.title =
            subtitle + (subtitle.length ? ', ' : '') + title
          ResultTapeState.section = 'Recent'
        })
      }
    }
  }, [tab, PostModel.posts])
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        hidden={false}
        backgroundColor="#ffffff"
        translucent={true}
      />
      <View style={{ width: '100%', height: '100%' }}>
        <Container>
          <Top>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                left: 16,
                zIndex: 20,
              }}
              onPress={() => navigate.goBack()}
            >
              <BackArrow />
            </TouchableOpacity>
            <TitleView>
              <Title>
                {title}
                {subtitle.length ? ', ' : ''}
                {subtitle}
              </Title>
              <Count>
                {getCount(title, subtitle)}{' '}
                {!getCount(title) || getCount(title) > 1 ? 'posts' : 'post'}
              </Count>
            </TitleView>
          </Top>
          <Tabs>
            <TabItem onPress={() => setTab(0)} activeOpacity={1}>
              <TabItemText active={tab == 0}>Top</TabItemText>
              {!tab && <TabItemLine></TabItemLine>}
            </TabItem>
            <TabItem onPress={() => setTab(1)} activeOpacity={1}>
              <TabItemText active={tab == 1}>Recent</TabItemText>
              {tab == 1 && <TabItemLine></TabItemLine>}
            </TabItem>
          </Tabs>
          <PostGallery data={posts} mode="result-post" paddingTop={16} />
        </Container>
        <TapbarMenu />
      </View>
    </>
  )
}

export default observer(ResultScreen)
