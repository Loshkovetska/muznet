import React, { useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native'
import styles from './style'
import CardImageSlider from '@/components/Carousel'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import CommentsState from '@/stores/CommentsState'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import EditForm from '@/components/pages/posts/EditForm'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { EditInfoData } from '@/components/pages/posts/EditForm'
import { editPost } from '@/stores/PostModel'
import { observable, runInAction } from 'mobx'
import ModalState from '@/stores/CommunityState'
import AddLocation from '@/components/pages/posts/AddLocation'
import { LocationPop } from '@/components/pages/posts/AddLocation'
import { getLocations } from '@/stores/GlobalState'
import { AddInfoState } from '@/components/pages/posts/AddPhotos'

const { Container, ContainerTop, FuncItem, Title } = styles

export const InfoPopState = observable({
  isshow: false,
  isedit: false,
  isdel: false,
  iscopy: false,
})

const EditScreen = () => {
  const sheetRef = useRef(null)
  const navigate = useNavigation()

  const updateInfo = () => {
    //CommentsState.post.id, EditInfoData.dt
    editPost({
      id: CommentsState.post.id,
      commentsOff: EditInfoData.dt.commentsOff == true ? '1' : '0',
      shareOff: EditInfoData.dt.shareOff == true ? '1' : '0',
      tags: EditInfoData.dt.tags.join(','),
      title: EditInfoData.dt.title,
      description: EditInfoData.dt.description,
      location: EditInfoData.dt?.location
        ? EditInfoData.dt?.location?.id.toString()
        : '',
    }).then(() => {
      runInAction(() => {
        InfoPopState.isshow = true
        InfoPopState.isedit = true
      })
      runInAction(() => {
        ModalState.isopen = false
      })
      navigate.goBack()
    })
  }

  useEffect(() => {
    getLocations()
  }, [])

  useEffect(() => {
    if (CommentsState.post) {
      runInAction(() => {
        EditInfoData.dt = {
          title: CommentsState.post.title,
          description: CommentsState.post.description,
          tagsStr: '',
          tags: CommentsState.post.tags,
          location: CommentsState.post.location,
          commentsOff: CommentsState.post.commentsOff,
          shareOff: CommentsState.post.shareOff,
        }
      })
    }
  }, [CommentsState.post])

  if (!CommentsState.post) return <></>

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
        <Container>
          <ContainerTop>
            <FuncItem onPress={() => navigate.goBack()}>Cancel</FuncItem>
            <Title>Edit Info</Title>
            <FuncItem onPress={updateInfo}>Done</FuncItem>
          </ContainerTop>
          <CardImageSlider
            cardImages={CommentsState.post.media.map((c) => {
              return {
                uri: c,
              }
            })}
          />
          <BottomSheet
            ref={sheetRef}
            snapPoints={
              !isKeyboardShown()
                ? ['41%', '50%', '60%', '70%', '80%', '90%']
                : ['41%', '50%', '60%', '70%', '80%']
            }
          >
            <BottomSheetView>
              <EditForm />
            </BottomSheetView>
          </BottomSheet>
        </Container>
        {LocationPop.isshow && <AddLocation />}
      </KeyboardAvoidingView>
    </>
  )
}

export default observer(EditScreen)
