import React, { useEffect } from 'react'
import { StatusBar, SafeAreaView } from 'react-native'
import { useRef } from 'react'
import { useRoute } from '@react-navigation/native'
import { apiMocks } from '@/api/mock/apiMocks'

// Components
import CardScreen from '@/components/CardScreen'

// Styles
import styled from 'styled-components/native'
import C from '@/res/colors'
import { HideStatusBar } from '@/components/CardScreen/CardFullscreenImageSlider/CardFullscreenImageSlider'
import { observer } from 'mobx-react-lite'
import UserCard, { getUser } from '@/stores/UserCard'
import { runInAction } from 'mobx'
import { getAdsById } from '../../../stores/UserCard'
import { useSearchApiStore } from '@/stores/SearchApi'
import { blocksUsers } from '../../../stores/MessangesStore'
import AccountStore from '../../../stores/AccountStore'

const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${C.white};
  padding-bottom: 80px;
`

const ContractorAdsCardScreen = observer(() => {
  const route = useRoute()
  const { setList } = useSearchApiStore()

  const { adsId, adsData } = route.params

  useEffect(() => {
    getAdsById(adsId)
    setList('ContractorWelcomeScreen')
  }, [adsId])

  useEffect(() => {
    if (UserCard.user) {
      blocksUsers(UserCard.user.id_client, AccountStore.account.id).then(
        (r) => {
          runInAction(() => {
            UserCard.user.blocksCurrent = r.block_current
            UserCard.user.blocksChatUser = r.block_chatUser
          })
        },
      )
    }
  }, [UserCard.user])

  if (!UserCard.user) return <></>

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView>
        <CardScreen
          routeId={adsId}
          data={UserCard.user}
          isMusicianTrue={false}
          isMusician={false}
        />
      </SafeAreaView>
    </>
  )
})
export default ContractorAdsCardScreen
