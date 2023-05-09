import React, { Fragment } from 'react'
import { useState, useRef } from 'react'
import { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image, Keyboard, View } from 'react-native'

import OfferMessage from '../OfferMessage'
import OfferLinkToMyDeals from '../OfferLinkToMyDeals'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { formatAMPM } from '@/components/helpers/formatAMPM'
// Images
import IMAGES from '@/res/images'
const { FileWhiteIcon } = IMAGES
// Styles
import { style } from './style'
import * as FileSystem from 'expo-file-system'

const {
  MessagesContainer,
  CreateOfferButton,
  CreateOfferButtonText,
  MessageBlock,
  MessageImageBlock,
  MessageScrollBlock,
  MessageBlockInsideScroll,
  MessageBlockDay,
  Outcome,
  OutcomeCol,
  OutcomeMessage,
  OutcomeMessageFile,
  OutcomeMessageFileText,
  OutcomeMessageText,
  // Income
  Income,
  IncomeCol,
  IncomeMessage,
  IncomeMessageText,
  MessageTime,
  UserImgBlock,
  UserImg,CreateOfferCont
} = style

// Store
import { observer } from 'mobx-react-lite'
import { useOfferToMusicianApiStore } from '@/stores/OfferToMusicianApi'
import { useChatAttachmentStore } from '@/stores/ChatAttachmentStore'

import C from '@/res/colors'
import MessagesStore from '@/stores/MessangesStore'
import AccountStore from '@/stores/AccountStore'

const ChatMessagesContractor = observer(({ newMessage, isContractor }) => {
  const navigation = useNavigation()
  const route = useRoute()
  const { windowHeight, windowWidth } = getWindowDimension()
  const isKeyboardOpen = isKeyboardShown()

  // Scroll top when press on similar
  const scrollViewRef = useRef(null)

  const [isScrollToBottom, setScrollToBottom] = useState(true)
  const scrollBottom = () => {
    if (scrollViewRef.current && scrollViewRef != null) {
      setTimeout(() => {
        scrollViewRef.current.scrollTo({
          y: 100000000,
          animated: false,
        })
      }, 20)
    }
  }
  // Create offer store
  const {
    offerDetails,
    isSendOffer,
    setSendOffer,
    setOpenCreateOffer,
    isPaySuccesful,
  } = useOfferToMusicianApiStore()
  // Attachment store
  const {
    cameraPhoto,
    file,
    isSendAttached,
    setSendAttached,
  } = useChatAttachmentStore()

  const [localMessageState, setLocalMessageState] = useState([])
  // Time
  const now = new Date(Date.now())
  const { strTime } = formatAMPM(now)
  // Scroll to bottom

  const sortMessagesByDay = () => {
    return MessagesStore.messages.messages
  }

  useEffect(() => {
    let isMounted = true
    const unsubscribe = navigation.addListener('focus', () => {
      if (isMounted) {
        const msgs = sortMessagesByDay()
        setLocalMessageState([...localMessageState, ...msgs])
      }
    })
    return () => {
      unsubscribe
      isMounted = false
    }
  }, [navigation, MessagesStore.messages.messages])

  const [isExistOffer, setExistOffer] = useState(false)
  useEffect(() => {
    if (offerDetails.offerDate.string.length > 0) {
      setExistOffer(true)
    } else {
      setExistOffer(false)
    }
  }, [offerDetails, offerDetails.offerDate.string])

  useEffect(() => {
    if (isKeyboardOpen === true) {
      scrollBottom()
    }
  }, [isKeyboardOpen])

  useEffect(() => {
    scrollBottom()
  }, [MessagesStore.messages.messages])
  
  const getDay = (date) => {
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday = yesterday.toDateString()
    const nowDay = new Date().toDateString()
    const current = new Date(date).toDateString()

    if (current == nowDay) return 'Today'
    else if (current == yesterday) return 'Yesterday'
    else {
      const day = new Date(current).getDate().toString().padStart(2, '0')
      const month = (new Date(current).getMonth() + 1)
        .toString()
        .padStart(2, '0')
      return `${day}.${month}.${new Date(current).getFullYear()}`
    }
  }

  const getMessages = (date) => {
    const companion = route.params.chatUserId
    const user = AccountStore.account.id
    if (companion && user) {
      const companionUser = MessagesStore.messages.messages.filter(
        (item) => item.from == companion && item.to == user,
      )
      const userCompanion = MessagesStore.messages.messages.filter(
        (item) => item.to == companion && item.from == user,
      )

      let msgs = [...companionUser, ...userCompanion].sort(
        (a, b) =>
          a.id - b.id &&
          new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
      )

      msgs = msgs.filter((item) => {
        if (
          new Date(item.datetime).toDateString() ==
          new Date(date).toDateString()
        ) {
          return item
        }
      })

      msgs = msgs.sort((a, b) => a.id - b.id)
      return msgs
    }

    return []
  }

  const dates = new Set(
    MessagesStore.messages.messages.map((item) => {
      return new Date(new Date(item.datetime).toDateString()).getTime()
    }),
  )

  return (
    <MessagesContainer
      style={{
        width: windowWidth,
      }}
    >
      {/* Offer button */}
      {!isExistOffer && isPaySuccesful === false && isContractor === true && (
        <CreateOfferCont>
          <CreateOfferButton
          onPress={() => {
            const timeOutDuration = isKeyboardOpen ? 450 : 0
            isKeyboardOpen && Keyboard.dismiss()
            setTimeout(() => {
              setOpenCreateOffer(true)
            }, timeOutDuration)
          }}
        >
          <CreateOfferButtonText>Create offer</CreateOfferButtonText>
        </CreateOfferButton>
        </CreateOfferCont>
      )}

      <MessageBlock
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
      >
        <MessageScrollBlock
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
        >
          <MessageBlockInsideScroll
            style={{
              paddingTop: isContractor
                ? isKeyboardOpen === true
                  ? 505
                  : 230
                : isKeyboardOpen === true
                ? 445
                : 170,
              paddingBottom: isKeyboardOpen === true ? 106 : 126,
            }}
          >
            {[...dates].map((d, idx) => (
              <Fragment key={idx}>
                <MessageBlockDay>{getDay(d)}</MessageBlockDay>

                {getMessages(d).map((message, id) => {
                  let isInGroup = false
                  if (getMessages(d).length > 1 && !id) {
                    const next = getMessages(d)[id + 1]
                    if (
                      message.from == next.from &&
                      message.to == next.to &&
                      new Date(message.datetime).getTime() ==
                        new Date(next.datetime).getTime() &&
                      id !== getMessages(d).length - 1
                    ) {
                      isInGroup = true
                    }
                  }
                  if (id) {
                    const previous = getMessages(d)[id - 1]

                    if (
                      message.from == previous.from &&
                      message.to == previous.to &&
                      new Date(message.datetime).getTime() ==
                        new Date(previous.datetime).getTime() &&
                      id !== getMessages(d).length - 1
                    ) {
                      isInGroup = true
                    } else {
                      isInGroup = false
                    }
                  }

                  if (message.from == AccountStore.account.id) {
                    if (message.isOffer) {
                      return (
                        <View key={id}>
                          <OfferMessage
                            offerDetails={message.offerDetails}
                            isContractor={isContractor}
                          />
                          <OfferLinkToMyDeals />
                        </View>
                      )
                    } else {
                      return (
                        <Outcome
                          style={{
                            marginBottom: isInGroup ? 8 : 16,
                          }}
                          key={id}
                        >
                          <OutcomeCol>
                            <OutcomeMessage
                              style={{
                                borderBottomRightRadius: isInGroup ? 12 : 0,
                                marginRight: isInGroup ? 32 : 0,
                              }}
                            >
                              {message.files.map((me, i) => {
                                if (!me || !me.fileName) return <></>
                                const isDoc = me.uri.includes('pdf')

                                if (isDoc) {
                                  return (
                                    <OutcomeMessageFile
                                      key={i}
                                      onPress={async () => {
                                        await FileSystem.downloadAsync(
                                          me.uri,
                                          FileSystem.documentDirectory +
                                            me.fileName,
                                        )
                                      }}
                                    >
                                      <FileWhiteIcon width={20} height={20} />
                                      <OutcomeMessageFileText>
                                        {me.fileName}
                                      </OutcomeMessageFileText>
                                    </OutcomeMessageFile>
                                  )
                                }
                                return (
                                  <MessageImageBlock key={i}>
                                    <Image
                                      source={{
                                        uri: me,
                                      }}
                                      style={{
                                        width: 240,
                                        height: 240 + 240 / 3,
                                      }}
                                      resizeMode={'contain'}
                                    />
                                  </MessageImageBlock>
                                )
                              })}
                              {message.text.length ? (
                                <OutcomeMessageText>
                                  {message.text}
                                </OutcomeMessageText>
                              ) : (
                                <></>
                              )}
                            </OutcomeMessage>

                            {!isInGroup && (
                              <MessageTime>
                                {new Date(message.datetime)
                                  .toLocaleTimeString()
                                  .slice(0, 5)}
                              </MessageTime>
                            )}
                          </OutcomeCol>

                          {!isInGroup && (
                            <UserImgBlock>
                              <UserImg
                                source={{
                                  uri: AccountStore.account.userAvatar[0],
                                }}
                                resizeMode={'cover'}
                              />
                            </UserImgBlock>
                          )}
                        </Outcome>
                      )
                    }
                  } else {
                    return (
                      <Income
                        style={{
                          marginBottom: isInGroup ? 8 : 16,
                        }}
                        key={id}
                      >
                        {!isInGroup && (
                          <UserImgBlock>
                            <UserImg
                              source={{
                                uri: MessagesStore.messages.author.avatar,
                              }}
                              resizeMode={'cover'}
                            />
                          </UserImgBlock>
                        )}
                        <IncomeCol>
                          <IncomeMessage
                            style={{
                              borderBottomLeftRadius: isInGroup ? 12 : 0,
                              marginLeft: isInGroup ? 32 : 0,
                            }}
                          >
                            {message.files.map((me, i) => {
                              if (!me || !me.fileName) return <></>
                              const isDoc = me.uri.includes('pdf')

                              if (isDoc) {
                                return (
                                  <OutcomeMessageFile
                                    key={i}
                                    onPress={async () => {
                                      await FileSystem.downloadAsync(
                                        me.uri,
                                        FileSystem.documentDirectory +
                                          me.fileName,
                                      )
                                    }}
                                  >
                                    <FileWhiteIcon width={20} height={20} />
                                    <OutcomeMessageFileText>
                                      {me.fileName}
                                    </OutcomeMessageFileText>
                                  </OutcomeMessageFile>
                                )
                              }
                              return (
                                <MessageImageBlock key={i}>
                                  <Image
                                    source={{
                                      uri: me.uri,
                                    }}
                                    style={{
                                      width: 240,
                                      height: 240 + 240 / 3,
                                    }}
                                    resizeMode={'contain'}
                                  />
                                </MessageImageBlock>
                              )
                            })}
                            {message.text.length ? (
                              <IncomeMessageText>
                                {message.text}
                              </IncomeMessageText>
                            ) : (
                              <></>
                            )}
                          </IncomeMessage>

                          {!isInGroup && (
                            <MessageTime>
                              {new Date(message.datetime)
                                .toLocaleTimeString()
                                .slice(0, 5)}
                            </MessageTime>
                          )}
                        </IncomeCol>
                      </Income>
                    )
                  }
                })}
              </Fragment>
            ))}
          </MessageBlockInsideScroll>
        </MessageScrollBlock>
      </MessageBlock>
    </MessagesContainer>
  )
})

export default ChatMessagesContractor
