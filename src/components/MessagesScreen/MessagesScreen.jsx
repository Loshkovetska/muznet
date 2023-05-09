import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
// Components
import MessagesSearchInput from './MessagesSearchInput'
import AdsList from '@/components/AdsList'

// Store
import { observer } from 'mobx-react-lite'
import { useSearchApiStore } from '@/stores/SearchApi'
import C from '@/res/colors'

// Images
import IMAGES from '@/res/images'
const { MapShape } = IMAGES
// Styles
import { style } from './style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MessagesStore from '@/stores/MessangesStore'
import { runInAction } from 'mobx'
import AccountStore from '@/stores/AccountStore'
import { getChats } from '@/stores/MessangesStore'
import { searchMessages } from '../../stores/MessangesStore'
const {
  Content,
  HeaderTitle,
  MessagesContainer,
  MessagesTitle,
  MessagesBlock,
  MessagesItem,
  MessagesItemImage,
  MessageUserImage,
  MessagesItemInfo,
  MessagesItemInfoRow,
  ItemInfoName,
  ItemInfoNewMessageIndicator,
  ItemInfoNewMessageIndicatorText,
  MessagesItemMessageText,
  MessagesItemDate,
} = style

const MessagesScreen = observer(({ stackName, chatScreenName }) => {
  const navigation = useNavigation()

  const [searchText, onChangeSearchText] = useState('')

  const getLastMessage = (ch) => {
    if (!ch.length) return
    const msgs = JSON.parse(JSON.stringify(ch)).sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
    )

    return {
      text: msgs[msgs.length - 1].text,
      time: new Date(msgs[msgs.length - 1].datetime)
        .toLocaleTimeString()
        .slice(0, 5),
    }
  }

  const getNewMessagesCount = (ch) => {
    const id = AccountStore.account.id
    const res = ch.filter((f) => f.from != id && f.isNew) || []
    return res.length
  }

  useEffect(() => {
    if (!searchText.length || !AccountStore.account) {
      getChats(AccountStore.account?.id)
    } else {
      searchMessages(searchText, AccountStore.account?.id)
    }
  }, [AccountStore.account, searchText])
  const { chats } = MessagesStore

  return (
    <Content>
      {/* Header */}
      <HeaderTitle
        style={{
          textShadowColor: C.gray,
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 1,
        }}
      >
        Messages
      </HeaderTitle>

      {/* Search */}
      <MessagesSearchInput
        searchText={searchText}
        onChangeSearchText={onChangeSearchText}
      />

      {/* New message  */}
      <MessagesContainer>
        {/* Messages list */}
        <MessagesBlock>
          {chats?.map((ch, id) => (
            <MessagesItem
              key={id}
              onPress={() => {
                navigation.push(stackName, {
                  screen: chatScreenName,
                  params: {
                    chatUserId: ch.author.id,
                  },
                })
              }}
            >
              <MessagesItemImage>
                <MessageUserImage
                  source={{
                    uri: ch.author.avatar,
                  }}
                  resizeMode={'cover'}
                ></MessageUserImage>
              </MessagesItemImage>

              <MessagesItemInfo>
                <MessagesItemInfoRow>
                  <ItemInfoName>
                    {ch.author.name} {ch.author.surname}
                  </ItemInfoName>
                  {getNewMessagesCount(ch.messages) > 0 && (
                    <ItemInfoNewMessageIndicator>
                      <ItemInfoNewMessageIndicatorText>
                        {getNewMessagesCount(ch.messages)}
                      </ItemInfoNewMessageIndicatorText>
                    </ItemInfoNewMessageIndicator>
                  )}
                </MessagesItemInfoRow>

                <MessagesItemMessageText
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                >
                  {getLastMessage(ch.messages).text}
                </MessagesItemMessageText>
              </MessagesItemInfo>
              <MessagesItemDate>
                {getLastMessage(ch.messages).time}
              </MessagesItemDate>
            </MessagesItem>
          ))}
        </MessagesBlock>
      </MessagesContainer>
    </Content>
  )
})

export default MessagesScreen
