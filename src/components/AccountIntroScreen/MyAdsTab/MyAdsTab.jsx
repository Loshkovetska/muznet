import React from 'react'
import { useState, useEffect } from 'react'

import { Animated, KeyboardAvoidingView, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
// Components
import AccountsTabHeader from '../AccountsTabHeader'
import AdsItem from './AdsItem'
import EditAd from './EditAd'
import CreateAd from './CreateAd'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateOfferPreview } from './useAnimateOfferPreview'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { backHandler } from '../backHandler'
// Images
import IMAGES from '@/res/images'
const { AddCrossIcon } = IMAGES
// Variables
import C from '@/res/colors'
import F from '@/res/fonts'
import { S } from '@/res/strings'
import { M } from '@/res/mixin'
const { PlainText17, BlackBtn, BlackBtnText } = M
// Styles
import styled from 'styled-components/native'
const FilterContainer = styled.View`
  width: 100%;
  background-color: ${C.white};
  overflow: hidden;
`
const AdsListContainer = styled.ScrollView`
  width: 100%;
  padding-top: 68px;
`
const AdsListBlock = styled.View`
  padding: 0px 16px;
`
const Border = styled.View`
  width: 100%;
  background-color: ${C.lightGray};
  margin-top: 8px;
  margin-bottom: 16px;
  height: 1px;
  border-radius: 1px;
`
const NoAdsText = styled(M.PlainText17)`
  margin-bottom: 24px;
`

// Store
import { observer } from 'mobx-react-lite'
import { runInAction, set, toJS } from 'mobx'

import { useAccountApiStore } from '@/stores/AccountApi'
import AccountStore from '@/stores/AccountStore'
import { getMyAds } from '../../../stores/AccountStore'

const MyAdsTab = observer(({ isOpenTab }) => {
  const [adsList, setList] = useState([])
  const isKeyboardOpen = isKeyboardShown()

  const { windowHeight, windowWidth } = getWindowDimension()

  // Store
  const { setOpenTabs, isOpenEditAd, isOpenCreateAd } = useAccountApiStore()

  // Animation
  const { onPress, width } = useAnimateOfferPreview()

  useEffect(() => {
    if (isOpenTab === true) {
      onPress(true)
    }
  }, [isOpenTab])

  useEffect(() => {
    setTimeout(() => {
      getMyAds().then((r) => setList(r))
    }, 1000)
  }, [isOpenTab, isOpenCreateAd, isOpenEditAd])
  // Handler for native back button
  const tabNameToClose = 'My Ads'
  backHandler(onPress, setOpenTabs, tabNameToClose)

  return (
    <Animated.View
      style={{
        zIndex: 1000,
        height: windowHeight,
        width,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <FilterContainer
        style={{
          height: windowHeight,
          width: windowWidth,
        }}
      >
        {/* Form */}
        <AdsListContainer>
          {/* Header */}
          <AccountsTabHeader
            tabName={'My Ads'}
            setOpenTabs={setOpenTabs}
            onPress={onPress}
          />
          <AdsListBlock>
            {/* If empty list */}
            {adsList?.length === 0 && <NoAdsText>No ads</NoAdsText>}

            {/* Ads list */}
            {adsList?.map((item, id) => {
              return <AdsItem data={item} key={id} />
            })}

            {/* Create new ads */}
            {adsList?.length > 0 && <Border></Border>}
            <BlackBtn
              style={{
                marginBottom: 150,
              }}
              onPress={() => {
                setOpenTabs({
                  tabName: 'Create ad',
                  isOpen: true,
                })
              }}
            >
              <BlackBtnText>Create New Ad</BlackBtnText>
            </BlackBtn>
          </AdsListBlock>
        </AdsListContainer>
      </FilterContainer>

      {isOpenEditAd === true && <EditAd isOpenTab={isOpenEditAd} />}

      {isOpenCreateAd === true && <CreateAd isOpenTab={isOpenCreateAd} />}
    </Animated.View>
  )
})

export default MyAdsTab
