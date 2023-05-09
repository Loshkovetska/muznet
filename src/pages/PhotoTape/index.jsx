import images from '@/pages/Community/images'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import UserModel from '@/stores/UserModel'
import styles from './style'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import PostsList from '@/components/pages/posts/PostsList'
import { runInAction } from 'mobx'
import { SlideIndex } from '@/components/pages/posts/PostsList'
import TapbarMenu from '@/components/Buttons/TapbarMenu'
import ModalState from '@/stores/CommunityState'
import HidePost from '@/components/pages/posts/HidePost'
import { ShareModalState } from '@/components/pages/posts/ShareModal'
import { InfoPopState } from '@/pages/EditScreen'
import InfoPop from '@/components/pages/posts/InfoPop'
import MenuModal from '@/components/pages/posts/MenuModal'
import ShareModal from '@/components/pages/posts/ShareModal'
import ReportModal from '@/components/pages/posts/ReportModal'
import DeletePop from '@/components/pages/posts/DeletePop'
import AccountStore from '../../stores/AccountStore'
import { getLikedPosts, getMyPosts } from '../../stores/PostModel'
const { Container, ContainerTop, FuncItem, Title } = styles
const { BackArrow, CheckIcon, DelIcon } = images

const PhotoTape = () => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigation()

  useEffect(() => {
    runInAction(() => {
      ModalState.isopen = false
      ModalState.isopen2 = false
      ShareModalState.isopen = false
    })
    ShareModalState.ref && ShareModalState.ref.expand()
    ModalState.ref1 && ModalState.ref1.close()
    ModalState.ref2 && ModalState.ref2.expand()
  }, [])
  const { mode } = SlideIndex

  useEffect(() => {
    if (mode == 'post') {
      getMyPosts(AccountStore.account.id).then((r) => setPosts(r))
    } else {
      getLikedPosts(AccountStore.account.id).then((r) => {
        setPosts(r)
      })
    }
  }, [mode, ModalState.isopen2, AccountStore.account.id])

  if (!AccountStore.account) return <></>

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
          <FuncItem
            onPress={() => {
              navigate.goBack()
              runInAction(() => {
                SlideIndex.id = 0
              })
            }}
          >
            <BackArrow />
          </FuncItem>
          <Title>{AccountStore.account?.userName}</Title>
        </ContainerTop>
        {posts && <PostsList posts={posts} isUserMode={true} />}
      </Container>
      {!ModalState.isopen2 && !ShareModalState.isopen && (
        <TapbarMenu isShowKeyboard={false} />
      )}

      <MenuModal />
      <ShareModal />
      <ReportModal />
      <DeletePop />
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
    </>
  )
}

export default observer(PhotoTape)
