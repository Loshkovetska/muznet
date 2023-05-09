import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
// Components
import MapSearchInput from './MapSearchInput'
import ExploreScreen from './ExploreScreen'
// Store
import { observer } from 'mobx-react-lite'
import { useSearchApiStore } from '@/stores/SearchApi'
// Styles
import { style } from './style'
const { Content, AdsContainer } = style

const MapSearchScreen = observer(({ stackName }) => {
  const { setList, searchInList, setNothingWasFound } = useSearchApiStore()
  const [location, getLocation] = useState('')
  const navigation = useNavigation()

  const route = useRoute()

  const [searchText, onChangeSearchText] = useState('')
  const [initialFocusInput, setInitialFocusInput] = useState(false)

  // Set list
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     setList(route.name)
  //   })
  //   return unsubscribe
  // }, [navigation])

  useEffect(() => {
    setList(route.name)
  }, [])

  // Set input from welcome screen
  useEffect(() => {
    if (route.params !== undefined) {
      if (route.params.searchText !== undefined) {
        if (searchText.length > 0 || route.params.searchText.length > 0) {
          onChangeSearchText(route.params.searchText)
          route.params.searchText = ''
          setInitialFocusInput(true)
        }
      }
    } else {
      onChangeSearchText('')
    }
  }, [route.params])

  // Set input from welcome screen
  useEffect(() => {
    if (location) {
      // searchInList(searchText, route.name)
      setList(route.name, location)
    }
    if (searchText.length === 0) {
      setList(route.name)
      setNothingWasFound()
    }
  }, [searchText.length, location])

  const isContractor = stackName === 'ContractorStack'

  const isToContractorWelcomeHash = isContractor
    ? 'ContractorWelcomeScreen'
    : 'MusicianWelcomeScreen'

  return (
    <>
      <Content>
        <MapSearchInput
          getLocation={getLocation}
          stackName={stackName}
          toWelcomeScreenHash={isToContractorWelcomeHash}
          searchText={searchText}
          onChangeSearchText={onChangeSearchText}
          initialFocusInput={initialFocusInput}
        />

        {/* Ads */}
        <AdsContainer>
          {/* Ads container */}
          <ExploreScreen />
        </AdsContainer>
      </Content>
    </>
  )
})

export default MapSearchScreen
