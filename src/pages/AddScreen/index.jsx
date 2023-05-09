import { observer } from 'mobx-react-lite'
import images from '@/pages/Community/images'
import React, { useEffect, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'

import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  View,
} from 'react-native'
import styles from './style'
import { useNavigation } from '@react-navigation/native'
import AddPhotos from '@/components/pages/posts/AddPhotos'
import { observable, runInAction } from 'mobx'
import AddInfo from '@/components/pages/posts/AddInfo'
import { getLocations } from '@/stores/GlobalState'
import { EditInfoData } from '@/components/pages/posts/EditForm'
import { AddInfoState } from '@/components/pages/posts/AddPhotos'
import AccountStore from '../../stores/AccountStore'
import { addPost, getMyPosts } from '../../stores/PostModel'
export const IsAdd = observable({
  isAdd: false,
})
const { CloseIcon, InfoIcon, DelIcon, CheckIcon, AlertIcon, BackArrow } = images
const {
  Container,
  ContainerTop,
  Title,
  FuncItem,
  ScrollBlock,
  Bottom,
  Button,
  ButtonText,
  InfoBlock,
  InfoBlockText,
  InfoItem,
  InfoItemText,
  FuncItemText,
} = styles

const AddScreen = () => {
  const [posts, setPosts] = useState([])
  const [show, setShow] = useState(false)
  const [tab, setTab] = useState(0)
  const navigate = useNavigation()
  const { windowWidth, windowHeight } = useWindowDimensions()

  useEffect(() => {
    const unsubscribe = navigate.addListener('blur', () => {
      // runInAction(() => {
      //   IsAdd.isAdd = false
      // })
      setTab(0)
      runInAction(() => {
        AddInfoState.media = []
        EditInfoData.dt = {
          title: '',
          description: '',
          tagsStr: '',
          tags: [],
          location: '',
          commentsOff: false,
          shareOff: false,
        }
      })
    })
    return unsubscribe
  }, [navigate])

  const save = () => {
    addPost(
      {
        commentsOff: EditInfoData.dt.commentsOff == true ? '1' : '0',
        shareOff: EditInfoData.dt.shareOff == true ? '1' : '0',
        tags: EditInfoData.dt.tags.join(','),
        title: EditInfoData.dt.title,
        description: EditInfoData.dt.description,
        idClient: AccountStore.account.id.toString(),
        location: EditInfoData.dt?.location
          ? EditInfoData.dt?.location?.id.toString()
          : '',
      },
      AddInfoState.media.map((c) => c.obj),
    ).then(() => {
      runInAction(() => {
        IsAdd.isAdd = true
      })
      navigate.navigate('CommunityStack', {
        screen: 'CommunityScreen',
      })
      setTab(0)
    })
  }

  useEffect(() => {
    getLocations()
    getMyPosts(AccountStore.account.id).then((r) => setPosts(r))
  }, [])

  useEffect(() => {
    if (!posts?.length) {
      setShow(true)
    }
  }, [posts])

  const list = [
    {
      icon: () => (
        <DelIcon
          style={{
            marginRight: 9,
          }}
        />
      ),
      text: `No pictures of weapons firearms or dangerous objects`,
    },
    {
      icon: () => (
        <DelIcon
          style={{
            marginRight: 9,
          }}
        />
      ),
      text: `No illegal activities or drugs`,
    },
    {
      icon: () => (
        <DelIcon
          style={{
            marginRight: 9,
          }}
        />
      ),
      text: `No overtly sexual pornographic material and/or nudity`,
    },
    {
      icon: () => (
        <DelIcon
          style={{
            marginRight: 9,
          }}
        />
      ),
      text: `No false inflammatory religious comments`,
    },
    {
      icon: () => (
        <CheckIcon
          style={{
            marginRight: 9,
          }}
        />
      ),
      text: `Post should reflect positive content pertaining to the music and entertainment industry.`,
    },
    {
      icon: () => (
        <CheckIcon
          style={{
            marginRight: 9,
          }}
        />
      ),
      text: `Maintain a support and uplifting environment`,
    },
    {
      icon: () => (
        <CheckIcon
          style={{
            marginRight: 9,
          }}
        />
      ),
      text: 'Foster meaningful and Genuine interactions',
    },
  ]

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
          // width: windowWidth,
          // height: windowHeight,
        }}
      >
        <Container style={{}}>
          <ContainerTop>
            {!tab && !show && (
              <FuncItem
                onPress={() => {
                  setShow(true)
                }}
              >
                <InfoIcon
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </FuncItem>
            )}
            {tab == 1 ? (
              <FuncItem
                onPress={() => {
                  setTab(0)
                }}
              >
                <BackArrow />
              </FuncItem>
            ) : (
              <></>
            )}
            <Title>Create New Post</Title>
            {!tab ? (
              <FuncItem
                onPress={() => {
                  navigate.goBack()
                }}
              >
                <CloseIcon
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </FuncItem>
            ) : (
              <FuncItem onPress={save}>
                <FuncItemText>Done</FuncItemText>
              </FuncItem>
            )}
          </ContainerTop>
          {show && !tab && (
            <ScrollBlock>
              <Title>Community Post Guideliness</Title>
              <InfoBlock>
                <AlertIcon style={{ marginRight: 10 }} />
                <InfoBlockText>
                  Content in community feed should not include anything that is
                  offensive, insensitive, upsetting and/or intended to disgust
                  in exceptionally demeaning poor taste or down right creepy.
                </InfoBlockText>
              </InfoBlock>
              {list.map((li, i) => (
                <InfoItem key={i}>
                  {li.icon()}
                  <InfoItemText>{li.text}</InfoItemText>
                </InfoItem>
              ))}
              <InfoBlock>
                <AlertIcon style={{ marginRight: 10 }} />
                <InfoBlockText>
                  Users who fail to adhere to these guidelines will be suspend
                  for a duration of time or be banned from the platform
                  entirely.
                </InfoBlockText>
              </InfoBlock>
              <View
                style={{
                  height: 200,
                }}
              ></View>
            </ScrollBlock>
          )}
          {show && !tab && (
            <Bottom>
              <Button onPress={() => setShow(false)}>
                <ButtonText>Got It!</ButtonText>
              </Button>
            </Bottom>
          )}
          {!show && !tab && <AddPhotos setTab={() => setTab(1)} />}
          {!show && tab == 1 ? <AddInfo /> : <></>}
        </Container>
      </KeyboardAvoidingView>
    </>
  )
}

export default observer(AddScreen)
