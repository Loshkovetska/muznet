import React from 'react'
import { useState, useEffect } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
// Components
import ListSearchInput from '@/components/ListSearchScreen/ListSearchInput'
import AdsList from '@/components/AdsList'
// Helpers
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
// Store
import { observer } from 'mobx-react-lite'
import { useSearchApiStore } from '@/stores/SearchApi'
import C from '@/res/colors'

// Images
import IMAGES from '@/res/images'
const { MapShape } = IMAGES
// Styles
import { style } from './style'
import { setAccount } from '@/stores/AccountStore'
import { ScrollView } from 'react-native'

const {
  Content,
  Header,
  Welcome,
  WelcomeImage,
  PromoteBtn,
  PromoteBtnText,

  // Map
  MapContainer,
  MapImage,
  MapContainerBlockBg,
  MapContainerBlock,
  MapTitle,
  MapLink,
  MapLinkText,
  // Ads
  AdsContainer,
  AdsContainerHeader,
  AdsContainerHeaderTitle,
  AdsContainerHeaderLink,
  AdsContainerHeaderLinkText,
} = style

const MainScreen = observer(
  ({
    stackName,
    screenMapName,
    screenListName,
    screenCardName,
    screenTitle,
  }) => {
    const { musicianList, vendorList, setList } = useSearchApiStore()

    const navigation = useNavigation()

    const route = useRoute()

    useEffect(() => {
      setList(route.name)
      setAccount()
    }, [])

    const isKeyboardOpen = isKeyboardShown()
    const { windowHeight, windowWidth } = getWindowDimension()

    const [searchText, onChangeSearchText] = useState('')

    const isSearch = searchText.length > 0

    const compareLetterNumber = searchText.length

    useEffect(() => {
      if (isSearch) {
        onChangeSearchText('')
        navigation.navigate(stackName, {
          screen: screenListName,
          params: { searchText: searchText[0] },
        })
      }
    }, [searchText])
    const isContractor = stackName === 'ContractorStack'
    const stackForSwitch = isContractor ? 'MusicianStack' : 'ContractorStack'
    const screenForSwitch = isContractor
      ? 'MusicianPromoteAdScreen'
      : 'ContractorPromoteAdScreen'

    const isContractorData = isContractor ? musicianList : vendorList

    return (
      <Content>
        {/* Header */}
        <Header>
          <Welcome>
            <WelcomeImage source={IMAGES.WelcomeTitle} resizeMode={'contain'} />
          </Welcome>

          <PromoteBtn
            onPress={() => {
              navigation.navigate(stackForSwitch, {
                screen: screenForSwitch,
              })
            }}
          >
            <PromoteBtnText>Promote my ad</PromoteBtnText>
          </PromoteBtn>
        </Header>

        <ListSearchInput
          searchText={searchText}
          onChangeSearchText={onChangeSearchText}
          isMinOne={true}
          isContractor={isContractor}
        />

        {/* Map container */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
          }}
        >
          <MapContainer>
            <MapImage
              source={IMAGES.MapMain}
              resizeMode={'cover'}
              width="100%"
            />
            <MapContainerBlock>
              <MapTitle>Find</MapTitle>
              <MapTitle>Nearby</MapTitle>

              <MapLink>
                <MapLinkText
                  onPress={() => {
                    navigation.navigate(stackName, {
                      screen: screenMapName,
                    })
                  }}
                >
                  Go to the map
                </MapLinkText>
              </MapLink>
            </MapContainerBlock>
          </MapContainer>

          {/* Ads */}
          <AdsContainer>
            {/* Ads header */}
            <AdsContainerHeader>
              <AdsContainerHeaderTitle>{screenTitle}</AdsContainerHeaderTitle>

              <AdsContainerHeaderLink
                onPress={() => {
                  navigation.navigate(stackName, {
                    screen: screenListName,
                  })
                }}
              >
                <AdsContainerHeaderLinkText>
                  View all
                </AdsContainerHeaderLinkText>
              </AdsContainerHeaderLink>
            </AdsContainerHeader>

            {/* Ads container */}
            <AdsList
              adsList={isContractorData}
              isForContractor={isContractor}
            />
          </AdsContainer>
        </ScrollView>
      </Content>
    )
  },
)

export default MainScreen
