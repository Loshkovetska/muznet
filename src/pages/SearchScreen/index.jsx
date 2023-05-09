import { observer } from 'mobx-react-lite'
import images from '@/pages/Community/images'
import React, { useEffect, useRef, useState } from 'react'
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native'
import styles from './style'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import TagItem from '@/components/pages/posts/TagItem'
import { getPosts } from '@/stores/PostModel'
import { getTags } from '@/stores/GlobalState'
import GlobalState from '@/stores/GlobalState'
import ModalState from '@/stores/CommunityState'
import { ReportStateModal } from '@/components/pages/posts/ReportModal'
import { ShareModalState } from '@/components/pages/posts/ShareModal'
import TapbarMenu from '@/components/Buttons/TapbarMenu'
import LocationItem from '@/components/pages/posts/LocationItem'
import { ScrollView } from 'react-native-gesture-handler'
import PostModel from '@/stores/PostModel'
import { getLocations } from '@/stores/GlobalState'
import { useNavigation } from '@react-navigation/native'

const { Search, BackArrow } = images
const {
  SearchBox,
  Top,
  Input,
  SubTop,
  TabItem,
  TabItemText,
  TabItemLine,
  Content,
} = styles
const SearchScreen = () => {
  const ref = useRef(null)
  const navigate = useNavigation()
  const [value, setValue] = useState('')
  const [tab, setTab] = useState(0)
  const tabs = ['All', 'Top', 'Recent', 'Place']
  const { windowWidth } = getWindowDimension()
  const [popTags, setTags] = useState([])
  const [recents, setRecents] = useState([])
  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    if (!value.length) {
      getTags()
      getLocations()
    } else {
      getTags()
      getLocations()
    }
  }, [value])

  const getCount = (title) => {
    if (!PostModel.posts) return

    const posts = JSON.parse(JSON.stringify(PostModel.posts)).sort(
      (a, b) => b.likes.length - a.likes.length,
    )
    if (!posts) return

    const count = posts.filter((p) => p.tags.includes(title))
    return count.length
  }

  useEffect(() => {
    if (!GlobalState.tags) return
    const tags = JSON.parse(JSON.stringify(GlobalState.tags)).sort(
      (a, b) => getCount(b.name) - getCount(a.name),
    )
    setTags(tags)
  }, [GlobalState.tags, PostModel.posts])

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
        <SafeAreaView
          style={{
            backgroundColor: '#ffffff',
            height: '100%',
            width: '100%',
          }}
        >
          <Top>
            <SubTop>
              <TouchableOpacity
                style={{
                  marginRight: 4,
                  width: 24,
                  height: 24,
                }}
                onPress={() => {
                  navigate.goBack()
                }}
              >
                <BackArrow />
              </TouchableOpacity>
              <SearchBox>
                <Search
                  width={20}
                  height={20}
                  style={{
                    marginRight: 8,
                  }}
                />
                <Input
                  value={value}
                  onChangeText={setValue}
                  placeholder="Search"
                  placeholderTextColor="#8e8e93"
                />
              </SearchBox>
            </SubTop>
            <SubTop
              style={{
                marginTop: 12,
                justifyContent: 'space-between',
              }}
            >
              {tabs.map((t, i) => (
                <TabItem
                  key={i}
                  onPress={() => {
                    setTab(i)
                  }}
                  activeOpacity={1}
                >
                  <TabItemText active={i == tab}>{t}</TabItemText>
                  {i == tab && <TabItemLine></TabItemLine>}
                </TabItem>
              ))}
            </SubTop>
          </Top>

          <ScrollView
            ref={ref}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            initialScrollIndex={tab}
            contentContainerStyle={{
              paddingTop: 21,
              paddingBottom: 100,
            }}
          >
            {!tab && (
              <Content
                style={{
                  width: windowWidth,
                  height: '100%',
                }}
              >
                {GlobalState.tags.map((ti, i) => (
                  <TagItem item={ti} key={i} />
                ))}
                {GlobalState.locations.map((ti, i) => (
                  <LocationItem item={ti} key={i} />
                ))}
              </Content>
            )}
            {tab == 1 && (
              <Content
                style={{
                  width: windowWidth,
                  height: '100%',
                }}
              >
                {popTags.map((ti, i) => (
                  <TagItem item={ti} key={i} />
                ))}
              </Content>
            )}
            {tab == 2 && (
              <Content
                style={{
                  width: windowWidth,
                  height: '100%',
                }}
              >
                {recents.map((ti, i) => (
                  <TagItem item={ti} key={i} />
                ))}
              </Content>
            )}
            {tab == 3 && (
              <Content
                style={{
                  width: windowWidth,
                  height: '100%',
                }}
              >
                {GlobalState.locations.map((ti, i) => (
                  <LocationItem item={ti} key={i} />
                ))}
              </Content>
            )}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
      {!ModalState.isopen &&
        !ReportStateModal.isopen &&
        !ShareModalState.isopen && <TapbarMenu isShowKeyboard={false} />}
    </>
  )
}

export default observer(SearchScreen)
