import React from 'react'
import { useState, useEffect } from 'react'
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
// Components
import ChatHeader from './ChatHeader'
import ChatSharedFiles from './ChatSharedFiles'
import OfferDetailsHeaderSheat from './ChatMessagesContractor/OfferDetailsHeaderSheat'
import ChatMessagesContractor from './ChatMessagesContractor'
import ChatFooter from './ChatFooter'
import ChatAttachment from './ChatAttachment'
import BlockUserPopup from './BlockUserPopup'
// Helpers
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
// Images
import IMAGES from '@/res/images'
const { MapShape } = IMAGES
// Styles
import styled from 'styled-components/native'
import C from '@/res/colors'

const Content = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  background-color: ${C.white};
`
// Store
import { observer } from 'mobx-react-lite'
import { useOfferToMusicianApiStore } from '@/stores/OfferToMusicianApi'
import MessagesStore, { getMessages } from '@/stores/MessangesStore'
import AccountStore from '@/stores/AccountStore'
import {
  blocksUsers,
  blockUser,
  changeMessagesStatus,
  getChatMessages,
} from '../../stores/MessangesStore'

const ChatScreen = observer(({ isContractor }) => {
  const [isUserBlocked, setBlocked] = useState(false)
  const [chatUserBlocked, setChatUserBlocked] = useState(false)
  const { offerDetails, isPaySuccesful } = useOfferToMusicianApiStore()
  const [isShowConractorDetailsHeader, setExistOffer] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()
  const chatUserId = route.params.chatUserId
  const { windowHeight, windowWidth } = getWindowDimension()
  const [messageAttachment, setMessageAttachment] = useState(null)
  const [messageText, onChangeMessageText] = useState('')
  const [isSendMessage, setSendMessage] = useState(false)
  const [newMessage, setNewMessage] = useState({
    messageText: '',
    messageAttachment: '',
  })

  useEffect(() => {
    blocksUsers(chatUserId, AccountStore.account.id).then((r) => {
      setBlocked(r.block_current)
      setChatUserBlocked(r.block_chatUser)
    })
  }, [chatUserId, AccountStore.account.id])

  useEffect(() => {
    if (
      offerDetails.offerDate.string.length > 0 &&
      isContractor === true &&
      isPaySuccesful
    ) {
      setExistOffer(true)
    } else {
      setExistOffer(false)
    }
  }, [offerDetails, isContractor, isPaySuccesful])

  useEffect(() => {
    if (!chatUserId || !AccountStore.account) return
    console.log('change msg status')
    changeMessagesStatus(chatUserId).then(() => {
      getChatMessages(AccountStore.account.id, chatUserId)
    })
    setInterval(() => {
      getChatMessages(AccountStore.account.id, chatUserId)
    }, 10000)
  }, [chatUserId, AccountStore.account.id])

  useEffect(() => {
    if (isSendMessage) {
      console.log('send msg status')
      setTimeout(() => {
        getChatMessages(AccountStore.account.id, chatUserId)
      }, 300)
      onChangeMessageText('')
      setSendMessage(false)
    }
  }, [isSendMessage])

  useEffect(() => {
    if (messageAttachment) {
      setNewMessage({
        messageText: '',
        messageAttachment: messageAttachment,
      })
    }
  }, [messageAttachment])

  const confirmBlock = async (flag) => {
    if (flag) {
      blockUser(chatUserId, AccountStore.account.id).then(() =>
        setChatUserBlocked(!chatUserBlocked),
      )
    }
  }

  // Confirm new offer window state
  const [isOpenBlockUserPopup, setOpenBlockUserPopup] = useState(false)
  const [isOpenSharedScreen, setOpenSharedScreen] = useState(false)

  const { messages } = MessagesStore
  if (!messages) return <></>
  const chatUserName = `${messages.author.name} ${messages.author.surname}`
  const chatUserImg = messages.author.avatar

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          width: '100%',
        }}
      >
        <Content
          style={{
            width: windowWidth,
            height: '100%',
          }}
        >
          <ChatAttachment />

          <ChatHeader
            setOpenSharedScreen={setOpenSharedScreen}
            setOpenBlockUserPopup={setOpenBlockUserPopup}
            chatUserName={chatUserName}
            chatUserImg={chatUserImg}
          />
          <ChatMessagesContractor
            newMessage={newMessage}
            isContractor={isContractor}
            isSendMessage={isSendMessage}
          />

          <ChatFooter
            messageText={messageText}
            onChangeMessageText={onChangeMessageText}
            setSendMessage={setSendMessage}
            setMessageAttachment={setMessageAttachment}
            isUserBlocked={isUserBlocked}
          />
        </Content>
      </KeyboardAvoidingView>
      <BlockUserPopup
        isOpenBottomPopup={isOpenBlockUserPopup}
        setOpenBottomPopup={setOpenBlockUserPopup}
        setConfirm={confirmBlock}
        isUserBlocked={chatUserBlocked}
      />

      {/* Shared files */}
      <ChatSharedFiles
        chatUserName={chatUserName}
        chatUserImg={chatUserImg}
        isOpenSharedScreen={isOpenSharedScreen}
        setOpenSharedScreen={setOpenSharedScreen}
        setOpenBlockUserPopup={setOpenBlockUserPopup}
      />
    </>
  )
})

export default ChatScreen
