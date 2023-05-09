import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native'
import styles from './style.js'
import images from './images.js'

import React, { Component, Fragment, useEffect, useRef, useState } from 'react'
import PostsList from '../../components/pages/posts/PostsList'
import { getWindowDimension } from '@/components/helpers/getWindowDimension.js'
import TapbarMenu from '../../components/Buttons/TapbarMenu'
import PostModel, { getPosts } from '@/stores/PostModel.js'
import MyPosts from '@/components/pages/posts/MyPosts/index.jsx'
import { observer } from 'mobx-react-lite'
import ModalState from '@/stores/CommunityState.js'
import MyLikes from '@/components/pages/posts/MyLikes/index.jsx'
import ReportModal, {
  ReportStateModal,
} from '@/components/pages/posts/ReportModal/index.jsx'
import { ShareModalState } from '@/components/pages/posts/ShareModal/index.jsx'
import { useNavigation } from '@react-navigation/native'
import { InfoPopState } from '@/pages/EditScreen/index.jsx'
import MoreModal from '@/components/pages/posts/MoreModal/index.jsx'
import ShareModal from '@/components/pages/posts/ShareModal/index.jsx'
import DeletePop from '@/components/pages/posts/DeletePop/index.jsx'
import InfoPop from '@/components/pages/posts/InfoPop/index.jsx'
import { IsAdd } from '@/pages/AddScreen/index.jsx'

import LottieView from 'lottie-react-native'
import AccountStore from '../../stores/AccountStore.js'
import MenuModal from '../../components/pages/posts/MenuModal/index.jsx'
import { runInAction } from 'mobx'

const Community = () => {
  const {
    Container,
    ContainerTop,
    Title,
    TopFunc,
    TopFuncItem,
    Tabs,
    TabsContainer,
    TabItem,
    TabItemText,

    LoadingCount,
    LoadingBlockRight,
    LoadingBlock,
    LoadingBlockText,
  } = styles
  const { Search, AddIcon, CheckIcon, DelIcon } = images
  const { windowHeight, windowWidth } = getWindowDimension()
  const [currentTab, setTab] = useState(0)
  const tabs = ['All Posts', 'My Posts', 'My Likes']
  const navigate = useNavigation()
  const [isAddedPost, setAdded] = useState(false)
  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    if (IsAdd.isAdd) {
      setTimeout(() => {
        setAdded(true)

        runInAction(() => {
          IsAdd.isAdd = false
        })
      }, 2000)
    }
  }, [IsAdd.isAdd])

  const { posts } = PostModel

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        hidden={false}
        backgroundColor="#ffffff"
        translucent={true}
      />
      <Container>
        <ContainerTop>
          <Title>Community</Title>
          <TopFunc>
            <TouchableOpacity
              onPress={() => {
                navigate.navigate('CommunityStack', {
                  screen: `CommunitySearchScreen`,
                })
              }}
            >
              <TopFuncItem>
                <Search />
              </TopFuncItem>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigate.navigate('CommunityStack', {
                  screen: `CommunityAddScreen`,
                })
              }}
            >
              <AddIcon />
            </TouchableOpacity>
          </TopFunc>
        </ContainerTop>
        <Tabs {...{ width: windowWidth - 16 * 2 + 'px' }}>
          <TabsContainer>
            {tabs.map((t, i) => (
              <Fragment key={i}>
                <TabItem
                  onPress={() => setTab(i)}
                  activeOpacity={0.8}
                  {...{ active: currentTab == i }}
                >
                  <TabItemText {...{ active: currentTab == i }}>
                    {t}
                  </TabItemText>
                </TabItem>
              </Fragment>
            ))}
          </TabsContainer>
        </Tabs>
        {IsAdd.isAdd && !isAddedPost && (
          <LoadingBlock>
            <LoadingBlockText>Post is loading</LoadingBlockText>
            <LoadingBlockRight>
              <LoadingCount>99%</LoadingCount>
              <View
                style={{
                  width: 48,
                  height: 48,
                  position: 'relative',
                }}
              >
                <LottieView
                  autoPlay
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                  }}
                  source={require('../../../assets/lottie.json')}
                />
              </View>
            </LoadingBlockRight>
          </LoadingBlock>
        )}
        <PostsList posts={posts} isUserMode={false} show={!currentTab} />
        <MyPosts
          show={currentTab == 1}
          myposts={posts?.filter((p) => p.idClient == AccountStore.account.id)}
        />
        <MyLikes show={currentTab == 2} />
      </Container>
      <MoreModal />
      <MenuModal />
      <ShareModal />
      <ReportModal />
      <DeletePop />
      {isAddedPost && (
        <InfoPop
          text="Post successfully added."
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
      {InfoPopState.isshow && InfoPopState.isedit && (
        <InfoPop
          text="Information successfully updated."
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
      {InfoPopState.isshow && InfoPopState.isdel && (
        <InfoPop
          text="Information successfully deleted."
          color="#FC4529"
          bg="#FCF1EF"
          icon={() => (
            <DelIcon
              style={{
                marginRight: 4,
              }}
            />
          )}
        />
      )}

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
      {!ModalState.isopen &&
        !ModalState.isopen2 &&
        !ReportStateModal.isopen &&
        !ShareModalState.isopen && <TapbarMenu isShowKeyboard={false} />}
    </>
  )
}

export default observer(Community)
